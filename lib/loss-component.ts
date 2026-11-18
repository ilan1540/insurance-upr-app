// lib/loss-component.ts
// ---------------------------------------------------------------------------
// R3 — Loss Component for onerous contracts (IFRS17 §47-52)
//
// בחוזה הפסדי (onerous) מכירים מיידית בהפסד הצפוי כ-Loss Component (LC)
// בתוך ה-LRC. ה-LC משוחרר באופן שיטתי לאורך תקופת הכיסוי ומקטין את
// ה-Insurance Service Expense העתידי.
// ---------------------------------------------------------------------------

export interface LossComponentInput {
  expectedClaims: number;        // תביעות צפויות (fulfilment cash outflows)
  expectedExpenses: number;      // הוצאות צפויות מיוחסות (כולל RA)
  expectedPremium: number;       // פרמיה צפויה (פחות עלויות רכישה)
  riskAdjustment?: number;       // RA על ה-LRC ההפסדי (אופציונלי, כבר כלול אם לא)
}

export interface LossComponentResult {
  isOnerous: boolean;
  lossComponent: number;         // ההפסד שמוכר מיידית (0 אם לא הפסדי)
  fulfilmentOutflow: number;     // סך תזרים יוצא צפוי
  netInflow: number;             // פרמיה − תזרים יוצא (שלילי = הפסדי)
}

// חישוב Loss Component בהכרה ראשונית (§47)
export function calculateLossComponent(input: LossComponentInput): LossComponentResult {
  const fulfilmentOutflow = input.expectedClaims + input.expectedExpenses + (input.riskAdjustment ?? 0);
  const netInflow = input.expectedPremium - fulfilmentOutflow;
  const isOnerous = netInflow < 0;
  const lossComponent = isOnerous ? Math.round(-netInflow * 100) / 100 : 0;
  return {
    isOnerous,
    lossComponent,
    fulfilmentOutflow: Math.round(fulfilmentOutflow * 100) / 100,
    netInflow: Math.round(netInflow * 100) / 100,
  };
}

// שחרור LC לתקופה (systematic allocation, §50)
// היחס מבוסס על תביעות+הוצאות התקופה מתוך סך הצפוי
export function releaseLossComponent(
  openingLc: number,
  periodOutflow: number,
  totalExpectedOutflow: number
): { released: number; closingLc: number } {
  if (openingLc <= 0 || totalExpectedOutflow <= 0) {
    return { released: 0, closingLc: Math.max(0, openingLc) };
  }
  const ratio = Math.min(periodOutflow / totalExpectedOutflow, 1);
  const released = Math.round(openingLc * ratio * 100) / 100;
  const closingLc = Math.round((openingLc - released) * 100) / 100;
  return { released, closingLc: Math.max(0, closingLc) };
}

// עדכון LC עקב שינוי בהערכות (§50-52) — גידול נוסף נזקף ל-LC,
// שיפור מקטין את ה-LC עד לאיפוס ואז נזקף ל-CSM (לא רלוונטי ב-PAA)
export function adjustLossComponent(currentLc: number, changeInFulfilment: number): number {
  const updated = currentLc + changeInFulfilment;
  return Math.max(0, Math.round(updated * 100) / 100);
}
