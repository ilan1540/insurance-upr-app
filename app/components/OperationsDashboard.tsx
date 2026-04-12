"use client";
import { useState } from "react";
import { downloadTemplate } from "@/app/actions/template-actions";
import { uploadBranchParamsCSV, uploadPremiumActualsCSV, uploadClaimsActualsCSV, uploadActuarialCSV } from "@/app/actions/data-actions";
import { uploadAdminExpenseCSV } from "@/app/actions/admin-expense-actions";
import { uploadBranchesCSV } from "@/app/actions/branch-actions";

type Status = { msg: string; type: "success" | "error" } | null;

export default function OperationsControl() {
  const [status, setStatus]           = useState<Status>(null);
  const [loadingType, setLoadingType] = useState<string | null>(null);

  const handleDownload = async (
    type: 'params' | 'premium-actuals' | 'claims-actuals' | 'actuarial' | 'admin-expense' | 'branches'
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">

        <UploadCard title="תחזית שנתית" subtitle="Params" icon="🎯" color="indigo"
          isLoading={loadingType === "תחזית"}
          onDownload={() => handleDownload("params")}
          onUpload={(e) => handleUpload(e, uploadBranchParamsCSV, "תחזית")} />

        <UploadCard title="פרמיות אמת" subtitle="Premium Actuals" icon="💎" color="emerald"
          isLoading={loadingType === "פרמיות"}
          onDownload={() => handleDownload("premium-actuals")}
          onUpload={(e) => handleUpload(e, uploadPremiumActualsCSV, "פרמיות")} />

        <UploadCard title="תביעות אמת" subtitle="Claims Actuals" icon="🩺" color="sky"
          isLoading={loadingType === "תביעות"}
          onDownload={() => handleDownload("claims-actuals")}
          onUpload={(e) => handleUpload(e, uploadClaimsActualsCSV, "תביעות")} />

        <UploadCard title="אקטואריה" subtitle="Reserves" icon="📑" color="amber"
          isLoading={loadingType === "אקטואריה"}
          onDownload={() => handleDownload("actuarial")}
          onUpload={(e) => handleUpload(e, uploadActuarialCSV, "אקטואריה")} />

        <UploadCard title='הוצ׳ הנה"כ' subtitle="Admin Expenses" icon="🏢" color="rose"
          isLoading={loadingType === "הוצאות"}
          onDownload={() => handleDownload("admin-expense")}
          onUpload={(e) => handleUpload(e, uploadAdminExpenseCSV, "הוצאות")} />

        <UploadCard title="ענפים וקיבוצים" subtitle="Branches" icon="🗂️" color="violet"
          isLoading={loadingType === "ענפים"}
          onDownload={() => handleDownload("branches")}
          onUpload={(e) => handleUpload(e, uploadBranchesCSV, "ענפים")} />

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
