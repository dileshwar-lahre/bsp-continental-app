"use client";

import { useState } from "react";
import { FiShield, FiLock, FiCheckCircle, FiUser, FiMail, FiPhone, FiCreditCard } from "react-icons/fi";

export default function BillingPage() {
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");

  const [formData, setFormData] = useState({
    name: "Dileshwar Lahre",
    email: "bspcontinental01@gmail.com",
    phone: "9131460470",
  });

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

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    if (loading) return;

    setStatusMessage("");
    setLoading(true);
    setStatusMessage("Opening Razorpay Gateway...");

    const isLoaded = await loadRazorpayScript();
    if (!isLoaded) {
      setLoading(false);
      setStatusMessage("🔴 Razorpay SDK load nahi ho paya. Internet connection check karein.");
      return;
    }

    try {
      const res = await fetch("/api/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: 10 }),
      });

      const orderData = await res.json();
      if (!res.ok || !orderData.order_id) {
        throw new Error(orderData.error || "Order creation failed.");
      }

      const options = {
        key: orderData.key_id || "rzp_test_TX2POaWxuExOi7",
        amount: orderData.amount,
        currency: orderData.currency || "INR",
        name: "BSP CONTINENTAL PVT LTD",
        description: "Test Transaction Verification",
        order_id: orderData.order_id,
        handler: async function (response) {
          setStatusMessage("Verifying signature with Razorpay Cloud...");
          try {
            const verifyRes = await fetch("/api/verify-payment", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(response),
            });
            const verifyData = await verifyRes.json();
            if (verifyData.success) {
              setStatusMessage("🟢 Payment Successful & Verified!");
              alert(`🟢 SUCCESS!\nPayment ID: ${response.razorpay_payment_id}\n\nDashboard par Step 3 complete check karo!`);
            } else {
              setStatusMessage("🔴 Verification failed.");
            }
          } catch (err) {
            setStatusMessage("🔴 Verification error.");
          } finally {
            setLoading(false);
          }
        },
        prefill: {
          name: formData.name,
          email: formData.email,
          contact: formData.phone,
        },
        theme: {
          color: "#387515",
        },
        modal: {
          ondismiss: function () {
            setLoading(false);
            setStatusMessage("⚠️ Payment cancelled.");
          },
        },
      };

      const rzpInstance = new window.Razorpay(options);
      rzpInstance.on("payment.failed", function (resp) {
        setLoading(false);
        setStatusMessage(`🔴 Payment Failed: ${resp.error?.description || "Declined"}`);
        alert(`Payment Failed: ${resp.error?.description || "Declined"}`);
      });

      rzpInstance.open();
    } catch (err) {
      setLoading(false);
      setStatusMessage(`🔴 ${err.message}`);
      alert("Error: " + err.message);
    }
  };

  return (
    <div className="min-h-screen bg-[#F4F6F2] text-slate-900 flex items-center justify-center p-4 font-sans antialiased">
      <div className="w-full max-w-md bg-white rounded-[2.5rem] p-6 md:p-8 border border-neutral-100 shadow-[0_20px_50px_rgba(56,117,21,0.08)] space-y-6">
        
        <div className="text-center space-y-1">
          <div className="inline-flex items-center gap-1.5 text-[10px] font-black text-[#387515] bg-[#387515]/10 px-3 py-1 rounded-full uppercase tracking-widest mb-1">
            <FiShield /> Compliance Verification
          </div>
          <h1 className="text-2xl font-black uppercase tracking-tight text-slate-900">BSP CONTINENTAL</h1>
          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Test Mode Activation</p>
        </div>

        <div className="bg-slate-900 text-white p-5 rounded-2xl flex items-center justify-between border border-slate-800 shadow-md">
          <div className="space-y-1">
            <span className="text-[10px] font-mono text-[#FFDA50] uppercase tracking-widest font-bold">TOKEN CHARGE</span>
            <h3 className="font-bold text-sm tracking-wide flex items-center gap-1.5">
              Verification Token <FiCheckCircle className="text-emerald-400 text-xs" />
            </h3>
            <p className="text-[11px] text-slate-400">Step 3 of 4 Dashboard Test</p>
          </div>
          <div className="text-right">
            <span className="text-3xl font-black text-[#FFDA50]">₹10</span>
            <p className="text-[9px] font-mono text-slate-400">TEST TRANSACTION</p>
          </div>
        </div>

        <form onSubmit={handlePayment} className="space-y-3">
          <div>
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full bg-[#F4F6F2] border border-neutral-200/70 rounded-2xl py-3 px-4 text-xs font-bold text-slate-900 focus:outline-none focus:bg-white focus:border-[#387515]"
              required
            />
          </div>

          <div>
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full bg-[#F4F6F2] border border-neutral-200/70 rounded-2xl py-3 px-4 text-xs font-bold text-slate-900 focus:outline-none focus:bg-white focus:border-[#387515]"
              required
            />
          </div>

          <div>
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Phone Number</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className="w-full bg-[#F4F6F2] border border-neutral-200/70 rounded-2xl py-3 px-4 text-xs font-bold text-slate-900 focus:outline-none focus:bg-white focus:border-[#387515]"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#FFDA50] text-slate-950 font-black text-xs uppercase tracking-widest py-4 rounded-2xl flex items-center justify-center gap-2 active:scale-[0.98] shadow-md mt-4 hover:brightness-105 disabled:opacity-50 cursor-pointer"
          >
            <FiCreditCard className="text-sm" />
            <span>{loading ? "OPENING RAZORPAY..." : "PAY ₹10 (TEST TRANSACTION)"}</span>
          </button>
        </form>

        {statusMessage && (
          <div className="p-3 bg-[#F4F6F2] rounded-2xl text-[10px] font-mono font-bold text-center uppercase tracking-wider border border-neutral-200/50">
            {statusMessage}
          </div>
        )}

        <div className="text-center pt-2 border-t border-neutral-100">
          <p className="text-[10px] text-slate-400 font-medium flex items-center justify-center gap-1">
            <FiLock className="text-xs" /> Standard 256-Bit Encrypted Checkout
          </p>
        </div>

      </div>
    </div>
  );
}