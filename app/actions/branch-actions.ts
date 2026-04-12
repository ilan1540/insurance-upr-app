"use server";

import { prisma } from "@/lib/prisma";
import { Readable } from "stream";
import csv from "csv-parser";

async function parseCSV(file: File): Promise<any[]> {
  const buffer = Buffer.from(await file.arrayBuffer());
  const results: any[] = [];
  const stream = Readable.from(buffer).pipe(csv({ mapHeaders: ({ header }) => header.trim().replace(/^\uFEFF/, '') }));
  for await (const row of stream) results.push(row);
  return results;
}

/** קליטת ענפים מ-CSV */
export async function uploadBranchesCSV(formData: FormData) {
  try {
    const file = formData.get("file") as File;
    if (!file) return { success: false, error: "לא נבחר קובץ" };

    const rawRows = await parseCSV(file);
    const data = rawRows
      .filter(r => r.branchNumber && r.branchName)
      .map(row => ({
        branchNumber: parseInt(row.branchNumber),
        branchName:   row.branchName.trim(),
        groupCode:    row.groupCode?.trim() || "OTHER",
        groupName:    row.groupName?.trim() || "אחר",
      }));

    if (data.length === 0) return { success: false, error: "לא נמצאו שורות תקינות בקובץ" };

    await Promise.all(
      data.map(row =>
        prisma.branch.upsert({
          where:  { branchNumber: row.branchNumber },
          update: { branchName: row.branchName, groupCode: row.groupCode, groupName: row.groupName },
          create: row,
        })
      )
    );

    return { success: true, count: data.length };
  } catch (e: any) {
    return { success: false, error: "שגיאת קליטה: " + e.message };
  }
}

/** שליפת כל הענפים */
export async function getAllBranches() {
  try {
    const branches = await prisma.branch.findMany({ orderBy: [{ groupCode: "asc" }, { branchNumber: "asc" }] });
    return { success: true, branches };
  } catch (e: any) {
    return { success: false, error: e.message, branches: [] };
  }
}

/** מפה מהירה branchNumber → { branchName, groupCode, groupName } */
export async function getBranchMap(): Promise<Map<number, { branchName: string; groupCode: string; groupName: string }>> {
  const branches = await prisma.branch.findMany();
  return new Map(branches.map(b => [b.branchNumber, { branchName: b.branchName, groupCode: b.groupCode, groupName: b.groupName }]));
}
