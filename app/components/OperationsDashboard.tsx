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
    <div className="max-w-7xl mx-auto p-6" dir="rtl">
      <div className="mb-10">
        <h1 className="text-3xl font-black text-slate-800">מרכז קליטת נתונים</h1>
        <p className="text-slate-500">טעינת קבצי CSV לכל סוגי הנתונים</p>
      </div>

      {status && (
        <div className={`p-4 mb-8 rounded-2xl text-white font-bold animate-in fade-in slide-in-from-top-2 ${
          status.type === "success" ? "bg-emerald-500" : "bg-rose-500"
        }`}>
          {status.msg}
        </div>
      )}

      {/* כפתור יצירת תחזית חודשית */}
      <div className="mb-8 p-6 bg-indigo-50 border-2 border-indigo-100 rounded-3xl" dir="rtl">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex-1">
            <h2 className="font-black text-indigo-900 text-lg mb-1">יצירת תחזית חודשית אוטומטית</h2>
            <p className="text-sm text-indigo-700">
              מחלק את <span className="font-bold">expectedGrossPremium</span> ב-12 ויוצר שורת PremiumActuals לכל ענף לכל חודש —
              startDate = תחילת חודש, endDate = תחילת אותו חודש שנה הבאה.
            </p>
            <p className="text-xs text-rose-600 mt-1 font-bold">
              ⚠ מחיקה וכתיבה מחדש של כל פרמיות האמת לשנה הנבחרת
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <select
              value={budgetYear}
              onChange={e => setBudgetYear(Number(e.target.value))}
              className="p-3 rounded-xl border border-indigo-200 bg-white font-bold text-indigo-800 outline-none"
            >
              {[2024, 2025, 2026, 2027].map(y => <option key={y} value={y}>{y}</option>)}
            </select>
            <button
              onClick={handleGenerateBudget}
              disabled={loadingType === "budget"}
              className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl transition-all disabled:opacity-50 whitespace-nowrap"
            >
              {loadingType === "budget" ? "מייצר..." : "צור תחזית חודשית"}
            </button>
          </div>
        </div>
      </div>

      {/* עדכון תחזית לחודש ספציפי */}
      <div className="mb-8 p-6 bg-teal-50 border-2 border-teal-100 rounded-3xl" dir="rtl">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex-1">
            <h2 className="font-black text-teal-900 text-lg mb-1">עדכון תחזית — חודש ספציפי</h2>
            <p className="text-sm text-teal-700">
              קובץ CSV עם שורה לכל ענף לחודש אחד בלבד. מחליף רק את החודש שמופיע בקובץ — שאר החודשים לא נפגעים.
            </p>
            <p className="text-xs text-slate-500 mt-1">
              מבנה זהה לפרמיות אמת: year, month, branchNumber, startDate, endDate, grossPremium, agentComm, reinsurancePremium, reinsuranceComm
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => handleDownload("budget-monthly-update")}
              className="px-4 py-2.5 bg-white border-2 border-teal-300 text-teal-700 font-bold rounded-xl hover:bg-teal-50 transition-all text-sm whitespace-nowrap"
            >
              ⬇️ תבנית עדכון חודשי
            </button>
            <label>
              <input
                type="file"
                className="hidden"
                accept=".csv"
                onChange={(e) => handleUpload(e, uploadPremiumActualsCSV, "עדכון חודשי")}
                disabled={loadingType === "עדכון חודשי"}
              />
              <div className={`px-6 py-2.5 rounded-xl font-bold text-sm cursor-pointer transition-all whitespace-nowrap ${
                loadingType === "עדכון חודשי"
                  ? "bg-slate-100 text-slate-400"
                  : "bg-teal-600 hover:bg-teal-700 text-white"
              }`}>
                {loadingType === "עדכון חודשי" ? "מעבד..." : "טען עדכון חודשי"}
              </div>
            </label>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">

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

        <UploadCard title='הוצ׳ הנה"כ' subtitle="Admin Expenses" icon="🏢" color="rose"
          isLoading={loadingType === "הוצאות"}
          onDownload={() => handleDownload("admin-expense")}
          onUpload={(e: React.ChangeEvent<HTMLInputElement>) => handleUpload(e, uploadAdminExpenseCSV, "הוצאות")} />

        <UploadCard title="ענפים וקיבוצים" subtitle="Branches" icon="🗂️" color="violet"
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
    <div className="bg-white p-6 rounded-[2.5rem] shadow-xl border border-slate-100 flex flex-col items-center relative">
      <button onClick={onDownload}
        className="absolute top-3 left-3 text-[10px] bg-slate-100 text-slate-500 px-2 py-1 rounded-lg hover:bg-slate-200 transition-colors">
        ⬇️ תבנית
      </button>
      <div className="text-4xl mb-3 mt-2">{icon}</div>
      <h3 className="text-base font-bold text-slate-800 text-center">{title}</h3>
      <p className="text-[10px] text-slate-400 mb-4 text-center">{subtitle}</p>
      <label className="w-full">
        <input type="file" className="hidden" accept=".csv" onChange={onUpload} disabled={isLoading} />
        <div className={`py-2.5 rounded-2xl font-bold text-center text-sm cursor-pointer transition-all ${
          isLoading ? "bg-slate-100 text-slate-400" : colorClasses[color]
        }`}>
          {isLoading ? "מעבד..." : "טען CSV"}
        </div>
      </label>
    </div>
  );
}
