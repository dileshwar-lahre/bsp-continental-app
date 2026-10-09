import connectDB from "@/lib/db";
import User from "@/model/User";
import { NextResponse } from "next/server";

global.forgetCache = global.forgetCache || {};

// Helper function to normalize mobile number to 10 digits
function normalizePhoneNumber(rawPhone) {
  if (!rawPhone) return "";
  let digits = rawPhone.replace(/\D/g, "");
  if (digits.length === 12 && digits.startsWith("91")) {
    digits = digits.slice(2);
  } else if (digits.length === 11 && digits.startsWith("0")) {
    digits = digits.slice(1);
  }
  return digits.slice(-10);
}

export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();
    const { phone } = body;

    if (!phone) {
      return NextResponse.json(
        { error: "Mobile number is required." },
        { status: 400 }
      );
    }

    const targetPhone = normalizePhoneNumber(phone);
    if (targetPhone.length !== 10) {
      return NextResponse.json(
        { error: "Please enter a valid 10-digit mobile number." },
        { status: 400 }
      );
    }

    // 1. Check user existence by phone
    const user = await User.findOne({ phone: targetPhone });
    if (!user) {
      return NextResponse.json(
        { error: "No account found associated with this mobile number. Please sign up first." },
        { status: 404 }
      );
    }

    if (!user.password) {
      return NextResponse.json(
        { error: "This account was registered using Google Authentication. Password reset is not supported." },
        { status: 400 }
      );
    }

    // 2. Generate 6-digit token and store in cache
    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
    global.forgetCache[targetPhone] = otpCode;

    // ⏳ 10-Minute Expiration Cleanup (600,000 ms)
    setTimeout(() => {
      if (global.forgetCache[targetPhone] === otpCode) {
        delete global.forgetCache[targetPhone];
        console.log(`🗑️ Password reset token expired for: ${targetPhone}`);
      }
    }, 600000);

    // 3. Secure Environment Variable Check for WhatsApp Gateway
    const apiToken = process.env.RESILIO_API_TOKEN;
    if (!apiToken) {
      console.error("❌ RESILIO_API_TOKEN is missing in environment variables.");
      return NextResponse.json(
        { error: "Server configuration error: WhatsApp gateway token is missing." },
        { status: 500 }
      );
    }

    // 4. Dispatch WhatsApp OTP using Resiliohub API
    const response = await fetch('https://resiliohub.com/api/v1/send_templet', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        sendTo: `91${targetPhone}`,
        templetName: 'auth',
        exampleArr: [otpCode],
      }),
    });

    const resData = await response.json();

    if (!response.ok) {
      console.error("Resiliohub API Error Response:", resData);
      return NextResponse.json({ error: "Failed to dispatch WhatsApp OTP. Please check the mobile number format." }, { status: 400 });
    }

    return NextResponse.json({
      success: true,
      message: "Password reset verification code has been dispatched to your WhatsApp number.",
    });
  } catch (err) {
    console.error("❌ Password reset init error:", err);
    return NextResponse.json(
      { error: err.message || "An unexpected error occurred during password reset processing." },
      { status: 500 }
    );
  }
}