"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FiLock, FiArrowRight, FiX, FiMail, FiCheckCircle, FiRefreshCw } from "react-icons/fi";

export default function ForgetPasswordPage() {
  const router = useRouter();
  const [step, setStep] = useState("email"); // 'email' -> 'otp' -> 'password'
  
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

  const sendResetOtp = async () => {
    const res = await fetch("/api/auth/forget-init", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Reset processing issue!");
  };

  const handleEmailSubmit = async (e) => {
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
      // Direct pass verification check payload locally to hit final route combined
      const res = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ target: email, otp }),
      });
      // Temporarily link to custom validator or move to pass step directly
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
      setError("Passwords match nahi ho rahe hain!");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/auth/forget-final", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp, password }),
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
    <div className="min-h-screen bg-[#F3F4F6] text-black flex items-center justify-center pb-28 font-sans antialiased select-none px-4 relative overflow-hidden">
      <div className="w-full max-w-[400px] bg-white rounded-[2.5rem] p-8 md:p-10 relative z-50 shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-neutral-100">
        
        <Link href="/login" className="absolute top-6 right-6 w-8 h-8 bg-neutral-50 rounded-full flex items-center justify-center text-neutral-400 hover:text-black"><FiX className="text-sm" /></Link>

        <div className="text-center space-y-1 mb-6 pt-2">
          <h1 className="text-2xl font-black tracking-tight text-black uppercase">RESET PASSWORD</h1>
          <p className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest">
            {step === "email" && "Step 1: Request Token"}
            {step === "otp" && "Step 2: Token Verification"}
            {step === "password" && "Step 3: New Encryption"}
          </p>
        </div>

        {error && <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-2xl text-[11px] font-bold text-center uppercase">{error}</div>}

        {step === "email" && (
          <form onSubmit={handleEmailSubmit} className="space-y-4">
            <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Registered Email Address" className="w-full bg-[#F3F4F6] border border-neutral-200/40 rounded-full py-4 pl-6 text-xs font-bold text-black focus:outline-none focus:bg-white focus:border-black transition-all" />
            <button type="submit" disabled={loading} className="w-full text-white font-black text-xs uppercase tracking-widest py-4.5 rounded-full mt-6 transition-all" style={{ backgroundColor: "#FF9900", boxShadow: "0 4px 14px rgba(255, 153, 0, 0.4)" }}>
              {loading ? "CHECKING REPOSITORY..." : "SEND SECURITY CODE"}
            </button>
          </form>
        )}

        {step === "otp" && (
          <form onSubmit={handleOtpVerify} className="space-y-4">
            <p className="text-[11px] font-bold text-neutral-400 text-center mb-2">Enter validation code sent to your mail node</p>
            <input type="text" maxLength={6} required value={otp} onChange={(e) => setOtp(e.target.value)} placeholder="Enter 6-Digit OTP" className="w-full bg-[#F3F4F6] border border-neutral-200/40 rounded-full py-4 text-center text-sm font-black text-black tracking-widest focus:outline-none" />
            <button type="submit" className="w-full text-white font-black text-xs uppercase tracking-widest py-4.5 rounded-full mt-2" style={{ backgroundColor: "#FF9900" }}>
              CONFIRM TOKEN
            </button>
            <div className="text-center pt-2">
              {canResend ? (
                <button type="button" onClick={handleResendOtp} disabled={loading} className="text-xs font-bold flex items-center justify-center gap-1.5 mx-auto uppercase tracking-wider" style={{ color: "#FF9900" }}>
                  <FiRefreshCw /> Resend Verification Code
                </button>
              ) : (
                <p className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest">Available in: <span className="text-black font-black font-sans">{resendTimer}s</span></p>
              )}
            </div>
          </form>
        )}

        {step === "password" && (
          <form onSubmit={handleFinalReset} className="space-y-4">
            <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Create New Password" className="w-full bg-[#F3F4F6] border border-neutral-200/40 rounded-full py-4 pl-6 text-xs font-bold text-black" />
            <input type="password" required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirm New Password" className="w-full bg-[#F3F4F6] border border-neutral-200/40 rounded-full py-4 pl-6 text-xs font-bold text-black" />
            <button type="submit" disabled={loading} className="w-full text-white font-black text-xs uppercase tracking-widest py-4.5 rounded-full mt-6 flex items-center justify-center gap-2" style={{ backgroundColor: "#FF9900" }}>
              <FiCheckCircle />
              <span>{loading ? "UPDATING CORE..." : "OVERWRITE PASSWORD"}</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
}