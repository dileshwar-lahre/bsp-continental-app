import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import NextAuthProvider from "../providers/NextAuthProvider"; 
import NavShell from "./components/NavShell";
import Footer from "./components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "BSP CCONTINENTAL PVT LTD | Financial & Property Compliance Services",
  description: "BSP CCONTINENTAL PVT LTD is a next generation financial consultancy & property compliance service provider.",
};

export default function RootLayout({ children }) {
  // 🔴 SITE AVAILABILITY SWITCH: true rakhne par transparent blur overlay aur icon/404 dikhega
  const isSiteLocked = true; 

  return (
    <html
      lang="en"
      style={{ colorScheme: "light" }} 
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased scroll-smooth bg-slate-50`}
    >
      <body className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans antialiased relative">
        <NextAuthProvider>
          
          {/* 🚫 FULLY TRANSPARENT OVERLAY WITH BLUR & ERROR ICON/404 (NO TEXT) */}
          {isSiteLocked && (
            <div className="fixed inset-0 z-[999999] bg-transparent backdrop-blur-[4px] flex flex-col items-center justify-center p-6 select-none pointer-events-auto">
              <div className="flex flex-col items-center justify-center space-y-4">
                
                {/* Transparent Error / Warning Icon */}
                <div className="w-24 h-24 sm:w-28 sm:h-28 bg-transparent text-rose-500 rounded-3xl flex items-center justify-center animate-pulse drop-shadow-[0_10px_20px_rgba(244,63,94,0.3)]">
                  <svg 
                    className="w-14 h-14 sm:w-16 sm:h-16 stroke-[2.5]" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" 
                    />
                  </svg>
                </div>

                {/* Transparent 404 Badge */}
                <div className="px-5 py-1.5 rounded-xl bg-transparent text-rose-500 font-mono text-xl sm:text-2xl font-black tracking-widest drop-shadow-[0_4px_10px_rgba(244,63,94,0.3)]">
                  404
                </div>

              </div>
            </div>
          )}

          <div className="flex-1">
            <NavShell>
              {children}
            </NavShell>
          </div>
          <Footer />
        </NextAuthProvider>
      </body>
    </html>
  );
}