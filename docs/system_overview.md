# System Overview — Insurance UPR / IFRS17 PAA System
**Version:** 1.0 | **Date:** April 2026 | **Standard:** IFRS17 PAA (Premium Allocation Approach)

---

## Purpose

This system implements **IFRS17 Premium Allocation Approach (PAA)** accounting for an insurance company.
It manages the full monthly cycle:
> Data Ingestion → Validation → Storage → Calculation → Reporting

---

## Technology Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript 5 |
| ORM | Prisma 7 + PostgreSQL (Neon Serverless) |
| UI | React 19 + TailwindCSS 4 |
| Server Logic | Next.js Server Actions ("use server") |
| CSV Parsing | csv-parser 3 |

---

## System Modules

### Module 1 — Data Ingestion
**Path:** `app/actions/data-actions.ts`, `app/components/OperationsDashboard.tsx`

Handles all CSV file uploads into the database. Six input types:

| Input Type | File | Frequency | Target Table |
|-----------|------|-----------|-------------|
| Branch Definitions | Template_Branches.csv | Once / as needed | Branch |
| Annual Budget Params | Template_Budget_Params.csv | Annually | BranchParameters |
| Premium Actuals | Template_Premium_Actuals.csv | Monthly | PremiumActuals |
| Claims Actuals | Template_Claims_Actuals.csv | Monthly | ClaimsActuals |
| Actuarial Estimates | Template_Actuarial_Reserves.csv | Monthly (quarterly) | ActuarialEstimate |
| Admin Expenses | Template_Admin_Expenses.csv | Monthly | AdminExpense |

**Key behavior:**
- Handles BOM (`\uFEFF`) in CSV headers
- Supports date formats: `YYYY-MM-DD` and `DD/MM/YYYY`
- Delete-then-insert per period (idempotent)
- Multi-period files supported (delete all unique year+month combos before insert)

---

### Module 2 — Policy/Branch Management
**Path:** `app/actions/branch-actions.ts`, `prisma/schema.prisma`

Maintains the branch master data used across all reports:
- Branch number (primary key)
- Branch name (e.g., "רכב חובה")
- Group code + name for reporting aggregation (e.g., "CAR", "ענפי רכב")

The `Policy` table exists as legacy infrastructure but is not used in the current calculation flow. Premium data flows through `PremiumActuals` instead.

---

### Module 3 — Reinsurance Module
**Path:** `lib/insurance-logic.ts`, `BranchParameters`, `PremiumActuals`

Reinsurance is embedded in the main calculation model, not a standalone module. It operates through:

| Parameter | Source | Usage |
|-----------|--------|-------|
| `reinsurancePct` | BranchParameters | % of gross premium ceded to RI |
| `reinsuranceCommPct` | BranchParameters | RI commission received % |
| `reinsurancePremium` | PremiumActuals | Actual premium ceded (actual input) |
| `reinsuranceComm` | PremiumActuals | Actual commission received |
| `claimsPaidRi` | ClaimsActuals | RI share of claims paid |
| `outstandingClaimsRi` / `ibnrRi` | ActuarialEstimate | RI share of reserves |

All values are stored and reported on a **gross and net basis**.

---

### Module 4 — IFRS17 Calculation Engine
**Path:** `lib/insurance-logic.ts`, `app/actions/upr-actions.ts`

The core engine. Runs monthly, triggered manually from the UPR Manager UI.

**Entry point:** `runFullUprCalculation(targetDate: string)`

**Calculation sequence:**
1. Load `PremiumActuals` for `(year, month)`
2. For each branch: calculate UPR Pro-Rata by days
3. For each branch: calculate DUC (DAC gross − Deferred RI Commission)
4. Load `AdminExpense` for the month; allocate to branches
5. Store results to `UprSnapshot` + `AdminExpenseAllocation`

**Three components calculated:**

| Component | Logic |
|-----------|-------|
| LRC — UPR | grossPremium × (remaining days / total days) |
| LRC — DUC | DAC = agentComm × uprRatio; DeferredRIComm = RIComm × uprRatio; DUC = DAC − DeferredRIComm |
| G&A Expense Allocation | By earned premium weight (premium expenses) and expected claims weight (claims expenses) |

**Note:** LIC (Liability for Incurred Claims) is captured via `ClaimsActuals` + `ActuarialEstimate` but is **not yet integrated** into the main IFRS17 calculation cycle. See `gaps_and_issues.md`.

---

### Module 5 — Reporting Layer
**Path:** `app/components/`, `app/actions/pl-actions.ts`, `variance-actions.ts`

| Report | Component | Source |
|--------|-----------|--------|
| UPR Summary (snapshot) | UprArchive | UprSnapshot + AdminExpenseAllocation |
| UPR Detail | UprDetailedReport | PremiumActuals (live recalc) |
| Expected P&L | PnLReportView | UprSnapshot + BranchParameters |
| Branch Comparison | BranchVerticalPnl | UprSnapshot (two periods) |
| Actual vs. Technical | ActualVsTechnicalReport | Snapshot + Actuals + Actuarial |
| Data Browser | ReportsManager | All input tables |

---

## Data Flow Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                    INPUT LAYER (CSV Upload)                  │
│  Branches │ BranchParams │ Premiums │ Claims │ Actuarial │ G&A │
└─────────────────────┬───────────────────────────────────────┘
                      │ delete-then-insert per period
                      ▼
┌─────────────────────────────────────────────────────────────┐
│                    STORAGE LAYER (PostgreSQL)                │
│  Branch │ BranchParameters │ PremiumActuals │ ClaimsActuals  │
│  ActuarialEstimate │ AdminExpense                            │
└─────────────────────┬───────────────────────────────────────┘
                      │ runFullUprCalculation(targetDate)
                      ▼
┌─────────────────────────────────────────────────────────────┐
│                  CALCULATION ENGINE (IFRS17)                 │
│  1. UPR Pro-Rata (PremiumActuals → UprSnapshot)             │
│  2. DUC = DAC − DeferredRIComm (BranchParameters)           │
│  3. Admin Expense Allocation (AdminExpense → Allocation)     │
└─────────────────────┬───────────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────────────┐
│                    RESULT STORAGE                            │
│  UprSnapshot │ AdminExpenseAllocation                        │
└─────────────────────┬───────────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────────────┐
│                    REPORTING LAYER                           │
│  UPR Archive │ P&L Report │ Variance │ Branch Comparison     │
└─────────────────────────────────────────────────────────────┘
```

---

## Monthly Operating Procedure

1. Upload **PremiumActuals** for the month
2. Upload **ClaimsActuals** for the month
3. Upload **ActuarialEstimates** for the quarter (months 3, 6, 9, 12)
4. Upload **AdminExpenses** for the month
5. Run **UPR Calculation** from the UPR Manager (select last day of month)
6. Review results in UPR Archive and P&L Report
