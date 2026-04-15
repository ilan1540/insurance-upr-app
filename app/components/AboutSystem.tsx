"use client";

import React from 'react';

export default function AboutSystem() {
  const technicalSpecs = [
    {
      area: "ניהול נתונים (Server Actions)",
      path: "app/actions/",
      files: [
        { name: "branch-actions.ts", desc: "קליטת ענפים, שמות וקיבוצים לצורך דיווח" },
        { name: "data-actions.ts", desc: "קליטת תקציב, נתוני אמת ואקטואריה (CSV) + יצירת תחזית חודשית אוטומטית מ-BranchParameters" },
        { name: "admin-expense-actions.ts", desc: "קליטת הוצאות הנה\"כ + הקצאה לענפים לפי IFRS17" },
        { name: "upr-actions.ts", desc: "חישוב UPR/DUC לפי פוליסות + ארכיון snapshots" },
        { name: "template-actions.ts", desc: "יצירת והורדת קבצי CSV לדוגמה לכל סוגי הקלט" }
      ]
    },
    {
      area: "רכיבי ממשק (Components)",
      path: "app/components/",
      files: [
        { name: "OperationsDashboard.tsx", desc: "מרכז קליטת קבצים — 6 כרטיסי CSV + כפתור יצירת תחזית חודשית אוטומטית" },
        { name: "ReportsManager.tsx", desc: "מרכז בקרת נתונים — לשוניות תצוגה לכל סוגי הנתונים" },
        { name: "PnLReportView.tsx", desc: "סימולטור P&L חזוי — 5 sliders: LR, נפח פרמיה, עמלת סוכן, פרמיה ב\"מ, עמלת ב\"מ" },
        { name: "AdminExpenseInput.tsx", desc: "קלט הוצאות הנה\"כ + טבלת הקצאה לענפים" },
        { name: "AboutSystem.tsx", desc: "דף תיעוד והדרכה (דף זה)" }
      ]
    },
    {
      area: "תשתית נתונים (Database)",
      path: "prisma/",
      files: [
        { name: "Branch", desc: "ענפים: branchNumber, branchName, groupCode, groupName" },
        { name: "BranchParameters", desc: "תקציב שנתי לפי ענף: עמלות, LR יעד, ביטוח משנה" },
        { name: "PremiumActuals", desc: "פרמיות אמת חודשיות: year, month, branchNumber, startDate, endDate, grossPremium, agentComm, reinsurancePremium, reinsuranceComm" },
        { name: "ClaimsActuals", desc: "תביעות אמת: year, month, branchNumber, underwritingYear, lossYear, claimsPaidGross, claimsPaidRi" },
        { name: "ActuarialEstimate", desc: "עתודות אקטואריות: year, month, branchNumber, underwritingYear, lossYear, תלויות ברוטו/ב\"מ, IBNR ברוטו/ב\"מ, הערכה אקטוארית ברוטו/ב\"מ" },
        { name: "AdminExpense", desc: "הוצאות הנה\"כ חודשיות: חלק פרמיה וחלק תביעות" },
        { name: "UprSnapshot", desc: "snapshot חודשי: UPR + DAC ברוטו + עמלת ב\"מ נדחית + DUC נטו" },
        { name: "AdminExpenseAllocation", desc: "הקצאת הנה\"כ לענפים: חלק פרמיה, חלק תביעות, הוצאה שהוכרה, הוצאה נדחית" }
      ]
    }
  ];

  const inputFiles = [
    {
      icon: "🗂️", name: "Template_Branches.csv",
      cols: "branchNumber, branchName, groupCode, groupName",
      desc: "הגדרת ענפים וקיבוצים לדיווח — נטען פעם אחת ומתעדכן לפי צורך",
      note: ""
    },
    {
      icon: "🎯", name: "Template_Budget_Params.csv",
      cols: "year, branchNumber, expectedGrossPremium, agentCommPct, reinsurancePct, reinsuranceCommPct, expectedLrPct",
      desc: "תקציב שנתי — נטען פעם אחת לכל שנה. expectedGrossPremium הוא סכום שנתי.",
      note: "ℹ️ לאחר הקליטה: לחץ 'צור תחזית חודשית' כדי לחלק ל-12 חודשים שווים עם תאריכי ביטוח אוטומטיים"
    },
    {
      icon: "💎", name: "Template_Premium_Actuals.csv",
      cols: "year, month, branchNumber, startDate, endDate, grossPremium, agentComm, reinsurancePremium, reinsuranceComm",
      desc: "פרמיות אמת חודשיות מרובצות לפי ענף — כולל תאריכי כיסוי לחישוב UPR/DAC",
      note: "ℹ️ startDate/endDate — תחילה וסוף תקופת הביטוח, משמשים לחישוב Pro-Rata של UPR ו-DAC לפי IFRS17"
    },
    {
      icon: "🩺", name: "Template_Claims_Actuals.csv",
      cols: "year, month, branchNumber, underwritingYear, lossYear, claimsPaidGross, claimsPaidRi",
      desc: "תביעות אמת — כולל שנת חיתום ושנת נזק לניתוח התפתחות תביעות",
      note: "ℹ️ שנת חיתום (Underwriting Year) — השנה שבה נכתבה הפוליסה. שנת נזק (Loss/Accident Year) — השנה שבה קרה האירוע."
    },
    {
      icon: "📑", name: "Template_Actuarial_Reserves.csv",
      cols: "year, month, branchNumber, underwritingYear, lossYear, outstandingClaimsGross, outstandingClaimsRi, ibnrGross, ibnrRi, actuarialEstimateGross, actuarialEstimateRi",
      desc: "עתודות אקטואריות — נטען מדי חודש, עם פירוט לפי שנת חיתום ושנת נזק",
      note: "ℹ️ actuarialEstimateGross/Ri — הערכה אקטוארית כוללת (תלויות + IBNR + התאמות) ברוטו וחלק ב\"מ. underwritingYear/lossYear — לניתוח Development Triangle."
    },
    {
      icon: "🏢", name: "Template_Admin_Expenses.csv",
      cols: "year, month, premiumExpense, claimsExpense, description",
      desc: "הוצאות הנה\"כ — נטען מדי חודש, מוקצות לענפים לפי IFRS17",
      note: ""
    },
  ];

  return (
    <div className="max-w-5xl mx-auto p-8 bg-white rounded-[3rem] shadow-2xl border border-slate-100" dir="rtl">
      {/* כותרת הדף - קיימת מהקוד הקודם */}
      <div className="text-center mb-12 border-b pb-8">
        <h1 className="text-4xl font-black text-indigo-900 mb-4">אודות ותיעוד המערכת</h1>
        <p className="text-lg text-slate-600">מדריך למשתמש ומפרט טכני לניהול נתוני רווחיות</p>
      </div>

      {/* חלק 1: מטרת המערכת וקבצי קלט - (כפי שהיה בקוד הקודם) */}
      
      {/* חישובי UPR / DUC / הנה"כ */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-slate-800 mb-6 border-r-4 border-blue-600 pr-4">חישובי IFRS17 — UPR, DUC והוצאות הנה"כ</h2>

        {/* UPR */}
        <div className="bg-blue-50 border border-blue-100 rounded-3xl p-6 mb-4">
          <h3 className="font-black text-blue-900 text-lg mb-3">1. UPR — עתודת פרמיה לא מורווחת</h3>
          <p className="text-sm text-blue-800 mb-3">לכל פוליסה מחושב היחס Pro-Rata לפי ימים:</p>
          <div className="bg-white rounded-2xl p-4 font-mono text-sm text-slate-700 space-y-1">
            <p>יחס UPR = ימים שנותרו ÷ סך ימי הפוליסה</p>
            <p>UPR = פרמיה × יחס UPR</p>
            <p>פרמיה שהורווחה = פרמיה × (1 − יחס UPR)</p>
          </div>
          <p className="text-xs text-blue-600 mt-3">הנתון מצטבר ברמת ענף ונשמר כ-snapshot חודשי.</p>
        </div>

        {/* DUC */}
        <div className="bg-indigo-50 border border-indigo-100 rounded-3xl p-6 mb-4">
          <h3 className="font-black text-indigo-900 text-lg mb-3">2. DUC — הוצאות רכישה נדחות (Deferred Acquisition Costs)</h3>
          <p className="text-sm text-indigo-800 mb-3">לפי IFRS17 PAA נדחים שני רכיבים בכיוונים הפוכים:</p>
          <div className="bg-white rounded-2xl p-4 font-mono text-sm text-slate-700 space-y-1.5 mb-3">
            <p><span className="text-indigo-600 font-bold">DAC ברוטו (נכס)</span> = עמלת סוכן כוללת × יחס UPR</p>
            <p><span className="text-purple-600 font-bold">עמלת ב"מ נדחית (הכנסה נדחית)</span> = עמלת ב"מ כוללת × יחס UPR</p>
            <p className="border-t pt-2"><span className="text-cyan-700 font-bold">DUC נטו</span> = DAC ברוטו − עמלת ב"מ נדחית</p>
          </div>
          <div className="text-xs text-indigo-700 bg-indigo-100/50 rounded-xl p-3 space-y-1">
            <p><strong>DAC</strong> — נכס: עמלה ששולמה לסוכן עבור תקופה עתידית, תוכר כהוצאה בהמשך</p>
            <p><strong>עמלת ב"מ נדחית</strong> — הכנסה שהתקבלה ממבטח משנה עבור תקופה עתידית, תוכר כהכנסה בהמשך</p>
            <p><strong>DUC נטו</strong> — הנכס הנטו שיופיע במאזן בגין עלויות רכישה</p>
          </div>
        </div>

        {/* הנה"כ */}
        <div className="bg-amber-50 border border-amber-100 rounded-3xl p-6">
          <h3 className="font-black text-amber-900 text-lg mb-3">3. הוצאות הנהלה וכלליות — הקצאה והכרה</h3>

          <p className="text-sm text-amber-800 mb-3 font-bold">א. הקצאה לענפים (IFRS17 — לפי מחולל עלות):</p>
          <div className="bg-white rounded-2xl p-4 font-mono text-sm text-slate-700 space-y-1.5 mb-4">
            <p><span className="text-amber-700 font-bold">הוצאות מיוחסות לפרמיה</span> → לפי משקל פרמיה שהורווחה של כל ענף</p>
            <p>חלק ענף = (פרמיה שהורווחה לענף ÷ סך פרמיה שהורווחה) × הוצאות פרמיה</p>
            <div className="border-t pt-2 mt-2">
              <p><span className="text-orange-700 font-bold">הוצאות מיוחסות לתביעות</span> → לפי משקל תביעות צפויות של כל ענף</p>
              <p>חלק ענף = (תביעות צפויות לענף ÷ סך תביעות צפויות) × הוצאות תביעות</p>
              <p className="text-xs text-slate-400 mt-1">תביעות צפויות לענף = פרמיה שהורווחה × LR% יעד</p>
            </div>
          </div>

          <p className="text-sm text-amber-800 mb-3 font-bold">ב. הכרה בהוצאות (בדומה לפרמיה):</p>
          <div className="bg-white rounded-2xl p-4 font-mono text-sm text-slate-700 space-y-1">
            <p><span className="text-green-700 font-bold">הוצאה שהוכרה</span> = הקצאה לענף × (1 − יחס UPR)</p>
            <p><span className="text-orange-600 font-bold">הוצאה נדחית</span>  = הקצאה לענף × יחס UPR</p>
          </div>
          <p className="text-xs text-amber-600 mt-3">העיקרון: הוצאה שמשויכת לפרמיה עתידית — נדחית. הוצאה שמשויכת לפרמיה שהורווחה — מוכרת.</p>
        </div>
      </section>

      {/* קבצי קלט */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-slate-800 mb-6 border-r-4 border-violet-500 pr-4">קבצי קלט — מבנה ותדירות</h2>
        <div className="grid grid-cols-1 gap-4">
          {inputFiles.map((f, i) => (
            <div key={i} className="bg-white border border-slate-100 rounded-2xl p-5 flex gap-4 shadow-sm">
              <span className="text-3xl mt-1">{f.icon}</span>
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-3 mb-1">
                  <span className="font-mono font-bold text-indigo-700 text-sm">{f.name}</span>
                  <span className="text-xs bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full">{f.desc}</span>
                </div>
                <p className="text-xs text-slate-400 font-mono mb-1">{f.cols}</p>
                {f.note && <p className="text-xs text-blue-600 bg-blue-50 rounded-lg px-2 py-1">{f.note}</p>}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ארכיטקטורת המערכת ותהליכים */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-slate-800 mb-6 border-r-4 border-blue-600 pr-4">ארכיטקטורה ותהליכי עבודה</h2>
        <div className="grid grid-cols-1 gap-6">
          {technicalSpecs.map((spec, idx) => (
            <div key={idx} className="bg-blue-50/50 p-6 rounded-3xl border border-blue-100">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-black text-blue-900">{spec.area}</h3>
                <span className="text-xs font-mono bg-blue-100 text-blue-700 px-3 py-1 rounded-full">{spec.path}</span>
              </div>
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-right border-b border-blue-200">
                    <th className="pb-2 font-bold text-blue-800">שם הקובץ/תהליך</th>
                    <th className="pb-2 font-bold text-blue-800">תיאור ואחריות</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-blue-100">
                  {spec.files.map((file, fIdx) => (
                    <tr key={fIdx} className="hover:bg-blue-100/30 transition-colors">
                      <td className="py-3 font-mono text-indigo-700 font-semibold">{file.name}</td>
                      <td className="py-3 text-slate-600">{file.desc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-12 bg-slate-900 text-white p-8 rounded-4xl">
        <h2 className="text-xl font-bold mb-4 flex items-center">
          <span className="ml-2">🛠️</span>
          תחזוקה ועדכון שדות
        </h2>
        <p className="text-slate-300 text-sm mb-4 leading-relaxed">
          המערכת מבוססת על סנכרון מלא בין שלוש שכבות. בכל פעם שנדרש להוסיף שדה חדש (למשל: "עמלת סליקה"):
        </p>
        <ol className="list-decimal list-inside text-sm space-y-2 text-slate-300">
          <li>יש לעדכן את הקובץ <code className="text-amber-400">schema.prisma</code> ולהריץ <code className="text-amber-400">npx prisma db push</code>.</li>
          <li>יש להוסיף את השדה ב-Action המתאים תחת <code className="text-amber-400">app/actions/</code>.</li>
          <li>יש לעדכן את הכותרת ב- <code className="text-amber-400">template-actions.ts</code> כדי שהתבנית להורדה תכלול את השדה החדש.</li>
        </ol>
      </section>

      <div className="text-center text-slate-400 text-xs mt-12">
        נבנה עבור מערכת ניהול ביטוח | מפרט טכני מלא | פברואר 2026
      </div>
    </div>
  );
}