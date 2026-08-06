"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  FiPhone, 
  FiMail, 
  FiMapPin, 
  FiSend, 
  FiCheckCircle, 
  FiShield, 
  FiClock,
  FiZap,
  FiHelpCircle,
  FiHome
} from "react-icons/fi";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    service: "Credit Score Improvement",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setSubmitted(true);
        setFormData({
          name: "",
          phone: "",
          email: "",
          service: "Credit Score Improvement",
          message: "",
        });
        setTimeout(() => setSubmitted(false), 5000);
      } else {
        throw new Error(data.error || "Submission failed");
      }
    } catch (err) {
      setErrorMsg(err.message || "Kuch dikkat aayi, dobara try karein!");
    } finally {
      setLoading(false);
    }
  };

  const contactInfo = [
    {
      icon: <FiPhone className="text-xl text-[#217044]" />,
      label: "Phone Contact",
      value: "+91 95759 59137",
      href: "tel:9575959137",
    },
    {
      icon: <FiMail className="text-xl text-[#217044]" />,
      label: "Email Address",
      value: "bspccontinental@gmail.com",
      href: "mailto:bspccontinental@gmail.com",
    },
    {
      icon: <FiMapPin className="text-xl text-[#217044]" />,
      label: "Office Address",
      value: "Shop No OAS 4, Super Market Complex, 2nd Floor, Agrasen Chowk, Bilaspur (C.G.) 495001",
      href: "#",
    },
  ];

  const servicesList = [
    "Credit Score Improvement",
    "Loan Readiness Consulting",
    "Property Compliance Service",
    "Mortgage, MSME & Other Loans",
    "Loan Difficulties & Solutions",
    "Financial Advisory",
  ];

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
            <FiZap size={12} /> Direct Contact Desk
          </div>
          <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-slate-950">
            Get In Touch <span className="text-[#217044]">For Financial & Property Advisory</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 font-semibold leading-relaxed max-w-3xl">
            Every great financial decision begins with someone you can trust — whether it's your financial consultation, property verification, or credit score related queries.
          </p>
        </section>

        {/* 📞 Contact Info Cards Grid */}
        <section>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {contactInfo.map((info, idx) => (
              <a
                key={idx}
                href={info.href}
                className="bg-white p-6 rounded-3xl border border-slate-200/90 hover:border-[#217044] transition-all duration-300 group flex items-start gap-4 shadow-2xs hover:shadow-md active:scale-[0.99]"
              >
                <div className="w-12 h-12 bg-[#217044]/10 border border-[#217044]/20 rounded-2xl flex items-center justify-center shrink-0 group-hover:bg-[#217044] group-hover:text-white transition-colors shadow-2xs">
                  {info.icon}
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 block">
                    {info.label}
                  </span>
                  <p className="text-xs font-black uppercase text-slate-900 leading-snug group-hover:text-[#217044] transition-colors break-words">
                    {info.value}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* 📝 Contact Form & Info Block */}
        <section className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/90 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left Column - Information */}
            <div className="lg:col-span-5 space-y-6 flex flex-col justify-between">
              <div className="space-y-4">
                <span className="text-[10px] font-black text-[#217044] uppercase tracking-widest block">
                  EXPERT CONSULTATION
                </span>
                <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-slate-950 leading-tight">
                  Let's Discuss Your Financial Goals
                </h2>
                
                {/* Highlights Box */}
                <div className="p-4 bg-slate-50 border border-slate-200/80 rounded-2xl space-y-2">
                  <div className="flex items-center gap-2 text-xs font-black uppercase text-[#217044]">
                    <FiHelpCircle className="text-sm shrink-0" />
                    <span>We Can Help You With:</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed font-semibold">
                    Financial Consultation • Credit Score Improvement • Property Verification • Fast Loan Approvals
                  </p>
                </div>

                <p className="text-xs text-slate-500 font-semibold leading-relaxed">
                  BSP CCONTINENTAL PVT LTD is committed to guiding you with expertise, transparency, and care. Fill out the form or reach us directly.
                </p>
              </div>

              {/* Trust Badges */}
              <div className="space-y-2.5 pt-4 border-t border-slate-100">
                <div className="flex items-center gap-2 text-xs font-extrabold text-slate-800">
                  <FiCheckCircle className="text-[#217044] shrink-0" />
                  <span>Expertise, Transparency & Care</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-extrabold text-slate-800">
                  <FiShield className="text-[#217044] shrink-0" />
                  <span>100% Legal & Compliant Process</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-extrabold text-slate-800">
                  <FiClock className="text-[#217044] shrink-0" />
                  <span>Instant Direct Advisory Support</span>
                </div>
              </div>
            </div>

            {/* Right Column - Form */}
            <div className="lg:col-span-7 bg-[#F8FAFC] p-6 sm:p-7 rounded-2xl border border-slate-200/90 shadow-2xs">
              {submitted ? (
                <div className="py-12 text-center space-y-3">
                  <div className="w-12 h-12 bg-[#217044] text-white rounded-2xl flex items-center justify-center mx-auto text-xl font-bold shadow-sm">
                    ✓
                  </div>
                  <h3 className="text-base font-black uppercase text-slate-950">Message Sent Successfully!</h3>
                  <p className="text-xs text-slate-500 font-semibold">
                    Thank you for reaching out to BSP CCONTINENTAL PVT LTD. We will contact you shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {errorMsg && (
                    <div className="p-3 bg-rose-50 text-rose-600 rounded-xl text-xs font-bold border border-rose-100">
                      ⚠️ {errorMsg}
                    </div>
                  )}

                  <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase text-slate-400 block">
                      Your Full Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      placeholder="Enter your name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-xs font-bold text-slate-900 outline-none focus:border-[#217044] transition-all"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-black uppercase text-slate-400 block">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        required
                        placeholder="+91 95759 59137"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-xs font-bold text-slate-900 font-mono outline-none focus:border-[#217044] transition-all"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-black uppercase text-slate-400 block">
                        Email Address
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        placeholder="bspccontinental@gmail.com"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-xs font-bold text-slate-900 outline-none focus:border-[#217044] transition-all"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase text-slate-400 block">
                      Select Required Service
                    </label>
                    <select
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-xs font-bold text-slate-900 outline-none focus:border-[#217044] transition-all cursor-pointer"
                    >
                      {servicesList.map((srv, idx) => (
                        <option key={idx} value={srv}>
                          {srv}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase text-slate-400 block">
                      Your Message / Query
                    </label>
                    <textarea
                      name="message"
                      rows="4"
                      required
                      placeholder="Describe your requirement..."
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-xs font-bold text-slate-900 outline-none focus:border-[#217044] transition-all resize-none"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-[#217044] hover:bg-[#185332] text-white font-black text-xs uppercase tracking-wider py-4 rounded-xl transition-all flex items-center justify-center gap-2 shadow-md active:scale-95 disabled:opacity-50 cursor-pointer"
                  >
                    <span>{loading ? "SUBMITTING..." : "SUBMIT INQUIRY"}</span>
                    <FiSend className="text-sm" />
                  </button>
                </form>
              )}
            </div>

          </div>
        </section>

      </div>
    </div>
  );
}