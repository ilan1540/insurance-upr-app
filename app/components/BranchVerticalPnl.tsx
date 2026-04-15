"use client";

import { useState, useEffect } from "react";
import { getBranchComparisonReport } from "@/app/actions/pl-actionsV";
import { getAllBranches } from "@/app/actions/branch-actions";
import { getAvailableYears } from "@/app/actions/report-actions";

type Mode = "monthly" | "cumulative";

const MONTHS = ["ינואר","פברואר","מרץ","אפריל","מאי","יוני","יולי","אוגוסט","ספטמבר","אוקטובר","נובמבר","דצמבר"];

function fmt(n: number) { return Math.round(n).toLocaleString("he-IL"); }
function fmtPct(n: number) { return n.toFixed(1) + "%"; }

// ─── Section header ───────────────────────────────────────────────────────────
function SectionRow({ label }: { label: string }) {
  return (
    <tr className="bg-slate-700">
      <td colSpan={4} className="px-4 py-2 text-xs font-black text-slate-300 uppercase tracking-widest">{label}</td>
    </tr>
  );
}

// ─── Data row ────────────────────────────────────────────────────────────────
function DataRow({
  label, valA, valB, sign, bold, highlight, sub, pct
}: {
  label: string; valA: number; valB: number;
  sign?: "plus"|"minus"|"eq"; bold?: boolean; highlight?: boolean; sub?: boolean; pct?: boolean;
}) {
  const diff = valB !== 0 ? ((valA - valB) / Math.abs(valB)) * 100 : (valA !== 0 ? 100 : 0);
  const up   = diff >= 0;
  return (
    <tr className={`border-b border-slate-100 ${bold ? "font-black bg-slate-50" : ""} ${highlight ? "bg-indigo-50" : ""}`}>
      <td className={`p-3 ${sub ? "pr-8 text-slate-500" : "text-slate-700"} text-sm`}>
        {sign === "minus" && <span className="text-red-400 ml-1 text-xs">−</span>}
        {sign === "plus"  && <span className="text-emerald-500 ml-1 text-xs">+</span>}
        {sign === "eq"    && <span className="text-slate-400 ml-1 text-xs">=</span>}
        {label}
      </td>
      <td className={`p-3 text-left font-mono text-sm ${highlight ? "text-indigo-700 font-black" : sign === "minus" ? "text-red-600" : "text-slate-800"}`}>
        {pct ? fmtPct(valA) : fmt(valA)} {pct ? "" : "₪"}
      </td>
      <td className="p-3 text-left font-mono text-sm text-slate-400">
        {pct ? fmtPct(valB) : fmt(valB)} {pct ? "" : "₪"}
      </td>
      <td className={`p-3 text-left text-xs font-bold ${up ? "text-emerald-600" : "text-red-500"}`}>
        {diff === 0 ? "—" : <>{up ? "↑" : "↓"} {Math.abs(diff).toFixed(1)}%</>}
      </td>
    </tr>
  );
}

// ─── Drill-down table ─────────────────────────────────────────────────────────
function DrillDownTable({ data, label }: { data: any; label: string }) {
  if (!data.monthlyBreakdown?.length) return (
    <p className="text-slate-400 text-sm p-4">אין פירוט חודשי זמין (מצב חודשי)</p>
  );
  return (
    <div>
      <h4 className="font-black text-slate-700 mb-3 text-sm">{label} — פירוט חודשי</h4>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-right border border-slate-200 rounded-xl overflow-hidden">
          <thead className="bg-slate-700 text-white text-xs">
            <tr>
              <th className="p-2">חודש</th>
              <th className="p-2 text-left">פרמיה ברוטו</th>
              <th className="p-2 text-left">עמלת סוכן</th>
              <th className="p-2 text-left">פרמיה ב"מ</th>
              <th className="p-2 text-left">עמלת ב"מ</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {data.monthlyBreakdown.map((r: any) => (
              <tr key={r.month} className="hover:bg-slate-50">
                <td className="p-2 font-bold text-indigo-700">{MONTHS[r.month - 1]}</td>
                <td className="p-2 text-left font-mono">{fmt(r.grossPremium)}</td>
                <td className="p-2 text-left font-mono text-rose-600">{fmt(r.agentComm)}</td>
                <td className="p-2 text-left font-mono">{fmt(r.riPremium)}</td>
                <td className="p-2 text-left font-mono text-emerald-600">{fmt(r.riComm)}</td>
              </tr>
            ))}
            <tr className="bg-slate-100 font-black text-xs">
              <td className="p-2">סה"כ</td>
              <td className="p-2 text-left font-mono">{fmt(data.monthlyBreakdown.reduce((s:number,r:any)=>s+r.grossPremium,0))}</td>
              <td className="p-2 text-left font-mono text-rose-600">{fmt(data.monthlyBreakdown.reduce((s:number,r:any)=>s+r.agentComm,0))}</td>
              <td className="p-2 text-left font-mono">{fmt(data.monthlyBreakdown.reduce((s:number,r:any)=>s+r.riPremium,0))}</td>
              <td className="p-2 text-left font-mono text-emerald-600">{fmt(data.monthlyBreakdown.reduce((s:number,r:any)=>s+r.riComm,0))}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* חישובי UPR / DUC */}
      <h4 className="font-black text-slate-700 mt-5 mb-3 text-sm">חישובי UPR ו-DUC — נכון לסוף תקופה</h4>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {[
          { label: "UPR פתיחה",             val: data.uprOpening,      color: "bg-blue-50 text-blue-700" },
          { label: "UPR סגירה",              val: data.uprClosing,      color: "bg-blue-100 text-blue-800" },
          { label: "יחס UPR",                val: data.uprRatio * 100,  color: "bg-blue-50 text-blue-600", pct: true },
          { label: "DAC פתיחה",              val: data.dacOpening,      color: "bg-indigo-50 text-indigo-700" },
          { label: "DAC סגירה",              val: data.dacClosing,      color: "bg-indigo-100 text-indigo-800" },
          { label: 'עמלת ב"מ נדחית סגירה',  val: data.riDeferredClose, color: "bg-purple-50 text-purple-700" },
          { label: "DUC נטו פתיחה",          val: data.ducNetOpening,   color: "bg-cyan-50 text-cyan-700" },
          { label: "DUC נטו סגירה",          val: data.ducNetClosing,   color: "bg-cyan-100 text-cyan-800" },
        ].map((c, i) => (
          <div key={i} className={`rounded-xl p-3 ${c.color}`}>
            <p className="text-xs font-bold opacity-70 mb-1">{c.label}</p>
            <p className="font-black text-sm">{c.pct ? fmtPct(c.val) : fmt(c.val) + " ₪"}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function BranchVerticalPnl() {
  const [branches, setBranches]       = useState<any[]>([]);
  const [branch, setBranch]           = useState<number>(0);   // 0 = כל הענפים
  const [availableYears, setAvailableYears] = useState<number[]>([]);
  const [mode, setMode]               = useState<Mode>("monthly");
  const [periodA, setPeriodA]         = useState({ year: new Date().getFullYear(), month: new Date().getMonth() + 1 });
  const [periodB, setPeriodB]         = useState({ year: new Date().getFullYear() - 1, month: new Date().getMonth() + 1 });
  const [report, setReport]           = useState<any>(null);
  const [loading, setLoading]         = useState(false);
  const [drillA, setDrillA]           = useState(false);
  const [drillB, setDrillB]           = useState(false);

  useEffect(() => {
    getAllBranches().then(res => { if (res.branches?.length) setBranches(res.branches); });
    getAvailableYears().then(years => setAvailableYears(years));
  }, []);

  const selectedBranch = branches.find(b => b.branchNumber === branch);
  const branchLabel = branch === 0
    ? "כל הענפים"
    : selectedBranch ? `${selectedBranch.branchName} — ${selectedBranch.groupName}` : "";

  const loadReport = async () => {
    setLoading(true); setReport(null); setDrillA(false); setDrillB(false);
    const res = await getBranchComparisonReport(branch, periodA, periodB, mode);
    if (res.success) setReport(res);
    setLoading(false);
  };

  const calcProfit = (d: any) => d.earnedPremium - d.agentComm - d.reinsuranceCost - d.claimsNet;

  const periodLabel = (p: { year: number; month: number }) =>
    mode === "cumulative"
      ? `ינואר–${MONTHS[p.month - 1]} ${p.year}`
      : `${MONTHS[p.month - 1]} ${p.year}`;

  return (
    <div className="max-w-5xl mx-auto p-6 md:p-8 bg-white rounded-[2.5rem] shadow-xl border border-slate-100" dir="rtl">

      {/* כותרת */}
      <div className="flex items-center gap-3 mb-8">
        <span className="p-2.5 bg-blue-600 text-white rounded-xl text-xl">📊</span>
        <div>
          <h3 className="text-2xl font-black text-slate-800">ניתוח אנכי והשוואתי</h3>
          {branchLabel && <p className="text-slate-500 text-sm">{branchLabel}</p>}
        </div>
      </div>

      {/* בקרה */}
      <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 mb-8 space-y-5">

        {/* ענף */}
        <div>
          <label className="text-xs font-bold text-slate-500 block mb-1.5">ענף</label>
          <select value={branch} onChange={e => { setBranch(Number(e.target.value)); setReport(null); }}
            className="w-full p-3 rounded-xl border border-slate-200 bg-white font-bold text-slate-800 outline-none focus:ring-2 focus:ring-blue-500">
            <option value={0}>כל הענפים (סיכום כולל)</option>
            {branches.map(b => <option key={b.branchNumber} value={b.branchNumber}>{b.branchNumber} — {b.branchName}</option>)}
          </select>
        </div>

        {/* מצב תצוגה */}
        <div>
          <label className="text-xs font-bold text-slate-500 block mb-1.5">מצב נתונים</label>
          <div className="flex gap-2">
            {(["monthly", "cumulative"] as Mode[]).map(m => (
              <button key={m} onClick={() => { setMode(m); setReport(null); }}
                className={`flex-1 py-2.5 rounded-xl font-bold text-sm transition-all ${
                  mode === m ? "bg-blue-600 text-white shadow" : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"
                }`}>
                {m === "monthly" ? "חודשי" : "מצטבר (YTD)"}
              </button>
            ))}
          </div>
        </div>

        {/* תקופות */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { label: "תקופה א'", p: periodA, set: setPeriodA },
            { label: "תקופה ב' (השוואה)", p: periodB, set: setPeriodB },
          ].map(({ label, p, set }) => (
            <div key={label}>
              <label className="text-xs font-bold text-slate-500 block mb-1.5">{label}</label>
              <div className="flex gap-2">
                <select value={p.year} onChange={e => set({ ...p, year: Number(e.target.value) })}
                  className="w-24 p-2.5 rounded-xl border border-slate-200 bg-white font-bold text-slate-700 outline-none">
                  {availableYears.map(y => <option key={y} value={y}>{y}</option>)}
                </select>
                <select value={p.month} onChange={e => set({ ...p, month: Number(e.target.value) })}
                  className="flex-1 p-2.5 rounded-xl border border-slate-200 bg-white font-bold text-slate-700 outline-none">
                  {MONTHS.map((m, i) => <option key={i + 1} value={i + 1}>{m}</option>)}
                </select>
              </div>
            </div>
          ))}
        </div>

        <button onClick={loadReport} disabled={loading}
          className="w-full py-3 bg-blue-600 text-white font-black rounded-xl hover:bg-blue-700 disabled:opacity-50 transition-all">
          {loading ? "מחשב..." : "הצג השוואה"}
        </button>
      </div>

      {/* טבלה */}
      {report && (() => {
        const { dataA, dataB } = report;
        const profitA = calcProfit(dataA);
        const profitB = calcProfit(dataB);
        return (
          <div className="space-y-6">
            <div className="overflow-hidden border border-slate-200 rounded-2xl">
              <table className="w-full text-right text-sm">
                <thead className="bg-slate-800 text-white text-xs">
                  <tr>
                    <th className="p-3 w-1/2">מרכיב הדוח</th>
                    <th className="p-3 text-left">{periodLabel(periodA)}</th>
                    <th className="p-3 text-left text-slate-400">{periodLabel(periodB)}</th>
                    <th className="p-3 text-left">שינוי %</th>
                  </tr>
                </thead>
                <tbody>
                  {/* פרמיה */}
                  <SectionRow label="פרמיה" />
                  <DataRow label="פרמיה ברוטו כתובה"                sign="plus"  valA={dataA.grossPremium}    valB={dataB.grossPremium} />
                  <DataRow label="UPR פתיחת תקופה"                  sign="plus"  valA={dataA.uprOpening}      valB={dataB.uprOpening} sub />
                  <DataRow label="UPR סגירת תקופה"                  sign="minus" valA={dataA.uprClosing}      valB={dataB.uprClosing} sub />
                  <DataRow label="פרמיה שהורווחה (Earned Premium)"  sign="eq"    valA={dataA.earnedPremium}   valB={dataB.earnedPremium} bold />
                  <DataRow label="יחס UPR"                                       valA={dataA.uprRatio*100}    valB={dataB.uprRatio*100} sub pct />

                  {/* עלויות */}
                  <SectionRow label="עלויות רכישה ושינוי (DUC)" />
                  <DataRow label="עמלת סוכן שהוכרה"                 sign="minus" valA={dataA.agentComm}                          valB={dataB.agentComm} />
                  <DataRow label="DAC סגירה (נכס נדחה)"             sub          valA={dataA.dacClosing}                          valB={dataB.dacClosing} />
                  <DataRow label="שינוי DAC (פתיחה − סגירה)"        sign="plus"  valA={dataA.dacOpening - dataA.dacClosing}       valB={dataB.dacOpening - dataB.dacClosing} sub />
                  <DataRow label='עמלת ב"מ נדחית סגירה'             sub          valA={dataA.riDeferredClose}                     valB={dataB.riDeferredClose} />
                  <DataRow label="DUC נטו סגירה"                     sign="eq"   valA={dataA.ducNetClosing}                       valB={dataB.ducNetClosing} bold />

                  {/* ב"מ */}
                  <SectionRow label="ביטוח משנה" />
                  <DataRow label='פרמיה למבטח משנה (שהורווחה)'      sign="minus" valA={dataA.riPremiumPaid*(1-dataA.uprRatio)}   valB={dataB.riPremiumPaid*(1-dataB.uprRatio)} />
                  <DataRow label='עמלה ממבטח משנה (שהוכרה)'         sign="plus"  valA={dataA.riCommReceived*(1-dataA.uprRatio)}  valB={dataB.riCommReceived*(1-dataB.uprRatio)} />
                  <DataRow label="עלות ביטוח משנה נטו"               sign="eq"   valA={dataA.reinsuranceCost}                     valB={dataB.reinsuranceCost} bold />

                  {/* תביעות בפועל */}
                  <SectionRow label={`תביעות בפועל${!dataA.claimsDetail?.hasData ? ' (תחזית — אין נתוני אמת)' : ''}`} />
                  <DataRow label="תביעות ששולמו (ברוטו)"             sub          valA={dataA.claimsDetail?.claimsPaidGross ?? 0}  valB={dataB.claimsDetail?.claimsPaidGross ?? 0} />
                  <DataRow label="תביעות תלויות (outstanding)"       sub          valA={dataA.claimsDetail?.outstandingGross ?? 0} valB={dataB.claimsDetail?.outstandingGross ?? 0} />
                  <DataRow label="IBNR (עתודה לתביעות לא מדווחות)"   sub          valA={dataA.claimsDetail?.ibnrGross ?? 0}        valB={dataB.claimsDetail?.ibnrGross ?? 0} />
                  <DataRow label="הערכה אקטוארית כוללת"              sub          valA={dataA.claimsDetail?.actuarialEstGross ?? 0} valB={dataB.claimsDetail?.actuarialEstGross ?? 0} />
                  <DataRow label="תביעות בפועל ברוטו (Incurred)"     sign="minus" valA={dataA.claimsGross}                         valB={dataB.claimsGross} bold />
                  <DataRow label="חלק מבטח משנה בתביעות"             sign="plus"  valA={dataA.claimsRi}                            valB={dataB.claimsRi} sub />
                  <DataRow label="תביעות נטו"                         sign="eq"   valA={dataA.claimsNet}                           valB={dataB.claimsNet} bold />
                  <DataRow label="LR בפועל (תביעות ברוטו / פרמיה שהורווחה)" sub  valA={dataA.earnedPremium>0 ? dataA.claimsGross/dataA.earnedPremium*100 : 0} valB={dataB.earnedPremium>0 ? dataB.claimsGross/dataB.earnedPremium*100 : 0} pct />
                  <DataRow label="LR תחזית"                           sub          valA={Number(dataA.params?.expectedLrPct ?? 0)}  valB={Number(dataB.params?.expectedLrPct ?? 0)} pct />

                  {/* רווח */}
                  <SectionRow label="רווח" />
                  <DataRow label="רווח חתמי נטו"                     sign="eq"   valA={profitA}                                   valB={profitB} bold highlight />
                  <DataRow label="מרווח (% מפרמיה שהורווחה)"         sub          valA={dataA.earnedPremium>0?profitA/dataA.earnedPremium*100:0} valB={dataB.earnedPremium>0?profitB/dataB.earnedPremium*100:0} pct />
                </tbody>
              </table>
            </div>

            {/* כפתורי Drill-down */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { open: drillA, set: setDrillA, data: dataA, label: periodLabel(periodA) },
                { open: drillB, set: setDrillB, data: dataB, label: periodLabel(periodB) },
              ].map(({ open, set, data, label }, i) => (
                <div key={i} className="border border-slate-200 rounded-2xl overflow-hidden">
                  <button onClick={() => set(!open)}
                    className="w-full flex items-center justify-between p-4 bg-slate-50 hover:bg-slate-100 transition-all font-bold text-sm text-slate-700">
                    <span>🔍 Drill-down — {label}</span>
                    <span className={`transition-transform ${open ? "rotate-180" : ""}`}>▼</span>
                  </button>
                  {open && (
                    <div className="p-4">
                      <DrillDownTable data={data} label={label} />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        );
      })()}

      {!report && !loading && (
        <div className="text-center text-slate-400 py-16 text-sm">בחר ענף, מצב נתונים ותקופות ולחץ על "הצג השוואה"</div>
      )}
    </div>
  );
}
