"use client";

import { useState } from "react";
import { FiCheckCircle, FiCreditCard, FiLock, FiZap } from "react-icons/fi";

export default function BillingPage() {
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");

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

  const handleInstantPay = async () => {
    if (loading) return;

    setStatusMessage("");
    setLoading(true);
    setStatusMessage("Creating ₹1 Test Token...");

    const isLoaded = await loadRazorpayScript();
    if (!isLoaded) {
      setLoading(false);
      setStatusMessage("🔴 Razorpay SDK script load failed.");
      return;
    }

    try {
      const res = await fetch("/api/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: 1 }),
      });

      const orderData = await res.json();
      if (!res.ok || !orderData.order_id || !orderData.key_id) {
        throw new Error(orderData.error || "Order creation failed.");
      }

      setStatusMessage("Opening Razorpay Gateway...");

      const options = {
        key: orderData.key_id, // PURE DYNAMIC KEY FROM BACKEND
        amount: orderData.amount,
        currency: orderData.currency || "INR",
        name: "BSP CONTINENTAL PVT LTD",
        description: "1-Click ₹1 Test Verification",
        order_id: orderData.order_id,
        prefill: {
          name: "Test Customer",
          email: "testcustomer99@gmail.com",
          contact: "9876543210",
        },
        theme: { color: "#387515" },
        handler: async function (response) {
          setStatusMessage("Verifying ₹1 on Razorpay Cloud...");
          try {
            const verifyRes = await fetch("/api/verify-payment", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(response),
            });
            const verifyData = await verifyRes.json();
            if (verifyData.success) {
              setStatusMessage("🟢 ₹1 Payment Successful & Verified!");
              alert(`🟢 SUCCESS!\nPayment ID: ${response.razorpay_payment_id}\n\nRazorpay Dashboard par Step 3 of 4 refresh karo!`);
            } else {
              setStatusMessage("🔴 Verification failed.");
            }
          } catch (err) {
            setStatusMessage("🔴 Verification network error.");
          } finally {
            setLoading(false);
          }
        },
        modal: {
          ondismiss: () => {
            setLoading(false);
            setStatusMessage("⚠️ Payment cancelled.");
          },
        },
      };

      const rzpInstance = new window.Razorpay(options);
      rzpInstance.on("payment.failed", (resp) => {
        setLoading(false);
        setStatusMessage(`🔴 ${resp.error?.description || "Payment Failed"}`);
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
      <div className="w-full max-w-sm bg-white rounded-[2.5rem] p-7 border border-neutral-100 shadow-[0_20px_50px_rgba(56,117,21,0.08)] space-y-6 text-center">
        
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1 text-[10px] font-black text-[#387515] bg-[#387515]/10 px-3 py-1 rounded-full uppercase tracking-widest">
            <FiZap /> 1-Click Sandbox Test
          </div>
          <h1 className="text-xl font-black uppercase text-slate-900">BSP CONTINENTAL</h1>
          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Step 3 of 4 Dashboard Clear</p>
        </div>

        <div className="bg-slate-900 text-white p-5 rounded-2xl flex items-center justify-between border border-slate-800 shadow-md">
          <div className="text-left space-y-0.5">
            <span className="text-[10px] font-mono text-[#FFDA50] uppercase tracking-widest font-bold">CHARGE</span>
            <h3 className="font-bold text-xs tracking-wide flex items-center gap-1 text-slate-200">
              Test Token <FiCheckCircle className="text-emerald-400 text-xs" />
            </h3>
          </div>
          <div className="text-right">
            <span className="text-3xl font-black text-[#FFDA50]">₹1</span>
            <p className="text-[8px] font-mono text-slate-400">NO FORM NEEDED</p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleInstantPay}
          disabled={loading}
          className="w-full bg-[#FFDA50] text-slate-950 font-black text-xs uppercase tracking-widest py-4 rounded-2xl flex items-center justify-center gap-2 active:scale-[0.98] shadow-md hover:brightness-105 disabled:opacity-50 cursor-pointer"
        >
          <FiCreditCard className="text-sm" />
          <span>{loading ? "OPENING GATEWAY..." : "PAY ₹1 INSTANT TEST"}</span>
        </button>

        {statusMessage && (
          <div className="p-3 bg-[#F4F6F2] rounded-2xl text-[10px] font-mono font-bold uppercase tracking-wider border border-neutral-200/50">
            {statusMessage}
          </div>
        )}

        <div className="pt-2 border-t border-neutral-100">
          <p className="text-[10px] text-slate-400 font-medium flex items-center justify-center gap-1">
            <FiLock className="text-xs" /> Pure Dynamic Gateway Link
          </p>
        </div>

      </div>
    </div>
  );
}