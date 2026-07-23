"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import { FiHome, FiInfo, FiBriefcase, FiFileText, FiShield, FiBell, FiLogIn, FiLogOut, FiUser } from "react-icons/fi";

export default function Navbar() {
  const pathname = usePathname();

  // 🔥 ADMIN ROUTE GUARD: Agar admin page hai toh Navbar render hi nahi hoga
  if (pathname?.startsWith('/admin')) {
    return null;
  }

  const { data: session, status } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const isLoggedIn = status === "authenticated";
  const userImageUrl = session?.user?.image || "";
  const userName = session?.user?.name || "User";

  const brandColor = "#4933e6";

  const menuItems = [
    { name: "Home", href: "/", icon: <FiHome size={20} /> },
    { name: "About", href: "/about", icon: <FiInfo size={20} /> },
    { name: "Service", href: "/service", icon: <FiBriefcase size={20} /> },
    { name: "Terms", href: "/terms", icon: <FiFileText size={20} /> },
    { name: "Policy", href: "/policy", icon: <FiShield size={20} /> },
  ];

  const handleProfileClick = () => {
    if (isLoggedIn) {
      router.push("/profile");
    } else {
      router.push("/login");
    }
  };

  return (
    <>
      {/* ─── OPTIMIZED CLEAN WHITE NAVBAR (h-20) ─── */}
      <nav className="fixed top-0 left-0 right-0 h-20 bg-white z-40 px-6 md:px-16 lg:px-28 flex items-center justify-between select-none shadow-[0_4px_25px_rgba(0,0,0,0.03)] border-b border-slate-100 transition-all duration-300">
        
        {/* Branding Logo */}
        <div className="flex items-center">
          <Link 
            href="/" 
            className="text-2xl font-black tracking-tight text-black active:scale-95 transition-transform"
          >
            BSP <span className="font-light text-slate-400">Continental</span>
          </Link>
        </div>

        {/* Center Links (Desktop Version) */}
        <div className="hidden md:flex items-center gap-10">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className="text-base font-bold transition-colors relative py-1.5"
                style={{ color: isActive ? brandColor : "#94A3B8" }}
                onMouseEnter={(e) => !isActive && (e.target.style.color = brandColor)}
                onMouseLeave={(e) => !isActive && (e.target.style.color = "#94A3B8")}
              >
                {item.name}
                {isActive && (
                  <motion.div 
                    layoutId="modernNavbarTab"
                    className="absolute bottom-0 left-0 right-0 h-[2.5px] rounded-full"
                    style={{ backgroundColor: brandColor }}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </div>

        {/* Right Side Utility Actions Console */}
        <div className="flex items-center gap-3">
          
          {/* Notification Engine */}
          <button className="relative w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-500 hover:text-black hover:bg-slate-100 transition-all active:scale-95 cursor-pointer">
            <FiBell size={19} />
            <span className="absolute top-3 right-3 w-2 h-2 bg-rose-500 rounded-full ring-2 ring-white" />
          </button>

          {/* Desktop Login Button */}
          {!isLoggedIn && (
            <Link
              href="/login"
              className="hidden md:flex items-center gap-1.5 px-5 py-2.5 rounded-full text-white font-black text-xs uppercase tracking-wider transition-all active:scale-95 shadow-xs"
              style={{ backgroundColor: brandColor }}
              onMouseEnter={(e) => e.target.style.filter = "brightness(1.1)"}
              onMouseLeave={(e) => e.target.style.filter = "none"}
            >
              <FiLogIn size={13} />
              Login
            </Link>
          )}

          {/* Profile Access Badge */}
          <button 
            onClick={handleProfileClick}
            className="relative w-10 h-10 rounded-full overflow-hidden flex items-center justify-center bg-slate-50 border border-slate-200/60 transition-all active:scale-95 cursor-pointer"
          >
            {isLoggedIn ? (
              userImageUrl ? (
                <img src={userImageUrl} alt="Profile" referrerPolicy="no-referrer" className="w-full h-full object-cover" />
              ) : (
                <span className="text-base font-black uppercase select-none" style={{ color: brandColor }}>
                  {userName.trim().charAt(0)}
                </span>
              )
            ) : (
              <span className="text-base font-bold text-slate-400 select-none">?</span>
            )}
          </button>

          {/* Desktop Direct Instant Logout Trigger */}
          {isLoggedIn && (
            <button
              onClick={() => signOut({ callbackUrl: "/login" })}
              className="hidden md:flex w-10 h-10 rounded-full bg-rose-50 hover:bg-rose-100 text-rose-500 hover:text-rose-600 items-center justify-center transition-all active:scale-95 border border-rose-100/40 cursor-pointer"
            >
              <FiLogOut size={16} />
            </button>
          )}

          {/* Hamburger Menu Trigger (Mobile Version) */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-2xl p-2 text-black bg-slate-50 active:scale-90 rounded-full transition-all focus:outline-none"
          >
            {isOpen ? <HiX /> : <HiMenuAlt3 />}
          </button>
        </div>
      </nav>

      {/* ─── PREMIUM SLIDE DRAWER MENU (CLEAN & MINIMALIST ONLY) ─── */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop Layer */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden"
            />

            {/* Side Menu Drawer Container Block */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 220 }}
              className="fixed top-0 right-0 bottom-0 w-[85%] max-w-[320px] bg-white border-l border-slate-100 z-50 p-6 flex flex-col justify-between md:hidden shadow-[-20px_0_50px_rgba(0,0,0,0.05)]"
            >
              <div className="space-y-6">
                
                {/* Drawer Top Heading */}
                <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                  <span className="text-lg font-black tracking-tight text-black">
                    BSP <span className="font-light text-slate-400">Continental</span>
                  </span>
                  <button 
                    onClick={() => setIsOpen(false)}
                    className="text-xl text-black bg-slate-50 p-1.5 rounded-full active:scale-90"
                  >
                    <HiX />
                  </button>
                </div>

                {/* 🔒 PURE CLEAN USER CARD HUD */}
                <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-full bg-white border border-slate-200 overflow-hidden flex items-center justify-center shadow-3xs">
                      {isLoggedIn ? (
                        userImageUrl ? (
                          <img src={userImageUrl} alt="Avatar" className="w-full h-full object-cover" />
                        ) : (
                          <span className="text-base font-black uppercase" style={{ color: brandColor }}>{userName.trim().charAt(0)}</span>
                        )
                      ) : (
                        <span className="text-base font-bold text-slate-400">?</span>
                      )}
                    </div>
                    <div className="overflow-hidden flex-1">
                      <h3 className="text-sm font-black text-slate-950 truncate uppercase tracking-tight">
                        {isLoggedIn ? userName : "Guest"}
                      </h3>
                    </div>
                  </div>

                  {/* Dynamic Action Buttons Trigger Inside Upper Card Context */}
                  <div>
                    {isLoggedIn ? (
                      <button
                        onClick={() => { setIsOpen(false); signOut({ callbackUrl: "/login" }); }}
                        className="flex items-center justify-center gap-1.5 w-full py-2.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-600 font-black text-xs uppercase tracking-wider active:scale-[0.98] transition-all border border-rose-100/40 cursor-pointer"
                      >
                        <FiLogOut size={14} /> Log Out
                      </button>
                    ) : (
                      <Link
                        href="/login"
                        onClick={() => setIsOpen(false)}
                        className="flex items-center justify-center gap-1.5 w-full py-2.5 rounded-xl text-white font-black text-xs uppercase tracking-wider shadow-sm active:scale-[0.98] transition-all text-center"
                        style={{ backgroundColor: brandColor }}
                      >
                        <FiLogIn size={14} /> Login
                      </Link>
                    )}
                  </div>
                </div>

                {/* Mobile Menu List Links */}
                <div className="flex flex-col gap-1">
                  {menuItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                      <Link
                        key={item.name}
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className="flex items-center gap-4 text-base font-black px-4 py-3 rounded-xl transition-all duration-150 active:scale-[0.98]"
                        style={{ 
                          backgroundColor: isActive ? `${brandColor}10` : "transparent",
                          color: isActive ? brandColor : "#334155"
                        }}
                      >
                        <span style={{ color: isActive ? brandColor : "#94A3B8" }}>
                          {item.icon}
                        </span>
                        {item.name}
                      </Link>
                    );
                  })}

                  {/* Mobile Profile View Trigger */}
                  {isLoggedIn && (
                    <Link
                      href="/profile"
                      onClick={() => setIsOpen(false)}
                      className="flex items-center gap-4 text-base font-black px-4 py-3 rounded-xl transition-all duration-150 active:scale-[0.98]"
                      style={{ 
                        backgroundColor: pathname === "/profile" ? `${brandColor}10` : "transparent",
                        color: pathname === "/profile" ? brandColor : "#334155"
                      }}
                    >
                      <span style={{ color: pathname === "/profile" ? brandColor : "#94A3B8" }}><FiUser size={20} /></span>
                      My Profile
                    </Link>
                  )}
                </div>
              </div>

              {/* Fixed Footer */}
              <div className="text-center pt-4 border-t border-slate-100">
                <p className="text-[10px] text-slate-400 font-bold tracking-wider uppercase">
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