// lib/earning-patterns.ts
// ---------------------------------------------------------------------------
// R7 — Earning patterns (IFRS17 §B35-B35B)
//
// תמיכה בתבניות הכרה בפרמיה מעבר ל-Pro-Rata קלנדרי:
//   PRO_RATA   — לפי ימי לוח-שנה (ברירת מחדל הקיימת)
//   EVEN_24THS — שיטת 24ths (חצי חודש בכל קצה)
//   EXPOSURE   — עקום חשיפה מותאם (עונתיות), נמסר כמערך משקלים חודשיים
// ---------------------------------------------------------------------------

export type EarningPattern = "PRO_RATA" | "EVEN_24THS" | "EXPOSURE";

export interface UprPatternInput {
  pattern: EarningPattern;
  grossPremium: number;
  startDate: Date;
  endDate: Date;
  cutoff: Date;                 // יום החתך לחישוב UPR
  exposureWeights?: number[];   // משקלי חשיפה חודשיים (ל-EXPOSURE), כל אורך
}

const DAY = 86400000;

function proRataRatio(start: Date, end: Date, cutoff: Date): number {
  const total = (end.getTime() - start.getTime()) / DAY;
  const remaining = (end.getTime() - cutoff.getTime()) / DAY;
  if (total <= 0) return 0;
  return Math.min(Math.max(remaining / total, 0), 1);
}

// שיטת 24ths — כל חודש פעיל = 1/12, החודשים בקצוות = 1/24
function even24thsRatio(start: Date, end: Date, cutoff: Date): number {
  // קירוב: מספר חודשים שלמים נותרים + חצי-חודשי קצה
  const monthsTotal = monthsBetween(start, end);
  if (monthsTotal <= 0) return 0;
  const monthsRemaining = monthsBetween(cutoff, end);
  const earnedFraction = (monthsTotal - monthsRemaining) / monthsTotal;
  // התאמת חצי-חודש בקצה הראשון
  const adjusted = Math.min(Math.max(1 - earnedFraction, 0), 1);
  return adjusted;
}

function monthsBetween(a: Date, b: Date): number {
  return (b.getFullYear() - a.getFullYear()) * 12 + (b.getMonth() - a.getMonth()) + (b.getDate() - a.getDate()) / 30;
}

// עקום חשיפה — סכום משקלים שטרם הורווחו / סך משקלים
function exposureRatio(start: Date, end: Date, cutoff: Date, weights: number[]): number {
  const totalMonths = Math.max(1, Math.round(monthsBetween(start, end)));
  const w = weights.length === totalMonths
    ? weights
    : normalizeWeights(weights, totalMonths);
  const totalW = w.reduce((s, x) => s + x, 0) || 1;
  const elapsedMonths = Math.min(Math.max(monthsBetween(start, cutoff), 0), totalMonths);
  let earnedW = 0;
  for (let i = 0; i < totalMonths; i++) {
    const monthEnd = i + 1;
    if (elapsedMonths >= monthEnd) earnedW += w[i];
    else if (elapsedMonths > i) earnedW += w[i] * (elapsedMonths - i);
  }
  return Math.min(Math.max(1 - earnedW / totalW, 0), 1);
}

function normalizeWeights(weights: number[], n: number): number[] {
  if (weights.length === 0) return Array(n).fill(1);
  const out: number[] = [];
  for (let i = 0; i < n; i++) out.push(weights[i % weights.length]);
  return out;
}

export function calculateUprByPattern(input: UprPatternInput): { uprRatio: number; uprValue: number; earnedValue: number } {
  let ratio: number;
  switch (input.pattern) {
    case "EVEN_24THS":
      ratio = even24thsRatio(input.startDate, input.endDate, input.cutoff);
      break;
    case "EXPOSURE":
      ratio = exposureRatio(input.startDate, input.endDate, input.cutoff, input.exposureWeights ?? []);
      break;
    case "PRO_RATA":
    default:
      ratio = proRataRatio(input.startDate, input.endDate, input.cutoff);
      break;
  }
  const uprValue = Math.round(input.grossPremium * ratio * 100) / 100;
  return {
    uprRatio: ratio,
    uprValue,
    earnedValue: Math.round((input.grossPremium - uprValue) * 100) / 100,
  };
}
