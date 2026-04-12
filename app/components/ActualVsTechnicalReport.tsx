// app/components/ActualVsTechnicalReport.tsx

"use client";
import { useState } from "react";
// ... Imports

export default function ActualVsTechnicalReport() {
  const [data, setData] = useState<any[]>([]);

  // כאן תבוא פונקציה שקוראת ל-Server Action המשלב את 3 הטבלאות
  // (Snapshots, Actuals, Parameters) ומפעילה את ה-Insurance Engine

  return (
    <div className="p-6 bg-white rounded-3xl shadow-xl">
      <h2 className="text-2xl font-black mb-6">ניתוח חזוי מול בפועל (Variance Analysis)</h2>
      <table className="w-full text-right border-collapse">
        <thead>
          <tr className="bg-slate-100">
            <th className="p-3">ענף</th>
            <th className="p-3">רווח חזוי (Technical)</th>
            <th className="p-3">רווח בפועל (Actual)</th>
            <th className="p-3">סטייה (Variance)</th>
          </tr>
        </thead>
        <tbody>
          {data.map(row => (
            <tr key={row.branchNumber} className="border-b">
              <td className="p-3 font-bold">{row.branchNumber}</td>
              <td className="p-3 text-blue-600">{row.technicalProfit.toLocaleString()} ₪</td>
              <td className="p-3 text-indigo-600">{row.actualProfit.toLocaleString()} ₪</td>
              <td className={`p-3 font-black ${row.actualProfit - row.technicalProfit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {(row.actualProfit - row.technicalProfit).toLocaleString()} ₪
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}