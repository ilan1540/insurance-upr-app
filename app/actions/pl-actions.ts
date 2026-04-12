"use server";
import { prisma } from "@/lib/prisma";
import { calculateInsuranceAccounting } from "@/lib/insurance-logic";

export async function getPnLReport(year: number, month: number) {
  try {
    const snapshots = await prisma.uprSnapshot.findMany({
      where: { year, period: month, periodType: "MONTHLY" }
    });

    const params = await prisma.branchParameters.findMany({ where: { year } });
    const paramsMap = new Map(params.map(p => [p.branchNumber, p]));

    const reportRows = snapshots.map(s => {
      const p = paramsMap.get(s.branchNumber);
      
      // כאן אנחנו מניחים שהפרמיה המקורית נמצאת ב-Snapshot או מחשבים אותה
      // לצורך הדיוק, כדאי שפרמיית המקור (Written) תהיה שמורה ב-Snapshot
      const grossWritten = Number(s.originalPremium || 0); 
      const uprValue = Number(s.uprValue);
      const uprRatio = grossWritten > 0 ? uprValue / grossWritten : 0;

      const results = calculateInsuranceAccounting({
        grossPremium: grossWritten,
        uprRatio: uprRatio,
        agentCommPct: Number(p?.agentCommPct || 0),
        reinsurancePct: Number(p?.reinsurancePct || 0),
        reinsuranceCommPct: Number(p?.reinsuranceCommPct || 0),
        expectedLrPct: Number(p?.expectedLrPct || 0),
      });

      return {
        branchNumber:      s.branchNumber,
        grossWritten,
        uprValue:          results.uprGross,          // UPR (עתודה)
        earnedGross:       results.earnedGross,        // פרמיה שהורווחה ברוטו
        netEarnedPremium:  results.netEarnedPremium,   // פרמיה שהורווחה נטו
        agentCommission:   results.agentCommEarned,    // עמלת סוכן שהוכרה
        netReinsuranceCost: results.earnedRI - results.riCommEarned, // עלות ב"מ נטו
        expectedClaims:    results.claimsGross,        // תביעות צפויות
        underwritingProfit: results.netEarnedPremium - results.agentCommEarned - (results.earnedRI - results.riCommEarned) - results.claimsGross,
        lr:                Number(p?.expectedLrPct || 0),
        uprRatio,
      };
    });

    return { success: true, rows: reportRows };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}