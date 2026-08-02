"use client";

import Link from "next/link";
import { FiShield, FiLock, FiArrowUpRight, FiZap } from "react-icons/fi";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white text-black font-sans antialiased selection:bg-black selection:text-white pb-20">
      
      {/* Header */}
      <section className="pt-20 pb-12 px-4 md:px-8 max-w-4xl mx-auto text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-neutral-200 bg-neutral-50 text-neutral-800 text-[11px] font-mono uppercase tracking-widest shadow-sm">
          <FiZap className="text-black" /> DATA PROTECTION
        </div>
        
        <h1 className="text-4xl sm:text-5xl font-black tracking-tight uppercase">
          PRIVACY POLICY
        </h1>

        <p className="text-neutral-500 text-xs font-mono uppercase tracking-wider">
          Last Updated: August 2026 | BSP Continental Pvt. Ltd.
        </p>
      </section>

      {/* Content Block */}
      <section className="max-w-4xl mx-auto px-4 md:px-8">
        <div className="bg-neutral-50 p-6 md:p-10 rounded-[2.5rem] border border-neutral-200/80 space-y-8 text-neutral-700 text-xs md:text-sm leading-relaxed">
          
          <div className="space-y-3">
            <h2 className="text-base md:text-lg font-black uppercase text-black">1. Information We Collect</h2>
            <p>
              To provide credit score management, loan advisory, and property compliance services, we collect personal details including your Name, Phone Number, Email Address, Financial Credentials, and Property Documentation submitted via forms[cite: 1].
            </p>
          </div>

          <div className="space-y-3 border-t border-neutral-200/80 pt-6">
            <h2 className="text-base md:text-lg font-black uppercase text-black">2. How We Use Your Data</h2>
            <p>
              Your information is strictly used to evaluate loan readiness, process credit score restoration queries, perform property due diligence, communicate progress, and comply with legal regulatory mandates[cite: 1].
            </p>
          </div>

          <div className="space-y-3 border-t border-neutral-200/80 pt-6">
            <h2 className="text-base md:text-lg font-black uppercase text-black">3. Data Sharing & Third Parties</h2>
            <p>
              We do not sell or rent your personal data. Data is shared exclusively with verified banking partners, NBFCs, legal professionals, and regulatory authorities necessary to complete your requested financial or compliance transactions[cite: 1].
            </p>
          </div>

          <div className="space-y-3 border-t border-neutral-200/80 pt-6">
            <h2 className="text-base md:text-lg font-black uppercase text-black">4. Data Security</h2>
            <p>
              We employ industry-standard encryption, secure cloud infrastructure, and database access controls to prevent unauthorized access, alteration, or disclosure of your sensitive information.
            </p>
          </div>

          <div className="space-y-3 border-t border-neutral-200/80 pt-6">
            <h2 className="text-base md:text-lg font-black uppercase text-black">5. Your Rights</h2>
            <p>
              You reserve the right to request access to, correction of, or deletion of your personal records from our database by submitting an official email request to <strong>digitalbsp5@gmail.com</strong>.
            </p>
          </div>

          <div className="space-y-3 border-t border-neutral-200/80 pt-6">
            <h2 className="text-base md:text-lg font-black uppercase text-black">6. Privacy Inquiries</h2>
            <div className="p-4 bg-white rounded-2xl border border-neutral-200 text-xs font-mono text-black space-y-1">
              <p><strong>BSP Continental Data Protection Office</strong></p>
              <p>Address: Shop No OAS 4, Super Market Complex, 2nd Floor, Agrasen Chowk, Bilaspur</p>
              <p>Email: digitalbsp5@gmail.com | Phone: +91 9575905173</p>
            </div>
          </div>

        </div>

        {/* Back Link */}
        <div className="pt-8 text-center">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-black hover:bg-neutral-800 text-white font-black text-xs uppercase tracking-widest px-8 py-4 rounded-full transition-all shadow-lg active:scale-95"
          >
            <span>Questions About Privacy? Reach Us</span>
            <FiArrowUpRight className="text-lg" />
          </Link>
        </div>
      </section>

    </div>
  );
}