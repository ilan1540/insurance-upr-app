"use server";
/**
 * C2 — Groups of Insurance Contracts (GIC)
 * IFRS17 contract grouping:
 * - (branch + underwriting year) -> profitability bucket
 * - onerous detection: expected LR% > 100%
 */
import { prisma } from "@/lib/prisma";
import { assessPaaEligibility } from "@/lib/paa-eligibility";

// Auto create/update GIC from BranchParameters. Includes R4 PAA eligibility (§53-54)
export async function syncGicsFromParams(year: number) {
  try {
    const params = await prisma.branchParameters.findMany({ where: { year } });

    const operations = params.map(p => {
      const isOnerous = p.expectedLrPct > 100;
      const bucket    = isOnerous ? "ONEROUS" : "NOT_ONEROUS";

      const elig = assessPaaEligibility({
        coveragePeriodMonths: (p as any).coveragePeriodMonths ?? 12,
      });

      return prisma.insuranceContractGroup.upsert({
        where: { branchNumber_underwritingYear: { branchNumber: p.branchNumber, underwritingYear: year } },
        update: {
          expectedLrPct: p.expectedLrPct, isOnerous, profitabilityBucket: bucket,
          onerousSource: "BUDGET",
          paaEligible: elig.eligible, paaBasis: elig.basis,
        },
        create: {
          branchNumber:     p.branchNumber,
          underwritingYear: year,
          expectedLrPct:    p.expectedLrPct,
          isOnerous,
          profitabilityBucket: bucket,
          onerousSource: "BUDGET",
          paaEligible: elig.eligible, paaBasis: elig.basis,
          groupLabel: "branch " + p.branchNumber + " - UW " + year,
        },
      });
    });

    await Promise.all(operations);
    return { success: true, count: params.length };
  } catch (e: any) {
    return { success: false, error: e.message };
  }
}

// R5 - reassess onerous from actuals (§48). Compares actual LIC vs remaining LRC, updates bucket.
export async function reassessOnerousFromActuals(year: number, month: number) {
  try {
    const [snapshots, lics, params, gics] = await Promise.all([
      prisma.uprSnapshot.findMany({ where: { year, period: month, periodType: "MONTHLY" } }),
      prisma.licSnapshot.findMany({ where: { year, month } }),
      prisma.branchParameters.findMany({ where: { year } }),
      prisma.insuranceContractGroup.findMany({ where: { underwritingYear: year } }),
    ]);

    const licMap   = new Map(lics.map(l => [l.branchNumber, l]));
    const paramMap = new Map(params.map(p => [p.branchNumber, p]));
    const gicMap   = new Map(gics.map(g => [g.branchNumber, g]));

    let updated = 0;
    const changes: Array<{ branchNumber: number; bucket: string; actualLrPct: number }> = [];

    for (const snap of snapshots) {
      const gic = gicMap.get(snap.branchNumber);
      if (!gic) continue;

      const lic    = licMap.get(snap.branchNumber);
      const bp     = paramMap.get(snap.branchNumber);
      const earned = Number(snap.originalPremium) - Number(snap.uprValue);
      if (earned <= 0) continue;

      const actualLrPct = Math.round((Number(lic?.licNet ?? 0) / earned) * 1000) / 10;

      const expectedExpPct = (bp as any)?.expectedExpensePct ?? 0;
      const isOnerous = actualLrPct + expectedExpPct > 100;
      const bucket    = isOnerous ? "ONEROUS" : "NOT_ONEROUS";

      if (gic.profitabilityBucket !== bucket || gic.onerousSource !== "ACTUALS") {
        await prisma.insuranceContractGroup.update({
          where: { branchNumber_underwritingYear: { branchNumber: snap.branchNumber, underwritingYear: year } },
          data: { profitabilityBucket: bucket, isOnerous, onerousSource: "ACTUALS", actualLrPct },
        });
        updated++;
        changes.push({ branchNumber: snap.branchNumber, bucket, actualLrPct });
      }
    }

    return { success: true, updated, changes };
  } catch (e: any) {
    return { success: false, error: e.message };
  }
}

export async function getAllGics(year?: number) {
  try {
    const gics = await prisma.insuranceContractGroup.findMany({
      where: year ? { underwritingYear: year } : undefined,
      orderBy: [{ underwritingYear: "desc" }, { branchNumber: "asc" }],
    });
    return { success: true, gics };
  } catch (e: any) {
    return { success: false, error: e.message, gics: [] };
  }
}

export async function updateGicBucket(
  branchNumber: number,
  underwritingYear: number,
  bucket: "ONEROUS" | "NOT_ONEROUS" | "UNDETERMINED",
  groupLabel?: string
) {
  try {
    const updated = await prisma.insuranceContractGroup.update({
      where: { branchNumber_underwritingYear: { branchNumber, underwritingYear } },
      data: {
        profitabilityBucket: bucket,
        isOnerous: bucket === "ONEROUS",
        groupLabel,
      },
    });
    return { success: true, gic: updated };
  } catch (e: any) {
    return { success: false, error: e.message };
  }
}

export async function getGicSummary(year?: number) {
  try {
    const gics = await prisma.insuranceContractGroup.findMany({
      where: year ? { underwritingYear: year } : undefined,
    });
    const summary = {
      total:         gics.length,
      onerous:       gics.filter((g: any) => g.profitabilityBucket === "ONEROUS").length,
      notOnerous:    gics.filter((g: any) => g.profitabilityBucket === "NOT_ONEROUS").length,
      undetermined:  gics.filter((g: any) => g.profitabilityBucket === "UNDETERMINED").length,
    };
    return { success: true, summary, gics };
  } catch (e: any) {
    return { success: false, error: e.message };
  }
}
