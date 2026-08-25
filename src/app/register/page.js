"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FiArrowRight, FiX, FiCheckCircle, FiRefreshCw, FiShield, FiUser, FiMail, FiLock } from "react-icons/fi";

export default function RegisterPage() {
  const router = useRouter();
  const [step, setStep] = useState("details"); 
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
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

  const executeAuthAction = async (payload) => {
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "A network error occurred. Please try again.");
    return data;
  };

  const handleDetailsSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await executeAuthAction({ action: "INIT", name, email });
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
      await executeAuthAction({ action: "INIT", name, email });
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
      await executeAuthAction({ action: "VERIFY", email, otp });
      setStep("password");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleFinalRegister = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match. Please re-verify.");
      return;
    }

    setLoading(true);
    try {
      await executeAuthAction({ action: "FINAL", name, email, otp, password });
      router.push("/login"); 
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F4F6F2] text-black flex items-center justify-center pb-20 pt-8 font-sans antialiased select-none px-4 relative overflow-hidden">
      
      <div className="w-full max-w-[420px] bg-white rounded-[2.5rem] p-8 md:p-10 relative z-50 shadow-[0_20px_50px_rgba(56,117,21,0.08),0_4px_12px_rgba(0,0,0,0.04)] border border-neutral-100 transition-all duration-300">
        
        <Link 
          href="/" 
          className="absolute top-6 right-6 w-8 h-8 bg-neutral-100/70 rounded-full flex items-center justify-center text-neutral-400 hover:text-black hover:bg-neutral-200 transition-all active:scale-90"
        >
          <FiX className="text-sm" />
        </Link>

        <div className="text-center space-y-1 mb-6 pt-2">
          <div className="inline-block px-3 py-1 rounded-full bg-[#FFDA50]/30 text-[#387515] font-black text-[10px] uppercase tracking-widest mb-1 border border-[#FFDA50]/60">
            {step === "details" && "Step 1: Account Creation"}
            {step === "otp" && "Step 2: Security Verification"}
            {step === "password" && "Step 3: Setup Password"}
          </div>
          <h1 className="text-3xl font-black tracking-tight text-slate-900 uppercase">
            SIGN <span className="text-[#387515]">UP</span>
          </h1>
          <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
            BSP Continental Registration Node
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-100 text-red-600 rounded-2xl text-[11px] font-bold text-center leading-snug">
            ⚠️ {error}
          </div>
        )}

        {step === "details" && (
          <form onSubmit={handleDetailsSubmit} className="space-y-4">
            <div className="relative flex items-center">
              <input 
                type="text" 
                required 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                placeholder="Full Name" 
                className="w-full bg-[#F4F6F2] border border-neutral-200/60 rounded-2xl py-3.5 pl-5 pr-12 text-xs font-bold text-black placeholder-neutral-400 focus:outline-none focus:bg-white focus:border-[#387515] transition-all" 
              />
              <FiUser className="absolute right-4 text-neutral-400 text-sm pointer-events-none" />
            </div>

            <div className="relative flex items-center">
              <input 
                type="email" 
                required 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                placeholder="Email Address" 
                className="w-full bg-[#F4F6F2] border border-neutral-200/60 rounded-2xl py-3.5 pl-5 pr-12 text-xs font-bold text-black placeholder-neutral-400 focus:outline-none focus:bg-white focus:border-[#387515] transition-all" 
              />
              <FiMail className="absolute right-4 text-neutral-400 text-sm pointer-events-none" />
            </div>

            <button 
              type="submit" 
              disabled={loading} 
              className="w-full text-slate-950 font-black text-xs uppercase tracking-widest py-4 rounded-2xl transition-all flex items-center justify-center gap-2 active:scale-[0.98] shadow-md mt-6 hover:brightness-105 disabled:opacity-50 cursor-pointer" 
              style={{ backgroundColor: "#FFDA50", boxShadow: "0 6px 20px rgba(255, 218, 80, 0.35)" }}
            >
              <span>{loading ? "SENDING VERIFICATION CODE..." : "VERIFY EMAIL"}</span>
              {!loading && <FiArrowRight className="text-sm" />}
            </button>
          </form>
        )}

        {step === "otp" && (
          <form onSubmit={handleOtpVerify} className="space-y-4">
            <p className="text-[11px] font-bold text-neutral-500 text-center mb-2">
              A 6-digit verification code has been sent to <span className="text-[#387515] font-black">{email}</span>
            </p>
            
            <input 
              type="text" 
              maxLength={6} 
              required 
              value={otp} 
              onChange={(e) => setOtp(e.target.value)} 
              placeholder="Enter 6-Digit Code" 
              className="w-full bg-[#F4F6F2] border border-neutral-200/60 rounded-2xl py-3.5 text-center text-sm font-black text-black tracking-widest focus:outline-none focus:border-[#387515] focus:bg-white transition-all" 
            />
            
            <button 
              type="submit" 
              disabled={loading} 
              className="w-full text-slate-950 font-black text-xs uppercase tracking-widest py-4 rounded-2xl transition-all flex items-center justify-center gap-2 active:scale-[0.98] shadow-md mt-2 hover:brightness-105 disabled:opacity-50 cursor-pointer" 
              style={{ backgroundColor: "#FFDA50", boxShadow: "0 6px 20px rgba(255, 218, 80, 0.35)" }}
            >
              <span>{loading ? "VERIFYING CODE..." : "CONFIRM CODE"}</span>
              {!loading && <FiCheckCircle className="text-sm" />}
            </button>

            <div className="text-center pt-2">
              {canResend ? (
                <button 
                  type="button" 
                  onClick={handleResendOtp} 
                  disabled={loading} 
                  className="text-xs font-bold flex items-center justify-center gap-1.5 mx-auto uppercase tracking-wider text-[#387515] hover:underline active:scale-95 transition-all cursor-pointer"
                >
                  <FiRefreshCw className={loading ? "animate-spin" : ""} /> Resend Verification Code
                </button>
              ) : (
                <p className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest">
                  Resend available in: <span className="text-black font-black font-sans">{resendTimer}s</span>
                </p>
              )}
            </div>
          </form>
        )}

        {step === "password" && (
          <form onSubmit={handleFinalRegister} className="space-y-4">
            <div className="relative flex items-center">
              <input 
                type="password" 
                required 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                placeholder="Create Password" 
                className="w-full bg-[#F4F6F2] border border-neutral-200/60 rounded-2xl py-3.5 pl-5 pr-12 text-xs font-bold text-black placeholder-neutral-400 focus:outline-none focus:bg-white focus:border-[#387515] transition-all" 
              />
              <FiLock className="absolute right-4 text-neutral-400 text-sm pointer-events-none" />
            </div>

            <div className="relative flex items-center">
              <input 
                type="password" 
                required 
                value={confirmPassword} 
                onChange={(e) => setConfirmPassword(e.target.value)} 
                placeholder="Confirm Password" 
                className="w-full bg-[#F4F6F2] border border-neutral-200/60 rounded-2xl py-3.5 pl-5 pr-12 text-xs font-bold text-black placeholder-neutral-400 focus:outline-none focus:bg-white focus:border-[#387515] transition-all" 
              />
              <FiShield className="absolute right-4 text-neutral-400 text-sm pointer-events-none" />
            </div>

            <button 
              type="submit" 
              disabled={loading} 
              className="w-full text-slate-950 font-black text-xs uppercase tracking-widest py-4 rounded-2xl transition-all flex items-center justify-center gap-2 active:scale-[0.98] shadow-md mt-6 hover:brightness-105 disabled:opacity-50 cursor-pointer" 
              style={{ backgroundColor: "#FFDA50", boxShadow: "0 6px 20px rgba(255, 218, 80, 0.35)" }}
            >
              <FiCheckCircle className="text-sm" />
              <span>{loading ? "CREATING ACCOUNT..." : "FINALIZE REGISTRATION"}</span>
            </button>
          </form>
        )}

        <div className="text-center pt-5 mt-5 border-t border-neutral-100">
          <p className="text-[11px] text-slate-500 font-semibold">
            Already registered?{" "}
            <Link 
              href="/login" 
              className="font-extrabold uppercase tracking-wider hover:underline" 
              style={{ color: "#387515" }}
            >
              Sign In Here
            </Link>
          </p>
        </div>

      </div>

      <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-[#FFDA50]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-96 h-96 bg-[#387515]/10 rounded-full blur-3xl pointer-events-none" />
    </div>
  );
}