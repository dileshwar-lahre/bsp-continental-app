"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { 
  Inbox, 
  Users, 
  CheckCircle2, 
  XCircle, 
  ChevronLeft, 
  ChevronRight, 
  GripVertical 
} from "lucide-react";

const adminMenus = [
  { title: "Requests", href: "/admin/dashboard", icon: Inbox },
  { title: "Users", href: "/admin/users", icon: Users },
  { title: "Approved", href: "/admin/approved", icon: CheckCircle2 },
  { title: "Rejected", href: "/admin/rejected", icon: XCircle },
];

export default function AdminBottomNavigation() {
  const pathname = usePathname();
  const [hoveredTab, setHoveredTab] = useState(null);
  const [isMinimized, setIsMinimized] = useState(false);

  return (
    <>
      {/* ================= DESKTOP SIDEBAR WIDGET (Draggable Admin Console) ================= */}
      <motion.div
        drag
        dragMomentum={false}
        dragElastic={0.1}
        initial={{ x: 30, y: 150 }}
        className="hidden md:flex fixed z-50 bg-white border border-slate-200 shadow-[0_10px_40px_rgba(0,0,0,0.12),inset_0_1px_0_rgba(255,255,255,1)] rounded-2xl p-3 flex-col items-center gap-4 cursor-grab active:cursor-grabbing select-none"
        style={{ touchAction: "none" }}
      >
        {/* Drag Handle & Minimize Trigger */}
        <div className="flex items-center justify-between w-full border-b border-slate-100 pb-2 text-slate-400">
          <GripVertical size={16} className="opacity-50" />
          <button 
            onClick={() => setIsMinimized(!isMinimized)}
            className="p-1 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
          >
            {isMinimized ? <ChevronRight size={16} className="text-black" /> : <ChevronLeft size={16} className="text-black" />}
          </button>
        </div>

        {/* Navigation Stack (Top to Bottom) */}
        <div className={`flex flex-col gap-2 transition-all duration-300 ${isMinimized ? "w-12" : "w-44"}`}>
          {adminMenus.map((item) => {
            const isActive = pathname === item.href || (item.href !== "/admin/dashboard" && pathname.startsWith(item.href));
            const IconComponent = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative flex items-center p-3 rounded-xl transition-all select-none overflow-hidden group ${
                  isActive ? "bg-slate-100" : "hover:bg-slate-50"
                }`}
                onMouseEnter={() => setHoveredTab(item.href)}
                onMouseLeave={() => setHoveredTab(null)}
              >
                {/* Active Indicator Line */}
                {isActive && (
                  <motion.div 
                    layoutId="activeIndicatorAdminDesktop"
                    className="absolute left-0 top-1/4 bottom-1/4 w-[4px] bg-[#4933e6] rounded-r-md" 
                  />
                )}

                {/* Icon Rendering */}
                <div className={`flex items-center justify-center ${isActive ? "text-[#4933e6]" : "text-black"}`}>
                  <IconComponent size={22} strokeWidth={isActive ? 2.8 : 2.2} />
                </div>

                {/* Text Label Hidden on Minimize */}
                {!isMinimized && (
                  <span className={`ml-3 text-xs tracking-wide transition-colors ${isActive ? "font-extrabold text-[#4933e6]" : "font-semibold text-slate-700"}`}>
                    {item.title}
                  </span>
                )}
              </Link>
            );
          })}
        </div>
      </motion.div>

      {/* ================= MOBILE BOTTOM BAR (Attached to screen bottom) ================= */}
      <div className="block md:hidden fixed bottom-0 left-0 right-0 z-50 w-full">
        <div className="relative flex items-center justify-around bg-white border-t border-slate-200/80 px-2 pt-3 pb-6 rounded-t-[24px] shadow-[0_-8px_30px_rgba(0,0,0,0.08)]">
          
          {adminMenus.map((item) => {
            const isActive = pathname === item.href || (item.href !== "/admin/dashboard" && pathname.startsWith(item.href));
            const IconComponent = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                className="relative flex-1 flex flex-col items-center justify-center py-1 outline-none select-none group"
              >
                {/* Active Top Bar Indicator */}
                {isActive && (
                  <div className="absolute -top-[13px] left-1/2 -translate-x-1/2 w-10 h-[3px] bg-[#4933e6] rounded-full shadow-[0_2px_8px_rgba(73,51,230,0.4)]" />
                )}

                {/* Icon with Active State Colors */}
                <motion.div whileTap={{ scale: 0.92 }} className={`p-0.5 ${isActive ? "text-[#4933e6]" : "text-black"}`}>
                  <IconComponent 
                    size={22} 
                    strokeWidth={isActive ? 2.8 : 2.2} 
                    className="transition-transform duration-200"
                  />
                </motion.div>

                {/* Labels */}
                <span className={`mt-1 text-[10px] tracking-wide transition-all ${isActive ? "text-[#4933e6] font-extrabold" : "text-slate-600 font-semibold"}`}>
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