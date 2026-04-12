"use server";
import { prisma } from "@/lib/prisma";
import { Readable } from "stream";
import csv from "csv-parser";

export async function uploadActuarialCSV(formData: FormData) {
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
        month: parseInt(row.month),
        branchNumber: parseInt(row.branchNumber),
        estimateValue: parseFloat(row.estimateValue || 0)
      });
    }

    await prisma.$transaction([
      // מחיקת נתונים קודמים רק לאותה תקופה שנטענה
      prisma.actuarialEstimate.deleteMany({
        where: { year: results[0].year, month: results[0].month }
      }),
      prisma.actuarialEstimate.createMany({ data: results })
    ]);

    return { success: true, count: results.length };
  } catch (e: any) {
    return { success: false, error: e.message };
  }
}