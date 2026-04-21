"use client";

import { useState, useEffect } from "react";
import { getBranchMatrixReport } from "@/app/actions/pl-actionsV";
import { getAvailableYears } from "@/app/actions/report-actions";
import { getAllBranches } from "@/app/actions/branch-actions";

const MONTHS = ["ינואר","פברואר","מרץ","אפריל","מאי","יוני","יולי","אוגוסט","ספטמבר","אוקטובר","נובמבר","דצמבר"];

type Unit = "ils" | "thousands" | "millions";

const UNIT_LABELS: Record<Unit, string> = {
  ils:       "₪",
  thousands: "אלפי ₪",
  millions:  "מליוני ₪",
};

function makeFmt(unit: Unit) {
  return (n: number): string => {
    if (unit === "thousands") return Math.ceil(n / 1000).toLocaleString("he-IL");
    if (unit === "millions")  return (n / 1_000_000).toFixed(2);
    return Math.round(n).toLocaleString("he-IL");
  };
}

function fmtPct(n: number) { return n.toFixed(1) + "%"; }

// ─── Column width by unit ────────────────────────────────────────────────────
function colW(unit: Unit) {
  if (unit === "millions")  return "min-w-[65px]";
  if (unit === "thousands") return "min-w-[80px]";
  return "min-w-[100px]";
}
function tableW(branches: any[], unit: Unit) {
  const perCol = unit === "millions" ? 70 : unit === "thousands" ? 85 : 110;
  return `${(branches.length + 2) * perCol}px`;
}

// ─── Shared prop types ───────────────────────────────────────────────────────
type RowProps = { branches: any[]; getValue: (b: any) => number; fmtN: (n: number) => string };

// ─── Cell ────────────────────────────────────────────────────────────────────
function Cell({ val, pct = false, bold = false, highlight = false, neg = false, fmtN }:
  { val: number; pct?: boolean; bold?: boolean; highlight?: boolean; neg?: boolean; fmtN: (n:number)=>string }) {
  const cls = highlight ? "text-indigo-700 font-black"
    : neg ? "text-red-600"
    : bold ? "text-slate-800 font-black"
    : "text-slate-600";
  return (
    <td className={`p-2 text-left font-mono text-xs border-r border-slate-100 ${cls}`}>
      {pct ? fmtPct(val) : fmtN(val)}
    </td>
  );
}

// ─── Section toggle row ───────────────────────────────────────────────────────
function SectionRow({ label, open, onToggle, branches, getValue, fmtN }:
  RowProps & { label: string; open: boolean; onToggle: () => void }) {
  const total = branches.reduce((s, b) => s + getValue(b), 0);
  return (
    <tr className="bg-slate-700 cursor-pointer hover:bg-slate-600 transition-colors select-none" onClick={onToggle}>
      <td className="px-3 py-1.5 text-xs font-black text-slate-200 sticky right-0 bg-slate-700 z-10">
        <span className={`inline-block text-slate-400 transition-transform text-[10px] ml-1 ${open ? "rotate-90" : ""}`}>▶</span>
        {label}
      </td>
      {branches.map(b => (
        <td key={b.branchNumber} className="p-2 text-left font-mono text-xs text-slate-300 border-r border-slate-600">
          {fmtN(getValue(b))}
        </td>
      ))}
      <td className="p-2 text-left font-mono text-xs font-black text-white border-r border-slate-600">
        {fmtN(total)}
      </td>
    </tr>
  );
}

// ─── Sub-row ─────────────────────────────────────────────────────────────────
function SubRow({ label, branches, getValue, fmtN, pct = false, sign }:
  RowProps & { label: string; pct?: boolean; sign?: "plus" | "minus" }) {
  const total = branches.reduce((s, b) => s + getValue(b), 0);
  return (
    <tr className="bg-slate-50 border-b border-slate-100">
      <td className="pr-8 pl-3 py-1.5 text-xs text-slate-500 sticky right-0 bg-slate-50 z-10">
        {sign === "minus" && <span className="text-red-400 ml-1">−</span>}
        {sign === "plus"  && <span className="text-emerald-500 ml-1">+</span>}
        {label}
      </td>
      {branches.map(b => (
        <td key={b.branchNumber} className="p-2 text-left font-mono text-xs text-slate-500 border-r border-slate-100">
          {pct ? fmtPct(getValue(b)) : fmtN(getValue(b))}
        </td>
      ))}
      <td className="p-2 text-left font-mono text-xs text-slate-600 font-bold border-r border-slate-200">
        {pct ? fmtPct(total / (branches.length || 1)) : fmtN(total)}
      </td>
    </tr>
  );
}

// ─── Summary row ─────────────────────────────────────────────────────────────
function SummaryRow({ label, branches, getValue, fmtN, pct = false, highlight = false, sign }:
  RowProps & { label: string; pct?: boolean; highlight?: boolean; sign?: "plus" | "minus" | "eq" }) {
  const total = branches.reduce((s, b) => s + getValue(b), 0);
  return (
    <tr className={`border-b border-slate-200 ${highlight ? "bg-indigo-50" : "bg-white"}`}>
      <td className={`px-3 py-2 text-xs font-black sticky right-0 z-10 ${highlight ? "bg-indigo-50 text-indigo-800" : "bg-white text-slate-700"}`}>
        {sign === "minus" && <span className="text-red-400 ml-1">−</span>}
        {sign === "plus"  && <span className="text-emerald-500 ml-1">+</span>}
        {sign === "eq"    && <span className="text-slate-400 ml-1">=</span>}
        {label}
      </td>
      {branches.map(b => (
        <Cell key={b.branchNumber} val={getValue(b)} pct={pct} bold highlight={highlight}
          neg={!highlight && !pct && getValue(b) < 0} fmtN={fmtN} />
      ))}
      <td className={`p-2 text-left font-mono text-xs font-black border-r border-slate-200 ${highlight ? "text-indigo-800" : "text-slate-800"}`}>
        {pct ? fmtPct(total / (branches.length || 1)) : fmtN(total)}
      </td>
    </tr>
  );
}

// ─── Main ────────────────────────────────────────────────────────────────────
export default function BranchMatrixReport() {
  const [year, setYear]         = useState(new Date().getFullYear());
  const [toMonth, setToMonth]   = useState(new Date().getMonth() + 1);
  const [unit, setUnit]         = useState<Unit>("ils");
  const [groupCode, setGroupCode] = useState<string>("");
  const [years, setYears]       = useState<number[]>([]);
  const [groups, setGroups]     = useState<{ code: string; name: string }[]>([]);
  const [branches, setBranches] = useState<any[]>([]);
  const [loading, setLoading]   = useState(false);
  const [showParams, setShowParams] = useState(true);

  const [openPremium, setOpenPremium] = useState(false);
  const [openCost,    setOpenCost]    = useState(false);
  const [openRi,      setOpenRi]      = useState(false);
  const [openClaims,  setOpenClaims]  = useState(false);

  useEffect(() => {
    getAvailableYears().then(setYears);
    getAllBranches().then(res => {
      if (res.branches?.length) {
        const map = new Map(res.branches.map((b: any) => [b.groupCode, b.groupName]));
        setGroups(Array.from(map.entries()).map(([code, name]) => ({ code, name: name as string })));
      }
    });
  }, []);

  const fmtN   = makeFmt(unit);
  const profit = (b: any) => b.earnedPremium - b.agentComm - b.reinsuranceCost - b.claimsNet;

  const loadReport = async () => {
    setLoading(true); setBranches([]);
    const res = await getBranchMatrixReport(year, toMonth, groupCode || undefined);
    if (res.success) setBranches(res.branches);
    setLoading(false);
  };

  return (
    <div className="max-w-full mx-auto p-6" dir="rtl">

      {/* כותרת */}
      <div className="flex items-center gap-3 mb-4">
        <span className="p-2.5 bg-violet-600 text-white rounded-xl text-xl">📊</span>
        <h1 className="text-2xl font-black text-slate-800">ניתוח רוחבי — ענפים בעמודות</h1>
      </div>

      {branches.length > 0 && (
        <div className="flex items-center gap-3 mb-4">
          <div className="flex-1 h-px bg-slate-200" />
          <span className="text-sm font-black text-slate-600 underline underline-offset-4 decoration-violet-400 decoration-2">
            ינואר–{MONTHS[toMonth - 1]} {year}
            {groupCode ? ` · ${groups.find(g => g.code === groupCode)?.name ?? groupCode}` : " · כל הענפים"}
            {" · "}{UNIT_LABELS[unit]}
          </span>
          <div className="flex-1 h-px bg-slate-200" />
        </div>
      )}

      {/* פרמטרים */}
      <div className="bg-slate-50 border border-slate-200 rounded-2xl mb-4 overflow-hidden">
        <button onClick={() => setShowParams(v => !v)}
          className="w-full flex items-center justify-between px-4 py-2.5 bg-slate-100 hover:bg-slate-200 transition-all text-xs font-bold text-slate-500">
          <span>פרמטרים לשליפה</span>
          <span className={`transition-transform ${showParams ? "rotate-180" : ""}`}>▼</span>
        </button>
        {showParams && (
          <div className="grid grid-cols-1 md:grid-cols-5 divide-y md:divide-y-0 md:divide-x md:divide-x-reverse divide-slate-200">
            <div className="p-4">
              <label className="text-xs font-bold text-slate-400 block mb-1.5">שנה</label>
              <select value={year} onChange={e => setYear(Number(e.target.value))}
                className="w-full p-2.5 rounded-xl border border-slate-200 bg-white font-bold text-slate-800 outline-none text-sm">
                {years.map(y => <option key={y} value={y}>{y}</option>)}
              </select>
            </div>
            <div className="p-4">
              <label className="text-xs font-bold text-slate-400 block mb-1.5">מצטבר עד חודש</label>
              <select value={toMonth} onChange={e => setToMonth(Number(e.target.value))}
                className="w-full p-2.5 rounded-xl border border-slate-200 bg-white font-bold text-slate-800 outline-none text-sm">
                {MONTHS.map((m, i) => <option key={i + 1} value={i + 1}>{m}</option>)}
              </select>
            </div>
            <div className="p-4">
              <label className="text-xs font-bold text-slate-400 block mb-1.5">ענף מרכז</label>
              <select value={groupCode} onChange={e => setGroupCode(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-200 bg-white font-bold text-slate-800 outline-none text-sm">
                <option value="">כל הענפים</option>
                {groups.map(g => <option key={g.code} value={g.code}>{g.name}</option>)}
              </select>
            </div>
            <div className="p-4">
              <label className="text-xs font-bold text-slate-400 block mb-1.5">אופן הצגה</label>
              <div className="flex gap-1.5">
                {(["ils", "thousands", "millions"] as Unit[]).map(u => (
                  <button key={u} onClick={() => setUnit(u)}
                    className={`flex-1 py-2 rounded-xl font-bold text-xs transition-all ${
                      unit === u ? "bg-violet-600 text-white shadow" : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"
                    }`}>
                    {UNIT_LABELS[u]}
                  </button>
                ))}
              </div>
            </div>
            <div className="p-4 flex items-end">
              <button onClick={loadReport} disabled={loading}
                className="w-full py-2.5 bg-violet-600 text-white font-black rounded-xl hover:bg-violet-700 disabled:opacity-50 transition-all text-sm">
                {loading ? "מחשב..." : "הצג דוח"}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* טבלה */}
      {branches.length > 0 && (
        <div className="border border-slate-200 rounded-2xl overflow-auto max-h-[75vh]">
          <table className="text-right text-sm border-collapse" style={{ minWidth: tableW(branches, unit) }}>

            <thead className="sticky top-0 z-20">
              <tr className="bg-slate-800 text-white text-xs">
                <th className="p-3 sticky right-0 bg-slate-800 z-30 min-w-[175px]">מרכיב הדוח</th>
                {branches.map(b => (
                  <th key={b.branchNumber} className={`p-2 text-left font-bold ${colW(unit)}`}>
                    <div className="text-[10px] text-slate-300">{b.branchNumber}</div>
                    <div className="text-xs font-black truncate">{b.branchName}</div>
                  </th>
                ))}
                <th className={`p-2 text-left bg-slate-700 font-black ${colW(unit)}`}>
                  סה"כ
                  <div className="text-[10px] font-normal text-slate-400">{UNIT_LABELS[unit]}</div>
                </th>
              </tr>
            </thead>

            <tbody>
              {/* ── פרמיה ── */}
              <SectionRow label="פרמיה" open={openPremium} onToggle={() => setOpenPremium(v => !v)}
                branches={branches} getValue={b => b.grossPremium} fmtN={fmtN} />
              {openPremium && <>
                <SubRow label="UPR פתיחה"  branches={branches} getValue={b => b.uprOpening}      fmtN={fmtN} sign="plus" />
                <SubRow label="UPR סגירה"   branches={branches} getValue={b => b.uprClosing}      fmtN={fmtN} sign="minus" />
                <SubRow label="יחס UPR"     branches={branches} getValue={b => b.uprRatio * 100}  fmtN={fmtN} pct />
              </>}
              <SummaryRow label="פרמיה שהורווחה" branches={branches} getValue={b => b.earnedPremium} fmtN={fmtN} sign="eq" />

              {/* ── עלויות ── */}
              <SectionRow label="עלויות רכישה (DUC)" open={openCost} onToggle={() => setOpenCost(v => !v)}
                branches={branches} getValue={b => b.agentComm} fmtN={fmtN} />
              {openCost && <>
                <SubRow label="DAC סגירה"       branches={branches} getValue={b => b.dacClosing}              fmtN={fmtN} />
                <SubRow label="שינוי DAC"        branches={branches} getValue={b => b.dacOpening - b.dacClosing} fmtN={fmtN} />
                <SubRow label='עמלת ב"מ נדחית'  branches={branches} getValue={b => b.riDeferredClose}         fmtN={fmtN} />
              </>}
              <SummaryRow label="עמלת סוכן שהוכרה" branches={branches} getValue={b => b.agentComm} fmtN={fmtN} sign="minus" />

              {/* ── ביטוח משנה ── */}
              <SectionRow label="ביטוח משנה" open={openRi} onToggle={() => setOpenRi(v => !v)}
                branches={branches} getValue={b => b.reinsuranceCost} fmtN={fmtN} />
              {openRi && <>
                <SubRow label='פרמיה לב"מ (שהורווחה)' branches={branches} getValue={b => b.riPremiumPaid  * (1 - b.uprRatio)} fmtN={fmtN} sign="minus" />
                <SubRow label='עמלת ב"מ (שהוכרה)'     branches={branches} getValue={b => b.riCommReceived * (1 - b.uprRatio)} fmtN={fmtN} sign="plus" />
              </>}
              <SummaryRow label='עלות ב"מ נטו' branches={branches} getValue={b => b.reinsuranceCost} fmtN={fmtN} sign="minus" />

              {/* ── תביעות ── */}
              <SectionRow label="תביעות" open={openClaims} onToggle={() => setOpenClaims(v => !v)}
                branches={branches} getValue={b => b.claimsGross} fmtN={fmtN} />
              {openClaims && <>
                <SubRow label="ששולמו (ברוטו)"       branches={branches} getValue={b => b.claimsDetail?.claimsPaidGross  ?? 0} fmtN={fmtN} />
                <SubRow label="תלויות (outstanding)" branches={branches} getValue={b => b.claimsDetail?.outstandingGross ?? 0} fmtN={fmtN} />
                <SubRow label="IBNR"                  branches={branches} getValue={b => b.claimsDetail?.ibnrGross         ?? 0} fmtN={fmtN} />
                <SubRow label='חלק ב"מ'               branches={branches} getValue={b => b.claimsRi}                           fmtN={fmtN} sign="plus" />
              </>}
              <SummaryRow label="תביעות נטו" branches={branches} getValue={b => b.claimsNet} fmtN={fmtN} sign="minus" />

              {/* ── רווח ── */}
              <SummaryRow label="רווח חתמי נטו" branches={branches} getValue={profit} fmtN={fmtN} sign="eq" highlight />
              <SummaryRow label="מרווח % מפרמיה שהורווחה"
                branches={branches} fmtN={fmtN}
                getValue={b => b.earnedPremium > 0 ? profit(b) / b.earnedPremium * 100 : 0} pct />
              <SummaryRow label="LR בפועל"
                branches={branches} fmtN={fmtN}
                getValue={b => b.earnedPremium > 0 ? b.claimsGross / b.earnedPremium * 100 : 0} pct />
            </tbody>
          </table>
        </div>
      )}

      {!branches.length && !loading && (
        <div className="text-center text-slate-400 py-20 text-sm">בחר שנה וחודש ולחץ "הצג דוח"</div>
      )}
    </div>
  );
}
