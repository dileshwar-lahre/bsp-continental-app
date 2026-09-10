import { NextResponse } from "next/server";
import mongoose from "mongoose";

// Schema aur Model yahin define kiya gaya hai (Koi external import nahi chahiye)
const InquirySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    service: { type: String, required: true, trim: true },
    amount: { type: Number, required: true },
    message: { type: String, required: true, maxlength: 100, trim: true },
    paymentStatus: { type: String, default: "Pending" },
  },
  { timestamps: true }
);

const Inquiry = mongoose.models.Inquiry || mongoose.model("Inquiry", InquirySchema);

async function connectDB() {
  if (mongoose.connection.readyState >= 1) return;
  if (!process.env.MONGODB_URI) {
    throw new Error("MONGODB_URI missing hai .env file me");
  }
  await mongoose.connect(process.env.MONGODB_URI);
}

export async function POST(req) {
  try {
    const { name, phone, email, service, amount, message } = await req.json();

    if (!name || !phone || !email || !message) {
      return NextResponse.json(
        { success: false, error: "Sabhi fields bharna zaroori hai." },
        { status: 400 }
      );
    }

    if (message.length > 100) {
      return NextResponse.json(
        { success: false, error: "Message 100 characters se kam rakhein." },
        { status: 400 }
      );
    }

    await connectDB();

    const inquiry = await Inquiry.create({
      name,
      phone,
      email,
      service,
      amount: Number(amount) || 1599,
      message,
      paymentStatus: "Pending",
    });

    return NextResponse.json(
      { success: true, inquiryId: inquiry._id },
      { status: 201 }
    );
  } catch (error) {
    console.error("Inquiry Error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to process inquiry." },
      { status: 500 }
    );
  }
}