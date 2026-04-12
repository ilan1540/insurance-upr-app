"use client";

import React from 'react';
import Link from 'next/link';

export default function DashboardHome() {
  const menuItems = [
    {
      title: "ניהול קלט נתונים",
      desc: "טעינת קבצי CSV: תחזית, אמת ואקטואריה",
      icon: "📥",
      link: "/upload", // וודא שהנתיב תואם למיקום ה-OperationsControl
      color: "bg-indigo-600",
      hover: "hover:bg-indigo-700"
    },
    {
      title: "מנוע חישובים (UPR)",
      desc: "חישוב פרמיה מורווחת ועתודות באופן אוטומטי",
      icon: "🧮",
      link: "/upr", 
      color: "bg-amber-500",
      hover: "hover:bg-amber-600"
    },
    {
      title: "מרכז דוחות (P&L)",
      desc: "צפייה בנתונים גולמיים ודוחות רווחיות חתמית",
      icon: "📊",
      link: "/report",
      color: "bg-emerald-600",
      hover: "hover:bg-emerald-700"
    },
    {
      title: "אודות והדרכה",
      desc: "מדריך למשתמש, שמות שדות ומבנה טכני",
      icon: "📘",
      link: "/about",
      color: "bg-slate-700",
      hover: "hover:bg-slate-800"
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 p-8" dir="rtl">
      {/* כותרת עליונה */}
      <header className="max-w-6xl mx-auto text-center mb-16 mt-8">
        <h1 className="text-5xl font-black text-slate-900 mb-4 tracking-tight">
          מערכת <span className="text-indigo-600">UPR & Profitability</span>
        </h1>
        <p className="text-xl text-slate-500 font-medium max-w-2xl mx-auto">
          פלטפורמה אחודה לניהול תקציב, בקרה אקטוארית וניתוח רווחיות ענפית בזמן אמת.
        </p>
      </header>

      {/* גריד כרטיסי ניווט */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {menuItems.map((item, idx) => (
          <Link href={item.link} key={idx} className="group">
            <div className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-slate-100 h-full transition-all duration-300 group-hover:-translate-y-2 group-hover:shadow-2xl flex flex-col items-center text-center">
              <div className="text-6xl mb-6 transform transition-transform group-hover:scale-110">
                {item.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-3">
                {item.title}
              </h3>
              <p className="text-slate-500 text-sm leading-relaxed mb-8 flex-grow">
                {item.desc}
              </p>
              <div className={`w-full py-3 rounded-2xl font-bold text-white transition-colors ${item.color} ${item.hover}`}>
                כניסה למודול
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* סטטיסטיקה מהירה (אופציונלי) */}
      <footer className="max-w-6xl mx-auto mt-20">
        <div className="bg-white/50 backdrop-blur-sm border border-slate-200 rounded-3xl p-6 flex justify-around items-center">
          <div className="text-center">
            <div className="text-xs text-slate-400 uppercase font-bold mb-1">שנת עבודה</div>
            <div className="text-xl font-black text-slate-700">2026</div>
          </div>
          <div className="h-8 w-px bg-slate-200"></div>
          <div className="text-center">
            <div className="text-xs text-slate-400 uppercase font-bold mb-1">סטטוס DB</div>
            <div className="text-xl font-black text-emerald-500">מחובר</div>
          </div>
          <div className="h-8 w-px bg-slate-200"></div>
          <div className="text-center">
            <div className="text-xs text-slate-400 uppercase font-bold mb-1">גרסת מערכת</div>
            <div className="text-xl font-black text-slate-700">v2.1</div>
          </div>
        </div>
      </footer>
    </div>
  );
}