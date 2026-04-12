// lib/insurance-engine.ts

export function calculateFinancials(actuals: any, params: any, uprSnapshot: any) {
  const uprRatio = actuals.actualWrittenPremium > 0 
    ? Number(uprSnapshot.uprValue) / actuals.actualWrittenPremium 
    : 0;

  // --- חישוב EARNED (מה שחלף) ---
  const earnedGross = actuals.actualWrittenPremium * (1 - uprRatio);
  const earnedRI = actuals.actualRiPremium * (1 - uprRatio);
  const netEarnedPremium = earnedGross - earnedRI;

  // --- חישוב עמלות והוצאות רכישה (DUC) ---
  const ducClosing = actuals.actualPaidComm * uprRatio;
  const agentCommEarned = actuals.actualPaidComm - ducClosing;

  const defRiCommClosing = actuals.actualRiCommReceived * uprRatio;
  const riCommEarned = actuals.actualRiCommReceived - defRiCommClosing;

  // --- חישוב תביעות ---
  // 1. תביעות חזויות (לפי ה-Expected LR שהגדרנו)
  const technicalClaimsNet = netEarnedPremium * (Number(params.expectedLrPct) / 100);

  // 2. תביעות בפועל (Incurred = Paid + Change in OS + IBNR)
  const incurredClaimsGross = actuals.paidClaims + actuals.outstandingClaims + actuals.ibnr;
  // הנחת עבודה: חלק מבטח המשנה בתביעות הוא לפי אחוז ה-RI בפרמיה
  const incurredClaimsNet = incurredClaimsGross * (1 - (Number(params.reinsurancePct) / 100));

  return {
    earnedGross,
    netEarnedPremium,
    agentCommEarned,
    riCommEarned,
    technicalClaimsNet, // חזוי
    incurredClaimsNet,  // בפועל
    technicalProfit: netEarnedPremium - agentCommEarned + riCommEarned - technicalClaimsNet,
    actualProfit: netEarnedPremium - agentCommEarned + riCommEarned - incurredClaimsNet
  };
}