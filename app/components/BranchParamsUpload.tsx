"use client";

import { useState } from "react";
import { uploadBranchParamsCSV } from "@/app/actions/data-actions";

export default function BranchParamsUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [year, setYear] = useState(new Date().getFullYear());
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ success: boolean; message: string } | null>(null);

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return alert("אנא בחר קובץ CSV");

    setLoading(true);
    setStatus(null);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("year", year.toString());

    try {
      const result = await uploadBranchParamsCSV(formData);
      if (result.success) {
        setStatus({ success: true, message: `נקלטו בהצלחה פרמטרים עבור ${result.count} ענפים לשנת ${year}` });
        setFile(null);
        // איפוס ה-input של הקובץ באופן ידני
        (document.getElementById("paramsFileInput") as HTMLInputElement).value = "";
      } else {
        setStatus({ success: false, message: "שגיאה: " + result.error });
      }
    } catch (error) {
      setStatus({ success: false, message: "שגיאה בלתי צפויה בתהליך ההעלאה" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-8 bg-white rounded-[2rem] shadow-xl border border-blue-50" dir="rtl">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-indigo-100 rounded-lg text-indigo-600">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-slate-800">הגדרת פרמטרים לענפים</h3>
      </div>

      <form onSubmit={handleUpload} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* בחירת שנה */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold text-slate-500 mr-1">עבור שנה:</label>
            <select 
              value={year}
              onChange={(e) => setYear(Number(e.target.value))}
              className="p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-400 font-bold"
            >
              {[2024, 2025, 2026].map(y => <option key={y} value={y}>{y}</option>)}
            </select>
          </div>

          {/* בחירת קובץ */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold text-slate-500 mr-1">קובץ פרמטרים (CSV):</label>
            <input 
              id="paramsFileInput"
              type="file" 
              accept=".csv"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              className="p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm file:ml-4 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-bold file:bg-indigo-600 file:text-white hover:file:bg-indigo-700 cursor-pointer"
            />
          </div>
        </div>

        <button 
          type="submit"
          disabled={loading || !file}
          className={`w-full py-4 rounded-2xl font-bold transition-all shadow-lg ${
            loading || !file 
            ? "bg-slate-200 text-slate-400 cursor-not-allowed" 
            : "bg-indigo-600 text-white shadow-indigo-100 hover:bg-indigo-700"
          }`}
        >
          {loading ? "מעבד נתונים..." : "עדכן פרמטרים לשנה שנבחרה"}
        </button>
      </form>

      {status && (
        <div className={`mt-6 p-4 rounded-2xl text-center font-bold animate-in fade-in slide-in-from-top-2 ${
          status.success ? "bg-green-50 text-green-700 border border-green-100" : "bg-red-50 text-red-700 border border-red-100"
        }`}>
          {status.message}
        </div>
      )}

      <div className="mt-8 p-4 bg-indigo-50/50 rounded-2xl border border-dashed border-indigo-200">
        <h4 className="text-xs font-bold text-indigo-900 mb-2">דגשים לקובץ ה-CSV:</h4>
        <ul className="text-[11px] text-indigo-700 space-y-1 list-disc list-inside">
          <li>עמודות חובה: <code className="bg-white px-1">branchNumber</code>, <code className="bg-white px-1">agentCommPct</code>, <code className="bg-white px-1">reinsurancePct</code>, <code className="bg-white px-1">expectedLrPct</code></li>
          <li>האחוזים צריכים להיות מספרים (למשל: 15.5 עבור 15.5%).</li>
          <li>העלאה חוזרת לאותה שנה תדרוס את הנתונים הקודמים.</li>
        </ul>
      </div>
    </div>
  );
}
