"use client";

import { useState, useEffect } from "react";
import { FiShield, FiLock, FiCheckCircle, FiCreditCard, FiUser, FiMail, FiPhone } from "react-icons/fi";

export default function BillingPage() {
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");

  const [formData, setFormData] = useState({
    name: "Dileshwar Lahre",
    email: "bspcontinental01@gmail.com",
    phone: "9876543210",
  });

  useEffect(() => {
    if (!document.getElementById("razorpay-sdk")) {
      const script = document.createElement("script");
      script.id = "razorpay-sdk";
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    setStatusMessage("");

    if (typeof window === "undefined" || !window.Razorpay) {
      alert("Razorpay SDK load ho raha hai, 2 second baad dobara try karein!");
      return;
    }

    setLoading(true);
    setStatusMessage("Order initialize ho raha hai...");

    try {
      const orderRes = await fetch("/api/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: 2 }),
      });

      const orderData = await orderRes.json();

      if (!orderRes.ok || !orderData.order_id) {
        throw new Error(orderData.error || "Order generation failed");
      }

      setStatusMessage("Opening Razorpay Gateway...");

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "rzp_test_TL0KarblP7ow0X",
        amount: orderData.amount,
        currency: orderData.currency,
        name: "BSP Continental",
        description: "Standard Test Verification Fee",
        order_id: orderData.order_id,
        handler: async function (response) {
          setStatusMessage("Signature Verify ho raha hai...");
          try {
            const verifyRes = await fetch("/api/verify-payment", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              }),
            });

            const verifyData = await verifyRes.json();

            if (verifyData.success) {
              setStatusMessage("🟢 Payment Successful!");
              alert(`🟢 SUCCESS!\nPayment ID: ${response.razorpay_payment_id}`);
            } else {
              setStatusMessage("🔴 Verification Failed!");
            }
          } catch (err) {
            setStatusMessage("🔴 Verification Error");
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
          color: "#FF9900",
        },
        modal: {
          ondismiss: function () {
            setLoading(false);
            setStatusMessage("⚠️ Payment cancelled by user.");
          },
        },
      };

      const razorpayWindow = new window.Razorpay(options);

      razorpayWindow.on("payment.failed", function (response) {
        setLoading(false);
        setStatusMessage(`🔴 Payment Failed`);
        alert(`🔴 Payment Failed: ${response.error.description}`);
      });

      razorpayWindow.open();

    } catch (err) {
      setLoading(false);
      setStatusMessage(`🔴 ${err.message}`);
      alert("Error: " + err.message);
    }
  };

  return (
    <div className="min-h-screen bg-[#F3F4F6] text-black flex items-center justify-center p-4 font-sans antialiased">
      <div className="w-full max-w-md bg-white rounded-[2.5rem] p-6 md:p-8 border border-neutral-100 shadow-[0_20px_50px_rgba(0,0,0,0.08)] space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-1">
          <div className="inline-flex items-center gap-1.5 text-[11px] font-bold text-[#FF9900] bg-amber-50 px-3 py-1 rounded-full uppercase tracking-wider mb-1">
            <FiShield /> SECURE EXPRESS CHECKOUT
          </div>
          <h1 className="text-2xl font-black uppercase tracking-tight text-black">BSP CONTINENTAL</h1>
          <p className="text-[11px] font-mono text-neutral-400 uppercase tracking-widest">Instant Verification Portal</p>
        </div>

        {/* ₹2 Card */}
        <div className="bg-neutral-900 text-white p-5 rounded-2xl flex items-center justify-between border border-neutral-800 shadow-md">
          <div className="space-y-1">
            <span className="text-[10px] font-mono text-[#FF9900] uppercase tracking-widest font-bold">ACTIVE PLAN</span>
            <h3 className="font-bold text-sm tracking-wide flex items-center gap-1.5">
              Instant Account Test Fee <FiCheckCircle className="text-emerald-400 text-xs" />
            </h3>
            <p className="text-[11px] text-neutral-400">One-time test token authentication</p>
          </div>
          <div className="text-right">
            <span className="text-3xl font-black text-[#FF9900]">₹2</span>
            <p className="text-[9px] font-mono text-neutral-400">INC. ALL TAXES</p>
          </div>
        </div>

        {/* User Details Form */}
        <form onSubmit={handlePayment} className="space-y-3">
          <div>
            <label className="text-[10px] font-mono text-neutral-400 font-bold uppercase tracking-wider block mb-1">Full Name</label>
            <div className="relative flex items-center">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full bg-[#F3F4F6] border border-neutral-200/50 rounded-full py-3.5 pl-5 pr-10 text-xs font-bold text-black placeholder-neutral-400 focus:outline-none focus:bg-white focus:border-black transition-all shadow-inner"
                required
              />
              <FiUser className="absolute right-4 text-neutral-400 text-sm" />
            </div>
          </div>

          <div>
            <label className="text-[10px] font-mono text-neutral-400 font-bold uppercase tracking-wider block mb-1">Email Address</label>
            <div className="relative flex items-center">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full bg-[#F3F4F6] border border-neutral-200/50 rounded-full py-3.5 pl-5 pr-10 text-xs font-bold text-black placeholder-neutral-400 focus:outline-none focus:bg-white focus:border-black transition-all shadow-inner"
                required
              />
              <FiMail className="absolute right-4 text-neutral-400 text-sm" />
            </div>
          </div>

          <div>
            <label className="text-[10px] font-mono text-neutral-400 font-bold uppercase tracking-wider block mb-1">Phone Number</label>
            <div className="relative flex items-center">
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full bg-[#F3F4F6] border border-neutral-200/50 rounded-full py-3.5 pl-5 pr-10 text-xs font-bold text-black placeholder-neutral-400 focus:outline-none focus:bg-white focus:border-black transition-all shadow-inner"
                required
              />
              <FiPhone className="absolute right-4 text-neutral-400 text-sm" />
            </div>
          </div>

          {/* Pay Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full text-white font-black text-xs uppercase tracking-widest py-4 rounded-full transition-all flex items-center justify-center gap-2 active:scale-[0.98] shadow-md mt-4 hover:brightness-110 disabled:opacity-50"
            style={{ backgroundColor: "#FF9900", boxShadow: "0 4px 14px rgba(255, 153, 0, 0.4)" }}
          >
            <FiCreditCard className="text-sm" />
            <span>{loading ? "INITIALIZING..." : "PAY ₹2 SECURELY"}</span>
          </button>
        </form>

        {statusMessage && (
          <div className="p-3 bg-neutral-50 rounded-2xl text-[10px] font-mono font-bold text-center uppercase tracking-wider border border-neutral-100">
            {statusMessage}
          </div>
        )}

        {/* Footer info */}
        <div className="text-center pt-2 border-t border-neutral-100">
          <p className="text-[10px] text-neutral-400 font-medium flex items-center justify-center gap-1">
            <FiLock className="text-xs text-neutral-400" /> Standard Web Checkout via Razorpay
          </p>
        </div>

      </div>
    </div>
  );
}