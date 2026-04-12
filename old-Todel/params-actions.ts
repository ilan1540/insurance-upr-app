"use server";
import { prisma } from "@/lib/prisma";
import { Readable } from "stream";
import csv from "csv-parser";

export async function uploadBranchParamsCSV(formData: FormData) {
  try {
    const file = formData.get("file") as File;
    const buffer = Buffer.from(await file.arrayBuffer());
    const results: any[] = [];

    const stream = Readable.from(buffer).pipe(csv({
      mapHeaders: ({ header }) => header.trim()
    }));

    for await (const row of stream) {
      if (!row.branchNumber) continue;

      results.push({
        year: parseInt(row.year),
        branchNumber: parseInt(row.branchNumber),
        // תיקון לחיתוך של אקסל בתמונה שלך (Premiu במקום Premium)
        expectedGrossPremium: parseFloat(row.expectedGrossPremium || row.expectedGrossPremiu || 0),
        agentCommPct: parseFloat(row.agentCommPct || 0),
        reinsurancePct: parseFloat(row.reinsurancePct || 0),
        reinsuranceCommPct: parseFloat(row.reinsuranceCommPct || 0),
        expectedLrPct: parseFloat(row.expectedLrPct || 0)
      });
    }

    if (results.length === 0) return { success: false, error: "לא נמצאו נתונים בקובץ" };

    await prisma.$transaction([
      prisma.branchParameters.deleteMany({ where: { year: results[0].year } }),
      prisma.branchParameters.createMany({ data: results })
    ]);

    return { success: true, count: results.length };
  } catch (e: any) {
    return { success: false, error: "שגיאת DB: " + e.message };
  }
}