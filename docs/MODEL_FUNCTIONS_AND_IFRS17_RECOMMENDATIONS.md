# מודל Insurance UPR / IFRS17 — מיפוי פונקציות מלא + המלצות שיפור

> **גרסה:** 1.0 | **תאריך:** יוני 2026 | **סטטוס:** טיוטה לעיון ואישור
> **מטרת המסמך:** (א) לתעד את **כל** הפונקציות הקיימות במודל ואת לוגיקת ה‑IFRS17 שמאחוריהן; (ב) לרכז **רשימת המלצות** להוספת פונקציות ותהליכים לשיפור ההתאמה לתקן IFRS17.
> ✅ **עדכון (יוני 2026): כל 14 ההמלצות (R1–R14) יושמו בקוד לאחר אישור.** ראו `GETTING_STARTED_GUIDE.md` לאופן ההפעלה, ונספח ב' שם למיפוי המלצה→קובץ.
> פעולה נדרשת אחת: להריץ `npx prisma generate && npx prisma db push` כדי להחיל את שינויי הסכמה.

---

## 1. סקירת המודל

המערכת מיישמת חשבונאות ביטוחית לפי **IFRS17 — מודל PAA (Premium Allocation Approach)** ברמת **ענף ביטוח** (כל ענף = קבוצת חוזים לצורך מדידה מפושטת).

זרימת העבודה החודשית:

```
קליטת נתונים (CSV)  →  חישוב UPR + DUC + הקצאת הנה"כ  →  חישוב LIC  →  Rollforward (LRC + LIC)  →  דוחות P&L / Variance / GIC
```

**Stack:** Next.js (App Router) · TypeScript · PostgreSQL (Neon) · Prisma · React/Tailwind · Server Actions · csv‑parser.

**שכבות הקוד:**

| שכבה | תיקייה | תפקיד |
|------|--------|-------|
| מנוע חישוב טהור | `lib/` | פונקציות חישוב דטרמיניסטיות ללא DB |
| לוגיקת שרת (Server Actions) | `app/actions/` | קליטה, חישוב, שמירה ב‑DB ושליפה לדוחות |
| מודל נתונים | `prisma/schema.prisma` | 14 טבלאות |
| ממשק | `app/components/` | תצוגת דוחות, העלאות, דשבורד |

---

## 2. מודל הנתונים (טבלאות Prisma)

| טבלה | תפקיד | מפתח ייחודי |
|------|-------|-------------|
| `Branch` | מאסטר ענפים — שם, קוד קיבוץ, שם קיבוץ | `branchNumber` (PK) |
| `BranchParameters` | פרמטרי תחזית שנתיים לענף: פרמיה צפויה, % עמלת סוכן, % ב"מ, % עמלת ב"מ, % LR צפוי | `(year, branchNumber)` |
| `PremiumActuals` | פרמיות אמת חודשיות + תאריכי כיסוי (startDate/endDate) לחישוב Pro‑Rata | `(year, month, branchNumber)` |
| `ClaimsActuals` | תביעות ששולמו בפועל (ברוטו + חלק ב"מ) לפי שנת חיתום ושנת נזק | `(year, month, branchNumber, underwritingYear, lossYear)` |
| `ActuarialEstimate` | תביעות תלויות + IBNR + הערכה אקטוארית כוללת (ברוטו + ב"מ) | `(year, month, branchNumber, underwritingYear, lossYear)` |
| `AdminExpense` | הוצאות הנה"כ חודשיות מפוצלות: מיוחס‑לפרמיה / מיוחס‑לתביעות | `(year, month)` |
| `UprSnapshot` | תוצר חישוב: UPR, DAC ברוטו, עמלת ב"מ נדחית, DUC נטו לכל ענף/תקופה | `(year, period, periodType, branchNumber)` |
| `AdminExpenseAllocation` | הקצאת הנה"כ לענף + פיצול מוכר/נדחה | `(year, month, branchNumber)` |
| `LicSnapshot` | אגרגציית LIC חודשית: paid + outstanding + IBNR (או הערכה אקטוארית) ברוטו/ב"מ/נטו | `(year, month, branchNumber)` |
| `LrcRollforward` | פיוס פתיחה‑סגירה של LRC (UPR + DUC) — §101‑102 | `(year, month, branchNumber)` |
| `LicRollforward` | פיוס פתיחה‑סגירה של LIC — §103‑105 | `(year, month, branchNumber)` |
| `InsuranceContractGroup` (GIC) | מיפוי (ענף + שנת חיתום) ל‑bucket רווחיות (onerous / not‑onerous / undetermined) | `(branchNumber, underwritingYear)` |
| `CalculationRun` | Audit Trail לכל ריצת חישוב (מי, מתי, סטטוס, סכומים) | `index(year, month)` |
| `Policy` | טבלת פוליסות מקורית — **קוד מת** (הוחלף ב‑PremiumActuals) | `policyNumber` |

---

## 3. מיפוי פונקציות מלא

### 3.1 מנוע חישוב טהור — `lib/`

#### `lib/insurance-logic.ts`

| פונקציה | קלט | פלט | תפקיד / IFRS17 |
|---------|-----|-----|----------------|
| `calculateInsuranceAccounting(params)` | `grossPremium, uprRatio, agentCommPct, reinsurancePct, reinsuranceCommPct, expectedLrPct` | אובייקט חשבונאי מלא: earnedGross, UPR, ב"מ, DAC, עמלת ב"מ נדחית, DUC נטו, תביעות חזויות, רווח חתמי | חישוב טכני (תקציבי/חזוי) של חוזה PAA לרמת ענף. בסיס דוח Actual‑vs‑Technical. |
| `calculateDucForBranch(b)` | פרמיה מקורית, uprValue, עמלות בפועל (עדיפות) או % תקציב (fallback) | `dacGross, deferredRIComm, ducNet, uprRatio, usedActuals` | חישוב DUC (DAC − עמלת ב"מ נדחית) ברמת ענף. תיקון M3 — שימוש בעמלות **בפועל** מ‑PremiumActuals. |
| `allocateAdminExpenses(branches, premiumExpense, claimsExpense)` | מערך ענפים (earnedGross, LR%, uprRatio) + שתי קופות הוצאה | הקצאה לכל ענף + פיצול recognized/deferred | הקצאת הנה"כ לפי cost‑driver (§84): הוצאות‑פרמיה לפי משקל Earned, הוצאות‑תביעות לפי משקל תביעות צפויות; הכרה בדומה לפרמיה. |

#### `lib/insurance-engine.ts`

| פונקציה | תפקיד |
|---------|-------|
| `calculateFinancials(actuals, params, uprSnapshot)` | חישוב P&L משולב חזוי+אמת: Earned, DUC, תביעות טכניות (LR×Earned) מול תביעות בפועל (Incurred = Paid+OS+IBNR), והפקת `technicalProfit` ו‑`actualProfit`. |

#### `lib/actual-logic.ts`

| פונקציה | תפקיד |
|---------|-------|
| `calculateActualPnL(actuals, uprData)` | P&L אמת מלא מבוסס תנועת UPR/DUC פתיחה‑סגירה, תביעות שנתהוו, ותוצאת ב"מ; מחזיר גם `actualLR` בפועל. |

#### `lib/prisma.ts`

| פונקציה | תפקיד |
|---------|-------|
| Prisma Client singleton | מופע משותף של Prisma למניעת ריבוי חיבורים ב‑dev. |

---

### 3.2 קליטת נתונים — `app/actions/`

| פונקציה | קובץ | תפקיד |
|---------|------|-------|
| `uploadBranchParamsCSV(formData)` | `data-actions.ts` | קליטת פרמטרי תחזית שנתיים; dedup לפי (year, branchNumber). |
| `uploadPremiumActualsCSV(formData)` | `data-actions.ts` | קליטת פרמיות אמת + ולידציה (N4) + הכנסה ב‑chunks (S1). |
| `generateMonthlyBudgetActuals(year)` | `data-actions.ts` | יצירת 12 מנות פרמיית תחזית חודשיות מתוך הפרמטרים השנתיים. |
| `uploadClaimsActualsCSV(formData)` | `data-actions.ts` | קליטת תביעות ששולמו (ברוטו + ב"מ) לפי שנת חיתום/נזק. |
| `uploadActuarialCSV(formData)` | `data-actions.ts` | קליטת תביעות תלויות + IBNR + הערכה אקטוארית. |
| `uploadAdminExpenseCSV(formData)` | `admin-expense-actions.ts` | קליטת הוצאות הנה"כ חודשיות. |
| `saveAdminExpense(...)` | `admin-expense-actions.ts` | שמירה/עדכון ידני של רשומת הנה"כ. |
| `uploadBranchesCSV(formData)` | `branch-actions.ts` | קליטת מאסטר ענפים (שם, קיבוץ). |
| `uploadPolicies(formData)` | `upr-actions.ts` | קליטת פוליסות + חישוב UPR מיידי (זרימה ישנה ברמת פוליסה). |
| `uploadPoliciesCSV(formData)` | `upload-policies.ts` | וריאנט קליטת פוליסות. |
| `downloadTemplate(type)` | `template-actions.ts` | הורדת תבנית CSV לכל סוג קלט. |
| `deleteDataByPeriod(...)` | `delete-actions.ts` | מחיקת נתונים לפי תקופה/סוג. |

**מנגנוני עזר ב‑`data-actions.ts`:** `parseCSV` (BOM‑safe), `createManyChunked` (S1 — מניעת timeout), `validateNumeric` / `validateDate` (N4 — ולידציה ברמת שדה ושורה).

---

### 3.3 חישוב ליבה — `upr-actions.ts`

| פונקציה | תפקיד / IFRS17 |
|---------|----------------|
| `runFullUprCalculation(targetDate)` | **מנוע החישוב המרכזי.** מחשב לכל ענף: UPR (Pro‑Rata לפי ימי כיסוי), DUC (מעמלות בפועל), הקצאת הנה"כ, ו‑LIC (paid + outstanding + IBNR, או הערכה אקטוארית כשקיימת). שומר UprSnapshot, AdminExpenseAllocation, LicSnapshot, ורושם CalculationRun (Audit). |
| `runHistoricalBatchCalculation()` | הרצה גורפת לכל צמדי (year, month) הקיימים ב‑PremiumActuals; מחזיר רשימת תקופות שנכשלו (תיקון M4). |
| `getUprFromArchive(year, month)` | שליפת snapshot שמור + הקצאות לדוח ארכיון. |
| `getDetailedUprReport(targetDate)` | דוח UPR מפורט לכל ענף: ימים כוללים/נותרים, יחס UPR, ערך UPR. |
| `parseLocalDate(s)` (פנימי) | פרסור תאריך גמיש (YYYY‑MM‑DD / DD‑MM‑YYYY). |

**נוסחת UPR מרכזית:** `uprRatio = min(remainingDays / totalDays, 1)` ; `UPR = grossPremium × uprRatio` ; `Earned = grossPremium − UPR`.

---

### 3.4 Rollforward (פיוס תנועה) — `rollforward-actions.ts`

| פונקציה | תפקיד / IFRS17 |
|---------|----------------|
| `runLrcRollforward(year, month)` | פיוס LRC (§101‑102): פתיחה (snapshot חודש קודם) + פרמיה כתובה − פרמיה שהורווחה − עלויות רכישה → סגירה. |
| `runLicRollforward(year, month)` | פיוס LIC (§103‑105): פתיחה + Incurred − Paid → סגירה (משוואת מאזן). `changeInEstimates` כיום **placeholder = 0**. |
| `runFullRollforward(year, month)` | הרצת שני הפיוסים יחד. |
| `getRollforwardReport(year, month)` | שליפה + סיכומים כוללים לתצוגה. |
| `getCalculationHistory(year?)` | שליפת Audit Trail (50 ריצות אחרונות). |

---

### 3.5 דוחות P&L ו‑Variance

| פונקציה | קובץ | תפקיד |
|---------|------|-------|
| `getPnLReport(year, month)` | `pl-actions.ts` | P&L תחזית YTD מצטבר מהפרמטרים השנתיים (תחזית טהורה), כולל פוליסות חוצות שנה. |
| `getBranchComparisonReport(branch, periodA, periodB, mode)` | `pl-actionsV.ts` | השוואת שתי תקופות (monthly/cumulative) לענף בודד או לכל הענפים; bulk‑queries; כולל פירוט תביעות וברייקדאון חודשי. |
| `getActualVsTechnicalReport(year, month)` | `variance-actions.ts` | דוח Variance: חישוב טכני (`calculateInsuranceAccounting`) מול בפועל (Incurred), עם variance לכל ענף וסיכום. |

---

### 3.6 GIC — קבוצות חוזי ביטוח — `gic-actions.ts`

| פונקציה | תפקיד / IFRS17 |
|---------|----------------|
| `syncGicsFromParams(year)` | יצירה/עדכון אוטומטי של GIC מפרמטרי הענפים; סיווג onerous לפי LR צפוי > 100% (§16). |
| `getAllGics(year?)` | שליפת כל הקבוצות. |
| `updateGicBucket(branch, uwYear, bucket, label?)` | override ידני של bucket הרווחיות. |
| `getGicSummary(year?)` | ספירת קבוצות לפי bucket. |

---

### 3.7 שירותי מערכת ודוחות גנריים

| פונקציה | קובץ | תפקיד |
|---------|------|-------|
| `getDataStatus(year, month)` | `status-actions.ts` | מצב שלמות הנתונים לתקופה (אילו קלטים קיימים). |
| `getParamYears()` / `getAvailableYears()` | `report-actions.ts` | רשימות שנים דינמיות לבוררי תאריך (תיקון N5). |
| `getRawData(...)` / `getReportData(type, year)` | `report-actions.ts` | שליפת נתוני גלם לכל סוג טבלה לתצוגה. |
| `getAdminExpenseAllocation(year, month)` / `getAdminExpensesByYear(year)` | `admin-expense-actions.ts` | שליפת הקצאות הנה"כ. |
| `getAllBranches()` / `getBranchMap()` | `branch-actions.ts` | מאסטר ענפים למיפוי שם/קיבוץ. |

---

## 4. סטטוס התאמה ל‑IFRS17 (מה כבר קיים)

| רכיב IFRS17 | סטטוס | היכן |
|-------------|-------|------|
| LRC — UPR (Pro‑Rata) | ✅ קיים | `runFullUprCalculation`, `UprSnapshot` |
| DUC / DAC + עמלת ב"מ נדחית | ✅ קיים (מעמלות בפועל) | `calculateDucForBranch` |
| LIC — Outstanding + IBNR + אקטוארי | ✅ קיים | `LicSnapshot` |
| הקצאת הנה"כ (§84 cost‑driver) | ✅ קיים | `allocateAdminExpenses` |
| Rollforward LRC/LIC (§101‑105) | ✅ קיים (חלקי) | `rollforward-actions.ts` |
| GIC + סיווג onerous (§16) | ✅ קיים (בסיסי) | `InsuranceContractGroup` |
| Audit Trail | ✅ קיים | `CalculationRun` |
| Risk Adjustment (RA, §37) | ❌ חסר | — |
| היוון / Time value (§36, §56) | ❌ חסר | — |
| Loss Component לחוזים הפסדיים (§47‑52) | ❌ חסר | — |
| בדיקת זכאות ל‑PAA (§53) | ❌ חסר | — |
| Onerous לפי נתוני אמת (לא רק תקציב) | ⚠️ חלקי | רק LR צפוי > 100% |
| גילויים כמותיים (§97‑132) | ⚠️ חלקי | אין דוח גילוי פורמלי |

---

## 5. רשימת המלצות לשיפור המודל (לפי IFRS17)

> מסומן בעדיפות: 🔴 קריטי · 🟠 חשוב · 🟡 שיפור. כל פריט כולל את הפונקציה/התהליך המוצע.

### 5.1 רכיבי מדידה חסרים בתקן

**R1 🔴 — Risk Adjustment (RA) for non‑financial risk (§37, §81).**
התקן מחייב התאמה בגין סיכון על תזרימי ה‑LIC (וב‑LRC לחוזים הפסדיים). כיום אין RA כלל.
*מוצע:* טבלה `RiskAdjustment` (לפי ענף/קבוצה) + פונקציה `calculateRiskAdjustment(licNet, method, confidenceLevel)` (למשל אחוז קבוע / Cost‑of‑Capital / רמת ביטחון). שילוב ב‑`LicSnapshot.licNet` ובפיוס LIC.

**R2 🔴 — היוון תזרימים (Discounting, §36, §56).**
ל‑LIC עם זנב ארוך (חובה/אחריות) נדרש היוון. כיום הכל undiscounted.
*מוצע:* טבלת `DiscountCurve` (עקום ריבית לפי תקופה/מטבע) + פונקציות `discountCashflows(cashflowsByYear, curve)` ו‑`unwindDiscount(...)` (Insurance finance expense). הוספת `licDiscounted` ו‑`financeExpense` ל‑snapshot ולפיוס.

**R3 🔴 — Loss Component לחוזים הפסדיים (§47‑52).**
GIC מסומן onerous אך אין רכיב הפסד (Loss Component) שנמדד, נצבר ומשוחרר.
*מוצע:* פונקציה `calculateLossComponent(expectedClaims, expectedExpenses, expectedPremium)` שמכירה מיידית בהפסד צפוי, ומנגנון release לפי systematic allocation. טבלה `LossComponentRollforward`.

**R4 🟠 — בדיקת זכאות ל‑PAA (PAA Eligibility, §53‑54).**
PAA מותר רק לחוזים ≤ שנה או כשהתוצאה לא שונה מהותית מ‑GMM.
*מוצע:* פונקציה `assessPaaEligibility(coveragePeriodMonths, variabilityFlag)` המתעדת לכל GIC אם הוא זכאי ל‑PAA, עם דגל וחותמת ביקורת.

### 5.2 דיוק חישובי וזיהוי הפסדיות

**R5 🟠 — Onerous לפי נתוני אמת, לא רק תקציב.**
כיום `isOnerous` נקבע מ‑`expectedLrPct` תקציבי בלבד. חוזה יכול להפוך הפסדי תוך כדי השנה.
*מוצע:* פונקציה `reassessOnerousFromActuals(branch, uwYear)` שמשווה LIC + עלויות צפויות מול LRC נותר ומעדכנת bucket אוטומטית בכל ריצה חודשית (§48).

**R6 🟠 — מימוש `changeInEstimates` בפיוס LIC.**
כיום ה‑experience adjustment הוא placeholder = 0, כך שהפיוס לא מפריד בין תשלומים בפועל לשינוי הערכות.
*מוצע:* חישוב `changeInEstimates = closingEstimate − (openingEstimate − paidInPeriod)` והצגתו בנפרד בדוח התנועה (§104).

**R7 🟠 — UPR מבוסס exposure ולא רק Pro‑Rata לוח‑שנה.**
לענפים עם חשיפה לא‑אחידה (עונתיות), Pro‑Rata קלנדרי מטה את ה‑Earned.
*מוצע:* תמיכה ב‑earning pattern (24ths / עקומת חשיפה) דרך פרמטר `earningPattern` ב‑BranchParameters ופונקציה `calculateUprByPattern(...)`.

**R8 🟡 — גרנולריות חודשית לפרמטרים (M1).**
`BranchParameters` הוא שורה אחת לשנה; שינוי תנאי ב"מ באמצע שנה אינו נתפס.
*מוצע:* `effectiveFrom`/`effectiveTo` או טבלת overrides חודשית.

### 5.3 דיווח, גילוי ובקרה

**R9 🔴 — דוח גילוי IFRS17 פורמלי (§97‑132).**
*מוצע:* פונקציה `generateIfrs17Disclosure(year, month)` שמרכזת את טבלאות התנועה (LRC/LIC), פירוק לפי measurement components (PV cashflows, RA, CSM/LC), ויחס LR — בפורמט המתאים לביאורי הדוחות הכספיים.

**R10 🟠 — Insurance Service Result בדוח רווח‑והפסד (§80‑85).**
*מוצע:* פונקציה `buildInsuranceServiceResult(year, month)` המפיקה: Insurance Revenue, Insurance Service Expense, Net expense from reinsurance, ו‑Insurance finance income/expenses — מבנה ה‑P&L הרשמי של התקן.

**R11 🟠 — טיפול נפרד בביטוח משנה כנכס (§60‑70).**
כיום ב"מ מטופל פרופורציונלי בתוך החישוב הגולמי. התקן דורש מדידה נפרדת של נכס reinsurance held.
*מוצע:* snapshot נפרד `ReinsuranceAsset` עם רכיב ה‑recovery והתאמת loss‑recovery component מול חוזים הפסדיים (§66).

**R12 🟡 — Validation עסקי וקרוס‑בדיקות.**
מעבר לוולידציה ברמת שדה (N4), להוסיף בדיקות עקביות: סכום ב"מ ≤ ברוטו, LR סביר, פתיחה(t) = סגירה(t‑1).
*מוצע:* פונקציה `runReconciliationChecks(year, month)` שמחזירה רשימת חריגות לפני סגירת תקופה.

**R13 🟡 — ניקוי קוד מת (N1).**
טבלת `Policy` ו‑`uploadPolicies` אינן בשימוש בזרימה הפעילה. לסמן deprecated ולהסיר לאחר אישור.

**R14 🟡 — אינטרפולציה/הקפאה של נתוני אקטואריה רבעוניים (N3).**
בחודשים שאינם סוף‑רבעון נתוני האקטואריה אפסיים ומטים את ה‑Variance.
*מוצע:* `carryForwardActuarial(...)` שמעביר את הערכת הרבעון האחרון, או הגבלת דוח Variance לסוף רבעון.

### 5.4 טבלת עדיפויות מוצעת

| מזהה | המלצה | עדיפות | מאמץ |
|------|-------|--------|------|
| R1 | Risk Adjustment | 🔴 | בינוני |
| R2 | היוון תזרימים | 🔴 | גבוה |
| R3 | Loss Component | 🔴 | גבוה |
| R9 | דוח גילוי IFRS17 | 🔴 | בינוני |
| R4 | PAA Eligibility | 🟠 | נמוך |
| R5 | Onerous מנתוני אמת | 🟠 | בינוני |
| R6 | changeInEstimates אמיתי | 🟠 | נמוך |
| R7 | Earning pattern | 🟠 | בינוני |
| R10 | Insurance Service Result | 🟠 | בינוני |
| R11 | נכס ביטוח משנה נפרד | 🟠 | גבוה |
| R8 | פרמטרים חודשיים | 🟡 | בינוני |
| R12 | Reconciliation checks | 🟡 | נמוך |
| R13 | ניקוי קוד מת | 🟡 | נמוך |
| R14 | אקטואריה רבעונית | 🟡 | נמוך |

---

## 6. צעדים מומלצים להמשך

1. **אישור** המסמך ובחירת ההמלצות ליישום (ממליץ להתחיל ב‑R6, R4, R12 — מאמץ נמוך/השפעה מיידית, ואז R1/R9).
2. הגדרת sprint עם תתי‑משימות מקוד לכל המלצה מאושרת.
3. הוספת בדיקות יחידה לכל פונקציית חישוב חדשה (RA, discounting, loss component).
4. עדכון `SPEC.md` ו‑`business_logic.md` בהתאם לשינויים המאושרים.

> **תזכורת:** אין לבצע שינויים בקוד עד לאישור מפורש.
