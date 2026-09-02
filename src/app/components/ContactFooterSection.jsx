"use client";

import React from "react";
import Link from "next/link";
import { FiPhone, FiMail, FiMapPin, FiShield, FiArrowRight } from "react-icons/fi";

export default function ContactFooterSection() {
  return (
    <footer id="contact" className="bg-slate-950 text-white pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 border-b border-zinc-800 pb-12">
          
          {/* Company Info */}
          <div className="lg:col-span-6 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-emerald-500/10 text-emerald-400 text-xs font-black uppercase tracking-wider border border-emerald-500/20">
              <FiShield /> BSP CONTINENTAL PVT LTD[cite: 1]
            </div>
            <h3 className="text-2xl font-black uppercase tracking-tight">
              Secure Finance. Verified Properties.
            </h3>
            <p className="text-xs sm:text-sm text-zinc-400 font-medium leading-relaxed max-w-md">
              Every great financial decision begins with someone you can trust — whether it&apos;s your financial consultation, property verification, or credit score queries[cite: 1].
            </p>
          </div>

          {/* Contact Details */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-3">
              <span className="text-[11px] font-black uppercase tracking-widest text-zinc-500 block">
                Office Bilaspur Desk[cite: 1]
              </span>
              <div className="flex items-start gap-2.5 text-xs text-zinc-300 font-semibold leading-relaxed">
                <FiMapPin className="text-emerald-400 shrink-0 mt-0.5" />
                <span>Shop No OAS 4, Super Market Complex, 2nd Floor, Agrasen Chowk, Bilaspur (C.G.) 495001[cite: 1]</span>
              </div>
            </div>

            <div className="space-y-3">
              <span className="text-[11px] font-black uppercase tracking-widest text-zinc-500 block">
                Direct Contact
              </span>
              <div className="space-y-2">
                <a href="tel:9575959137" className="flex items-center gap-2 text-xs text-zinc-300 hover:text-emerald-400 font-bold transition-colors">
                  <FiPhone className="text-emerald-400 shrink-0" />
                  <span>+91 9575959137[cite: 1]</span>
                </a>
                <a href="mailto:bspccontinental@gmail.com" className="flex items-center gap-2 text-xs text-zinc-300 hover:text-emerald-400 font-bold transition-colors">
                  <FiMail className="text-emerald-400 shrink-0" />
                  <span>bspccontinental@gmail.com[cite: 1]</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-semibold text-zinc-500">
          <p>© 2026 BSP CONTINENTAL PVT LTD. All Rights Reserved[cite: 1].</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy[cite: 1]</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Offer of Terms[cite: 5]</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}