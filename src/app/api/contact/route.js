import { NextResponse } from "next/server";
import mongoose from "mongoose";
import nodemailer from "nodemailer";

// 1. Inline Mongoose Contact Schema (No extra file needed)
const ContactSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    service: { type: String, required: true },
    message: { type: String, required: true },
  },
  { timestamps: true }
);

const Contact = mongoose.models.Contact || mongoose.model("Contact", ContactSchema);

// 2. Gmail Transporter Setup
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER || "bspcontinental01@gmail.com",
    pass: process.env.EMAIL_PASS || "ivxndxtxbvcamckd",
  },
});

// 3. Main POST Method
export async function POST(req) {
  try {
    const body = await req.json();
    const { name, phone, email, service, message } = body;

    if (!name || !phone || !email || !message) {
      return NextResponse.json(
        { error: "Sabhi compulsory fields bharein." },
        { status: 400 }
      );
    }

    let savedToDb = false;

    // Try Saving to MongoDB Database
    try {
      if (mongoose.connection.readyState !== 1 && process.env.MONGODB_URI) {
        await mongoose.connect(process.env.MONGODB_URI);
      }

      if (mongoose.connection.readyState === 1) {
        await Contact.create({ name, phone, email, service, message });
        savedToDb = true;
        console.log("🟢 Contact Inquiry successfully saved to MongoDB!");
      }
    } catch (dbError) {
      console.error("⚠️ MongoDB Save Failed! Falling back to Email...", dbError.message);
    }

    // Fallback: Send Direct Email if Database Failed or Unreachable
    if (!savedToDb) {
      const mailOptions = {
        from: process.env.EMAIL_USER || "bspcontinental01@gmail.com",
        to: "bspcontinental01@gmail.com",
        subject: `🚨 New Contact Inquiry: ${name} (${service})`,
        html: `
          <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
            <h2 style="color: #000;">BSP Continental - New Inquiry Received</h2>
            <p><strong>Full Name:</strong> ${name}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Selected Service:</strong> ${service}</p>
            <p><strong>Message:</strong> ${message}</p>
            <hr />
            <p style="font-size: 11px; color: #777;">Sent automatically via BSP Continental Contact Form (Fallback Email)</p>
          </div>
        `,
      };

      await transporter.sendMail(mailOptions);
      console.log("📧 Fallback Email sent successfully to bspcontinental01@gmail.com!");
    }

    return NextResponse.json(
      { success: true, message: "Inquiry received successfully!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("❌ Contact Submission Error:", error);
    return NextResponse.json(
      { error: "Failed to submit inquiry. Please try again." },
      { status: 500 }
    );
  }
}