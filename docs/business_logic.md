# Business Logic — IFRS17 PAA Calculation Rules
**Version:** 1.0 | **Date:** April 2026 | **Standard:** IFRS17 PAA (Premium Allocation Approach)

---

## Assumptions

1. The system applies IFRS17 **PAA** (simplified measurement model).
2. PAA is applied at the **branch level** — each branch is treated as an insurance contract group.
3. All monetary values are in **ILS (₪)** unless otherwise stated.
4. UPR is calculated using **Pro-Rata Temporis** (calendar days), not earned exposure.
5. Reinsurance is accounted for **proportionally** (quota share model).
6. Admin expenses are allocated using the **cost driver approach** per IFRS17 paragraph 84.
7. The coverage period for each premium record is defined by `startDate` and `endDate` in `PremiumActuals`.

---

## 1. LRC — Liability for Remaining Coverage

### 1.1 UPR (Unearned Premium Reserve)

The UPR represents the portion of written premium attributable to the **future coverage period**.

**Calculation:**

```
remainingDays = endDate − cutoffDate        (days from cutoff to end of coverage)
totalDays     = endDate − startDate         (total coverage period in days)

uprRatio  = CLAMP( remainingDays / totalDays, 0, 1 )

UPR       = grossPremium × uprRatio
Earned    = grossPremium × (1 − uprRatio)
```

**Constraints:**
- `uprRatio` is clamped to [0, 1]
- If `totalDays ≤ 0` → `uprRatio = 0`
- If `remainingDays ≤ 0` → `uprRatio = 0` (fully earned)

**Date parsing:**
- Supported formats: `YYYY-MM-DD`, `DD/MM/YYYY`, `DD-MM-YYYY`
- Dates are parsed as **local time** (noon) to avoid UTC timezone shift errors
- Formula: `new Date(year, month-1, day, 12, 0, 0)`

---

### 1.2 DUC (Deferred Acquisition Costs / Insurance Acquisition Cash Flows)

Under IFRS17 PAA, acquisition costs are deferred in line with the UPR ratio.
Two components offset each other:

**Component A — DAC (Deferred Acquisition Cost) — ASSET:**
```
dacGross = agentCommPct% × originalPremium × uprRatio
```
- Represents agent commissions paid for the future coverage period
- Recognized as expense as coverage is earned

**Component B — Deferred RI Commission — DEFERRED INCOME:**
```
riPremium      = originalPremium × reinsurancePct%
riCommTotal    = riPremium × reinsuranceCommPct%
deferredRIComm = riCommTotal × uprRatio
```
- Represents RI commission received for the future coverage period
- Recognized as income as coverage is earned

**DUC Net (Balance Sheet):**
```
ducNet = dacGross − deferredRIComm
```

| Sign | Interpretation |
|------|----------------|
| ducNet > 0 | Net asset — more deferred costs than deferred income |
| ducNet < 0 | Net liability — more deferred RI income than deferred costs |

---

### 1.3 Premium Recognition

```
earnedGross = originalPremium × (1 − uprRatio)
earnedRI    = (originalPremium × reinsurancePct%) × (1 − uprRatio)
netEarned   = earnedGross − earnedRI

agentCommEarned  = (originalPremium × agentCommPct%) × (1 − uprRatio)
riCommEarned     = riCommTotal × (1 − uprRatio)
```

---

## 2. LIC — Liability for Incurred Claims

### 2.1 Data Sources

LIC is assembled from three sources:

| Component | Source | Description |
|-----------|--------|-------------|
| Claims Paid | `ClaimsActuals.claimsPaidGross` | Already paid, cash basis |
| Outstanding | `ActuarialEstimate.outstandingClaimsGross` | Case reserves, RBNS |
| IBNR | `ActuarialEstimate.ibnrGross` | Incurred But Not Reported |
| Total | `ActuarialEstimate.actuarialEstimateGross` | Full actuarial estimate |

**RI shares:** All components have corresponding `*Ri` fields.

### 2.2 Incurred Claims (Actual)

```
incurredGross = claimsPaidGross + outstandingClaimsGross + ibnrGross
incurredRi    = claimsPaidRi   + outstandingClaimsRi    + ibnrRi
incurredNet   = incurredGross  − incurredRi
```

### 2.3 Development Triangle

Data is structured by `(underwritingYear, lossYear)` allowing:
- Claims development triangle analysis
- IBNR validation per cohort
- Multi-year loss emergence tracking

**Example structure:**
```
lossYear →      2024    2025    2026
UW 2024:        paid₁   paid₂   paid₃
UW 2025:         —      paid₁   paid₂
UW 2026:         —       —      paid₁
```

**Note:** LIC is **not yet integrated** into the automated monthly calculation cycle. It is stored but not aggregated into the IFRS17 balance sheet output. See `gaps_and_issues.md`.

---

## 3. G&A Expense Allocation (IFRS17 PAA — Paragraph 84)

### 3.1 Allocation Logic

Admin expenses are split into two pools with separate cost drivers:

**Pool A — Premium Expenses (`premiumExpense`):**
Expenses attributable to the premium-writing activity (e.g., acquisition overhead).

```
weight_i     = earnedGross_i / Σ earnedGross_j
premShare_i  = premiumExpense × weight_i
```

**Pool B — Claims Expenses (`claimsExpense`):**
Expenses attributable to claims handling activity.

```
expectedClaims_i = earnedGross_i × expectedLrPct_i%
weight_i         = expectedClaims_i / Σ expectedClaims_j
claimsShare_i    = claimsExpense × weight_i
```

**Total allocation per branch:**
```
totalShare_i = premShare_i + claimsShare_i
```

### 3.2 Expense Recognition

Consistent with premium recognition principle:

```
recognizedExpense_i = totalShare_i × (1 − uprRatio_i)
deferredExpense_i   = totalShare_i × uprRatio_i
```

Where `uprRatio_i = uprValue_i / originalPremium_i`

**Principle:** An expense allocated to a branch with future coverage is partially deferred, mirroring the premium deferral.

---

## 4. P&L Structure (Technical / Expected)

Calculated from `BranchParameters` + `UprSnapshot`:

```
Gross Written Premium                          originalPremium
  − UPR (closing)                             − uprValue
= Gross Earned Premium                        = earnedGross

  − RI Earned Premium                         − earnedRI
= Net Earned Premium                          = netEarned

  − Agent Commission Earned                   − agentCommEarned
  + RI Commission Earned                      + riCommEarned
  − Expected Claims (Gross × LR%)             − expectedClaims
  − Admin Expenses (recognized share)         − recognizedExpense
= Technical Underwriting Profit
```

---

## 5. Reinsurance Allocation Logic

The system uses a **proportional (quota share)** model:

| Item | Gross | RI Share | Net |
|------|-------|----------|-----|
| Written Premium | grossPremium | grossPremium × riPct% | net premium |
| Agent Commission | fullComm | — | fullComm |
| RI Commission | — | riPrem × riCommPct% | — |
| Claims | gross | gross × riPct% (approx) | net |
| UPR | gross | RI × uprRatio | net |
| DAC | gross × uprRatio | — | DAC |
| Deferred RI Comm | — | riComm × uprRatio | — |

---

## 6. Calculation Execution Rules

| Rule | Detail |
|------|--------|
| Trigger | Manual — user selects cutoff date in UprManager |
| Idempotent | Yes — deletes existing snapshot before recalculating |
| Scope | One month at a time (`year + month` from `targetDate`) |
| Batch mode | `runHistoricalBatchCalculation()` iterates 2025–2026 all months |
| Dependency | Requires `PremiumActuals` for the period — will error if missing |
| Admin expense | Optional — if no `AdminExpense` record exists, allocation = 0 |
| Storage | Results → `UprSnapshot` + `AdminExpenseAllocation` |

---

## 7. Key Formulas Summary

```
uprRatio           = remainingDays / totalDays                     [clamped 0–1]
UPR                = grossPremium × uprRatio
earnedGross        = grossPremium × (1 − uprRatio)

dacGross           = (grossPremium × agentCommPct%) × uprRatio
riComm             = (grossPremium × riPct%) × riCommPct%
deferredRIComm     = riComm × uprRatio
ducNet             = dacGross − deferredRIComm

premShareWeight    = earnedGross_i / Σ earnedGross
claimsShareWeight  = (earnedGross_i × LR_i%) / Σ (earnedGross × LR%)
totalExpenseShare  = (premWeight × premExpense) + (claimsWeight × claimsExpense)
recognizedExpense  = totalExpenseShare × (1 − uprRatio)
deferredExpense    = totalExpenseShare × uprRatio

incurredClaims     = claimsPaid + outstanding + IBNR
```
