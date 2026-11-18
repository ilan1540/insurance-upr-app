// lib/insurance-service-result.ts
// ---------------------------------------------------------------------------
// R10 — Insurance Service Result (IFRS17 §80-85, §103-105)
//
// בניית מבנה דוח רווח-והפסד רשמי של IFRS17 משורות חישוב קיימות:
//   Insurance Revenue            (§83, B120-B125)
//   Insurance Service Expenses   (§84)
//   Net expense from reinsurance (§82, §86)
//   Insurance Finance income/exp (§87) — כשקיים היוון
// ---------------------------------------------------------------------------

export interface ServiceResultInput {
  // הכנסה
  premiumsEarned: number;          // פרמיה שהורווחה (release of LRC)
  acquisitionAmortisation: number; // הפחתת עלויות רכישה (חלק מ-Revenue)
  // הוצאות שירות
  claimsIncurred: number;          // תביעות שנתהוו (ברוטו)
  expensesIncurred: number;        // הוצאות שירות מיוחסות
  lossComponentRecognised: number; // הפסד שהוכר על חוזים הפסדיים
  lossComponentReleased: number;   // שחרור LC (מקטין הוצאה)
  // ביטוח משנה
  riPremiumsEarned: number;        // פרמיית ב"מ שהורווחה (הוצאה)
  riClaimsRecovered: number;       // החזרי תביעות מב"מ (הכנסה)
  riCommissionEarned: number;      // עמלת ב"מ שהורווחה
  // פיננסי
  insuranceFinanceExpense?: number; // unwind של היוון (אם קיים)
}

export interface ServiceResultOutput {
  insuranceRevenue: number;
  insuranceServiceExpense: number;
  netReinsuranceResult: number;
  insuranceServiceResult: number;       // לפני פיננסי
  insuranceFinanceExpense: number;
  profitBeforeTax: number;              // אחרי פיננסי
  combinedRatio: number;                // (תביעות+הוצאות) / פרמיה שהורווחה
}

export function buildInsuranceServiceResult(i: ServiceResultInput): ServiceResultOutput {
  // §83: Insurance Revenue = שחרור LRC + הפחתת עלויות רכישה
  const insuranceRevenue = i.premiumsEarned + i.acquisitionAmortisation;

  // §84: Insurance Service Expense
  const insuranceServiceExpense =
    i.claimsIncurred + i.expensesIncurred + i.lossComponentRecognised - i.lossComponentReleased;

  // §82/§86: תוצאת ב"מ נטו = החזרים + עמלה − פרמיה שנמסרה
  const netReinsuranceResult =
    i.riClaimsRecovered + i.riCommissionEarned - i.riPremiumsEarned;

  const insuranceServiceResult = insuranceRevenue - insuranceServiceExpense + netReinsuranceResult;

  const insuranceFinanceExpense = i.insuranceFinanceExpense ?? 0;
  const profitBeforeTax = insuranceServiceResult - insuranceFinanceExpense;

  const combinedRatio = i.premiumsEarned > 0
    ? ((i.claimsIncurred + i.expensesIncurred) / i.premiumsEarned) * 100
    : 0;

  const r = (n: number) => Math.round(n * 100) / 100;
  return {
    insuranceRevenue: r(insuranceRevenue),
    insuranceServiceExpense: r(insuranceServiceExpense),
    netReinsuranceResult: r(netReinsuranceResult),
    insuranceServiceResult: r(insuranceServiceResult),
    insuranceFinanceExpense: r(insuranceFinanceExpense),
    profitBeforeTax: r(profitBeforeTax),
    combinedRatio: r(combinedRatio),
  };
}
