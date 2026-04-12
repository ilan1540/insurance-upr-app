"use server";

export async function downloadTemplate(
  type: 'params' | 'premium-actuals' | 'claims-actuals' | 'actuarial' | 'admin-expense' | 'branches'
) {
  let headers = "";
  let fileName = "";

  switch (type) {
    case 'params':
      headers = "year,branchNumber,expectedGrossPremium,agentCommPct,reinsurancePct,reinsuranceCommPct,expectedLrPct";
      fileName = "Template_Budget_Params.csv";
      break;

    case 'premium-actuals':
      // פרמיות אמת — כולל תאריכי תחילה/סוף לחישוב UPR/DAC
      headers = "year,month,branchNumber,startDate,endDate,grossPremium,agentComm,reinsurancePremium,reinsuranceComm\n2025,1,1,2025-01-01,2025-12-31,500000,50000,100000,10000\n2025,1,2,2025-01-01,2025-12-31,300000,30000,60000,6000";
      fileName = "Template_Premium_Actuals.csv";
      break;

    case 'claims-actuals':
      // תביעות אמת — כולל שנת חיתום ושנת נזק
      headers = "year,month,branchNumber,underwritingYear,lossYear,claimsPaidGross,claimsPaidRi\n2025,1,1,2024,2024,80000,20000\n2025,1,1,2023,2024,30000,8000\n2025,1,2,2025,2025,50000,12000";
      fileName = "Template_Claims_Actuals.csv";
      break;

    case 'actuarial':
      headers = "year,month,branchNumber,underwritingYear,lossYear,outstandingClaimsGross,outstandingClaimsRi,ibnrGross,ibnrRi,actuarialEstimateGross,actuarialEstimateRi\n2025,12,100,2025,2025,150000,63000,40000,16800,200000,84000\n2025,12,100,2024,2024,80000,33600,20000,8400,105000,44100\n2025,12,100,2024,2025,30000,12600,8000,3360,40000,16800";
      fileName = "Template_Actuarial_Reserves.csv";
      break;

    case 'admin-expense':
      headers = "year,month,premiumExpense,claimsExpense,description\n2025,1,50000,30000,שכר ושכירות\n2025,2,50000,30000,";
      fileName = "Template_Admin_Expenses.csv";
      break;

    case 'branches':
      headers = "branchNumber,branchName,groupCode,groupName\n1,רכב חובה,CAR,ענפי רכב\n2,רכב רכוש,CAR,ענפי רכב\n3,אש ורכוש,PROPERTY,ענפי רכוש\n4,תאונות אישיות,ACCIDENT,ענפי תאונות";
      fileName = "Template_Branches.csv";
      break;
  }

  return { content: "\uFEFF" + headers, fileName };
}
