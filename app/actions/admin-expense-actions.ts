"use server";

import { prisma } from "@/lib/prisma";
import { allocateAdminExpenses } from "@/lib/insurance-logic";
import { Readable } from "stream";
import csv from "csv-parser";

async function parseCSV(file: File): Promise<any[]> {
  const buffer = Buffer.from(await file.arrayBuffer());
  const results: any[] = [];
  const stream = Readable.from(buffer).pipe(csv({ mapHeaders: ({ header }) => header.trim() }));
  for await (const row of stream) results.push(row);
  return results;
}

/** קליטת הוצאות הנה"כ מקובץ CSV */
export async function uploadAdminExpenseCSV(formData: FormData) {
  try {
    const file = formData.get("file") as File;
    if (!file) return { success: false, error: "לא נבחר קובץ" };

    const rawRows = await parseCSV(file);

    const data = rawRows
      .filter(r => r.year && r.month)
      .map(row => ({
        year:           parseInt(row.year),
        month:          parseInt(row.month),
        premiumExpense: parseFloat(row.premiumExpense ?? row.premium_expense ?? 0),
        claimsExpense:  parseFloat(row.claimsExpense  ?? row.claims_expense  ?? 0),
        description:    row.description?.trim() || null,
      }));

    if (data.length === 0) return { success: false, error: "לא נמצאו שורות תקינות בקובץ" };

    // upsert במקביל — אין צורך ב-transaction כי כל שורה עצמאית
    await Promise.all(
      data.map(row =>
        prisma.adminExpense.upsert({
          where:  { year_month: { year: row.year, month: row.month } },
          update: { premiumExpense: row.premiumExpense, claimsExpense: row.claimsExpense, description: row.description },
          create: row,
        })
      )
    );

    return { success: true, count: data.length };
  } catch (e: any) {
    return { success: false, error: "שגיאת קליטה: " + e.message };
  }
}

/** שמירה / עדכון הוצאות הנהלה וכלליות לתקופה */
export async function saveAdminExpense(
  year: number,
  month: number,
  premiumExpense: number,
  claimsExpense: number,
  description?: string
) {
  try {
    await prisma.adminExpense.upsert({
      where: { year_month: { year, month } },
      update: { premiumExpense, claimsExpense, description: description ?? null },
      create: { year, month, premiumExpense, claimsExpense, description: description ?? null },
    });
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

/** קריאת הוצאות + חישוב הקצאה לענפים לפי IFRS17 */
export async function getAdminExpenseAllocation(year: number, month: number) {
  try {
    const [snapshots, params, expense] = await Promise.all([
      prisma.uprSnapshot.findMany({ where: { year, period: month, periodType: "MONTHLY" } }),
      prisma.branchParameters.findMany({ where: { year } }),
      prisma.adminExpense.findUnique({ where: { year_month: { year, month } } }),
    ]);

    const paramsMap = new Map(params.map(p => [p.branchNumber, p]));

    const branches = snapshots
      .filter(s => Number(s.originalPremium ?? 0) > 0)
      .map(s => {
        const grossWritten = Number(s.originalPremium ?? 0);
        const uprValue     = Number(s.uprValue);
        const earnedGross  = grossWritten - uprValue;
        const expectedLrPct = Number(paramsMap.get(s.branchNumber)?.expectedLrPct ?? 0);
        return { branchNumber: s.branchNumber, earnedGross, expectedLrPct };
      });

    const premiumExpense = expense?.premiumExpense ?? 0;
    const claimsExpense  = expense?.claimsExpense  ?? 0;

    const allocations = allocateAdminExpenses(branches, premiumExpense, claimsExpense);

    return {
      success: true,
      expense: expense
        ? { year, month, premiumExpense, claimsExpense, description: expense.description }
        : null,
      allocations,
    };
  } catch (error: any) {
    return { success: false, error: error.message, expense: null, allocations: [] };
  }
}

/** קריאת כל ההוצאות לפי שנה */
export async function getAdminExpensesByYear(year: number) {
  try {
    const expenses = await prisma.adminExpense.findMany({
      where: { year },
      orderBy: { month: "asc" },
    });
    return { success: true, expenses };
  } catch (error: any) {
    return { success: false, error: error.message, expenses: [] };
  }
}
