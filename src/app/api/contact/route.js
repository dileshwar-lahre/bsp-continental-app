import { NextResponse } from "next/server";
import mongoose from "mongoose";

// In-file Schema definition
const ContactSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    service: { type: String, required: true, trim: true },
    city: { type: String, required: true, trim: true },
    preferredContact: { type: String, default: "call" },
    message: { type: String, default: "", trim: true },
    status: { type: String, default: "New" },
  },
  { timestamps: true }
);

const Contact = mongoose.models.Contact || mongoose.model("Contact", ContactSchema);

async function connectDB() {
  if (mongoose.connection.readyState >= 1) return;
  if (!process.env.MONGODB_URI) {
    throw new Error("MONGODB_URI is not defined in environment variables.");
  }
  await mongoose.connect(process.env.MONGODB_URI);
}

export async function POST(req) {
  try {
    const body = await req.json();
    const { fullName, mobileNumber, serviceRequired, cityDistrict, preferredContact, message } = body;

    // Field validations
    if (!fullName || !mobileNumber || !serviceRequired || !cityDistrict) {
      return NextResponse.json(
        { success: false, error: "Please fill all required fields." },
        { status: 400 }
      );
    }

    await connectDB();

    const newContact = await Contact.create({
      name: fullName.trim(),
      phone: mobileNumber.trim(),
      service: serviceRequired.trim(),
      city: cityDistrict.trim(),
      preferredContact: preferredContact || "call",
      message: message ? message.trim() : "",
    });

    return NextResponse.json(
      { success: true, message: "Contact request submitted successfully.", contactId: newContact._id },
      { status: 201 }
    );
  } catch (error) {
    console.error("Contact API Error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}