"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { FiX, FiSend, FiLock } from "react-icons/fi";

export default function InquiryModal({ isOpen, onClose, serviceName, price, redirectUrl }) {
  const router = useRouter();
  const { data: session } = useSession();

  const [formData, setFormData] = useState({
    name: session?.user?.name || "",
    phone: "",
    email: session?.user?.email || "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  if (!isOpen) return null;

  const loadRazorpay = () => {
    return new Promise((resolve) => {
      if (typeof window !== "undefined" && window.Razorpay) return resolve(true);
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePay = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    try {
      // 1. Save to Database
      const inqRes = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          service: serviceName,
          amount: price,
        }),
      });
      const inqData = await inqRes.json();
      if (!inqRes.ok || !inqData.success) throw new Error(inqData.error || "Save nahi ho paya");

      // 2. Load Gateway
      const isLoaded = await loadRazorpay();
      if (!isLoaded) throw new Error("Payment gateway load nahi hua");

      // 3. Create Order for this specific Price
      const orderRes = await fetch("/api/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: price,
          serviceType: serviceName,
          inquiryId: inqData.inquiryId,
        }),
      });
      const orderData = await orderRes.json();
      if (!orderRes.ok || !orderData.order_id) throw new Error("Order create nahi hua");

      // 4. Razorpay Popup
      const options = {
        key: orderData.key_id,
        amount: orderData.amount,
        currency: "INR",
        name: "BSP CCONTINENTAL PVT LTD",
        description: `${serviceName} Consultation`,
        order_id: orderData.order_id,
        prefill: {
          name: formData.name,
          email: formData.email,
          contact: formData.phone,
        },
        theme: { color: "#217044" },
        handler: async function (response) {
          await fetch("/api/verify-payment", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ...response, inquiryId: inqData.inquiryId }),
          });
          onClose();
          router.push(redirectUrl);
        },
        modal: {
          ondismiss: () => setLoading(false),
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      setLoading(false);
      setErrorMsg(err.message || "Problem aayi hai.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="relative w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-2xl space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <span className="text-[10px] font-mono font-bold uppercase text-[#217044] block">CONSULTATION DESK</span>
            <h3 className="text-lg font-black uppercase text-[#052516]">{serviceName}</h3>
          </div>
          <button onClick={onClose} className="p-1.5 text-slate-400 hover:text-slate-700">
            <FiX size={20} />
          </button>
        </div>

        <form onSubmit={handlePay} className="space-y-4">
          <input
            type="text"
            required
            placeholder="Aapka Poora Naam *"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-4 py-2.5 rounded-xl bg-slate-50 text-xs sm:text-sm border border-slate-200 focus:outline-none focus:border-[#217044]"
          />

          <input
            type="tel"
            required
            placeholder="Mobile Number *"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="w-full px-4 py-2.5 rounded-xl bg-slate-50 text-xs sm:text-sm border border-slate-200 focus:outline-none focus:border-[#217044]"
          />

          <input
            type="email"
            required
            placeholder="Gmail Address *"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full px-4 py-2.5 rounded-xl bg-slate-50 text-xs sm:text-sm border border-slate-200 focus:outline-none focus:border-[#217044]"
          />

          <div>
            <div className="flex justify-between text-[11px] font-bold text-slate-500 mb-1">
              <span>Service Query (Max 100 char)</span>
              <span>{formData.message.length}/100</span>
            </div>
            <textarea
              required
              rows={2}
              maxLength={100}
              placeholder="Apna issue ya requirement likhein..."
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full p-3 rounded-xl bg-slate-50 text-xs sm:text-sm border border-slate-200 focus:outline-none focus:border-[#217044]"
            />
          </div>

          {errorMsg && <p className="text-xs text-rose-600 bg-rose-50 p-2 rounded-lg">{errorMsg}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 bg-[#217044] hover:bg-[#164e2e] text-white font-black text-xs uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
          >
            <FiSend />
            <span>{loading ? "PROCESSING..." : "SUBMIT & PROCEED TO PAY"}</span>
          </button>

          <p className="text-[10px] text-slate-400 text-center flex items-center justify-center gap-1">
            <FiLock className="text-xs" /> Secure 256-bit encrypted Checkout
          </p>
        </form>
      </div>
    </div>
  );
}