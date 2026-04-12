# Baseline v1.0 — Approved System Scope
**Version:** 1.0 | **Date:** April 2026 | **Status:** LOCKED FOR REVIEW

---

## Purpose

This document defines the **approved baseline** of the system as of April 2026.
It distinguishes between:
- ✅ **Locked logic** — implemented, validated, do not modify without change control
- 🔄 **Open items** — known gaps, planned for future development
- ❌ **Out of scope** — explicitly excluded from current baseline

---

## Approved Modules (In Scope)

| Module | Status | Notes |
|--------|--------|-------|
| CSV Data Ingestion (6 types) | ✅ Complete | Branch, Params, Premiums, Claims, Actuarial, G&A |
| Branch Master Data | ✅ Complete | branchNumber, name, groupCode, groupName |
| Annual Budget Parameters | ✅ Complete | Per branch per year |
| UPR Calculation (LRC - premium) | ✅ Complete | Pro-Rata, stored in UprSnapshot |
| DUC Calculation (DAC + RI Comm) | ✅ Complete | DUC Net stored in UprSnapshot |
| G&A Expense Allocation | ✅ Complete | By earned premium and expected claims weights |
| G&A Expense Recognition | ✅ Complete | proportional to earned ratio |
| UPR Archive (monthly snapshots) | ✅ Complete | Stored, retrievable by year/month |
| Historical Batch Calculation | ✅ Complete | 2025–2026 |
| Expected P&L Report | ✅ Complete | Technical view per branch |
| Data Browser (ReportsManager) | ✅ Complete | All 6 input tables |
| UPR Detailed Report | ✅ Complete | Per branch with day counts and ratios |
| Branch Comparison Report | ✅ Complete | Two-period delta analysis |
| CSV Templates (all types) | ✅ Complete | Download with sample rows |

---

## Locked Logic — Do Not Modify

The following business rules are **approved and locked**. Changes require formal change control.

### UPR Calculation
```
uprRatio  = CLAMP( (endDate − cutoffDate) / (endDate − startDate), 0, 1 )
UPR       = grossPremium × uprRatio
```
- Date parsing: local time (noon), supports `YYYY-MM-DD` and `DD/MM/YYYY`
- Source data: `PremiumActuals` table, NOT `Policy` table

### DUC Calculation
```
dacGross       = (originalPremium × agentCommPct%) × uprRatio
deferredRIComm = (originalPremium × riPct% × riCommPct%) × uprRatio
ducNet         = dacGross − deferredRIComm
```
- Parameters sourced from `BranchParameters` (annual budget)
- Result stored in `UprSnapshot`

### G&A Allocation
```
premShare_i    = (earnedGross_i / Σ earnedGross) × premiumExpense
claimsShare_i  = (earnedGross_i × LR_i% / Σ earnedGross×LR%) × claimsExpense
recognizedExp  = totalShare × (1 − uprRatio)
deferredExp    = totalShare × uprRatio
```
- Allocation stored in `AdminExpenseAllocation`
- Runs as part of `runFullUprCalculation`

### Data Ingestion Rules
- All uploads are **delete-then-insert** by `(year, month)` — idempotent
- CSV BOM (`\uFEFF`) is stripped from all headers
- Multiple months in one file are supported
- Date formats supported: `YYYY-MM-DD`, `DD/MM/YYYY`, `DD-MM-YYYY`

### Database Uniqueness Constraints (Locked)
| Table | Unique Key |
|-------|-----------|
| BranchParameters | `(year, branchNumber)` |
| PremiumActuals | `(year, month, branchNumber)` |
| ClaimsActuals | `(year, month, branchNumber, underwritingYear, lossYear)` |
| ActuarialEstimate | `(year, month, branchNumber, underwritingYear, lossYear)` |
| AdminExpense | `(year, month)` |
| UprSnapshot | `(year, period, periodType, branchNumber)` |
| AdminExpenseAllocation | `(year, month, branchNumber)` |

---

## Open Items — Future Development

Listed in priority order. See `gaps_and_issues.md` for full detail.

### Sprint 2 (Next milestone)

| ID | Item | Description |
|----|------|-------------|
| C1 | LIC Integration | Aggregate ClaimsActuals + ActuarialEstimate into formal LIC |
| M3 | DUC from Actuals | Use `PremiumActuals.agentComm` and `.reinsuranceComm` instead of budget % |
| M4 | Batch Error Log | Report which months failed in batch calculation |
| N3 | Quarterly Interpolation | Handle months without actuarial data in variance report |
| S1 | Upload Chunking | Handle large CSV files without timeout |
| N4 | Input Validation | Field-level validation with row-level error return |

### Sprint 3 (Future)

| ID | Item | Description |
|----|------|-------------|
| C2 | GIC Definition | Define insurance contract groups for IFRS17 disclosure |
| C3 | Rollforward | Opening/closing balance movement schedule |
| S3 | Audit Trail | Track who ran calculations and what changed |
| M1 | Monthly Params | Override budget parameters at monthly granularity |

### Backlog (No committed date)

| ID | Item | Description |
|----|------|-------------|
| M2 | Multi-row per branch/month | Allow multiple coverage periods per branch per month |
| N5 | Dynamic year selector | Replace hardcoded year list in ReportsManager |
| N1 | Remove Policy table | Deprecate and clean up legacy table |

---

## Out of Scope (Baseline v1)

The following items are explicitly **not included** in this baseline and are not planned:

- Full actuarial reserving system (chain ladder, BF method)
- Policy-level granularity (individual policy tracking)
- General Measurement Model (GMM / Building Block Approach)
- VFA (Variable Fee Approach) for participating contracts
- IFRS17 CSM (Contractual Service Margin) calculations
- Multi-currency support
- External system integration (API, EDI, accounting systems)
- User authentication and role-based access control
- Audit logging of user actions

---

## System Configuration as of Baseline v1

| Parameter | Value |
|-----------|-------|
| Calculation Method | IFRS17 PAA |
| Granularity | Branch level |
| Reinsurance Model | Proportional (quota share) |
| Calendar Convention | Calendar days (Pro-Rata Temporis) |
| Supported Years | 2024, 2025, 2026 |
| Supported Branches | 12 (from BranchParameters file) |
| Calculation Trigger | Manual (user-initiated) |
| Database | PostgreSQL (Neon Serverless) |
| Deployment | Next.js Server Actions |

---

## Change Control

Any modification to **Locked Logic** above requires:
1. Description of the change and business reason
2. Impact assessment (which tables, reports, calculations affected)
3. Test evidence (before/after values for at least one branch/month)
4. Update to this document (`baseline_v1.md` version increment)

---

## Document History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | April 2026 | System | Initial baseline after codebase analysis |
