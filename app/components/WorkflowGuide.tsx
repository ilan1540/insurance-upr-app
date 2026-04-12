"use client";

import { useState } from "react";

type Phase = "monthly" | "quarterly";

const MONTHLY_STEPS = [
  {
    step: 1,
    phase: "קלט",
    icon: "💎",
    color: "emerald",
    title: "טעינת פרמיות אמת",
    href: "/upload",
    table: "PremiumActuals",
    template: "Template_Premium_Actuals.csv",
    columns: "year, month, branchNumber, startDate, endDate, grossPremium, agentComm, reinsurancePremium, reinsuranceComm",
    notes: [
      "startDate / endDate — תחילה וסוף תקופת הביטוח (לחישוב UPR Pro-Rata)",
      "פורמט תאריך נתמך: YYYY-MM-DD או DD/MM/YYYY",
      "שורה אחת לכל ענף לכל חודש",
    ],
    validation: "ודא שקיימים נתונים לכל 12 ענפים",
  },
  {
    step: 2,
    phase: "קלט",
    icon: "🩺",
    color: "sky",
    title: "טעינת תביעות אמת",
    href: "/upload",
    table: "ClaimsActuals",
    template: "Template_Claims_Actuals.csv",
    columns: "year, month, branchNumber, underwritingYear, lossYear, claimsPaidGross, claimsPaidRi",
    notes: [
      "underwritingYear — שנת כתיבת הפוליסה",
      "lossYear — שנת אירוע הנזק",
      "מספר שורות לכל ענף לפי קומבינציות UW/Loss Year",
    ],
    validation: "ודא כיסוי לכל השנות חיתום הרלוונטיות",
  },
  {
    step: 3,
    phase: "קלט",
    icon: "🏢",
    color: "rose",
    title: "טעינת הוצאות הנה\"כ",
    href: "/upload",
    table: "AdminExpense",
    template: "Template_Admin_Expenses.csv",
    columns: "year, month, premiumExpense, claimsExpense, description",
    notes: [
      "premiumExpense — הוצאות המיוחסות לפעילות פרמיה",
      "claimsExpense — הוצאות המיוחסות לפעילות תביעות",
      "יחולקו אוטומטית לענפים בחישוב UPR",
    ],
    validation: "ודא פיצול נכון בין שני סוגי ההוצאות",
  },
  {
    step: 4,
    phase: "חישוב",
    icon: "⚙️",
    color: "indigo",
    title: "הרצת חישוב UPR + DUC",
    href: "/upr",
    table: "UprSnapshot + AdminExpenseAllocation",
    template: null,
    columns: null,
    notes: [
      "בחר את תאריך החתך — בדרך כלל היום האחרון של החודש",
      "המערכת מחשבת: UPR, DAC, עמלת ב\"מ נדחית, DUC נטו",
      "מקצה הוצאות הנה\"כ לענפים לפי IFRS17 סעיף 84",
      "תוצאות נשמרות ב-DB לשימוש בדוחות",
    ],
    validation: "ודא שהתוצאה כוללת את כל הענפים ו-UPR > 0",
  },
  {
    step: 5,
    phase: "דוחות",
    icon: "📊",
    color: "violet",
    title: "עיון בדוח UPR מפורט",
    href: "/upr",
    table: "UprSnapshot",
    template: null,
    columns: null,
    notes: [
      "בדוק ימי ביטוח ויחס UPR לפי ענף",
      "ודא שתאריכי תחילה/סוף ביטוח תקינים",
      "בדוק שסכומי UPR סבירים ביחס לפרמיה",
    ],
    validation: "יחס UPR צפוי: בסביבות 50%-80% לפוליסות שנתיות",
  },
  {
    step: 6,
    phase: "דוחות",
    icon: "💰",
    color: "amber",
    title: "הפקת דוח P&L",
    href: "/pnl",
    table: "UprSnapshot + BranchParameters",
    template: null,
    columns: null,
    notes: [
      "דוח תחזיתי — מבוסס על פרמטרי תקציב",
      "כולל: פרמיה שהורווחה, עמלות, ביטוח משנה, תביעות צפויות",
      "השווה לתקציב השנתי",
    ],
    validation: "בדוק שרווחיות ענפית סבירה ביחס ל-LR יעד",
  },
  {
    step: 7,
    phase: "בקרה",
    icon: "🔍",
    color: "slate",
    title: "בקרת נתוני קלט",
    href: "/report",
    table: "כל טבלאות הקלט",
    template: null,
    columns: null,
    notes: [
      "עיין בכל לשוניות מרכז בקרת הנתונים",
      "ודא שאין ענפים חסרים",
      "בדוק הגיונות מספרים — פרמיות, תביעות, עמלות",
    ],
    validation: "פרמיות אמת ≈ תחזית ± 20% (סבירות ראשונית)",
  },
];

const QUARTERLY_STEPS = [
  {
    step: 1,
    phase: "קלט",
    icon: "📑",
    color: "amber",
    title: "טעינת הערכות אקטואריות",
    href: "/upload",
    table: "ActuarialEstimate",
    template: "Template_Actuarial_Reserves.csv",
    columns: "year, month, branchNumber, underwritingYear, lossYear, outstandingClaimsGross, outstandingClaimsRi, ibnrGross, ibnrRi, actuarialEstimateGross, actuarialEstimateRi",
    notes: [
      "מתבצע ב-Q1 (03), Q2 (06), Q3 (09), Q4 (12)",
      "actuarialEstimateGross — הערכה אקטוארית כוללת (תלויות + IBNR + התאמות)",
      "פירוט לפי underwritingYear ו-lossYear לניתוח Development Triangle",
    ],
    validation: "ודא שהעתודות מכסות את כל שנות החיתום הפתוחות",
  },
  {
    step: 2,
    phase: "קלט",
    icon: "🎯",
    color: "indigo",
    title: "עדכון פרמטרי תחזית (אם נדרש)",
    href: "/upload",
    table: "BranchParameters",
    template: "Template_Budget_Params.csv",
    columns: "year, branchNumber, expectedGrossPremium, agentCommPct, reinsurancePct, reinsuranceCommPct, expectedLrPct",
    notes: [
      "מתבצע בתחילת שנה — פעם אחת לשנה",
      "עדכן אם חלו שינויים בתנאי ביטוח המשנה או עמלות",
      "משפיע על חישוב DUC, הקצאת הנה\"כ ודוח P&L",
    ],
    validation: "ודא שסך הפרמיה החזויה תואמת את תקציב השנה",
  },
  {
    step: 3,
    phase: "חישוב",
    icon: "⚙️",
    color: "indigo",
    title: "הרצת חישוב רבעוני לכל 3 החודשים",
    href: "/upr",
    table: "UprSnapshot",
    template: null,
    columns: null,
    notes: [
      "הרץ חישוב UPR עבור כל חודש ברבעון בנפרד",
      "לכל חודש: בחר את היום האחרון של אותו חודש",
      "לחלופין: השתמש בכפתור 'הרצה היסטורית' לכל התקופות",
    ],
    validation: "ודא שקיימים snapshots לכל 3 החודשים",
  },
  {
    step: 4,
    phase: "דוחות",
    icon: "📈",
    color: "violet",
    title: "ניתוח ענפי רבעוני",
    href: "/branch",
    table: "UprSnapshot (השוואת תקופות)",
    template: null,
    columns: null,
    notes: [
      "השווה סוף הרבעון לסוף הרבעון הקודם",
      "בדוק מגמות בפרמיה שהורווחה ובתביעות",
      "זהה ענפים עם סטייה משמעותית מהתקציב",
    ],
    validation: "LR בפועל vs. LR יעד — סטייה > 15% מחייבת בדיקה",
  },
  {
    step: 5,
    phase: "בקרה",
    icon: "🔍",
    color: "slate",
    title: "בקרת עתודות אקטואריות",
    href: "/report",
    table: "ActuarialEstimate",
    template: null,
    columns: null,
    notes: [
      "עיין בלשונית אקטואריה ב-ReportsManager",
      "בדוק יחס IBNR / תביעות תלויות לפי ענף",
      "ודא שההערכה האקטוארית הכוללת סבירה",
    ],
    validation: "IBNR / (תלויות + IBNR) צפוי: 20%–50% תלוי בענף",
  },
];

const COLOR_MAP: Record<string, { bg: string; border: string; badge: string; text: string; step: string }> = {
  emerald: { bg: "bg-emerald-50",  border: "border-emerald-200", badge: "bg-emerald-100 text-emerald-700", text: "text-emerald-800", step: "bg-emerald-600" },
  sky:     { bg: "bg-sky-50",      border: "border-sky-200",     badge: "bg-sky-100 text-sky-700",         text: "text-sky-800",     step: "bg-sky-500" },
  rose:    { bg: "bg-rose-50",     border: "border-rose-200",    badge: "bg-rose-100 text-rose-700",       text: "text-rose-800",    step: "bg-rose-500" },
  indigo:  { bg: "bg-indigo-50",   border: "border-indigo-200",  badge: "bg-indigo-100 text-indigo-700",   text: "text-indigo-800",  step: "bg-indigo-600" },
  violet:  { bg: "bg-violet-50",   border: "border-violet-200",  badge: "bg-violet-100 text-violet-700",   text: "text-violet-800",  step: "bg-violet-600" },
  amber:   { bg: "bg-amber-50",    border: "border-amber-200",   badge: "bg-amber-100 text-amber-700",     text: "text-amber-800",   step: "bg-amber-500" },
  slate:   { bg: "bg-slate-50",    border: "border-slate-200",   badge: "bg-slate-100 text-slate-700",     text: "text-slate-800",   step: "bg-slate-600" },
};

const PHASE_COLORS: Record<string, string> = {
  "קלט":    "bg-blue-100 text-blue-700",
  "חישוב":  "bg-purple-100 text-purple-700",
  "דוחות":  "bg-green-100 text-green-700",
  "בקרה":   "bg-orange-100 text-orange-700",
};

export default function WorkflowGuide() {
  const [phase, setPhase] = useState<Phase>("monthly");
  const [expanded, setExpanded] = useState<number | null>(null);

  const steps = phase === "monthly" ? MONTHLY_STEPS : QUARTERLY_STEPS;

  return (
    <div className="max-w-4xl mx-auto p-6 md:p-10" dir="rtl">

      {/* כותרת */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-black text-slate-900 mb-3">מדריך תהליך עבודה</h1>
        <p className="text-slate-500 text-lg">סדר פעולות מומלץ לקליטה, חישוב, דיווח ובקרה</p>
      </div>

      {/* בחירת מחזור */}
      <div className="flex justify-center mb-10">
        <div className="bg-slate-100 p-1.5 rounded-2xl flex gap-1">
          <button
            onClick={() => { setPhase("monthly"); setExpanded(null); }}
            className={`px-8 py-3 rounded-xl font-bold text-sm transition-all ${
              phase === "monthly" ? "bg-white shadow-md text-indigo-700" : "text-slate-500 hover:text-slate-700"
            }`}
          >
            מחזור חודשי
          </button>
          <button
            onClick={() => { setPhase("quarterly"); setExpanded(null); }}
            className={`px-8 py-3 rounded-xl font-bold text-sm transition-all ${
              phase === "quarterly" ? "bg-white shadow-md text-indigo-700" : "text-slate-500 hover:text-slate-700"
            }`}
          >
            מחזור רבעוני
          </button>
        </div>
      </div>

      {/* שלבים */}
      <div className="space-y-3">
        {steps.map((s, idx) => {
          const c = COLOR_MAP[s.color];
          const isOpen = expanded === idx;
          return (
            <div key={idx} className={`rounded-2xl border-2 ${c.border} overflow-hidden transition-all`}>

              {/* שורת כותרת */}
              <button
                className={`w-full flex items-center gap-4 p-5 text-right ${c.bg} hover:brightness-95 transition-all`}
                onClick={() => setExpanded(isOpen ? null : idx)}
              >
                {/* מספר שלב */}
                <span className={`flex-shrink-0 w-9 h-9 rounded-full ${c.step} text-white font-black text-sm flex items-center justify-center`}>
                  {s.step}
                </span>

                {/* אייקון */}
                <span className="text-2xl flex-shrink-0">{s.icon}</span>

                {/* כותרת + תגיות */}
                <div className="flex-1 flex flex-wrap items-center gap-2">
                  <span className={`font-black text-base ${c.text}`}>{s.title}</span>
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${PHASE_COLORS[s.phase]}`}>{s.phase}</span>
                  {s.table && (
                    <span className="text-xs font-mono bg-white/70 text-slate-500 px-2 py-0.5 rounded-full hidden md:inline">
                      {s.table}
                    </span>
                  )}
                </div>

                {/* חץ */}
                <span className={`text-slate-400 transition-transform ${isOpen ? "rotate-180" : ""} text-lg`}>▼</span>
              </button>

              {/* תוכן מורחב */}
              {isOpen && (
                <div className="px-6 py-5 bg-white border-t border-slate-100 space-y-4">

                  {/* קובץ תבנית */}
                  {s.template && (
                    <div className="flex flex-wrap items-start gap-3 p-3 bg-slate-50 rounded-xl">
                      <span className="text-xs font-bold text-slate-500 mt-0.5">קובץ תבנית:</span>
                      <span className="font-mono text-xs text-indigo-700 font-bold">{s.template}</span>
                    </div>
                  )}

                  {/* עמודות */}
                  {s.columns && (
                    <div className="p-3 bg-slate-50 rounded-xl">
                      <p className="text-xs font-bold text-slate-500 mb-1">עמודות נדרשות:</p>
                      <p className="font-mono text-xs text-slate-700 leading-relaxed">{s.columns}</p>
                    </div>
                  )}

                  {/* הנחיות */}
                  <div>
                    <p className="text-xs font-bold text-slate-500 mb-2">הנחיות:</p>
                    <ul className="space-y-1.5">
                      {s.notes.map((n, i) => (
                        <li key={i} className="flex gap-2 text-sm text-slate-700">
                          <span className="text-slate-300 mt-0.5">◆</span>
                          <span>{n}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* בדיקת תקינות */}
                  <div className="flex gap-2 p-3 bg-amber-50 border border-amber-100 rounded-xl">
                    <span className="text-amber-500 flex-shrink-0">✓</span>
                    <p className="text-sm text-amber-800 font-medium">{s.validation}</p>
                  </div>

                  {/* קישור לדף */}
                  {s.href && (
                    <a
                      href={s.href}
                      className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold text-white ${c.step} hover:opacity-90 transition-all`}
                    >
                      עבור לדף ←
                    </a>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* סיכום שלבים */}
      <div className="mt-10 p-6 bg-slate-900 text-white rounded-3xl">
        <h3 className="font-black text-lg mb-4">
          {phase === "monthly" ? "סיכום מחזור חודשי" : "סיכום מחזור רבעוני"}
        </h3>
        <div className="flex flex-wrap gap-2">
          {steps.map((s, i) => (
            <div key={i} className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-lg text-sm">
              <span>{s.icon}</span>
              <span className="font-bold">{s.step}.</span>
              <span className="text-slate-300">{s.title}</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
