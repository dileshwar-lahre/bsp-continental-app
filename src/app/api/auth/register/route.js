import connectDB from "@/lib/db";
import User from "@/model/User";
import nodemailer from "nodemailer";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req) {
  console.log("====== 🔒 DATABASE OTP REGISTER PIPELINE START ======");
  try {
    await connectDB();
    const body = await req.json();
    const { action, name, email, otp, password } = body;

    if (!email) {
      return NextResponse.json({ error: "Email parameter tracking is required!" }, { status: 400 });
    }
    const targetEmail = email.toLowerCase().trim();

    // ==========================================
    // ⚡ ACTION A: INITIALIZE REGISTER & GENERATE DATABASE OTP
    // ==========================================
    if (action === "INIT") {
      // 1. Existing check logic
      const existingUser = await User.findOne({ email: targetEmail });
      if (existingUser) {
        return NextResponse.json({ error: "Email pehle se registered hai bc!" }, { status: 400 });
      }

      const db = (await connectDB()).connection.db;

      // 2. OVERWRITE PROTECTION: Delete any old OTP from database instantly if exists
      await db.collection("otps").deleteMany({ email: targetEmail });
      console.log(`🔄 Purana OTP database se flushed for: ${targetEmail}`);

      // 3. Generate secure 6-digit dynamic token
      const otpCode = Math.floor(100000 + Math.random() * 900000).toString();

      // 4. Save dynamic token token inside MongoDB database
      await db.collection("otps").insertOne({
        email: targetEmail,
        code: otpCode,
        createdAt: new Date() // Binds creation timestamp structure
      });
      console.log(`💾 Fresh OTP saved in database ledger for ${targetEmail}`);

      // 5. Nodemailer engine trigger
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      await transporter.sendMail({
        from: `"BSP Continental" <${process.env.EMAIL_USER}>`,
        to: targetEmail,
        subject: "🔒 Account Verification Code",
        html: `
          <div style="font-family: sans-serif; padding: 25px; border: 1px solid #eee; border-radius: 15px; max-width: 400px; margin: auto;">
            <h2 style="color: black; text-align: center; letter-spacing: 1px; text-transform: uppercase; font-weight: 900;">BSP CONTINENTAL</h2>
            <p style="font-size: 14px; color: #444; text-align: center;">Hello <b>${name || "User"}</b>, your standard access verification code is:</p>
            <div style="background: #F3F4F6; padding: 15px; text-align: center; border-radius: 10px; font-size: 26px; font-weight: bold; color: #FF9900; letter-spacing: 5px; margin: 20px 0; border: 1px solid #FF9900;">
              ${otpCode}
            </div>
            <p style="font-size: 11px; color: #999; text-align: center;">Note: This secure token is valid for exactly 10 minutes.</p>
          </div>
        `,
      });

      return NextResponse.json({ success: true, message: "Fresh OTP sent via BSP Continental!" });
    }

    // ==========================================
    // ⚡ ACTION B: VERIFY DATABASE OTP
    // ==========================================
    if (action === "VERIFY") {
      const db = (await connectDB()).connection.db;
      
      // Look up OTP inside database collection
      const otpRecord = await db.collection("otps").findOne({ email: targetEmail });
      
      if (!otpRecord || otpRecord.code !== otp) {
        return NextResponse.json({ error: "Invalid or expired OTP token code! bc" }, { status: 400 });
      }

      // Check 10-Minute Lifespan Limit (600,000 milliseconds)
      const timeElapsed = new Date() - new Date(otpRecord.createdAt);
      if (timeElapsed > 600000) {
        await db.collection("otps").deleteOne({ email: targetEmail });
        return NextResponse.json({ error: "OTP limit expired! Fresh request required bc." }, { status: 400 });
      }

      return NextResponse.json({ success: true, message: "OTP Verification Passed." });
    }

    // ==========================================
    // ⚡ ACTION C: COMMIT ACCOUNT FINAL INGESTION
    // ==========================================
    if (action === "FINAL") {
      const db = (await connectDB()).connection.db;
      const otpRecord = await db.collection("otps").findOne({ email: targetEmail });
      
      if (!otpRecord || otpRecord.code !== otp) {
        return NextResponse.json({ error: "Security lifecycle broken, restart register bc!" }, { status: 400 });
      }

      const hashedPassword = await bcrypt.hash(password, 12);

      const newUser = await User.create({
        name,
        email: targetEmail,
        password: hashedPassword,
        role: "user"
      });

      // Clear the OTP from MongoDB collection completely after success
      await db.collection("otps").deleteMany({ email: targetEmail });
      console.log(`🗑️ Database OTP storage cleaned permanently for: ${targetEmail}`);

      return NextResponse.json({ 
        success: true, 
        message: "Registration successful! Profile database synchronized.",
        userId: newUser._id 
      });
    }

    return NextResponse.json({ error: "Invalid action routing query matrix" }, { status: 400 });

  } catch (err) {
    console.error("💥 CLUSTER PROCESSING CRASH:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}