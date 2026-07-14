import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import Navbar from "./components/Navbar";
import BottomNavigation from "./components/BottomNavigation";

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
  description:
    "Manage your service requests and documents securely in one place.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-screen bg-slate-50 text-slate-900 font-sans">
        {/* Top Navbar */}
        <Navbar />

        {/* Page Content */}
        <main className="min-h-screen pt-16 pb-24">
          {children}
        </main>

        {/* Bottom Navigation */}
        <BottomNavigation />
      </body>
    </html>
  );
}