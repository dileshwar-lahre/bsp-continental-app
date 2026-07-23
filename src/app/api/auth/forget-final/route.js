import connectDB from "@/lib/db";
import User from "@/model/User";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectDB();
    const { email, otp, password } = await req.json();
    const targetEmail = email.toLowerCase();

    // 1. Verify Active Cache Parameter
    const cachedOtp = global.forgetCache ? global.forgetCache[targetEmail] : null;
    if (!cachedOtp || cachedOtp !== otp) {
      return NextResponse.json({ error: "Galat ya expired reset OTP token!" }, { status: 400 });
    }

    // 2. Encrypt and Hash new entry string
    const hashedPassword = await bcrypt.hash(password, 12);

    // 3. Save into Database User Repository
    await User.findOneAndUpdate({ email: targetEmail }, { password: hashedPassword });

    // Flush cache stack allocation immediately
    delete global.forgetCache[targetEmail];

    return NextResponse.json({ success: true, message: "Password updated successfully!" });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}