"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Home, 
  FileCheck, 
  Landmark, 
  ShieldCheck, 
  ChevronLeft, 
  ChevronRight, 
  GripVertical 
} from "lucide-react";

const menus = [
  { title: "Home", href: "/", icon: Home },
  { title: "Vetting", href: "/property-vetting", icon: FileCheck },
  { title: "Loans", href: "/loan", icon: Landmark },
  { title: "CIBIL", href: "/cibil", icon: ShieldCheck },
];

export default function BottomNavigation() {
  const pathname = usePathname();

  // 🔥 ADMIN ROUTE GUARD: Admin routes par render nahi hoga
  if (pathname?.startsWith('/admin')) {
    return null;
  }

  const [isMinimized, setIsMinimized] = useState(false);

  return (
    <>
      {/* ================= DESKTOP DRAGGABLE SIDEBAR DOCK ================= */}
      <motion.div
        drag
        dragMomentum={false}
        dragElastic={0.1}
        initial={{ x: 24, y: 140 }}
        className="hidden md:flex fixed z-50 bg-white/90 backdrop-blur-xl border border-slate-200/90 shadow-[0_12px_40px_rgba(0,0,0,0.12)] rounded-2xl p-2.5 flex-col items-center gap-3 cursor-grab active:cursor-grabbing select-none"
        style={{ touchAction: "none" }}
      >
        {/* Drag Handle & Minimize Toggle Header */}
        <div className="flex items-center justify-between w-full border-b border-slate-100 pb-2 px-1 text-slate-400">
          <GripVertical size={16} className="opacity-60 text-slate-500" />
          <button 
            type="button"
            onClick={() => setIsMinimized(!isMinimized)}
            className="p-1 hover:bg-slate-100/80 rounded-lg transition-colors cursor-pointer text-slate-700 hover:text-black"
            title={isMinimized ? "Expand Dock" : "Collapse Dock"}
          >
            {isMinimized ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
          </button>
        </div>

        {/* Navigation Items Vertical Stack */}
        <div className={`flex flex-col gap-1.5 transition-all duration-300 ${isMinimized ? "w-12" : "w-44"}`}>
          {menus.map((item) => {
            const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
            const IconComponent = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative flex items-center p-2.5 rounded-xl transition-all select-none group ${
                  isActive ? "bg-slate-900 text-white shadow-xs" : "hover:bg-slate-100/80 text-slate-700"
                }`}
              >
                {/* Active Glow Indicator */}
                {isActive && (
                  <motion.div 
                    layoutId="desktopActivePill"
                    className="absolute inset-0 bg-slate-900 rounded-xl -z-10"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}

                {/* Icon Box */}
                <div className={`flex items-center justify-center shrink-0 ${isActive ? "text-white" : "text-slate-900 group-hover:text-black"}`}>
                  <IconComponent size={20} strokeWidth={isActive ? 2.5 : 2} />
                </div>

                {/* Text Label (Hidden when Minimized) */}
                {!isMinimized && (
                  <span className={`ml-3 text-xs tracking-wide truncate ${isActive ? "font-extrabold text-white" : "font-bold text-slate-800"}`}>
                    {item.title}
                  </span>
                )}
              </Link>
            );
          })}
        </div>
      </motion.div>

      {/* ================= MOBILE BOTTOM BAR ================= */}
      <div className="block md:hidden fixed bottom-0 left-0 right-0 z-50 w-full px-3 pb-3">
        <div className="relative flex items-center justify-around bg-white/95 backdrop-blur-xl border border-slate-200/90 py-2.5 px-2 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.12)]">
          
          {menus.map((item) => {
            const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
            const IconComponent = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                className="relative flex-1 flex flex-col items-center justify-center py-1 outline-none select-none group"
              >
                {/* Active Background Pill Animation */}
                {isActive && (
                  <motion.div 
                    layoutId="mobileActivePill"
                    className="absolute inset-x-1 top-0 bottom-0 bg-slate-100 rounded-xl -z-10 border border-slate-200/60"
                    transition={{ type: "spring", stiffness: 400, damping: 32 }}
                  />
                )}

                {/* Icon Container */}
                <motion.div 
                  whileTap={{ scale: 0.92 }} 
                  className={`p-1 transition-all ${isActive ? "text-blue-600" : "text-slate-700"}`}
                >
                  <IconComponent 
                    size={22} 
                    strokeWidth={isActive ? 2.6 : 2} 
                  />
                </motion.div>

                {/* Larger Bold Labels */}
                <span className={`mt-0.5 text-xs tracking-tight transition-all ${isActive ? "text-slate-950 font-black" : "text-slate-600 font-bold"}`}>
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