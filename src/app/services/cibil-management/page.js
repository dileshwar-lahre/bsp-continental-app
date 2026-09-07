"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { 
  FiCheckSquare, 
  FiSquare, 
  FiCheckCircle, 
  FiLock, 
  FiCreditCard, 
  FiTrendingUp, 
  FiLogIn 
} from "react-icons/fi";

const cibilServices = [
  {
    id: "cibil-analysis",
    title: "CIBIL Score Analysis",
    desc: "Line-by-line audit across bureaus to diagnose repayment history, credit utilization, and negative remarks.",
    price: 1000
  },
  {
    id: "cibil-improvement",
    title: "CIBIL Score Improvement",
    desc: "Structured debt restructuring and score rebuilding strategy to restore institutional credit eligibility.",
    price: 1000
  },
  {
    id: "errors-disputes",
    title: "CIBIL Errors & Disputes Handling",
    desc: "Formal reporting dispute support for clerical mismatches, fake accounts, duplicate entries, and pending NOC closures.",
    price: 1000
  }
];

export default function CibilManagementPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const isLoggedIn = status === "authenticated";

  const [selectedServices, setSelectedServices] = useState(["cibil-analysis"]);
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    panNumber: "",
    notes: ""
  });

  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const toggleService = (id) => {
    if (selectedServices.includes(id)) {
      if (selectedServices.length === 1) return;
      setSelectedServices(selectedServices.filter((s) => s !== id));
    } else {
      setSelectedServices([...selectedServices, id]);
    }
  };

  const totalAmount = selectedServices.length * 1000;

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      if (typeof window !== "undefined" && window.Razorpay) return resolve(true);
      const existing = document.getElementById("rzp-sdk-loader");
      if (existing) return resolve(true);
      const s = document.createElement("script");
      s.id = "rzp-sdk-loader";
      s.src = "https://checkout.razorpay.com/v1/checkout.js";
      s.async = true;
      s.onload = () => resolve(true);
      s.onerror = () => resolve(false);
      document.body.appendChild(s);
    });
  };

  const handleCheckout = async (e) => {
    e.preventDefault();

    if (!isLoggedIn) {
      alert("Please login first to submit credit diagnostic request and proceed with payment.");
      router.push("/login");
      return;
    }

    if (loading) return;
    setStatusMessage("");
    setLoading(true);

    const isLoaded = await loadRazorpayScript();
    if (!isLoaded) {
      setLoading(false);
      setStatusMessage("Razorpay gateway load failed. Please try again.");
      return;
    }

    try {
      const res = await fetch("/api/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          amount: totalAmount,
          serviceType: "CIBIL Score Management",
          selectedItems: selectedServices
        }),
      });

      const orderData = await res.json();
      if (!res.ok || !orderData.order_id || !orderData.key_id) {
        throw new Error(orderData.error || "Order creation failed.");
      }

      const options = {
        key: orderData.key_id,
        amount: orderData.amount,
        currency: orderData.currency || "INR",
        name: "BSP CCONTINENTAL PVT LTD",
        description: `CIBIL Management (${selectedServices.length} modules)`,
        order_id: orderData.order_id,
        prefill: {
          name: formData.fullName || session?.user?.name || "Client",
          email: session?.user?.email || "client@example.com",
          contact: formData.phone || "9575059137",
        },
        theme: { color: "#217044" },
        handler: async function (response) {
          try {
            setStatusMessage("Verifying transaction...");
            const verifyRes = await fetch("/api/verify-payment", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                ...response,
                clientData: formData,
                selectedServices,
                totalAmount
              }),
            });
            const verifyData = await verifyRes.json();
            if (verifyData.success) {
              setPaymentSuccess(true);
            } else {
              setStatusMessage("Payment verification failed. Please contact desk.");
            }
          } catch (err) {
            setStatusMessage("Verification network error.");
          } finally {
            setLoading(false);
          }
        },
        modal: {
          ondismiss: () => {
            setLoading(false);
            setStatusMessage("Payment session cancelled.");
          },
        },
      };

      const rzpInstance = new window.Razorpay(options);
      rzpInstance.open();
    } catch (err) {
      setLoading(false);
      setStatusMessage(err.message || "Failed to initialize payment.");
    }
  };

  return (
    <main className="w-full bg-[#FAFBFD] text-slate-900 select-none antialiased pt-0 m-0">
      
      {/* ─── 1. TOP HEADER BANNER (NO TOP MARGIN GAP) ─── */}
      <section className="relative w-full bg-[#052516] text-white pt-28 pb-16 sm:pt-32 sm:pb-20 px-6 sm:px-12 lg:px-20 overflow-hidden">
        <div className="absolute inset-0 w-full h-full opacity-35">
          <Image
            src="/images/Structured credit planning with expert guidance.png"
            alt="CIBIL Score Management"
            fill
            priority
            className="object-cover object-right"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#051f12] via-[#051f12]/95 via-45% to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto space-y-4">
          <div className="flex items-center gap-2.5">
            <span className="w-7 h-[2px] bg-[#f3c251]" />
            <span className="text-xs font-mono font-black uppercase tracking-[0.24em] text-[#f3c251]">
              CIBIL SCORE MANAGEMENT
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-white leading-tight max-w-3xl">
            IMPROVE YOUR CREDIT PROFILE WITH A CLEAR PLAN.
          </h1>

          <p className="text-sm sm:text-base text-emerald-100/85 font-normal max-w-2xl leading-relaxed">
            Multi-bureau CIBIL analysis, clerical error rectification, and structured financial guidance to restore institutional borrowing readiness.
          </p>
        </div>
      </section>

      {/* ─── 2. SELECTION & INQUIRY WORKSPACE ─── */}
      <section className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-20 py-16 sm:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* LEFT: SUB-CATEGORY SELECTOR */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-1">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#217044] block">
                STEP 01: SELECT MODULES
              </span>
              <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-[#052516]">
                Choose Credit Advisory Scope
              </h2>
              <p className="text-xs text-slate-500 font-medium">
                Standard flat fee of ₹1,000 per diagnostic module.
              </p>
            </div>

            <div className="space-y-3 pt-2">
              {cibilServices.map((svc) => {
                const isChecked = selectedServices.includes(svc.id);
                return (
                  <div
                    key={svc.id}
                    onClick={() => toggleService(svc.id)}
                    className={`p-4 sm:p-5 rounded-2xl transition-all cursor-pointer flex items-start justify-between gap-4 ${
                      isChecked
                        ? "bg-white shadow-[0_4px_20px_rgba(5,37,22,0.06)] ring-1 ring-[#217044]/30"
                        : "bg-slate-50 hover:bg-slate-100/60"
                    }`}
                  >
                    <div className="flex items-start gap-3.5">
                      <div className="mt-0.5 text-lg text-[#217044]">
                        {isChecked ? <FiCheckSquare /> : <FiSquare className="text-slate-400" />}
                      </div>
                      <div className="space-y-0.5">
                        <h3 className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
                          {svc.title}
                        </h3>
                        <p className="text-xs text-slate-500 font-normal leading-relaxed">
                          {svc.desc}
                        </p>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="text-sm font-black font-mono text-[#052516]">
                        ₹{svc.price.toLocaleString()}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Total Summary */}
            <div className="p-4 bg-emerald-50/70 rounded-2xl flex items-center justify-between">
              <div>
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#217044] block">
                  Total Diagnostic Fee
                </span>
                <span className="text-xs text-slate-600">
                  {selectedServices.length} Advisory Module{selectedServices.length > 1 ? "s" : ""} selected
                </span>
              </div>
              <span className="text-2xl font-black font-mono text-[#052516]">
                ₹{totalAmount.toLocaleString()}
              </span>
            </div>
          </div>

          {/* RIGHT: CLIENT FORM & PAYMENT GATEWAY */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-[0_15px_45px_rgba(0,0,0,0.04)] space-y-5">
              
              {paymentSuccess ? (
                <div className="py-10 text-center space-y-4">
                  <div className="w-14 h-14 rounded-full bg-emerald-100 text-[#217044] flex items-center justify-center mx-auto text-3xl">
                    <FiCheckCircle />
                  </div>
                  <h3 className="text-xl font-black text-slate-900 uppercase">
                    Payment Successful
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed max-w-xs mx-auto">
                    Your CIBIL service request for ₹{totalAmount} has been registered. Our credit desk will connect with you directly.
                  </p>
                  <button
                    onClick={() => setPaymentSuccess(false)}
                    className="mt-4 px-6 py-2.5 bg-[#052516] text-white text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-[#217044] transition-colors cursor-pointer"
                  >
                    New Request
                  </button>
                </div>
              ) : (
                <form onSubmit={handleCheckout} className="space-y-4">
                  <div className="space-y-0.5">
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#217044] block">
                      STEP 02: APPLICANT DATA
                    </span>
                    <h3 className="text-xl font-black uppercase text-[#052516]">
                      Client Details
                    </h3>
                  </div>

                  {!isLoggedIn && (
                    <div className="p-3 rounded-xl bg-amber-50 border border-amber-200/60 flex items-center justify-between text-xs text-amber-900">
                      <span className="font-medium">Login required before payment</span>
                      <Link 
                        href="/login" 
                        className="font-bold text-[#217044] hover:underline flex items-center gap-1 shrink-0"
                      >
                        <FiLogIn /> Login Now
                      </Link>
                    </div>
                  )}

                  <div className="space-y-1">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-slate-700">
                      Full Name (As per PAN) *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ramesh Chandra"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:bg-white transition-all ring-1 ring-slate-200 focus:ring-[#217044]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-slate-700">
                      Contact Phone *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 95750 00000"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:bg-white transition-all font-mono ring-1 ring-slate-200 focus:ring-[#217044]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-slate-700">
                      PAN Card Number (Optional)
                    </label>
                    <input
                      type="text"
                      placeholder="ABCDE1234F"
                      value={formData.panNumber}
                      onChange={(e) => setFormData({ ...formData, panNumber: e.target.value.toUpperCase() })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:bg-white transition-all uppercase font-mono ring-1 ring-slate-200 focus:ring-[#217044]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-slate-700">
                      Brief of Your Credit Issue
                    </label>
                    <textarea
                      rows={2}
                      placeholder="Mention any ongoing disputes, settled accounts or overdue marks..."
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:bg-white transition-all resize-none ring-1 ring-slate-200 focus:ring-[#217044]"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3.5 bg-[#217044] hover:bg-[#052516] text-white font-black text-xs uppercase tracking-wider rounded-xl transition-all shadow-md active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
                  >
                    <FiCreditCard size={14} />
                    <span>{loading ? "OPENING GATEWAY..." : `PROCEED TO PAY ₹${totalAmount}`}</span>
                  </button>

                  {statusMessage && (
                    <p className="text-[11px] font-mono text-center text-amber-700 bg-amber-50 p-2 rounded-lg">
                      {statusMessage}
                    </p>
                  )}

                  <p className="text-[10px] text-slate-400 text-center font-medium flex items-center justify-center gap-1 pt-1">
                    <FiLock className="text-xs" /> Secure 256-bit encrypted Razorpay Checkout
                  </p>
                </form>
              )}

            </div>
          </div>

        </div>
      </section>

      {/* ─── 3. CLARITY CTA COMPONENT ─── */}
      <section className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-20 pb-20">
        <div className="relative w-full bg-[#052516] text-white py-14 sm:py-20 px-6 sm:px-12 lg:px-16 overflow-hidden rounded-3xl shadow-2xl">
          <div className="absolute top-1/2 -right-32 w-[520px] h-[520px] rounded-full border border-[#217044]/25 pointer-events-none -translate-y-1/2" />
          <div className="absolute top-0 right-0 w-[450px] h-[450px] bg-[#217044]/20 rounded-full blur-3xl pointer-events-none" />

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

            <div className="pt-6 sm:pt-8 flex flex-wrap items-center gap-x-6 gap-y-1 text-xs font-medium text-emerald-200/70">
              <span className="font-bold uppercase text-white tracking-wider text-[11px]">
                BSP Ccontinental Pvt Ltd
              </span>
              <span className="tracking-wide text-emerald-200/90 font-mono text-[11px] sm:text-xs">
                +91 95750 59137 | +91 95759 59137
              </span>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}