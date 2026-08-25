import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import User from "@/model/User";
import nodemailer from "nodemailer";
import path from "path";
import fs from "fs";

export async function POST(req) {
  try {
    const { email, name = "Valued Customer" } = await req.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const emailUser = process.env.EMAIL_USER;
    const emailPass = process.env.EMAIL_PASS;

    if (!emailUser || !emailPass) {
      return NextResponse.json(
        { error: "SMTP environment configuration missing." },
        { status: 500 }
      );
    }

    const cleanEmail = email.toLowerCase().trim();

    await connectDB();

    let user = await User.findOne({ email: cleanEmail });
    if (user && user.hasReceivedTermsPdf) {
      return NextResponse.json(
        { success: true, message: "User already received terms email previously. Skipped." },
        { status: 200 }
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

    const pdfPath = path.join(process.cwd(), "public", "Offer of Terms.pdf");
    const attachments = [];

    if (fs.existsSync(pdfPath)) {
      attachments.push({
        filename: "Offer_of_Terms_BSP_Continental.pdf",
        path: pdfPath,
      });
    }

    const mailOptions = {
      from: `"BSP CONTINENTAL PVT LTD" <${emailUser}>`,
      to: cleanEmail,
      subject: "Welcome to BSP CONTINENTAL PVT LTD | Terms & Policy Agreement Confirmation",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 25px; border: 1px solid #e2e8f0; border-radius: 16px; background-color: #ffffff;">
          <div style="text-align: center; padding-bottom: 20px; border-bottom: 2px solid #387515;">
            <h1 style="color: #387515; margin: 0; font-size: 22px; text-transform: uppercase;">BSP CONTINENTAL PVT LTD</h1>
            <p style="color: #64748b; font-size: 12px; margin-top: 4px; letter-spacing: 1px;">Secure Finance. Compliant Properties. Sustainable Growth.</p>
          </div>
          
          <div style="padding: 20px 0;">
            <p style="font-size: 15px; color: #1e293b;">Hello <strong>${name}</strong>,</p>
            <p style="font-size: 13px; color: #475569; line-height: 1.6;">
              Your account on the <strong>BSP Continental Pvt. Ltd.</strong> portal has been successfully authenticated.
            </p>
            <p style="font-size: 13px; color: #475569; line-height: 1.6;">
              You have acknowledged and agreed to our <strong>Terms & Conditions</strong> and <strong>Privacy Policy</strong>.
            </p>
            <p style="font-size: 13px; color: #475569; line-height: 1.6;">
              📎 <em>For your records, the official <strong>Offer of Terms</strong> document is attached to this email.</em>
            </p>
          </div>

          <div style="background-color: #f8fafc; padding: 15px; border-radius: 12px; border: 1px solid #e2e8f0; font-size: 12px; color: #64748b;">
            <p style="margin: 0;"><strong>Office Address:</strong> Shop No OAS 4, Super Market Complex, 2nd Floor, Agrasen Chowk, Bilaspur (C.G.) 495001</p>
          </div>

          <div style="text-align: center; margin-top: 25px; font-size: 11px; color: #94a3b8;">
            © ${new Date().getFullYear()} BSP CONTINENTAL PVT LTD. All Rights Reserved.
          </div>
        </div>
      `,
      attachments: attachments,
    };

    await transporter.sendMail(mailOptions);

    if (user) {
      user.hasReceivedTermsPdf = true;
      await user.save();
    } else {
      await User.findOneAndUpdate(
        { email: cleanEmail },
        { hasReceivedTermsPdf: true },
        { upsert: false }
      );
    }

    return NextResponse.json({ success: true, message: "Email sent once successfully" }, { status: 200 });
  } catch (error) {
    console.error("❌ Welcome route error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}