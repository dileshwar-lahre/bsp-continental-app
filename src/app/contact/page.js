"use client";

import { useState } from "react";
import { 
  FiPhone, 
  FiMail, 
  FiMapPin, 
  FiSend, 
  FiCheckCircle, 
  FiShield, 
  FiClock,
  FiZap 
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
      icon: <FiPhone className="text-xl text-black" />,
      label: "Phone Number",
      value: "+91 9575905173",
      href: "tel:9575905173",
    },
    {
      icon: <FiMail className="text-xl text-black" />,
      label: "Email Address",
      value: "digitalbsp5@gmail.com",
      href: "mailto:digitalbsp5@gmail.com",
    },
    {
      icon: <FiMapPin className="text-xl text-black" />,
      label: "Office Address",
      value: "Shop No OAS 4, Super Market Complex, 2nd Floor, Agrasen Chowk, Bilaspur",
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
    <div className="min-h-screen bg-white text-black font-sans antialiased selection:bg-black selection:text-white pb-20">
      
      {/* 🚀 Header Section */}
      <section className="pt-20 pb-12 px-4 md:px-8 max-w-5xl mx-auto text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-neutral-200 bg-neutral-50 text-neutral-800 text-[11px] font-mono uppercase tracking-widest shadow-sm">
          <FiZap className="text-black" /> BSP CONTINENTAL FINANCIAL COMPLIANCE
        </div>
        
        <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-[1.05] uppercase max-w-4xl mx-auto">
          GET IN TOUCH TODAY <br />
          <span className="text-neutral-400">FOR A BETTER CREDIT TOMORROW</span>
        </h1>

        <p className="text-neutral-600 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed font-normal">
          Every Great Financial Journey Begins with Someone You Can Trust. Whether it's your first home, business expansion, or property compliance—we are here to help.
        </p>
      </section>

      {/* 📞 Contact Info Cards Grid */}
      <section className="max-w-5xl mx-auto px-4 md:px-8 mb-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {contactInfo.map((info, idx) => (
            <a
              key={idx}
              href={info.href}
              className="bg-neutral-50 p-6 rounded-3xl border border-neutral-200/80 hover:border-black transition-all group flex items-start gap-4 shadow-sm"
            >
              <div className="w-12 h-12 bg-white border border-neutral-200 rounded-2xl flex items-center justify-center shrink-0 group-hover:bg-black group-hover:text-white transition-colors shadow-sm">
                {info.icon}
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 font-bold block">
                  {info.label}
                </span>
                <p className="text-xs font-black uppercase text-black leading-snug group-hover:underline">
                  {info.value}
                </p>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* 📝 Contact Form & Info Block */}
      <section className="max-w-5xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 bg-neutral-50 p-6 md:p-10 rounded-[2.5rem] border border-neutral-200/80 shadow-sm">
          
          {/* Left Column */}
          <div className="md:col-span-5 space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest font-bold block">
                EXPERT CONSULTATION
              </span>
              <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-black leading-tight">
                Let's Discuss Your Financial Goals
              </h2>
              <p className="text-xs text-neutral-600 leading-relaxed">
                BSP Continental is committed to guiding you with expertise, transparency, and care. Fill out the form or reach us directly.
              </p>
            </div>

            {/* Badges */}
            <div className="space-y-3 pt-4 border-t border-neutral-200/80">
              <div className="flex items-center gap-2.5 text-xs font-bold text-neutral-800">
                <FiCheckCircle className="text-black shrink-0" />
                <span>Expertise, Transparency & Care</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs font-bold text-neutral-800">
                <FiShield className="text-black shrink-0" />
                <span>100% Legal & Compliant Process</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs font-bold text-neutral-800">
                <FiClock className="text-black shrink-0" />
                <span>Fast Response Within 24 Hours</span>
              </div>
            </div>

            <div className="p-4 bg-white rounded-2xl border border-neutral-200/80">
              <p className="text-[10px] font-mono font-bold uppercase text-neutral-400 tracking-wider">
                TAGLINE
              </p>
              <p className="text-xs font-black uppercase text-black mt-1">
                Better Credit Score. Better Opportunities. Better Life.
              </p>
            </div>
          </div>

          {/* Right Column - Form */}
          <div className="md:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-neutral-200 shadow-sm">
            {submitted ? (
              <div className="py-12 text-center space-y-3">
                <div className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center mx-auto text-xl">
                  ✓
                </div>
                <h3 className="text-xl font-black uppercase">Message Sent Successfully!</h3>
                <p className="text-xs text-neutral-500">
                  Thank you for reaching out. We will contact you shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {errorMsg && (
                  <div className="p-3 bg-red-50 text-red-600 rounded-xl text-xs font-bold font-mono">
                    ⚠️ {errorMsg}
                  </div>
                )}

                <div>
                  <label className="text-[10px] font-mono uppercase text-neutral-400 font-bold block mb-1">
                    Your Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-3 text-xs font-bold text-black focus:outline-none focus:border-black focus:bg-white transition-all"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-mono uppercase text-neutral-400 font-bold block mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      placeholder="+91 0000000000"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-3 text-xs font-bold text-black focus:outline-none focus:border-black focus:bg-white transition-all"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-mono uppercase text-neutral-400 font-bold block mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="name@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-3 text-xs font-bold text-black focus:outline-none focus:border-black focus:bg-white transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-mono uppercase text-neutral-400 font-bold block mb-1">
                    Select Required Service
                  </label>
                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-3 text-xs font-bold text-black focus:outline-none focus:border-black focus:bg-white transition-all"
                  >
                    {servicesList.map((srv, idx) => (
                      <option key={idx} value={srv}>
                        {srv}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-[10px] font-mono uppercase text-neutral-400 font-bold block mb-1">
                    Your Message / Query
                  </label>
                  <textarea
                    name="message"
                    rows="4"
                    required
                    placeholder="Describe your requirement..."
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-3 text-xs font-bold text-black focus:outline-none focus:border-black focus:bg-white transition-all resize-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-black hover:bg-neutral-800 text-white font-black text-xs uppercase tracking-widest py-4 rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg active:scale-95 mt-2 disabled:opacity-50"
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
  );
}