"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FiLock, FiArrowRight, FiX, FiCheckCircle, FiRefreshCw } from "react-icons/fi";

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
    if (!res.ok) throw new Error(data.error || "Network error code caught!");
    return data;
  };

  const handleDetailsSubmit = async (e) => {
    e.preventDefault();
    setError("");
    loading || setLoading(true);
    try {
      await executeAuthAction({ action: "INIT", name, email });
      setResendTimer(30);
      setCanResend(false);
      setStep("otp");
    } catch (err) {
      setError(err.message);
    } final: {
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
      setError("Passwords update mismatch! Kripya check karein.");
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
    <div className="min-h-screen bg-[#F3F4F6] text-black flex items-center justify-center pb-28 font-sans antialiased select-none px-4 relative overflow-hidden">
      <div className="w-full max-w-[400px] bg-white rounded-[2.5rem] p-8 md:p-10 relative z-50 shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-neutral-100">
        
        <Link href="/" className="absolute top-6 right-6 w-8 h-8 bg-neutral-50 rounded-full flex items-center justify-center text-neutral-400 hover:text-black">
          <FiX className="text-sm" />
        </Link>

        <div className="text-center space-y-1 mb-6 pt-2">
          <h1 className="text-3xl font-black tracking-widest text-black uppercase">SIGN UP</h1>
          <p className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest">
            {step === "details" && "Step 1: Contact Details"}
            {step === "otp" && "Step 2: Security Token"}
            {step === "password" && "Step 3: Access Password Lock"}
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-2xl text-[11px] font-bold text-center uppercase tracking-wider">
            {error}
          </div>
        )}

        {step === "details" && (
          <form onSubmit={handleDetailsSubmit} className="space-y-4">
            <input type="text" required value={name} onChange={(e) => setName(e.target.value)} placeholder="Full Name" className="w-full bg-[#F3F4F6] border border-neutral-200/40 rounded-full py-4 pl-6 text-xs font-bold text-black focus:outline-none focus:bg-white focus:border-black transition-all shadow-inner" />
            <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email Address" className="w-full bg-[#F3F4F6] border border-neutral-200/40 rounded-full py-4 pl-6 text-xs font-bold text-black focus:outline-none focus:bg-white focus:border-black transition-all shadow-inner" />
            <button type="submit" disabled={loading} className="w-full text-white font-black text-xs uppercase tracking-widest py-4.5 rounded-full mt-6 transition-all hover:brightness-110 active:scale-[0.98]" style={{ backgroundColor: "#FF9900", boxShadow: "0 4px 14px rgba(255, 153, 0, 0.4)" }}>
              {loading ? "SENDING CLUSTER OTP..." : "VERIFY EMAIL"}
            </button>
          </form>
        )}

        {step === "otp" && (
          <form onSubmit={handleOtpVerify} className="space-y-4">
            <p className="text-[11px] font-bold text-neutral-400 text-center mb-2">Secure OTP token code fired by <span className="text-black font-black">BSP Continental</span></p>
            <input type="text" maxLength={6} required value={otp} onChange={(e) => setOtp(e.target.value)} placeholder="Enter 6-Digit OTP" className="w-full bg-[#F3F4F6] border border-neutral-200/40 rounded-full py-4 text-center text-sm font-black text-black tracking-widest focus:outline-none focus:border-black focus:bg-white transition-all shadow-inner" />
            
            <button type="submit" disabled={loading} className="w-full text-white font-black text-xs uppercase tracking-widest py-4.5 rounded-full mt-2 transition-all hover:brightness-110 active:scale-[0.98]" style={{ backgroundColor: "#FF9900" }}>
              {loading ? "AUTHORIZING..." : "CONFIRM OTP"}
            </button>

            <div className="text-center pt-2">
              {canResend ? (
                <button type="button" onClick={handleResendOtp} disabled={loading} className="text-xs font-bold flex items-center justify-center gap-1.5 mx-auto uppercase tracking-wider hover:brightness-110 active:scale-95 transition-all" style={{ color: "#FF9900" }}>
                  <FiRefreshCw className={loading ? "animate-spin" : ""} /> Resend OTP Code
                </button>
              ) : (
                <p className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest">
                  Resend OTP available in: <span className="text-black font-black font-sans">{resendTimer}s</span>
                </p>
              )}
            </div>
          </form>
        )}

        {step === "password" && (
          <form onSubmit={handleFinalRegister} className="space-y-4">
            <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Create Secure Password" className="w-full bg-[#F3F4F6] border border-neutral-200/40 rounded-full py-4 pl-6 text-xs font-bold text-black focus:outline-none focus:bg-white focus:border-black transition-all shadow-inner" />
            <input type="password" required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirm Secure Password" className="w-full bg-[#F3F4F6] border border-neutral-200/40 rounded-full py-4 pl-6 text-xs font-bold text-black focus:outline-none focus:bg-white focus:border-black transition-all shadow-inner" />
            <button type="submit" disabled={loading} className="w-full text-white font-black text-xs uppercase tracking-widest py-4.5 rounded-full mt-6 flex items-center justify-center gap-2 transition-all hover:brightness-110 active:scale-[0.98]" style={{ backgroundColor: "#FF9900", boxShadow: "0 4px 14px rgba(255, 153, 0, 0.4)" }}>
              <FiCheckCircle />
              <span>{loading ? "ENCRYPTING ACCOUNT..." : "FINALIZE REGISTRATION"}</span>
            </button>
          </form>
        )}

        <div className="text-center pt-6 mt-6 border-t border-neutral-100">
          <Link href="/login" className="text-xs font-bold uppercase tracking-widest" style={{ color: "#FF9900" }}>
            Login Here
          </Link>
        </div>

      </div>
    </div>
  );
}