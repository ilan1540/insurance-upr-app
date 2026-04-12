"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

// 1. הגדרת טיפוס עבור הקישורים
interface NavLink {
  label: string;
  href: string;
}

export default function Navbar() {
  // 2. הגדרת טיפוס למצב (State)
  const [open, setOpen] = useState<boolean>(false);

  // 3. הגדרת מערך הקישורים עם הטיפוס המתאים
  const navLinks: NavLink[] = [
    { label: "מדריך עבודה", href: "/guide" },
    { label: "קליטת קבצים", href: "/upload" },
    { label: "דוחות קלט", href: "/report" },
    { label: "דוחות UPR", href: "/upr" },
    { label: "סימולטור PNL", href: "/pnl" },
    { label: "ניתוח ענפי", href: "/branch" },
    { label: "אודות", href: "/about" },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white border-b shadow-sm">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          
          {/* Desktop */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link 
                key={link.href} 
                href={link.href} 
                className="nav-link text-xl font-bold text-blue-600"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Mobile Button */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden p-2 rounded text-xl font-bold text-blue-600"
            aria-label="Toggle menu" // מומלץ לנגישות
          >
            {open ? <X /> : <Menu />}
          </button>

          <Link href="/" className="text-xl font-bold text-blue-600">
            Insurance App
          </Link>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden border-t bg-white px-4 py-3 space-y-2">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)} // סגירת התפריט בלחיצה על קישור
              className="block nav-link text-blue-600 font-medium"
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}