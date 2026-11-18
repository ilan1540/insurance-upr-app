// lib/reconciliation.ts
// ---------------------------------------------------------------------------
// R12 — Business validation & cross-checks
//
// בדיקות עקביות עסקיות לפני סגירת תקופה. כל בדיקה מחזירה ממצא עם חומרה.
// פונקציות טהורות — מקבלות נתונים שכבר נשלפו, ללא תלות ב-DB.
// ---------------------------------------------------------------------------

export type CheckSeverity = "ERROR" | "WARNING" | "INFO";

export interface CheckFinding {
  code: string;
  severity: CheckSeverity;
  branchNumber?: number;
  message: string;
}

export interface BranchReconInput {
  branchNumber: number;
  grossPremium: number;
  riPremium: number;
  uprValue: number;
  licGross: number;
  licRi: number;
  expectedLrPct: number;
  actualLrPct?: number;
  openingFromPriorClosing?: { opening: number; priorClosing: number }; // פתיחה(t) מול סגירה(t-1)
}

const TOL = 1; // סובלנות ₪ לפיוס פתיחה/סגירה

export function runReconciliationChecks(branches: BranchReconInput[]): CheckFinding[] {
  const findings: CheckFinding[] = [];

  for (const b of branches) {
    // 1. ב"מ לא יכול לעלות על ברוטו
    if (b.riPremium > b.grossPremium + TOL) {
      findings.push({ code: "RI_GT_GROSS", severity: "ERROR", branchNumber: b.branchNumber,
        message: `פרמיית ב"מ (${round(b.riPremium)}) גדולה מהברוטו (${round(b.grossPremium)})` });
    }
    if (b.licRi > b.licGross + TOL) {
      findings.push({ code: "LIC_RI_GT_GROSS", severity: "ERROR", branchNumber: b.branchNumber,
        message: `חלק ב"מ ב-LIC (${round(b.licRi)}) גדול מ-LIC ברוטו (${round(b.licGross)})` });
    }

    // 2. UPR לא יכול לעלות על הפרמיה
    if (b.uprValue > b.grossPremium + TOL) {
      findings.push({ code: "UPR_GT_PREMIUM", severity: "ERROR", branchNumber: b.branchNumber,
        message: `UPR (${round(b.uprValue)}) גדול מהפרמיה הכתובה (${round(b.grossPremium)})` });
    }

    // 3. ערכים שליליים חריגים
    if (b.grossPremium < 0 || b.uprValue < 0 || b.licGross < 0) {
      findings.push({ code: "NEGATIVE_VALUE", severity: "ERROR", branchNumber: b.branchNumber,
        message: `נמצא ערך שלילי חריג (פרמיה/UPR/LIC)` });
    }

    // 4. LR סביר
    if (b.expectedLrPct < 0 || b.expectedLrPct > 200) {
      findings.push({ code: "LR_OUT_OF_RANGE", severity: "WARNING", branchNumber: b.branchNumber,
        message: `LR צפוי חריג: ${b.expectedLrPct}%` });
    }

    // 5. סטייה גדולה בין LR בפועל לצפוי
    if (b.actualLrPct !== undefined && Math.abs(b.actualLrPct - b.expectedLrPct) > 25) {
      findings.push({ code: "LR_DEVIATION", severity: "WARNING", branchNumber: b.branchNumber,
        message: `סטיית LR גדולה: בפועל ${round(b.actualLrPct)}% מול צפוי ${b.expectedLrPct}%` });
    }

    // 6. פיוס פתיחה(t) = סגירה(t-1)
    if (b.openingFromPriorClosing) {
      const diff = Math.abs(b.openingFromPriorClosing.opening - b.openingFromPriorClosing.priorClosing);
      if (diff > TOL) {
        findings.push({ code: "OPENING_MISMATCH", severity: "ERROR", branchNumber: b.branchNumber,
          message: `פתיחה (${round(b.openingFromPriorClosing.opening)}) ≠ סגירת תקופה קודמת (${round(b.openingFromPriorClosing.priorClosing)})` });
      }
    }
  }

  if (findings.length === 0) {
    findings.push({ code: "ALL_CLEAR", severity: "INFO", message: "כל הבדיקות עברו בהצלחה" });
  }
  return findings;
}

export function summarizeFindings(findings: CheckFinding[]) {
  return {
    errors: findings.filter(f => f.severity === "ERROR").length,
    warnings: findings.filter(f => f.severity === "WARNING").length,
    canClose: findings.filter(f => f.severity === "ERROR").length === 0,
  };
}

function round(n: number): number { return Math.round(n * 100) / 100; }
