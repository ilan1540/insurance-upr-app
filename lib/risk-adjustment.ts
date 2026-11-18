// lib/risk-adjustment.ts
// ---------------------------------------------------------------------------
// R1 — Risk Adjustment for non-financial risk (IFRS17 §37, §81)
//
// התאמה בגין סיכון לא-פיננסי על תזרימי ה-LIC (ובחוזים הפסדיים גם על ה-LRC).
// תומך בשלוש שיטות נפוצות:
//   PERCENTAGE     — אחוז קבוע מ-LIC נטו (הפשוטה ביותר)
//   COST_OF_CAPITAL— RA = capital × CoC% × duration (Solvency II style)
//   CONFIDENCE     — RA = factor(confidenceLevel) × volatility × LIC
// ---------------------------------------------------------------------------

export type RaMethod = "PERCENTAGE" | "COST_OF_CAPITAL" | "CONFIDENCE";

export interface RiskAdjustmentInput {
  method: RaMethod;
  licNet: number;                 // LIC נטו (בסיס החישוב)
  // PERCENTAGE
  percentage?: number;            // אחוז (למשל 6 = 6%)
  // COST_OF_CAPITAL
  capitalCharge?: number;         // הון נדרש (SCR / capital at risk)
  cocRate?: number;               // שיעור עלות הון (למשל 6%)
  duration?: number;              // משך ממוצע בשנים
  // CONFIDENCE
  confidenceLevel?: number;       // רמת ביטחון (למשל 75 = 75%)
  volatility?: number;            // סטיית תקן יחסית של ההתחייבות (CoV)
}

export interface RiskAdjustmentResult {
  riskAdjustment: number;         // ערך ה-RA (₪)
  raRatio: number;                // RA / LIC נטו
  method: RaMethod;
}

// טבלת z-factor מקורבת לרמות ביטחון נפוצות (נורמלי חד-צדדי)
const Z_BY_CONFIDENCE: Record<number, number> = {
  60: 0.253, 65: 0.385, 70: 0.524, 75: 0.674,
  80: 0.842, 85: 1.036, 90: 1.282, 95: 1.645, 99: 2.326,
};

function zFactor(confidence: number): number {
  // התאמה לרמה הקרובה ביותר אם אין ערך מדויק
  if (Z_BY_CONFIDENCE[confidence] !== undefined) return Z_BY_CONFIDENCE[confidence];
  const keys = Object.keys(Z_BY_CONFIDENCE).map(Number).sort((a, b) => a - b);
  const nearest = keys.reduce((best, k) =>
    Math.abs(k - confidence) < Math.abs(best - confidence) ? k : best, keys[0]);
  return Z_BY_CONFIDENCE[nearest];
}

export function calculateRiskAdjustment(input: RiskAdjustmentInput): RiskAdjustmentResult {
  const { method, licNet } = input;
  let ra = 0;

  switch (method) {
    case "PERCENTAGE":
      ra = licNet * ((input.percentage ?? 0) / 100);
      break;

    case "COST_OF_CAPITAL":
      // RA ≈ Σ capital × CoC; קירוב: capital × CoC% × duration
      ra = (input.capitalCharge ?? 0) * ((input.cocRate ?? 0) / 100) * (input.duration ?? 1);
      break;

    case "CONFIDENCE":
      // RA = z(confidence) × volatility × LIC
      ra = zFactor(input.confidenceLevel ?? 75) * (input.volatility ?? 0) * licNet;
      break;
  }

  ra = Math.max(0, ra);
  return {
    riskAdjustment: Math.round(ra * 100) / 100,
    raRatio: licNet > 0 ? ra / licNet : 0,
    method,
  };
}

// שחרור RA לאורך זמן (Release) — בקו ישר לפי משך התקופה שחלפה
export function releaseRiskAdjustment(openingRa: number, monthsElapsed: number, totalMonths: number): number {
  if (totalMonths <= 0) return 0;
  const released = openingRa * Math.min(monthsElapsed / totalMonths, 1);
  return Math.round(released * 100) / 100;
}
