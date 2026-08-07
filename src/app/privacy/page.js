"use client";

import Link from "next/link";
import { FiShield, FiLock, FiArrowUpRight, FiZap, FiHome, FiChevronRight } from "react-icons/fi";

export default function PrivacyPage() {
  return (
    <div className="w-full min-h-screen bg-[#F8FAFC] text-slate-900 antialiased font-sans select-none lg:pl-64 transition-all duration-300 pb-16">
      
      {/* 🎯 SIDEBAR CLEARANCE & MATCHED CONTAINER (max-w-6xl) */}
      <div className="w-full max-w-6xl mx-auto space-y-6 pt-8 px-4 sm:px-6 md:px-8">
        
        {/* Navigation Bar */}
        <div className="flex items-center justify-between bg-white p-4 rounded-2xl border border-slate-200/90 shadow-2xs">
          <Link href="/" className="inline-flex items-center gap-2 text-xs font-black text-slate-600 hover:text-[#217044] uppercase tracking-wider transition-all">
            <FiHome size={15} className="text-[#217044]" /> Back to Home
          </Link>
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-xl bg-[#217044] text-white text-[10px] font-black uppercase tracking-widest shadow-2xs">
            <FiZap size={12} /> BSP CCONTINENTAL PVT LTD
          </span>
        </div>

        {/* 🚀 Header Card */}
        <section className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/90 shadow-sm space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#217044]/10 text-[#217044] text-[10px] font-black uppercase tracking-wider border border-[#217044]/20">
            <FiLock size={12} /> Data Protection & Privacy Policy
          </div>
          <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-slate-950">
            BSP CCONTINENTAL <span className="text-[#217044]">PRIVACY POLICY</span>
          </h1>
          <p className="text-xs text-slate-500 font-extrabold uppercase tracking-wider">
            Framework Reference: Digital Personal Data Protection Act, 2023 (DPDP Act) & Rules
          </p>
        </section>

        {/* Main Content Sections */}
        <section className="bg-white p-6 sm:p-10 rounded-3xl border border-slate-200/90 shadow-sm space-y-8 text-slate-700 text-xs sm:text-sm leading-relaxed font-semibold">
          
          {/* 1. Purpose */}
          <div className="space-y-2">
            <h2 className="text-sm sm:text-base font-black uppercase text-slate-950 flex items-center gap-2">
              <span className="text-[#217044]">1.</span> Purpose
            </h2>
            <p className="text-slate-600 font-medium">
              BSP Continental Pvt. Ltd. (“BSP Continental”, “Company”, “we”, “us” or “our”) is committed to protecting the privacy, confidentiality and security of personal data entrusted to it by customers, prospective customers, employees, business partners, lenders, financial institutions, property owners, investors, vendors and other individuals. This Policy establishes the Company’s framework for the collection, processing, use, storage, sharing, retention and deletion of personal data with reference to the Digital Personal Data Protection Act, 2023 (“DPDP Act”) and applicable Indian laws.
            </p>
          </div>

          {/* 2. Objectives */}
          <div className="space-y-2 border-t border-slate-100 pt-6">
            <h2 className="text-sm sm:text-base font-black uppercase text-slate-950 flex items-center gap-2">
              <span className="text-[#217044]">2.</span> Objectives
            </h2>
            <ul className="list-disc pl-5 space-y-1 text-slate-600 font-medium">
              <li>Protect personal data from unauthorized access, disclosure, alteration, misuse, loss or destruction.</li>
              <li>Process personal data only for lawful and legitimate business purposes.</li>
              <li>Maintain transparency regarding the collection and use of personal data.</li>
              <li>Collect only data reasonably required for the relevant business purpose.</li>
              <li>Establish appropriate security safeguards, data breach management, and retention practices.</li>
              <li>Respect applicable rights of Data Principals and maintain regulatory compliance.</li>
            </ul>
          </div>

          {/* 3. Scope */}
          <div className="space-y-2 border-t border-slate-100 pt-6">
            <h2 className="text-sm sm:text-base font-black uppercase text-slate-950 flex items-center gap-2">
              <span className="text-[#217044]">3.</span> Scope
            </h2>
            <p className="text-slate-600 font-medium">
              This Policy applies to all customers, loan applicants, borrowers, property owners, investors, employees, consultants, business partners, banks, NBFCs, and digital-platform users. It covers personal data processed through websites, mobile applications, CRM systems, emails, digital forms, loan applications, and scanned records.
            </p>
          </div>

          {/* 4 & 5. Regulatory Framework & Definitions */}
          <div className="space-y-2 border-t border-slate-100 pt-6">
            <h2 className="text-sm sm:text-base font-black uppercase text-slate-950 flex items-center gap-2">
              <span className="text-[#217044]">4.</span> Regulatory Framework & Definitions
            </h2>
            <p className="text-slate-600 font-medium">
              The framework is governed under the <strong>DPDP Act, 2023</strong> and <strong>DPDP Rules</strong>. 
              <br />• <strong>Data Principal:</strong> The individual to whom personal data relates.
              <br />• <strong>Data Fiduciary:</strong> BSP Continental Pvt. Ltd. acting as the entity determining the purpose and means of processing.
              <br />• <strong>Data Processor:</strong> Authorized service providers processing data on behalf of the Fiduciary.
            </p>
          </div>

          {/* 6. Personal Data Processed */}
          <div className="space-y-2 border-t border-slate-100 pt-6">
            <h2 className="text-sm sm:text-base font-black uppercase text-slate-950 flex items-center gap-2">
              <span className="text-[#217044]">5.</span> Personal Data That We May Process
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-1">
                <p className="font-black text-xs text-[#217044] uppercase">Identification & Contact</p>
                <p className="text-slate-600 font-medium text-[11px]">Name, date of birth, photo, PAN, mobile number, email address, residential/business address.</p>
              </div>
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-1">
                <p className="font-black text-xs text-[#217044] uppercase">Financial & Credit Info</p>
                <p className="text-slate-600 font-medium text-[11px]">Income details, bank accounts, bank statements, CIBIL scores, credit report history.</p>
              </div>
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-1 sm:col-span-2">
                <p className="font-black text-xs text-[#217044] uppercase">Property Compliance Info</p>
                <p className="text-slate-600 font-medium text-[11px]">Sale deeds, title documents, ownership records, Khasra/Khatauni/B-1 land records, encumbrance records.</p>
              </div>
            </div>
          </div>

          {/* 7 & 8. Purposes & Notice */}
          <div className="space-y-2 border-t border-slate-100 pt-6">
            <h2 className="text-sm sm:text-base font-black uppercase text-slate-950 flex items-center gap-2">
              <span className="text-[#217044]">6.</span> Purposes of Data Processing & Transparency
            </h2>
            <p className="text-slate-600 font-medium">
              We process personal data for financial consulting, loan application processing, property due diligence and verification, credit advisory, customer onboarding, fraud prevention, and regulatory compliance. Complete notice and transparency are maintained at the time of data collection.
            </p>
          </div>

          {/* 9 to 14. Consent, Minimization, Security & Documents */}
          <div className="space-y-2 border-t border-slate-100 pt-6">
            <h2 className="text-sm sm:text-base font-black uppercase text-slate-950 flex items-center gap-2">
              <span className="text-[#217044]">7.</span> Consent, Security & Document Handling
            </h2>
            <p className="text-slate-600 font-medium">
              Processing is carried out based on free, specific, informed, and unambiguous consent. We adhere strictly to data minimization and maintain robust technical safeguards (password protection, role-based access, encryption, and secure cloud storage). Because we handle sensitive financial and property documents, employees exercise enhanced care over PAN, Aadhaar-related information, bank statements, and title deeds.
            </p>
          </div>

          {/* 15 to 20. Sharing, Retention, Breaches & Rights */}
          <div className="space-y-2 border-t border-slate-100 pt-6">
            <h2 className="text-sm sm:text-base font-black uppercase text-slate-950 flex items-center gap-2">
              <span className="text-[#217044]">8.</span> Data Sharing, Retention & Principal Rights
            </h2>
            <p className="text-slate-600 font-medium">
              Data may be shared with authorized banking partners, NBFCs, financial institutions, and regulatory authorities where legally required. Data is retained only as long as necessary for business, accounting, or legal compliance, after which it is securely deleted or anonymized. Individuals have full rights to request access, correction, erasure, or withdraw consent.
            </p>
          </div>

          {/* 21 to 32. Grievance Redressal & Contact */}
          <div className="space-y-3 border-t border-slate-100 pt-6">
            <h2 className="text-sm sm:text-base font-black uppercase text-slate-950 flex items-center gap-2">
              <span className="text-[#217044]">9.</span> Grievance Redressal & Contact Desk
            </h2>
            <p className="text-slate-600 font-medium">
              For any privacy-related concerns, complaints, or data principal requests, you can reach out to our designated compliance desk:
            </p>
            <div className="p-5 bg-[#F8FAFC] rounded-2xl border border-slate-200/90 text-xs font-bold text-slate-900 space-y-1.5 shadow-3xs">
              <p className="text-[#217044] font-black uppercase tracking-wider">BSP CCONTINENTAL PVT LTD Privacy & Compliance Desk</p>
              <p>Office Address: Shop No OAS 4, Super Market Complex, 2nd Floor, Agrasen Chowk, Bilaspur (C.G.) 495001</p>
              <p>Email: <span className="text-[#217044]">bspccontinental@gmail.com</span> | Phone: +91 95750 59137</p>
            </div>
          </div>

          <div className="pt-6 text-center border-t border-slate-100">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-[#217044] hover:bg-[#185332] text-white font-black text-xs uppercase tracking-wider px-8 py-3.5 rounded-xl transition-all shadow-md active:scale-95 cursor-pointer"
            >
              <span>Have Privacy Questions? Contact Us</span>
              <FiArrowUpRight className="text-base" />
            </Link>
          </div>

        </section>

      </div>
    </div>
  );
}