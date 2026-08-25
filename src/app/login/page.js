"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { FiMail, FiLock, FiArrowRight, FiX, FiCheck, FiAlertTriangle } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // 📧 Trigger One-Time Welcome Mail with PDF
  const triggerWelcomeEmail = async (userEmail, userName) => {
    try {
      await fetch("/api/auth/welcome", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: userEmail, name: userName }),
      });
    } catch (e) {
      console.error("Welcome email check failed:", e);
    }
  };

  // 📋 MANUAL LOGIN HANDLER
  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    // 🚨 Strict Consent Lock
    if (!agreeTerms) {
      alert("⚠️ Terms of Service aur Privacy Policy box ko tick kiye bina aap login nahi kar sakte!");
      setError("Please accept the Terms & Conditions and Privacy Policy to continue.");
      return;
    }

    setLoading(true);

    try {
      const res = await signIn("credentials", {
        redirect: false,
        email: email.toLowerCase(),
        password,
      });

      if (res?.error) {
        setError(res.error);
      } else {
        await triggerWelcomeEmail(email.toLowerCase(), email.split("@")[0]);
        router.push("/");
      }
    } catch (err) {
      setError("Something went wrong! Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // 🌐 GOOGLE OAUTH HANDLER
  const handleGoogleLogin = async () => {
    setError("");

    // 🚨 Strict Consent Lock for Google
    if (!agreeTerms) {
      alert("⚠️ Terms of Service aur Privacy Policy box ko tick kiye bina aap Google se login nahi kar sakte!");
      setError("Please accept the Terms & Conditions and Privacy Policy to continue.");
      return;
    }

    try {
      await signIn("google", { callbackUrl: "/" });
    } catch (err) {
      setError("Google Authentication failed!");
    }
  };

  return (
    <div className="min-h-screen bg-[#F4F6F2] text-black flex items-center justify-center pb-20 pt-8 font-sans antialiased select-none px-4 relative overflow-hidden">
      
      <div className="w-full max-w-[420px] bg-white rounded-[2.5rem] p-8 md:p-10 relative z-50 shadow-[0_20px_50px_rgba(56,117,21,0.08),0_4px_12px_rgba(0,0,0,0.04)] border border-neutral-100 transition-all duration-300">
        
        {/* Close Button */}
        <Link 
          href="/"
          className="absolute top-6 right-6 w-8 h-8 bg-neutral-100/70 rounded-full flex items-center justify-center text-neutral-400 hover:text-black hover:bg-neutral-200 transition-all active:scale-90"
        >
          <FiX className="text-sm" />
        </Link>

        {/* Header */}
        <div className="text-center space-y-1 mb-6 pt-2">
          <div className="inline-block px-3 py-1 rounded-full bg-[#FFDA50]/30 text-[#387515] font-black text-[10px] uppercase tracking-widest mb-1 border border-[#FFDA50]/60">
            Secure Access Portal
          </div>
          <h1 className="text-3xl font-black tracking-tight text-slate-900 uppercase">
            BSP <span className="text-[#387515]">Continental</span>
          </h1>
          <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
            Sign In to your Account
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-100 text-red-600 rounded-2xl text-[11px] font-bold text-center leading-snug flex items-center justify-center gap-2">
            <FiAlertTriangle className="shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-4">
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

          <div className="space-y-2">
            <div className="relative flex items-center">
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full bg-[#F4F6F2] border border-neutral-200/60 rounded-2xl py-3.5 pl-5 pr-12 text-xs font-bold text-black placeholder-neutral-400 focus:outline-none focus:bg-white focus:border-[#387515] transition-all"
              />
              <FiLock className="absolute right-4 text-neutral-400 text-sm pointer-events-none" />
            </div>

            <div className="text-right pr-2">
              <Link 
                href="/forget-password" 
                className="text-[11px] font-bold text-neutral-400 tracking-tight hover:text-[#387515] transition-colors"
              >
                Forgot Password?
              </Link>
            </div>
          </div>

          {/* Mandatory Checkbox */}
          <div className="pt-2">
            <label className="flex items-start gap-2.5 cursor-pointer group select-none">
              <div 
                onClick={() => setAgreeTerms(!agreeTerms)}
                className={`w-5 h-5 rounded-lg border flex items-center justify-center mt-0.5 transition-all shrink-0 ${
                  agreeTerms 
                    ? "bg-[#387515] border-[#387515] text-white shadow-xs" 
                    : "bg-[#F4F6F2] border-neutral-300 group-hover:border-[#387515]"
                }`}
              >
                {agreeTerms && <FiCheck className="text-xs stroke-[3]" />}
              </div>
              <span className="text-[11px] text-slate-600 leading-tight font-medium">
                I agree to the{" "}
                <Link href="/terms" className="font-bold text-[#387515] hover:underline" onClick={(e) => e.stopPropagation()}>
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="/privacy" className="font-bold text-[#387515] hover:underline" onClick={(e) => e.stopPropagation()}>
                  Privacy Policy
                </Link>
              </span>
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full text-slate-950 font-black text-xs uppercase tracking-widest py-4 rounded-2xl transition-all flex items-center justify-center gap-2 active:scale-[0.98] shadow-md mt-4 hover:brightness-105 disabled:opacity-50 cursor-pointer"
            style={{ 
              backgroundColor: "#FFDA50", 
              boxShadow: "0 6px 20px rgba(255, 218, 80, 0.35)" 
            }}
          >
            <span>{loading ? "AUTHENTICATING..." : "SIGN IN"}</span>
            {!loading && <FiArrowRight className="text-sm" />}
          </button>
        </form>

        <div className="relative flex py-4 items-center">
          <div className="flex-grow border-t border-neutral-100"></div>
          <span className="flex-shrink mx-4 text-[9px] font-mono text-neutral-300 uppercase tracking-widest">OR</span>
          <div className="flex-grow border-t border-neutral-100"></div>
        </div>

        {/* Google OAuth Button */}
        <button
          type="button"
          onClick={handleGoogleLogin}
          className="w-full bg-[#F4F6F2] hover:bg-neutral-100 border border-neutral-200/80 text-black font-black text-xs uppercase tracking-wider py-3.5 rounded-2xl transition-all flex items-center justify-center gap-3 active:scale-[0.98] shadow-xs cursor-pointer"
        >
          <FcGoogle className="text-lg" />
          <span>Continue with Google</span>
        </button>

        {/* Footer */}
        <div className="text-center pt-5 mt-5 border-t border-neutral-100">
          <p className="text-[11px] text-slate-500 font-semibold">
            Don't have an account?{" "}
            <Link 
              href="/register" 
              className="font-extrabold uppercase tracking-wider hover:underline"
              style={{ color: "#387515" }}
            >
              Sign Up
            </Link>
          </p>
        </div>

      </div>

      <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-[#FFDA50]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-96 h-96 bg-[#387515]/10 rounded-full blur-3xl pointer-events-none" />
    </div>
  );
}