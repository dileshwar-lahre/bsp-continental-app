import { NextResponse } from "next/server";

// Global cache object mapping trigger
global.otpCache = global.otpCache || {};

export async function POST(req) {
  try {
    const { target, otp } = await req.json();

    if (!target || !otp) {
      return NextResponse.json(
        { error: "Target identifier and OTP code are required." },
        { status: 400 }
      );
    }

    const targetEmail = target.toLowerCase().trim();

    // 1. Fetch live cache token reference
    const cachedOtp = global.otpCache[targetEmail];

    if (!cachedOtp || cachedOtp !== otp.trim()) {
      return NextResponse.json(
        { error: "Invalid or expired OTP token. Please request a new code." },
        { status: 400 }
      );
    }

    // 2. Clear verified token from cache
    delete global.otpCache[targetEmail];

    // Status authorized layout verified code
    return NextResponse.json({ 
      success: true, 
      message: "OTP verification successful. You may now create your new password." 
    });
  } catch (err) {
    return NextResponse.json(
      { error: err.message || "An error occurred during OTP verification." },
      { status: 500 }
    );
  }
}