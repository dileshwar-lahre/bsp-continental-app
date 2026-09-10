import { NextResponse } from "next/server";
import mongoose from "mongoose";

// In-file schemas (No module not found error)
const InquirySchema = new mongoose.Schema(
  {
    name: String,
    phone: String,
    email: String,
    service: String,
    amount: Number,
    message: String,
    paymentStatus: String,
  },
  { timestamps: true }
);

const ContactSchema = new mongoose.Schema(
  {
    name: String,
    phone: String,
    service: String,
    city: String,
    preferredContact: String,
    message: String,
  },
  { timestamps: true }
);

const Inquiry = mongoose.models.Inquiry || mongoose.model("Inquiry", InquirySchema);
const Contact = mongoose.models.Contact || mongoose.model("Contact", ContactSchema);

async function connectDB() {
  if (mongoose.connection.readyState >= 1) return;
  if (!process.env.MONGODB_URI) {
    throw new Error("MONGODB_URI missing hai .env file me");
  }
  await mongoose.connect(process.env.MONGODB_URI);
}

export async function GET() {
  try {
    await connectDB();

    const [inquiries, contacts] = await Promise.all([
      Inquiry.find({}).sort({ createdAt: -1 }),
      Contact.find({}).sort({ createdAt: -1 }),
    ]);

    return NextResponse.json(
      {
        success: true,
        inquiries,
        contacts,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Admin leads error:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}