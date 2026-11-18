"use server";
/**
 * C3 — IFRS17 Rollforward Schedule
 * Monthly opening-closing reconciliation per branch:
 *   LRC Rollforward (Liability for Remaining Coverage) — §101-102
 *   LIC Rollforward (Liability for Incurred Claims)    — §103-105
 */
import { prisma } from "@/lib/prisma";

function prevPeriod(year: number, month: number) {
  return month === 1 ? { year: year - 1, month: 12 } : { year, month: month - 1 };
}

export async function runLrcRollforward(year: number, month: number) {
  try {
    const prev = prevPeriod(year, month);

    const [currentSnapshots, prevSnapshots, premiums] = await Promise.all([
      prisma.uprSnapshot.findMany({ where: { year, period: month, periodType: "MONTHLY" } }),
      prisma.uprSnapshot.findMany({ where: { year: prev.year, period: prev.month, periodType: "MONTHLY" } }),
      prisma.premiumActuals.findMany({ where: { year, month } }),
    ]);

    if (currentSnapshots.length === 0) {
      return { success: false, error: "No UprSnapshot for " + month + "/" + year + " - run UPR calculation first" };
    }

    const prevMap    = new Map(prevSnapshots.map((s: any) => [s.branchNumber, s]));
    const premiumMap = new Map(premiums.map(p => [p.branchNumber, p]));

    const rollforwardData = currentSnapshots.map(curr => {
      const prevSnap = prevMap.get(curr.branchNumber);
      const prem     = premiumMap.get(curr.branchNumber);

      const openingUpr    = Number(prevSnap?.uprValue ?? 0);
      const openingDucNet = Number(prevSnap?.ducNet   ?? 0);
      const closingUpr    = Number(curr.uprValue);
      const closingDucNet = Number(curr.ducNet);

      const premiumsWritten = prem?.grossPremium       ?? 0;
      const premiumsEarned  = openingUpr + premiumsWritten - closingUpr;
      const riPremiumCeded  = prem?.reinsurancePremium ?? 0;
      const riCommReceived  = prem?.reinsuranceComm    ?? 0;

      const prevDac        = Number(prevSnap?.dacGross ?? 0);
      const currDac        = Number(curr.dacGross);
      const acquisitionCosts = prevDac - currDac + (prem?.agentComm ?? 0);

      return {
        year, month,
        branchNumber: curr.branchNumber,
        openingUpr, openingDucNet,
        premiumsWritten, premiumsEarned,
        acquisitionCosts, riPremiumCeded, riCommReceived,
        closingUpr, closingDucNet,
      };
    });

    await prisma.lrcRollforward.deleteMany({ where: { year, month } });
    await prisma.lrcRollforward.createMany({ data: rollforwardData });

    return { success: true, count: rollforwardData.length, rows: rollforwardData };
  } catch (e: any) {
    return { success: false, error: e.message };
  }
}

export async function runLicRollforward(year: number, month: number) {
  try {
    const prev = prevPeriod(year, month);

    const [currentLic, prevLic, claimsActuals] = await Promise.all([
      prisma.licSnapshot.findMany({ where: { year, month } }),
      prisma.licSnapshot.findMany({ where: { year: prev.year, month: prev.month } }),
      prisma.claimsActuals.findMany({ where: { year, month } }),
    ]);

    if (currentLic.length === 0) {
      return { success: false, error: "No LicSnapshot for " + month + "/" + year + " - run UPR calculation first" };
    }

    const prevMap   = new Map(prevLic.map((l: any) => [l.branchNumber, l as any]));
    const claimsMap = new Map<number, { paid: number; paidRi: number }>();
    for (const c of claimsActuals) {
      const cur = claimsMap.get(c.branchNumber) ?? { paid: 0, paidRi: 0 };
      claimsMap.set(c.branchNumber, { paid: cur.paid + c.claimsPaidGross, paidRi: cur.paidRi + c.claimsPaidRi });
    }

    const rollforwardData = currentLic.map((curr: any) => {
      const prevSnap = prevMap.get(curr.branchNumber);
      const claims   = claimsMap.get(curr.branchNumber) ?? { paid: 0, paidRi: 0 };

      const openingLicGross = (prevSnap as any)?.licGross ?? 0;
      const openingLicRi    = (prevSnap as any)?.licRi    ?? 0;
      const openingLicNet   = openingLicGross - openingLicRi;

      const closingLicGross = curr.licGross;
      const closingLicRi    = curr.licRi;
      const closingLicNet   = curr.licNet;

      // Incurred = Closing - Opening + Paid (balance equation)
      const claimsIncurredGross = closingLicGross - openingLicGross + claims.paid;
      const claimsIncurredRi    = closingLicRi    - openingLicRi    + claims.paidRi;

      // R6 - Experience / change in estimates (§104):
      // changeInEstimates = closingEstimate - (openingEstimate - paidInPeriod), net basis.
      const openingLicNetVal = openingLicGross - openingLicRi;
      const closingLicNetVal = closingLicGross - closingLicRi;
      const paidNet          = claims.paid - claims.paidRi;
      const changeInEstimates = Math.round((closingLicNetVal - (openingLicNetVal - paidNet)) * 100) / 100;

      return {
        year, month,
        branchNumber: curr.branchNumber,
        openingLicGross, openingLicRi, openingLicNet,
        claimsIncurredGross, claimsIncurredRi,
        claimsPaidGross: claims.paid, claimsPaidRi: claims.paidRi,
        changeInEstimates,
        closingLicGross, closingLicRi, closingLicNet,
      };
    });

    await prisma.licRollforward.deleteMany({ where: { year, month } });
    await prisma.licRollforward.createMany({ data: rollforwardData });

    return { success: true, count: rollforwardData.length, rows: rollforwardData };
  } catch (e: any) {
    return { success: false, error: e.message };
  }
}

export async function runFullRollforward(year: number, month: number) {
  const lrc = await runLrcRollforward(year, month);
  const lic = await runLicRollforward(year, month);
  return {
    success: lrc.success && lic.success,
    lrc,
    lic,
    error: [lrc.success ? null : lrc.error, lic.success ? null : lic.error]
      .filter(Boolean).join(" | ") || undefined,
  };
}

export async function getRollforwardReport(year: number, month: number) {
  try {
    const [lrcRows, licRows] = await Promise.all([
      prisma.lrcRollforward.findMany({ where: { year, month }, orderBy: { branchNumber: "asc" } }),
      prisma.licRollforward.findMany({ where: { year, month }, orderBy: { branchNumber: "asc" } }),
    ]);

    const sumLrc = (key: string) =>
      lrcRows.reduce((s: number, r: any) => s + (typeof r[key] === "number" ? r[key] : 0), 0);
    const sumLic = (key: string) =>
      licRows.reduce((s: number, r: any) => s + (typeof r[key] === "number" ? r[key] : 0), 0);

    return {
      success: true,
      lrcRows,
      licRows,
      lrcTotals: {
        openingUpr:       sumLrc("openingUpr"),
        premiumsWritten:  sumLrc("premiumsWritten"),
        premiumsEarned:   sumLrc("premiumsEarned"),
        acquisitionCosts: sumLrc("acquisitionCosts"),
        riPremiumCeded:   sumLrc("riPremiumCeded"),
        riCommReceived:   sumLrc("riCommReceived"),
        closingUpr:       sumLrc("closingUpr"),
      },
      licTotals: {
        openingLicNet:       sumLic("openingLicNet"),
        claimsIncurredGross: sumLic("claimsIncurredGross"),
        claimsPaidGross:     sumLic("claimsPaidGross"),
        closingLicNet:       sumLic("closingLicNet"),
      },
    };
  } catch (e: any) {
    return { success: false, error: e.message };
  }
}

export async function getCalculationHistory(year?: number) {
  try {
    const runs = await prisma.calculationRun.findMany({
      where: year ? { year } : undefined,
      orderBy: { createdAt: "desc" },
      take: 50,
    });
    return { success: true, runs };
  } catch (e: any) {
    return { success: false, error: e.message, runs: [] };
  }
}
