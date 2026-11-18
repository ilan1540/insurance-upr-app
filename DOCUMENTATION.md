# תיעוד מערכת Insurance UPR App

> **גרסה:** 1.0 | **תאריך:** אפריל 2026 | **שפה:** Next.js 15 + TypeScript + PostgreSQL

---

## 1. מטרות הפרוייקט

### מה המערכת עושה?

מערכת **Insurance UPR App** היא אפליקציית ווב לניהול חשבונאות ביטוחית תחת תקן **IFRS17 (PAA)**, המיועדת לחברות ביטוח המנהלות מספר ענפי ביטוח (סניפים).

### יעדי המערכת:

| יעד | תיאור |
|-----|-------|
| **UPR – Unearned Premium Reserve** | חישוב פרמיות לא מורווחות על בסיס יחסי (Pro-Rata) לתאריך חיתוך חודשי |
| **DUC – Deferred Acquisition Costs** | מעקב אחר עמלות רכישה נדחות של סוכנים, מותאם ל-IFRS17 |
| **ניתוח רווח והפסד** | דוחות P&L ותחזיות לפי ענף, עם סימולציות What-If |
| **הקצאת הוצאות תקורה** | חלוקת הוצאות ניהוליות לפי ענפים בהתאם ל-IFRS17 |
| **ארכיון היסטורי** | שמירת תמונות UPR חודשיות לצרכי ביקורת ודיווח |
| **ייבוא נתונים** | עיבוד קבצי CSV עבור פרמיות, תביעות, רזרבות אקטואריות ותקציב |

### קהל יעד:
חשבים, אקטוארים ומנהלי כספים בחברות ביטוח.

---

## 2. תרשים זרימה

### מחזור עבודה חודשי

```
┌─────────────────────────────────────────────────────────────────────────┐
│                          שלב 1: הגדרות ראשוניות                          │
│                                                                         │
│  ייבוא סניפים (CSV)  →  Branch table                                    │
│  ייבוא תקציב שנתי (CSV)  →  BranchParameters table                      │
│  יצירה אוטומטית של תקציב חודשי  →  12 רשומות חודשיות                   │
└─────────────────────────────────────────────────────────────────────────┘
                                    ↓
┌─────────────────────────────────────────────────────────────────────────┐
│                         שלב 2: קלט נתונים חודשי                          │
│                                                                         │
│  פרמיות בפועל (עם תאריכי כיסוי)  →  PremiumActuals                     │
│  תביעות ששולמו (שנת חיתוך / שנת נזק)  →  ClaimsActuals                 │
│  רזרבות אקטואריות (IBNR + עומד לתשלום)  →  ActuarialEstimate           │
│  הוצאות ניהול  →  AdminExpense                                          │
└─────────────────────────────────────────────────────────────────────────┘
                                    ↓
┌─────────────────────────────────────────────────────────────────────────┐
│                        שלב 3: חישובים אוטומטיים                          │
│                                                                         │
│  ┌─ חישוב UPR (runFullUprCalculation):                                  │
│  │   UPR ratio = (תאריך סיום - תאריך חיתוך) / (תאריך סיום - תאריך התחלה) │
│  │   UPR = פרמיה גולמית × UPR ratio                                    │
│  │   פרמיה מורווחת = פרמיה גולמית - UPR                                │
│  │   DAC = עמלת סוכן × UPR ratio                                       │
│  │   DUC נטו = DAC - עמלת ביטוח משנה נדחה                              │
│  │   → שמירה ב-UprSnapshot                                              │
│  │                                                                      │
│  └─ הקצאת הוצאות (allocateAdminExpenses):                               │
│      הוצאות פרמיה: לפי משקל פרמיה מורווחת לסניף                        │
│      הוצאות תביעות: לפי משקל תביעות צפויות                             │
│      פיצול: מוכר (earned%) מול נדחה (UPR%)                              │
│      → שמירה ב-AdminExpenseAllocation                                   │
└─────────────────────────────────────────────────────────────────────────┘
                                    ↓
┌─────────────────────────────────────────────────────────────────────────┐
│                            שלב 4: דיווח וניתוח                           │
│                                                                         │
│  דוח P&L (תחזית + בפועל)  →  /pnl                                      │
│  ארכיון UPR היסטורי  →  /upr                                            │
│  דוח P&L אנכי לפי סניף  →  /branch                                     │
│  מרכז נתונים גולמיים  →  /report                                        │
└─────────────────────────────────────────────────────────────────────────┘
```

### דיאגרמת מסד הנתונים

```
Branch (סניפים)
  └── BranchParameters (תקציב שנתי לסניף)
        └── UprSnapshot (תמונה חודשית מחושבת)

PremiumActuals (פרמיות בפועל) ──────┐
ClaimsActuals (תביעות בפועל)  ──────┤──→ UPR Calculation ──→ UprSnapshot
ActuarialEstimate (רזרבות)    ──────┘
AdminExpense (הוצאות ניהול) ─────────────────────→ AdminExpenseAllocation
```

---

## 3. מבנה הקומפוננטות

### מבנה הדפים (App Router)

```
app/
├── page.tsx                   → דף הבית (DashboardHome)
├── layout.tsx                 → Layout כולל Navbar
├── upload/page.tsx            → מרכז ייבוא נתונים (OperationsDashboard)
├── report/page.tsx            → מרכז נתונים גולמיים (ReportsManager)
├── upr/page.tsx               → ארכיון ודוח UPR מפורט
├── upr/operations/page.tsx    → הפעלת חישוב UPR (UprManager)
├── pnl/page.tsx               → סימולטור P&L (PnLReportView)
├── branch/page.tsx            → P&L אנכי לפי סניף (BranchVerticalPnl)
├── guide/page.tsx             → מדריך תהליכים (WorkflowGuide)
└── about/page.tsx             → אודות המערכת (AboutSystem)
```

### היררכיית הקומפוננטות

```
layout.tsx
├── Navbar.tsx
│
├── DashboardHome.tsx                    [דף הבית]
│   └── כרטיסי ניווט לכל הסעיפים
│
├── OperationsDashboard.tsx              [/upload]
│   ├── לחצני ייבוא CSV (6 סוגים)
│   ├── הורדת תבניות CSV
│   ├── יצירת תקציב חודשי אוטומטי
│   └── AdminExpenseInput.tsx (קלט הוצאות ניהול)
│
├── ReportsManager.tsx                   [/report]
│   └── 6 טאבים: תקציב, פרמיות, תביעות, אקטוארי, הוצאות, סניפים
│
├── UprArchive.tsx + UprDetailedReport.tsx  [/upr]
│   └── ארכיון חודשי ודוח פירוטי
│
├── UprManager.tsx                       [/upr/operations]
│   ├── בחירת תאריך חיתוך
│   ├── הפעלת חישוב UPR
│   └── הפעלת חישוב היסטורי אצווה
│
├── PnLReportView.tsx                    [/pnl]
│   ├── 5 סרגלי סימולציה (What-If)
│   └── טבלת P&L לפי ענף
│
├── BranchVerticalPnl.tsx                [/branch]
│   ├── השוואת תקופות (חודשי / מצטבר)
│   └── פירוט P&L אנכי לסניף
│
├── WorkflowGuide.tsx                    [/guide]
└── AboutSystem.tsx                      [/about]
```

### טבלת קומפוננטות מפורטת

| קומפוננטה | מסלול | מה היא עושה | Server Actions |
|-----------|-------|-------------|----------------|
| `DashboardHome` | `/` | לוח בקרה עם ניווט | - |
| `Navbar` | כולל | ניווט עליון | - |
| `OperationsDashboard` | `/upload` | ייבוא קבצים + יצירת תקציב | data-actions, branch-actions, admin-expense-actions, template-actions |
| `ReportsManager` | `/report` | צפייה בנתונים גולמיים | report-actions, branch-actions |
| `UprManager` | `/upr/operations` | הפעלת חישוב UPR | upr-actions |
| `UprArchive` | `/upr` | ארכיון UPR היסטורי | upr-actions |
| `UprDetailedReport` | `/upr` | דוח UPR מפורט לרמת פוליסה | upr-actions, report-actions |
| `PnLReportView` | `/pnl` | דוח P&L + סימולציות | pl-actions, report-actions |
| `BranchVerticalPnl` | `/branch` | P&L אנכי לפי סניף | pl-actionsV, branch-actions, report-actions |
| `AdminExpenseInput` | `/upload` | הזנת הוצאות ניהול | admin-expense-actions |
| `WorkflowGuide` | `/guide` | תיעוד מובנה | - |
| `AboutSystem` | `/about` | אודות + מדריך שדות | - |

---

## 4. תהליכים (Server Actions) ומטרתם

כל Server Actions נמצאים בתיקייה [app/actions/](app/actions/) עם `"use server"`.

---

### [branch-actions.ts](app/actions/branch-actions.ts)
> **מטרה:** ניהול רשימת הסניפים (ענפי ביטוח)

| פונקציה | מטרה |
|---------|-------|
| `uploadBranchesCSV(formData)` | ייבוא רשימת סניפים מ-CSV |
| `getAllBranches()` | שליפת כל הסניפים |
| `getBranchMap()` | שליפת סניפים כ-Map לשימוש מהיר |

**בשימוש ב:** ReportsManager, BranchVerticalPnl, OperationsDashboard

---

### [data-actions.ts](app/actions/data-actions.ts)
> **מטרה:** ייבוא כל הנתונים הפיננסיים הגולמיים

| פונקציה | מטרה |
|---------|-------|
| `uploadBranchParamsCSV(formData)` | ייבוא תקציב שנתי לפי ענף (פרמיה, עמלות, LR) |
| `uploadPremiumActualsCSV(formData)` | ייבוא פרמיות בפועל עם תאריכי כיסוי |
| `generateMonthlyBudgetActuals(year)` | פיצול תקציב שנתי ל-12 חודשים שווים אוטומטית |
| `uploadClaimsActualsCSV(formData)` | ייבוא תביעות ששולמו (שנת חיתוך + שנת נזק) |
| `uploadActuarialCSV(formData)` | ייבוא רזרבות אקטואריות (עומד לתשלום + IBNR) |

**בשימוש ב:** OperationsDashboard

---

### [upr-actions.ts](app/actions/upr-actions.ts)
> **מטרה:** לב המערכת – חישוב UPR/DUC וארכיון

| פונקציה | מטרה |
|---------|-------|
| `runFullUprCalculation(targetDate)` | **חישוב ראשי:** UPR + DUC + הקצאת הוצאות לתאריך נתון |
| `runHistoricalBatchCalculation()` | חישוב מחדש של כל התקופות ההיסטוריות |
| `getUprFromArchive(year, month)` | שליפת UprSnapshot מהארכיון |
| `getDetailedUprReport(targetDate)` | דוח UPR פירוטי ברמת פוליסה |
| `uploadPolicies(formData)` | *(ירושה)* ייבוא פוליסות – **לא בשימוש פעיל** |

**בשימוש ב:** UprManager, UprArchive, UprDetailedReport

---

### [pl-actions.ts](app/actions/pl-actions.ts)
> **מטרה:** דוח רווח והפסד שנתי מצטבר (YTD) מבוסס תחזית

| פונקציה | מטרה |
|---------|-------|
| `getPnLReport(year, month)` | חישוב P&L תחזיתי YTD לפי ענף ועמוד |

**לוגיקה:** טוען BranchParameters → מחשב הקצאה חודשית → מפעיל פרמיה מורווחת (1-UPR) → מחיל עמלות, ביטוח משנה ותביעות → מחזיר שורות לפי ענף.

**בשימוש ב:** PnLReportView

---

### [pl-actionsV.ts](app/actions/pl-actionsV.ts)
> **מטרה:** P&L אנכי – השוואת תקופות לפי סניף

| פונקציה | מטרה |
|---------|-------|
| `getBranchComparisonReport(branchNumber, periodA, periodB, mode)` | השוואת שתי תקופות (חודשי / מצטבר) עם פירוט תביעות ו-DUC |

**בשימוש ב:** BranchVerticalPnl

---

### [admin-expense-actions.ts](app/actions/admin-expense-actions.ts)
> **מטרה:** ניהול והקצאת הוצאות ניהוליות

| פונקציה | מטרה |
|---------|-------|
| `uploadAdminExpenseCSV(formData)` | ייבוא הוצאות ניהול מ-CSV |
| `saveAdminExpense(year, month, expenses)` | שמירה / עדכון הוצאות ניהול חודשיות |
| `getAdminExpenseAllocation(year, month)` | שליפת הוצאות מוקצות לפי ענף |
| `getAdminExpensesByYear(year)` | שליפת כל ההוצאות לשנה – **לא בשימוש** |

**בשימוש ב:** OperationsDashboard, AdminExpenseInput

---

### [report-actions.ts](app/actions/report-actions.ts)
> **מטרה:** שליפת נתונים גולמיים לתצוגה

| פונקציה | מטרה |
|---------|-------|
| `getParamYears()` | שנים עם נתוני BranchParameters |
| `getAvailableYears()` | שנים עם נתונים בכל טבלה |
| `getRawData(reportType, filters)` | שליפת נתונים גולמיים לפי סוג |
| `getReportData(tabType, year)` | נתונים מעוצבים לטאבים ב-ReportsManager |

**בשימוש ב:** ReportsManager, BranchVerticalPnl, PnLReportView, UprDetailedReport

---

### [template-actions.ts](app/actions/template-actions.ts)
> **מטרה:** יצירת קובצי תבנית CSV להורדה

| פונקציה | מטרה |
|---------|-------|
| `downloadTemplate(type)` | יוצר CSV תבנית ריק (7 סוגים) |

**סוגי תבניות:** `params`, `premium-actuals`, `claims-actuals`, `actuarial`, `admin-expense`, `branches`, `budget-monthly-update`

**בשימוש ב:** OperationsDashboard

---

### [status-actions.ts](app/actions/status-actions.ts)
> **מטרה:** בדיקת מוכנות נתונים לחישוב

| פונקציה | מטרה |
|---------|-------|
| `getDataStatus(year, month)` | מחזיר flags: `hasPolicies`, `hasParams`, `hasPremiums`, `hasClaims`, `isReadyForReport` |

---

### פונקציות ספריה (lib/)

| קובץ | פונקציה | מטרה |
|------|---------|-------|
| [lib/prisma.ts](lib/prisma.ts) | `prisma` | Prisma client singleton עם PostgreSQL adapter |
| [lib/insurance-logic.ts](lib/insurance-logic.ts) | `calculateInsuranceAccounting()` | **לוגיקה ראשית** – UPR, DUC, עמלות, רווח חיתוב |
| [lib/insurance-logic.ts](lib/insurance-logic.ts) | `calculateDucForBranch()` | DUC נטו לרמת ענף (DAC + עמלת ביטוח משנה) |
| [lib/insurance-logic.ts](lib/insurance-logic.ts) | `allocateAdminExpenses()` | הקצאת הוצאות ניהול לפי IFRS17 |

---

## 5. בדיקת קבצים ותהליכים ללא שימוש

### קבצים שאינם בשימוש פעיל

| קובץ | בעיה | המלצה |
|------|------|--------|
| [app/actions/delete-actions.ts](app/actions/delete-actions.ts) | `deleteDataByPeriod()` מוגדר אך אינו מיובא או נקרא בשום מקום | למחוק או לחבר לממשק |
| [app/actions/variance-actions.ts](app/actions/variance-actions.ts) | `getActualVsTechnicalReport()` מוגדר אך אינו בשימוש | לחבר לדוח השוואה או למחוק |
| [app/actions/upload-policies.ts](app/actions/upload-policies.ts) | `uploadPoliciesCSV()` – ירושה, הוחלף ע"י PremiumActuals | לארכב ולמחוק |
| [lib/insurance-engine.ts](lib/insurance-engine.ts) | `calculateFinancials()` – לא מיובא בשום מקום | הוחלף ע"י `insurance-logic.ts`, ניתן למחוק |
| [lib/actual-logic.ts](lib/actual-logic.ts) | `calculateActualPnL()` – לא מיובא בשום מקום | הוחלף ע"י `insurance-logic.ts`, ניתן למחוק |

### פונקציות לא פעילות בתוך קבצים פעילים

| קובץ | פונקציה | הערה |
|------|---------|------|
| [app/actions/admin-expense-actions.ts](app/actions/admin-expense-actions.ts) | `getAdminExpensesByYear()` | אינה נקראת משום קומפוננטה |
| [app/actions/upr-actions.ts](app/actions/upr-actions.ts) | `uploadPolicies()` | ירושה, אינה נקראת |

### תיקיית ארכיון ישנה

| תיקייה | תוכן |
|---------|------|
| `/old-Todel/` | קבצי actions ישנים: `actions.ts`, `actuals-actions.ts`, `actuarial-actions.ts`, `params-actions.ts`, `old-calculate-upr.ts` – **ניתן למחוק לחלוטין** |

---

## 6. הצעות לשיפור

> **הצעות בלבד – אין שינוי קוד:**

### שיפורים קריטיים

1. **מחיקת קבצים ישנים** – התיקייה `old-Todel/` והקבצים `lib/insurance-engine.ts`, `lib/actual-logic.ts`, `app/actions/upload-policies.ts` אינם בשימוש. הסרתם תצמצם בלבול.

2. **חיבור `delete-actions.ts`** – הפונקציה `deleteDataByPeriod()` קיימת ולא נחשפת לממשק. ניתן להוסיף כפתורי מחיקה לפי תקופה ב-`OperationsDashboard` לשיפור ניהול הנתונים.

3. **חיבור `variance-actions.ts`** – הדוח "בפועל מול טכני" כבר ממומש אך לא מוצג. ניתן להוסיף טאב נוסף ל-`ReportsManager` ולחשוף אותו.

### שיפורים בנוחות שימוש

4. **`status-actions.ts`** – ניתן להשתמש ב-`getDataStatus()` ב-`OperationsDashboard` כדי להציג מחוון ירוק/אדום למוכנות הנתונים לפני הפעלת החישוב.

5. **`getAdminExpensesByYear()`** – ניתן לחשוף את הפונקציה בטאב "הוצאות" ב-`ReportsManager` לצפייה שנתית.

6. **אחידות בסוגי דוחות** – `pl-actions.ts` מחשב P&L תחזיתי בלבד. שקול להוסיף שכבת "בפועל" שתשלוף `UprSnapshot` מהארכיון ותשווה מול התחזית.

### שיפורים ארכיטקטוניים

7. **טיפול בשגיאות** – רוב ה-Server Actions אינם מחזירים שגיאות מובנות. הוספת `{ success, error, data }` אחיד לכל Action תשפר את חוויית המשתמש.

8. **Validation** – כדאי להוסיף ולידציה ל-CSV בצד הלקוח (בדיקת כותרות עמודות, טיפוסים) לפני שליחה לשרת.

9. **Loading States** – חלק מהקומפוננטות משתמשות ב-`loading: boolean` גנרי. Skeleton loaders יחסכו בחוויית משתמש.

---

## 7. Stack טכנולוגי

| שכבה | טכנולוגיה | גרסה |
|------|-----------|------|
| Framework | Next.js App Router | 15.x |
| UI | React | 19.x |
| Typing | TypeScript | 5.x |
| Styling | Tailwind CSS | 4.x |
| ORM | Prisma | 7.x |
| Database | PostgreSQL (Neon) | 16 |
| CSV Parsing | `csv-parse` | - |
| Deployment | Vercel | - |

---

*קובץ זה נוצר אוטומטית על ידי ניתוח קוד. לעדכון – הריצו סריקה חדשה.*
