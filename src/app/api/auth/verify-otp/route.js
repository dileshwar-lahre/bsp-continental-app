import { NextResponse } from "next/server";

// Global cache object mapping trigger
global.otpCache = global.otpCache || {};

export async function POST(req) {
  try {
    const { target, otp } = await req.json();
    const targetEmail = target.toLowerCase();

    // 1. Fetch live cache token reference
    const cachedOtp = global.otpCache[targetEmail];

    if (!cachedOtp || cachedOtp !== otp) {
      return NextResponse.json(
        { error: "Galat ya expired OTP token hai! Naya bhejkar check karein." },
        { status: 400 }
      );
    }

    // Status authorized layout verified code
    return NextResponse.json({ 
      success: true, 
      message: "OTP Verification Success! Ab apna password banayein." 
    });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}