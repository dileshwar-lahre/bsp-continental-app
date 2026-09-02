"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { FiTrendingUp, FiHome, FiShield, FiArrowRight, FiCheck } from "react-icons/fi";

const services = [
  {
    id: "credit-advisory",
    number: "01",
    icon: <FiTrendingUp className="text-2xl" />,
    title: "Credit Score Management",
    desc: "CIBIL report audit, bureau dispute filing, aur credit score restoration taaki loan rejection risk khatam ho[cite: 1].",
    features: ["Bureau Dispute Audit", "Error Rectification", "Restoration Strategy"],
    link: "/login",
  },
  {
    id: "loan-advisory",
    number: "02",
    icon: <FiHome className="text-2xl" />,
    title: "Home & Business Loan Advisory",
    desc: "MSME loans, business working capital (CC/OD), project finance aur mortgage loan processing[cite: 1].",
    features: ["DPR & CMA Preparation", "Working Capital Support", "Mortgage Loan LAP"],
    link: "/login",
  },
  {
    id: "property-vetting",
    number: "03",
    icon: <FiShield className="text-2xl" />,
    title: "Property Document Vetting",
    desc: "Legal title verification, land registry checks, aur Khasra audits taaki real estate fraud se bacha ja sake[cite: 1].",
    features: ["Registry Deed Check", "Khasra / B-1 Verification", "Title Search Report"],
    link: "/login",
  },
];

export default function ServicesSection() {
  return (
    <section id="services" className="py-20 bg-slate-50 border-b border-zinc-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <span className="text-xs font-black uppercase tracking-widest text-[#217044] bg-[#217044]/10 px-3 py-1 rounded-lg border border-[#217044]/20">
            Our Solutions
          </span>
          <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-slate-950">
            Core Advisory Services[cite: 1]
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 font-semibold">
            Bank-ready documentation aur certified property compliance ka complete ecosystem.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="bg-white rounded-3xl p-7 border border-slate-200/90 shadow-sm hover:border-[#217044] hover:shadow-xl transition-all flex flex-col justify-between group"
            >
              <div className="space-y-5">
                <div className="flex items-center justify-between">
                  <div className="p-3.5 bg-[#217044]/10 text-[#217044] rounded-2xl group-hover:bg-[#217044] group-hover:text-white transition-all">
                    {item.icon}
                  </div>
                  <span className="text-xs font-black text-[#217044] bg-[#217044]/10 px-2.5 py-1 rounded-xl">
                    {item.number}
                  </span>
                </div>

                <div>
                  <h3 className="text-lg font-black text-slate-950 uppercase tracking-tight mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-600 font-semibold leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="space-y-2 pt-2 border-t border-slate-100">
                  {item.features.map((feat, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs font-bold text-slate-700">
                      <FiCheck className="text-[#217044] shrink-0 text-sm" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <Link
                href={item.link}
                className="mt-6 flex items-center justify-between text-xs font-black uppercase tracking-wider text-slate-950 group-hover:text-[#217044] transition-colors pt-4 border-t border-slate-100"
              >
                <span>Get Started</span>
                <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}