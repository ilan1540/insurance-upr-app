"use server";
import { prisma } from "@/lib/prisma";

// הוסף את הטיפוס הזה למעלה
export interface UprExample {
  policyNumber: string;
  premium: number;
  totalDays: number;
  remainingDays: number;
  upr: number;
}




export async function calculateUprSnapshot(snapshotDateStr: string) {
  try {
    // 1. המרת המחרוזת מה-Client לאובייקט Date תקין
    const targetDate = new Date(snapshotDateStr);
    targetDate.setHours(23, 59, 59, 999); // קובעים לסוף היום לחישוב מדויק

    // 2. קריאת כל הרשומות שקלטנו מה-CSV ונמצאות בטבלת Policy
    const policies = await prisma.policy.findMany({
      where: {
        // אופציונלי: אפשר לסנן רק פוליסות שהיו בתוקף בתאריך החתך
        startDate: { lte: targetDate },
        endDate: { gte: targetDate },
        status: "ACTIVE"
      }
    });

    if (policies.length === 0) {
      return { success: false, error: "לא נמצאו פוליסות בתוקף לתאריך שנבחר" };
    }

    // 3. לולאת החישוב על הרשומות שקראנו
    const snapshotResults = policies.map(policy => {
      const start = new Date(policy.startDate);
      const end = new Date(policy.endDate);

      // סך ימי הפוליסה (מכנה)
      const totalDays = Math.max(1, (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
      
      // ימים שנותרו מהחתך ועד סוף הפוליסה (מונה)
      let remainingDays = (end.getTime() - targetDate.getTime()) / (1000 * 60 * 60 * 24);
      
      // הגנות לוגיות
      if (remainingDays < 0) remainingDays = 0;
      if (remainingDays > totalDays) remainingDays = totalDays;

      // נוסחת ה-UPR
      const uprAmount = (policy.premiumAmount * remainingDays) / totalDays;

      return {
        policyId: policy.id,
        snapshotDate: targetDate,
        uprAmount: Math.round(uprAmount * 100) / 100, // עיגול ל-2 ספרות
      };
    });

    // 4. שמירה לטבלת ה-Snapshots
    // הערה: אם אתה רוצה לאפשר הרצה חוזרת לאותו תאריך, כדאי למחוק קודם Snapshots קודמים של אותו יום
    await prisma.uprSnapshot.createMany({
      data: snapshotResults
    });

    return { 
      success: true, 
      count: snapshotResults.length,
      totalUpr: snapshotResults.reduce((sum, item) => sum + item.uprAmount, 0)
    };

  } catch (error: any) {
    console.error("שגיאה בחישוב UPR:", error);
    return { success: false, error: error.message };
  }
}