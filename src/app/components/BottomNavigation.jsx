"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { 
  Home, 
  FileCheck, 
  Landmark, 
  HandCoins,
  Building2,
  UserCheck,
  CircleDollarSign,
  ShieldCheck,
  FileClock,
  User,
  ChevronLeft,
  ChevronRight
} from "lucide-react";

// Desktop Menu List (10 Items)
const desktopMenus = [
  { title: "Home", href: "/", icon: Home },
  { title: "Property Vetting", href: "/property-vetting", icon: FileCheck },
  { title: "Loans", href: "/loan", icon: Landmark },
  { title: "Loan Solution", href: "/loan-solution", icon: HandCoins },
  { title: "MSME Loan", href: "/msme-loan", icon: Building2 },
  { title: "Personal Loan", href: "/personal-loan", icon: UserCheck },
  { title: "Finance", href: "/finance", icon: CircleDollarSign },
  { title: "CIBIL", href: "/cibil", icon: ShieldCheck },
  { title: "My Requests", href: "/my-request", icon: FileClock },
  { title: "Profile", href: "/profile", icon: User },
];

// Mobile Menu List (Strictly 5 Items)
const mobileMenus = [
  { title: "Home", href: "/", icon: Home },
  { title: "Loans", href: "/loan", icon: Landmark },
  { title: "Loan Check", href: "/loan-solution", icon: HandCoins },
  { title: "Vetting", href: "/property-vetting", icon: FileCheck },
  { title: "CIBIL", href: "/cibil", icon: ShieldCheck },
];

export default function Navigation() {
  const pathname = usePathname();
  const [isMinimized, setIsMinimized] = useState(false);

  // Admin routes guard
  if (pathname?.startsWith('/admin')) {
    return null;
  }

  return (
    <>
      {/* ================= DESKTOP SIDEBAR WITH RIGHT BORDER & TOP MARGIN ================= */}
      <motion.aside 
        animate={{ width: isMinimized ? "4.5rem" : "15rem" }}
        transition={{ duration: 0.22, ease: "easeInOut" }}
        className="hidden md:flex fixed left-0 top-20 bottom-0 z-40 flex-col bg-slate-50/90 backdrop-blur-xl border-r border-slate-200/80 select-none p-3 justify-between"
      >
        <div className="flex flex-col gap-2">
          
          {/* Header Row: Title & Minimize Toggle */}
          <div className={`flex items-center ${isMinimized ? "justify-center" : "justify-between"} px-2 pt-1 pb-2 border-b border-slate-200/60`}>
            {!isMinimized && (
              <span className="text-[11px] font-black uppercase tracking-widest text-slate-400">
                Navigation
              </span>
            )}
            <button 
              type="button"
              onClick={() => setIsMinimized(!isMinimized)}
              className="p-1.5 hover:bg-slate-200/70 rounded-lg transition-colors cursor-pointer text-slate-600 hover:text-blue-600"
              title={isMinimized ? "Expand Sidebar" : "Minimize Sidebar"}
            >
              {isMinimized ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-col gap-1 max-h-[calc(100vh-160px)] overflow-y-auto scrollbar-none pr-0.5">
            {desktopMenus.map((item) => {
              const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
              const IconComponent = item.icon;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  title={isMinimized ? item.title : ""}
                  className={`relative flex items-center ${isMinimized ? "justify-center px-2" : "px-3.5"} py-2.5 rounded-xl transition-all duration-200 group ${
                    isActive 
                      ? "text-white font-bold" 
                      : "text-slate-600 hover:text-blue-600 hover:bg-blue-50/70 font-semibold"
                  }`}
                >
                  {/* Active Background Pill (Deep Blue Accent) */}
                  {isActive && (
                    <motion.div 
                      layoutId="desktopActivePill"
                      className="absolute inset-0 bg-blue-600 rounded-xl -z-10 shadow-sm"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}

                  {/* Icon */}
                  <div className={`flex items-center justify-center shrink-0 transition-colors ${
                    isActive ? "text-white" : "text-slate-500 group-hover:text-blue-600"
                  }`}>
                    <IconComponent size={20} strokeWidth={isActive ? 2.5 : 2} />
                  </div>

                  {/* Label */}
                  {!isMinimized && (
                    <span className="ml-3 text-xs tracking-wide truncate">
                      {item.title}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom Version Badge */}
        <div className={`pt-3 border-t border-slate-200/60 px-2 flex items-center ${isMinimized ? "justify-center" : "justify-between"}`}>
          {!isMinimized && <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Version</span>}
          <span className="text-[10px] font-extrabold px-2 py-0.5 bg-blue-100/80 text-blue-700 rounded-md">
            v0.1
          </span>
        </div>
      </motion.aside>

      {/* ================= MOBILE BOTTOM BAR (FIXED 5 ITEMS) ================= */}
      <div className="block md:hidden fixed bottom-0 left-0 right-0 z-50 w-full px-3 pb-3">
        <div className="relative flex items-center justify-around bg-white/95 backdrop-blur-xl border border-slate-200/90 py-2 px-1 rounded-2xl shadow-[0_8px_25px_rgba(0,0,0,0.1)]">
          {mobileMenus.map((item) => {
            const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
            const IconComponent = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                className="relative flex-1 flex flex-col items-center justify-center py-1.5 outline-none select-none group min-w-0"
              >
                {/* Active Pill Animation for Mobile */}
                {isActive && (
                  <motion.div 
                    layoutId="mobileActivePill"
                    className="absolute inset-x-0.5 top-0 bottom-0 bg-blue-50 rounded-xl -z-10 border border-blue-200/60"
                    transition={{ type: "spring", stiffness: 400, damping: 32 }}
                  />
                )}

                {/* Icon Container */}
                <motion.div 
                  whileTap={{ scale: 0.92 }} 
                  className={`p-0.5 transition-colors ${isActive ? "text-blue-600" : "text-slate-500"}`}
                >
                  <IconComponent 
                    size={20} 
                    strokeWidth={isActive ? 2.5 : 2} 
                  />
                </motion.div>

                {/* Mobile Label */}
                <span className={`mt-0.5 text-[10px] tracking-tight transition-all truncate px-0.5 max-w-full ${
                  isActive ? "text-blue-950 font-black" : "text-slate-500 font-medium"
                }`}>
                  {item.title}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
}