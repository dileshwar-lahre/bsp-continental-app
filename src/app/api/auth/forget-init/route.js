import connectDB from "@/lib/db";
import User from "@/model/User";
import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

global.forgetCache = global.forgetCache || {};

export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();
    const { email } = body;

    if (!email) {
      return NextResponse.json(
        { error: "Email address is required." },
        { status: 400 }
      );
    }

    const targetEmail = email.toLowerCase().trim();

    // 1. Check user existence
    const user = await User.findOne({ email: targetEmail });
    if (!user) {
      return NextResponse.json(
        { error: "No account found associated with this email address." },
        { status: 404 }
      );
    }

    if (!user.password) {
      return NextResponse.json(
        { error: "This account was registered using Google Authentication. Password reset is not supported." },
        { status: 400 }
      );
    }

    // 2. Generate and store dynamic 6-digit token
    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
    global.forgetCache[targetEmail] = otpCode;

    // ⏳ 10-Minute Expiration Cleanup (600,000 ms)
    setTimeout(() => {
      if (global.forgetCache[targetEmail] === otpCode) {
        delete global.forgetCache[targetEmail];
        console.log(`🗑️ Password reset token expired for: ${targetEmail}`);
      }
    }, 600000);

    // 3. SMTP Transporter Configuration
    const emailUser = process.env.EMAIL_USER;
    const emailPass = process.env.EMAIL_PASS;

    if (!emailUser || !emailPass) {
      return NextResponse.json(
        { error: "SMTP mail service is not configured. Please verify environment variables." },
        { status: 500 }
      );
    }

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: emailUser,
        pass: emailPass,
      },
    });

    // 4. Dispatch Password Reset Token Email
    await transporter.sendMail({
      from: `"BSP Continental" <${emailUser}>`,
      to: targetEmail,
      subject: "Password Reset Security Code - BSP Continental",
      html: `
        <div style="font-family: Arial, sans-serif; padding: 25px; border: 1px solid #e2e8f0; border-radius: 16px; max-width: 420px; margin: auto; background-color: #ffffff;">
          <h2 style="color: #387515; text-align: center; letter-spacing: 1px; text-transform: uppercase; margin-bottom: 8px;">BSP CONTINENTAL</h2>
          <p style="font-size: 13px; color: #475569; text-align: center; line-height: 1.5;">We received a request to reset your password. Use the verification code below to proceed:</p>
          <div style="background: #f8fafc; padding: 16px; text-align: center; border-radius: 12px; font-size: 28px; font-weight: 800; color: #387515; letter-spacing: 6px; margin: 20px 0; border: 1px dashed #387515;">
            ${otpCode}
          </div>
          <p style="font-size: 11px; color: #94a3b8; text-align: center;">This code is valid for 10 minutes. If you did not request this, please disregard this email.</p>
        </div>
      `,
    });

    return NextResponse.json({
      success: true,
      message: "Password reset verification code has been dispatched to your email address.",
    });
  } catch (err) {
    console.error("❌ Password reset error:", err);
    return NextResponse.json(
      { error: err.message || "An unexpected error occurred during password reset processing." },
      { status: 500 }
    );
  }
}