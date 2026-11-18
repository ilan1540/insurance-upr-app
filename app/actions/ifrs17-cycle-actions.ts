"use server";
/**
 * Orchestrator — מחזור IFRS17 חודשי מלא בלחיצה אחת.
 * מריץ את כל השלבים בסדר הנכון ומחזיר סיכום סטטוס לכל שלב.
 *
 * סדר:
 *   1. runFullUprCalculation      — UPR + DUC + LIC + הקצאת הנה"כ
 *   2. enrichLicWithRaAndDiscount — R1 (RA) + R2 (היוון)
 *   3. runFullRollforward         — LRC + LIC rollforward (כולל R6)
 *   4. runLossComponentRollforward— R3 (Loss Component)
 *   5. runReinsuranceAsset        — R11 (נכס ב"מ נפרד)
 *   6. reassessOnerousFromActuals — R5 (onerous מנתוני אמת)
 *   7. runPeriodReconciliation    — R12 (בקרות לפני סגירה)
 */
import { runFullUprCalculation } from "./upr-actions";
import { enrichLicWithRaAndDiscount } from "./risk-adjustment-actions";
import { runFullRollforward } from "./rollforward-actions";
import { runLossComponentRollforward } from "./loss-component-actions";
import { runReinsuranceAsset } from "./reinsurance-asset-actions";
import { reassessOnerousFromActuals } from "./gic-actions";
import { runPeriodReconciliation } from "./reconciliation-actions";

export async function runFullIfrs17Cycle(year: number, month: number) {
  const lastDay = new Date(year, month, 0).toISOString().split("T")[0];
  const steps: Array<{ step: string; success: boolean; detail?: any; error?: string }> = [];

  const record = (step: string, res: any) =>
    steps.push({ step, success: !!res?.success, detail: res, error: res?.success ? undefined : res?.error });

  // 1. UPR/DUC/LIC
  const upr = await runFullUprCalculation(lastDay);
  record("1. UPR + DUC + LIC + הנה\"כ", upr);
  if (!upr.success) return { success: false, steps, stoppedAt: 1 };

  // 2. RA + Discounting
  record("2. Risk Adjustment + היוון", await enrichLicWithRaAndDiscount(year, month));

  // 3. Rollforward (חייב פתיחה — ירוץ גם אם חודש קודם חסר, יחזיר אפסים)
  record("3. Rollforward LRC + LIC", await runFullRollforward(year, month));

  // 4. Loss Component
  record("4. Loss Component", await runLossComponentRollforward(year, month));

  // 5. Reinsurance asset
  record("5. נכס ביטוח משנה", await runReinsuranceAsset(year, month));

  // 6. Onerous reassessment
  record("6. הערכת הפסדיות מאמת", await reassessOnerousFromActuals(year, month));

  // 7. Reconciliation
  const recon = await runPeriodReconciliation(year, month);
  record("7. בקרות סגירה", recon);

  const allOk = steps.every(s => s.success);
  const canClose = recon?.success ? recon.summary?.canClose : false;

  return {
    success: allOk,
    period: { year, month },
    steps,
    canClose,
    summary: `${steps.filter(s => s.success).length}/${steps.length} שלבים הושלמו` +
             (canClose ? " — התקופה ניתנת לסגירה ✓" : " — קיימות שגיאות בקרה ✗"),
  };
}
