# מבנה הפרויקט — Insurance UPR App

> מערכת לניהול רזרבות פרמיה לא מורווחת (UPR) וניתוח P&L לחברת ביטוח רב-סניפית.  
> Next.js 16 · TypeScript · PostgreSQL · Prisma 7 · Tailwind CSS 4 · RTL / עברית

---

## תוכן עניינים

1. [מבנה הקומפוננטות](#מבנה-הקומפוננטות)
2. [מבנה מסד הנתונים](#מבנה-מסד-הנתונים)
3. [דפי הניתוב (Pages)](#דפי-הניתוב)
4. [Server Actions](#server-actions)
5. [לוגיקת עסק (lib/)](#לוגיקת-עסק)

---

## מבנה הקומפוננטות

```
app/components/
│
├── Layout & Navigation
│   ├── Navbar.tsx
│   └── DashboardHome.tsx
│
├── Data Input
│   ├── OperationsDashboard.tsx
│   └── BranchParamsUpload.tsx
│
├── UPR
│   ├── UprManager.tsx
│   ├── UprArchive.tsx
│   └── UprDetailedReport.tsx
│
├── P&L & Reports
│   ├── PnLReportView.tsx
│   ├── ActualVsTechnicalReport.tsx
│   ├── BranchVerticalPnl.tsx
│   ├── ReportsManager.tsx
│   └── ReportsCenter.tsx
│
└── Documentation
    └── AboutSystem.tsx
```

### תיאור מפורט של כל קומפוננטה

---

#### `Navbar.tsx`
סרגל ניווט עליון (sticky). מכיל קישורים לכל מקטעי המערכת.

| קישור | נתיב |
|-------|-------|
| קליטת קבצים | `/upload` |
| דוחות קלט | `/report` |
| דוחות UPR | `/upr` |
| סימולטור PNL | `/pnl` |
| ניתוח ענפי | `/branch` |
| אודות | `/about` |

**State:** `open: boolean` — פתיחת תפריט המובייל  
**Dependencies:** `lucide-react` (Menu, X icons)

---

#### `DashboardHome.tsx`
דף הבית — לוח מחוונים עם 4 כרטיסי ניווט ראשיים.

| כרטיס | נתיב | צבע |
|-------|-------|------|
| ניהול קלט נתונים | `/operations` | indigo |
| מנוע חישובים (UPR) | `/calculations` | amber |
| מרכז דוחות (P&L) | `/reports` | emerald |
| אודות המערכת | `/about` | slate |

---

#### `OperationsDashboard.tsx`
מרכז קליטת קבצי CSV. מציג 3 כרטיסי עלאה + הורדת תבניות.

**סוגי עלאה:**
- `params` — פרמטרים שנתיים לפי ענף
- `actuals` — נתוני ביצוע חודשיים
- `actuarial` — הערכות אקטואריות

**State:** `status`, `loadingType`  
**Server Actions:** `uploadBranchParamsCSV`, `uploadActualsCSV`, `uploadActuarialCSV`, `downloadTemplate`

---

#### `BranchParamsUpload.tsx`
טופס ייעודי להעלאת פרמטרים שנתיים לפי ענף.

**Props/State:** `file`, `year`, `loading`, `status`  
**Server Action:** `uploadBranchParamsCSV` (מ-`params-actions.ts`)

---

#### `UprManager.tsx`
ממשק לחישוב UPR — חישוב בודד לתאריך או batch היסטורי.

**State:** `targetDate`, `loading`, `data`  
**Server Actions:** `runFullUprCalculation(targetDate)`, `runHistoricalBatchCalculation()`

**פלט:** מספר פוליסות, סך UPR, פירוט לפי ענף

---

#### `UprArchive.tsx`
צפייה בארכיון UPR לפי שנה וחודש.

**State:** `year`, `month`, `loading`, `archiveData`  
**Server Action:** `getUprFromArchive(year, month)`

---

#### `UprDetailedReport.tsx`
דוח UPR ברמת פוליסה בודדת — מציג מספר פוליסה, פרמיה, ימים שנותרו, ערך UPR.

**State:** `targetDate`, `loading`, `rows`  
**Server Action:** `getDetailedUprReport(targetDate)`

---

#### `PnLReportView.tsx`
דוח P&L טכני (חזוי) לפי שנה וחודש.

**State:** `year`, `month`, `loading`, `data`  
**Server Action:** `getPnLReport(year, month)`

**עמודות:** פרמיה נצברת, עמלות, RI, תביעות חזויות, רווח חתמי

---

#### `ActualVsTechnicalReport.tsx`
ניתוח Variance — השוואה בין רווח חזוי לרווח בפועל לפי ענף.

**עמודות:** ענף | רווח חזוי (Technical) | רווח בפועל (Actual) | סטייה (Variance)

---

#### `BranchVerticalPnl.tsx`
P&L אנכי לסניף — השוואה בין שתי תקופות (Period A vs. Period B).

**State:** `branch`, `periodA`, `periodB`, `report`  
**Server Action:** `getBranchComparisonReport(branch, periodA, periodB)`

**שורות P&L:**

| שורה | מפתח | סוג |
|------|-------|-----|
| פרמיה ברוטו (מזומן) | `grossPremium` | plus |
| UPR — תחילת תקופה | `uprOpening` | plus |
| UPR — סוף תקופה | `uprClosing` | minus |
| פרמיה שהורווחה | `earnedPremium` | **total** |
| עמלות סוכנים | `agentComm` | minus |
| ביטוח משנה (נטו עמלה) | `reinsuranceCost` | minus |
| תביעות חזויות (לפי LR) | `expectedClaims` | minus |
| **רווח חתמי נקי** | `profit` | **total / highlight** |

---

#### `ReportsManager.tsx`
צפייה בנתונים גולמיים מה-DB. ממשק לשוניות עם פילטרים.

**State:** `activeTab`, `selectedYear`, `data`, `loading`, `searchTerm`  
**Server Action:** `getReportData(type, year)`

**לשוניות:** `params` | `actuals` | `actuarial`

---

#### `ReportsCenter.tsx`
גרסה חלופית של מרכז הדוחות עם פילטרים מורחבים (שנה, חודש, ענף).

**Server Actions:** `getRawData(type, filters)`, `getAvailableYears()`

---

#### `AboutSystem.tsx`
דף תיעוד המערכת — מונחים, הגדרות שדות, ארכיטקטורה טכנית.

---

## מבנה מסד הנתונים

מסד נתונים: **PostgreSQL**  
ORM: **Prisma 7**  
מיקום Schema: `prisma/schema.prisma`

---

### `Policy` — פוליסות ביטוח

| שדה | טיפוס | הגבלות | תיאור |
|-----|--------|---------|-------|
| `id` | `String` | `@id @default(cuid())` | מזהה ייחודי |
| `policyNumber` | `String` | `@unique` | מספר פוליסה |
| `branchNumber` | `Int` | — | מספר ענף |
| `premiumAmount` | `Decimal(15,2)` | — | סכום פרמיה |
| `startDate` | `DateTime` | — | תחילת כיסוי |
| `endDate` | `DateTime` | — | סיום כיסוי |
| `status` | `String` | `@default("ACTIVE")` | סטטוס פוליסה |
| `createdAt` | `DateTime` | `@default(now())` | תאריך יצירה |

---

### `UprSnapshot` — עתודות UPR לפי ענף/תקופה

| שדה | טיפוס | הגבלות | תיאור |
|-----|--------|---------|-------|
| `id` | `String` | `@id @default(cuid())` | מזהה ייחודי |
| `year` | `Int` | — | שנה |
| `period` | `Int` | — | תקופה (מספר חודש) |
| `periodType` | `String` | `@default("MONTHLY")` | סוג תקופה |
| `branchNumber` | `Int` | — | מספר ענף |
| `uprValue` | `Decimal(15,2)` | — | ערך ה-UPR |
| `calculatedAt` | `DateTime` | `@default(now())` | תאריך חישוב |

**Unique Constraint:** `(year, period, periodType, branchNumber)`

---

### `BranchParameters` — פרמטרים שנתיים לפי ענף

| שדה | טיפוס | הגבלות | תיאור |
|-----|--------|---------|-------|
| `id` | `String` | `@id @default(cuid())` | מזהה ייחודי |
| `year` | `Int` | — | שנה |
| `branchNumber` | `Int` | — | מספר ענף |
| `expectedGrossPremium` | `Float` | — | פרמיה צפויה לשנה |
| `agentCommPct` | `Float` | — | % עמלת סוכן |
| `reinsurancePct` | `Float` | — | % ביטוח משנה |
| `reinsuranceCommPct` | `Float` | — | % עמלה ממבטח משנה |
| `expectedLrPct` | `Float` | — | % Loss Ratio צפוי |
| `updatedAt` | `DateTime` | `@updatedAt` | עדכון אחרון |

**Unique Constraint:** `(year, branchNumber)`

---

### `BranchActuals` — נתוני ביצוע חודשיים

| שדה | טיפוס | הגבלות | תיאור |
|-----|--------|---------|-------|
| `id` | `String` | `@id @default(cuid())` | מזהה ייחודי |
| `year` | `Int` | — | שנה |
| `month` | `Int` | — | חודש |
| `branchNumber` | `Int` | — | מספר ענף |
| `grossPremium` | `Float` | — | פרמיה ברוטו |
| `agentComm` | `Float` | — | עמלת סוכן |
| `reinsurancePremium` | `Float` | — | פרמיה למבטח משנה |
| `reinsuranceComm` | `Float` | — | עמלה ממבטח משנה |
| `claimsPaidGross` | `Float` | — | תביעות ששולמו ברוטו |
| `claimsPaidRi` | `Float` | — | חלק מבטח משנה בתביעות ששולמו |
| `updatedAt` | `DateTime` | `@updatedAt` | עדכון אחרון |

**Unique Constraint:** `(year, month, branchNumber)`

---

### `ActuarialEstimate` — הערכות אקטואריות

| שדה | טיפוס | הגבלות | תיאור |
|-----|--------|---------|-------|
| `id` | `String` | `@id @default(cuid())` | מזהה ייחודי |
| `year` | `Int` | — | שנה |
| `month` | `Int` | — | חודש |
| `branchNumber` | `Int` | — | מספר ענף |
| `outstandingClaimsGross` | `Float` | — | תביעות תלויות ברוטו |
| `outstandingClaimsRi` | `Float` | — | חלק מבטח משנה בתביעות תלויות |
| `ibnrGross` | `Float` | — | IBNR ברוטו |
| `ibnrRi` | `Float` | — | IBNR — חלק מבטח משנה |
| `updatedAt` | `DateTime` | `@updatedAt` | עדכון אחרון |

**Unique Constraint:** `(year, month, branchNumber)`

---

### דיאגרמת קשרי טבלאות (ERD)

```
Policy
  └─ (branchNumber) ──────────────────────────────────────┐
                                                           │
UprSnapshot                                                │
  └─ (year, period, branchNumber) ←── חישוב מ-Policy ──── ┤
                                                           │
BranchParameters                                           │
  └─ (year, branchNumber) ────────────── ייחוס לוגי ────── ┤
                                                           │
BranchActuals                                              │
  └─ (year, month, branchNumber) ─────── ייחוס לוגי ────── ┤
                                                           │
ActuarialEstimate                                          │
  └─ (year, month, branchNumber) ─────── ייחוס לוגי ───────┘
```

> הקשרים הם לוגיים בלבד (אין Foreign Key מוגדר ב-schema).  
> כל הטבלאות מתחברות דרך `branchNumber` + `year` + `month`.

---

## דפי הניתוב

| נתיב | קובץ | קומפוננטה ראשית |
|------|------|-----------------|
| `/` | `app/page.tsx` | `DashboardHome` |
| `/upload` | `app/upload/page.tsx` | `OperationsDashboard` |
| `/report` | `app/report/page.tsx` | `ReportsManager` |
| `/upr` | `app/upr/page.tsx` | `UprManager` + `UprArchive` + `UprDetailedReport` |
| `/upr/operations` | `app/upr/operations/page.tsx` | — |
| `/pnl` | `app/pnl/page.tsx` | `PnLReportView` + `ActualVsTechnicalReport` |
| `/branch` | `app/branch/page.tsx` | `BranchVerticalPnl` |
| `/about` | `app/about/page.tsx` | `AboutSystem` |

---

## Server Actions

מיקום: `app/actions/`  
כל הקבצים מסומנים `"use server"`.

| קובץ | פונקציות עיקריות |
|------|-----------------|
| `upload-policies.ts` | `uploadPolicies(formData, year, month)` |
| `data-actions.ts` | `uploadBranchParamsCSV`, `uploadActualsCSV`, `uploadActuarialCSV` |
| `upr-actions.ts` | `runFullUprCalculation`, `runHistoricalBatchCalculation`, `getDetailedUprReport`, `getUprFromArchive` |
| `pl-actions.ts` | `getPnLReport(year, month)` |
| `pl-actionsV.ts` | `getBranchComparisonReport`, `getActualVsTechnicalReport` |
| `report-actions.ts` | `getReportData`, `getRawData`, `getAvailableYears` |
| `template-actions.ts` | `downloadTemplate(type)` |
| `params-actions.ts` | `uploadBranchParamsCSV` |

---

## לוגיקת עסק

מיקום: `lib/`

| קובץ | תפקיד |
|------|--------|
| `prisma.ts` | חיבור Singleton ל-PostgreSQL |
| `insurance-logic.ts` | פרמיה נצברת, DUC, רווח חתמי טכני |
| `actual-logic.ts` | Incurred Claims, Loss Ratio בפועל |
| `insurance-engine.ts` | מנוע משולב: טכני + בפועל + Variance |

### נוסחאות ליבה

```
Earned Premium    = Written Premium − UPR (closing) + UPR (opening)
Net Earned        = Earned Gross × (1 − reinsurancePct)
DUC               = agentComm × (UPR / Written Premium)
Technical Claims  = Net Earned × expectedLrPct
Technical Profit  = Net Earned − AgentComm + RI Comm − Technical Claims

Incurred Claims   = claimsPaidGross + outstandingClaimsGross + ibnrGross
Actual Profit     = Net Earned − AgentComm + RI Comm − Incurred Claims (net)
Variance          = Actual Profit − Technical Profit
```
