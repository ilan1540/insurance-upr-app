"use server";

import { prisma } from "@/lib/prisma";
import { Readable } from "stream";
import csv from "csv-parser";
import { calculateDucForBranch, allocateAdminExpenses } from "@/lib/insurance-logic";

// ---------------------------------------------------------------------------
// קליטת פוליסות מ-CSV + חישוב UPR/DUC מיידי
// ---------------------------------------------------------------------------
export async function uploadPolicies(formData: FormData) {
  try {
    const file = formData.get("file") as File;
    const year  = parseInt(formData.get("year")  as string);
    const month = parseInt(formData.get("month") as string);
    if (!file) return { success: false, error: "לא נבחר קובץ" };

    const buffer = Buffer.from(await file.arrayBuffer());
    const stream = Readable.from(buffer).pipe(csv());
    const cutoffDate = new Date(year, month, 0); // יום אחרון בחודש

    const branchSummary = new Map<number, {
      totalPremium: number; totalUpr: number;
      totalComm: number;    totalDuc: number;
    }>();

    for await (const row of stream) {
      const branchNum  = parseInt(row.branchNumber || row["ענף"]);
      const premium    = parseFloat(row.premium    || row["פרמיה"]        || 0);
      const comm       = parseFloat(row.commission || row["עמלה"]         || 0);
      const startDate  = new Date(row.startDate    || row["תאריך_תחילה"]);
      const endDate    = new Date(row.endDate      || row["תאריך_סיום"]);
      if (isNaN(branchNum) || isNaN(premium)) continue;

      const totalDays     = (endDate.getTime() - startDate.getTime()) / 86400000;
      const remainingDays = (endDate.getTime() - cutoffDate.getTime()) / 86400000;
      const uprRatio      = totalDays > 0 && remainingDays > 0 ? Math.min(remainingDays / totalDays, 1) : 0;

      const uprValue = premium * uprRatio;
      const ducValue = comm    * uprRatio;

      const cur = branchSummary.get(branchNum) || { totalPremium: 0, totalUpr: 0, totalComm: 0, totalDuc: 0 };
      branchSummary.set(branchNum, {
        totalPremium: cur.totalPremium + premium,
        totalUpr:     cur.totalUpr     + uprValue,
        totalComm:    cur.totalComm    + comm,
        totalDuc:     cur.totalDuc     + ducValue,
      });
    }

    const snapshotData = Array.from(branchSummary.entries()).map(([branchNumber, d]) => ({
      year, period: month, periodType: "MONTHLY" as const, branchNumber,
      originalPremium: d.totalPremium,
      uprValue:        d.totalUpr,
      dacGross:        d.totalDuc,   // עמלת סוכן נדחית (ללא פיצול ב"מ בשלב זה)
      deferredRIComm:  0,
      ducNet:          d.totalDuc,
    }));

    await prisma.uprSnapshot.deleteMany({ where: { year, period: month } });
    await prisma.uprSnapshot.createMany({ data: snapshotData });

    return { success: true, count: snapshotData.length };
  } catch (error: any) {
    return { success: false, error: "שגיאה בקליטה: " + error.message };
  }
}

// ---------------------------------------------------------------------------
// פרסור תאריך מקומי — תמיכה ב-YYYY-MM-DD וגם DD/MM/YYYY וגם DD-MM-YYYY
// ---------------------------------------------------------------------------
function parseLocalDate(s: string): Date {
  const parts = s.split(/[-\/]/).map(Number);
  const [y, mo, d] = parts[0] > 31 ? parts : [parts[2], parts[1], parts[0]];
  return new Date(y, mo - 1, d, 12, 0, 0);
}

// ---------------------------------------------------------------------------
// חישוב מלא: UPR + DUC (ברוטו + ב"מ נטו) + הקצאת הנה"כ
// מקור: PremiumActuals לפי year+month (כולל startDate/endDate לחישוב Pro-Rata)
// ---------------------------------------------------------------------------
export async function runFullUprCalculation(targetDate: string) {
  try {
    const cutoff = parseLocalDate(targetDate);
    const year   = cutoff.getFullYear();
    const month  = cutoff.getMonth() + 1;

    // טעינת כל הנתונים הדרושים במקביל
    const [premiums, branchParams, adminExpense] = await Promise.all([
      prisma.premiumActuals.findMany({ where: { year, month } }),
      prisma.branchParameters.findMany({ where: { year } }),
      prisma.adminExpense.findUnique({ where: { year_month: { year, month } } }),
    ]);

    if (premiums.length === 0) {
      return { success: false, error: `לא נמצאו פרמיות אמת לתקופה ${month}/${year} — יש לטעון קובץ פרמיות תחילה` };
    }

    const paramsMap = new Map(branchParams.map(p => [p.branchNumber, p]));

    // ---------- UPR לפי ענף מ-PremiumActuals (Pro-Rata לפי startDate/endDate) ----------
    type BranchAgg = { totalPremium: number; totalUpr: number };
    const branchAgg = new Map<number, BranchAgg>();

    for (const p of premiums) {
      const start = new Date(p.startDate);
      const end   = new Date(p.endDate);
      const totalDays     = (end.getTime() - start.getTime()) / 86400000;
      const remainingDays = (end.getTime() - cutoff.getTime()) / 86400000;
      const uprRatio      = totalDays > 0 && remainingDays > 0 ? Math.min(remainingDays / totalDays, 1) : 0;
      const uprValue      = p.grossPremium * uprRatio;

      const cur = branchAgg.get(p.branchNumber) ?? { totalPremium: 0, totalUpr: 0 };
      branchAgg.set(p.branchNumber, {
        totalPremium: cur.totalPremium + p.grossPremium,
        totalUpr:     cur.totalUpr     + uprValue,
      });
    }

    // ---------- DUC לפי ענף מ-BranchParameters ----------
    const snapshotData = Array.from(branchAgg.entries()).map(([branchNumber, agg]) => {
      const bp = paramsMap.get(branchNumber);
      const duc = calculateDucForBranch({
        branchNumber,
        originalPremium:    agg.totalPremium,
        uprValue:           agg.totalUpr,
        agentCommPct:       bp?.agentCommPct       ?? 0,
        reinsurancePct:     bp?.reinsurancePct     ?? 0,
        reinsuranceCommPct: bp?.reinsuranceCommPct ?? 0,
      });
      return {
        year, period: month, periodType: "MONTHLY" as const,
        branchNumber,
        originalPremium: agg.totalPremium,
        uprValue:        agg.totalUpr,
        dacGross:        duc.dacGross,
        deferredRIComm:  duc.deferredRIComm,
        ducNet:          duc.ducNet,
      };
    });

    // ---------- הקצאת הנה"כ לענפים ----------
    const premiumExpense = adminExpense?.premiumExpense ?? 0;
    const claimsExpense  = adminExpense?.claimsExpense  ?? 0;

    const allocationInputs = snapshotData.map(s => {
      const bp       = paramsMap.get(s.branchNumber);
      const uprRatio = s.originalPremium > 0 ? s.uprValue / s.originalPremium : 0;
      const earnedGross = s.originalPremium - s.uprValue;
      return {
        branchNumber:  s.branchNumber,
        earnedGross,
        expectedLrPct: bp?.expectedLrPct ?? 0,
        uprRatio,
      };
    });

    const allocations = allocateAdminExpenses(allocationInputs, premiumExpense, claimsExpense);

    // ---------- שמירה ב-DB ----------
    await prisma.uprSnapshot.deleteMany({ where: { year, period: month } });
    await prisma.uprSnapshot.createMany({ data: snapshotData });
    await prisma.adminExpenseAllocation.deleteMany({ where: { year, month } });
    if (allocations.length > 0) {
      await prisma.adminExpenseAllocation.createMany({
        data: allocations.map(a => ({
          year, month,
          branchNumber:        a.branchNumber,
          premiumExpenseShare: a.premiumExpenseShare,
          claimsExpenseShare:  a.claimsExpenseShare,
          totalExpenseShare:   a.totalExpenseShare,
          recognizedExpense:   a.recognizedExpense,
          deferredExpense:     a.deferredExpense,
        })),
      });
    }

    const totalUpr    = snapshotData.reduce((s, r) => s + r.uprValue, 0);
    const totalDucNet = snapshotData.reduce((s, r) => s + r.ducNet,  0);

    const rows = snapshotData.map(s => {
      const alloc = allocations.find(a => a.branchNumber === s.branchNumber);
      return {
        branchNumber:      s.branchNumber,
        uprValue:          Math.round(s.uprValue),
        dacGross:          Math.round(s.dacGross),
        deferredRIComm:    Math.round(s.deferredRIComm),
        ducNet:            Math.round(s.ducNet),
        recognizedExpense: Math.round(alloc?.recognizedExpense ?? 0),
        deferredExpense:   Math.round(alloc?.deferredExpense   ?? 0),
      };
    });

    return {
      success:         true,
      count:           premiums.length,
      totalUpr:        Math.round(totalUpr),
      totalDucNet:     Math.round(totalDucNet),
      hasAdminExpense: premiumExpense + claimsExpense > 0,
      rows,
    };
  } catch (e: any) {
    return { success: false, error: e.message };
  }
}

// ---------------------------------------------------------------------------
// הרצה גורפת — לפי כל השנים/חודשים שקיימים ב-PremiumActuals
// ---------------------------------------------------------------------------
export async function runHistoricalBatchCalculation() {
  try {
    // שלב 1: מצא את כל צמדי year+month שיש בהם פרמיות אמת
    const periods = await prisma.premiumActuals.findMany({
      select: { year: true, month: true },
      distinct: ["year", "month"],
      orderBy: [{ year: "asc" }, { month: "asc" }],
    });

    if (periods.length === 0) {
      return { success: false, error: "לא נמצאו נתוני פרמיות אמת — יש לטעון קבצים תחילה" };
    }

    // מחיקת כל החישובים הקודמים לפני הרצה מחדש
    await prisma.uprSnapshot.deleteMany({});
    await prisma.adminExpenseAllocation.deleteMany({});

    let total = 0;
    const failed: string[] = [];

    for (const { year, month } of periods) {
      const lastDay = new Date(year, month, 0).toISOString().split("T")[0];
      const res = await runFullUprCalculation(lastDay);
      if (res.success) {
        total++;
      } else {
        failed.push(`${month}/${year}: ${res.error}`);
      }
    }

    const msg = `הרצה הושלמה — ${total}/${periods.length} תקופות עודכנו`;
    return {
      success: true,
      message: failed.length > 0 ? `${msg} | נכשלו: ${failed.join(", ")}` : msg,
    };
  } catch (e: any) {
    return { success: false, error: e.message };
  }
}

// ---------------------------------------------------------------------------
// שליפת snapshot מהארכיון לפי שנה וחודש
// ---------------------------------------------------------------------------
export async function getUprFromArchive(year: number, month: number) {
  try {
    const [snapshots, allocations] = await Promise.all([
      prisma.uprSnapshot.findMany({
        where: { year, period: month, periodType: "MONTHLY" },
        orderBy: { branchNumber: "asc" },
      }),
      prisma.adminExpenseAllocation.findMany({
        where: { year, month },
        orderBy: { branchNumber: "asc" },
      }),
    ]);

    const allocMap = new Map(allocations.map(a => [a.branchNumber, a]));

    const rows = snapshots.map(r => {
      const alloc = allocMap.get(r.branchNumber);
      return {
        branchNumber:      r.branchNumber,
        originalPremium:   Number(r.originalPremium),
        uprValue:          Number(r.uprValue),
        dacGross:          Number(r.dacGross),
        deferredRIComm:    Number(r.deferredRIComm),
        ducNet:            Number(r.ducNet),
        recognizedExpense: alloc?.recognizedExpense ?? 0,
        deferredExpense:   alloc?.deferredExpense   ?? 0,
        totalExpenseShare: alloc?.totalExpenseShare ?? 0,
      };
    });

    return {
      success:    true,
      rows,
      totalUpr:    rows.reduce((s, r) => s + r.uprValue,  0),
      totalDucNet: rows.reduce((s, r) => s + r.ducNet,    0),
      totalDeferred: rows.reduce((s, r) => s + r.deferredExpense, 0),
    };
  } catch (e: any) {
    return { success: false, error: e.message, rows: [], totalUpr: 0, totalDucNet: 0, totalDeferred: 0 };
  }
}

// ---------------------------------------------------------------------------
// דוח UPR מפורט לפי ענף ותקופה
// ---------------------------------------------------------------------------
export async function getDetailedUprReport(targetDate: string) {
  try {
    const cutoff = parseLocalDate(targetDate);
    const year   = cutoff.getFullYear();
    const month  = cutoff.getMonth() + 1;

    const premiums = await prisma.premiumActuals.findMany({
      where: { year, month },
      orderBy: { branchNumber: "asc" },
    });

    const rows = premiums.map(p => {
      const start = new Date(p.startDate);
      const end   = new Date(p.endDate);
      const totalDays     = Math.round((end.getTime() - start.getTime()) / 86400000);
      const remainingDays = Math.max(0, Math.round((end.getTime() - cutoff.getTime()) / 86400000));
      const uprRatio      = totalDays > 0 ? Math.min(remainingDays / totalDays, 1) : 0;
      const uprValue      = p.grossPremium * uprRatio;
      return {
        policyNumber:  `ענף ${p.branchNumber}`,   // תאימות לממשק הקיים
        branchNumber:  p.branchNumber,
        premiumAmount: p.grossPremium,
        startDate:     p.startDate,
        endDate:       p.endDate,
        totalDays,
        remainingDays,
        uprValue:      Math.round(uprValue),
        uprRatioPct:   Math.round(uprRatio * 1000) / 10,  // אחוז UPR
      };
    });

    return { success: true, rows };
  } catch (e: any) {
    return { success: false, error: e.message, rows: [] };
  }
}
