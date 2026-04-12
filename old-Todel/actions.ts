"use server";
import { prisma } from "@/lib/prisma";
import { Readable } from "stream";
import csv from "csv-parser";

export async function uploadBranchActuals(formData: FormData) {
  const file = formData.get("file") as File;
  const year = parseInt(formData.get("year") as string);
  const month = parseInt(formData.get("month") as string);

  const buffer = Buffer.from(await file.arrayBuffer());
  const results: any[] = [];
  const stream = Readable.from(buffer).pipe(csv());

  for await (const row of stream) {
    results.push({
      year,
      month,
      branchNumber: parseInt(row.branchNumber || row['ענף']),
      actualWrittenPremium: parseFloat(row.actualWrittenPremium || 0),
      actualPaidComm: parseFloat(row.actualPaidComm || 0),
      actualRiPremium: parseFloat(row.actualRiPremium || 0),
      actualRiCommReceived: parseFloat(row.actualRiCommReceived || 0),
      paidClaims: parseFloat(row.paidClaims || 0),
      outstandingClaims: parseFloat(row.outstandingClaims || 0),
      ibnr: parseFloat(row.ibnr || 0),
    });
  }

  try {
    // מחיקת נתונים קיימים לאותו חודש/שנה למניעת כפילויות
    await prisma.branchActuals.deleteMany({ where: { year, month } });
    const created = await prisma.branchActuals.createMany({ data: results });
    return { success: true, count: created.count };
  } catch (e: any) {
    return { success: false, error: e.message };
  }
}