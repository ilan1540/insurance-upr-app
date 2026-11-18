"use server";
/**
 * R9 + R10 — IFRS17 Disclosure & Insurance Service Result (§80-85, §97-132)
 *
 * generateIfrs17Disclosure — מרכז את כל רכיבי המדידה לתקופה לכדי תמונת
 * גילוי אחת: LRC (UPR+DUC+LC), LIC (Fulfilment=PV+RA), נכס ב"מ, ותנועות.
 * buildServiceResultReport — מפיק את מבנה ה-P&L הרשמי של התקן.
 */
import { prisma } from "@/lib/prisma";
import { buildInsuranceServiceResult } from "@/lib/insurance-service-result";

export async function generateIfrs17Disclosure(year: number, month: number) {
  try {
    const [upr, lic, lc, riAsset, gics, lrcRf, licRf] = await Promise.all([
      prisma.uprSnapshot.findMany({ where: { year, period: month, periodType: "MONTHLY" } }),
      prisma.licSnapshot.findMany({ where: { year, month } }),
      prisma.lossComponentRollforward.findMany({ where: { year, month } }),
      prisma.reinsuranceAsset.findMany({ where: { year, month } }),
      prisma.insuranceContractGroup.findMany({ where: { underwritingYear: year } }),
      prisma.lrcRollforward.findMany({ where: { year, month } }),
      prisma.licRollforward.findMany({ where: { year, month } }),
    ]);

    const sum = <T>(arr: T[], f: (x: T) => number) => Math.round(arr.reduce((s, x) => s + f(x), 0));

    // LRC — Liability for Remaining Coverage
    const lrc = {
      upr:            sum(upr, r => Number(r.uprValue)),
      ducNet:         sum(upr, r => Number(r.ducNet)),
      lossComponent:  sum(lc,  r => r.closingLc),
      // LRC נטו = UPR − DUC נטו + Loss Component
      net:            sum(upr, r => Number(r.uprValue) - Number(r.ducNet)) + sum(lc, r => r.closingLc),
    };

    // LIC — Liability for Incurred Claims (Fulfilment cash flows)
    const licBlock = {
      pvCashflows:    sum(lic, r => (r.licDiscounted || r.licNet)),
      riskAdjustment: sum(lic, r => r.riskAdjustment),
      fulfilment:     sum(lic, r => (r.licFulfilment || r.licNet)),
      financeExpense: sum(lic, r => r.financeExpense),
    };

    // נכס ביטוח משנה
    const reinsurance = {
      lrcSide:        sum(riAsset, r => r.riUpr + r.riDeferredComm),
      licSide:        sum(riAsset, r => r.riLicGross + r.riRiskAdj),
      lossRecovery:   sum(riAsset, r => r.lossRecoveryComponent),
      netAsset:       sum(riAsset, r => r.netReinsuranceAsset),
    };

    // סיווג קבוצות
    const groups = {
      total:        gics.length,
      onerous:      gics.filter(g => g.profitabilityBucket === "ONEROUS").length,
      notOnerous:   gics.filter(g => g.profitabilityBucket === "NOT_ONEROUS").length,
      paaIneligible: gics.filter(g => !(g as any).paaEligible).length,
    };

    // נטו התחייבות ביטוחית = LRC + LIC − נכס ב"מ
    const netInsuranceLiability = lrc.net + licBlock.fulfilment - reinsurance.netAsset;

    return {
      success: true,
      period: { year, month },
      lrc, lic: licBlock, reinsurance, groups,
      netInsuranceLiability: Math.round(netInsuranceLiability),
      movements: {
        lrcRollforwardRows: lrcRf.length,
        licRollforwardRows: licRf.length,
      },
    };
  } catch (e: any) {
    return { success: false, error: e.message };
  }
}

export async function buildServiceResultReport(year: number, month: number) {
  try {
    const [lrcRf, licRf, lc, lic, allocations] = await Promise.all([
      prisma.lrcRollforward.findMany({ where: { year, month } }),
      prisma.licRollforward.findMany({ where: { year, month } }),
      prisma.lossComponentRollforward.findMany({ where: { year, month } }),
      prisma.licSnapshot.findMany({ where: { year, month } }),
      prisma.adminExpenseAllocation.findMany({ where: { year, month } }),
    ]);

    const s = <T>(arr: T[], f: (x: T) => number) => arr.reduce((acc, x) => acc + f(x), 0);

    const result = buildInsuranceServiceResult({
      premiumsEarned:          s(lrcRf, r => r.premiumsEarned),
      acquisitionAmortisation: s(lrcRf, r => r.acquisitionCosts),
      claimsIncurred:          s(licRf, r => r.claimsIncurredGross),
      expensesIncurred:        s(allocations, r => r.recognizedExpense),
      lossComponentRecognised: s(lc, r => r.recognisedLc),
      lossComponentReleased:   s(lc, r => r.releasedLc),
      riPremiumsEarned:        s(lrcRf, r => r.riPremiumCeded),
      riClaimsRecovered:       s(licRf, r => r.claimsIncurredRi),
      riCommissionEarned:      s(lrcRf, r => r.riCommReceived),
      insuranceFinanceExpense: s(lic, r => r.financeExpense),
    });

    return { success: true, period: { year, month }, result };
  } catch (e: any) {
    return { success: false, error: e.message };
  }
}
