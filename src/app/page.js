"use client";

import { useState, useEffect } from "react";
import { FiDollarSign, FiPercent, FiCalendar, FiArrowRight, FiShield, FiZap, FiClock } from "react-icons/fi";

export default function HomePage() {
  // Loan Calculator State
  const [loanAmount, setLoanAmount] = useState(50000);
  const [interestRate, setInterestRate] = useState(10.5);
  const [tenure, setTenure] = useState(12); // Months
  const [monthlyEmi, setMonthlyEmi] = useState(0);

  // EMI Calculation Logic: [P x R x (1+R)^N]/[(1+R)^N-1]
  useEffect(() => {
    const p = loanAmount;
    const r = interestRate / 12 / 100;
    const n = tenure;
    
    if (r === 0) {
      setMonthlyEmi(p / n);
    } else {
      const emi = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
      setMonthlyEmi(Math.round(emi));
    }
  }, [loanAmount, interestRate, tenure]);

  return (
    <div className="bg-[#F9FAFB] min-h-screen text-zinc-900 font-sans selection:bg-zinc-900 selection:text-white">
      
      {/* 🚀 HERO SECTION WITH INTEGRATED LOAN WIDGET */}
      <section className="max-w-7xl mx-auto px-5 sm:px-8 pt-12 pb-20 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Side: Catchy Pitch */}
        <div className="lg:col-span-5 space-y-6">
          <div className="inline-flex items-center gap-2 bg-zinc-900 text-white text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full shadow-sm">
            <FiZap className="text-amber-400 animate-pulse" /> Instant Approval System
          </div>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-zinc-900 leading-none">
            Get Loans <br />
            <span className="text-zinc-500">Without the</span> <br />
            Paperwork Hassle.
          </h1>
          <p className="text-zinc-600 text-base max-w-md leading-relaxed">
            Upload your basic documents securely, calculate your custom plans, and submit service requests instantly.
          </p>
          
          {/* Quick trust metrics */}
          <div className="pt-4 grid grid-cols-3 gap-4 border-t border-zinc-200">
            <div>
              <p className="text-2xl font-black text-zinc-900">10 Min</p>
              <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">Verification</p>
            </div>
            <div>
              <p className="text-2xl font-black text-zinc-900">99.8%</p>
              <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">Secure S3</p>
            </div>
            <div>
              <p className="text-2xl font-black text-zinc-900">AI Powered</p>
              <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">Document Scan</p>
            </div>
          </div>
        </div>

        {/* Right Side: Interactive App-Style Loan Widget */}
        <div className="lg:col-span-7 bg-white border border-zinc-100 rounded-3xl p-6 sm:p-8 shadow-xl shadow-zinc-200/50">
          <div className="mb-6">
            <h3 className="text-lg font-bold text-zinc-900">Configure Your Loan Request</h3>
            <p className="text-xs text-zinc-500">Adjust the options below to estimate your dynamic plan instantly.</p>
          </div>

          <div className="space-y-6">
            {/* 1. Loan Amount Slider */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-sm font-semibold text-zinc-600 flex items-center gap-2">
                  <FiDollarSign className="text-zinc-400" /> Loan Amount
                </label>
                <span className="text-lg font-black text-zinc-900">₹{loanAmount.toLocaleString("en-IN")}</span>
              </div>
              <input 
                type="range" 
                min="10000" 
                max="1000000" 
                step="5000"
                value={loanAmount}
                onChange={(e) => setLoanAmount(Number(e.target.value))}
                className="w-full accent-zinc-900 h-2 bg-zinc-100 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[11px] font-bold text-zinc-400 uppercase">
                <span>₹10,000</span>
                <span>Anual Max: ₹10L</span>
              </div>
            </div>

            {/* 2. Tenure / Months Slider */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-sm font-semibold text-zinc-600 flex items-center gap-2">
                  <FiCalendar className="text-zinc-400" /> Tenure Period
                </label>
                <span className="text-lg font-black text-zinc-900">{tenure} Months</span>
              </div>
              <input 
                type="range" 
                min="3" 
                max="60" 
                step="3"
                value={tenure}
                onChange={(e) => setTenure(Number(e.target.value))}
                className="w-full accent-zinc-900 h-2 bg-zinc-100 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[11px] font-bold text-zinc-400 uppercase">
                <span>3 Months</span>
                <span>5 Years Max</span>
              </div>
            </div>

            {/* 3. Interest Rate Input Field */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-sm font-semibold text-zinc-600 flex items-center gap-2">
                  <FiPercent className="text-zinc-400" /> Expected Interest Rate
                </label>
                <span className="text-sm font-bold bg-zinc-50 px-3 py-1 rounded-md border border-zinc-200">{interestRate}% p.a.</span>
              </div>
              <input 
                type="range" 
                min="5" 
                max="25" 
                step="0.5"
                value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value))}
                className="w-full accent-zinc-900 h-2 bg-zinc-100 rounded-lg cursor-pointer"
              />
            </div>

            {/* Output Display Panel */}
            <div className="bg-zinc-900 text-white rounded-2xl p-5 grid grid-cols-2 gap-4 items-center">
              <div>
                <p className="text-[11px] font-bold uppercase text-zinc-400 tracking-wider">Estimated Monthly EMI</p>
                <p className="text-3xl font-black text-white">₹{monthlyEmi.toLocaleString("en-IN")}</p>
              </div>
              <div className="text-right border-l border-zinc-800 pl-4">
                <p className="text-[11px] font-bold uppercase text-zinc-400 tracking-wider">Total Repayment</p>
                <p className="text-lg font-bold text-zinc-200">₹{(monthlyEmi * tenure).toLocaleString("en-IN")}</p>
              </div>
            </div>

            {/* Direct Action Call to Request Trigger */}
            <button className="w-full bg-zinc-900 text-white font-bold uppercase text-sm py-4 rounded-xl hover:bg-zinc-800 transition-all duration-200 flex items-center justify-center gap-2 shadow-lg active:scale-[0.99]">
              Apply For Loan Request <FiArrowRight className="text-lg" />
            </button>
          </div>
        </div>
      </section>

      {/* 🛠️ SERVICES GRID SECTION */}
      <section id="services" className="bg-white border-t border-zinc-100 py-20">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="text-center max-w-xl mx-auto mb-16">
            <p className="text-xs font-bold uppercase text-zinc-400 tracking-widest mb-2">Our Processing Streams</p>
            <h2 className="text-3xl font-black tracking-tight text-zinc-900">Supported Service Categories</h2>
            <p className="text-zinc-500 text-sm mt-2">Select the specific module dashboard inside your portal after authentication setup.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Service 1 */}
            <div className="border border-zinc-100 bg-[#F9FAFB] p-6 rounded-2xl space-y-4 hover:shadow-md transition">
              <div className="w-12 h-12 rounded-xl bg-zinc-900 flex items-center justify-center text-white text-xl">
                <FiShield />
              </div>
              <h4 className="text-lg font-bold text-zinc-900">Secure Document Vault</h4>
              <p className="text-zinc-500 text-sm leading-relaxed">
                Direct infrastructure linkage straight into AWS Cloud bucket systems with multi-party layer authentication parameters.
              </p>
            </div>

            {/* Service 2 */}
            <div className="border border-zinc-100 bg-[#F9FAFB] p-6 rounded-2xl space-y-4 hover:shadow-md transition">
              <div className="w-12 h-12 rounded-xl bg-zinc-900 flex items-center justify-center text-white text-xl">
                <FiZap />
              </div>
              <h4 className="text-lg font-bold text-zinc-900">Instant Admin Validation</h4>
              <p className="text-zinc-500 text-sm leading-relaxed">
                Single click approval toggles built tightly with instant notification callbacks right back down into user pipelines.
              </p>
            </div>

            {/* Service 3 */}
            <div className="border border-zinc-100 bg-[#F9FAFB] p-6 rounded-2xl space-y-4 hover:shadow-md transition">
              <div className="w-12 h-12 rounded-xl bg-zinc-900 flex items-center justify-center text-white text-xl">
                <FiClock />
              </div>
              <h4 className="text-lg font-bold text-zinc-900">AI Status Tracking</h4>
              <p className="text-zinc-500 text-sm leading-relaxed">
                Integrated generative engine models tracking down process states and compiling downloadable final report sheets.
              </p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}