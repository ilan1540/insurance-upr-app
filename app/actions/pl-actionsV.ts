"use server";
import { prisma } from "@/lib/prisma";

// ---------------------------------------------------------------------------
// דוח מטריצה: כל הענפים כעמודות, מרכיבי P&L כשורות — מצטבר YTD
// ---------------------------------------------------------------------------
export async function getBranchMatrixReport(year: number, toMonth: number, groupCode?: string) {
  try {
    const [branchRows, branchMeta] = await Promise.all([
      prisma.premiumActuals.findMany({
        select: { branchNumber: true },
        distinct: ["branchNumber"],
        where: { year, month: { lte: toMonth } },
      }),
      prisma.branch.findMany({ orderBy: [{ groupCode: "asc" }, { branchNumber: "asc" }] }),
    ]);

    const metaMap = new Map(branchMeta.map(b => [b.branchNumber, b]));
    const allNums = branchRows.map(b => b.branchNumber).sort((a, b) => a - b);
    const nums = groupCode
      ? allNums.filter(bn => metaMap.get(bn)?.groupCode === groupCode)
      : allNums;

    const results = await Promise.all(
      nums.map(async bn => {
        const data = await fetchCumulativeData(bn, year, toMonth);
        const meta = metaMap.get(bn);
        return {
          branchNumber: bn,
          branchName:   meta?.branchName  ?? `ענף ${bn}`,
          groupCode:    meta?.groupCode   ?? "",
          groupName:    meta?.groupName   ?? "",
          ...data,
        };
      })
    );

    return { success: true, branches: results };
  } catch (e: any) {
    return { success: false, error: e.message, branches: [] };
  }
}

// ---------------------------------------------------------------------------
// תביעות בפועל: שולף ClaimsActuals + ActuarialEstimate לענף ולתקופה
// ---------------------------------------------------------------------------
async function fetchActualClaims(branchNumber: number, y: number, m: number) {
  const [claims, actuarial] = await Promise.all([
    prisma.claimsActuals.findMany({ where: { year: y, month: m, branchNumber } }),
    prisma.actuarialEstimate.findMany({ where: { year: y, month: m, branchNumber } }),
  ]);

  const claimsPaidGross = claims.reduce((s, r) => s + r.claimsPaidGross, 0);
  const claimsPaidRi    = claims.reduce((s, r) => s + r.claimsPaidRi,    0);
  const outstandingGross = actuarial.reduce((s, r) => s + r.outstandingClaimsGross, 0);
  const outstandingRi    = actuarial.reduce((s, r) => s + r.outstandingClaimsRi,    0);
  const ibnrGross        = actuarial.reduce((s, r) => s + r.ibnrGross,               0);
  const ibnrRi           = actuarial.reduce((s, r) => s + r.ibnrRi,                  0);
  const actuarialEstGross = actuarial.reduce((s, r) => s + r.actuarialEstimateGross, 0);
  const actuarialEstRi    = actuarial.reduce((s, r) => s + r.actuarialEstimateRi,    0);

  // תביעות בפועל = שולמו + תלויות + IBNR
  const incurredGross = claimsPaidGross + outstandingGross + ibnrGross;
  const incurredRi    = claimsPaidRi    + outstandingRi    + ibnrRi;

  return {
    claimsPaidGross, claimsPaidRi,
    outstandingGross, outstandingRi,
    ibnrGross, ibnrRi,
    actuarialEstGross, actuarialEstRi,
    incurredGross, incurredRi,
    incurredNet: incurredGross - incurredRi,
    hasData: claims.length > 0 || actuarial.length > 0,
  };
}

// ---------------------------------------------------------------------------
// תביעות מצטברות YTD
// ---------------------------------------------------------------------------
async function fetchCumulativeClaims(branchNumber: number, y: number, toMonth: number) {
  // שולמו: סכום כל החודשים 1..toMonth
  const claims = await prisma.claimsActuals.findMany({
    where: { year: y, month: { lte: toMonth }, branchNumber },
  });
  // אקטואריה: נכון לסוף התקופה (החודש האחרון הזמין ≤ toMonth)
  const actuarial = await prisma.actuarialEstimate.findMany({
    where: { year: y, month: toMonth, branchNumber },
  });

  const claimsPaidGross  = claims.reduce((s, r) => s + r.claimsPaidGross,           0);
  const claimsPaidRi     = claims.reduce((s, r) => s + r.claimsPaidRi,              0);
  const outstandingGross = actuarial.reduce((s, r) => s + r.outstandingClaimsGross, 0);
  const outstandingRi    = actuarial.reduce((s, r) => s + r.outstandingClaimsRi,    0);
  const ibnrGross        = actuarial.reduce((s, r) => s + r.ibnrGross,              0);
  const ibnrRi           = actuarial.reduce((s, r) => s + r.ibnrRi,                 0);
  const actuarialEstGross = actuarial.reduce((s, r) => s + r.actuarialEstimateGross, 0);
  const actuarialEstRi    = actuarial.reduce((s, r) => s + r.actuarialEstimateRi,    0);

  const incurredGross = claimsPaidGross + outstandingGross + ibnrGross;
  const incurredRi    = claimsPaidRi    + outstandingRi    + ibnrRi;

  return {
    claimsPaidGross, claimsPaidRi,
    outstandingGross, outstandingRi,
    ibnrGross, ibnrRi,
    actuarialEstGross, actuarialEstRi,
    incurredGross, incurredRi,
    incurredNet: incurredGross - incurredRi,
    hasData: claims.length > 0 || actuarial.length > 0,
  };
}

// ---------------------------------------------------------------------------
// נתוני תקופה בודדת (חודשי)
// ---------------------------------------------------------------------------
async function fetchPeriodData(branchNumber: number, y: number, m: number) {
  const [closingSnapshot, openingSnapshot, params, premActuals, claimsData] = await Promise.all([
    prisma.uprSnapshot.findUnique({
      where: { year_period_periodType_branchNumber: { year: y, period: m, periodType: "MONTHLY", branchNumber } },
    }),
    prisma.uprSnapshot.findUnique({
      where: { year_period_periodType_branchNumber: {
        year: m === 1 ? y - 1 : y,
        period: m === 1 ? 12 : m - 1,
        periodType: "MONTHLY", branchNumber,
      }},
    }),
    prisma.branchParameters.findUnique({ where: { year_branchNumber: { year: y, branchNumber } } }),
    prisma.premiumActuals.findFirst({ where: { year: y, month: m, branchNumber } }),
    fetchActualClaims(branchNumber, y, m),
  ]);

  const grossPremium   = premActuals?.grossPremium       ?? 0;
  const agentCommPaid  = premActuals?.agentComm          ?? 0;
  const riPremiumPaid  = premActuals?.reinsurancePremium ?? 0;
  const riCommReceived = premActuals?.reinsuranceComm    ?? 0;

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

  const agentCommEarned = agentCommPaid > 0
    ? agentCommPaid * (1 - uprRatio)
    : (earnedGross * Number(params?.agentCommPct ?? 0)) / 100;

  const riPremEarned = riPremiumPaid > 0
    ? riPremiumPaid * (1 - uprRatio)
    : (earnedGross * Number(params?.reinsurancePct ?? 0)) / 100;
  const riCommEarned = riCommReceived > 0
    ? riCommReceived * (1 - uprRatio)
    : riPremEarned * (Number(params?.reinsuranceCommPct ?? 0) / 100);
  const reinsuranceCost = riPremEarned - riCommEarned;

  // תביעות: אמת אם קיים, אחרת תחזית
  const actualClaims    = claimsData.incurredGross;
  const expectedClaims  = (earnedGross * Number(params?.expectedLrPct ?? 0)) / 100;
  const claimsToUse     = claimsData.hasData ? actualClaims : expectedClaims;
  const claimsRi        = claimsData.hasData ? claimsData.incurredRi : claimsToUse * (Number(params?.reinsurancePct ?? 0) / 100);

  return {
    grossPremium, uprOpening, uprClosing, earnedPremium: earnedGross,
    agentComm: agentCommEarned, reinsuranceCost,
    claimsGross: claimsToUse, claimsRi, claimsNet: claimsToUse - claimsRi,
    claimsDetail: claimsData,
    expectedClaimsBudget: expectedClaims,
    uprRatio,
    dacClosing, dacOpening, riDeferredClose, riDeferredOpen,
    ducNetClosing, ducNetOpening,
    agentCommPaid, riPremiumPaid, riCommReceived,
    params: params ?? {},
  };
}

// ---------------------------------------------------------------------------
// נתונים מצטברים YTD
// ---------------------------------------------------------------------------
async function fetchCumulativeData(branchNumber: number, y: number, toMonth: number) {
  const [closingSnapshot, openingSnapshot, params, allPremiums, claimsData] = await Promise.all([
    prisma.uprSnapshot.findUnique({
      where: { year_period_periodType_branchNumber: { year: y, period: toMonth, periodType: "MONTHLY", branchNumber } },
    }),
    prisma.uprSnapshot.findUnique({
      where: { year_period_periodType_branchNumber: { year: y - 1, period: 12, periodType: "MONTHLY", branchNumber } },
    }),
    prisma.branchParameters.findUnique({ where: { year_branchNumber: { year: y, branchNumber } } }),
    prisma.premiumActuals.findMany({
      where: { year: y, month: { lte: toMonth }, branchNumber },
      orderBy: { month: "asc" },
    }),
    fetchCumulativeClaims(branchNumber, y, toMonth),
  ]);

  const grossPremium   = allPremiums.reduce((s, p) => s + p.grossPremium,       0);
  const agentCommPaid  = allPremiums.reduce((s, p) => s + p.agentComm,          0);
  const riPremiumPaid  = allPremiums.reduce((s, p) => s + p.reinsurancePremium, 0);
  const riCommReceived = allPremiums.reduce((s, p) => s + p.reinsuranceComm,    0);

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

  const agentCommEarned = agentCommPaid  * (1 - uprRatio);
  const riPremEarned    = riPremiumPaid  * (1 - uprRatio);
  const riCommEarned    = riCommReceived * (1 - uprRatio);
  const reinsuranceCost = riPremEarned - riCommEarned;

  const actualClaims   = claimsData.incurredGross;
  const expectedClaims = (earnedGross * Number(params?.expectedLrPct ?? 0)) / 100;
  const claimsToUse    = claimsData.hasData ? actualClaims : expectedClaims;
  const claimsRi       = claimsData.hasData ? claimsData.incurredRi : claimsToUse * (Number(params?.reinsurancePct ?? 0) / 100);

  const monthlyBreakdown = allPremiums.map(p => ({
    month: p.month,
    grossPremium: p.grossPremium,
    agentComm:    p.agentComm,
    riPremium:    p.reinsurancePremium,
    riComm:       p.reinsuranceComm,
  }));

  return {
    grossPremium, uprOpening, uprClosing, earnedPremium: earnedGross,
    agentComm: agentCommEarned, reinsuranceCost,
    claimsGross: claimsToUse, claimsRi, claimsNet: claimsToUse - claimsRi,
    claimsDetail: claimsData,
    expectedClaimsBudget: expectedClaims,
    uprRatio,
    dacClosing, dacOpening, riDeferredClose, riDeferredOpen,
    ducNetClosing, ducNetOpening,
    agentCommPaid, riPremiumPaid, riCommReceived,
    monthlyBreakdown,
    params: params ?? {},
  };
}

// ---------------------------------------------------------------------------
// סיכום נתוני ענפים מרובים לשורה אחת
// ---------------------------------------------------------------------------
function sumBranchData(results: any[]) {
  const sum = (key: string) => results.reduce((s, r) => s + (r[key] ?? 0), 0);

  const grossPremium    = sum("grossPremium");
  const uprClosing      = sum("uprClosing");
  const uprRatio        = grossPremium > 0 ? uprClosing / grossPremium : 0;

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

  // monthly breakdown — סיכום לפי חודש (רלוונטי למצב YTD)
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
// Public action
// branchNumber === 0 && !groupCode  →  כל הענפים (סיכום כולל)
// branchNumber === 0 && groupCode   →  ענף מרכז (סיכום לפי קבוצה)
// ---------------------------------------------------------------------------
export async function getBranchComparisonReport(
  branchNumber: number,
  periodA: { year: number; month: number },
  periodB: { year: number; month: number },
  mode: "monthly" | "cumulative" = "monthly",
  groupCode?: string
) {
  try {
    if (branchNumber === 0) {
      // שלוף ענפים לפי קבוצה או את כולם
      const branchFilter = groupCode
        ? await prisma.branch.findMany({ where: { groupCode }, select: { branchNumber: true } })
        : await prisma.premiumActuals.findMany({ select: { branchNumber: true }, distinct: ["branchNumber"] });
      const nums = branchFilter.map(b => b.branchNumber);

      const [resultsA, resultsB] = await Promise.all([
        Promise.all(nums.map(bn =>
          mode === "cumulative"
            ? fetchCumulativeData(bn, periodA.year, periodA.month)
            : fetchPeriodData(bn, periodA.year, periodA.month)
        )),
        Promise.all(nums.map(bn =>
          mode === "cumulative"
            ? fetchCumulativeData(bn, periodB.year, periodB.month)
            : fetchPeriodData(bn, periodB.year, periodB.month)
        )),
      ]);

      return { success: true, dataA: sumBranchData(resultsA), dataB: sumBranchData(resultsB), mode };
    }

    const [dataA, dataB] = await Promise.all([
      mode === "cumulative"
        ? fetchCumulativeData(branchNumber, periodA.year, periodA.month)
        : fetchPeriodData(branchNumber, periodA.year, periodA.month),
      mode === "cumulative"
        ? fetchCumulativeData(branchNumber, periodB.year, periodB.month)
        : fetchPeriodData(branchNumber, periodB.year, periodB.month),
    ]);
    return { success: true, dataA, dataB, mode };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
