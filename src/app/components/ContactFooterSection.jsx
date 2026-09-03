"use client";

import React from "react";
import Link from "next/link";
import { FiMail, FiMapPin, FiArrowUpRight, FiShield, FiPhone } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";

export default function FooterSection() {
  const whatsappUrl = "https://wa.me/919575059137?text=Hello%20BSP%20Continental,%20I%20need%20consulting%20support.";

  return (
    <footer id="contact" className="bg-[#0A2615] text-white pt-16 pb-8 border-t border-[#217044]/40 select-none antialiased relative overflow-hidden">
      
      {/* Ambient background glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#217044]/25 rounded-full blur-3xl pointer-events-none -translate-y-1/2" />
      <div className="absolute bottom-0 left-6 w-80 h-80 bg-[#E5A812]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 relative z-10">
        
        {/* Main Grid Row */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-10 border-b border-white/15 items-start">
          
          {/* Brand Name Text Header */}
          <div className="md:col-span-5 space-y-3.5">
            <Link href="/" className="inline-block group">
              <div className="flex items-center gap-2 mb-1.5">
                <FiShield className="text-[#E5A812] text-sm" />
                <span className="text-[11px] font-mono font-black uppercase tracking-[0.24em] text-[#E5A812]">
                  CONSULTING FIRM
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-white group-hover:text-[#E5A812] transition-colors">
                BSP CONTINENTAL
              </h2>
              <span className="text-xs font-mono uppercase tracking-widest text-emerald-200/60 block mt-0.5">
                Private Limited
              </span>
            </Link>

            <p className="text-sm sm:text-[15px] text-emerald-100/75 font-medium leading-relaxed max-w-md pt-1">
              Registered corporate consultancy delivering specialized loan guidance, property compliance, and CIBIL score management.
            </p>
          </div>

          {/* 3 Core Services */}
          <div className="md:col-span-3 space-y-3.5">
            <span className="text-xs font-mono font-black uppercase tracking-[0.2em] text-[#E5A812] block">
              SERVICES
            </span>
            <ul className="space-y-3 text-sm sm:text-[15px] font-bold text-emerald-50">
              <li>
                <Link href="/dashboard/finance" className="hover:text-[#E5A812] transition-colors">
                  Financial Consulting
                </Link>
              </li>
              <li>
                <Link href="/dashboard/property-compliance" className="hover:text-[#E5A812] transition-colors">
                  Property Compliance
                </Link>
              </li>
              <li>
                <Link href="/dashboard/credit-score-management" className="hover:text-[#E5A812] transition-colors">
                  CIBIL Score Management
                </Link>
              </li>
            </ul>
          </div>

          {/* Bilaspur Desk, Call & WhatsApp */}
          <div className="md:col-span-4 space-y-3.5">
            <span className="text-xs font-mono font-black uppercase tracking-[0.2em] text-[#E5A812] block">
              BILASPUR OFFICE
            </span>
            
            <div className="space-y-3.5 text-sm sm:text-[15px] text-emerald-100/90">
              <div className="flex items-start gap-3 leading-relaxed">
                <FiMapPin className="text-[#E5A812] shrink-0 text-lg mt-1" />
                <span className="font-medium text-emerald-50">
                  Shop No OAS 4, Super Market Complex, 2nd Floor, Agrasen Chowk, Bilaspur (C.G.) 495001
                </span>
              </div>

              {/* Call & WhatsApp Links with updated number */}
              <div className="space-y-2 pt-1">
                <div className="flex flex-wrap items-center gap-4">
                  <a 
                    href="tel:9575059137" 
                    className="inline-flex items-center gap-2 text-white hover:text-[#E5A812] font-semibold transition-colors"
                  >
                    <FiPhone className="text-[#E5A812] shrink-0" />
                    <span>+91 95750 59137</span>
                  </a>

                  <a 
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-[#25D366] hover:text-white font-semibold transition-colors"
                  >
                    <FaWhatsapp className="shrink-0 text-base" />
                    <span>WhatsApp</span>
                  </a>
                </div>

                <div>
                  <a 
                    href="mailto:bspccontinental@gmail.com" 
                    className="inline-flex items-center gap-2.5 text-emerald-100 hover:text-[#E5A812] font-semibold transition-colors"
                  >
                    <FiMail className="text-[#E5A812] shrink-0 text-base" />
                    <span>bspccontinental@gmail.com</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Legal Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs sm:text-sm font-medium text-emerald-200/60">
          <p>© 2026 BSP Continental Pvt. Ltd. All rights reserved.</p>
          
          <div className="flex items-center gap-6 font-semibold">
            <Link href="/privacy" className="hover:text-white transition-colors flex items-center gap-1">
              <span>Privacy Policy</span>
              <FiArrowUpRight className="text-xs" />
            </Link>
            <span className="text-emerald-800">•</span>
            <Link href="/terms" className="hover:text-white transition-colors flex items-center gap-1">
              <span>Terms of Service</span>
              <FiArrowUpRight className="text-xs" />
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
}