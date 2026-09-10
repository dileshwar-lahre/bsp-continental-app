"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { 
  FiDollarSign, 
  FiArrowRight, 
  FiLock,
  FiX,
  FiUser,
  FiPhone,
  FiMail,
  FiSend,
  FiBriefcase
} from "react-icons/fi";

const financialServices = [
  {
    id: "secured-business-loan",
    title: "Secured Business Loan Assistance",
    desc: "Institutional capital structuring, working capital lines, balance sheet ratio diagnostics, and lender-compliant DPR/CMA formulation."
  },
  {
    id: "mortgage-loan-assistance",
    title: "Mortgage Loan Assistance",
    desc: "Pre-underwriting documentation checks, collateral property file sanitization, and loan-against-property (LAP) structuring."
  },
  {
    id: "project-finance-assistance",
    title: "Project Finance Assistance",
    desc: "Industrial & commercial plant debt packaging, techno-economic feasibility studies, and institutional financial closure."
  }
];

export default function FinancialConsultingPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const isLoggedIn = status === "authenticated";

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");

  const [formData, setFormData] = useState({
    name: session?.user?.name || "",
    phone: "",
    email: session?.user?.email || "",
    service: "Financial Consulting",
    message: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "message" && value.length > 100) return;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleOpenConsultation = () => {
    if (!isLoggedIn) {
      alert("Please login first to submit financial consulting request.");
      router.push("/login?callbackUrl=/services/financial-consulting");
      return;
    }
    setIsModalOpen(true);
  };

  const handleInquirySubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatusMessage("");

    try {
      // 1. Submit Inquiry to DB via API (Payment nahi lagega)
      const inqRes = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          service: "Financial Consulting",
          amount: 0
        }),
      });
      const inqData = await inqRes.json();
      if (!inqRes.ok || !inqData.success) {
        throw new Error(inqData.error || "Failed to submit inquiry details.");
      }

      setIsModalOpen(false);
      // Direct redirect to Contact page
      router.push("/contact");

    } catch (err) {
      setLoading(false);
      setStatusMessage(err.message || "Something went wrong.");
    }
  };

  return (
    <main className="w-full bg-[#FAFBFD] text-slate-900 select-none antialiased pt-0 m-0">
      
      {/* ─── 1. TOP HEADER BANNER ─── */}
      <section className="relative w-full bg-[#052516] text-white pt-28 pb-16 sm:pt-32 sm:pb-20 px-6 sm:px-12 lg:px-20 overflow-hidden">
        <div className="absolute inset-0 w-full h-full opacity-35">
          <Image
            src="/images/Strategic Financial Guidance for Indian Businesses.png"
            alt="Financial Consulting"
            fill
            priority
            className="object-cover object-right"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#051f12] via-[#051f12]/95 via-45% to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto space-y-3">
          <div className="flex items-center gap-2">
            <span className="w-6 h-[2px] bg-[#f3c251]" />
            <span className="text-[11px] font-mono font-black uppercase tracking-[0.24em] text-[#f3c251]">
              CAPITAL & DEBT STRUCTURING
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-white leading-tight">
            FINANCIAL CONSULTING
          </h1>

          <p className="text-xs sm:text-sm text-emerald-100/85 font-normal max-w-xl leading-relaxed">
            Strategic guidance for secured loans, MSME capital, balance sheet ratios, and institutional project finance packaging across Chhattisgarh.
          </p>
        </div>
      </section>

      {/* ─── 2. SUB-SERVICES CARDS (NO CHECKBOX, NO PRICING) ─── */}
      <section className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-20 py-16 sm:py-20 space-y-12">
        <div className="space-y-1">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#217044] block">
            ADVISORY MODULES
          </span>
          <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-[#052516]">
            Choose Consulting Scope
          </h2>
          <p className="text-xs text-slate-500 font-medium">
            Institutional loan readiness, project finance dossiers, and collateral asset advisory.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {financialServices.map((svc) => (
            <div
              key={svc.id}
              className="bg-white p-6 rounded-2xl shadow-[0_4px_20px_rgba(5,37,22,0.04)] border border-slate-100 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="p-3 bg-emerald-50 text-[#217044] rounded-xl w-fit">
                  {svc.id === "project-finance-assistance" ? (
                    <FiBriefcase size={22} />
                  ) : (
                    <FiDollarSign size={22} />
                  )}
                </div>
                <h3 className="text-base font-black text-slate-900 uppercase tracking-tight">
                  {svc.title}
                </h3>
                <p className="text-xs text-slate-600 font-normal leading-relaxed">
                  {svc.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* PROCEED BUTTON (OPENS MODAL WITHOUT SHOWING ANY PRICE) */}
        <div className="max-w-md mx-auto pt-6 text-center space-y-3">
          <button
            type="button"
            onClick={handleOpenConsultation}
            className="w-full py-4 px-8 bg-[#217044] hover:bg-[#164e2e] text-white font-black text-xs sm:text-sm uppercase tracking-wider rounded-2xl transition-all shadow-md active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>PROCEED FOR CONSULTATION</span>
            <FiArrowRight size={16} />
          </button>

          <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-400 font-medium">
            <FiLock className="text-xs text-[#217044]" />
            <span>Encrypted institutional financial advisory consultation</span>
          </div>
        </div>
      </section>

      {/* ─── 3. CLARITY CTA BANNER ─── */}
      <section className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-20 pb-20">
        <div className="relative w-full bg-[#052516] text-white py-14 sm:py-20 px-6 sm:px-12 lg:px-16 overflow-hidden rounded-3xl shadow-2xl">
          <div className="relative z-10 max-w-4xl space-y-6 text-left">
            <span className="text-xs sm:text-[13px] font-black uppercase tracking-[0.24em] text-[#f3c251] block">
              READY FOR THE NEXT STEP?
            </span>
            <h2 className="text-3xl sm:text-5xl lg:text-[56px] font-black uppercase tracking-tight text-white leading-[1.04]">
              START WITH CLARITY.
            </h2>
            <p className="text-sm sm:text-base text-emerald-100/85 font-medium max-w-xl leading-relaxed">
              Discuss your institutional finance, loan-readiness audit or property compliance documentation with our Bilaspur consulting team.
            </p>
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                href="/contact"
                className="px-8 py-3.5 bg-[#f3c251] hover:bg-[#e4b443] text-[#052516] text-xs font-black uppercase tracking-wider rounded-xl transition-all shadow-md active:scale-95 text-center cursor-pointer"
              >
                REQUEST A CONSULTATION
              </Link>
              <a
                href="tel:9575059137"
                className="px-8 py-3.5 bg-transparent hover:bg-white/10 text-white border border-white/40 hover:border-white text-xs font-black uppercase tracking-wider rounded-xl transition-all active:scale-95 text-center cursor-pointer"
              >
                CALL DESK NOW
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 4. INQUIRY MODAL (100 CHAR LIMIT & REDIRECT TO CONTACT) ─── */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-2xl space-y-5 max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="space-y-0.5">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#217044] block">
                  CONSULTATION INQUIRY
                </span>
                <h3 className="text-lg font-black uppercase text-[#052516]">
                  Financial Advisory Details Form
                </h3>
              </div>
              <button 
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="p-2 text-slate-400 hover:text-slate-800 rounded-full hover:bg-slate-100 transition-all cursor-pointer"
              >
                <FiX size={20} />
              </button>
            </div>

            <form onSubmit={handleInquirySubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                  <FiUser className="text-[#217044]" /> Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="e.g. Ramesh Chandra"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#FAFBFD] text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:bg-emerald-50/40 transition-all ring-1 ring-slate-200 focus:ring-[#217044]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                  <FiPhone className="text-[#217044]" /> Contact Phone *
                </label>
                <input
                  type="tel"
                  name="phone"
                  required
                  placeholder="+91 95750 00000"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#FAFBFD] text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:bg-emerald-50/40 transition-all font-mono ring-1 ring-slate-200 focus:ring-[#217044]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                  <FiMail className="text-[#217044]" /> Gmail Address *
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="client@gmail.com"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#FAFBFD] text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:bg-emerald-50/40 transition-all ring-1 ring-slate-200 focus:ring-[#217044]"
                />
              </div>

              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-slate-700">
                    Financial Query / Loan Details (Max 100 Characters) *
                  </label>
                  <span className={`text-[10px] font-mono font-bold ${
                    formData.message.length === 100 ? "text-rose-600" : "text-slate-400"
                  }`}>
                    {formData.message.length}/100
                  </span>
                </div>
                <textarea
                  name="message"
                  required
                  rows={2}
                  maxLength={100}
                  placeholder="Mention loan amount required, property collateral, or business details..."
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full p-3 rounded-xl bg-[#FAFBFD] text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:bg-emerald-50/40 transition-all resize-none ring-1 ring-slate-200 focus:ring-[#217044]"
                />
              </div>

              {statusMessage && (
                <p className="text-[11px] font-mono text-center text-amber-800 bg-amber-50 p-2 rounded-lg">
                  {statusMessage}
                </p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 bg-[#217044] hover:bg-[#164e2e] text-white font-black text-xs sm:text-sm uppercase tracking-wider rounded-xl transition-all shadow-md active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
              >
                <FiSend size={15} />
                <span>{loading ? "SUBMITTING..." : "SUBMIT INQUIRY"}</span>
              </button>
            </form>
          </div>
        </div>
      )}

    </main>
  );
}