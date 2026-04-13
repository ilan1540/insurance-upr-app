"use client";

import { useState, useMemo } from "react";
import { getPnLReport } from "@/app/actions/pl-actions";

export default function PnLReportView() {
  const [year, setYear] = useState(2025);
  const [month, setMonth] = useState(1);
  const [loading, setLoading] = useState(false);
  const [rawData, setRawData] = useState<any>(null);

  // פרמטרים לסימולציה (שינוי באחוזים יחסיים)
  const [simLrDelta, setSimLrDelta] = useState(0); // שינוי בנקודות אחוז ל-LR
  const [simPremiumFactor, setSimPremiumFactor] = useState(100); // אחוז מהפרמיה המקורית (100% = ללא שינוי)

  const fetchReport = async () => {
    setLoading(true);
    const res = await getPnLReport(year, month);
    if (res.success) {
      setRawData(res);
      // איפוס סימולציה בכל שליפה חדשה
      setSimLrDelta(0);
      setSimPremiumFactor(100);
    } else {
      alert(res.error);
      setRawData(null);
    }
    setLoading(false);
  };

  // חישוב הנתונים המסימולצים (Client-side calculation)
  const simulatedData = useMemo(() => {
    if (!rawData) return null;

    const factor = simPremiumFactor / 100;
    
    const rows = rawData.rows.map((row: any) => {
      // פרמיה שהורווחה מסימולצת
      const earnedGross        = row.earnedGross        * factor;
      const netEarnedPremium   = row.netEarnedPremium   * factor;
      const agentCommission    = row.agentCommission    * factor;
      const netReinsuranceCost = row.netReinsuranceCost * factor;

      // LR מסימולץ
      const newLr        = Math.max(0, row.lr + simLrDelta);
      const expectedClaims = (earnedGross * newLr) / 100;

      const underwritingProfit = netEarnedPremium - agentCommission - netReinsuranceCost - expectedClaims;

      return {
        ...row,
        earnedGross,
        netEarnedPremium,
        agentCommission,
        netReinsuranceCost,
        expectedClaims,
        underwritingProfit,
        currentLr: newLr,
      };
    });

    return {
      rows,
      totals: {
        earnedGross: rows.reduce((s: number, r: any) => s + r.earnedGross, 0),
        profit:      rows.reduce((s: number, r: any) => s + r.underwritingProfit, 0),
      }
    };
  }, [rawData, simLrDelta, simPremiumFactor]);

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-[2rem] shadow-xl border border-gray-100" dir="rtl">
      
      {/* פילטרים ושליפה */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8 bg-slate-50 p-6 rounded-2xl border border-slate-100">
        <div className="flex flex-col gap-1">
          <label className="text-xs font-bold text-slate-500 mr-1">שנה:</label>
          <select value={year} onChange={(e) => setYear(Number(e.target.value))} className="p-3 rounded-xl border-gray-200">
            {[2024, 2025, 2026].map(y => <option key={y} value={y}>{y}</option>)}
          </select>
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-xs font-bold text-slate-500 mr-1">חודש:</label>
          <select value={month} onChange={(e) => setMonth(Number(e.target.value))} className="p-3 rounded-xl border-gray-200">
            {Array.from({ length: 12 }, (_, i) => <option key={i+1} value={i+1}>{i+1}</option>)}
          </select>
        </div>
        <div className="md:col-span-2 flex items-end">
          <button onClick={fetchReport} disabled={loading} className="w-full py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-all">
            {loading ? "מחשב..." : "הפק דוח בסיס"}
          </button>
        </div>
      </div>

      {simulatedData && (
        <div className="animate-in fade-in duration-500">
          
          {/* פאנל סימולציה (What-If) */}
          <div className="mb-8 p-6 bg-indigo-50 rounded-3xl border-2 border-indigo-100 shadow-inner">
            <h4 className="text-indigo-900 font-black mb-4 flex items-center gap-2">
              <span>🎮</span> סימולטור תרחישים (What-If Analysis)
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* סליידר LR */}
              <div className="space-y-3">
                <div className="flex justify-between text-sm font-bold">
                  <span className="text-slate-600">שינוי ב-Loss Ratio:</span>
                  <span className={simLrDelta >= 0 ? "text-red-600" : "text-green-600"}>
                    {simLrDelta > 0 ? "+" : ""}{simLrDelta}% נקודות
                  </span>
                </div>
                <input 
                  type="range" min="-20" max="20" step="0.5" 
                  value={simLrDelta} onChange={(e) => setSimLrDelta(parseFloat(e.target.value))}
                  className="w-full h-2 bg-indigo-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                />
              </div>

              {/* סליידר פרמיה */}
              <div className="space-y-3">
                <div className="flex justify-between text-sm font-bold">
                  <span className="text-slate-600">שינוי בנפח פרמיה (צמיחה/קיטון):</span>
                  <span className="text-indigo-600">{simPremiumFactor}% מהמקור</span>
                </div>
                <input 
                  type="range" min="50" max="150" step="1" 
                  value={simPremiumFactor} onChange={(e) => setSimPremiumFactor(parseInt(e.target.value))}
                  className="w-full h-2 bg-indigo-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                />
              </div>
            </div>
          </div>

          {/* כרטיסי סיכום מסימולצים */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white border p-6 rounded-3xl shadow-sm">
              <span className="text-slate-400 text-sm block mb-1 font-bold">פרמיה שהורווחה ברוטו (סימולציה)</span>
              <span className="text-3xl font-black text-slate-800">{Math.round(simulatedData.totals.earnedGross).toLocaleString()} ₪</span>
            </div>
            <div className={`p-6 rounded-3xl shadow-lg border-b-8 transition-colors duration-300 ${simulatedData.totals.profit >= 0 ? 'bg-green-50 border-green-500' : 'bg-red-50 border-red-500'}`}>
              <span className="text-slate-500 text-sm block mb-1 font-bold">רווח חתמי חזוי בתרחיש זה</span>
              <span className={`text-3xl font-black ${simulatedData.totals.profit >= 0 ? 'text-green-700' : 'text-red-700'}`}>
                {Math.round(simulatedData.totals.profit).toLocaleString()} ₪
              </span>
            </div>
          </div>

          {/* טבלת הנתונים */}
          <div className="border border-slate-100 rounded-3xl overflow-hidden shadow-sm">
            <table className="w-full text-right">
              <thead>
                <tr className="bg-slate-800 text-white text-xs">
                  <th className="p-4">ענף</th>
                  <th className="p-4 text-left">פרמיה</th>
                  <th className="p-4 text-left">תביעות (LR חזוי)</th>
                  <th className="p-4 text-left bg-slate-700">רווח/הפסד חזוי</th>
                </tr>
              </thead>
              <tbody>
                {simulatedData.rows.map((row: any, i: number) => (
                  <tr key={i} className="border-b last:border-0 hover:bg-slate-50 transition-colors">
                    <td className="p-4 font-bold text-slate-700">ענף {row.branchNumber}</td>
                    <td className="p-4 text-left font-mono">{Math.round(row.earnedGross).toLocaleString()} ₪</td>
                    <td className="p-4 text-left font-mono text-orange-600">
                      {Math.round(row.expectedClaims).toLocaleString()} ₪ 
                      <span className="text-[10px] block opacity-60">({row.currentLr.toFixed(1)}% LR)</span>
                    </td>
                    <td className={`p-4 text-left font-black font-mono ${row.underwritingProfit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {Math.round(row.underwritingProfit).toLocaleString()} ₪
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