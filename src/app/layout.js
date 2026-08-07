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
  title: "BSP CCONTINENTAL PVT LTD | Financial & Property Compliance Services",
  description: "BSP CCONTINENTAL PVT LTD is a next generation financial consultancy & property compliance service provider dedicated to investors or loan applicants to secure financial and property related decisions.",
  keywords: [
    "BSP CCONTINENTAL",
    "Financial Consultancy",
    "Property Compliance",
    "Credit Score Management",
    "Loan Readiness",
    "Property Verification",
    "Chhattisgarh Property Vetting"
  ],
  // 🌟 Added Favicon Configuration for your JPEG logo in app folder
  icons: {
    icon: "/favicon.jpeg", 
  },
  openGraph: {
    title: "BSP CCONTINENTAL PVT LTD | Financial & Property Compliance Services",
    description: "BSP CCONTINENTAL PVT LTD is a next generation financial consultancy & property compliance service provider dedicated to investors or loan applicants to secure financial and property related decisions.",
    siteName: "BSP CCONTINENTAL PVT LTD",
    images: [
      {
        url: "/images/Bsp Ccontinental financial logo PNG (1).png",
        width: 1200,
        height: 630,
        alt: "BSP CCONTINENTAL Logo",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "BSP CCONTINENTAL PVT LTD | Financial & Property Compliance Services",
    description: "BSP CCONTINENTAL PVT LTD is a next generation financial consultancy & property compliance service provider dedicated to investors or loan applicants to secure financial and property related decisions.",
    images: ["/images/Bsp Ccontinental financial logo PNG (1).png"],
  },
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