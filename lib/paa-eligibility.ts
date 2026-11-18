// lib/paa-eligibility.ts
// ---------------------------------------------------------------------------
// R4 — PAA Eligibility assessment (IFRS17 §53-54)
//
// PAA מותר כאשר:
//   (א) תקופת הכיסוי של כל חוזה בקבוצה ≤ 12 חודשים, או
//   (ב) המדידה לפי PAA אינה שונה מהותית ממדידת ה-GMM (§53(b)).
// ---------------------------------------------------------------------------

export interface PaaEligibilityInput {
  coveragePeriodMonths: number;       // תקופת כיסוי מקסימלית בקבוצה
  expectsSignificantVariability?: boolean; // האם צפויה שונות מהותית ב-FCF (§54)
  paaVsGmmDiffPct?: number;           // הפרש מוערך בין PAA ל-GMM (%) — אם נבדק
  materialityThresholdPct?: number;   // סף מהותיות (ברירת מחדל 5%)
}

export interface PaaEligibilityResult {
  eligible: boolean;
  reason: string;
  basis: "COVERAGE_LE_12M" | "NOT_MATERIALLY_DIFFERENT" | "INELIGIBLE";
}

export function assessPaaEligibility(input: PaaEligibilityInput): PaaEligibilityResult {
  const threshold = input.materialityThresholdPct ?? 5;

  // מסלול (א): תקופת כיסוי קצרה
  if (input.coveragePeriodMonths <= 12) {
    return {
      eligible: true,
      basis: "COVERAGE_LE_12M",
      reason: `תקופת כיסוי ${input.coveragePeriodMonths} חודשים ≤ 12 — זכאי ל-PAA (§53(a))`,
    };
  }

  // מסלול (ב): בדיקת מהותיות מול GMM
  // אם צפויה שונות מהותית — לא זכאי (§54)
  if (input.expectsSignificantVariability) {
    return {
      eligible: false,
      basis: "INELIGIBLE",
      reason: "תקופת כיסוי > 12 חודשים וצפויה שונות מהותית ב-FCF — נדרש GMM (§54)",
    };
  }

  if (input.paaVsGmmDiffPct !== undefined && Math.abs(input.paaVsGmmDiffPct) <= threshold) {
    return {
      eligible: true,
      basis: "NOT_MATERIALLY_DIFFERENT",
      reason: `הפרש PAA מול GMM ${input.paaVsGmmDiffPct.toFixed(1)}% ≤ סף ${threshold}% — זכאי (§53(b))`,
    };
  }

  return {
    eligible: false,
    basis: "INELIGIBLE",
    reason: "תקופת כיסוי > 12 חודשים ולא הוכח שאינו שונה מהותית מ-GMM — נדרשת בדיקה / GMM",
  };
}
