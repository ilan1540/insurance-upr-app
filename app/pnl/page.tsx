"use client";

import { useState, useMemo, useEffect } from "react";
import { getPnLReport } from "@/app/actions/pl-actions";
import { getParamYears } from "@/app/actions/report-actions";

export default function PnLReportView() {
  const [availableYears, setAvailableYears] = useState<number[]>([]);
  const [year,  setYear]  = useState<number>(new Date().getFullYear());
  const [month, setMonth] = useState(1);

  useEffect(() => {
    getParamYears().then(years => {
      setAvailableYears(years);
      if (years.length > 0) setYear(years[0]);
    });
  }, []);
  const [loading, setLoading] = useState(false);
  const [rawData, setRawData] = useState<any>(null);

  // פרמטרים לסימולציה (שינוי באחוזים יחסיים)
  const [simLrDelta,         setSimLrDelta]         = useState(0);   // נקודות אחוז ל-LR
  const [simPremiumFactor,   setSimPremiumFactor]   = useState(100); // % מהפרמיה המקורית
  const [simAgentCommDelta,  setSimAgentCommDelta]  = useState(0);   // נקודות אחוז לעמלת סוכן
  const [simRiPctDelta,      setSimRiPctDelta]      = useState(0);   // נקודות אחוז לפרמיה ב"מ
  const [simRiCommDelta,     setSimRiCommDelta]     = useState(0);   // נקודות אחוז לעמלת ב"מ

  const fetchReport = async () => {
    setLoading(true);
    const res = await getPnLReport(year, month);
    if (res.success) {
      setRawData(res);
      setSimLrDelta(0);
      setSimPremiumFactor(100);
      setSimAgentCommDelta(0);
      setSimRiPctDelta(0);
      setSimRiCommDelta(0);
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
      const earnedGross = row.earnedGross * factor;

      // עמלת סוכן: % מקורי + דלתא
      const newAgentPct     = Math.max(0, row.agentCommPct + simAgentCommDelta);
      const agentCommission = earnedGross * newAgentPct / 100;

      // פרמיה ב"מ: % מקורי + דלתא
      const newRiPct    = Math.max(0, row.reinsurancePct + simRiPctDelta);
      const riPremium   = earnedGross * newRiPct / 100;

      // עמלת ב"מ: % מקורי + דלתא (מוחל על פרמיית ב"מ המסימולצת)
      const newRiCommPct       = Math.max(0, row.reinsuranceCommPct + simRiCommDelta);
      const riCommEarned       = riPremium * newRiCommPct / 100;
      const netReinsuranceCost = riPremium - riCommEarned;

      // תביעות: LR מקורי + דלתא — ברוטו וחלק ב"מ
      const newLr      = Math.max(0, row.lr + simLrDelta);
      const claimsGross = earnedGross * newLr / 100;
      const claimsRI    = riPremium   * newLr / 100;   // ב"מ שותף בתביעות
      const claimsNet   = claimsGross - claimsRI;

      const underwritingProfit = earnedGross - agentCommission - netReinsuranceCost - claimsNet;

      return {
        ...row,
        earnedGross,
        agentCommission,
        riPremium,
        riCommEarned,
        netReinsuranceCost,
        claimsGross,
        claimsRI,
        claimsNet,
        underwritingProfit,
        currentLr:        newLr,
        currentAgentPct:  newAgentPct,
        currentRiPct:     newRiPct,
        currentRiCommPct: newRiCommPct,
      };
    });

    return {
      rows,
      totals: {
        earnedGross:        rows.reduce((s: number, r: any) => s + r.earnedGross,        0),
        agentCommission:    rows.reduce((s: number, r: any) => s + r.agentCommission,    0),
        riPremium:          rows.reduce((s: number, r: any) => s + r.riPremium,          0),
        riCommEarned:       rows.reduce((s: number, r: any) => s + r.riCommEarned,       0),
        claimsGross:        rows.reduce((s: number, r: any) => s + r.claimsGross,        0),
        claimsRI:           rows.reduce((s: number, r: any) => s + r.claimsRI,           0),
        profit:             rows.reduce((s: number, r: any) => s + r.underwritingProfit, 0),
      }
    };
  }, [rawData, simLrDelta, simPremiumFactor, simAgentCommDelta, simRiPctDelta, simRiCommDelta]);

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-4xl shadow-xl border border-gray-100" dir="rtl">
      
      {/* פילטרים ושליפה */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8 bg-slate-50 p-6 rounded-2xl border border-slate-100">
        <div className="flex flex-col gap-1">
          <label className="text-xs font-bold text-slate-500 mr-1">שנה:</label>
          <select value={year} onChange={(e) => setYear(Number(e.target.value))} className="p-3 rounded-xl border-gray-200">
            {availableYears.map(y => <option key={y} value={y}>{y}</option>)}
          </select>
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-xs font-bold text-slate-500 mr-1">חודש (YTD — עד סוף):</label>
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
            <div className="flex items-center justify-between mb-5">
              <h4 className="text-indigo-900 font-black flex items-center gap-2">
                <span>🎮</span> סימולטור תרחישים (What-If Analysis)
              </h4>
              <button
                onClick={() => { setSimLrDelta(0); setSimPremiumFactor(100); setSimAgentCommDelta(0); setSimRiPctDelta(0); setSimRiCommDelta(0); }}
                className="text-xs text-indigo-400 hover:text-indigo-700 underline"
              >
                איפוס
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              {/* Loss Ratio */}
              <SliderRow
                label="שינוי ב-Loss Ratio"
                value={simLrDelta} unit="נק׳ אחוז"
                min={-20} max={20} step={0.5}
                color={simLrDelta > 0 ? "text-red-600" : simLrDelta < 0 ? "text-green-600" : "text-slate-500"}
                onChange={setSimLrDelta}
              />

              {/* נפח פרמיה */}
              <SliderRow
                label="נפח פרמיה (צמיחה/קיטון)"
                value={simPremiumFactor} unit="% מהמקור"
                min={50} max={150} step={1}
                color="text-indigo-600"
                onChange={setSimPremiumFactor}
                showSign={false}
              />

              {/* עמלת סוכן */}
              <SliderRow
                label="שינוי בעמלת סוכן"
                value={simAgentCommDelta} unit="נק׳ אחוז"
                min={-5} max={5} step={0.1}
                color={simAgentCommDelta > 0 ? "text-red-600" : simAgentCommDelta < 0 ? "text-green-600" : "text-slate-500"}
                onChange={setSimAgentCommDelta}
              />

              {/* פרמיה ב"מ */}
              <SliderRow
                label='שינוי בפרמיה לביטוח משנה'
                value={simRiPctDelta} unit="נק׳ אחוז"
                min={-10} max={10} step={0.1}
                color={simRiPctDelta > 0 ? "text-red-600" : simRiPctDelta < 0 ? "text-green-600" : "text-slate-500"}
                onChange={setSimRiPctDelta}
              />

              {/* עמלת ב"מ */}
              <SliderRow
                label='שינוי בעמלת ביטוח משנה'
                value={simRiCommDelta} unit="נק׳ אחוז"
                min={-10} max={10} step={0.1}
                color={simRiCommDelta > 0 ? "text-green-600" : simRiCommDelta < 0 ? "text-red-600" : "text-slate-500"}
                onChange={setSimRiCommDelta}
              />

            </div>
          </div>

          {/* כרטיסי סיכום מסימולצים */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
            <div className="bg-white border p-4 rounded-2xl shadow-sm">
              <span className="text-slate-400 text-xs block mb-1 font-bold">פרמיה שהורווחה YTD</span>
              <span className="text-xl font-black text-slate-800">{Math.round(simulatedData.totals.earnedGross).toLocaleString()} ₪</span>
            </div>
            <div className="bg-rose-50 border border-rose-100 p-4 rounded-2xl shadow-sm">
              <span className="text-rose-400 text-xs block mb-1 font-bold">עמלת סוכן</span>
              <span className="text-xl font-black text-rose-700">
                -{Math.round(simulatedData.totals.agentCommission).toLocaleString()} ₪
              </span>
            </div>
            <div className="bg-purple-50 border border-purple-100 p-4 rounded-2xl shadow-sm">
              <span className="text-purple-400 text-xs block mb-1 font-bold">עלות ב"מ נטו</span>
              <span className="text-xl font-black text-purple-700">
                -{Math.round(simulatedData.totals.riPremium - simulatedData.totals.riCommEarned).toLocaleString()} ₪
              </span>
              <span className="text-[10px] text-slate-400 block">
                פרמיה: {Math.round(simulatedData.totals.riPremium).toLocaleString()} | עמלה: +{Math.round(simulatedData.totals.riCommEarned).toLocaleString()}
              </span>
            </div>
            <div className="bg-orange-50 border border-orange-100 p-4 rounded-2xl shadow-sm">
              <span className="text-orange-400 text-xs block mb-1 font-bold">תביעות נטו YTD</span>
              <span className="text-xl font-black text-orange-700">
                -{Math.round(simulatedData.rows.reduce((s: number, r: any) => s + r.claimsNet, 0)).toLocaleString()} ₪
              </span>
              <span className="text-[10px] text-slate-400 block">
                ברוטו: {Math.round(simulatedData.rows.reduce((s: number, r: any) => s + r.claimsGross, 0)).toLocaleString()} | ב"מ: +{Math.round(simulatedData.rows.reduce((s: number, r: any) => s + r.claimsRI, 0)).toLocaleString()}
              </span>
            </div>
            <div className={`p-4 rounded-2xl shadow-lg border-b-4 transition-colors duration-300 ${simulatedData.totals.profit >= 0 ? 'bg-green-50 border-green-500' : 'bg-red-50 border-red-500'}`}>
              <span className="text-slate-500 text-xs block mb-1 font-bold">רווח חתמי YTD</span>
              <span className={`text-xl font-black ${simulatedData.totals.profit >= 0 ? 'text-green-700' : 'text-red-700'}`}>
                {Math.round(simulatedData.totals.profit).toLocaleString()} ₪
              </span>
            </div>
          </div>

          {/* טבלת הנתונים */}
          <div className="border border-slate-100 rounded-3xl overflow-hidden shadow-sm">
            <table className="w-full text-right text-sm">
              <thead>
                <tr className="bg-slate-800 text-white text-xs">
                  <th className="p-4">ענף</th>
                  <th className="p-4 text-left">פרמיה שהורווחה</th>
                  <th className="p-4 text-left text-rose-300">עמלת סוכן</th>
                  <th className="p-4 text-left text-purple-200">פרמיה ב"מ</th>
                  <th className="p-4 text-left text-emerald-300">עמלת ב"מ</th>
                  <th className="p-4 text-left text-orange-300">תביעות ברוטו</th>
                  <th className="p-4 text-left text-teal-300">חלק ב"מ בתביעות</th>
                  <th className="p-4 text-left bg-slate-700">רווח/הפסד</th>
                </tr>
              </thead>
              <tbody>
                {simulatedData.rows.map((row: any, i: number) => (
                  <tr key={i} className="border-b last:border-0 hover:bg-slate-50 transition-colors">
                    <td className="p-4 font-bold text-slate-700">ענף {row.branchNumber}</td>
                    <td className="p-4 text-left font-mono text-slate-800">{Math.round(row.earnedGross).toLocaleString()} ₪</td>
                    <td className="p-4 text-left font-mono text-rose-600">
                      -{Math.round(row.agentCommission).toLocaleString()} ₪
                      <span className="text-[10px] block opacity-60">({row.currentAgentPct?.toFixed(1)}%)</span>
                    </td>
                    <td className="p-4 text-left font-mono text-purple-600">
                      -{Math.round(row.riPremium).toLocaleString()} ₪
                      <span className="text-[10px] block opacity-60">({row.currentRiPct?.toFixed(1)}%)</span>
                    </td>
                    <td className="p-4 text-left font-mono text-emerald-600">
                      +{Math.round(row.riCommEarned).toLocaleString()} ₪
                      <span className="text-[10px] block opacity-60">({row.currentRiCommPct?.toFixed(1)}%)</span>
                    </td>
                    <td className="p-4 text-left font-mono text-orange-600">
                      -{Math.round(row.claimsGross).toLocaleString()} ₪
                      <span className="text-[10px] block opacity-60">({row.currentLr.toFixed(1)}% LR)</span>
                    </td>
                    <td className="p-4 text-left font-mono text-teal-600">
                      +{Math.round(row.claimsRI).toLocaleString()} ₪
                    </td>
                    <td className={`p-4 text-left font-black font-mono ${row.underwritingProfit >= 0 ? 'text-green-600 bg-green-50/40' : 'text-red-600 bg-red-50/40'}`}>
                      {Math.round(row.underwritingProfit).toLocaleString()} ₪
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="bg-slate-100 font-black text-sm">
                  <td className="p-4">סה"כ</td>
                  <td className="p-4 text-left font-mono">{Math.round(simulatedData.totals.earnedGross).toLocaleString()} ₪</td>
                  <td className="p-4 text-left font-mono text-rose-600">
                    -{Math.round(simulatedData.rows.reduce((s: number, r: any) => s + r.agentCommission, 0)).toLocaleString()} ₪
                  </td>
                  <td className="p-4 text-left font-mono text-purple-600">
                    -{Math.round(simulatedData.rows.reduce((s: number, r: any) => s + r.riPremium, 0)).toLocaleString()} ₪
                  </td>
                  <td className="p-4 text-left font-mono text-emerald-600">
                    +{Math.round(simulatedData.rows.reduce((s: number, r: any) => s + r.riCommEarned, 0)).toLocaleString()} ₪
                  </td>
                  <td className="p-4 text-left font-mono text-orange-600">
                    -{Math.round(simulatedData.rows.reduce((s: number, r: any) => s + r.claimsGross, 0)).toLocaleString()} ₪
                  </td>
                  <td className="p-4 text-left font-mono text-teal-600">
                    +{Math.round(simulatedData.rows.reduce((s: number, r: any) => s + r.claimsRI, 0)).toLocaleString()} ₪
                  </td>
                  <td className={`p-4 text-left font-mono font-black ${simulatedData.totals.profit >= 0 ? 'text-green-700' : 'text-red-700'}`}>
                    {Math.round(simulatedData.totals.profit).toLocaleString()} ₪
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Slider row helper ────────────────────────────────────────────────────────
function SliderRow({
  label, value, unit, min, max, step, color, onChange, showSign = true,
}: {
  label: string; value: number; unit: string;
  min: number; max: number; step: number;
  color: string; onChange: (v: number) => void; showSign?: boolean;
}) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm font-bold">
        <span className="text-slate-600">{label}:</span>
        <span className={color}>
          {showSign && value > 0 ? "+" : ""}{value}{unit === "% מהמקור" ? "" : " "}
          {unit === "% מהמקור" ? `% מהמקור` : unit}
        </span>
      </div>
      <input
        type="range" min={min} max={max} step={step} value={value}
        onChange={e => onChange(parseFloat(e.target.value))}
        className="w-full h-2 bg-indigo-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
      />
      <div className="flex justify-between text-[10px] text-slate-400">
        <span>{showSign && min > 0 ? "+" : ""}{min}</span>
        <span>0</span>
        <span>+{max}</span>
      </div>
    </div>
  );
}