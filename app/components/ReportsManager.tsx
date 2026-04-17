"use client";
import { useState, useEffect } from "react";
import { getReportData, getAvailableYears } from "@/app/actions/report-actions";
import { getAllBranches } from "@/app/actions/branch-actions";

type TabType = 'params' | 'premium-actuals' | 'claims-actuals' | 'actuarial' | 'admin-expense' | 'branches';

const TABS: { key: TabType; label: string; icon: string; color: string }[] = [
  { key: 'params',          label: 'תחזית',         icon: '🎯', color: 'bg-indigo-600 text-white shadow-lg' },
  { key: 'premium-actuals', label: 'פרמיות אמת',    icon: '💎', color: 'bg-emerald-600 text-white shadow-lg' },
  { key: 'claims-actuals',  label: 'תביעות אמת',    icon: '🩺', color: 'bg-sky-500 text-white shadow-lg' },
  { key: 'actuarial',       label: 'אקטואריה',       icon: '📑', color: 'bg-amber-500 text-white shadow-lg' },
  { key: 'admin-expense',   label: 'הנה"כ',          icon: '🏢', color: 'bg-rose-500 text-white shadow-lg' },
  { key: 'branches',        label: 'ענפים',          icon: '🗂️', color: 'bg-violet-600 text-white shadow-lg' },
];

function SumChip({ label, value, color, bold }: { label: string; value: number; color: string; bold?: boolean }) {
  return (
    <div className={`flex flex-col items-center px-3 py-2 rounded-xl border text-xs ${color}`}>
      <span className="opacity-60 font-medium mb-0.5">{label}</span>
      <span className={`font-mono text-sm ${bold ? 'font-black' : 'font-bold'}`}>{value.toLocaleString()}</span>
    </div>
  );
}

export default function ReportsManager() {
  const [activeTab, setActiveTab]     = useState<TabType>('params');
  const [availableYears, setAvailableYears] = useState<number[]>([]);
  const [selectedYear, setSelectedYear]     = useState<number | null>(null);
  const [data, setData]       = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    getAvailableYears().then(years => {
      setAvailableYears(years);
      if (years.length > 0 && selectedYear === null) setSelectedYear(years[0]);
    });
  }, []);

  const loadData = async () => {
    if (activeTab !== 'branches' && selectedYear === null) return;
    setLoading(true);
    if (activeTab === 'branches') {
      const res = await getAllBranches();
      setData(res.branches || []);
    } else {
      const result = await getReportData(activeTab, selectedYear!);
      setData(result || []);
    }
    setLoading(false);
  };

  useEffect(() => { loadData(); }, [activeTab, selectedYear]);

  const filteredData = data.filter(row =>
    !searchTerm ||
    row.branchNumber?.toString().includes(searchTerm) ||
    row.branchName?.includes(searchTerm) ||
    row.groupName?.includes(searchTerm)
  );

  const noYear = activeTab === 'branches';

  return (
    <div className="p-4 md:p-8 bg-slate-50 min-h-screen" dir="rtl">
      <div className="max-w-7xl mx-auto">

        {/* כותרת + בחירת שנה */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-black text-slate-900">מרכז בקרת נתונים</h1>
            <p className="text-slate-500">תצוגה מלאה של כל שדות הקלט ב-Database</p>
          </div>
          {!noYear && availableYears.length > 0 && (
            <div className="bg-white p-2 rounded-2xl shadow-sm border border-slate-200 flex items-center gap-3">
              <span className="text-sm font-bold text-slate-600 mr-2">שנה:</span>
              {availableYears.map(y => (
                <button key={y} onClick={() => setSelectedYear(y)}
                  className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                    selectedYear === y ? "bg-indigo-600 text-white" : "text-slate-400 hover:bg-slate-50"
                  }`}>{y}</button>
              ))}
            </div>
          )}
        </div>

        {/* טאבים */}
        <div className="flex flex-wrap gap-2 mb-8 bg-white p-2 rounded-3xl shadow-sm w-fit border border-slate-100">
          {TABS.map(t => (
            <button key={t.key} onClick={() => setActiveTab(t.key)}
              className={`px-5 py-2.5 rounded-2xl font-bold text-sm transition-all ${
                activeTab === t.key ? t.color : "text-slate-500 hover:bg-slate-50"
              }`}>
              {t.icon} {t.label}
            </button>
          ))}
        </div>

        {/* חיפוש + סיכום */}
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4 mb-6">
          <input type="text" placeholder="חפש לפי מספר ענף / שם..."
            className="w-full md:w-80 p-3 rounded-2xl border border-slate-200 shadow-sm focus:ring-2 focus:ring-indigo-500 outline-none"
            onChange={e => setSearchTerm(e.target.value)} />

          {!loading && filteredData.length > 0 && activeTab !== 'branches' && (
            <div className="flex flex-wrap gap-2 items-center">
              <span className="text-xs font-bold text-slate-400 ml-1">
                {filteredData.length} {searchTerm ? 'מסוננות' : 'רשומות'}
              </span>

              {activeTab === 'params' && (
                <SumChip label="פרמיה חזויה" value={filteredData.reduce((s, r) => s + (r.expectedGrossPremium ?? 0), 0)} color="text-indigo-700 bg-indigo-50 border-indigo-200" />
              )}

              {activeTab === 'premium-actuals' && (<>
                <SumChip label="פרמיה ברוטו"  value={filteredData.reduce((s, r) => s + (r.grossPremium ?? 0), 0)}         color="text-emerald-700 bg-emerald-50 border-emerald-200" />
                <SumChip label="עמלת סוכן"     value={filteredData.reduce((s, r) => s + (r.agentComm ?? 0), 0)}             color="text-rose-700 bg-rose-50 border-rose-200" />
                <SumChip label="פרמיה ב״מ"     value={filteredData.reduce((s, r) => s + (r.reinsurancePremium ?? 0), 0)}    color="text-slate-700 bg-slate-100 border-slate-200" />
                <SumChip label="עמלת ב״מ"      value={filteredData.reduce((s, r) => s + (r.reinsuranceComm ?? 0), 0)}       color="text-emerald-700 bg-emerald-50 border-emerald-200" />
              </>)}

              {activeTab === 'claims-actuals' && (<>
                <SumChip label="תביעות ברוטו" value={filteredData.reduce((s, r) => s + (r.claimsPaidGross ?? 0), 0)} color="text-sky-700 bg-sky-50 border-sky-200" />
                <SumChip label="תביעות ב״מ"   value={filteredData.reduce((s, r) => s + (r.claimsPaidRi ?? 0), 0)}    color="text-emerald-700 bg-emerald-50 border-emerald-200" />
              </>)}

              {activeTab === 'actuarial' && (<>
                <SumChip label="תלויות ברוטו"  value={filteredData.reduce((s, r) => s + (r.outstandingClaimsGross ?? 0), 0)} color="text-amber-700 bg-amber-50 border-amber-200" />
                <SumChip label="IBNR ברוטו"     value={filteredData.reduce((s, r) => s + (r.ibnrGross ?? 0), 0)}              color="text-amber-700 bg-amber-50 border-amber-200" />
                <SumChip label="הערכה ברוטו"   value={filteredData.reduce((s, r) => s + (r.actuarialEstimateGross ?? 0), 0)} color="text-orange-700 bg-orange-50 border-orange-200" />
                <SumChip label="הערכה ב״מ"     value={filteredData.reduce((s, r) => s + (r.actuarialEstimateRi ?? 0), 0)}    color="text-orange-700 bg-orange-50 border-orange-200" />
              </>)}

              {activeTab === 'admin-expense' && (<>
                <SumChip label="הוצ׳ לפרמיה"  value={filteredData.reduce((s, r) => s + (r.premiumExpense ?? 0), 0)}                             color="text-rose-700 bg-rose-50 border-rose-200" />
                <SumChip label="הוצ׳ לתביעות" value={filteredData.reduce((s, r) => s + (r.claimsExpense ?? 0), 0)}                              color="text-rose-700 bg-rose-50 border-rose-200" />
                <SumChip label='סה"כ'          value={filteredData.reduce((s, r) => s + (r.premiumExpense ?? 0) + (r.claimsExpense ?? 0), 0)}    color="text-rose-900 bg-rose-100 border-rose-300" bold />
              </>)}
            </div>
          )}
        </div>

        {/* טבלה */}
        <div className="bg-white rounded-[2.5rem] shadow-xl overflow-hidden border border-slate-200">
          <div className="overflow-x-auto max-h-[65vh] overflow-y-auto">
            <table className="w-full text-right border-collapse text-sm">
              <thead className="bg-slate-800 text-white text-xs">
                <tr>
                  {/* עמודת ענף */}
                  {activeTab !== 'admin-expense' && (
                    <th className="p-4">{activeTab === 'branches' ? 'מספר ענף' : 'ענף'}</th>
                  )}
                  {/* עמודת תקופה */}
                  {activeTab !== 'branches' && <th className="p-4">תקופה</th>}

                  {activeTab === 'params' && (<>
                    <th className="p-4">פרמיה חזויה</th>
                    <th className="p-4">עמלת סוכן %</th>
                    <th className="p-4">ב"מ %</th>
                    <th className="p-4">עמלת ב"מ %</th>
                    <th className="p-4">LR %</th>
                  </>)}

                  {activeTab === 'premium-actuals' && (<>
                    <th className="p-4 text-slate-300">תחילת ביטוח</th>
                    <th className="p-4 text-slate-300">סוף ביטוח</th>
                    <th className="p-4 text-emerald-300">פרמיה ברוטו</th>
                    <th className="p-4 text-emerald-300">עמלת סוכן</th>
                    <th className="p-4 text-emerald-300">פרמיה ב"מ</th>
                    <th className="p-4 text-emerald-300">עמלת ב"מ</th>
                  </>)}

                  {activeTab === 'claims-actuals' && (<>
                    <th className="p-4 text-sky-300">שנת חיתום</th>
                    <th className="p-4 text-sky-300">שנת נזק</th>
                    <th className="p-4 text-sky-300">תביעות ברוטו</th>
                    <th className="p-4 text-sky-300">תביעות ב"מ</th>
                  </>)}

                  {activeTab === 'actuarial' && (<>
                    <th className="p-4 text-amber-200">שנת חיתום</th>
                    <th className="p-4 text-amber-200">שנת נזק</th>
                    <th className="p-4 text-amber-300">תלויות ברוטו</th>
                    <th className="p-4 text-amber-300">תלויות ב"מ</th>
                    <th className="p-4 text-amber-300">IBNR ברוטו</th>
                    <th className="p-4 text-amber-300">IBNR ב"מ</th>
                    <th className="p-4 text-orange-300 font-black">הערכה ברוטו</th>
                    <th className="p-4 text-orange-300 font-black">הערכה ב"מ</th>
                  </>)}

                  {activeTab === 'admin-expense' && (<>
                    <th className="p-4 text-rose-300">תקופה</th>
                    <th className="p-4 text-rose-300">הוצ׳ לפרמיה</th>
                    <th className="p-4 text-rose-300">הוצ׳ לתביעות</th>
                    <th className="p-4 text-rose-200 font-black">סה"כ</th>
                    <th className="p-4 text-slate-400">תיאור</th>
                  </>)}

                  {activeTab === 'branches' && (<>
                    <th className="p-4 text-violet-300">שם ענף</th>
                    <th className="p-4 text-violet-300">קוד קיבוץ</th>
                    <th className="p-4 text-violet-300">שם קיבוץ</th>
                  </>)}
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {loading ? (
                  <tr><td colSpan={10} className="p-20 text-center text-indigo-500 animate-pulse font-bold">מושך נתונים...</td></tr>
                ) : filteredData.map((row, i) => (
                  <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                    {activeTab !== 'admin-expense' && (
                      <td className={`p-4 font-bold ${activeTab === 'branches' ? 'text-violet-700' : 'text-indigo-700'}`}>
                        {activeTab === 'branches' ? row.branchNumber : `ענף ${row.branchNumber}`}
                      </td>
                    )}
                    {activeTab !== 'branches' && (
                      <td className="p-4 text-slate-500 font-mono text-xs">
                        {row.year}{row.month ? `/${String(row.month).padStart(2,'0')}` : ''}
                      </td>
                    )}

                    {activeTab === 'params' && (<>
                      <td className="p-4 font-mono">{row.expectedGrossPremium?.toLocaleString()}</td>
                      <td className="p-4">{row.agentCommPct}%</td>
                      <td className="p-4">{row.reinsurancePct}%</td>
                      <td className="p-4">{row.reinsuranceCommPct}%</td>
                      <td className="p-4 font-bold text-rose-600">{row.expectedLrPct}%</td>
                    </>)}

                    {activeTab === 'premium-actuals' && (<>
                      <td className="p-4 font-mono text-xs text-slate-500">{row.startDate ? new Date(row.startDate).toLocaleDateString('he-IL', {day:'2-digit',month:'2-digit',year:'numeric'}) : '—'}</td>
                      <td className="p-4 font-mono text-xs text-slate-500">{row.endDate   ? new Date(row.endDate).toLocaleDateString('he-IL',   {day:'2-digit',month:'2-digit',year:'numeric'}) : '—'}</td>
                      <td className="p-4 font-mono">{row.grossPremium?.toLocaleString()}</td>
                      <td className="p-4 font-mono text-rose-500">{row.agentComm?.toLocaleString()}</td>
                      <td className="p-4 font-mono">{row.reinsurancePremium?.toLocaleString()}</td>
                      <td className="p-4 font-mono text-emerald-600">{row.reinsuranceComm?.toLocaleString()}</td>
                    </>)}

                    {activeTab === 'claims-actuals' && (<>
                      <td className="p-4 font-mono font-bold text-sky-700">{row.underwritingYear}</td>
                      <td className="p-4 font-mono font-bold text-sky-600">{row.lossYear}</td>
                      <td className="p-4 font-mono">{row.claimsPaidGross?.toLocaleString()}</td>
                      <td className="p-4 font-mono text-emerald-600">{row.claimsPaidRi?.toLocaleString()}</td>
                    </>)}

                    {activeTab === 'actuarial' && (<>
                      <td className="p-4 font-mono font-bold text-amber-700">{row.underwritingYear}</td>
                      <td className="p-4 font-mono font-bold text-amber-600">{row.lossYear}</td>
                      <td className="p-4 font-mono">{row.outstandingClaimsGross?.toLocaleString()}</td>
                      <td className="p-4 font-mono text-emerald-600">{row.outstandingClaimsRi?.toLocaleString()}</td>
                      <td className="p-4 font-mono">{row.ibnrGross?.toLocaleString()}</td>
                      <td className="p-4 font-mono text-emerald-600">{row.ibnrRi?.toLocaleString()}</td>
                      <td className="p-4 font-mono font-bold text-orange-700">{row.actuarialEstimateGross?.toLocaleString()}</td>
                      <td className="p-4 font-mono font-bold text-orange-600">{row.actuarialEstimateRi?.toLocaleString()}</td>
                    </>)}

                    {activeTab === 'admin-expense' && (<>
                      <td className="p-4 text-slate-500 font-mono text-xs">{row.year}/{String(row.month).padStart(2,'0')}</td>
                      <td className="p-4 font-mono text-rose-600">{row.premiumExpense?.toLocaleString()}</td>
                      <td className="p-4 font-mono text-rose-600">{row.claimsExpense?.toLocaleString()}</td>
                      <td className="p-4 font-mono font-bold text-rose-900">{((row.premiumExpense??0)+(row.claimsExpense??0)).toLocaleString()}</td>
                      <td className="p-4 text-slate-400 text-xs">{row.description || '—'}</td>
                    </>)}

                    {activeTab === 'branches' && (<>
                      <td className="p-4 font-bold text-slate-800">{row.branchName}</td>
                      <td className="p-4 font-mono text-violet-600">{row.groupCode}</td>
                      <td className="p-4 font-bold text-violet-700">{row.groupName}</td>
                    </>)}
                  </tr>
                ))}
              </tbody>

            </table>
            {!loading && filteredData.length === 0 && (
              <div className="p-20 text-center text-slate-400">לא נמצאו נתונים</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
