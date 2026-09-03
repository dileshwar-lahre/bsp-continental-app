"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { 
  Home, 
  Briefcase,
  PhoneCall,
  CircleDollarSign,
  FileClock,
  User,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  Shield
} from "lucide-react";

// Desktop Menu List (Updated Routes)
const desktopMenus = [
  { title: "Home", href: "/dashboard", icon: Home },
  { title: "Property Compliance", href: "/dashboard/property-compliance", icon: Shield },
  { title: "Credit Score Management", href: "/dashboard/credit-score-management", icon: TrendingUp },
  { title: "Financial Consultancy", href: "/dashboard/finance", icon: CircleDollarSign },
  { title: "Services", href: "/dashboard/services", icon: Briefcase },
  { title: "Contact", href: "/dashboard/contact", icon: PhoneCall },
  { title: "My Requests", href: "/dashboard/my-requests", icon: FileClock },
  { title: "Profile", href: "/dashboard/profile", icon: User },
];

// Mobile Bottom Bar (4 Core Items)
const mobileMenus = [
  { title: "Home", href: "/dashboard", icon: Home },
  { title: "Compliance", href: "/dashboard/property-compliance", icon: Shield },
  { title: "Credit Score", href: "/dashboard/credit-score-management", icon: TrendingUp },
  { title: "Finance", href: "/dashboard/finance", icon: CircleDollarSign },
];

export default function Navigation() {
  const pathname = usePathname();
  const [isMinimized, setIsMinimized] = useState(false);

  // Strict Guard: Landing ('/'), Login ('/login') ya Admin ('/admin') par hide rahega
  if (!pathname?.startsWith('/dashboard')) {
    return null;
  }

  return (
    <>
      {/* ================= DESKTOP SIDEBAR ================= */}
      {/* Navbar ke theek thoda sa niche space ke liye top-[5.5rem] set kiya hai */}
      <motion.aside 
        animate={{ width: isMinimized ? "4.5rem" : "16rem" }}
        transition={{ duration: 0.22, ease: "easeInOut" }}
        className="hidden lg:flex fixed left-0 top-[5.5rem] z-40 flex-col h-[calc(100vh-6rem)] bg-white border-r border-slate-200/90 select-none p-3 justify-between shadow-2xs"
      >
        <div className="flex flex-col gap-2">
          
          {/* Header Row: Title & Minimize Toggle */}
          <div className={`flex items-center ${isMinimized ? "justify-center" : "justify-between"} px-2 pt-1 pb-3 border-b border-slate-100`}>
            {!isMinimized && (
              <span className="text-[11px] font-black uppercase tracking-widest text-[#217044]">
                BSP CCONTINENTAL
              </span>
            )}
            <button 
              type="button"
              onClick={() => setIsMinimized(!isMinimized)}
              className="p-1.5 hover:bg-[#217044]/10 rounded-lg transition-colors cursor-pointer text-slate-600 hover:text-[#217044]"
              title={isMinimized ? "Expand Sidebar" : "Minimize Sidebar"}
            >
              {isMinimized ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-col gap-1 overflow-y-auto max-h-[calc(100vh-14.5rem)] scrollbar-none pr-0.5">
            {desktopMenus.map((item) => {
              const isActive = pathname === item.href;
              const IconComponent = item.icon;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  title={isMinimized ? item.title : ""}
                  className={`relative flex items-center ${isMinimized ? "justify-center px-2" : "px-3.5"} py-2.5 rounded-xl transition-all duration-200 group ${
                    isActive 
                      ? "text-white font-bold" 
                      : "text-slate-600 hover:text-[#217044] hover:bg-[#217044]/10 font-semibold"
                  }`}
                >
                  {/* Active Background Pill */}
                  {isActive && (
                    <motion.div 
                      layoutId="desktopActivePill"
                      className="absolute inset-0 bg-[#217044] rounded-xl -z-10 shadow-2xs"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}

                  {/* Icon */}
                  <div className={`flex items-center justify-center shrink-0 transition-colors ${
                    isActive ? "text-white" : "text-slate-500 group-hover:text-[#217044]"
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

        {/* Bottom Version Badge */}
        <div className={`pt-3 border-t border-slate-100 px-2 flex items-center ${isMinimized ? "justify-center" : "justify-between"}`}>
          {!isMinimized && <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Version</span>}
          <span className="text-[10px] font-extrabold px-2 py-0.5 bg-[#217044]/10 text-[#217044] rounded-md border border-[#217044]/20">
            v1.0
          </span>
        </div>
      </motion.aside>

      {/* ================= MOBILE BOTTOM BAR (4 ITEMS) ================= */}
      <div className="block lg:hidden fixed bottom-0 left-0 right-0 z-50 w-full px-3 pb-3">
        <div className="relative flex items-center justify-around bg-white/95 backdrop-blur-xl border border-slate-200 py-2 px-1 rounded-2xl shadow-2xl">
          {mobileMenus.map((item) => {
            const isActive = pathname === item.href;
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
                    className="absolute inset-x-1 top-0 bottom-0 bg-[#217044]/10 rounded-xl -z-10 border border-[#217044]/30"
                    transition={{ type: "spring", stiffness: 400, damping: 32 }}
                  />
                )}

                {/* Icon Container */}
                <motion.div 
                  whileTap={{ scale: 0.92 }} 
                  className={`p-0.5 transition-colors ${isActive ? "text-[#217044]" : "text-slate-500"}`}
                >
                  <IconComponent 
                    size={20} 
                    strokeWidth={isActive ? 2.5 : 2} 
                  />
                </motion.div>

                {/* Mobile Label */}
                <span className={`mt-0.5 text-[9px] tracking-tight uppercase transition-all truncate px-0.5 max-w-full ${
                  isActive ? "text-[#217044] font-black" : "text-slate-500 font-bold"
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