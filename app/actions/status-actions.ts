"use server";
import { prisma } from "@/lib/prisma";

export async function getDataStatus(year: number, month: number) {
  try {
    const [uprCount, paramsCount, premiumCount, claimsCount] = await Promise.all([
      prisma.uprSnapshot.count({ where: { year, period: month } }),
      prisma.branchParameters.count({ where: { year } }),
      prisma.premiumActuals.count({ where: { year, month } }),
      prisma.claimsActuals.count({ where: { year, month } }),
    ]);

    return {
      success: true,
      data: {
        hasPolicies:  uprCount     > 0,
        policyCount:  uprCount,
        hasParams:    paramsCount  > 0,
        paramCount:   paramsCount,
        hasPremiums:  premiumCount > 0,
        premiumCount,
        hasClaims:    claimsCount  > 0,
        claimsCount,
        isReadyForReport: uprCount > 0 && paramsCount > 0 && premiumCount > 0,
      },
    };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
