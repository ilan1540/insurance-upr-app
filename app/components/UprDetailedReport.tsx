"use client";

import { useState } from "react";
import { getDetailedUprReport } from "@/app/actions/upr-actions";

function fmtDate(d: any): string {
  if (!d) return "—";
  const dt = new Date(d);
  if (isNaN(dt.getTime())) return "—";
  return dt.toLocaleDateString("he-IL", { day: "2-digit", month: "2-digit", year: "numeric" });
}

function fmtNum(n: number) {
  return Math.round(n).toLocaleString("he-IL");
}

const MONTHS_HE = ["ינואר","פברואר","מרץ","אפריל","מאי","יוני","יולי","אוגוסט","ספטמבר","אוקטובר","נובמבר","דצמבר"];

function lastDayOf(y: number, m: number) { return new Date(y, m, 0).getDate(); }

export default function UprDetailedReport() {
  const now = new Date();
  const [selYear,  setSelYear]  = useState(now.getFullYear());
  const [selMonth, setSelMonth] = useState(now.getMonth() + 1);
  const [selDay,   setSelDay]   = useState(lastDayOf(now.getFullYear(), now.getMonth() + 1));

  const [loading, setLoading] = useState(false);
  const [rows, setRows]       = useState<any[]>([]);
  const [ran, setRan]         = useState(false);

  const targetDate  = `${selYear}-${String(selMonth).padStart(2,"0")}-${String(selDay).padStart(2,"0")}`;
  const daysInMonth = lastDayOf(selYear, selMonth);

  const handleMonthChange = (m: number) => { setSelMonth(m); setSelDay(lastDayOf(selYear, m)); };

  const fetchReport = async () => {
    setLoading(true);
    setRan(true);
    const res = await getDetailedUprReport(targetDate);
    if (res.success) setRows(res.rows);
    else alert(res.error);
    setLoading(false);
  };

  const totalPremium = rows.reduce((s, r) => s + (r.premiumAmount ?? 0), 0);
  const totalUpr     = rows.reduce((s, r) => s + (r.uprValue     ?? 0), 0);
  const totalEarned  = totalPremium - totalUpr;
  const avgUprPct    = totalPremium > 0 ? (totalUpr / totalPremium) * 100 : 0;

  return (
    <div className="max-w-7xl mx-auto p-6 bg-white rounded-[2.5rem] shadow-xl border border-slate-100 mt-8" dir="rtl">

      {/* כותרת */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h3 className="text-2xl font-black text-slate-900">דוח UPR מפורט — לפי ענף ותקופה</h3>
          <p className="text-slate-500 text-sm mt-1">חישוב Pro-Rata לפי תחילה וסוף ביטוח</p>
        </div>
        <div className="flex flex-wrap gap-2 items-center bg-slate-50 p-2 rounded-2xl border border-slate-200">
          <label className="text-sm font-bold text-slate-500 mx-1">תאריך חתך:</label>
          {/* יום */}
          <select value={selDay} onChange={e => setSelDay(Number(e.target.value))}
            className="p-2 bg-white border border-slate-200 rounded-xl outline-none font-bold text-blue-700 text-sm w-16 text-center">
            {Array.from({ length: daysInMonth }, (_, i) => i + 1).map(d => (
              <option key={d} value={d}>{String(d).padStart(2,"0")}</option>
            ))}
          </select>
          <span className="text-slate-400 font-bold">/</span>
          {/* חודש */}
          <select value={selMonth} onChange={e => handleMonthChange(Number(e.target.value))}
            className="p-2 bg-white border border-slate-200 rounded-xl outline-none font-bold text-blue-700 text-sm">
            {MONTHS_HE.map((m, i) => <option key={i+1} value={i+1}>{m}</option>)}
          </select>
          <span className="text-slate-400 font-bold">/</span>
          {/* שנה */}
          <select value={selYear} onChange={e => { setSelYear(Number(e.target.value)); setSelDay(lastDayOf(Number(e.target.value), selMonth)); }}
            className="p-2 bg-white border border-slate-200 rounded-xl outline-none font-bold text-blue-700 text-sm w-20 text-center">
            {[2023,2024,2025,2026,2027].map(y => <option key={y} value={y}>{y}</option>)}
          </select>
          <button
            onClick={fetchReport}
            disabled={loading}
            className="px-5 py-2 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-all disabled:opacity-50 text-sm"
          >
            {loading ? "מחשב..." : "הפק דוח"}
          </button>
        </div>
      </div>

      {/* סיכום כללי */}
      {rows.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-indigo-50 rounded-2xl p-4 border border-indigo-100">
            <p className="text-xs text-indigo-500 font-bold mb-1">פרמיה ברוטו כוללת</p>
            <p className="text-xl font-black text-indigo-800">₪{fmtNum(totalPremium)}</p>
          </div>
          <div className="bg-blue-50 rounded-2xl p-4 border border-blue-100">
            <p className="text-xs text-blue-500 font-bold mb-1">UPR — פרמיה לא מורווחת</p>
            <p className="text-xl font-black text-blue-800">₪{fmtNum(totalUpr)}</p>
          </div>
          <div className="bg-emerald-50 rounded-2xl p-4 border border-emerald-100">
            <p className="text-xs text-emerald-500 font-bold mb-1">פרמיה שהורווחה</p>
            <p className="text-xl font-black text-emerald-800">₪{fmtNum(totalEarned)}</p>
          </div>
          <div className="bg-amber-50 rounded-2xl p-4 border border-amber-100">
            <p className="text-xs text-amber-600 font-bold mb-1">שיעור UPR ממוצע</p>
            <p className="text-xl font-black text-amber-800">{avgUprPct.toFixed(1)}%</p>
          </div>
        </div>
      )}

      {/* טבלה */}
      <div className="bg-white rounded-4xl overflow-hidden border border-slate-200 shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-right text-sm border-collapse">
            <thead className="bg-slate-800 text-white text-xs">
              <tr>
                <th className="p-3">ענף</th>
                <th className="p-3">תחילת ביטוח</th>
                <th className="p-3">תום ביטוח</th>
                <th className="p-3 text-center">סה"כ ימים</th>
                <th className="p-3 text-center">ימים שנותרו</th>
                <th className="p-3 text-center text-blue-300">יחס UPR%</th>
                <th className="p-3 text-left text-slate-300">פרמיה ברוטו</th>
                <th className="p-3 text-left text-blue-300 font-black">UPR</th>
                <th className="p-3 text-left text-emerald-300">פרמיה שהורווחה</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {!ran && (
                <tr><td colSpan={9} className="p-16 text-center text-slate-400">בחר תאריך חתך ולחץ על "הפק דוח"</td></tr>
              )}
              {ran && loading && (
                <tr><td colSpan={9} className="p-16 text-center text-blue-500 animate-pulse font-bold">מחשב...</td></tr>
              )}
              {ran && !loading && rows.length === 0 && (
                <tr><td colSpan={9} className="p-16 text-center text-slate-400">לא נמצאו נתוני פרמיות לתקופה זו</td></tr>
              )}
              {rows.map((row, i) => {
                const earned = (row.premiumAmount ?? 0) - (row.uprValue ?? 0);
                const uprPct = row.uprRatioPct ?? 0;
                return (
                  <tr key={i} className="hover:bg-slate-50 transition-colors">
                    <td className="p-3 font-bold text-indigo-700">ענף {row.branchNumber}</td>
                    <td className="p-3 font-mono text-xs text-slate-500">{fmtDate(row.startDate)}</td>
                    <td className="p-3 font-mono text-xs text-slate-500">{fmtDate(row.endDate)}</td>
                    <td className="p-3 text-center text-slate-500">{row.totalDays}</td>
                    <td className="p-3 text-center font-bold text-blue-600">{row.remainingDays}</td>
                    <td className="p-3 text-center">
                      <span className={`px-2 py-0.5 rounded-lg text-xs font-bold ${
                        uprPct > 70 ? "bg-blue-100 text-blue-700" :
                        uprPct > 30 ? "bg-amber-100 text-amber-700" :
                        "bg-emerald-100 text-emerald-700"
                      }`}>
                        {uprPct.toFixed(1)}%
                      </span>
                    </td>
                    <td className="p-3 text-left font-mono text-slate-700">{fmtNum(row.premiumAmount)}</td>
                    <td className="p-3 text-left font-mono font-black text-blue-700">{fmtNum(row.uprValue)}</td>
                    <td className="p-3 text-left font-mono text-emerald-700">{fmtNum(earned)}</td>
                  </tr>
                );
              })}
            </tbody>
            {rows.length > 0 && (
              <tfoot className="bg-slate-100 font-black text-sm border-t-2 border-slate-300">
                <tr>
                  <td colSpan={6} className="p-3 text-slate-600">סה"כ — {rows.length} ענפים</td>
                  <td className="p-3 text-left font-mono">{fmtNum(totalPremium)}</td>
                  <td className="p-3 text-left font-mono text-blue-700">{fmtNum(totalUpr)}</td>
                  <td className="p-3 text-left font-mono text-emerald-700">{fmtNum(totalEarned)}</td>
                </tr>
              </tfoot>
            )}
          </table>
        </div>
      </div>
    </div>
  );
}
