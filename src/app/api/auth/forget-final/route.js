import connectDB from "@/lib/db";
import User from "@/model/User";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

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
    const { phone, otp, password } = await req.json();

    if (!phone) {
      return NextResponse.json({ error: "Mobile number is required." }, { status: 400 });
    }

    const targetPhone = normalizePhoneNumber(phone);

    // 1. Verify Active Cache Parameter
    const cachedOtp = global.forgetCache ? global.forgetCache[targetPhone] : null;
    if (!cachedOtp || cachedOtp !== otp?.trim()) {
      return NextResponse.json({ error: "Invalid or expired reset verification code!" }, { status: 400 });
    }

    if (!password || password.length < 6) {
      return NextResponse.json({ error: "Password must be at least 6 characters long." }, { status: 400 });
    }

    // 2. Encrypt and Hash new password
    const hashedPassword = await bcrypt.hash(password, 12);

    // 3. Save into Database User Repository
    const updatedUser = await User.findOneAndUpdate(
      { phone: targetPhone }, 
      { password: hashedPassword }
    );

    if (!updatedUser) {
      return NextResponse.json({ error: "User account not found." }, { status: 404 });
    }

    // Flush cache stack allocation immediately
    if (global.forgetCache) {
      delete global.forgetCache[targetPhone];
    }

    return NextResponse.json({ success: true, message: "Password updated successfully!" });
  } catch (err) {
    console.error("❌ Password reset final error:", err);
    return NextResponse.json({ error: err.message || "Internal server error occurred." }, { status: 500 });
  }
}