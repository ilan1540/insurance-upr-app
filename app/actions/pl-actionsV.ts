"use server";
import { prisma } from "@/lib/prisma";

// ---------------------------------------------------------------------------
// סיכום נתוני ענפים מרובים לשורה אחת
// ---------------------------------------------------------------------------
function sumBranchData(results: any[]) {
  const sum = (key: string) => results.reduce((s, r) => s + (r[key] ?? 0), 0);

  const grossPremium = sum("grossPremium");
  const uprClosing   = sum("uprClosing");
  const uprRatio     = grossPremium > 0 ? uprClosing / grossPremium : 0;

  const claimsDetail = {
    hasData:           results.some(r => r.claimsDetail?.hasData),
    claimsPaidGross:   results.reduce((s, r) => s + (r.claimsDetail?.claimsPaidGross   ?? 0), 0),
    claimsPaidRi:      results.reduce((s, r) => s + (r.claimsDetail?.claimsPaidRi      ?? 0), 0),
    outstandingGross:  results.reduce((s, r) => s + (r.claimsDetail?.outstandingGross  ?? 0), 0),
    outstandingRi:     results.reduce((s, r) => s + (r.claimsDetail?.outstandingRi     ?? 0), 0),
    ibnrGross:         results.reduce((s, r) => s + (r.claimsDetail?.ibnrGross         ?? 0), 0),
    ibnrRi:            results.reduce((s, r) => s + (r.claimsDetail?.ibnrRi            ?? 0), 0),
    actuarialEstGross: results.reduce((s, r) => s + (r.claimsDetail?.actuarialEstGross ?? 0), 0),
    actuarialEstRi:    results.reduce((s, r) => s + (r.claimsDetail?.actuarialEstRi    ?? 0), 0),
  };

  const monthlyMap = new Map<number, any>();
  for (const r of results) {
    for (const mb of r.monthlyBreakdown ?? []) {
      const cur = monthlyMap.get(mb.month) ?? { month: mb.month, grossPremium: 0, agentComm: 0, riPremium: 0, riComm: 0 };
      monthlyMap.set(mb.month, {
        month:        mb.month,
        grossPremium: cur.grossPremium + mb.grossPremium,
        agentComm:    cur.agentComm    + mb.agentComm,
        riPremium:    cur.riPremium    + mb.riPremium,
        riComm:       cur.riComm       + mb.riComm,
      });
    }
  }

  return {
    grossPremium,
    uprOpening:      sum("uprOpening"),
    uprClosing,
    earnedPremium:   sum("earnedPremium"),
    agentComm:       sum("agentComm"),
    reinsuranceCost: sum("reinsuranceCost"),
    claimsGross:     sum("claimsGross"),
    claimsRi:        sum("claimsRi"),
    claimsNet:       sum("claimsNet"),
    claimsDetail,
    uprRatio,
    dacClosing:      sum("dacClosing"),
    dacOpening:      sum("dacOpening"),
    riDeferredClose: sum("riDeferredClose"),
    riDeferredOpen:  sum("riDeferredOpen"),
    ducNetClosing:   sum("ducNetClosing"),
    ducNetOpening:   sum("ducNetOpening"),
    agentCommPaid:   sum("agentCommPaid"),
    riPremiumPaid:   sum("riPremiumPaid"),
    riCommReceived:  sum("riCommReceived"),
    monthlyBreakdown: Array.from(monthlyMap.values()).sort((a, b) => a.month - b.month),
    params: {},
  };
}

// ---------------------------------------------------------------------------
// Public action — bulk queries במקום N×queries לכל ענף
// branchNumber === 0  →  כל הענפים (סיכום כולל)
// ---------------------------------------------------------------------------
export async function getBranchComparisonReport(
  branchNumber: number,
  periodA: { year: number; month: number },
  periodB: { year: number; month: number },
  mode: "monthly" | "cumulative" = "monthly"
) {
  try {
    // 1. רשימת ענפים
    let branchNums: number[];
    if (branchNumber === 0) {
      const rows = await prisma.premiumActuals.findMany({
        select: { branchNumber: true },
        distinct: ["branchNumber"],
      });
      branchNums = rows.map(r => r.branchNumber);
    } else {
      branchNums = [branchNumber];
    }

    // 2. תקופות פתיחה
    // monthly: חודש קודם (או דצמבר שנה קודמת אם ינואר)
    // cumulative: תמיד דצמבר שנה קודמת
    const openA = (mode === "cumulative" || periodA.month === 1)
      ? { year: periodA.year - 1, month: 12 }
      : { year: periodA.year,     month: periodA.month - 1 };
    const openB = (mode === "cumulative" || periodB.month === 1)
      ? { year: periodB.year - 1, month: 12 }
      : { year: periodB.year,     month: periodB.month - 1 };

    // 3. תקופות snapshot ייחודיות לשליפה אחת
    const snapshotPeriods = [
      { year: periodA.year, month: periodA.month },
      { year: openA.year,   month: openA.month   },
      { year: periodB.year, month: periodB.month },
      { year: openB.year,   month: openB.month   },
    ].filter((p, i, arr) => arr.findIndex(x => x.year === p.year && x.month === p.month) === i);

    // 4. שליפת כל הנתונים במקביל — ~8 queries ללא קשר למספר הענפים
    const paramYears = [...new Set([periodA.year, periodB.year])];

    const [
      allSnapshots,
      allParams,
      premiumsA, premiumsB,
      claimsA,   claimsB,
      actuarialA, actuarialB,
    ] = await Promise.all([
      prisma.uprSnapshot.findMany({
        where: {
          periodType: "MONTHLY",
          OR: snapshotPeriods.map(p => ({ year: p.year, period: p.month })),
        },
      }),
      prisma.branchParameters.findMany({
        where: { year: { in: paramYears } },
      }),
      prisma.premiumActuals.findMany({
        where: mode === "cumulative"
          ? { year: periodA.year, month: { lte: periodA.month } }
          : { year: periodA.year, month: periodA.month },
      }),
      prisma.premiumActuals.findMany({
        where: mode === "cumulative"
          ? { year: periodB.year, month: { lte: periodB.month } }
          : { year: periodB.year, month: periodB.month },
      }),
      prisma.claimsActuals.findMany({
        where: mode === "cumulative"
          ? { year: periodA.year, month: { lte: periodA.month } }
          : { year: periodA.year, month: periodA.month },
      }),
      prisma.claimsActuals.findMany({
        where: mode === "cumulative"
          ? { year: periodB.year, month: { lte: periodB.month } }
          : { year: periodB.year, month: periodB.month },
      }),
      prisma.actuarialEstimate.findMany({ where: { year: periodA.year, month: periodA.month } }),
      prisma.actuarialEstimate.findMany({ where: { year: periodB.year, month: periodB.month } }),
    ]);

    // 5. מפות לחיפוש מהיר
    const snapshotKey = (y: number, m: number, bn: number) => `${y}-${m}-${bn}`;
    const snapshotMap = new Map(allSnapshots.map(s => [snapshotKey(s.year, s.period, s.branchNumber), s]));
    const paramsMap   = new Map(allParams.map(p => [`${p.year}-${p.branchNumber}`, p]));

    // 6. חישוב לענף בודד מתוך הנתונים הטעונים מראש
    const computeBranch = (
      bn: number,
      period: { year: number; month: number },
      opening: { year: number; month: number },
      premiums: typeof premiumsA,
      claims:   typeof claimsA,
      actuarial: typeof actuarialA,
    ) => {
      const closingSnapshot = snapshotMap.get(snapshotKey(period.year, period.month, bn));
      const openingSnapshot = snapshotMap.get(snapshotKey(opening.year, opening.month, bn));
      const params          = paramsMap.get(`${period.year}-${bn}`);

      const branchPremiums  = premiums.filter(p => p.branchNumber === bn);
      const branchClaims    = claims.filter(c => c.branchNumber === bn);
      const branchActuarial = actuarial.filter(a => a.branchNumber === bn);

      let grossPremium: number, agentCommPaid: number, riPremiumPaid: number, riCommReceived: number;
      if (mode === "cumulative") {
        grossPremium   = branchPremiums.reduce((s, p) => s + p.grossPremium,       0);
        agentCommPaid  = branchPremiums.reduce((s, p) => s + p.agentComm,          0);
        riPremiumPaid  = branchPremiums.reduce((s, p) => s + p.reinsurancePremium, 0);
        riCommReceived = branchPremiums.reduce((s, p) => s + p.reinsuranceComm,    0);
      } else {
        const prem     = branchPremiums[0];
        grossPremium   = prem?.grossPremium       ?? 0;
        agentCommPaid  = prem?.agentComm          ?? 0;
        riPremiumPaid  = prem?.reinsurancePremium ?? 0;
        riCommReceived = prem?.reinsuranceComm    ?? 0;
      }

      const uprClosing      = Number(closingSnapshot?.uprValue       ?? 0);
      const uprOpening      = Number(openingSnapshot?.uprValue       ?? 0);
      const dacClosing      = Number(closingSnapshot?.dacGross       ?? 0);
      const dacOpening      = Number(openingSnapshot?.dacGross       ?? 0);
      const riDeferredClose = Number(closingSnapshot?.deferredRIComm ?? 0);
      const riDeferredOpen  = Number(openingSnapshot?.deferredRIComm ?? 0);
      const ducNetClosing   = Number(closingSnapshot?.ducNet         ?? 0);
      const ducNetOpening   = Number(openingSnapshot?.ducNet         ?? 0);

      const earnedGross = grossPremium + uprOpening - uprClosing;
      const uprRatio    = grossPremium > 0 ? uprClosing / grossPremium : 0;

      const claimsPaidGross   = branchClaims.reduce((s, c) => s + c.claimsPaidGross,           0);
      const claimsPaidRi      = branchClaims.reduce((s, c) => s + c.claimsPaidRi,              0);
      const outstandingGross  = branchActuarial.reduce((s, a) => s + a.outstandingClaimsGross, 0);
      const outstandingRi     = branchActuarial.reduce((s, a) => s + a.outstandingClaimsRi,    0);
      const ibnrGross         = branchActuarial.reduce((s, a) => s + a.ibnrGross,              0);
      const ibnrRi            = branchActuarial.reduce((s, a) => s + a.ibnrRi,                 0);
      const actuarialEstGross = branchActuarial.reduce((s, a) => s + a.actuarialEstimateGross, 0);
      const actuarialEstRi    = branchActuarial.reduce((s, a) => s + a.actuarialEstimateRi,    0);
      const incurredGross     = claimsPaidGross + outstandingGross + ibnrGross;
      const incurredRi        = claimsPaidRi    + outstandingRi    + ibnrRi;
      const hasData           = branchClaims.length > 0 || branchActuarial.length > 0;

      const claimsDetail = {
        hasData,
        claimsPaidGross, claimsPaidRi,
        outstandingGross, outstandingRi,
        ibnrGross, ibnrRi,
        actuarialEstGross, actuarialEstRi,
        incurredGross, incurredRi,
        incurredNet: incurredGross - incurredRi,
      };

      let agentCommEarned: number, riPremEarned: number, riCommEarned: number;
      if (mode === "cumulative") {
        agentCommEarned = agentCommPaid  * (1 - uprRatio);
        riPremEarned    = riPremiumPaid  * (1 - uprRatio);
        riCommEarned    = riCommReceived * (1 - uprRatio);
      } else {
        agentCommEarned = agentCommPaid > 0
          ? agentCommPaid * (1 - uprRatio)
          : (earnedGross * Number(params?.agentCommPct ?? 0)) / 100;
        riPremEarned = riPremiumPaid > 0
          ? riPremiumPaid * (1 - uprRatio)
          : (earnedGross * Number(params?.reinsurancePct ?? 0)) / 100;
        riCommEarned = riCommReceived > 0
          ? riCommReceived * (1 - uprRatio)
          : riPremEarned * (Number(params?.reinsuranceCommPct ?? 0) / 100);
      }
      const reinsuranceCost = riPremEarned - riCommEarned;

      const expectedClaims = (earnedGross * Number(params?.expectedLrPct ?? 0)) / 100;
      const claimsToUse    = hasData ? incurredGross : expectedClaims;
      const claimsRi       = hasData ? incurredRi    : claimsToUse * (Number(params?.reinsurancePct ?? 0) / 100);

      const monthlyBreakdown = mode === "cumulative"
        ? branchPremiums.map(p => ({
            month:        p.month,
            grossPremium: p.grossPremium,
            agentComm:    p.agentComm,
            riPremium:    p.reinsurancePremium,
            riComm:       p.reinsuranceComm,
          }))
        : undefined;

      return {
        grossPremium, uprOpening, uprClosing, earnedPremium: earnedGross,
        agentComm: agentCommEarned, reinsuranceCost,
        claimsGross: claimsToUse, claimsRi, claimsNet: claimsToUse - claimsRi,
        claimsDetail,
        expectedClaimsBudget: expectedClaims,
        uprRatio,
        dacClosing, dacOpening, riDeferredClose, riDeferredOpen,
        ducNetClosing, ducNetOpening,
        agentCommPaid, riPremiumPaid, riCommReceived,
        ...(monthlyBreakdown ? { monthlyBreakdown } : {}),
        params: params ?? {},
      };
    };

    // N3: flag אם נתוני אקטואריה חסרים לתקופה (בד"כ קיימים רק ברבעון)
    const actuarialWarningA = actuarialA.length === 0
      ? "נתונים אקטואריים חסרים ל-" + periodA.month + "/" + periodA.year + " — ניתוח Variance חלקי בלבד (זמין בדרך כלל ברבעון)"
      : null;
    const actuarialWarningB = actuarialB.length === 0
      ? "נתונים אקטואריים חסרים ל-" + periodB.month + "/" + periodB.year + " — ניתוח Variance חלקי בלבד (זמין בדרך כלל ברבעון)"
      : null;

    if (branchNumber === 0) {
      const resultsA = branchNums.map(bn => computeBranch(bn, periodA, openA, premiumsA, claimsA, actuarialA));
      const resultsB = branchNums.map(bn => computeBranch(bn, periodB, openB, premiumsB, claimsB, actuarialB));
      return { success: true, dataA: sumBranchData(resultsA), dataB: sumBranchData(resultsB), mode, actuarialWarningA, actuarialWarningB };
    }

    const dataA = computeBranch(branchNumber, periodA, openA, premiumsA, claimsA, actuarialA);
    const dataB = computeBranch(branchNumber, periodB, openB, premiumsB, claimsB, actuarialB);
    return { success: true, dataA, dataB, mode, actuarialWarningA, actuarialWarningB };

  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
