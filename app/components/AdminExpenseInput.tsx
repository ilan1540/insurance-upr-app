"use client";

import { useState } from "react";
import { saveAdminExpense, getAdminExpenseAllocation } from "@/app/actions/admin-expense-actions";

const MONTHS = ["ינואר","פברואר","מרץ","אפריל","מאי","יוני","יולי","אוגוסט","ספטמבר","אוקטובר","נובמבר","דצמבר"];

type AllocationRow = {
  branchNumber: number;
  earnedGross: number;
  expectedClaims: number;
  premiumExpenseShare: number;
  claimsExpenseShare: number;
  totalExpenseShare: number;
  premiumAllocationPct: number;
  claimsAllocationPct: number;
};

export default function AdminExpenseInput() {
  const [year, setYear]                   = useState(new Date().getFullYear());
  const [month, setMonth]                 = useState(new Date().getMonth() + 1);
  const [premiumExpense, setPremiumExpense] = useState("");
  const [claimsExpense, setClaimsExpense]   = useState("");
  const [description, setDescription]      = useState("");
  const [loading, setLoading]             = useState(false);
  const [status, setStatus]               = useState<{ success: boolean; message: string } | null>(null);
  const [allocations, setAllocations]     = useState<AllocationRow[]>([]);
  const [showAllocation, setShowAllocation] = useState(false);

  const fmt = (n: number) => Math.round(n).toLocaleString("he-IL");
  const pct = (n: number) => n.toFixed(1) + "%";

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const pExp = parseFloat(premiumExpense.replace(/,/g, "")) || 0;
    const cExp = parseFloat(claimsExpense.replace(/,/g, ""))  || 0;
    if (pExp === 0 && cExp === 0) {
      setStatus({ success: false, message: "יש להזין לפחות סכום אחד" });
      return;
    }
    setLoading(true);
    setStatus(null);
    try {
      const res = await saveAdminExpense(year, month, pExp, cExp, description || undefined);
      if (res.success) {
        setStatus({ success: true, message: `הנתונים נשמרו בהצלחה ל-${MONTHS[month - 1]} ${year}` });
        await loadAllocation(year, month, pExp, cExp);
      } else {
        setStatus({ success: false, message: "שגיאה: " + res.error });
      }
    } finally {
      setLoading(false);
    }
  };

  const loadAllocation = async (y = year, m = month, _pe?: number, _ce?: number) => {
    setLoading(true);
    const res = await getAdminExpenseAllocation(y, m);
    if (res.success) {
      setAllocations(res.allocations as AllocationRow[]);
      if (res.expense) {
        setPremiumExpense(res.expense.premiumExpense.toString());
        setClaimsExpense(res.expense.claimsExpense.toString());
        setDescription(res.expense.description ?? "");
      }
      setShowAllocation(true);
    } else {
      setStatus({ success: false, message: res.error ?? "שגיאה" });
    }
    setLoading(false);
  };

  const totalExpense = (parseFloat(premiumExpense.replace(/,/g, "")) || 0)
                     + (parseFloat(claimsExpense.replace(/,/g, ""))  || 0);

  return (
    <div className="max-w-5xl mx-auto p-8 bg-white rounded-[2rem] shadow-xl border border-amber-50" dir="rtl">
      {/* כותרת */}
      <div className="flex items-center gap-3 mb-8">
        <div className="p-2.5 bg-amber-100 rounded-xl text-amber-600">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
              d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 11h.01M12 11h.01M15 11h.01M4 19h16a2 2 0 002-2V7a2 2 0 00-2-2H4a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </div>
        <div>
          <h3 className="text-xl font-bold text-slate-800">הוצאות הנהלה וכלליות</h3>
          <p className="text-xs text-slate-400 mt-0.5">הקצאה לענפים לפי IFRS17</p>
        </div>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* שנה + חודש */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-slate-500">שנה</label>
            <select
              value={year}
              onChange={e => setYear(Number(e.target.value))}
              className="p-3 bg-slate-50 border border-slate-200 rounded-xl font-bold focus:ring-2 focus:ring-amber-400 outline-none"
            >
              {[2024, 2025, 2026].map(y => <option key={y} value={y}>{y}</option>)}
            </select>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-slate-500">חודש</label>
            <select
              value={month}
              onChange={e => setMonth(Number(e.target.value))}
              className="p-3 bg-slate-50 border border-slate-200 rounded-xl font-bold focus:ring-2 focus:ring-amber-400 outline-none"
            >
              {MONTHS.map((name, i) => <option key={i+1} value={i+1}>{name}</option>)}
            </select>
          </div>

          {/* הוצאות מיוחסות לפרמיה */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-slate-500">
              הוצאות מיוחסות לפרמיה <span className="text-amber-500">(₪)</span>
            </label>
            <input
              type="number"
              min="0"
              step="any"
              value={premiumExpense}
              onChange={e => setPremiumExpense(e.target.value)}
              placeholder="0"
              className="p-3 bg-slate-50 border border-slate-200 rounded-xl font-mono focus:ring-2 focus:ring-amber-400 outline-none"
            />
          </div>

          {/* הוצאות מיוחסות לתביעות */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-slate-500">
              הוצאות מיוחסות לתביעות <span className="text-amber-500">(₪)</span>
            </label>
            <input
              type="number"
              min="0"
              step="any"
              value={claimsExpense}
              onChange={e => setClaimsExpense(e.target.value)}
              placeholder="0"
              className="p-3 bg-slate-50 border border-slate-200 rounded-xl font-mono focus:ring-2 focus:ring-amber-400 outline-none"
            />
          </div>
        </div>

        {/* תיאור */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold text-slate-500">תיאור (רשות)</label>
          <input
            type="text"
            value={description}
            onChange={e => setDescription(e.target.value)}
            placeholder="לדוגמה: שכר, שכירות משרדים, הוצאות מחשוב..."
            className="p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-amber-400 outline-none"
          />
        </div>

        {/* כפתורים */}
        <div className="flex gap-3">
          <button
            type="submit"
            disabled={loading}
            className="flex-1 py-3.5 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-2xl transition-all shadow-lg shadow-amber-100 disabled:bg-slate-200 disabled:text-slate-400"
          >
            {loading ? "שומר..." : "שמור הוצאות"}
          </button>
          <button
            type="button"
            onClick={() => loadAllocation()}
            disabled={loading}
            className="px-6 py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-2xl transition-all disabled:opacity-50"
          >
            הצג הקצאה
          </button>
        </div>
      </form>

      {/* הודעת סטטוס */}
      {status && (
        <div className={`mt-4 p-4 rounded-2xl text-center font-bold animate-in fade-in ${
          status.success ? "bg-green-50 text-green-700 border border-green-100" : "bg-red-50 text-red-700 border border-red-100"
        }`}>
          {status.message}
        </div>
      )}

      {/* טבלת הקצאה לפי IFRS17 */}
      {showAllocation && allocations.length > 0 && (
        <div className="mt-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-bold text-slate-700 text-lg">
              הקצאה לענפים — {MONTHS[month - 1]} {year}
            </h4>
            <div className="text-xs text-slate-400 bg-amber-50 border border-amber-100 px-3 py-1 rounded-full">
              סה"כ: {fmt(totalExpense)} ₪
            </div>
          </div>

          <div className="rounded-2xl overflow-hidden border border-slate-100 shadow-sm">
            <table className="w-full text-right border-collapse text-sm">
              <thead>
                <tr className="bg-slate-800 text-white text-xs">
                  <th className="p-3">ענף</th>
                  <th className="p-3 text-left">פרמיה שהורווחה</th>
                  <th className="p-3 text-left">תביעות צפויות</th>
                  <th className="p-3 text-left text-amber-300">חלק מהוצ׳ פרמיה</th>
                  <th className="p-3 text-left text-amber-300">חלק מהוצ׳ תביעות</th>
                  <th className="p-3 text-left bg-slate-700 text-amber-200 font-black">סה"כ הוצאות</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {allocations.map(row => (
                  <tr key={row.branchNumber} className="hover:bg-amber-50/30 transition-colors">
                    <td className="p-3 font-extrabold text-slate-700">ענף {row.branchNumber}</td>
                    <td className="p-3 text-left font-mono text-slate-600">
                      {fmt(row.earnedGross)} ₪
                      <span className="text-xs text-slate-400 mr-1">({pct(row.premiumAllocationPct)})</span>
                    </td>
                    <td className="p-3 text-left font-mono text-slate-600">
                      {fmt(row.expectedClaims)} ₪
                      <span className="text-xs text-slate-400 mr-1">({pct(row.claimsAllocationPct)})</span>
                    </td>
                    <td className="p-3 text-left font-mono text-amber-700">
                      {fmt(row.premiumExpenseShare)} ₪
                    </td>
                    <td className="p-3 text-left font-mono text-amber-700">
                      {fmt(row.claimsExpenseShare)} ₪
                    </td>
                    <td className="p-3 text-left font-black font-mono text-amber-900 bg-amber-50/40">
                      {fmt(row.totalExpenseShare)} ₪
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="bg-slate-100 font-bold text-sm">
                  <td className="p-3 text-slate-600">סה"כ</td>
                  <td className="p-3 text-left font-mono">{fmt(allocations.reduce((s,r)=>s+r.earnedGross,0))} ₪</td>
                  <td className="p-3 text-left font-mono">{fmt(allocations.reduce((s,r)=>s+r.expectedClaims,0))} ₪</td>
                  <td className="p-3 text-left font-mono text-amber-700">{fmt(allocations.reduce((s,r)=>s+r.premiumExpenseShare,0))} ₪</td>
                  <td className="p-3 text-left font-mono text-amber-700">{fmt(allocations.reduce((s,r)=>s+r.claimsExpenseShare,0))} ₪</td>
                  <td className="p-3 text-left font-black font-mono text-amber-900 bg-amber-100">{fmt(allocations.reduce((s,r)=>s+r.totalExpenseShare,0))} ₪</td>
                </tr>
              </tfoot>
            </table>
          </div>

          {/* הסבר IFRS17 */}
          <div className="mt-4 p-4 bg-blue-50/50 rounded-2xl border border-dashed border-blue-200 text-xs text-blue-700 space-y-1">
            <p className="font-bold text-blue-800 mb-1">עיקרון ההקצאה לפי IFRS17:</p>
            <p>• <strong>הוצאות מיוחסות לפרמיה</strong> — מוקצות לפי משקל הפרמיה שהורווחה של כל ענף (Earned Gross Premium)</p>
            <p>• <strong>הוצאות מיוחסות לתביעות</strong> — מוקצות לפי משקל התביעות הצפויות של כל ענף (Expected Incurred Claims)</p>
          </div>
        </div>
      )}

      {showAllocation && allocations.length === 0 && !loading && (
        <div className="mt-6 p-6 text-center text-slate-400 bg-slate-50 rounded-2xl">
          לא נמצאו נתוני UPR לתקופה זו — יש לוודא שחושב UPR לחודש הנבחר
        </div>
      )}
    </div>
  );
}
