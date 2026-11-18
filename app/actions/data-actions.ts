"use server";
import { prisma } from "@/lib/prisma";
import { Readable } from "stream";
import csv from "csv-parser";

async function parseCSV(file: File): Promise<any[]> {
  const buffer = Buffer.from(await file.arrayBuffer());
  const results: any[] = [];
  const stream = Readable.from(buffer).pipe(csv({
    mapHeaders: ({ header }) => header.trim().replace(/^\uFEFF/, '')
  }));
  for await (const row of stream) results.push(row);
  return results;
}

// S1: \u05D4\u05DB\u05E0\u05E1\u05EA \u05E0\u05EA\u05D5\u05E0\u05D9\u05DD \u05D1-batches \u05DC\u05DE\u05E0\u05D9\u05E2\u05EA transaction timeout
async function createManyChunked<T extends object>(
  createFn: (data: T[]) => Promise<{ count: number }>,
  data: T[],
  chunkSize = 100
): Promise<number> {
  let total = 0;
  for (let i = 0; i < data.length; i += chunkSize) {
    const chunk = data.slice(i, i + chunkSize);
    const res = await createFn(chunk);
    total += res.count;
  }
  return total;
}

// N4: \u05D1\u05D3\u05D9\u05E7\u05EA \u05E9\u05D3\u05D4 \u05DE\u05E1\u05E4\u05E8\u05D9 \u2014 \u05DE\u05D7\u05D6\u05D9\u05E8 \u05E9\u05D2\u05D9\u05D0\u05D4 \u05D0\u05DD \u05E8\u05D9\u05E7, NaN, \u05D0\u05D5 \u05E9\u05DC\u05D9\u05DC\u05D9 (\u05DB\u05E9\u05E0\u05D3\u05E8\u05E9 \u05D7\u05D9\u05D5\u05D1\u05D9)
function validateNumeric(
  val: string | undefined,
  fieldName: string,
  rowIdx: number,
  allowNegative = false
): string | null {
  const n = parseFloat(val ?? "");
  if (isNaN(n)) return `\u05E9\u05D5\u05E8\u05D4 ${rowIdx}: \u05E9\u05D3\u05D4 "${fieldName}" \u05D0\u05D9\u05E0\u05D5 \u05DE\u05E1\u05E4\u05E8 (\u05E2\u05E8\u05DA: "${val}")`;
  if (!allowNegative && n < 0) return `\u05E9\u05D5\u05E8\u05D4 ${rowIdx}: \u05E9\u05D3\u05D4 "${fieldName}" \u05DC\u05D0 \u05D9\u05DB\u05D5\u05DC \u05DC\u05D4\u05D9\u05D5\u05EA \u05E9\u05DC\u05D9\u05DC\u05D9 (\u05E2\u05E8\u05DA: ${n})`;
  return null;
}

// N4: \u05D1\u05D3\u05D9\u05E7\u05EA \u05EA\u05D0\u05E8\u05D9\u05DA \u05EA\u05E7\u05D9\u05DF
function validateDate(val: string | undefined, fieldName: string, rowIdx: number): string | null {
  if (!val?.trim()) return `\u05E9\u05D5\u05E8\u05D4 ${rowIdx}: \u05E9\u05D3\u05D4 "${fieldName}" \u05D7\u05E1\u05E8`;
  const clean = val.trim();
  const parts = clean.split(/[-\/]/).map(Number);
  if (parts.length !== 3 || parts.some(isNaN)) return `\u05E9\u05D5\u05E8\u05D4 ${rowIdx}: \u05E9\u05D3\u05D4 "${fieldName}" \u05EA\u05D0\u05E8\u05D9\u05DA \u05DC\u05D0 \u05EA\u05E7\u05D9\u05DF: "${clean}"`;
  const [y, mo, d] = parts[0] > 31 ? parts : [parts[2], parts[1], parts[0]];
  if (y < 2000 || y > 2100 || mo < 1 || mo > 12 || d < 1 || d > 31)
    return `\u05E9\u05D5\u05E8\u05D4 ${rowIdx}: \u05E9\u05D3\u05D4 "${fieldName}" \u05E2\u05E8\u05DB\u05D9\u05DD \u05D7\u05E8\u05D9\u05D2\u05D9\u05DD: ${y}-${mo}-${d}`;
  return null;
}

// 1. קליטת תחזית (Params)
export async function uploadBranchParamsCSV(formData: FormData) {
  try {
    const file = formData.get("file") as File;
    const rawRows = await parseCSV(file);

    const data = rawRows.filter(r => r.branchNumber).map(row => ({
      year:                 parseInt(row.year),
      branchNumber:         parseInt(row.branchNumber),
      expectedGrossPremium: parseFloat(row.expectedGrossPremium || 0),
      agentCommPct:         parseFloat(row.agentCommPct         || 0),
      reinsurancePct:       parseFloat(row.reinsurancePct       || 0),
      reinsuranceCommPct:   parseFloat(row.reinsuranceCommPct   || 0),
      expectedLrPct:        parseFloat(row.expectedLrPct        || 0),
    }));

    // נקה כפילויות — שמור רק את השורה האחרונה לכל (year, branchNumber)
    const dedupMap = new Map<string, typeof data[0]>();
    for (const row of data) dedupMap.set(`${row.year}-${row.branchNumber}`, row);
    const deduped = Array.from(dedupMap.values());

    const years = [...new Set(deduped.map(d => d.year))];
    await prisma.branchParameters.deleteMany({ where: { year: { in: years } } });
    await prisma.branchParameters.createMany({ data: deduped });
    return { success: true, count: deduped.length };
  } catch (e: any) {
    return { success: false, error: "שגיאת תחזית: " + e.message };
  }
}

// 2. קליטת פרמיות אמת (Premium Actuals)
export async function uploadPremiumActualsCSV(formData: FormData) {
  try {
    const file = formData.get("file") as File;
    const rawRows = await parseCSV(file);

    const parseLocalDate = (s: string): Date => {
      const clean = s?.toString().trim();
      const parts = clean.split(/[-\/]/).map(Number);
      if (parts.length !== 3 || parts.some(isNaN)) throw new Error(`תאריך לא תקין: "${clean}"`);
      const [y, mo, d] = parts[0] > 31 ? parts : [parts[2], parts[1], parts[0]];
      if (!y || !mo || !d) throw new Error(`תאריך לא תקין: "${clean}"`);
      return new Date(y, mo - 1, d, 12, 0, 0);
    };

    // N4: Validation
    const errors: string[] = [];
    const data: any[] = [];
    rawRows.forEach((row, i) => {
      const rowNum = i + 2;
      if (!row.branchNumber || !row.year || !row.month) {
        errors.push(`שורה ${rowNum}: חסרים שדות חובה (branchNumber, year, month)`);
        return;
      }
      const e = [
        validateNumeric(row.grossPremium,  "grossPremium",  rowNum),
        validateNumeric(row.agentComm,     "agentComm",     rowNum),
        validateDate(row.startDate, "startDate", rowNum),
        validateDate(row.endDate,   "endDate",   rowNum),
      ].filter(Boolean) as string[];
      if (e.length) { errors.push(...e); return; }

      const start = parseLocalDate(row.startDate);
      const end   = parseLocalDate(row.endDate);
      if (end <= start) {
        errors.push(`שורה ${rowNum}: endDate (${row.endDate}) חייב להיות אחרי startDate (${row.startDate})`);
        return;
      }
      data.push({
        year: parseInt(row.year), month: parseInt(row.month),
        branchNumber: parseInt(row.branchNumber),
        startDate: start, endDate: end,
        grossPremium:       parseFloat(row.grossPremium       || 0),
        agentComm:          parseFloat(row.agentComm          || 0),
        reinsurancePremium: parseFloat(row.reinsurancePremium || 0),
        reinsuranceComm:    parseFloat(row.reinsuranceComm    || 0),
      });
    });

    if (errors.length > 0) return { success: false, error: errors.join(" | "), errors };
    if (data.length === 0) return { success: false, error: "לא נמצאו שורות תקינות — ודא שקיימות עמודות startDate ו-endDate" };

    const dedupMap = new Map<string, (typeof data)[0]>();
    for (const row of data) dedupMap.set(`${row.year}-${row.month}-${row.branchNumber}`, row);
    const deduped = Array.from(dedupMap.values());

    const periods = [...new Set(deduped.map(d => `${d.year}-${d.month}`))];
    for (const p of periods) {
      const [y, m] = p.split('-').map(Number);
      await prisma.premiumActuals.deleteMany({ where: { year: y, month: m } });
    }
    // S1: chunked insert
    const count = await createManyChunked((chunk) => prisma.premiumActuals.createMany({ data: chunk }), deduped);
    return { success: true, count };
  } catch (e: any) {
    return { success: false, error: "שגיאת פרמיות אמת: " + e.message };
  }
}

// 2b. יצירת פרמיות תחזית חודשיות מפרמטרי תקציב שנתיים
// מחלק expectedGrossPremium ל-12 חודשים שווים, startDate = תחילת חודש, endDate = תחילת אותו חודש שנה הבאה
export async function generateMonthlyBudgetActuals(year: number): Promise<{
  success: boolean; count?: number; branches?: number; error?: string;
}> {
  try {
    const params = await prisma.branchParameters.findMany({ where: { year } });
    if (params.length === 0)
      return { success: false, error: `לא נמצאו פרמטרי תחזית לשנת ${year} — יש לקלוט קובץ תחזית תחילה` };

    const data = [];
    for (const p of params) {
      const monthly = Number(p.expectedGrossPremium) / 12;
      for (let m = 1; m <= 12; m++) {
        const startDate = new Date(year, m - 1, 1, 12, 0, 0);
        const endDate   = new Date(year + 1, m - 1, 1, 12, 0, 0);
        const riPremium = monthly * (Number(p.reinsurancePct) / 100);
        data.push({
          year,
          month:              m,
          branchNumber:       p.branchNumber,
          startDate,
          endDate,
          grossPremium:       monthly,
          agentComm:          monthly * (Number(p.agentCommPct) / 100),
          reinsurancePremium: riPremium,
          reinsuranceComm:    riPremium * (Number(p.reinsuranceCommPct) / 100),
        });
      }
    }

    // מחיקה וקליטה מחדש של כל חודשי השנה
    await prisma.premiumActuals.deleteMany({ where: { year } });
    await prisma.premiumActuals.createMany({ data });

    return { success: true, count: data.length, branches: params.length };
  } catch (e: any) {
    return { success: false, error: "שגיאה ביצירת תחזית חודשית: " + e.message };
  }
}

// 3. קליטת תביעות אמת (Claims Actuals)
export async function uploadClaimsActualsCSV(formData: FormData) {
  try {
    const file = formData.get("file") as File;
    const rawRows = await parseCSV(file);

    // N4: Validation
    const errors: string[] = [];
    const data: any[] = [];
    rawRows.forEach((row, i) => {
      const rowNum = i + 2;
      if (!row.branchNumber || !row.year || !row.month) {
        errors.push(`שורה ${rowNum}: חסרים שדות חובה (branchNumber, year, month)`);
        return;
      }
      const e = [
        validateNumeric(row.claimsPaidGross, "claimsPaidGross", rowNum),
        validateNumeric(row.claimsPaidRi,    "claimsPaidRi",    rowNum),
      ].filter(Boolean) as string[];
      if (e.length) { errors.push(...e); return; }
      data.push({
        year:             parseInt(row.year),
        month:            parseInt(row.month),
        branchNumber:     parseInt(row.branchNumber),
        underwritingYear: parseInt(row.underwritingYear || row.year),
        lossYear:         parseInt(row.lossYear         || row.year),
        claimsPaidGross:  parseFloat(row.claimsPaidGross || 0),
        claimsPaidRi:     parseFloat(row.claimsPaidRi   || 0),
      });
    });

    if (errors.length > 0) return { success: false, error: errors.join(" | "), errors };
    if (data.length === 0) return { success: false, error: "לא נמצאו שורות תקינות" };

    const claimsPeriods = [...new Set(data.map((d: any) => `${d.year}-${d.month}`))];
    for (const p of claimsPeriods) {
      const [y, m] = p.split('-').map(Number);
      await prisma.claimsActuals.deleteMany({ where: { year: y, month: m } });
    }
    // S1: chunked insert
    const count = await createManyChunked((chunk) => prisma.claimsActuals.createMany({ data: chunk }), data);
    return { success: true, count };
  } catch (e: any) {
    return { success: false, error: "שגיאת תביעות אמת: " + e.message };
  }
}

// 4. קליטת אקטואריה (Actuarial)
export async function uploadActuarialCSV(formData: FormData) {
  try {
    const file = formData.get("file") as File;
    const rawRows = await parseCSV(file);

    // N4: Validation
    const errors: string[] = [];
    const data: any[] = [];
    rawRows.forEach((row, i) => {
      const rowNum = i + 2;
      if (!row.branchNumber || !row.year || !row.month) {
        errors.push(`שורה ${rowNum}: חסרים שדות חובה (branchNumber, year, month)`);
        return;
      }
      const numFields = ["outstandingClaimsGross","outstandingClaimsRi","ibnrGross","ibnrRi","actuarialEstimateGross","actuarialEstimateRi"];
      const e = numFields.flatMap(f => validateNumeric(row[f], f, rowNum) ? [validateNumeric(row[f], f, rowNum)!] : []);
      if (e.length) { errors.push(...e); return; }
      data.push({
        year:                   parseInt(row.year),
        month:                  parseInt(row.month),
        branchNumber:           parseInt(row.branchNumber),
        underwritingYear:       parseInt(row.underwritingYear || row.year),
        lossYear:               parseInt(row.lossYear         || row.year),
        outstandingClaimsGross: parseFloat(row.outstandingClaimsGross || 0),
        outstandingClaimsRi:    parseFloat(row.outstandingClaimsRi    || 0),
        ibnrGross:              parseFloat(row.ibnrGross               || 0),
        ibnrRi:                 parseFloat(row.ibnrRi                  || 0),
        actuarialEstimateGross: parseFloat(row.actuarialEstimateGross  || 0),
        actuarialEstimateRi:    parseFloat(row.actuarialEstimateRi     || 0),
      });
    });

    if (errors.length > 0) return { success: false, error: errors.join(" | "), errors };
    if (data.length === 0) return { success: false, error: "לא נמצאו שורות תקינות" };

    const actuarialPeriods = [...new Set(data.map((d: any) => `${d.year}-${d.month}`))];
    for (const p of actuarialPeriods) {
      const [y, m] = (p as string).split('-').map(Number);
      await prisma.actuarialEstimate.deleteMany({ where: { year: y, month: m } });
    }
    // S1: chunked insert
    const count = await createManyChunked((chunk) => prisma.actuarialEstimate.createMany({ data: chunk }), data);
    return { success: true, count };
  } catch (e: any) {
    return { success: false, error: "שגיאת אקטואריה: " + e.message };
  }
}

// ---------------------------------------------------------------------------
// R14 — Carry-forward של נתוני אקטואריה רבעוניים לחודשי הביניים (N3)
// נתוני אקטואריה ריאליים רק בסוף רבעון. פונקציה זו מעתיקה את הערכת
// הרבעון האחרון הזמין לחודש יעד שבו אין נתונים, כדי שה-Variance/LIC
// לא יתאפסו בחודשי ביניים.
// ---------------------------------------------------------------------------
export async function carryForwardActuarial(targetYear: number, targetMonth: number) {
  try {
    // אם כבר יש נתונים לחודש היעד — לא דורסים
    const existing = await prisma.actuarialEstimate.count({ where: { year: targetYear, month: targetMonth } });
    if (existing > 0) {
      return { success: true, carried: 0, message: `כבר קיימים ${existing} נתוני אקטואריה ל-${targetMonth}/${targetYear} — לא בוצע carry-forward` };
    }

    // מצא את התקופה הקודמת האחרונה עם נתוני אקטואריה
    const prior = await prisma.actuarialEstimate.findMany({
      where: {
        OR: [
          { year: targetYear, month: { lt: targetMonth } },
          { year: { lt: targetYear } },
        ],
      },
      orderBy: [{ year: "desc" }, { month: "desc" }],
      take: 1,
    });

    if (prior.length === 0) {
      return { success: false, error: `לא נמצאו נתוני אקטואריה קודמים להעתקה לפני ${targetMonth}/${targetYear}` };
    }

    const srcYear = prior[0].year, srcMonth = prior[0].month;
    const source = await prisma.actuarialEstimate.findMany({ where: { year: srcYear, month: srcMonth } });

    const carried = source.map(s => ({
      year:                   targetYear,
      month:                  targetMonth,
      branchNumber:           s.branchNumber,
      underwritingYear:       s.underwritingYear,
      lossYear:               s.lossYear,
      outstandingClaimsGross: s.outstandingClaimsGross,
      outstandingClaimsRi:    s.outstandingClaimsRi,
      ibnrGross:              s.ibnrGross,
      ibnrRi:                 s.ibnrRi,
      actuarialEstimateGross: s.actuarialEstimateGross,
      actuarialEstimateRi:    s.actuarialEstimateRi,
    }));

    const count = await createManyChunked((chunk) => prisma.actuarialEstimate.createMany({ data: chunk }), carried);
    return { success: true, carried: count, source: `${srcMonth}/${srcYear}` };
  } catch (e: any) {
    return { success: false, error: "שגיאת carry-forward: " + e.message };
  }
}
