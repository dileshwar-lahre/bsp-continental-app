import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import NextAuthProvider from "../providers/NextAuthProvider"; 
import NavShell from "./components/NavShell";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "DocManager - Premium Document Management System",
  description: "Manage your service requests and documents securely in one place.",
};

export default function RootLayout({ children }) {
  return (
    // ✅ THE SYSTEM OVERRIDE: Added light color scheme properties to disable dynamic dark mode bugs
    <html
      lang="en"
      style={{ colorScheme: "light" }} 
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased scroll-smooth bg-slate-50`}
    >
      <body className="min-h-screen bg-slate-50 text-slate-900 font-sans antialiased">
        
        {/* 🔥 DYNAMIC WRAPPER ENGINE LOCK */}
        <NextAuthProvider>
          
          {/* Dynamic Nav Switcher */}
          <NavShell>
            {children}
          </NavShell>
          
        </NextAuthProvider>
        
      </body>
    </html>
  );
}