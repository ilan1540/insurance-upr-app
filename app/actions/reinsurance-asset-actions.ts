"use server";
/**
 * R11 — Reinsurance asset held — separate measurement (IFRS17 §60-70)
 *
 * מדידה נפרדת של נכס ביטוח המשנה:
 *   LRC צד ב"מ  = פרמיית ב"מ נדחית + עמלת ב"מ נדחית
 *   LIC צד ב"מ  = החזרי תביעות צפויים מב"מ (מ-LicSnapshot.licRi)
 *   §66        = loss-recovery component מול חוזים הפסדיים
 */
import { prisma } from "@/lib/prisma";

export async function runReinsuranceAsset(year: number, month: number) {
  try {
    const [snapshots, lics, premiums, lossComp] = await Promise.all([
      prisma.uprSnapshot.findMany({ where: { year, period: month, periodType: "MONTHLY" } }),
      prisma.licSnapshot.findMany({ where: { year, month } }),
      prisma.premiumActuals.findMany({ where: { year, month } }),
      prisma.lossComponentRollforward.findMany({ where: { year, month } }),
    ]);

    if (snapshots.length === 0) {
      return { success: false, error: `אין UprSnapshot לתקופה ${month}/${year}` };
    }

    const licMap     = new Map(lics.map(l => [l.branchNumber, l]));
    const premiumMap = new Map(premiums.map(p => [p.branchNumber, p]));
    const lcMap      = new Map(lossComp.map(l => [l.branchNumber, l]));

    const rows = snapshots.map(snap => {
      const lic  = licMap.get(snap.branchNumber);
      const prem = premiumMap.get(snap.branchNumber);
      const lc   = lcMap.get(snap.branchNumber);

      const uprRatio = Number(snap.originalPremium) > 0 ? Number(snap.uprValue) / Number(snap.originalPremium) : 0;

      // LRC צד ב"מ
      const riUpr          = Math.round((prem?.reinsurancePremium ?? 0) * uprRatio * 100) / 100;
      const riDeferredComm = Number(snap.deferredRIComm);

      // LIC צד ב"מ — החזרים מ-LicSnapshot
      const riLicGross = Number(lic?.licRi ?? 0);
      const riRiskAdj  = Math.round((Number(lic?.riskAdjustment ?? 0) * (riLicGross / (Number(lic?.licGross) || 1))) * 100) / 100;

      // §66 — loss-recovery: חלק ב"מ ברכיב ההפסד
      const recoveryShare = Number(snap.originalPremium) > 0 ? (prem?.reinsurancePremium ?? 0) / Number(snap.originalPremium) : 0;
      const lossRecoveryComponent = Math.round((Number(lc?.closingLc ?? 0) * recoveryShare) * 100) / 100;

      const netReinsuranceAsset = Math.round((riUpr + riDeferredComm + riLicGross + riRiskAdj + lossRecoveryComponent) * 100) / 100;

      return {
        year, month, branchNumber: snap.branchNumber,
        riUpr, riDeferredComm, riLicGross, riRiskAdj, lossRecoveryComponent, netReinsuranceAsset,
      };
    });

    await prisma.reinsuranceAsset.deleteMany({ where: { year, month } });
    await prisma.reinsuranceAsset.createMany({ data: rows });

    const total = rows.reduce((s, r) => s + r.netReinsuranceAsset, 0);
    return { success: true, count: rows.length, totalNetReinsuranceAsset: Math.round(total), rows };
  } catch (e: any) {
    return { success: false, error: e.message };
  }
}

export async function getReinsuranceAssetReport(year: number, month: number) {
  try {
    const rows = await prisma.reinsuranceAsset.findMany({ where: { year, month }, orderBy: { branchNumber: "asc" } });
    return {
      success: true, rows,
      totals: {
        riUpr:               rows.reduce((s, r) => s + r.riUpr, 0),
        riLicGross:          rows.reduce((s, r) => s + r.riLicGross, 0),
        lossRecoveryComponent: rows.reduce((s, r) => s + r.lossRecoveryComponent, 0),
        netReinsuranceAsset: rows.reduce((s, r) => s + r.netReinsuranceAsset, 0),
      },
    };
  } catch (e: any) {
    return { success: false, error: e.message, rows: [] };
  }
}
