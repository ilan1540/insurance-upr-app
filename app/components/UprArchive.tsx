"use client";

import { useState } from "react";
import { getUprFromArchive } from "@/app/actions/upr-actions";

const fmt = (n: number) => Math.round(n).toLocaleString("he-IL");

export default function UprArchive() {
  const [year, setYear]         = useState(2025);
  const [month, setMonth]       = useState(1);
  const [loading, setLoading]   = useState(false);
  const [archiveData, setArchiveData] = useState<any>(null);

  const fetchArchive = async () => {
    setLoading(true);
    try {
      const res = await getUprFromArchive(year, month);
      if (res.success) setArchiveData(res);
      else { alert(res.error); setArchiveData(null); }
    } catch { alert("שגיאה בתקשורת עם השרת"); }
    finally   { setLoading(false); }
  };

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white rounded-4xl shadow-xl border border-gray-50 mt-10" dir="rtl">
      {/* כותרת */}
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-amber-100 rounded-lg">
          <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
          </svg>
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-800">ארכיון UPR / DUC / הנה"כ</h3>
          <p className="text-xs text-slate-400">שליפת snapshot שמור לפי תקופה</p>
        </div>
      </div>

      {/* פילטרים */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 bg-gray-50 p-4 rounded-2xl">
        <div className="flex flex-col gap-1">
          <label className="text-xs font-bold text-gray-500">שנה:</label>
          <select value={year} onChange={(e) => setYear(Number(e.target.value))}
            className="p-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-amber-400">
            {[2024, 2025, 2026].map(y => <option key={y} value={y}>{y}</option>)}
          </select>
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-xs font-bold text-gray-500">חודש:</label>
          <select value={month} onChange={(e) => setMonth(Number(e.target.value))}
            className="p-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-amber-400">
            {Array.from({ length: 12 }, (_, i) => <option key={i+1} value={i+1}>חודש {i+1}</option>)}
          </select>
        </div>
        <button onClick={fetchArchive} disabled={loading}
          className="self-end p-3 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-xl transition-all disabled:bg-gray-300">
          {loading ? "טוען..." : "שלוף נתונים"}
        </button>
      </div>

      {archiveData && (
        <div className="animate-in fade-in zoom-in duration-300 space-y-6">

          {/* כרטיסי סיכום */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="bg-blue-50 border border-blue-100 p-4 rounded-2xl text-center">
              <span className="block text-xs text-blue-600 font-bold mb-1">סה"כ UPR</span>
              <span className="text-2xl font-black text-blue-700">{fmt(archiveData.totalUpr)} ₪</span>
            </div>
            <div className="bg-indigo-50 border border-indigo-100 p-4 rounded-2xl text-center">
              <span className="block text-xs text-indigo-600 font-bold mb-1">DUC נטו</span>
              <span className="text-2xl font-black text-indigo-700">{fmt(archiveData.totalDucNet)} ₪</span>
            </div>
            <div className="bg-amber-50 border border-amber-100 p-4 rounded-2xl text-center">
              <span className="block text-xs text-amber-600 font-bold mb-1">הנה"כ נדחית</span>
              <span className="text-2xl font-black text-amber-700">{fmt(archiveData.totalDeferred)} ₪</span>
            </div>
          </div>

          {/* טבלה מפורטת */}
          <div className="border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
            <table className="w-full text-right text-sm">
              <thead className="bg-slate-800 text-white text-xs">
                <tr>
                  <th className="p-3">ענף</th>
                  <th className="p-3 text-left text-blue-300">UPR (₪)</th>
                  <th className="p-3 text-left text-indigo-300">DAC ברוטו</th>
                  <th className="p-3 text-left text-purple-300">עמלת ב"מ נדחית</th>
                  <th className="p-3 text-left text-cyan-300">DUC נטו</th>
                  <th className="p-3 text-left text-amber-300">הנה"כ הוכרה</th>
                  <th className="p-3 text-left text-orange-300">הנה"כ נדחית</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {archiveData.rows?.map((row: any, i: number) => (
                  <tr key={i} className="hover:bg-slate-50/50 transition-colors">
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
                <tr className="bg-slate-100 font-bold">
                  <td className="p-3">סה"כ</td>
                  <td className="p-3 text-left font-mono text-blue-700">{fmt(archiveData.rows.reduce((s: number, r: any) => s + r.uprValue, 0))}</td>
                  <td className="p-3 text-left font-mono text-indigo-600">{fmt(archiveData.rows.reduce((s: number, r: any) => s + r.dacGross, 0))}</td>
                  <td className="p-3 text-left font-mono text-purple-600">({fmt(archiveData.rows.reduce((s: number, r: any) => s + r.deferredRIComm, 0))})</td>
                  <td className="p-3 text-left font-mono text-cyan-700">{fmt(archiveData.rows.reduce((s: number, r: any) => s + r.ducNet, 0))}</td>
                  <td className="p-3 text-left font-mono text-amber-700">{fmt(archiveData.rows.reduce((s: number, r: any) => s + r.recognizedExpense, 0))}</td>
                  <td className="p-3 text-left font-mono text-orange-600">{fmt(archiveData.rows.reduce((s: number, r: any) => s + r.deferredExpense, 0))}</td>
                </tr>
              </tfoot>
            </table>
          </div>

          {archiveData.rows.length === 0 && (
            <p className="text-center text-slate-400 py-6">לא נמצאו נתונים שמורים לתקופה זו — יש להריץ חישוב תחילה</p>
          )}
        </div>
      )}
    </div>
  );
}
