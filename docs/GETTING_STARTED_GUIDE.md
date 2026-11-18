# מדריך התחלת עבודה — מערכת Insurance UPR / IFRS17

> **גרסה:** 1.0 | **תאריך:** יוני 2026
> מדריך מעשי משלב 0: התקנה ← קלט בסיסי ← חישובים ← בדיקות ובקרות.
> כל שלב כולל מה לעשות, איזה קובץ/פונקציה משרת אותו, ומה התוצאה הצפויה.

---

## שלב 0 — התקנה והכנת הסביבה (חד-פעמי)

לפני כל עבודה, מאחר שנוספו טבלאות ושדות חדשים ל-IFRS17 (RA, היוון, Loss Component, נכס ב"מ, בקרות):

```bash
# 1. התקנת תלויות
npm install

# 2. הגדרת חיבור ל-DB בקובץ .env
#    DATABASE_URL="postgresql://..."

# 3. ⚠️ חובה — יצירת ה-Client ועדכון סכמת ה-DB (לאחר השינויים החדשים)
npx prisma generate
npx prisma db push

# 4. הרצת השרת
npm run dev      # פיתוח
# או
npm run build && npm start   # ייצור
```

> **חשוב:** שלב 3 הכרחי. בלעדיו הקוד החדש (RiskAdjustmentConfig, DiscountCurve, LossComponentRollforward, ReinsuranceAsset, ReconciliationRun ושדות LIC חדשים) לא יעבוד. הריצו אותו פעם אחת לאחר עדכון זה.

**בדיקת תקינות:** היכנסו לדף הבית (`/`). אם נטען — הסביבה תקינה.

---

## שלב 1 — קלט בסיסי (Master Data)

הקליטה נעשית דרך מסך ההעלאות (`/upload`). הסדר חשוב: master → תחזית → נתוני אמת.

### 1.1 ענפים (Branch)
**קובץ:** `טבלת ענפי משנה.csv` | **פונקציה:** `uploadBranchesCSV`
עמודות: `branchNumber, branchName, groupCode, groupName`.
**תוצאה:** מאסטר ענפים לשיוך שמות וקיבוצים בדוחות.

### 1.2 פרמטרי תחזית שנתיים (BranchParameters)
**קובץ:** `קלט נתוני תחזית.csv` | **פונקציה:** `uploadBranchParamsCSV`
עמודות: `year, branchNumber, expectedGrossPremium, agentCommPct, reinsurancePct, reinsuranceCommPct, expectedLrPct`.
עמודות **חדשות (אופציונליות)** ל-IFRS17:

| עמודה | ברירת מחדל | תפקיד |
|-------|-----------|-------|
| `expectedExpensePct` | 0 | % הוצאות שירות צפוי — לחישוב Loss Component (R3) |
| `earningPattern` | `PRO_RATA` | תבנית הכרה בפרמיה: `PRO_RATA` / `EVEN_24THS` / `EXPOSURE` (R7) |
| `coveragePeriodMonths` | 12 | תקופת כיסוי — לבדיקת זכאות PAA (R4) |

**תוצאה:** שורה אחת לכל (שנה, ענף). לאחר הקליטה הריצו `syncGicsFromParams(year)` ליצירת קבוצות GIC + סיווג onerous + בדיקת זכאות PAA אוטומטית.

### 1.3 הגדרות IFRS17 (חדש — חד-פעמי לשנה)

**Risk Adjustment** — `saveRaConfig(year, branchNumber, method, values)`
הגדירו שיטת RA. למשל ברירת מחדל גלובלית (branchNumber=0):
`method="PERCENTAGE", percentage=6` → RA = 6% מ-LIC נטו.
שיטות נוספות: `COST_OF_CAPITAL` (cocRate), `CONFIDENCE` (confidenceLevel + volatility).

**עקום היוון** — `saveDiscountCurve(year, month, points)`
נקודות `{ yearOffset, spotRate }`, למשל `[{1,0.04},{2,0.045},{3,0.05}]`.
ללא עקום — ה-LIC נשאר לא-מהוון (undiscounted) וזה תקין לזנב קצר.

---

## שלב 2 — קלט נתוני אמת חודשיים

### 2.1 פרמיות אמת (PremiumActuals)
**קובץ:** `קלט נתוני אמת.csv` | **פונקציה:** `uploadPremiumActualsCSV`
עמודות: `year, month, branchNumber, startDate, endDate, grossPremium, agentComm, reinsurancePremium, reinsuranceComm`.
תאריכים: `YYYY-MM-DD` (מומלץ) או `DD/MM/YYYY`. כולל ולידציה ברמת שורה (N4).

### 2.2 תביעות ששולמו (ClaimsActuals)
**קובץ:** `Claims_Actuals_YYYY.csv` | **פונקציה:** `uploadClaimsActualsCSV`
עמודות: `year, month, branchNumber, underwritingYear, lossYear, claimsPaidGross, claimsPaidRi`.

### 2.3 הערכות אקטואריות (ActuarialEstimate)
**קובץ:** `Actuarial_Estimates_YYYY.csv` | **פונקציה:** `uploadActuarialCSV`
עמודות: `outstandingClaimsGross/Ri, ibnrGross/Ri, actuarialEstimateGross/Ri`.
> נטען בדרך כלל בסוף רבעון. בחודשי ביניים הריצו `carryForwardActuarial(year, month)` (R14) כדי להעתיק את הערכת הרבעון האחרון ולמנוע איפוס ה-LIC.

### 2.4 הוצאות הנה"כ (AdminExpense)
**פונקציה:** `uploadAdminExpenseCSV` / `saveAdminExpense`
עמודות: `year, month, premiumExpense, claimsExpense`.

**בדיקת שלמות:** `getDataStatus(year, month)` מציג אילו קלטים קיימים לתקופה.

---

## שלב 3 — חישובים (המחזור החודשי)

### 3.1 הדרך המומלצת — מחזור מלא בלחיצה אחת
**פונקציה:** `runFullIfrs17Cycle(year, month)`
מריצה את כל השלבים בסדר הנכון ומחזירה סטטוס לכל שלב + דגל `canClose`:

```
1. runFullUprCalculation       → UPR + DUC + LIC + הקצאת הנה"כ
2. enrichLicWithRaAndDiscount   → Risk Adjustment (R1) + היוון (R2)
3. runFullRollforward           → פיוס LRC + LIC (כולל changeInEstimates אמיתי, R6)
4. runLossComponentRollforward  → Loss Component לחוזים הפסדיים (R3)
5. runReinsuranceAsset          → נכס ביטוח משנה נפרד (R11)
6. reassessOnerousFromActuals   → עדכון הפסדיות מנתוני אמת (R5)
7. runPeriodReconciliation      → בקרות לפני סגירה (R12)
```

**תוצאה:** `"7/7 שלבים הושלמו — התקופה ניתנת לסגירה ✓"` או רשימת שלבים שנכשלו.

### 3.2 הרצה ידנית שלב-אחר-שלב (לבקרה מדוקדקת)
ניתן להריץ כל פונקציה בנפרד באותו סדר. שימושי לאיתור תקלות בנתוני קלט.

### 3.3 הרצה היסטורית גורפת
**פונקציה:** `runHistoricalBatchCalculation` — מריצה את כל התקופות הקיימות ומחזירה רשימת חודשים שנכשלו.

---

## שלב 4 — בדיקות ובקרות (לפני סגירת תקופה)

### 4.1 בקרות עקביות אוטומטיות (R12)
**פונקציה:** `runPeriodReconciliation(year, month)` (רץ אוטומטית בשלב 7 של המחזור).
בודקת ומדווחת ממצאים בחומרות `ERROR / WARNING / INFO`:

| קוד | חומרה | משמעות |
|-----|-------|--------|
| `RI_GT_GROSS` | ERROR | פרמיית ב"מ > ברוטו |
| `LIC_RI_GT_GROSS` | ERROR | חלק ב"מ ב-LIC > ברוטו |
| `UPR_GT_PREMIUM` | ERROR | UPR > פרמיה כתובה |
| `NEGATIVE_VALUE` | ERROR | ערך שלילי חריג |
| `OPENING_MISMATCH` | ERROR | פתיחה(t) ≠ סגירה(t-1) |
| `LR_OUT_OF_RANGE` | WARNING | LR צפוי חריג (<0 או >200%) |
| `LR_DEVIATION` | WARNING | סטיית LR בפועל מול צפוי > 25 נק' |

**כלל סגירה:** התקופה ניתנת לסגירה רק כאשר `errors = 0` (`canClose = true`).
התוצאה נשמרת ב-`ReconciliationRun`; שליפה: `getLatestReconciliation(year, month)`.

### 4.2 בדיקות עסקיות ידניות מומלצות
לאחר שהבקרות עברו, בדקו את הדוחות:

1. **דוח Variance** — `getActualVsTechnicalReport(year, month)`: השוואת רווח טכני מול בפועל לכל ענף. סטיות גדולות → בדקו נתוני תביעות.
2. **Rollforward** — `getRollforwardReport(year, month)`: ודאו שפתיחה + תנועות = סגירה.
3. **Loss Component** — `getLossComponentReport(year, month)`: ודאו שחוזים הפסדיים מזוהים ומופיע LC.
4. **גילוי IFRS17** — `generateIfrs17Disclosure(year, month)`: תמונת LRC + LIC + נכס ב"מ + נטו התחייבות ביטוחית.
5. **תוצאת שירות ביטוחי** — `buildServiceResultReport(year, month)`: מבנה ה-P&L הרשמי (Insurance Revenue / Service Expense / Net reinsurance / Finance) + Combined Ratio.
6. **Audit Trail** — `getCalculationHistory(year)`: מי הריץ, מתי, וסכומים — לתיעוד ביקורת.

### 4.3 רשימת תיוג לסגירת חודש (Checklist)

- [ ] כל ארבעת הקלטים נטענו (`getDataStatus`)
- [ ] בחודש ביניים — בוצע `carryForwardActuarial`
- [ ] `runFullIfrs17Cycle` הסתיים עם 7/7
- [ ] בקרות R12: `errors = 0` (`canClose = true`)
- [ ] Rollforward מתפייס (פתיחה+תנועות=סגירה)
- [ ] Variance נבדק וחריגים מוסברים
- [ ] חוזים הפסדיים מסומנים ב-GIC (`getGicSummary`)
- [ ] דוח גילוי IFRS17 הופק ונשמר
- [ ] Audit Trail מתועד

---

## נספח א' — סדר הפעלה מהיר (TL;DR)

```
חד-פעמי:    npm install → prisma generate → prisma db push
לכל שנה:    טען ענפים → טען תחזית → syncGicsFromParams → saveRaConfig → saveDiscountCurve
לכל חודש:   טען פרמיות+תביעות+אקטואריה+הנה"כ → runFullIfrs17Cycle → בדוק canClose → הפק גילוי
```

## נספח ב' — מיפוי המלצות שיושמו

| מזהה | המלצה | קובץ עיקרי |
|------|-------|-----------|
| R1 | Risk Adjustment | `lib/risk-adjustment.ts`, `risk-adjustment-actions.ts` |
| R2 | היוון תזרימים | `lib/discounting.ts`, `risk-adjustment-actions.ts` |
| R3 | Loss Component | `lib/loss-component.ts`, `loss-component-actions.ts` |
| R4 | זכאות PAA | `lib/paa-eligibility.ts`, `gic-actions.ts` |
| R5 | Onerous מאמת | `gic-actions.ts` (`reassessOnerousFromActuals`) |
| R6 | changeInEstimates | `rollforward-actions.ts` |
| R7 | Earning patterns | `lib/earning-patterns.ts` |
| R9 | דוח גילוי | `disclosure-actions.ts` |
| R10 | Insurance Service Result | `lib/insurance-service-result.ts`, `disclosure-actions.ts` |
| R11 | נכס ביטוח משנה | `reinsurance-asset-actions.ts` |
| R12 | בקרות | `lib/reconciliation.ts`, `reconciliation-actions.ts` |
| R13 | ניקוי קוד מת | `schema.prisma` (Policy סומן deprecated) |
| R14 | אקטואריה רבעונית | `data-actions.ts` (`carryForwardActuarial`) |
| — | אורקסטרציה | `ifrs17-cycle-actions.ts` (`runFullIfrs17Cycle`) |
```
