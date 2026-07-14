"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import { FiHome, FiInfo, FiBriefcase, FiFileText, FiShield, FiBell, FiLogIn } from "react-icons/fi";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // 🔐 Auth States (Back-end logic connect karne ke liye)
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Login hone par isko true kar dena
  const userImageUrl = ""; // User ki profile image ka URL yahan aayega

  const menuItems = [
    { name: "Home", href: "/", icon: <FiHome size={22} /> },
    { name: "About", href: "/about", icon: <FiInfo size={22} /> },
    { name: "Service", href: "/service", icon: <FiBriefcase size={22} /> },
    { name: "Terms", href: "/terms", icon: <FiFileText size={22} /> },
    { name: "Policy", href: "/policy", icon: <FiShield size={22} /> },
  ];

  return (
    <>
      {/* ─── 3D MODERN WHITE NAVBAR ─── */}
      <nav className="fixed top-0 left-0 right-0 h-24 bg-white z-40 px-6 md:px-20 lg:px-32 flex items-center justify-between select-none shadow-[0_10px_30px_rgba(0,0,0,0.05)] border-b border-slate-100/80 transition-all duration-300">
        
        {/* Left Side: Simple Branding */}
        <div className="flex items-center">
          <Link 
            href="/" 
            className="text-2xl md:text-3xl font-extrabold tracking-tight text-black active:scale-95 transition-transform"
            style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}
          >
            BSP <span className="font-light text-slate-500">Continental</span>
          </Link>
        </div>

        {/* Center: Desktop Menu Links */}
        <div className="hidden md:flex items-center gap-10 lg:gap-14">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`text-base md:text-lg font-bold transition-colors relative py-2 ${
                  isActive ? "text-black" : "text-slate-500 hover:text-black"
                }`}
              >
                {item.name}
                {isActive && (
                  <motion.div 
                    layoutId="modern3DTab"
                    className="absolute bottom-0 left-0 right-0 h-[3px] bg-black rounded-full"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </div>

        {/* Right Side: Actions (Notification, Profile, Login & Toggle) */}
        <div className="flex items-center gap-3 md:gap-5">
          
          {/* Notification Bell */}
          <button 
            className="relative w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center text-slate-700 hover:text-black hover:bg-slate-100 transition-all active:scale-95"
            aria-label="Notifications"
          >
            <FiBell size={22} />
            <span className="absolute top-3 right-3 w-2.5 h-2.5 bg-red-500 rounded-full ring-2 ring-white" />
          </button>

          {/* Desktop Login Button (Hidden when Logged In) */}
          {!isLoggedIn && (
            <Link
              href="/login"
              className="hidden md:flex items-center gap-2 px-5 py-2.5 rounded-full border border-slate-900 text-black font-extrabold text-sm hover:bg-black hover:text-white transition-all active:scale-95 shadow-[0_4px_12px_rgba(0,0,0,0.05)]"
            >
              <FiLogIn size={16} />
              Login
            </Link>
          )}

          {/* Profile Badge (With Question Mark Placeholder) */}
          <Link 
            href="/profile" 
            className="relative w-12 h-12 rounded-full overflow-hidden flex items-center justify-center bg-slate-100 hover:bg-slate-200 transition-all active:scale-95 border border-slate-200"
            aria-label="User Profile"
          >
            {isLoggedIn && userImageUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={userImageUrl} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <span className="text-xl font-black text-slate-600 select-none">?</span>
            )}
          </Link>

          {/* Mobile Menu Burger Icon */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-3xl p-1 text-black active:scale-90 focus:outline-none"
            aria-label="Toggle Menu"
          >
            {isOpen ? <HiX /> : <HiMenuAlt3 />}
          </button>
        </div>
      </nav>

      {/* ─── PREMIUM MOBILE LEFT DRAWER MENU ─── */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 md:hidden"
            />

            {/* Baya Side Menu Layer */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 250 }}
              className="fixed top-0 left-0 bottom-0 w-[85%] max-w-[340px] bg-white z-50 p-6 flex flex-col justify-between md:hidden rounded-r-[2.5rem] shadow-[30px_0_60px_rgba(0,0,0,0.12)]"
            >
              <div className="flex flex-col gap-6">
                {/* Header inside Drawer */}
                <div className="flex items-center justify-between pb-5 border-b border-slate-100">
                  <span className="text-2xl font-black tracking-tight text-black">
                    BSP <span className="font-light text-slate-500">Continental</span>
                  </span>
                  <button 
                    onClick={() => setIsOpen(false)}
                    className="text-3xl text-black p-1 active:scale-90 transition-transform"
                  >
                    <HiX />
                  </button>
                </div>

                {/* Mobile Login Section inside Drawer (Hidden when Logged In) */}
                {!isLoggedIn && (
                  <div className="px-2 pt-2">
                    <Link
                      href="/login"
                      onClick={() => setIsOpen(false)}
                      className="flex items-center justify-center gap-3 w-full py-4 rounded-2xl bg-black text-white font-black text-lg shadow-[0_10px_20px_rgba(0,0,0,0.15)] active:scale-[0.98] transition-all"
                    >
                      <FiLogIn size={20} />
                      Login Account
                    </Link>
                  </div>
                )}

                {/* Navigation Links */}
                <div className="flex flex-col gap-1 mt-2">
                  {menuItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                      <Link
                        key={item.name}
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className={`flex items-center gap-5 text-xl font-black px-5 py-4 rounded-2xl transition-all duration-200 active:scale-[0.97] ${
                          isActive 
                            ? "bg-slate-50 text-black shadow-sm" 
                            : "text-slate-800 hover:text-black hover:bg-slate-50/60"
                        }`}
                      >
                        <span className="text-black">
                          {item.icon}
                        </span>
                        {item.name}
                      </Link>
                    );
                  })}
                </div>
              </div>

              {/* Drawer Footer */}
              <div className="text-center pt-4 border-t border-slate-100">
                <p className="text-sm text-slate-400 font-bold tracking-wide">
                  © 2026 BSP Continental
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}