"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FiLock, FiArrowRight, FiX, FiPhone, FiCheckCircle, FiRefreshCw } from "react-icons/fi";

function ForgetPasswordForm() {
  const router = useRouter();
  const [step, setStep] = useState("phone"); // 'phone' -> 'otp' -> 'password'
  
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    let interval = null;
    if (step === "otp" && resendTimer > 0) {
      interval = setInterval(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
    } else if (resendTimer === 0) {
      setCanResend(true);
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [step, resendTimer]);

  const sendResetOtp = async () => {
    const res = await fetch("/api/auth/forget-init", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phone }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Reset processing issue!");
  };

  const handlePhoneSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await sendResetOtp();
      setResendTimer(30);
      setCanResend(false);
      setStep("otp");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    setError("");
    setLoading(true);
    setOtp("");
    try {
      await sendResetOtp();
      setResendTimer(30);
      setCanResend(false);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleOtpVerify = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      // Proceed to password reset step once OTP format is entered
      setStep("password");
    } catch (err) {
      setError("Invalid Code.");
    } finally {
      setLoading(false);
    }
  };

  const handleFinalReset = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/auth/forget-final", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, otp, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Update database crash!");
      
      router.push("/login");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F4F6F2] text-black flex items-center justify-center pb-20 pt-8 font-sans antialiased select-none px-4 relative overflow-hidden">
      <div className="w-full max-w-[420px] bg-white rounded-[2.5rem] p-8 md:p-10 relative z-50 shadow-[0_20px_50px_rgba(56,117,21,0.08),0_4px_12px_rgba(0,0,0,0.04)] border border-neutral-100">
        
        <Link href="/login" className="absolute top-6 right-6 w-8 h-8 bg-neutral-100/70 rounded-full flex items-center justify-center text-neutral-400 hover:text-black"><FiX className="text-sm" /></Link>

        <div className="text-center space-y-1 mb-6 pt-2">
          <div className="inline-block px-3 py-1 rounded-full bg-[#FFDA50]/30 text-[#387515] font-black text-[10px] uppercase tracking-widest mb-1 border border-[#FFDA50]/60">
            {step === "phone" && "Step 1: Account Recovery"}
            {step === "otp" && "Step 2: WhatsApp Verification"}
            {step === "password" && "Step 3: New Password Setup"}
          </div>
          <h1 className="text-3xl font-black tracking-tight text-slate-900 uppercase">
            RESET <span className="text-[#387515]">PASSWORD</span>
          </h1>
          <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
            BSP Continental Security Portal
          </p>
        </div>

        {error && <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-2xl text-[11px] font-bold text-center uppercase">⚠️ {error}</div>}

        {step === "phone" && (
          <form onSubmit={handlePhoneSubmit} className="space-y-4">
            <div className="relative flex items-center">
              <input type="text" required value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Mobile Number (e.g. 919752...)" className="w-full bg-[#F4F6F2] border border-neutral-200/60 rounded-2xl py-3.5 pl-5 pr-12 text-xs font-bold text-black placeholder-neutral-400 focus:outline-none focus:bg-white focus:border-[#387515] transition-all" />
              <FiPhone className="absolute right-4 text-neutral-400 text-sm pointer-events-none" />
            </div>
            <button type="submit" disabled={loading} className="w-full text-slate-950 font-black text-xs uppercase tracking-widest py-4 rounded-2xl transition-all shadow-md mt-6 cursor-pointer" style={{ backgroundColor: "#FFDA50", boxShadow: "0 6px 20px rgba(255, 218, 80, 0.35)" }}>
              {loading ? "SENDING OTP..." : "SEND WHATSAPP OTP"}
            </button>
          </form>
        )}

        {step === "otp" && (
          <form onSubmit={handleOtpVerify} className="space-y-4">
            <p className="text-[11px] font-bold text-neutral-500 text-center mb-2">Enter validation code sent to <span className="text-[#387515] font-black">{phone}</span></p>
            <input type="text" maxLength={6} required value={otp} onChange={(e) => setOtp(e.target.value)} placeholder="Enter 6-Digit Code" className="w-full bg-[#F4F6F2] border border-neutral-200/60 rounded-2xl py-3.5 text-center text-sm font-black text-black tracking-widest focus:outline-none focus:border-[#387515] focus:bg-white transition-all" />
            <button type="submit" className="w-full text-slate-950 font-black text-xs uppercase tracking-widest py-4 rounded-2xl mt-2 cursor-pointer shadow-md" style={{ backgroundColor: "#FFDA50", boxShadow: "0 6px 20px rgba(255, 218, 80, 0.35)" }}>
              CONFIRM TOKEN
            </button>
            <div className="text-center pt-2">
              {canResend ? (
                <button type="button" onClick={handleResendOtp} disabled={loading} className="text-xs font-bold flex items-center justify-center gap-1.5 mx-auto uppercase tracking-wider text-[#387515] hover:underline cursor-pointer">
                  <FiRefreshCw /> Resend WhatsApp OTP
                </button>
              ) : (
                <p className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest">Available in: <span className="text-black font-black font-sans">{resendTimer}s</span></p>
              )}
            </div>
          </form>
        )}

        {step === "password" && (
          <form onSubmit={handleFinalReset} className="space-y-4">
            <div className="relative flex items-center">
              <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Create New Password" className="w-full bg-[#F4F6F2] border border-neutral-200/60 rounded-2xl py-3.5 pl-5 pr-12 text-xs font-bold text-black placeholder-neutral-400 focus:outline-none focus:bg-white focus:border-[#387515] transition-all" />
              <FiLock className="absolute right-4 text-neutral-400 text-sm pointer-events-none" />
            </div>
            <div className="relative flex items-center">
              <input type="password" required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirm New Password" className="w-full bg-[#F4F6F2] border border-neutral-200/60 rounded-2xl py-3.5 pl-5 pr-12 text-xs font-bold text-black placeholder-neutral-400 focus:outline-none focus:bg-white focus:border-[#387515] transition-all" />
              <FiLock className="absolute right-4 text-neutral-400 text-sm pointer-events-none" />
            </div>
            <button type="submit" disabled={loading} className="w-full text-slate-950 font-black text-xs uppercase tracking-widest py-4 rounded-2xl mt-6 flex items-center justify-center gap-2 cursor-pointer shadow-md" style={{ backgroundColor: "#FFDA50", boxShadow: "0 6px 20px rgba(255, 218, 80, 0.35)" }}>
              <FiCheckCircle />
              <span>{loading ? "UPDATING PASSWORD..." : "RESET PASSWORD"}</span>
            </button>
          </form>
        )}

      </div>
    </div>
  );
}

export default function ForgetPasswordPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#F4F6F2] flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-[#387515] border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <ForgetPasswordForm />
    </Suspense>
  );
}