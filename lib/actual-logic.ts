export function calculateActualPnL(actuals: any, uprData: any) {
  // חישוב מרכיבי ה-Earned (דומה למה שעשינו, אבל עם נתוני אמת)
  const earnedGross = actuals.actualGrossPremium + uprData.uprGrossOpening - uprData.uprGrossClosing;
  
  // חישוב הוצאות רכישה (DUC) על בסיס אמת
  const agentCommEarned = actuals.actualAgentComm + uprData.ducOpening - uprData.ducClosing;
  
  // חישוב תביעות שנתהוו (Incurred) - הלב של נתוני האמת
  const incurredClaimsGross = actuals.paidClaims + (actuals.outstandingClaims + actuals.ibnr);
  
  // רווח חתמי בפועל
  const reinsuranceResult = (actuals.claimsPaidRi ?? 0) + (actuals.reinsuranceComm ?? 0) - (actuals.reinsurancePremium ?? 0);
  const actualProfit = earnedGross - agentCommEarned - incurredClaimsGross + reinsuranceResult;

  return {
    earnedGross,
    agentCommEarned,
    incurredClaimsGross,
    actualProfit,
    actualLR: (incurredClaimsGross / earnedGross) * 100 // ה-LR המציאותי שקרה בפועל
  };
}