"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { 
  Home, 
  Landmark, 
  Briefcase,
  PhoneCall,
  CircleDollarSign,
  ShieldCheck,
  FileClock,
  User,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  Shield
} from "lucide-react";

// Desktop Menu List (10 Items)
const desktopMenus = [
  { title: "Home", href: "/", icon: Home },
  { title: "Property Compliance", href: "/property-vetting", icon: Shield },
  { title: "Credit Score Management", href: "/credit-score-management", icon: TrendingUp },
  { title: "Loans", href: "/loan", icon: Landmark },
  { title: "Financial Consultancy", href: "/finance", icon: CircleDollarSign },
  { title: "Services", href: "/services", icon: Briefcase },
  { title: "Contact", href: "/contact", icon: PhoneCall },
  { title: "CIBIL Check", href: "/cibil", icon: ShieldCheck },
  { title: "My Requests", href: "/my-requests", icon: FileClock },
  { title: "Profile", href: "/profile", icon: User },
];

// Mobile Bottom Bar (Strictly 5 Items)
const mobileMenus = [
  { title: "Home", href: "/", icon: Home },
  { title: "Compliance", href: "/property-vetting", icon: Shield },
  { title: "Credit Score", href: "/credit-score-management", icon: TrendingUp },
  { title: "Loans", href: "/loan", icon: Landmark },
  { title: "Finance", href: "/finance", icon: CircleDollarSign },
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
      {/* ================= DESKTOP SIDEBAR ================= */}
      <motion.aside 
        animate={{ width: isMinimized ? "4.5rem" : "16rem" }}
        transition={{ duration: 0.22, ease: "easeInOut" }}
        className="hidden lg:flex fixed left-0 top-28 bottom-0 z-40 flex-col bg-white border-r border-slate-200/90 select-none p-3 justify-between shadow-2xs"
      >
        <div className="flex flex-col gap-2">
          
          {/* Header Row: BSP Continental Title & Minimize Toggle */}
          <div className={`flex items-center ${isMinimized ? "justify-center" : "justify-between"} px-2 pt-1 pb-2 border-b border-slate-100`}>
            {!isMinimized && (
              <span className="text-[11px] font-black uppercase tracking-widest text-slate-500">
                BSP Continental
              </span>
            )}
            <button 
              type="button"
              onClick={() => setIsMinimized(!isMinimized)}
              className="p-1.5 hover:bg-blue-50 rounded-lg transition-colors cursor-pointer text-slate-600 hover:text-blue-600"
              title={isMinimized ? "Expand Sidebar" : "Minimize Sidebar"}
            >
              {isMinimized ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-col gap-1 max-h-[calc(100vh-190px)] overflow-y-auto scrollbar-none pr-0.5">
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
                  {/* Active Background Pill */}
                  {isActive && (
                    <motion.div 
                      layoutId="desktopActivePill"
                      className="absolute inset-0 bg-blue-600 rounded-xl -z-10 shadow-2xs"
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
                    <span className="ml-3 text-xs tracking-wide truncate uppercase font-black">
                      {item.title}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom Version Badge (v0.1) */}
        <div className={`pt-3 border-t border-slate-100 px-2 flex items-center ${isMinimized ? "justify-center" : "justify-between"}`}>
          {!isMinimized && <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Version</span>}
          <span className="text-[10px] font-extrabold px-2 py-0.5 bg-blue-50 text-blue-700 rounded-md border border-blue-100">
            v0.1
          </span>
        </div>
      </motion.aside>

      {/* ================= MOBILE BOTTOM BAR (FIXED 5 ITEMS) ================= */}
      <div className="block lg:hidden fixed bottom-0 left-0 right-0 z-50 w-full px-3 pb-3">
        <div className="relative flex items-center justify-around bg-white/95 backdrop-blur-xl border border-slate-200 py-2 px-1 rounded-2xl shadow-2xl">
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
                    className="absolute inset-x-0.5 top-0 bottom-0 bg-blue-50 rounded-xl -z-10 border border-blue-200"
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
                <span className={`mt-0.5 text-[9px] tracking-tight uppercase transition-all truncate px-0.5 max-w-full ${
                  isActive ? "text-blue-950 font-black" : "text-slate-500 font-bold"
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