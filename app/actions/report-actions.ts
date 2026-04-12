"use server";
import { prisma } from "@/lib/prisma";

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
