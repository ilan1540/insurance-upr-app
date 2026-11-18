# אפיון מערכת — Insurance UPR / IFRS17 PAA

> **גרסה:** 1.1 | **תאריך עדכון:** מאי 2026 | **סטטוס:** פיתוח פעיל

---

## 1. תיאור כללי

**Insurance UPR App** היא אפליקציית ווב לניהול חשבונאות ביטוחית לפי תקן **IFRS17 PAA (Premium Allocation Approach)**.  
המערכת מכסה את המחזור החודשי המלא: קליטת נתונים ← חישוב UPR/DUC/LRC ← דיווח P&L.

**קהל יעד:** חשבים, אקטוארים ומנהלי כספים בחברות ביטוח.

**Stack טכני:**

| שכבה | טכנולוגיה |
|------|-----------|
| Framework | Next.js 16 (App Router) |
| שפה | TypeScript 5 |
| DB | PostgreSQL (Neon Serverless) |
| ORM | Prisma 7 |
| UI | React 19 + TailwindCSS 4 + lucide-react |
| Server Logic | Next.js Server Actions (`"use server"`) |
| CSV | csv-parser 3 |

---

## 2. מבנה מסד הנתונים

### טבלאות קיימות

#### `Branch` — ענפי ביטוח (master data)
| שדה | טיפוס | הערה |
|-----|--------|------|
| `branchNumber` | `Int` | PK |
| `branchName` | `String` | שם הענף (עברית) |
| `groupCode` | `String` | קוד קיבוץ (e.g. "CAR") |
| `groupName` | `String` | שם קיבוץ לדיווח |
| `updatedAt` | `DateTime` | `@updatedAt` |

#### `BranchParameters` — תקציב שנתי לפי ענף
| שדה | טיפוס | הערה |
|-----|--------|------|
| `year`, `branchNumber` | `Int` | Unique PK לוגי |
| `expectedGrossPremium` | `Float` | פרמיה צפויה שנתית |
| `agentCommPct` | `Float` | % עמלת סוכן |
| `reinsurancePct` | `Float` | % ביטוח משנה |
| `reinsuranceCommPct` | `Float` | % עמלה ממבטח משנה |
| `expectedLrPct` | `Float` | % Loss Ratio צפוי |

#### `PremiumActuals` — פרמיות בפועל חודשיות
| שדה | טיפוס | הערה |
|-----|--------|------|
| `year`, `month`, `branchNumber` | `Int` | Unique constraint |
| `startDate`, `endDate` | `DateTime` | לחישוב Pro-Rata |
| `grossPremium` | `Float` | פרמיה ברוטו |
| `agentComm` | `Float` | עמלת סוכן |
| `reinsurancePremium` | `Float` | פרמיה למבטח משנה |
| `reinsuranceComm` | `Float` | עמלה ממבטח משנה |

#### `ClaimsActuals` — תביעות בפועל
| שדה | טיפוס | הערה |
|-----|--------|------|
| `year`, `month`, `branchNumber`, `underwritingYear`, `lossYear` | — | Unique constraint |
| `claimsPaidGross` | `Float` | תשלומים ברוטו |
| `claimsPaidRi` | `Float` | חלק מבטח משנה |

#### `ActuarialEstimate` — הערכות אקטואריות (רבעוניות בד"כ)
| שדה | טיפוס | הערה |
|-----|--------|------|
| `year`, `month`, `branchNumber`, `underwritingYear`, `lossYear` | — | Unique |
| `outstandingClaimsGross/Ri` | `Float` | תביעות תלויות |
| `ibnrGross/Ri` | `Float` | IBNR |
| `actuarialEstimateGross/Ri` | `Float` | הערכה כוללת |

#### `UprSnapshot` — תמונת UPR חודשית מחושבת
| שדה | טיפוס | הערה |
|-----|--------|------|
| `year`, `period`, `periodType`, `branchNumber` | — | Unique |
| `originalPremium` | `Decimal(15,2)` | פרמיה כתובה |
| `uprValue` | `Decimal(15,2)` | UPR (LRC) |
| `dacGross` | `Decimal(15,2)` | DAC — עמלת סוכן נדחית |
| `deferredRIComm` | `Decimal(15,2)` | עמלת ב"מ נדחית |
| `ducNet` | `Decimal(15,2)` | DUC נטו |

#### `AdminExpense` — הוצאות ניהול וכלליות חודשיות
| שדה | טיפוס |
|-----|--------|
| `year`, `month` | Unique |
| `premiumExpense`, `claimsExpense` | `Float` |

#### `AdminExpenseAllocation` — הקצאת הוצאות לענפים
| שדה | הגדרה |
|-----|-------|
| `year`, `month`, `branchNumber` | Unique |
| `premiumExpenseShare`, `claimsExpenseShare`, `totalExpenseShare` | הקצאה מחושבת |
| `recognizedExpense`, `deferredExpense` | הכנסה מוכרת / נדחית |

#### `Policy` — **Legacy / Deprecated**
טבלה ישנה שאינה בשימוש בזרימת החישוב הנוכחית. הנתונים זורמים דרך `PremiumActuals`.

---

## 3. מבנה הדפים (App Router)

| נתיב | קובץ | קומפוננטה ראשית | תיאור |
|------|------|-----------------|-------|
| `/` | `app/page.tsx` | `DashboardHome` | לוח מחוונים — 4 כרטיסי ניווט |
| `/upload` | `app/upload/page.tsx` | `OperationsDashboard` | קליטת כל קבצי ה-CSV |
| `/report` | `app/report/page.tsx` | `ReportsManager` | צפייה בנתונים גולמיים (6 לשוניות) |
| `/upr` | `app/upr/page.tsx` | `UprArchive` + `UprDetailedReport` | ארכיון UPR ודוח פירוטי |
| `/upr/operations` | `app/upr/operations/page.tsx` | `UprManager` | הפעלת חישוב UPR |
| `/pnl` | `app/pnl/page.tsx` | `PnLReportView` + `ActualVsTechnicalReport` | סימולטור P&L + Variance |
| `/branch` | `app/branch/page.tsx` | `BranchVerticalPnl` | P&L אנכי השוואתי לפי ענף |
| `/guide` | `app/guide/page.tsx` | `WorkflowGuide` | מדריך תהליכים |
| `/about` | `app/about/page.tsx` | `AboutSystem` | תיעוד ומונחים |

---

## 4. Server Actions

מיקום: `app/actions/` — כל הקבצים `"use server"`.

| קובץ | פונקציות |
|------|---------|
| `data-actions.ts` | `uploadBranchParamsCSV`, `uploadActualsCSV`, `uploadActuarialCSV`, `uploadAdminExpensesCSV`, `uploadBranchesCSV`, `downloadTemplate` |
| `upr-actions.ts` | `runFullUprCalculation(targetDate)`, `runHistoricalBatchCalculation()`, `getDetailedUprReport(date)`, `getUprFromArchive(year, month)` |
| `pl-actions.ts` | `getPnLReport(year, month)` — תחזית YTD בלבד |
| `pl-actionsV.ts` | `getBranchComparisonReport(branch, periodA, periodB)`, `getActualVsTechnicalReport(year, month)` |
| `report-actions.ts` | `getReportData(type, year)`, `getRawData(type, filters)`, `getAvailableYears()` |
| `branch-actions.ts` | ניהול ענפים |
| `admin-expense-actions.ts` | קליטה ועדכון הוצאות ניהול |
| `delete-actions.ts` | מחיקת נתונים לפי תקופה |
| `status-actions.ts` | בדיקת סטטוס נתונים |
| `template-actions.ts` | `downloadTemplate(type)` |
| `variance-actions.ts` | ניתוח Variance |
| `upload-policies.ts` | Legacy — לא בשימוש פעיל |

---

## 5. לוגיקת עסק (lib/)

### `insurance-logic.ts` — חישוב UPR / DUC / LRC

```
UPR ratio       = (endDate − cutoffDate) / (endDate − startDate)
UPR             = grossPremium × UPR_ratio
Earned Premium  = grossPremium − UPR
DAC (gross)     = agentComm × UPR_ratio           ← כיום מחושב מתקציב, לא מ-Actuals [M3]
deferredRIComm  = reinsuranceComm × UPR_ratio
DUC net         = DAC − deferredRIComm
```

### `actual-logic.ts` — חישוב Incurred Claims

```
Incurred Claims (gross) = claimsPaidGross + outstandingClaimsGross + ibnrGross
Incurred Claims (RI)    = claimsPaidRi   + outstandingRi           + ibnrRi
Incurred Claims (net)   = gross − RI
```

### `insurance-engine.ts` — מנוע משולב (Technical + Actual + Variance)

```
Net Earned Premium      = Earned Gross × (1 − reinsurancePct)
Technical Claims        = Net Earned × expectedLrPct
Technical Profit        = Net Earned − AgentComm + RI_Comm − Technical Claims

Actual Profit           = Net Earned − AgentComm + RI_Comm − Incurred Claims (net)
Variance                = Actual Profit − Technical Profit
```

### הקצאת הוצאות ניהול (IFRS17)

```
premiumExpenseShare[b]  = premiumExpense × (earnedPremium[b] / Σ earnedPremium)
claimsExpenseShare[b]   = claimsExpense  × (expectedClaims[b] / Σ expectedClaims)
totalExpenseShare[b]    = premiumExpenseShare[b] + claimsExpenseShare[b]
recognizedExpense[b]    = totalExpenseShare[b] × (1 − uprRatio[b])
deferredExpense[b]      = totalExpenseShare[b] × uprRatio[b]
```

---

## 6. מחזור עבודה חודשי

```
שלב 1 — הגדרות ראשוניות (חד-פעמי / שנתי)
  ├── ייבוא Branch master CSV  →  Branch
  └── ייבוא תקציב שנתי CSV    →  BranchParameters

שלב 2 — קלט חודשי (מדי חודש)
  ├── PremiumActuals (עם startDate / endDate)
  ├── ClaimsActuals
  ├── ActuarialEstimate (בד"כ רבעוני)
  └── AdminExpense

שלב 3 — חישוב (UprManager → /upr/operations)
  └── runFullUprCalculation(cutoffDate)
        ├── חישוב UPR + DAC + DUC per branch
        ├── הקצאת AdminExpense לענפים
        └── שמירה: UprSnapshot + AdminExpenseAllocation

שלב 4 — דיווח
  ├── /upr          → ארכיון + פירוט
  ├── /pnl          → P&L תחזית + Actual vs Technical
  ├── /branch       → P&L אנכי השוואתי
  └── /report       → נתונים גולמיים
```

---

## 7. תכונות קיימות — סטטוס מלא

| תכונה | סטטוס | קובץ/נתיב |
|-------|--------|-----------|
| קליטת CSV — 6 סוגים | ✅ | `data-actions.ts` |
| הורדת תבניות CSV | ✅ | `template-actions.ts` |
| חישוב UPR חודשי | ✅ | `upr-actions.ts` |
| חישוב UPR היסטורי batch | ✅ | `upr-actions.ts` |
| ארכיון UPR | ✅ | `UprArchive.tsx` |
| דוח UPR פירוטי | ✅ | `UprDetailedReport.tsx` |
| DAC / DUC | ✅ | `UprSnapshot` |
| P&L תחזית YTD | ✅ | `pl-actions.ts` |
| Actual vs Technical Variance | ✅ | `pl-actionsV.ts` |
| P&L אנכי לפי ענף (2 תקופות) | ✅ | `BranchVerticalPnl.tsx` |
| הקצאת הוצאות ניהול | ✅ | `AdminExpenseAllocation` |
| קלט הוצאות ניהול (UI) | ✅ | `AdminExpenseInput.tsx` |
| מרכז נתונים גולמיים | ✅ | `ReportsManager.tsx` |
| Branch master management | ✅ | `branch-actions.ts` |
| RTL / עברית מלאה | ✅ | — |
| LIC (תביעות תלויות + IBNR) | ❌ C1 | חסר |
| GIC / Insurance Contract Groups | ❌ C2 | חסר |
| Rollforward (opening/closing reconciliation) | ❌ C3 | חסר |

---

## 8. פערים וחובות טכניים

### 🔴 קריטי (חוסמי IFRS17)

**C1 — LIC לא מוטמע**
נתוני `ClaimsActuals` ו-`ActuarialEstimate` נשמרים אך לא מתקצרים ל-`LicSnapshot` רשמי.  
→ **נדרש:** ליצור `LicSnapshot` table + אגרגציה חודשית.

**C2 — אין GIC (Groups of Insurance Contracts)**
המערכת עובדת ברמת ענף; IFRS17 דורש קיבוץ לפורטפוליו → cohort → bucket רווחיות.  
→ **נדרש:** להוסיף ממד GIC ל-data model, מיפוי `(branchNumber, underwritingYear)` לקבוצה, זיהוי חוזים כבדים (onerous).

**C3 — אין Rollforward / פיוס פתיחה-סגירה**
חישוב snapshot חד-פעמי; אין מעקב תנועה בין חודשים.  
→ **נדרש:** להשוות snapshots עוקבים + לממש IFRS17 rollforward schedule (§101–105).

### 🟠 משמעותי

**M3 — DUC מחושב מתקציב, לא מ-Actuals**  
`dacGross = agentCommPct × uprRatio` במקום `PremiumActuals.agentComm × uprRatio`.  
→ **תיקון קל:** להחליף מקור נתונים ב-`upr-actions.ts`.

**M4 — Batch היסטורי בולע שגיאות בשקט**  
`runHistoricalBatchCalculation` מחזיר ספירת הצלחות בלי לפרט חודשים כושלים.  
→ **תיקון קל:** להחזיר רשימת תקופות שנכשלו עם סיבות.

**M1 — פרמטרים שנתיים בלבד (אין granularity חודשי)**  
שינוי אמצע שנה בעמלות / RI אינו מיוצג.  
→ שיקול: להוסיף monthly override או לתעד כמגבלה.

**M2 — Unique constraint מונע קיבוצים מרובים per branch/month**  
`UNIQUE(year, month, branchNumber)` ב-`PremiumActuals`.  
→ לאפשר מספר שורות, או לתעד שהקלט הוא מצטבר מראש.

### 🟡 מינורי

| # | בעיה | פתרון |
|---|------|-------|
| N1 | `Policy` table מת (dead code) | למחוק / לסמן deprecated |
| N2 | פורמט תאריך לא אחיד בתבניות | לאחד ל-`YYYY-MM-DD` |
| N3 | Actuarial רבעוני — ניתוח Variance חודשי אינו שלם | interpolation או להגביל ל-quarter-end |
| N4 | אין validation על CSV — שדות שליליים, תאריכים עתידיים, כפילויות | validation ברמת שורה לפני insert |
| N5 | שנת ReportsManager hardcoded `[2024,2025,2026]` | לשלוף מה-DB |

### 🔵 סקלביליות

| # | בעיה | פתרון |
|---|------|-------|
| S1 | Transaction timeout בקבצים גדולים (50+ ענפים) | chunked `createMany` / PostgreSQL COPY |
| S2 | חישוב חודשי סידורי (לא מקבילי) | split commits / Prisma timeout config |
| S3 | אין audit trail — כל חישוב מחליף את הקודם | `calculationRun` tracking table / soft-delete |

---

## 9. תכנון Sprint הבא (מוצע)

### Sprint 2 — דיוק ויציבות

1. **M3** — DAC/DUC מ-Actuals (תיקון קל, השפעה גבוהה)
2. **C1** — יצירת `LicSnapshot` + אגרגציה חודשית
3. **M4** — דיווח שגיאות ב-Batch
4. **N3** — הגבלת Variance analysis ל-quarter-end (או interpolation)
5. **S1** — chunked upload לקבצים גדולים
6. **N4** — input validation בסיסי

### Sprint 3 — תאימות IFRS17 מלאה

1. **C2** — הגדרת GIC + מיפוי ענפים
2. **C3** — Rollforward schedule (פיוס פתיחה-סגירה)
3. **S3** — Audit trail לחישובים
4. **N1** — מחיקת `Policy` table

---

## 10. מבנה הקבצים

```
insurance-upr-app/
├── app/
│   ├── actions/              ← Server Actions (business logic כ-API)
│   ├── components/           ← React components
│   ├── page.tsx              ← /
│   ├── upload/page.tsx       ← /upload
│   ├── report/page.tsx       ← /report
│   ├── upr/page.tsx          ← /upr
│   ├── upr/operations/       ← /upr/operations
│   ├── pnl/page.tsx          ← /pnl
│   ├── branch/page.tsx       ← /branch
│   ├── guide/page.tsx        ← /guide
│   └── about/page.tsx        ← /about
├── lib/
│   ├── prisma.ts             ← Singleton Prisma client
│   ├── insurance-logic.ts    ← UPR / DAC / DUC
│   ├── actual-logic.ts       ← Incurred Claims
│   └── insurance-engine.ts   ← מנוע משולב (Technical + Actual + Variance)
├── prisma/
│   ├── schema.prisma         ← Data model
│   └── generated/client/     ← Prisma generated client
├── docs/                     ← תיעוד מפורט
│   ├── system_overview.md
│   ├── business_logic.md
│   ├── data_model.md
│   ├── gaps_and_issues.md
│   └── baseline_v1.md
├── input-file/               ← קבצי CSV לדוגמה / טמפלטים
├── ARCHITECTURE.md
├── DOCUMENTATION.md
└── SPEC.md                   ← קובץ זה
```

---

## 11. הרצה מקומית

```bash
# התקנת תלויות
npm install

# יצירת Prisma client
npx prisma generate

# דחיפת schema ל-DB
npx prisma db push

# הרצה בסביבת פיתוח
npm run dev
```

משתני סביבה נדרשים (`.env.local`):
```
DATABASE_URL=postgresql://...
```

---

*נוצר אוטומטית על-ידי סריקת קוד המערכת — מאי 2026*
