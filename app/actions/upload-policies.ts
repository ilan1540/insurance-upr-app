"use server";
import { prisma } from "@/lib/prisma";
import { Readable } from "stream";
import csv from "csv-parser";

// 1. הגדרת Interface למבנה השורה ב-CSV כדי ש-TS ידע מה יש בתוך row
interface CSVRow {
  policyNumber: string;
  branchNumber: string;
  startDate: string;
  endDate: string;
  premiumAmount: string;
}

// פונקצית המרת תאריכים עם הגדרת סוג ל-dateString
function parseIsraeliDate(dateString: string): Date | null {
  if (!dateString) return null;
  
  const [day, month, year] = dateString.split('/').map(Number);
  const date = new Date(year, month - 1, day);
  
  return isNaN(date.getTime()) ? null : date;
}

// הגדרת סוג ל-formData כ-FormData של Web API
export async function uploadPoliciesCSV(formData: FormData) {
  const file = formData.get("file") as File; // Casting לטיפוס File
  if (!file) throw new Error("לא נבחר קובץ");

  const buffer = Buffer.from(await file.arrayBuffer());
  
  // הגדרת המערך ככזה שמכיל אובייקטים שמתאימים למודל של Prisma
  const results: any[] = [];

 // const stream = Readable.from(buffer).pipe(csv());

  // הוספת האופציה mapHeaders כדי לנקות רווחים ותווים נסתרים
const stream = Readable.from(buffer).pipe(csv({
  mapHeaders: ({ header }) => header.trim().replace(/^\uFEFF/, '') 
}));

  // בתוך קובץ upload-policies.ts, בתוך הלולאה שעוברת על ה-CSV:

for await (const row of stream) {
  // לוג לבדיקה - הדפס את השורה הראשונה כדי לראות את שמות העמודות האמיתיים
  if (results.length === 0) console.log("שורת דגימה מה-CSV:", row);

  // ניסיון לחלץ מספר פוליסה - תומך גם בפורמטים שונים של שמות עמודות
  const pNumber = row.policyNumber || row['policyNumber'] || row['מספר פוליסה'];
  
  if (!pNumber) {
    console.error("שגיאה: חסר מספר פוליסה בשורה:", row);
    continue; // מדלג על שורה בלי מספר פוליסה
  }

  const startDate = parseIsraeliDate(row.startDate || row['startDate']);
  const endDate = parseIsraeliDate(row.endDate || row['endDate']);

  if (startDate && endDate) {
    results.push({
      policyNumber: String(pNumber).trim(), // מוודא שזה מחרוזת נקייה
      branchNumber: parseInt(row.branchNumber),
      startDate,
      endDate,
      premiumAmount: parseFloat(row.premiumAmount),
      status: "ACTIVE",
    });
  }
}

  try {
    // פקודה חדשה: מוחקת את כל הרשומות הקיימות בטבלת Policy ממנטרל את שורות 72 73 כדי לא למחוק
  //await prisma.policy.deleteMany({}); 
  //console.log("הטבלה נוקתה בהצלחה לפני קליטה חדשה");
    // הקלטה החדשה
    
    const createdCount = await prisma.policy.createMany({
      data: results,
      skipDuplicates: true,
    });

    return { success: true, count: createdCount.count };
  } catch (error: any) { // הגדרת error כ-any כדי לגשת ל-message
    console.error("Upload Error:", error);
    return { success: false, error: error.message };
  }
}