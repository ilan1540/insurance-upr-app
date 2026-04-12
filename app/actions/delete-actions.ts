"use server";
import { prisma } from "@/lib/prisma";

export async function deleteDataByPeriod(
  type: 'policies' | 'params' | 'premium-actuals' | 'claims-actuals' | 'actuarial',
  year: number,
  month: number
) {
  try {
    if (type === 'policies') {
      await prisma.uprSnapshot.deleteMany({ where: { year, period: month } });
    } else if (type === 'params') {
      await prisma.branchParameters.deleteMany({ where: { year } });
    } else if (type === 'premium-actuals') {
      await prisma.premiumActuals.deleteMany({ where: { year, month } });
    } else if (type === 'claims-actuals') {
      await prisma.claimsActuals.deleteMany({ where: { year, month } });
    } else if (type === 'actuarial') {
      await prisma.actuarialEstimate.deleteMany({ where: { year, month } });
    }
    return { success: true };
  } catch (error: any) {
    return { success: false, error: "שגיאה בתהליך המחיקה: " + error.message };
  }
}
