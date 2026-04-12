"use server";
import { prisma } from "@/lib/prisma";
import { calculateInsuranceAccounting } from "@/lib/insurance-logic";

export async function getActualVsTechnicalReport(year: number, month: number) {
  try {
    const [uprSnapshots, premiums, claims, actuarial, params] = await Promise.all([
      prisma.uprSnapshot.findMany({ where: { year, period: month, periodType: "MONTHLY" } }),
      prisma.premiumActuals.findMany({ where: { year, month } }),
      prisma.claimsActuals.findMany({ where: { year, month } }),
      prisma.actuarialEstimate.findMany({ where: { year, month } }),
      prisma.branchParameters.findMany({ where: { year } }),
    ]);

    const premiumMap   = new Map(premiums.map(p  => [p.branchNumber, p]));
    const paramsMap    = new Map(params.map(p    => [p.branchNumber, p]));
    const actuarialMap = new Map(actuarial.map(a => [a.branchNumber, a]));

    // צבירת תביעות ששולמו לפי ענף (סיכום כל שנות חיתום/נזק)
    const claimsMap = new Map<number, { paidGross: number; paidRi: number }>();
    for (const c of claims) {
      const cur = claimsMap.get(c.branchNumber) ?? { paidGross: 0, paidRi: 0 };
      claimsMap.set(c.branchNumber, {
        paidGross: cur.paidGross + c.claimsPaidGross,
        paidRi:    cur.paidRi   + c.claimsPaidRi,
      });
    }

    const reportRows = uprSnapshots.map(snapshot => {
      const branchNum = snapshot.branchNumber;
      const premium   = premiumMap.get(branchNum);
      const param     = paramsMap.get(branchNum);
      const act       = actuarialMap.get(branchNum);
      const paid      = claimsMap.get(branchNum);

      if (!premium) return null;

      const grossWritten = premium.grossPremium;
      const uprValue     = Number(snapshot.uprValue);
      const uprRatio     = grossWritten > 0 ? uprValue / grossWritten : 0;

      // חישוב טכני (חזוי)
      const technical = calculateInsuranceAccounting({
        grossPremium:       grossWritten,
        uprRatio,
        agentCommPct:       param?.agentCommPct       ?? 0,
        reinsurancePct:     param?.reinsurancePct     ?? 0,
        reinsuranceCommPct: param?.reinsuranceCommPct ?? 0,
        expectedLrPct:      param?.expectedLrPct      ?? 0,
      });

      // תביעות בפועל (Incurred = ששולמו + תלויות + IBNR)
      const incurredGross = (paid?.paidGross ?? 0)
        + (act?.outstandingClaimsGross ?? 0) + (act?.ibnrGross ?? 0);
      const incurredRi = (paid?.paidRi ?? 0)
        + (act?.outstandingClaimsRi ?? 0) + (act?.ibnrRi ?? 0);
      const netIncurred = incurredGross - incurredRi;

      // פרמיה שהורווחה בפועל (מנתוני אמת)
      const actualEarnedGross = grossWritten - uprValue;
      const actualEarnedRI    = premium.reinsurancePremium * (1 - uprRatio);
      const actualNetEarned   = actualEarnedGross - actualEarnedRI;

      // עמלות בפועל
      const actualAgentCommEarned = premium.agentComm    * (1 - uprRatio);
      const actualRiCommEarned    = premium.reinsuranceComm * (1 - uprRatio);

      const actualProfit = actualNetEarned - actualAgentCommEarned + actualRiCommEarned - netIncurred;

      return {
        branchNumber: branchNum,
        technical: {
          earnedGross:        technical.earnedGross,
          netEarnedPremium:   technical.netEarnedPremium,
          agentCommEarned:    technical.agentCommEarned,
          riCommEarned:       technical.riCommEarned,
          netClaims:          technical.netClaims,
          underwritingProfit: technical.underwritingProfit,
        },
        actual: {
          earnedGross:      actualEarnedGross,
          netEarnedPremium: actualNetEarned,
          agentCommEarned:  actualAgentCommEarned,
          riCommEarned:     actualRiCommEarned,
          incurredGross,
          incurredRi,
          netIncurred,
          actualProfit,
        },
        variance: actualProfit - technical.underwritingProfit,
      };
    }).filter(Boolean);

    return {
      success: true,
      rows: reportRows,
      totals: {
        technicalProfit: reportRows.reduce((s, r) => s + r!.technical.underwritingProfit, 0),
        actualProfit:    reportRows.reduce((s, r) => s + r!.actual.actualProfit, 0),
        variance:        reportRows.reduce((s, r) => s + r!.variance, 0),
      },
    };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
