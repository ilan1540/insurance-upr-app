"use server";
import { prisma } from "@/lib/prisma";

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
// Public action
// ---------------------------------------------------------------------------
export async function getBranchComparisonReport(
  branchNumber: number,
  periodA: { year: number; month: number },
  periodB: { year: number; month: number },
  mode: "monthly" | "cumulative" = "monthly"
) {
  try {
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
