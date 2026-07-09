import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";

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
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased scroll-smooth`}
    >
      <body className="h-full bg-[#F9FAFB] text-[#0F172A] flex flex-col font-sans">
        {/* Modern Navbar Top Section */}
        <Navbar />
        
        {/* Dynamic Body Content */}
        <main className="flex-grow flex flex-col">
          {children}
        </main>
      </body>
    </html>
  );
}