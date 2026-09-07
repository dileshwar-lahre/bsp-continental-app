"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();
  const isDashboard = pathname?.startsWith("/dashboard");

  const servicesLinks = [
    { title: "Financial Consulting", href: "/services/financial-consulting" },
    { title: "Loan Readiness", href: "/services/Project-Finance-Assistance" },
    { title: "CIBIL Score Management", href: "/services/cibil-management" },
    { title: "Property Compliance", href: "/services/property-compliance" },
  ];

  const companyLinks = [
    { title: "About Us", href: "/about" },
    { title: "How It Works", href: "/#how-it-works" },
    { title: "Contact", href: "/contact" },
    { title: "Track Request", href: "/my-requests" },
    { title: "Client Login", href: "/login" },
  ];

  return (
    <footer
      className={`w-full bg-[#083520] text-white pt-14 select-none antialiased transition-all duration-300 ${
        isDashboard ? "lg:pl-64 pb-24 lg:pb-8" : "pb-8"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-14 space-y-12">
        
        {/* 4 COLUMNS TOP ALIGNED */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          
          <div className="lg:col-span-4 space-y-3">
            <Link href="/" className="inline-block">
              <div className="bg-white rounded border border-white/60 p-0 w-[190px] sm:w-[220px] h-[58px] sm:h-[68px] flex items-center justify-center overflow-hidden shadow-sm">
                <Image
                  src="/images/Bsp Ccontinental financial logo PNG (1).png"
                  alt="BSP Ccontinental"
                  width={400}
                  height={130}
                  className="w-full h-full object-contain scale-[1.65] sm:scale-[1.45] origin-center select-none"
                  priority
                />
              </div>
            </Link>
            <p className="text-xs sm:text-[13px] text-white/85 font-normal leading-relaxed max-w-xs">
              Integrated financial and property compliance advisory serving clients across Chhattisgarh.
            </p>
          </div>

          <div className="lg:col-span-3 space-y-3.5">
            <h3 className="text-sm sm:text-base font-bold text-[#f3c251] tracking-wide">
              Services
            </h3>
            <ul className="space-y-2 text-xs sm:text-[13px] text-white/85">
              {servicesLinks.map((item, idx) => (
                <li key={idx}>
                  <Link 
                    href={item.href} 
                    className="hover:text-[#f3c251] transition-colors block"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2 space-y-3.5">
            <h3 className="text-sm sm:text-base font-bold text-[#f3c251] tracking-wide">
              Company
            </h3>
            <ul className="space-y-2 text-xs sm:text-[13px] text-white/85">
              {companyLinks.map((item, idx) => (
                <li key={idx}>
                  <Link 
                    href={item.href} 
                    className="hover:text-[#f3c251] transition-colors block"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3 space-y-3.5">
            <h3 className="text-sm sm:text-base font-bold text-[#f3c251] tracking-wide">
              Contact
            </h3>
            <div className="space-y-2 text-xs sm:text-[13px] text-white/85 font-normal">
              <p>
                <a href="tel:9575059137" className="hover:text-[#f3c251] transition-colors">
                  +91 95750 59137
                </a>
              </p>
              <p>
                <a href="tel:9575959137" className="hover:text-[#f3c251] transition-colors">
                  +91 95759 59137
                </a>
              </p>
              <p>
                <a href="mailto:bspccontinental@gmail.com" className="hover:text-[#f3c251] transition-colors">
                  bspccontinental@gmail.com
                </a>
              </p>
              <p className="text-white/80">
                Bilaspur, Chhattisgarh
              </p>
            </div>
          </div>

        </div>

        {/* BOTTOM STRIP */}
        <div className="pt-8 border-t border-white/10 space-y-6">
          <div className="flex flex-wrap items-center gap-x-2 text-xs text-white/80 font-normal">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <span>|</span>
            <Link href="/terms" className="hover:text-white transition-colors">Terms and Conditions</Link>
            <span>|</span>
            <Link href="/refund-policy" className="hover:text-white transition-colors">Refund &amp; Cancellation</Link>
            <span>|</span>
            <Link href="/client-consent" className="hover:text-white transition-colors">Client Consent</Link>
            <span>|</span>
            <Link href="/contact" className="hover:text-white transition-colors">Help and Support</Link>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-2">
            <p className="text-xs sm:text-sm font-bold text-[#f3c251] tracking-wide">
              Secure Finance. Compliant Properties. Sustainable Growth.
            </p>
            <p className="text-xs text-white/70 font-normal">
              Copyright 2026 BSP Ccontinental Pvt Ltd
            </p>
          </div>
        </div>

      </div>
    </footer>
  );
}