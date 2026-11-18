"use server";
/**
 * R1 + R2 — Risk Adjustment & Discounting on LIC (IFRS17 §36, §37, §56, §87)
 *
 * מעשיר רשומות LicSnapshot קיימות ברכיבי מדידה IFRS17:
 *   - riskAdjustment  (R1) לפי RiskAdjustmentConfig
 *   - licDiscounted   (R2) לפי DiscountCurve + payout pattern
 *   - financeExpense  (R2) unwind מול חודש קודם
 *   - licFulfilment   = licDiscounted + riskAdjustment
 *
 * תנאי: קיים LicSnapshot לתקופה (מ-runFullUprCalculation).
 */
import { prisma } from "@/lib/prisma";
import { calculateRiskAdjustment, RaMethod } from "@/lib/risk-adjustment";
import { discountCashflows, spreadLicToPayout, unwindDiscount, DiscountCurvePoint } from "@/lib/discounting";

function prevPeriod(year: number, month: number) {
  return month === 1 ? { year: year - 1, month: 12 } : { year, month: month - 1 };
}

// תבנית פירעון ברירת מחדל (זנב 4 שנים) — ניתן להעשיר לפי ענף בעתיד
const DEFAULT_PAYOUT_PATTERN = [55, 25, 13, 7];

export async function enrichLicWithRaAndDiscount(year: number, month: number) {
  try {
    const prev = prevPeriod(year, month);

    const [licSnapshots, prevLic, raConfigs, curvePoints] = await Promise.all([
      prisma.licSnapshot.findMany({ where: { year, month } }),
      prisma.licSnapshot.findMany({ where: { year: prev.year, month: prev.month } }),
      prisma.riskAdjustmentConfig.findMany({ where: { year } }),
      prisma.discountCurve.findMany({ where: { year, month, currency: "ILS" } }),
    ]);

    if (licSnapshots.length === 0) {
      return { success: false, error: `אין LicSnapshot לתקופה ${month}/${year} — יש להריץ חישוב UPR תחילה` };
    }

    const raMap   = new Map(raConfigs.map(c => [c.branchNumber, c]));
    const globalRa = raMap.get(0); // 0 = ברירת מחדל גלובלית
    const prevMap = new Map(prevLic.map((l: any) => [l.branchNumber, l]));

    const curve: DiscountCurvePoint[] = curvePoints
      .map(p => ({ yearOffset: p.yearOffset, spotRate: p.spotRate }))
      .sort((a, b) => a.yearOffset - b.yearOffset);
    const hasCurve = curve.length > 0;

    let totalRa = 0, totalDiscounted = 0, totalFinance = 0;

    for (const lic of licSnapshots) {
      const cfg = raMap.get(lic.branchNumber) ?? globalRa;

      // --- R2: היוון ---
      let licDiscounted = lic.licNet;
      if (hasCurve && lic.licNet > 0) {
        const cashflows = spreadLicToPayout(lic.licNet, DEFAULT_PAYOUT_PATTERN);
        licDiscounted = discountCashflows(cashflows, curve).presentValue;
      }

      // --- R1: Risk Adjustment (על הבסיס המהוון) ---
      let riskAdjustment = 0;
      if (cfg) {
        riskAdjustment = calculateRiskAdjustment({
          method:          cfg.method as RaMethod,
          licNet:          licDiscounted,
          percentage:      cfg.percentage,
          cocRate:         cfg.cocRate,
          duration:        2, // קירוב משך; ניתן לחשב מ-payout pattern
          capitalCharge:  licDiscounted, // קירוב: הון בסיכון ≈ ההתחייבות
          confidenceLevel: cfg.confidenceLevel,
          volatility:      cfg.volatility,
        }).riskAdjustment;
      }

      // --- R2: Finance expense (unwind) מול פתיחה ---
      const prevSnap = prevMap.get(lic.branchNumber) as any;
      const openingPv = prevSnap?.licDiscounted ?? prevSnap?.licNet ?? 0;
      const periodRate = hasCurve ? curve[0].spotRate / 12 : 0; // חודשי
      const financeExpense = unwindDiscount(openingPv, periodRate);

      const licFulfilment = Math.round((licDiscounted + riskAdjustment) * 100) / 100;

      await prisma.licSnapshot.update({
        where: { year_month_branchNumber: { year, month, branchNumber: lic.branchNumber } },
        data: { riskAdjustment, licDiscounted, financeExpense, licFulfilment },
      });

      totalRa += riskAdjustment;
      totalDiscounted += licDiscounted;
      totalFinance += financeExpense;
    }

    return {
      success: true,
      count: licSnapshots.length,
      totalRiskAdjustment: Math.round(totalRa),
      totalLicDiscounted: Math.round(totalDiscounted),
      totalFinanceExpense: Math.round(totalFinance),
      discountApplied: hasCurve,
    };
  } catch (e: any) {
    return { success: false, error: e.message };
  }
}

// --- ניהול קונפיגורציית RA ---
export async function saveRaConfig(
  year: number, branchNumber: number, method: RaMethod,
  values: { percentage?: number; cocRate?: number; confidenceLevel?: number; volatility?: number }
) {
  try {
    const saved = await prisma.riskAdjustmentConfig.upsert({
      where: { year_branchNumber: { year, branchNumber } },
      update: { method, ...values },
      create: { year, branchNumber, method, ...values },
    });
    return { success: true, config: saved };
  } catch (e: any) {
    return { success: false, error: e.message };
  }
}

export async function getRaConfigs(year: number) {
  try {
    const configs = await prisma.riskAdjustmentConfig.findMany({ where: { year }, orderBy: { branchNumber: "asc" } });
    return { success: true, configs };
  } catch (e: any) {
    return { success: false, error: e.message, configs: [] };
  }
}

// --- ניהול עקום היוון ---
export async function saveDiscountCurve(
  year: number, month: number, points: { yearOffset: number; spotRate: number }[], currency = "ILS"
) {
  try {
    await prisma.discountCurve.deleteMany({ where: { year, month, currency } });
    await prisma.discountCurve.createMany({
      data: points.map(p => ({ year, month, currency, yearOffset: p.yearOffset, spotRate: p.spotRate })),
    });
    return { success: true, count: points.length };
  } catch (e: any) {
    return { success: false, error: e.message };
  }
}

export async function getDiscountCurve(year: number, month: number, currency = "ILS") {
  try {
    const points = await prisma.discountCurve.findMany({
      where: { year, month, currency }, orderBy: { yearOffset: "asc" },
    });
    return { success: true, points };
  } catch (e: any) {
    return { success: false, error: e.message, points: [] };
  }
}
