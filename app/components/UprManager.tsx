"use client";

import { useState } from "react";
import { runFullUprCalculation, runHistoricalBatchCalculation } from "@/app/actions/upr-actions";

const fmt = (n: number) => Math.round(n).toLocaleString("he-IL");

const MONTHS_HE = ["ינואר","פברואר","מרץ","אפריל","מאי","יוני","יולי","אוגוסט","ספטמבר","אוקטובר","נובמבר","דצמבר"];

function lastDayOf(year: number, month: number) {
  return new Date(year, month, 0).getDate();
}

export default function UprManager() {
  const now = new Date();
  const [selYear,  setSelYear]  = useState(now.getFullYear());
  const [selMonth, setSelMonth] = useState(now.getMonth() + 1);
  const [selDay,   setSelDay]   = useState(lastDayOf(now.getFullYear(), now.getMonth() + 1));

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>(null);

  // בנה מחרוזת YYYY-MM-DD עבור ה-action
  const targetDate = `${selYear}-${String(selMonth).padStart(2,"0")}-${String(selDay).padStart(2,"0")}`;
  const daysInMonth = lastDayOf(selYear, selMonth);

  const handleMonthChange = (m: number) => {
    setSelMonth(m);
    const max = lastDayOf(selYear, m);
    setSelDay(max); // ברירת מחדל — יום אחרון בחודש
  };

  const handleSingleCalc = async () => {
    setLoading(true);
    const res = await runFullUprCalculation(targetDate);
    if (res.success) setData(res);
    else alert(res.error);
    setLoading(false);
  };

  const handleBatchRun = async () => {
    if (!confirm("פעולה זו תמחק את כל החישובים הקיימים ותריץ מחדש על כל התקופות במערכת.\nהאם להמשיך?")) return;
    setLoading(true);
    setData(null);
    const res = await runHistoricalBatchCalculation();
    setLoading(false);
    alert(res.success ? res.message : res.error);
  };

  return (
    <div className="max-w-5xl mx-auto p-8 bg-white rounded-4xl shadow-2xl border border-gray-100" dir="rtl">

      <div className="bg-slate-50 p-8 rounded-3xl mb-8 space-y-6">
        <div className="flex flex-col gap-3">
          <label className="font-bold text-slate-700">תאריך חתך לחישוב</label>
          <div className="flex gap-2 items-center bg-white border-2 border-white shadow-sm rounded-2xl p-3 focus-within:border-blue-400 transition-all">
            {/* יום */}
            <select value={selDay} onChange={e => setSelDay(Number(e.target.value))}
              className="flex-1 p-2 rounded-xl bg-slate-50 border border-slate-200 font-bold text-xl text-slate-800 outline-none text-center">
              {Array.from({ length: daysInMonth }, (_, i) => i + 1).map(d => (
                <option key={d} value={d}>{String(d).padStart(2,"0")}</option>
              ))}
            </select>
            <span className="text-slate-400 font-bold">/</span>
            {/* חודש */}
            <select value={selMonth} onChange={e => handleMonthChange(Number(e.target.value))}
              className="flex-2 p-2 rounded-xl bg-slate-50 border border-slate-200 font-bold text-lg text-slate-800 outline-none text-center">
              {MONTHS_HE.map((m, i) => (
                <option key={i + 1} value={i + 1}>{m}</option>
              ))}
            </select>
            <span className="text-slate-400 font-bold">/</span>
            {/* שנה */}
            <select value={selYear} onChange={e => { setSelYear(Number(e.target.value)); setSelDay(lastDayOf(Number(e.target.value), selMonth)); }}
              className="flex-1 p-2 rounded-xl bg-slate-50 border border-slate-200 font-bold text-xl text-slate-800 outline-none text-center">
              {[2023, 2024, 2025, 2026, 2027].map(y => (
                <option key={y} value={y}>{y}</option>
              ))}
            </select>
          </div>
          <p className="text-xs text-slate-400 text-center">
            תאריך חתך: {String(selDay).padStart(2,"0")}/{String(selMonth).padStart(2,"0")}/{selYear}
          </p>
        </div>
        <div className="grid grid-cols-1 gap-4">
          <button
            onClick={handleSingleCalc}
            disabled={loading}
            className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-bold shadow-lg shadow-blue-200 transition-all disabled:bg-slate-300"
          >
            {loading ? "מחשב ושומר..." : "חשב ושמור — UPR + DUC + הנה\"כ"}
          </button>
          <button
            onClick={handleBatchRun}
            disabled={loading}
            className="text-sm text-slate-400 underline hover:text-blue-500 transition-colors"
          >
            🔄 הרצה גורפת — מחיקה וחישוב מחדש לכל התקופות במערכת
          </button>
        </div>
      </div>

      {data && (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-6">

          {/* כרטיסי סיכום */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <SummaryCard label="פוליסות" value={data.count} color="slate" />
            <SummaryCard label="סה״כ UPR (₪)" value={fmt(data.totalUpr)} color="blue" />
            <SummaryCard label="DUC נטו (₪)" value={fmt(data.totalDucNet)} color="indigo" />
            <SummaryCard
              label="הנה״כ מוקצית"
              value={data.hasAdminExpense ? "✔ כולל" : "— אין נתונים"}
              color={data.hasAdminExpense ? "amber" : "slate"}
            />
          </div>

          {/* טבלת פירוט לפי ענף */}
          <div className="rounded-2xl overflow-hidden border border-slate-100 shadow-sm">
            <table className="w-full text-right border-collapse text-sm">
              <thead className="bg-slate-800 text-white text-xs">
                <tr>
                  <th className="p-3">ענף</th>
                  <th className="p-3 text-left text-blue-300">UPR (₪)</th>
                  <th className="p-3 text-left text-indigo-300">DAC ברוטו</th>
                  <th className="p-3 text-left text-purple-300">עמלת ב״מ נדחית</th>
                  <th className="p-3 text-left text-cyan-300">DUC נטו</th>
                  <th className="p-3 text-left text-amber-300">הנה״כ הוכרה</th>
                  <th className="p-3 text-left text-orange-300">הנה״כ נדחית</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {data.rows.map((row: any, i: number) => (
                  <tr key={i} className="hover:bg-slate-50 transition-colors">
                    <td className="p-3 font-bold text-slate-700">ענף {row.branchNumber}</td>
                    <td className="p-3 text-left font-mono text-blue-700">{fmt(row.uprValue)}</td>
                    <td className="p-3 text-left font-mono text-indigo-600">{fmt(row.dacGross)}</td>
                    <td className="p-3 text-left font-mono text-purple-600">({fmt(row.deferredRIComm)})</td>
                    <td className="p-3 text-left font-mono font-bold text-cyan-700">{fmt(row.ducNet)}</td>
                    <td className="p-3 text-left font-mono text-amber-700">{fmt(row.recognizedExpense)}</td>
                    <td className="p-3 text-left font-mono text-orange-600">{fmt(row.deferredExpense)}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="bg-slate-100 font-bold text-sm">
                  <td className="p-3">סה"כ</td>
                  <td className="p-3 text-left font-mono text-blue-700">{fmt(data.rows.reduce((s: number, r: any) => s + r.uprValue, 0))}</td>
                  <td className="p-3 text-left font-mono text-indigo-600">{fmt(data.rows.reduce((s: number, r: any) => s + r.dacGross, 0))}</td>
                  <td className="p-3 text-left font-mono text-purple-600">({fmt(data.rows.reduce((s: number, r: any) => s + r.deferredRIComm, 0))})</td>
                  <td className="p-3 text-left font-mono text-cyan-700">{fmt(data.rows.reduce((s: number, r: any) => s + r.ducNet, 0))}</td>
                  <td className="p-3 text-left font-mono text-amber-700">{fmt(data.rows.reduce((s: number, r: any) => s + r.recognizedExpense, 0))}</td>
                  <td className="p-3 text-left font-mono text-orange-600">{fmt(data.rows.reduce((s: number, r: any) => s + r.deferredExpense, 0))}</td>
                </tr>
              </tfoot>
            </table>
          </div>

          {/* הסבר */}
          <div className="bg-blue-50 rounded-2xl p-5 text-xs text-blue-700 space-y-1.5 border border-blue-100">
            <p className="font-bold text-blue-900 mb-2">פירוש השדות — IFRS17 PAA</p>
            <p><strong>UPR</strong> — עתודת פרמיה לא מורווחת: חלק הפרמיה השייך לתקופה עתידית</p>
            <p><strong>DAC ברוטו</strong> — עמלת סוכן נדחית (נכס): עמלה ששולמה × יחס UPR</p>
            <p><strong>עמלת ב"מ נדחית</strong> — הכנסה נדחית ממבטח משנה: עמלה שהתקבלה × יחס UPR</p>
            <p><strong>DUC נטו</strong> — DAC פחות עמלת ב"מ נדחית = הנכס הנטו בגין עלויות רכישה</p>
            <p><strong>הנה"כ הוכרה</strong> — חלק הוצאות ההנהלה שהוכר בתקופה הנוכחית (× (1−UPR ratio))</p>
            <p><strong>הנה"כ נדחית</strong> — חלק הוצאות ההנהלה הנדחה לתקופות עתידיות (× UPR ratio)</p>
          </div>
        </div>
      )}
    </div>
  );
}

function SummaryCard({ label, value, color }: { label: string; value: any; color: string }) {
  const colors: any = {
    blue:   "bg-blue-50 text-blue-700 border-blue-100",
    indigo: "bg-indigo-50 text-indigo-700 border-indigo-100",
    amber:  "bg-amber-50 text-amber-700 border-amber-100",
    slate:  "bg-slate-50 text-slate-600 border-slate-100",
  };
  return (
    <div className={`border p-4 rounded-2xl text-center shadow-sm ${colors[color]}`}>
      <span className="block text-xs mb-1 opacity-70">{label}</span>
      <span className="text-xl font-black">{value}</span>
    </div>
  );
}
