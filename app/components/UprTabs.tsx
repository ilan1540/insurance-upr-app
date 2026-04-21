"use client";

import { useState } from "react";
import UprManager from "@/app/components/UprManager";
import UprArchive from "@/app/components/UprArchive";
import UprDetailedReport from "@/app/components/UprDetailedReport";

const TABS = [

  { id: "archive", label: "הצגת חישוב מצטבר לענף/חודש",         icon: "🗄️",  desc: "שליפת נתוני UPR שמורים" },
  { id: "detail", label: "חישוב מפורט-לענף/פוליסה/חודש ", icon: "📋", desc: "לענף/פוליסה/חודש" },
   { id: "calc",    label: "הרצת חישוב UPR & DUC",     icon: "⚙️",  desc: "חישוב UPR/DUC לתאריך נבחר" },
] as const;

type TabId = typeof TABS[number]["id"];

export default function UprTabs() {
  const [active, setActive] = useState<TabId>("archive");

  return (
    <div className="max-w-6xl mx-auto p-6" dir="rtl">

      {/* כותרת */}
      <div className="flex items-center justify-center gap-3 mb-6">
        <span className="p-2.5 bg-indigo-600 text-white rounded-xl text-xl">📊</span>
        <div className="text-center">
          <h1 className="text-2xl font-black text-blue-900">מערכת רזרבות (UPR / DUC)</h1>
          <p className="text-slate-400 text-xs">חישוב UPR, DUC והקצאת הוצאות הנה"כ לפי IFRS17</p>
        </div>
      </div>

      {/* כרטיסיות בחירה */}
      <div className="flex justify-center gap-2 mb-2">
        {TABS.map(tab => (
          <button key={tab.id} onClick={() => setActive(tab.id)}
            className={`px-3 py-1.5 rounded-lg border-2 text-right transition-all whitespace-nowrap ${
              active === tab.id
                ? "border-indigo-500 bg-indigo-50 shadow-sm"
                : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50"
            }`}>
            <div className="flex items-center gap-1.5">
              <span className="text-xs">{tab.icon}</span>
              <span className={`font-bold text-xs ${active === tab.id ? "text-indigo-700" : "text-slate-600"}`}>
                {tab.label}
              </span>
            </div>
            {active === tab.id && (
              <div className="mt-0.5 h-0.5 bg-indigo-500 rounded-full" />
            )}
          </button>
        ))}
      </div>

      {/* תוכן הכרטיסייה הפעילה */}
      <div>
        {active === "calc"    && <UprManager />}
        {active === "archive" && <UprArchive />}
        {active === "detail"  && <UprDetailedReport />}
      </div>
    </div>
  );
}
