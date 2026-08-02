"use client";

import Link from "next/link";
import { FiShield, FiFileText, FiArrowUpRight, FiZap } from "react-icons/fi";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white text-black font-sans antialiased selection:bg-black selection:text-white pb-20">
      
      {/* Header */}
      <section className="pt-20 pb-12 px-4 md:px-8 max-w-4xl mx-auto text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-neutral-200 bg-neutral-50 text-neutral-800 text-[11px] font-mono uppercase tracking-widest shadow-sm">
          <FiZap className="text-black" /> LEGAL AGREEMENT
        </div>
        
        <h1 className="text-4xl sm:text-5xl font-black tracking-tight uppercase">
          TERMS & CONDITIONS
        </h1>

        <p className="text-neutral-500 text-xs font-mono uppercase tracking-wider">
          Last Updated: August 2026 | BSP Continental Pvt. Ltd.
        </p>
      </section>

      {/* Content Block */}
      <section className="max-w-4xl mx-auto px-4 md:px-8">
        <div className="bg-neutral-50 p-6 md:p-10 rounded-[2.5rem] border border-neutral-200/80 space-y-8 text-neutral-700 text-xs md:text-sm leading-relaxed">
          
          <div className="space-y-3">
            <h2 className="text-base md:text-lg font-black uppercase text-black">1. Acceptance of Terms</h2>
            <p>
              By accessing or using the platform, services, and advisory solutions provided by <strong>BSP Continental Pvt. Ltd.</strong> ("Company", "We", "Us"), you agree to be bound by these Terms & Conditions[cite: 1]. If you do not agree, please refrain from using our platform.
            </p>
          </div>

          <div className="space-y-3 border-t border-neutral-200/80 pt-6">
            <h2 className="text-base md:text-lg font-black uppercase text-black">2. Scope of Services</h2>
            <p>
              BSP Continental provides integrated financial consultancy, credit score improvement advisory, home & business loan assistance, property legal due diligence, and compliance services[cite: 1]. All advisory services are provided based on information supplied by the client and available regulatory frameworks.
            </p>
          </div>

          <div className="space-y-3 border-t border-neutral-200/80 pt-6">
            <h2 className="text-base md:text-lg font-black uppercase text-black">3. User Responsibilities & Accuracy</h2>
            <p>
              Clients must provide accurate, complete, and truthful personal, financial, and property records required for consulting. BSP Continental is not liable for loan rejections or legal issues resulting from inaccurate or forged documentation submitted by the user.
            </p>
          </div>

          <div className="space-y-3 border-t border-neutral-200/80 pt-6">
            <h2 className="text-base md:text-lg font-black uppercase text-black">4. Financial Advisory Disclaimer</h2>
            <p>
              While we facilitate credit score optimization and loan readiness, final loan approvals, interest rates, and credit limits are strictly determined by respective Banks and NBFCs based on their internal risk policies[cite: 1].
            </p>
          </div>

          <div className="space-y-3 border-t border-neutral-200/80 pt-6">
            <h2 className="text-base md:text-lg font-black uppercase text-black">5. Intellectual Property</h2>
            <p>
              All content, brand names, algorithms, software tools, logos, and materials on this platform are the exclusive intellectual property of BSP Continental Pvt. Ltd. Unauthorized copying, distribution, or reverse engineering is strictly prohibited.
            </p>
          </div>

          <div className="space-y-3 border-t border-neutral-200/80 pt-6">
            <h2 className="text-base md:text-lg font-black uppercase text-black">6. Contact Information</h2>
            <p>
              For legal inquiries regarding these terms, please contact:
            </p>
            <div className="p-4 bg-white rounded-2xl border border-neutral-200 text-xs font-mono text-black space-y-1">
              <p><strong>BSP Continental Pvt. Ltd.</strong></p>
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
            <span>Have Questions? Contact Us</span>
            <FiArrowUpRight className="text-lg" />
          </Link>
        </div>
      </section>

    </div>
  );
}