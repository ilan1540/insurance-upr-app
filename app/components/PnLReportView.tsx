"use client";

import { useState } from "react";
import { getPnLReport } from "@/app/actions/pl-actions";

export default function PnLReportView() {
  const [year, setYear] = useState(2025);
  const [month, setMonth] = useState(1);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>(null);

  const fetchReport = async () => {
    setLoading(true);
    const res = await getPnLReport(year, month);
    if (res.success) {
      setData(res);
    } else {
      alert(res.error);
      setData(null);
    }
    setLoading(false);
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-[2rem] shadow-xl border border-gray-100" dir="rtl">
      {/* פילטרים */}
      <div className="flex flex-wrap items-end gap-4 mb-8 bg-slate-50 p-6 rounded-2xl border border-slate-100">
        <div className="flex flex-col gap-1">
          <label className="text-xs font-bold text-slate-500 mr-1">שנה:</label>
          <select value={year} onChange={(e) => setYear(Number(e.target.value))} className="p-3 rounded-xl border-gray-200 shadow-sm focus:ring-2 focus:ring-green-400">
            {[2024, 2025, 2026].map(y => <option key={y} value={y}>{y}</option>)}
          </select>
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-xs font-bold text-slate-500 mr-1">חודש:</label>
          <select value={month} onChange={(e) => setMonth(Number(e.target.value))} className="p-3 rounded-xl border-gray-200 shadow-sm focus:ring-2 focus:ring-green-400">
            {Array.from({ length: 12 }, (_, i) => <option key={i+1} value={i+1}>{i+1}</option>)}
          </select>
        </div>
        <button 
          onClick={fetchReport} 
          disabled={loading}
          className="px-8 py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl transition-all shadow-lg shadow-green-100 disabled:bg-slate-300"
        >
          {loading ? "מחשב נתונים..." : "הפק דוח P&L חזוי"}
        </button>
      </div>

      {data && (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          {/* כרטיסי סיכום עליונים */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white border-2 border-slate-50 p-6 rounded-3xl shadow-sm">
              <span className="text-slate-400 text-sm block mb-1">סה"כ פרמיה שהורווחה (UPR)</span>
              <span className="text-3xl font-black text-slate-800">{data.totals.upr.toLocaleString()} ₪</span>
            </div>
            <div className={`p-6 rounded-3xl shadow-lg border-b-8 ${data.totals.profit >= 0 ? 'bg-green-50 border-green-500' : 'bg-red-50 border-red-500'}`}>
              <span className="text-slate-500 text-sm block mb-1 font-bold">רווח חתמי חזוי (Bottom Line)</span>
              <span className={`text-3xl font-black ${data.totals.profit >= 0 ? 'text-green-700' : 'text-red-700'}`}>
                {data.totals.profit.toLocaleString()} ₪
              </span>
            </div>
          </div>

          {/* טבלת הנתונים */}
          <div className="border border-slate-100 rounded-3xl overflow-hidden shadow-sm">
            <table className="w-full text-right border-collapse">
              <thead>
                <tr className="bg-slate-800 text-white text-xs uppercase tracking-wider">
                  <th className="p-4">ענף</th>
                  <th className="p-4 text-left">פרמיה (UPR)</th>
                  <th className="p-4 text-left">עמלות סוכן</th>
                  <th className="p-4 text-left">ב"מ נטו</th>
                  <th className="p-4 text-left">תביעות (LR {data.rows[0]?.lr}%)</th>
                  <th className="p-4 text-left bg-slate-700">רווח/הפסד חזוי</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {data.rows.map((row: any, i: number) => (
                  <tr key={i} className="hover:bg-slate-50 transition-colors">
                    <td className="p-4 font-extrabold text-slate-700">ענף {row.branchNumber}</td>
                    <td className="p-4 text-left font-mono">{row.uprValue.toLocaleString()} ₪</td>
                    <td className="p-4 text-left font-mono text-red-400">-{row.agentCommission.toLocaleString()}</td>
                    <td className="p-4 text-left font-mono text-red-400">-{row.netReinsuranceCost.toLocaleString()}</td>
                    <td className="p-4 text-left font-mono text-orange-500">-{row.expectedClaims.toLocaleString()}</td>
                    <td className={`p-4 text-left font-black font-mono ${row.underwritingProfit >= 0 ? 'text-green-600 bg-green-50/30' : 'text-red-600 bg-red-50/30'}`}>
                      {row.underwritingProfit.toLocaleString()} ₪
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}