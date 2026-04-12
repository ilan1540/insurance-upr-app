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
      // דילוג על שורות ריקות
      if (!row.branchNumber || !row.year) continue;

      results.push({
        year: parseInt(row.year),
        month: parseInt(row.month),
        branchNumber: parseInt(row.branchNumber),
        // שימוש ב-OR כדי לתמוך בשמות עמודות מעט שונים (למשל עם/בלי אות גדולה)
        outstandingClaimsGross: parseFloat(row.outstandingClaimsGross || row.outstanding_claims_gross || 0),
        outstandingClaimsRi: parseFloat(row.outstandingClaimsRi || row.outstanding_claims_ri || 0),
        ibnrGross: parseFloat(row.ibnrGross || row.ibnr_gross || 0),
        ibnrRi: parseFloat(row.ibnrRi || row.ibnr_ri || 0)
      });
    }

    if (results.length === 0) return { success: false, error: "לא נמצאו נתונים תקינים בקובץ" };

    // חילוץ שנה וחודש מהשורה הראשונה לצורך ניקוי נתונים קודמים
    const targetYear = results[0].year;
    const targetMonth = results[0].month;

    await prisma.$transaction([
      // מחיקת נתוני אקטואריה קיימים לאותה תקופה בדיוק
      prisma.actuarialEstimate.deleteMany({
        where: { 
          year: targetYear,
          month: targetMonth
        }
      }),
      // הכנסת הנתונים החדשים
      prisma.actuarialEstimate.createMany({ data: results })
    ]);

    return { success: true, count: results.length };
  } catch (e: any) {
    console.error("Actuarial Upload Error:", e);
    return { success: false, error: "שגיאת DB: " + e.message };
  }
}