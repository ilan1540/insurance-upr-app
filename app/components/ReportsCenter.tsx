"use client";
import { useState, useEffect } from "react";
import { getRawData, getAvailableYears } from "@/app/actions/report-actions";

export default function ReportsCenter() {
  const [reportType, setReportType] = useState<'params' | 'actuals' | 'actuarial'>('params');
  const [data, setData] = useState<any[]>([]);
  const [availableYears, setAvailableYears] = useState<number[]>([]);
  const [filters, setFilters] = useState({ year: 2024, month: 1, branch: 0 }); // ברירת מחדל 2024
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // טעינת השנים הקיימות ב-DB בטעינה ראשונה
    getAvailableYears().then(years => {
      if (years.length > 0) {
        setAvailableYears(years);
        setFilters(f => ({ ...f, year: years[0] })); // בחר את השנה הכי חדשה
      }
    });
  }, []);

  useEffect(() => {
    fetchData();
  }, [reportType, filters]);

  const fetchData = async () => {
    setLoading(true);
    const res = await getRawData(reportType, filters);
    setData(res);
    setLoading(false);
  };

  return (
    <div className="max-w-full mx-auto p-6" dir="rtl">
      <h1 className="text-3xl font-black mb-8 text-slate-800">מרכז בקרת נתונים</h1>

      {/* סרגל בחירה וסינון */}
      <div className="flex flex-wrap gap-4 mb-6 bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100 items-center">
        {/* בחירת סוג דוח */}
        <div className="flex bg-slate-100 p-1 rounded-xl">
          {['params', 'actuals', 'actuarial'].map((t) => (
            <button key={t} onClick={() => setReportType(t as any)}
              className={`px-4 py-2 rounded-lg font-bold text-sm transition-all ${reportType === t ? "bg-white text-indigo-600 shadow-sm" : "text-slate-500"}`}>
              {t === 'params' ? 'תחזית' : t === 'actuals' ? 'אמת' : 'אקטואריה'}
            </button>
          ))}
        </div>

        {/* בחירת שנה דינמית */}
        <select 
          value={filters.year}
          className="p-2 border rounded-xl font-bold bg-slate-50"
          onChange={(e) => setFilters({...filters, year: parseInt(e.target.value)})}
        >
          {availableYears.map(year => (
            <option key={year} value={year}>שנת {year}</option>
          ))}
          {availableYears.length === 0 && <option value="2024">2024 (אין נתונים)</option>}
        </select>

        {reportType !== 'params' && (
          <select className="p-2 border rounded-xl" onChange={(e) => setFilters({...filters, month: parseInt(e.target.value)})}>
            {Array.from({length: 12}, (_, i) => <option key={i+1} value={i+1}>חודש {i+1}</option>)}
          </select>
        )}

        <input type="number" placeholder="ענף..." className="p-2 border rounded-xl w-24" onChange={(e) => setFilters({...filters, branch: parseInt(e.target.value) || 0})} />
      </div>

      {/* הטבלה עם כל השדות */}
      <div className="bg-white rounded-[2rem] shadow-xl border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-right border-collapse text-sm">
            <thead className="bg-slate-800 text-white">
              <tr>
                <th className="p-4 border-l border-slate-700">ענף</th>
                {reportType === 'params' && (
                  <>
                    <th className="p-4">פרמיה חזויה</th>
                    <th className="p-4">עמלת סוכן %</th>
                    <th className="p-4">ביטוח משנה %</th>
                    <th className="p-4">עמלת משנה %</th>
                    <th className="p-4">LR חזוי %</th>
                  </>
                )}
                {reportType === 'actuals' && (
                  <>
                    <th className="p-4">פרמיה ברוטו</th>
                    <th className="p-4">עמלת סוכן</th>
                    <th className="p-4">פרמיה ב"מ</th>
                    <th className="p-4">עמלת ב"מ</th>
                    <th className="p-4">תביעות ברוטו</th>
                    <th className="p-4">תביעות ב"מ</th>
                  </>
                )}
                {reportType === 'actuarial' && (
                  <>
                    <th className="p-4">תלויות ברוטו</th>
                    <th className="p-4">תלויות ב"מ</th>
                    <th className="p-4">IBNR ברוטו</th>
                    <th className="p-4">IBNR ב"מ</th>
                  </>
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {data.map((row, i) => (
                <tr key={i} className="hover:bg-indigo-50/30 transition-colors">
                  <td className="p-4 font-bold text-slate-900 border-l border-slate-100">{row.branchNumber}</td>
                  {reportType === 'params' && (
                    <>
                      <td className="p-4 font-mono">{row.expectedGrossPremium?.toLocaleString()}</td>
                      <td className="p-4">{row.agentCommPct}%</td>
                      <td className="p-4">{row.reinsurancePct}%</td>
                      <td className="p-4">{row.reinsuranceCommPct}%</td>
                      <td className="p-4 font-bold text-rose-600">{row.expectedLrPct}%</td>
                    </>
                  )}
                  {reportType === 'actuals' && (
                    <>
                      <td className="p-4">{row.grossPremium?.toLocaleString()}</td>
                      <td className="p-4 text-rose-600">{row.agentComm?.toLocaleString()}</td>
                      <td className="p-4">{row.reinsurancePremium?.toLocaleString()}</td>
                      <td className="p-4 text-emerald-600">{row.reinsuranceComm?.toLocaleString()}</td>
                      <td className="p-4 font-bold">{row.claimsPaidGross?.toLocaleString()}</td>
                      <td className="p-4 text-emerald-600">{row.claimsPaidRi?.toLocaleString()}</td>
                    </>
                  )}
                  {reportType === 'actuarial' && (
                    <>
                      <td className="p-4 font-bold">{row.outstandingClaimsGross?.toLocaleString()}</td>
                      <td className="p-4 text-emerald-600">{row.outstandingClaimsRi?.toLocaleString()}</td>
                      <td className="p-4 font-bold">{row.ibnrGross?.toLocaleString()}</td>
                      <td className="p-4 text-emerald-600">{row.ibnrRi?.toLocaleString()}</td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
          {data.length === 0 && <div className="p-10 text-center text-slate-400">לא נמצאו נתונים לשנת {filters.year}</div>}
        </div>
      </div>
    </div>
  );
}