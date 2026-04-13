"use server";
import { prisma } from "@/lib/prisma";

export async function getAvailableYears(): Promise<number[]> {
  const rows = await prisma.branchParameters.findMany({
    select: { year: true },
    distinct: ["year"],
    orderBy: { year: "desc" },
  });
  return rows.map(r => r.year);
}

export async function getRawData(
  reportType: "params" | "actuals" | "actuarial",
  filters: { year: number; month: number; branch: number }
) {
  const { year, month, branch } = filters;
  const branchFilter = branch > 0 ? { branchNumber: branch } : {};

  if (reportType === "params") {
    return prisma.branchParameters.findMany({
      where: { year, ...branchFilter },
      orderBy: { branchNumber: "asc" },
    });
  }

  if (reportType === "actuals") {
    const [premiums, claims] = await Promise.all([
      prisma.premiumActuals.findMany({
        where: { year, month, ...branchFilter },
        orderBy: { branchNumber: "asc" },
      }),
      prisma.claimsActuals.findMany({
        where: { year, month, ...branchFilter },
      }),
    ]);
    // מצרפים תביעות לפי ענף (סכום כל שנות החיתום/נזק)
    const claimsMap = new Map<number, { claimsPaidGross: number; claimsPaidRi: number }>();
    for (const c of claims) {
      const cur = claimsMap.get(c.branchNumber) ?? { claimsPaidGross: 0, claimsPaidRi: 0 };
      claimsMap.set(c.branchNumber, {
        claimsPaidGross: cur.claimsPaidGross + c.claimsPaidGross,
        claimsPaidRi:    cur.claimsPaidRi    + c.claimsPaidRi,
      });
    }
    return premiums.map(p => ({
      ...p,
      ...(claimsMap.get(p.branchNumber) ?? { claimsPaidGross: 0, claimsPaidRi: 0 }),
    }));
  }

  // actuarial
  return prisma.actuarialEstimate.findMany({
    where: { year, month, ...branchFilter },
    orderBy: [{ branchNumber: "asc" }, { underwritingYear: "asc" }],
  });
}

export async function getReportData(
  type: 'params' | 'premium-actuals' | 'claims-actuals' | 'actuarial' | 'admin-expense',
  year: number
) {
  try {
    if (type === 'params') {
      return await prisma.branchParameters.findMany({
        where: { year },
        orderBy: { branchNumber: 'asc' },
      });
    }

    if (type === 'premium-actuals') {
      return await prisma.premiumActuals.findMany({
        where: { year },
        orderBy: [{ month: 'desc' }, { branchNumber: 'asc' }],
      });
    }

    if (type === 'claims-actuals') {
      return await prisma.claimsActuals.findMany({
        where: { year },
        orderBy: [{ month: 'desc' }, { branchNumber: 'asc' }, { underwritingYear: 'asc' }],
      });
    }

    if (type === 'actuarial') {
      return await prisma.actuarialEstimate.findMany({
        where: { year },
        orderBy: [{ month: 'desc' }, { branchNumber: 'asc' }, { underwritingYear: 'asc' }],
      });
    }

    if (type === 'admin-expense') {
      return await prisma.adminExpense.findMany({
        where: { year },
        orderBy: { month: 'asc' },
      });
    }

    return [];
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
}
