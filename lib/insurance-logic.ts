// lib/insurance-logic.ts

export interface InsuranceParams {
  grossPremium: number;
  uprRatio: number;          // יחס ה-UPR (UPR / GrossPremium המקורי)
  agentCommPct: number;
  reinsurancePct: number;
  reinsuranceCommPct: number;
  expectedLrPct: number;
}

export function calculateInsuranceAccounting(params: InsuranceParams) {
  const { grossPremium, uprRatio, agentCommPct, reinsurancePct, reinsuranceCommPct, expectedLrPct } = params;

  // 1. פרמיה שהורווחה (Earned Premium)
  const uprGross = grossPremium * uprRatio;
  const earnedGross = grossPremium - uprGross;

  // 2. ביטוח משנה (Reinsurance)
  const writtenRI = grossPremium * (reinsurancePct / 100);
  const uprRI = writtenRI * uprRatio;
  const earnedRI = writtenRI - uprRI;
  const netEarnedPremium = earnedGross - earnedRI;

  // 3. הוצאות רכישה נדחות (DUC - Deferred Acquisition Costs)
  const totalAgentComm = grossPremium * (agentCommPct / 100);
  const ducClosing = totalAgentComm * uprRatio;          // DAC — נכס
  const agentCommEarned = totalAgentComm - ducClosing;

  // 4. עמלת ביטוח משנה נדחית (Deferred RI Commission)
  const totalRIComm = writtenRI * (reinsuranceCommPct / 100);
  const defRICommClosing = totalRIComm * uprRatio;       // הכנסה נדחית מב"מ
  const riCommEarned = totalRIComm - defRICommClosing;

  // 5. DUC נטו = DAC פחות עמלת ב"מ נדחית
  const ducNet = ducClosing - defRICommClosing;

  // 6. תביעות חזויות (Expected Claims) — על בסיס Earned
  const claimsGross = earnedGross * (expectedLrPct / 100);
  const claimsRI = earnedRI * (expectedLrPct / 100);
  const netClaims = claimsGross - claimsRI;

  // 7. שורה תחתונה (לפני הוצאות הנה"כ)
  const underwritingProfit = netEarnedPremium - agentCommEarned + riCommEarned - netClaims;

  return {
    uprGross,
    earnedGross,
    uprRI,
    earnedRI,
    netEarnedPremium,
    totalAgentComm,
    ducClosing,           // DAC (נכס — עמלת סוכן נדחית)
    agentCommEarned,
    totalRIComm,
    defRICommClosing,     // הכנסה נדחית מב"מ
    riCommEarned,
    ducNet,               // DUC נטו = DAC − עמלת ב"מ נדחית
    claimsGross,
    claimsRI,
    netClaims,
    underwritingProfit
  };
}

// ---------------------------------------------------------------------------
// חישוב DUC ברמת ענף מנתוני Snapshot
// ---------------------------------------------------------------------------
export interface DucBranchInput {
  branchNumber: number;
  originalPremium: number;  // פרמיה כתובה ברוטו
  uprValue: number;         // UPR מחושב
  agentCommPct: number;     // % עמלת סוכן
  reinsurancePct: number;   // % ביטוח משנה
  reinsuranceCommPct: number; // % עמלת ב"מ
}

export function calculateDucForBranch(b: DucBranchInput) {
  const uprRatio = b.originalPremium > 0 ? b.uprValue / b.originalPremium : 0;

  const totalAgentComm = b.originalPremium * (b.agentCommPct / 100);
  const dacGross = totalAgentComm * uprRatio;            // עמלת סוכן נדחית — נכס

  const writtenRI = b.originalPremium * (b.reinsurancePct / 100);
  const totalRIComm = writtenRI * (b.reinsuranceCommPct / 100);
  const deferredRIComm = totalRIComm * uprRatio;         // עמלת ב"מ נדחית — הכנסה נדחית

  const ducNet = dacGross - deferredRIComm;              // DUC נטו

  return { dacGross, deferredRIComm, ducNet, uprRatio };
}

// ---------------------------------------------------------------------------
// הקצאת הוצאות הנה"כ לענפים לפי IFRS17
//
// עיקרון IFRS17 (PAA):
//   הוצאות מיוחסות לפרמיה  → לפי משקל פרמיה שהורווחה (Earned Gross)
//   הוצאות מיוחסות לתביעות → לפי משקל תביעות צפויות (Earned × LR%)
//
// הכרה בהוצאות (בדומה לפרמיה):
//   הוצאה שהוכרה = הקצאה × (1 − uprRatio)
//   הוצאה נדחית  = הקצאה × uprRatio
// ---------------------------------------------------------------------------
export function allocateAdminExpenses(
  branches: Array<{
    branchNumber: number;
    earnedGross: number;      // פרמיה שהורווחה
    expectedLrPct: number;    // LR% צפוי
    uprRatio: number;         // יחס UPR לחישוב הכרה בהוצאות
  }>,
  premiumExpense: number,     // הוצאות המיוחסות לפרמיה
  claimsExpense: number       // הוצאות המיוחסות לתביעות
) {
  const withClaims = branches.map(b => ({
    ...b,
    expectedClaims: b.earnedGross * (b.expectedLrPct / 100)
  }));

  const totalEarned = withClaims.reduce((s, b) => s + b.earnedGross, 0);
  const totalClaims = withClaims.reduce((s, b) => s + b.expectedClaims, 0);

  return withClaims.map(b => {
    const premiumShare = totalEarned > 0 ? (b.earnedGross / totalEarned) * premiumExpense : 0;
    const claimsShare  = totalClaims > 0 ? (b.expectedClaims / totalClaims) * claimsExpense : 0;
    const total = premiumShare + claimsShare;

    // הכרה בהוצאות בדומה לפרמיה
    const recognizedExpense = total * (1 - b.uprRatio);
    const deferredExpense   = total * b.uprRatio;

    return {
      branchNumber:          b.branchNumber,
      earnedGross:           b.earnedGross,
      expectedClaims:        b.expectedClaims,
      premiumExpenseShare:   Math.round(premiumShare * 100) / 100,
      claimsExpenseShare:    Math.round(claimsShare  * 100) / 100,
      totalExpenseShare:     Math.round(total        * 100) / 100,
      recognizedExpense:     Math.round(recognizedExpense * 100) / 100,
      deferredExpense:       Math.round(deferredExpense   * 100) / 100,
      premiumAllocationPct:  totalEarned > 0 ? (b.earnedGross / totalEarned) * 100 : 0,
      claimsAllocationPct:   totalClaims > 0 ? (b.expectedClaims / totalClaims) * 100 : 0,
    };
  });
}
