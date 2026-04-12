# Data Model — Insurance UPR / IFRS17 PAA System
**Version:** 1.0 | **Date:** April 2026

---

## Overview

The data model is organized in three layers:

| Layer | Tables | Purpose |
|-------|--------|---------|
| **Master Data** | Branch, BranchParameters | Definitions and annual budget |
| **Actuals / Input** | PremiumActuals, ClaimsActuals, ActuarialEstimate, AdminExpense | Monthly data inputs |
| **Calculated Results** | UprSnapshot, AdminExpenseAllocation | IFRS17 calculation outputs |
| **Legacy** | Policy | Not used in current flow |

---

## Table Definitions

---

### Branch
Master table for insurance branches (sub-lines).

| Field | Type | Notes |
|-------|------|-------|
| `branchNumber` | Int (PK) | Unique branch identifier |
| `branchName` | String | Display name (e.g., "רכב חובה") |
| `groupCode` | String | Reporting group code (e.g., "CAR") |
| `groupName` | String | Reporting group name (e.g., "ענפי רכב") |
| `updatedAt` | DateTime | Auto-updated |

**Key constraint:** `branchNumber` is primary key — one record per branch.

---

### BranchParameters
Annual actuarial/underwriting parameters per branch. Used for budget forecasting and DUC/expense calculations.

| Field | Type | Notes |
|-------|------|-------|
| `id` | String (CUID) | Internal ID |
| `year` | Int | Budget year |
| `branchNumber` | Int | FK → Branch |
| `expectedGrossPremium` | Float | Annual gross premium budget |
| `agentCommPct` | Float | Agent commission % of gross premium |
| `reinsurancePct` | Float | % of gross premium ceded to RI |
| `reinsuranceCommPct` | Float | RI commission % of RI premium |
| `expectedLrPct` | Float | Expected Loss Ratio % (for G&A allocation) |
| `updatedAt` | DateTime | Auto-updated |

**Key constraint:** `UNIQUE(year, branchNumber)` — one row per branch per year.

---

### PremiumActuals
Monthly actual written premiums by branch. Core source for UPR/DUC calculation.

| Field | Type | Notes |
|-------|------|-------|
| `id` | String (CUID) | Internal ID |
| `year` | Int | Reporting year |
| `month` | Int | Reporting month (1–12) |
| `branchNumber` | Int | FK → Branch |
| `startDate` | DateTime | Coverage period start (for Pro-Rata UPR) |
| `endDate` | DateTime | Coverage period end (for Pro-Rata UPR) |
| `grossPremium` | Float | Gross written premium |
| `agentComm` | Float | Agent commission paid |
| `reinsurancePremium` | Float | RI premium ceded |
| `reinsuranceComm` | Float | RI commission received |
| `updatedAt` | DateTime | Auto-updated |

**Key constraint:** `UNIQUE(year, month, branchNumber)` — one row per branch per month.

**Note:** `startDate` and `endDate` represent the insurance coverage period, not the accounting period. This is the basis for Pro-Rata UPR calculation.

---

### ClaimsActuals
Monthly actual claims paid, broken down by underwriting year and loss year (development triangle).

| Field | Type | Notes |
|-------|------|-------|
| `id` | String (CUID) | Internal ID |
| `year` | Int | Reporting year (data load year) |
| `month` | Int | Reporting month |
| `branchNumber` | Int | FK → Branch |
| `underwritingYear` | Int | Year the policy was written |
| `lossYear` | Int | Year the loss event occurred |
| `claimsPaidGross` | Float | Claims paid (gross) |
| `claimsPaidRi` | Float | RI share of claims paid |
| `updatedAt` | DateTime | Auto-updated |

**Key constraint:** `UNIQUE(year, month, branchNumber, underwritingYear, lossYear)`.

**Design rationale:** Separation of underwriting year and loss year enables claims development triangle analysis and cohort tracking per IFRS17.

---

### ActuarialEstimate
Monthly actuarial reserves by branch, underwriting year, and loss year.

| Field | Type | Notes |
|-------|------|-------|
| `id` | String (CUID) | Internal ID |
| `year` | Int | Reporting year |
| `month` | Int | Reporting month (typically 3, 6, 9, 12) |
| `branchNumber` | Int | FK → Branch |
| `underwritingYear` | Int | Year the policy was written |
| `lossYear` | Int | Year the loss event occurred |
| `outstandingClaimsGross` | Float | Outstanding case reserves (gross) |
| `outstandingClaimsRi` | Float | RI share of outstanding |
| `ibnrGross` | Float | IBNR reserve (gross) |
| `ibnrRi` | Float | RI share of IBNR |
| `actuarialEstimateGross` | Float | Total actuarial estimate (gross) |
| `actuarialEstimateRi` | Float | Total actuarial estimate (RI share) |
| `updatedAt` | DateTime | Auto-updated |

**Key constraint:** `UNIQUE(year, month, branchNumber, underwritingYear, lossYear)`.

**Relationship:**
```
actuarialEstimateGross ≈ outstandingClaimsGross + ibnrGross (+ actuarial adjustments)
```

---

### AdminExpense
Monthly administration and general (G&A) expenses, split by cost driver.

| Field | Type | Notes |
|-------|------|-------|
| `id` | String (CUID) | Internal ID |
| `year` | Int | Reporting year |
| `month` | Int | Reporting month |
| `premiumExpense` | Float | G&A attributed to premium activity |
| `claimsExpense` | Float | G&A attributed to claims activity |
| `description` | String? | Optional description |
| `updatedAt` | DateTime | Auto-updated |

**Key constraint:** `UNIQUE(year, month)` — one record per month.

---

### UprSnapshot
Calculated IFRS17 results per branch per month. Populated by `runFullUprCalculation()`.

| Field | Type | Notes |
|-------|------|-------|
| `id` | String (CUID) | Internal ID |
| `year` | Int | Calculation year |
| `period` | Int | Calculation month |
| `periodType` | String | Always "MONTHLY" |
| `branchNumber` | Int | FK → Branch |
| `originalPremium` | Decimal(15,2) | Gross written premium for the period |
| `uprValue` | Decimal(15,2) | Unearned Premium Reserve (LRC premium component) |
| `dacGross` | Decimal(15,2) | DAC = agent commission × uprRatio (asset) |
| `deferredRIComm` | Decimal(15,2) | Deferred RI commission × uprRatio (deferred income) |
| `ducNet` | Decimal(15,2) | DUC Net = DAC − Deferred RI Comm |
| `calculatedAt` | DateTime | Calculation timestamp |

**Key constraint:** `UNIQUE(year, period, periodType, branchNumber)`.

---

### AdminExpenseAllocation
Allocation of monthly G&A expenses to branches. Populated by `runFullUprCalculation()`.

| Field | Type | Notes |
|-------|------|-------|
| `id` | String (CUID) | Internal ID |
| `year` | Int | Reporting year |
| `month` | Int | Reporting month |
| `branchNumber` | Int | FK → Branch |
| `premiumExpenseShare` | Float | Allocated premium expense |
| `claimsExpenseShare` | Float | Allocated claims expense |
| `totalExpenseShare` | Float | Total allocated expense |
| `recognizedExpense` | Float | Expense recognized in period |
| `deferredExpense` | Float | Expense deferred to future periods |
| `updatedAt` | DateTime | Auto-updated |

**Key constraint:** `UNIQUE(year, month, branchNumber)`.

---

### Policy (Legacy — not used in current flow)
Original policy-level table. Replaced by `PremiumActuals` for UPR calculations.

| Field | Type | Notes |
|-------|------|-------|
| `id` | String (CUID) | Internal ID |
| `policyNumber` | String (unique) | Policy number |
| `branchNumber` | Int | Branch |
| `premiumAmount` | Decimal(15,2) | Policy premium |
| `startDate` | DateTime | Policy start |
| `endDate` | DateTime | Policy end |
| `status` | String | "ACTIVE" default |
| `createdAt` | DateTime | Creation timestamp |

---

## Entity Relationship Diagram

```
Branch (branchNumber)
  │
  ├── BranchParameters (year, branchNumber)        ← Annual budget
  │
  ├── PremiumActuals (year, month, branchNumber)    ← Monthly actuals input
  │
  ├── ClaimsActuals (year, month, branchNumber,     ← Monthly claims
  │                  underwritingYear, lossYear)
  │
  ├── ActuarialEstimate (year, month, branchNumber, ← Quarterly reserves
  │                       underwritingYear, lossYear)
  │
  ├── UprSnapshot (year, period, branchNumber)      ← Calculated LRC
  │
  └── AdminExpenseAllocation (year, month,          ← Calculated G&A
                               branchNumber)

AdminExpense (year, month) ─────────────────────────→ AdminExpenseAllocation
```

---

## Data Grain Summary

| Table | Grain | Loaded By |
|-------|-------|-----------|
| Branch | per branch | CSV / once |
| BranchParameters | per branch × year | CSV / annually |
| PremiumActuals | per branch × year × month | CSV / monthly |
| ClaimsActuals | per branch × year × month × UW year × loss year | CSV / monthly |
| ActuarialEstimate | per branch × year × month × UW year × loss year | CSV / quarterly |
| AdminExpense | per year × month | CSV / monthly |
| UprSnapshot | per branch × year × month | Calculated |
| AdminExpenseAllocation | per branch × year × month | Calculated |
