# Gaps and Issues Analysis
**Version:** 1.0 | **Date:** April 2026 | **Status:** Pre-Stabilization

---

## Summary

| Severity | Count | Description |
|----------|-------|-------------|
| 🔴 Critical | 3 | Missing IFRS17 components blocking balance sheet completeness |
| 🟠 Major | 4 | Logic gaps affecting accuracy |
| 🟡 Minor | 5 | Data quality and UX issues |
| 🔵 Scalability | 3 | Technical risks at scale |

---

## 🔴 Critical Gaps

### C1 — LIC Not Integrated into IFRS17 Balance Sheet

**Issue:** `ClaimsActuals` and `ActuarialEstimate` data is stored but **not aggregated into a formal LIC output**. The system calculates LRC (via UPR/DUC) but does not produce a complete IFRS17 insurance liability.

**Impact:** Cannot produce a compliant IFRS17 Statement of Financial Position.

**Missing:**
- LIC = Outstanding Claims (gross) + IBNR + Actuarial adjustments
- LIC (RI) = corresponding reinsurance recoverable
- LIC Net = LIC − LIC RI

**Resolution required:**
- Create `LicSnapshot` table
- Aggregate `ActuarialEstimate` per branch per month into LIC
- Include in monthly calculation cycle

---

### C2 — No IFRS17 Insurance Contract Groups (GIC) Defined

**Issue:** The system operates at **branch level**, treating each branch as a single reporting unit. IFRS17 requires grouping into **portfolios → annual cohorts → profitability buckets** (onerous, not onerous, undetermined).

**Impact:** Results cannot be formally mapped to IFRS17 disclosure requirements. Onerous contract identification is missing.

**Resolution required:**
- Add `GIC` (Group of Insurance Contracts) dimension to data model
- Map `(branchNumber, underwritingYear)` to GIC
- Identify onerous groups via `expectedLrPct > 100%` or actual LR tracking

---

### C3 — No Opening/Closing Balance Reconciliation

**Issue:** The system calculates a single monthly snapshot but does **not reconcile the movement** between opening and closing balances (rollforward).

**Impact:** Cannot produce IFRS17 movement analysis (IFRS17 paragraph 101–105):
- Premiums written in period
- Release of premium (earned)
- Claims incurred
- Experience adjustments
- Changes in estimates

**Resolution required:**
- Store prior month snapshots and compare
- Implement IFRS17 rollforward schedule per GIC

---

## 🟠 Major Issues

### M1 — BranchParameters: Single Record per Branch/Year (No Monthly Granularity)

**Issue:** `BranchParameters` holds one record per `(year, branchNumber)`. UPR calculations use **annual parameters** (`agentCommPct`, `reinsurancePct`) applied to monthly data.

**Impact:** If reinsurance terms change mid-year, the system cannot reflect this. Agent commission rates that change monthly are averaged across the year.

**Resolution:** Consider adding monthly override capability or flagging that parameters are annual approximations.

---

### M2 — `PremiumActuals` Unique Constraint: One Row per Branch/Month

**Issue:** The unique constraint `UNIQUE(year, month, branchNumber)` means **only one coverage period per branch per month**. In reality, a branch may have multiple sub-lines or policy groupings with different start/end dates.

**Impact:** Different premium cohorts within a branch cannot be represented separately. Pro-Rata UPR calculation uses a single averaged date range per branch.

**Resolution:** Either:
1. Allow multiple rows per `(year, month, branchNumber)` by removing the unique constraint, or
2. Accept limitation and document that input is pre-aggregated to a single period per branch

---

### M3 — DUC Calculation Uses BranchParameters (Budget), Not PremiumActuals

**Issue:** `dacGross` and `deferredRIComm` are calculated using **budget parameters** (`agentCommPct`, `reinsurancePct`) applied to actual `originalPremium`, rather than the **actual agent commission** from `PremiumActuals.agentComm`.

**Impact:** DUC will differ from actual commission expense whenever actual commission rates deviate from budget.

**Correct approach:**
- `dacGross = PremiumActuals.agentComm × uprRatio` (actual)
- `deferredRIComm = PremiumActuals.reinsuranceComm × uprRatio` (actual)

**Current workaround:** Budget and actual are often close, but this is a known approximation.

---

### M4 — `runHistoricalBatchCalculation` Ignores Failed Months

**Issue:** The batch function (`runHistoricalBatchCalculation`) loops 2025–2026 and counts successes, but months with missing data silently return `{ success: false }` without logging which months failed.

**Impact:** Operator cannot tell which historical months have complete vs. incomplete calculations.

**Resolution:** Return list of failed periods with error messages.

---

## 🟡 Minor Issues

### N1 — `Policy` Table is Dead Code

The `Policy` table and `uploadPolicies()` function exist but are not used in any active calculation or report. The UPR flow was migrated to `PremiumActuals`.

**Action:** Mark as deprecated in schema comments. Remove in future cleanup.

---

### N2 — Date Format Inconsistency in Input Files

Generated test files use `DD/MM/YYYY` format. The `parseLocalDate` function now handles both formats, but **template files** could generate confusion if different tools produce different formats.

**Action:** Standardize all CSV templates to `YYYY-MM-DD` format.

---

### N3 — ActuarialEstimate Loaded Quarterly but Calculation Runs Monthly

**Issue:** Actuarial estimates are realistic only at quarter-end. Monthly UPR calculations for months 1, 2, 4, 5, 7, 8, 10, 11 will show zero actuarial values unless data is explicitly loaded.

**Impact:** Variance analysis (Actual vs. Technical) understates liabilities in non-quarter months.

**Resolution:** Either interpolate between quarters, or restrict variance analysis to quarter-end dates.

---

### N4 — No Input Validation on CSV Upload

CSV uploads do not validate:
- Negative premium values
- Future dates beyond reasonable range
- Duplicate rows within the same file
- Missing required fields (only `branchNumber`, `year`, `month` are checked)

**Action:** Add field-level validation before insert, return row-level error list.

---

### N5 — ReportsManager Year Selector Hardcoded

The year selector in `ReportsManager` shows `[2024, 2025, 2026]` hardcoded. If data spans different years, the selector will miss them.

**Action:** Replace with dynamic year list from DB query.

---

## 🔵 Scalability Risks

### S1 — Transaction Timeout on Large Uploads

Large CSV files (e.g., 12 months × 12 branches × 2 rows = 288 rows) caused Prisma `$transaction` timeouts at 5000ms. This was partially resolved by switching to sequential `await` for claims and actuarial uploads.

**Risk:** Files with more branches (e.g., 50+ branches × 12 months = 600+ rows) will be slow.

**Resolution:** Add `batchSize` chunking on `createMany`, or use bulk PostgreSQL COPY.

---

### S2 — Monthly Calculation Not Parallelized

`runFullUprCalculation` runs sequentially:
1. Load premiums
2. Calculate UPR per branch
3. Calculate DUC per branch
4. Allocate expenses
5. Save to DB

For large branch counts, step 5 (DB write) uses a single `$transaction` which may timeout.

**Resolution:** Split into separate commits, or increase transaction timeout in Prisma config.

---

### S3 — No Audit Trail / Versioning of Calculations

When `runFullUprCalculation` runs, it deletes the previous snapshot and replaces it. There is no history of:
- Who triggered the calculation
- What input data was used
- What the previous values were

**Impact:** Cannot explain changes between calculation runs.

**Resolution:** Add `calculationRun` tracking table, or implement soft-delete with version numbering.

---

## Gap Priority Matrix

| ID | Gap | Effort | Impact | Priority |
|----|-----|--------|--------|----------|
| C1 | LIC integration | High | Critical | Sprint 2 |
| C2 | GIC definition | High | Critical | Sprint 3 |
| C3 | Opening/closing rollforward | High | Critical | Sprint 3 |
| M3 | DUC from actuals not budget | Low | High | Sprint 2 |
| M1 | Monthly params granularity | Medium | Medium | Backlog |
| M2 | Multiple rows per branch/month | Medium | Medium | Backlog |
| M4 | Batch error reporting | Low | Low | Sprint 2 |
| N3 | Quarterly actuarial interpolation | Medium | Medium | Sprint 2 |
| S1 | Upload timeout | Low | Medium | Sprint 2 |
| S3 | Audit trail | Medium | Medium | Sprint 3 |
| N4 | Input validation | Medium | Low | Sprint 2 |
