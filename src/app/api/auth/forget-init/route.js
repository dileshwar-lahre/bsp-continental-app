import connectDB from "@/lib/db";
import User from "@/model/User";
import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

global.forgetCache = global.forgetCache || {};

// Strict named method bindings for Next.js App Router
export async function POST(req) {
  try {
    await connectDB();
    const { email } = await req.json();
    const targetEmail = email.toLowerCase();

    // 1. Check user existence
    const user = await User.findOne({ email: targetEmail });
    if (!user) {
      return NextResponse.json({ error: "Is email se koi account nahi mila!" }, { status: 404 });
    }
    if (!user.password) {
      return NextResponse.json({ error: "Aapne Google Auth use kiya tha. Password reset nahi ho sakta." }, { status: 400 });
    }

    // 2. Generate and store fresh token
    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
    global.forgetCache[targetEmail] = otpCode;

    // ⏳ 10 Minute Expiry Cleanup
    setTimeout(() => {
      if (global.forgetCache[targetEmail] === otpCode) {
        delete global.forgetCache[targetEmail];
        console.log(`🗑️ Forget OTP Expired for: ${targetEmail}`);
      }
    }, 600000);

    // 3. Nodemailer Mail Node setup
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // 4. Fire Brand Email via BSP Continental
    await transporter.sendMail({
      from: `"BSP Continental" <${process.env.EMAIL_USER}>`,
      to: targetEmail,
      subject: "🔒 Password Reset Security Token",
      html: `
        <div style="font-family: sans-serif; padding: 25px; border: 1px solid #eee; border-radius: 15px; max-width: 400px; margin: auto;">
          <h2 style="color: black; text-align: center; letter-spacing: 1px; text-transform: uppercase; font-weight: 900;">BSP CONTINENTAL</h2>
          <p style="font-size: 14px; color: #444; text-align: center;">Aapke password reset request ke liye secure OTP code ye hai:</p>
          <div style="background: #F3F4F6; padding: 15px; text-align: center; border-radius: 10px; font-size: 26px; font-weight: bold; color: #FF9900; letter-spacing: 5px; margin: 20px 0; border: 1px solid #FF9900;">
            ${otpCode}
          </div>
          <p style="font-size: 11px; color: #999; text-align: center;">Note: This code is confidential and will expire in 10 minutes.</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true, message: "Reset OTP sent successfully!" });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}