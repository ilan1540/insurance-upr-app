"use server";
/**
 * R3 — Loss Component for onerous contracts (IFRS17 §47-52)
 *
 * מחשב ושומר פיוס רכיב הפסד (Loss Component) לחוזים הפסדיים:
 *   - הכרה מיידית בהפסד צפוי בהכרה ראשונית
 *   - שחרור שיטתי לאורך תקופת הכיסוי
 * מקורות: BranchParameters (תחזית) + UprSnapshot (LRC נותר) + LicSnapshot (תביעות).
 */
import { prisma } from "@/lib/prisma";
import { calculateLossComponent, releaseLossComponent } from "@/lib/loss-component";

function prevPeriod(year: number, month: number) {
  return month === 1 ? { year: year - 1, month: 12 } : { year, month: month - 1 };
}

export async function runLossComponentRollforward(year: number, month: number) {
  try {
    const prev = prevPeriod(year, month);

    const [params, snapshots, prevLc, premiums, claims] = await Promise.all([
      prisma.branchParameters.findMany({ where: { year } }),
      prisma.uprSnapshot.findMany({ where: { year, period: month, periodType: "MONTHLY" } }),
      prisma.lossComponentRollforward.findMany({ where: { year: prev.year, month: prev.month } }),
      prisma.premiumActuals.findMany({ where: { year, month } }),
      prisma.licSnapshot.findMany({ where: { year, month } }),
    ]);

    if (snapshots.length === 0) {
      return { success: false, error: `אין UprSnapshot לתקופה ${month}/${year} — יש להריץ חישוב UPR תחילה` };
    }

    const paramMap   = new Map(params.map(p => [p.branchNumber, p]));
    const prevLcMap  = new Map(prevLc.map((l: any) => [l.branchNumber, l]));
    const premiumMap = new Map(premiums.map(p => [p.branchNumber, p]));
    const licMap     = new Map(claims.map(l => [l.branchNumber, l]));

    const rows = snapshots.map(snap => {
      const bp  = paramMap.get(snap.branchNumber);
      const prevRow = prevLcMap.get(snap.branchNumber) as any;
      const prem = premiumMap.get(snap.branchNumber);
      const lic  = licMap.get(snap.branchNumber);

      const openingLc = prevRow?.closingLc ?? 0;

      // תזרים צפוי נותר על ה-LRC הלא-מורווח
      const uprRemaining   = Number(snap.uprValue);
      const expectedLrPct  = bp?.expectedLrPct ?? 0;
      const expectedExpPct = (bp as any)?.expectedExpensePct ?? 0;
      const expectedClaims   = uprRemaining * (expectedLrPct / 100);
      const expectedExpenses = uprRemaining * (expectedExpPct / 100);

      // הכרה: הפסד צפוי על הכיסוי הנותר
      const lc = calculateLossComponent({
        expectedClaims,
        expectedExpenses,
        expectedPremium: uprRemaining - Math.max(0, Number(snap.ducNet)),
      });

      // הכרה חדשה רק על הגידול מעל הפתיחה
      const recognisedLc = Math.max(0, Math.round((lc.lossComponent - openingLc) * 100) / 100);

      // שחרור לפי תביעות שנתהוו בתקופה מתוך סך צפוי
      const periodOutflow = Number(lic?.licNet ?? 0);
      const totalExpected = expectedClaims + expectedExpenses + openingLc;
      const { released } = releaseLossComponent(openingLc, periodOutflow, totalExpected || 1);

      const closingLc = Math.max(0, Math.round((openingLc + recognisedLc - released) * 100) / 100);

      return {
        year, month, branchNumber: snap.branchNumber,
        openingLc, recognisedLc, releasedLc: released, adjustmentLc: 0, closingLc,
      };
    });

    await prisma.lossComponentRollforward.deleteMany({ where: { year, month } });
    await prisma.lossComponentRollforward.createMany({ data: rows });

    const totalClosingLc = rows.reduce((s, r) => s + r.closingLc, 0);
    return { success: true, count: rows.length, totalClosingLc: Math.round(totalClosingLc), rows };
  } catch (e: any) {
    return { success: false, error: e.message };
  }
}

export async function getLossComponentReport(year: number, month: number) {
  try {
    const rows = await prisma.lossComponentRollforward.findMany({
      where: { year, month }, orderBy: { branchNumber: "asc" },
    });
    return {
      success: true, rows,
      totals: {
        openingLc:    rows.reduce((s, r) => s + r.openingLc, 0),
        recognisedLc: rows.reduce((s, r) => s + r.recognisedLc, 0),
        releasedLc:   rows.reduce((s, r) => s + r.releasedLc, 0),
        closingLc:    rows.reduce((s, r) => s + r.closingLc, 0),
      },
    };
  } catch (e: any) {
    return { success: false, error: e.message, rows: [] };
  }
}
