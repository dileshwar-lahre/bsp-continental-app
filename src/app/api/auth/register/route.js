import connectDB from "@/lib/db";
import User from "@/model/User";
import nodemailer from "nodemailer";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const conn = await connectDB();
    const db = conn.connection.db;

    const body = await req.json();
    const { action, name, email, otp, password } = body;

    if (!email) {
      return NextResponse.json({ error: "Email address is required." }, { status: 400 });
    }
    const targetEmail = email.toLowerCase().trim();

    // ==========================================
    // ⚡ ACTION 1: INITIALIZE REGISTRATION & DISPATCH SECURE OTP
    // ==========================================
    if (action === "INIT") {
      const existingUser = await User.findOne({ email: targetEmail });
      if (existingUser) {
        return NextResponse.json(
          { error: "This email address is already registered. Please sign in." },
          { status: 400 }
        );
      }

      // Flush existing OTPs for clean state
      await db.collection("otps").deleteMany({ email: targetEmail });

      // Generate 6-digit secure token
      const otpCode = Math.floor(100000 + Math.random() * 900000).toString();

      // Store in database with creation timestamp
      await db.collection("otps").insertOne({
        email: targetEmail,
        code: otpCode,
        createdAt: new Date(),
      });

      // Nodemailer Dispatcher
      const emailUser = process.env.EMAIL_USER;
      const emailPass = process.env.EMAIL_PASS;

      if (!emailUser || !emailPass) {
        return NextResponse.json(
          { error: "SMTP mail service is not configured. Please check environment variables." },
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

      await transporter.sendMail({
        from: `"BSP Continental" <${emailUser}>`,
        to: targetEmail,
        subject: "Security Verification Code - BSP Continental",
        html: `
          <div style="font-family: Arial, sans-serif; padding: 25px; border: 1px solid #e2e8f0; border-radius: 16px; max-width: 420px; margin: auto; background-color: #ffffff;">
            <h2 style="color: #387515; text-align: center; letter-spacing: 1px; text-transform: uppercase; margin-bottom: 8px;">BSP CONTINENTAL</h2>
            <p style="font-size: 13px; color: #475569; text-align: center; line-height: 1.5;">Hello <strong>${name || "User"}</strong>, your account registration verification code is:</p>
            <div style="background: #f8fafc; padding: 16px; text-align: center; border-radius: 12px; font-size: 28px; font-weight: 800; color: #387515; letter-spacing: 6px; margin: 20px 0; border: 1px dashed #387515;">
              ${otpCode}
            </div>
            <p style="font-size: 11px; color: #94a3b8; text-align: center;">This code is valid for 10 minutes. Please do not share it with anyone.</p>
          </div>
        `,
      });

      return NextResponse.json({ success: true, message: "Verification code sent to your email." });
    }

    // ==========================================
    // ⚡ ACTION 2: VERIFY OTP CODE
    // ==========================================
    if (action === "VERIFY") {
      const otpRecord = await db.collection("otps").findOne({ email: targetEmail });

      if (!otpRecord || otpRecord.code !== otp?.trim()) {
        return NextResponse.json({ error: "Invalid or expired verification code." }, { status: 400 });
      }

      // Check 10-Minute Expiry Window (600,000 ms)
      const timeElapsed = new Date() - new Date(otpRecord.createdAt);
      if (timeElapsed > 600000) {
        await db.collection("otps").deleteOne({ email: targetEmail });
        return NextResponse.json({ error: "Verification code has expired. Please request a new one." }, { status: 400 });
      }

      return NextResponse.json({ success: true, message: "Verification code confirmed." });
    }

    // ==========================================
    // ⚡ ACTION 3: COMMIT REGISTRATION
    // ==========================================
    if (action === "FINAL") {
      const otpRecord = await db.collection("otps").findOne({ email: targetEmail });

      if (!otpRecord || otpRecord.code !== otp?.trim()) {
        return NextResponse.json(
          { error: "Security session expired. Please restart the registration process." },
          { status: 400 }
        );
      }

      const existingUser = await User.findOne({ email: targetEmail });
      if (existingUser) {
        return NextResponse.json(
          { error: "This email address is already registered. Please sign in." },
          { status: 400 }
        );
      }

      const hashedPassword = await bcrypt.hash(password, 12);

      const newUser = await User.create({
        name,
        email: targetEmail,
        password: hashedPassword,
        role: "user",
        hasReceivedTermsPdf: false,
      });

      // Clear OTP record after successful registration
      await db.collection("otps").deleteMany({ email: targetEmail });

      return NextResponse.json({
        success: true,
        message: "Registration successful. You can now log in.",
        userId: newUser._id,
      });
    }

    return NextResponse.json({ error: "Invalid registration action requested." }, { status: 400 });
  } catch (err) {
    console.error("❌ Registration API Error:", err);
    return NextResponse.json({ error: err.message || "Internal server error occurred." }, { status: 500 });
  }
}