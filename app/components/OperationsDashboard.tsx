"use client";
import { useState } from "react";
import { downloadTemplate } from "@/app/actions/template-actions";
import { uploadBranchParamsCSV, uploadPremiumActualsCSV, uploadClaimsActualsCSV, uploadActuarialCSV, generateMonthlyBudgetActuals } from "@/app/actions/data-actions";
import { uploadAdminExpenseCSV } from "@/app/actions/admin-expense-actions";
import { uploadBranchesCSV } from "@/app/actions/branch-actions";

type Status = { msg: string; type: "success" | "error" } | null;

export default function OperationsControl() {
  const [status, setStatus]           = useState<Status>(null);
  const [loadingType, setLoadingType] = useState<string | null>(null);
  const [budgetYear, setBudgetYear]   = useState(new Date().getFullYear());

  const handleDownload = async (
    type: 'params' | 'premium-actuals' | 'claims-actuals' | 'actuarial' | 'admin-expense' | 'branches' | 'budget-monthly-update'
  ) => {
    const { content, fileName } = await downloadTemplate(type);
    const blob = new Blob([content], { type: "text/csv;charset=utf-8;" });
    const url  = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", fileName);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    uploadFn: (fd: FormData) => Promise<{ success: boolean; count?: number; error?: string }>,
    label: string
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setLoadingType(label);
    setStatus(null);
    const fd = new FormData();
    fd.append("file", file);
    try {
      const res = await uploadFn(fd);
      if (res.success) setStatus({ msg: `✔ נטענו ${res.count} רשומות — ${label}`, type: "success" });
      else             setStatus({ msg: res.error || "שגיאה בטעינה", type: "error" });
    } catch {
      setStatus({ msg: "תקשורת נכשלה מול השרת", type: "error" });
    } finally {
      setLoadingType(null);
      e.target.value = "";
    }
  };

  const handleGenerateBudget = async () => {
    if (!confirm(
      `פעולה זו תמחק את כל נתוני הפרמיות האמת לשנת ${budgetYear} ותחליף אותם בתחזית חודשית מחושבת.\n\nהאם להמשיך?`
    )) return;
    setLoadingType("budget");
    setStatus(null);
    try {
      const res = await generateMonthlyBudgetActuals(budgetYear);
      if (res.success)
        setStatus({ msg: `✔ נוצרו ${res.count} רשומות תחזית חודשית (${res.branches} ענפים × 12 חודשים) לשנת ${budgetYear}`, type: "success" });
      else
        setStatus({ msg: res.error || "שגיאה ביצירת תחזית", type: "error" });
    } catch {
      setStatus({ msg: "תקשורת נכשלה מול השרת", type: "error" });
    } finally {
      setLoadingType(null);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 pt-4 pb-2" dir="rtl">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-black text-slate-800">מרכז קליטת נתונים</h1>
          <p className="text-xs text-slate-400">טעינת קבצי CSV לכל סוגי הנתונים</p>
        </div>
      </div>

      {status && (
        <div className={`p-3 mb-4 rounded-xl text-white text-sm font-bold animate-in fade-in slide-in-from-top-2 ${
          status.type === "success" ? "bg-emerald-500" : "bg-rose-500"
        }`}>
          {status.msg}
        </div>
      )}

      {/* גריד אחיד — כל 8 האריחים */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">

        {/* אריח 1 — תחזית חודשית אוטומטית */}
        <div className="bg-white p-3 rounded-2xl shadow-lg border border-slate-100 flex flex-col items-center">
          <div className="text-2xl mb-1.5 mt-0.5">🗓️</div>
          <h3 className="text-xs font-bold text-slate-800 text-center leading-tight">תחזית חודשית</h3>
          <p className="text-[9px] text-slate-400 mb-2 text-center">Auto Monthly Budget</p>
          <select
            value={budgetYear}
            onChange={e => setBudgetYear(Number(e.target.value))}
            className="w-full mb-2 p-1.5 rounded-xl border border-slate-200 bg-slate-50 font-bold text-slate-700 outline-none text-center text-[11px]"
          >
            {[2024, 2025, 2026, 2027].map(y => <option key={y} value={y}>{y}</option>)}
          </select>
          <button
            onClick={handleGenerateBudget}
            disabled={loadingType === "budget"}
            className={`w-full py-2 rounded-xl font-bold text-[11px] transition-all ${
              loadingType === "budget"
                ? "bg-slate-100 text-slate-400"
                : "bg-indigo-600 hover:bg-indigo-700 text-white"
            }`}
          >
            {loadingType === "budget" ? "מייצר..." : "צור תחזית"}
          </button>
          <p className="text-[8px] text-rose-500 mt-1.5 text-center">⚠ מחיקה לשנה הנבחרת</p>
        </div>

        {/* אריח 2 — עדכון תחזית חודש ספציפי */}
        <div className="bg-white p-3 rounded-2xl shadow-lg border border-slate-100 flex flex-col items-center relative">
          <button
            onClick={() => handleDownload("budget-monthly-update")}
            className="absolute top-2 left-2 text-[8px] bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded-md hover:bg-slate-200 transition-colors"
          >
            ⬇️ תבנית
          </button>
          <div className="text-2xl mb-1.5 mt-0.5">📅</div>
          <h3 className="text-xs font-bold text-slate-800 text-center leading-tight">עדכון תחזית</h3>
          <p className="text-[9px] text-slate-400 mb-2 text-center">Budget Monthly Update</p>
          <label className="w-full mt-auto">
            <input type="file" className="hidden" accept=".csv"
              onChange={(e) => handleUpload(e, uploadPremiumActualsCSV, "עדכון חודשי")}
              disabled={loadingType === "עדכון חודשי"} />
            <div className={`py-2 rounded-xl font-bold text-center text-[11px] cursor-pointer transition-all ${
              loadingType === "עדכון חודשי" ? "bg-slate-100 text-slate-400" : "bg-teal-600 hover:bg-teal-700 text-white"
            }`}>
              {loadingType === "עדכון חודשי" ? "מעבד..." : "טען CSV"}
            </div>
          </label>
        </div>

        {/* אריחי קליטה */}
        <UploadCard title="תחזית שנתית" subtitle="Params" icon="🎯" color="indigo"
          isLoading={loadingType === "תחזית"}
          onDownload={() => handleDownload("params")}
          onUpload={(e: React.ChangeEvent<HTMLInputElement>) => handleUpload(e, uploadBranchParamsCSV, "תחזית")} />

        <UploadCard title="פרמיות אמת" subtitle="Premium Actuals" icon="💎" color="emerald"
          isLoading={loadingType === "פרמיות"}
          onDownload={() => handleDownload("premium-actuals")}
          onUpload={(e: React.ChangeEvent<HTMLInputElement>) => handleUpload(e, uploadPremiumActualsCSV, "פרמיות")} />

        <UploadCard title="תביעות אמת" subtitle="Claims Actuals" icon="🩺" color="sky"
          isLoading={loadingType === "תביעות"}
          onDownload={() => handleDownload("claims-actuals")}
          onUpload={(e: React.ChangeEvent<HTMLInputElement>) => handleUpload(e, uploadClaimsActualsCSV, "תביעות")} />

        <UploadCard title="אקטואריה" subtitle="Reserves" icon="📑" color="amber"
          isLoading={loadingType === "אקטואריה"}
          onDownload={() => handleDownload("actuarial")}
          onUpload={(e: React.ChangeEvent<HTMLInputElement>) => handleUpload(e, uploadActuarialCSV, "אקטואריה")} />

        <UploadCard title='הנה"כ' subtitle="Admin Expenses" icon="🏢" color="rose"
          isLoading={loadingType === "הוצאות"}
          onDownload={() => handleDownload("admin-expense")}
          onUpload={(e: React.ChangeEvent<HTMLInputElement>) => handleUpload(e, uploadAdminExpenseCSV, "הוצאות")} />

        <UploadCard title="ענפים" subtitle="Branches" icon="🗂️" color="violet"
          isLoading={loadingType === "ענפים"}
          onDownload={() => handleDownload("branches")}
          onUpload={(e: React.ChangeEvent<HTMLInputElement>) => handleUpload(e, uploadBranchesCSV, "ענפים")} />

      </div>
    </div>
  );
}

function UploadCard({ title, subtitle, icon, color, isLoading, onDownload, onUpload }: any) {
  const colorClasses: any = {
    indigo:  "bg-indigo-600  hover:bg-indigo-700  text-white",
    emerald: "bg-emerald-600 hover:bg-emerald-700 text-white",
    sky:     "bg-sky-500     hover:bg-sky-600     text-white",
    amber:   "bg-amber-500   hover:bg-amber-600   text-white",
    rose:    "bg-rose-500    hover:bg-rose-600    text-white",
    violet:  "bg-violet-600  hover:bg-violet-700  text-white",
  };
  return (
    <div className="bg-white p-3 rounded-2xl shadow-lg border border-slate-100 flex flex-col items-center relative">
      <button onClick={onDownload}
        className="absolute top-2 left-2 text-[8px] bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded-md hover:bg-slate-200 transition-colors">
        ⬇️ תבנית
      </button>
      <div className="text-2xl mb-1.5 mt-0.5">{icon}</div>
      <h3 className="text-xs font-bold text-slate-800 text-center leading-tight">{title}</h3>
      <p className="text-[9px] text-slate-400 mb-2 text-center">{subtitle}</p>
      <label className="w-full mt-auto">
        <input type="file" className="hidden" accept=".csv" onChange={onUpload} disabled={isLoading} />
        <div className={`py-2 rounded-xl font-bold text-center text-[11px] cursor-pointer transition-all ${
          isLoading ? "bg-slate-100 text-slate-400" : colorClasses[color]
        }`}>
          {isLoading ? "מעבד..." : "טען CSV"}
        </div>
      </label>
    </div>
  );
}
