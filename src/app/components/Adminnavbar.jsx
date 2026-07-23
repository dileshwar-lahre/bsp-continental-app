"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import { 
  FiSearch, 
  FiBell, 
  FiLogOut, 
  FiInfo, 
  FiGrid, 
  FiShield, 
  FiExternalLink,
  FiFilter,
  FiChevronDown,
  FiFileText,
  FiX
} from "react-icons/fi";

export default function AdminNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [filterDropdown, setFilterDropdown] = useState(false);
  
  // Dynamic Placeholder Animation State
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const placeholders = [
    "Search Paper Check Requests...",
    "Search Loan Reject Solutions...",
    "Search CIBIL Audit Checks...",
    "Search Users or Email Addresses..."
  ];

  const router = useRouter();

  // High-Quality Modern Admin Avatar
  const adminAvatarUrl = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80";

  const filterOptions = [
    { label: "All Requests", value: "All" },
    { label: "Paper Check Request", value: "Paper Check" },
    { label: "Loan Reject Solution", value: "Loan Reject" },
    { label: "CIBIL Audit Check", value: "CIBIL Check" },
  ];

  // Auto-cycle through search placeholders
  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex((prev) => (prev + 1) % placeholders.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleAdminLogout = () => {
    document.cookie = "bsp_admin_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    setIsOpen(false);
    router.push("/admin/login");
  };

  return (
    <>
      {/* ─── MODERN TRANSPARENT GLASS NAVBAR (h-20) ─── */}
      <nav className="fixed top-0 left-0 right-0 h-20 bg-white/80 backdrop-blur-xl z-50 px-4 sm:px-8 lg:px-20 xl:px-28 flex items-center justify-between select-none border-b border-slate-200/70 shadow-[0_4px_25px_rgba(0,0,0,0.03)] transition-all">
        
        {/* Branding Logo Area - Pure Black Text (No Badges) */}
        <div className="flex items-center">
          <Link 
            href="/admin/dashboard" 
            className="text-lg sm:text-xl font-black tracking-tight text-black active:scale-95 transition-transform whitespace-nowrap"
          >
            <span>
              BSP <span className="font-light text-slate-950">Continental</span>
            </span>
          </Link>
        </div>

        {/* Center: Desktop Transparent Modern Search Bar with Dynamic Query Placeholder */}
        <div className="hidden md:flex items-center flex-1 max-w-lg mx-8">
          <div className="relative w-full flex items-center bg-slate-100/60 backdrop-blur-md border border-slate-200/80 rounded-2xl p-1 shadow-3xs focus-within:border-blue-600 focus-within:bg-white focus-within:ring-4 focus-within:ring-blue-500/10 transition-all">
            
            {/* Integrated Filter Button */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setFilterDropdown(!filterDropdown)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-slate-800 bg-white/90 hover:bg-slate-100 border border-slate-200/70 transition-all cursor-pointer whitespace-nowrap"
              >
                <FiFilter size={12} className="text-blue-600" />
                <span>{selectedFilter}</span>
                <FiChevronDown size={12} className="text-slate-400" />
              </button>

              {/* Desktop Filter Dropdown */}
              <AnimatePresence>
                {filterDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    className="absolute top-11 left-0 w-48 bg-white/95 backdrop-blur-xl border border-slate-200 rounded-2xl shadow-xl py-1.5 z-50 text-xs font-bold"
                  >
                    {filterOptions.map((opt) => (
                      <button
                        key={opt.value}
                        onClick={() => {
                          setSelectedFilter(opt.value);
                          setFilterDropdown(false);
                        }}
                        className={`w-full text-left px-3.5 py-2 hover:bg-blue-50 hover:text-blue-600 transition-colors flex items-center justify-between ${
                          selectedFilter === opt.value ? "text-blue-600 font-black bg-blue-50/60" : "text-slate-700"
                        }`}
                      >
                        <span>{opt.label}</span>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Input with Dynamic Animated Placeholder */}
            <div className="relative flex-1">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={placeholders[placeholderIndex]}
                className="w-full bg-transparent pl-9 pr-4 py-1.5 text-xs font-semibold text-black placeholder:text-slate-400 placeholder:transition-all focus:outline-none"
              />
              <FiSearch className="absolute left-3 top-2.5 text-slate-400" size={15} />
            </div>

          </div>
        </div>

        {/* Right Side Utility Console */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          
          {/* Mobile Search Trigger Icon */}
          <button
            onClick={() => setSearchOpen(true)}
            className="md:hidden w-10 h-10 rounded-xl bg-slate-100/70 border border-slate-200/60 flex items-center justify-center text-slate-700 active:scale-90 transition-all cursor-pointer"
            title="Search"
          >
            <FiSearch size={18} />
          </button>

          {/* Notification Engine */}
          <button className="relative w-10 h-10 rounded-xl bg-slate-100/70 border border-slate-200/60 flex items-center justify-center text-slate-700 hover:text-black hover:bg-slate-100 transition-all active:scale-95 cursor-pointer">
            <FiBell size={18} />
            <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-blue-600 rounded-full ring-2 ring-white animate-pulse" />
          </button>

          {/* Admin Profile Badge */}
          <div className="relative h-10 px-2 sm:px-3 rounded-2xl flex items-center gap-2.5 bg-slate-100/70 border border-slate-200/80 select-none shadow-3xs hover:bg-slate-100 transition-all">
            <div className="relative w-7 h-7 sm:w-8 sm:h-8 rounded-xl overflow-hidden ring-2 ring-blue-600/30 shadow-xs shrink-0">
              <img 
                src={adminAvatarUrl} 
                alt="Super Admin" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="hidden sm:block text-left pr-1">
              <p className="text-xs font-black text-black leading-none">Super Admin</p>
            </div>
          </div>

          {/* Desktop Logout Trigger */}
          <button
            onClick={handleAdminLogout}
            title="Exit Admin Terminal"
            className="hidden md:flex w-10 h-10 rounded-2xl bg-rose-50 hover:bg-rose-100 text-rose-600 items-center justify-center transition-all active:scale-95 border border-rose-200/60 cursor-pointer shadow-3xs"
          >
            <FiLogOut size={16} />
          </button>

          {/* Hamburger Menu Trigger (Mobile) */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-2xl p-1.5 text-black bg-slate-100/70 active:scale-90 rounded-xl transition-all focus:outline-none border border-slate-200/60"
          >
            {isOpen ? <HiX /> : <HiMenuAlt3 />}
          </button>
        </div>
      </nav>

      {/* ─── MOBILE SEARCH OVERLAY WITH CLOSE (CUT) BUTTON ─── */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-xl border-b border-slate-200/80 p-4 shadow-2xl z-50 md:hidden space-y-3"
          >
            {/* Top Row: Search Title & Close Button */}
            <div className="flex items-center justify-between">
              <span className="text-xs font-black text-black uppercase tracking-wider">Search Console</span>
              <button
                onClick={() => setSearchOpen(false)}
                className="p-1.5 text-slate-500 hover:text-black bg-slate-100 rounded-full active:scale-90 transition-all cursor-pointer"
              >
                <FiX size={18} />
              </button>
            </div>

            {/* Mobile Filter Badges */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
              {filterOptions.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => setSelectedFilter(opt.value)}
                  className={`px-3 py-1.5 rounded-xl text-[11px] font-extrabold transition-all shrink-0 cursor-pointer ${
                    selectedFilter === opt.value
                      ? "bg-blue-600 text-white shadow-xs"
                      : "bg-slate-100 text-slate-700"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative w-full">
              <input
                type="text"
                autoFocus
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={placeholders[placeholderIndex]}
                className="w-full bg-slate-100/80 border border-slate-200 rounded-xl pl-10 pr-10 py-2.5 text-xs font-semibold text-black placeholder:text-slate-400 focus:outline-none focus:border-blue-600"
              />
              <FiSearch className="absolute left-3.5 top-3 text-slate-400" size={16} />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-3 text-slate-400 text-xs font-bold"
                >
                  Clear
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── MOBILE DRAWER MENU ─── */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/30 backdrop-blur-xs z-40 md:hidden"
            />

            {/* Slide Drawer */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 220 }}
              className="fixed top-0 right-0 bottom-0 w-[84%] max-w-[310px] bg-white border-l border-slate-100 z-50 p-6 flex flex-col justify-between md:hidden shadow-2xl"
            >
              <div className="space-y-6">
                
                {/* Drawer Header */}
                <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                  <span className="text-lg font-black tracking-tight text-black whitespace-nowrap">
                    BSP <span className="font-light text-slate-950">Continental</span>
                  </span>
                  <button 
                    onClick={() => setIsOpen(false)}
                    className="text-xl text-slate-700 bg-slate-100 p-1.5 rounded-full active:scale-90"
                  >
                    <HiX />
                  </button>
                </div>

                {/* Profile Card */}
                <div className="bg-slate-950 text-white rounded-2xl p-4 flex items-center justify-between shadow-lg relative overflow-hidden">
                  <div className="flex items-center gap-3 relative z-10">
                    <div className="w-10 h-10 rounded-xl overflow-hidden ring-2 ring-blue-500/40 shrink-0">
                      <img 
                        src={adminAvatarUrl} 
                        alt="Admin Profile" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="overflow-hidden">
                      <h3 className="text-xs font-black text-white truncate">
                        Super Admin
                      </h3>
                      <p className="text-[9px] font-bold text-blue-400 flex items-center gap-1 mt-0.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                        Active Console
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={handleAdminLogout}
                    title="Logout"
                    className="p-2 text-rose-400 hover:bg-rose-500/20 rounded-xl transition-all relative z-10"
                  >
                    <FiLogOut size={16} />
                  </button>
                </div>

                {/* Navigation Links */}
                <div className="space-y-1.5">
                  <Link
                    href="/request/paper-check"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-3 text-xs font-extrabold text-slate-800 px-3.5 py-3 rounded-xl hover:bg-blue-50 hover:text-blue-600 transition-all active:scale-95"
                  >
                    <FiFileText size={16} className="text-blue-600" />
                    <span>Paper Check Request</span>
                  </Link>

                  <Link
                    href="/request/loan-reject-solution"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-3 text-xs font-extrabold text-slate-800 px-3.5 py-3 rounded-xl hover:bg-blue-50 hover:text-blue-600 transition-all active:scale-95"
                  >
                    <FiGrid size={16} className="text-blue-600" />
                    <span>Loan Reject Solution</span>
                  </Link>

                  <Link
                    href="/request/cibil-audit"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-3 text-xs font-extrabold text-slate-800 px-3.5 py-3 rounded-xl hover:bg-blue-50 hover:text-blue-600 transition-all active:scale-95"
                  >
                    <FiShield size={16} className="text-blue-600" />
                    <span>CIBIL Audit Check</span>
                  </Link>

                  <Link
                    href="/about"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-3 text-xs font-extrabold text-slate-800 px-3.5 py-3 rounded-xl hover:bg-blue-50 hover:text-blue-600 transition-all active:scale-95"
                  >
                    <FiInfo size={16} className="text-blue-600" />
                    <span>About Platform</span>
                  </Link>
                </div>

              </div>

              {/* Drawer Footer Branding Badge (Stonenox Link) */}
              <div className="pt-4 border-t border-slate-100 text-center">
                <a
                  href="https://stonenox.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-black text-white text-[10px] font-black uppercase tracking-widest hover:bg-blue-600 transition-all active:scale-95 shadow-md"
                >
                  <span>stone v1.0</span>
                  <FiExternalLink size={10} className="text-slate-400" />
                </a>
              </div>

            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}