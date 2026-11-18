"use server";
/**
 * R12 — Reconciliation & controls before period close
 *
 * מריץ בדיקות עקביות עסקיות על נתוני התקופה ושומר את התוצאה ב-ReconciliationRun.
 * חוסם סגירת תקופה אם קיימות שגיאות (ERROR).
 */
import { prisma } from "@/lib/prisma";
import { runReconciliationChecks, summarizeFindings, BranchReconInput } from "@/lib/reconciliation";

function prevPeriod(year: number, month: number) {
  return month === 1 ? { year: year - 1, month: 12 } : { year, month: month - 1 };
}

export async function runPeriodReconciliation(year: number, month: number) {
  try {
    const prev = prevPeriod(year, month);

    const [snapshots, prevSnapshots, lics, premiums, params] = await Promise.all([
      prisma.uprSnapshot.findMany({ where: { year, period: month, periodType: "MONTHLY" } }),
      prisma.uprSnapshot.findMany({ where: { year: prev.year, period: prev.month, periodType: "MONTHLY" } }),
      prisma.licSnapshot.findMany({ where: { year, month } }),
      prisma.premiumActuals.findMany({ where: { year, month } }),
      prisma.branchParameters.findMany({ where: { year } }),
    ]);

    if (snapshots.length === 0) {
      return { success: false, error: `אין נתוני UPR לתקופה ${month}/${year} — אין מה לבדוק` };
    }

    const prevMap    = new Map(prevSnapshots.map(s => [s.branchNumber, s]));
    const licMap     = new Map(lics.map(l => [l.branchNumber, l]));
    const premiumMap = new Map(premiums.map(p => [p.branchNumber, p]));
    const paramMap   = new Map(params.map(p => [p.branchNumber, p]));

    // נדרש גם ה-rollforward של החודש כדי לבדוק פתיחה=סגירה(t-1)
    const lrcRf = await prisma.lrcRollforward.findMany({ where: { year, month } });
    const lrcMap = new Map(lrcRf.map(r => [r.branchNumber, r]));

    const inputs: BranchReconInput[] = snapshots.map(snap => {
      const prem  = premiumMap.get(snap.branchNumber);
      const lic   = licMap.get(snap.branchNumber);
      const bp    = paramMap.get(snap.branchNumber);
      const prevS = prevMap.get(snap.branchNumber);
      const rf    = lrcMap.get(snap.branchNumber);

      const earned = Number(snap.originalPremium) - Number(snap.uprValue);
      const actualLrPct = earned > 0 && lic ? (lic.licNet / earned) * 100 : undefined;

      return {
        branchNumber:  snap.branchNumber,
        grossPremium:  Number(snap.originalPremium),
        riPremium:     prem?.reinsurancePremium ?? 0,
        uprValue:      Number(snap.uprValue),
        licGross:      lic?.licGross ?? 0,
        licRi:         lic?.licRi ?? 0,
        expectedLrPct: bp?.expectedLrPct ?? 0,
        actualLrPct,
        openingFromPriorClosing: rf
          ? { opening: rf.openingUpr, priorClosing: Number(prevS?.uprValue ?? 0) }
          : undefined,
      };
    });

    const findings = runReconciliationChecks(inputs);
    const summary  = summarizeFindings(findings);

    await prisma.reconciliationRun.create({
      data: {
        year, month,
        errors: summary.errors, warnings: summary.warnings, canClose: summary.canClose,
        findingsJson: JSON.stringify(findings),
      },
    });

    return { success: true, findings, summary };
  } catch (e: any) {
    return { success: false, error: e.message };
  }
}

export async function getLatestReconciliation(year: number, month: number) {
  try {
    const run = await prisma.reconciliationRun.findFirst({
      where: { year, month }, orderBy: { createdAt: "desc" },
    });
    if (!run) return { success: true, run: null, findings: [] };
    return { success: true, run, findings: run.findingsJson ? JSON.parse(run.findingsJson) : [] };
  } catch (e: any) {
    return { success: false, error: e.message };
  }
}
