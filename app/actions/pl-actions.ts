"use server";
import { prisma } from "@/lib/prisma";

// ---------------------------------------------------------------------------
// P&L תחזית — YTD מצטבר מינואר עד סוף החודש הנבחר
// מקור: branchParameters בלבד (תחזית טהורה, ללא ערבוב עם נתוני אמת)
// הפרמיה השנתית מחולקת ל-12 מנות חודשיות: startDate=תחילת חודש, endDate=תחילת אותו חודש שנה הבאה
// כולל פוליסות משנה קודמת שה-endDate שלהן חוצה לתוך שנת החישוב
// ---------------------------------------------------------------------------
export async function getPnLReport(year: number, month: number) {
  try {
    const periodStart = new Date(year, 0, 1, 0, 0, 0);           // 1 בינואר של השנה הנבחרת
    const cutoff      = new Date(year, month, 0, 23, 59, 59);    // יום אחרון בחודש הנבחר

    // תחזית שנה נוכחית + שנה קודמת (לפוליסות חוצות שנה)
    const allParams = await prisma.branchParameters.findMany({
      where: { year: { in: [year - 1, year] } },
    });

    const currentYearParams = allParams.filter(p => p.year === year);
    if (currentYearParams.length === 0) {
      return { success: false, error: `לא נמצאו פרמטרי תחזית לשנת ${year} — יש לקלוט קובץ תחזית תחילה` };
    }

    // עמלות ו-LR — תמיד לפי פרמטרי השנה הנוכחית
    const ratesMap = new Map(currentYearParams.map(p => [p.branchNumber, p]));

    // רק ענפים שיש להם תחזית לשנה הנוכחית
    const activeBranches = new Set(currentYearParams.map(p => p.branchNumber));

    type BranchAgg = { earnedGross: number; uprGross: number };
    const branchAgg = new Map<number, BranchAgg>();

    // חישוב מנות חודשיות לכל שנה (נוכחית + קודמת)
    for (const bp of allParams) {
      if (!activeBranches.has(bp.branchNumber)) continue; // דלג על ענפים ללא תחזית שנה נוכחית

      const monthly = Number(bp.expectedGrossPremium) / 12;

      for (let m = 1; m <= 12; m++) {
        const trancheStart = new Date(bp.year, m - 1, 1, 0, 0, 0);
        const trancheEnd   = new Date(bp.year + 1, m - 1, 1, 0, 0, 0);
        const totalDays    = (trancheEnd.getTime() - trancheStart.getTime()) / 86400000;

        // ימים שהורווחו בתוך תקופת ה-YTD
        const earnedFrom = Math.max(trancheStart.getTime(), periodStart.getTime());
        const earnedTo   = Math.min(trancheEnd.getTime(), cutoff.getTime());
        const earnedDays = Math.max(0, (earnedTo - earnedFrom) / 86400000);
        if (earnedDays <= 0) continue;

        // UPR = פרמיה שטרם הורווחה ביום החתך
        const remainingDays = Math.max(0, (trancheEnd.getTime() - cutoff.getTime()) / 86400000);

        const cur = branchAgg.get(bp.branchNumber) ?? { earnedGross: 0, uprGross: 0 };
        branchAgg.set(bp.branchNumber, {
          earnedGross: cur.earnedGross + monthly * (earnedDays    / totalDays),
          uprGross:    cur.uprGross    + monthly * (remainingDays / totalDays),
        });
      }
    }

    // בניית שורות הדוח — שיעורים מ-branchParameters של השנה הנוכחית בלבד
    const rows = Array.from(branchAgg.entries())
      .map(([branchNumber, agg]) => {
        const bp = ratesMap.get(branchNumber)!;

        const agentCommPct       = Number(bp.agentCommPct);
        const reinsurancePct     = Number(bp.reinsurancePct);
        const reinsuranceCommPct = Number(bp.reinsuranceCommPct);
        const expectedLrPct      = Number(bp.expectedLrPct);

        const agentCommission    = agg.earnedGross * agentCommPct       / 100;
        const riPremium          = agg.earnedGross * reinsurancePct     / 100;
        const riComm             = riPremium       * reinsuranceCommPct / 100;
        const netReinsuranceCost = riPremium - riComm;

        // תביעות — ברוטו, חלק ב"מ ונטו
        const claimsGross        = agg.earnedGross * expectedLrPct / 100;
        const claimsRI           = riPremium       * expectedLrPct / 100;  // ב"מ שותף בתביעות
        const claimsNet          = claimsGross - claimsRI;

        // רווח חתמי נטו
        const underwritingProfit = agg.earnedGross - agentCommission - netReinsuranceCost - claimsNet;

        return {
          branchNumber,
          uprValue:           agg.uprGross,
          earnedGross:        agg.earnedGross,
          agentCommission,
          riPremium,
          riCommEarned:       riComm,
          netReinsuranceCost,
          claimsGross,
          claimsRI,
          claimsNet,
          underwritingProfit,
          lr:                 expectedLrPct,
          agentCommPct,
          reinsurancePct,
          reinsuranceCommPct,
        };
      })
      .sort((a, b) => a.branchNumber - b.branchNumber);

    return { success: true, rows };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
