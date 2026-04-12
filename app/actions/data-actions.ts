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

    const years = [...new Set(data.map(d => d.year))];
    await prisma.$transaction([
      prisma.branchParameters.deleteMany({ where: { year: { in: years } } }),
      prisma.branchParameters.createMany({ data }),
    ]);
    return { success: true, count: data.length };
  } catch (e: any) {
    return { success: false, error: "שגיאת תחזית: " + e.message };
  }
}

// 2. קליטת פרמיות אמת (Premium Actuals)
export async function uploadPremiumActualsCSV(formData: FormData) {
  try {
    const file = formData.get("file") as File;
    const rawRows = await parseCSV(file);

    // פרסור תאריך ללא timezone — תומך ב-YYYY-MM-DD וגם DD/MM/YYYY
    const parseLocalDate = (s: string): Date => {
      const clean = s?.toString().trim();
      const parts = clean.split(/[-\/]/).map(Number);
      if (parts.length !== 3 || parts.some(isNaN)) throw new Error(`תאריך לא תקין: "${clean}"`);
      const [y, mo, d] = parts[0] > 31 ? parts : [parts[2], parts[1], parts[0]];
      if (!y || !mo || !d) throw new Error(`תאריך לא תקין: "${clean}"`);
      return new Date(y, mo - 1, d, 12, 0, 0);
    };

    const data = rawRows.filter(r => r.branchNumber && r.year && r.month && r.startDate && r.endDate).map(row => ({
      year:               parseInt(row.year),
      month:              parseInt(row.month),
      branchNumber:       parseInt(row.branchNumber),
      startDate:          parseLocalDate(row.startDate),
      endDate:            parseLocalDate(row.endDate),
      grossPremium:       parseFloat(row.grossPremium       || 0),
      agentComm:          parseFloat(row.agentComm          || 0),
      reinsurancePremium: parseFloat(row.reinsurancePremium || 0),
      reinsuranceComm:    parseFloat(row.reinsuranceComm    || 0),
    }));

    if (data.length === 0) return { success: false, error: "לא נמצאו שורות תקינות — ודא שקיימות עמודות startDate ו-endDate" };

    // מחיקה לפי כל השנים+חודשים שמופיעים בקובץ (לא רק השורה הראשונה)
    const periods = [...new Set(data.map(d => `${d.year}-${d.month}`))];
    for (const p of periods) {
      const [y, m] = p.split('-').map(Number);
      await prisma.premiumActuals.deleteMany({ where: { year: y, month: m } });
    }
    await prisma.premiumActuals.createMany({ data });
    return { success: true, count: data.length };
  } catch (e: any) {
    return { success: false, error: "שגיאת פרמיות אמת: " + e.message };
  }
}

// 3. קליטת תביעות אמת (Claims Actuals)
export async function uploadClaimsActualsCSV(formData: FormData) {
  try {
    const file = formData.get("file") as File;
    const rawRows = await parseCSV(file);

    const data = rawRows.filter(r => r.branchNumber && r.year && r.month).map(row => ({
      year:             parseInt(row.year),
      month:            parseInt(row.month),
      branchNumber:     parseInt(row.branchNumber),
      underwritingYear: parseInt(row.underwritingYear || row.year),
      lossYear:         parseInt(row.lossYear         || row.year),
      claimsPaidGross:  parseFloat(row.claimsPaidGross || 0),
      claimsPaidRi:     parseFloat(row.claimsPaidRi   || 0),
    }));

    if (data.length === 0) return { success: false, error: "לא נמצאו שורות תקינות" };

    const claimsPeriods = [...new Set(data.map(d => `${d.year}-${d.month}`))];
    for (const p of claimsPeriods) {
      const [y, m] = p.split('-').map(Number);
      await prisma.claimsActuals.deleteMany({ where: { year: y, month: m } });
    }
    await prisma.claimsActuals.createMany({ data });
    return { success: true, count: data.length };
  } catch (e: any) {
    return { success: false, error: "שגיאת תביעות אמת: " + e.message };
  }
}

// 4. קליטת אקטואריה (Actuarial)
export async function uploadActuarialCSV(formData: FormData) {
  try {
    const file = formData.get("file") as File;
    const rawRows = await parseCSV(file);

    const data = rawRows.filter(r => r.branchNumber && r.year && r.month).map(row => ({
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
    }));

    if (data.length === 0) return { success: false, error: "לא נמצאו שורות תקינות" };

    const actuarialPeriods = [...new Set(data.map(d => `${d.year}-${d.month}`))];
    for (const p of actuarialPeriods) {
      const [y, m] = p.split('-').map(Number);
      await prisma.actuarialEstimate.deleteMany({ where: { year: y, month: m } });
    }
    await prisma.actuarialEstimate.createMany({ data });
    return { success: true, count: data.length };
  } catch (e: any) {
    return { success: false, error: "שגיאת אקטואריה: " + e.message };
  }
}
