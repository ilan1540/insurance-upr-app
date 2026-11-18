// lib/discounting.ts
// ---------------------------------------------------------------------------
// R2 — Discounting of cash flows (IFRS17 §36, §56, §B72)
//
// היוון תזרימי תביעות עתידיים (LIC עם זנב ארוך) ו-unwind של ההיוון
// (Insurance finance expense). עקום הריבית נמסר כ-spot rates לפי שנה.
// ---------------------------------------------------------------------------

export interface CashflowByYear {
  yearOffset: number;   // מספר שנים מהיום (1 = בעוד שנה)
  amount: number;       // תזרים נומינלי באותה שנה
}

export interface DiscountCurvePoint {
  yearOffset: number;   // נקודת זמן בעקום
  spotRate: number;     // שיעור spot שנתי (למשל 0.04 = 4%)
}

// אינטרפולציה ליניארית של spot rate לכל yearOffset
export function spotRateFor(curve: DiscountCurvePoint[], yearOffset: number): number {
  if (curve.length === 0) return 0;
  const sorted = [...curve].sort((a, b) => a.yearOffset - b.yearOffset);
  if (yearOffset <= sorted[0].yearOffset) return sorted[0].spotRate;
  if (yearOffset >= sorted[sorted.length - 1].yearOffset) return sorted[sorted.length - 1].spotRate;
  for (let i = 0; i < sorted.length - 1; i++) {
    const a = sorted[i], b = sorted[i + 1];
    if (yearOffset >= a.yearOffset && yearOffset <= b.yearOffset) {
      const t = (yearOffset - a.yearOffset) / (b.yearOffset - a.yearOffset);
      return a.spotRate + t * (b.spotRate - a.spotRate);
    }
  }
  return sorted[sorted.length - 1].spotRate;
}

export interface DiscountResult {
  presentValue: number;      // ערך נוכחי מהוון
  nominalValue: number;      // ערך נומינלי (לא מהוון)
  discountEffect: number;    // ההפרש (נומינלי − PV) = אפקט ההיוון
}

// היוון מערך תזרימים לפי עקום
export function discountCashflows(cashflows: CashflowByYear[], curve: DiscountCurvePoint[]): DiscountResult {
  let pv = 0, nominal = 0;
  for (const cf of cashflows) {
    const r = spotRateFor(curve, cf.yearOffset);
    const factor = Math.pow(1 + r, cf.yearOffset);
    pv += cf.amount / (factor > 0 ? factor : 1);
    nominal += cf.amount;
  }
  return {
    presentValue: Math.round(pv * 100) / 100,
    nominalValue: Math.round(nominal * 100) / 100,
    discountEffect: Math.round((nominal - pv) * 100) / 100,
  };
}

// Unwind של ההיוון לתקופה — Insurance finance expense (§87)
// = יתרת פתיחה מהוונת × ריבית התקופה
export function unwindDiscount(openingPv: number, periodRate: number): number {
  return Math.round(openingPv * periodRate * 100) / 100;
}

// פיזור LIC לא-מהוון לתזרים שנתי לפי תבנית פירעון (payout pattern)
// pattern = אחוזים שמסתכמים ל-100 (למשל [50,30,15,5] = 4 שנים)
export function spreadLicToPayout(licNominal: number, pattern: number[]): CashflowByYear[] {
  const total = pattern.reduce((s, p) => s + p, 0) || 1;
  return pattern.map((p, i) => ({
    yearOffset: i + 1,
    amount: Math.round((licNominal * (p / total)) * 100) / 100,
  }));
}
