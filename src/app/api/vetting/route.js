import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Request from "@/model/Request";

export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();

    const { ownerName, propertyLocation, customMessage, documentsList } = body;

    // Database me save karo
    const newVettingRequest = await Request.create({
      userName: ownerName || "Anonymous Property Owner",
      userEmail: "user@cginfrax.com", // Default or session email
      serviceType: "Property Vetting",
      details: {
        ownerName: ownerName || "",
        propertyLocation: propertyLocation || "",
        customMessage: customMessage || "",
      },
      documentsList: documentsList || [],
      status: "Pending",
    });

    return NextResponse.json(
      {
        success: true,
        message: "Property vetting request saved successfully in database!",
        data: newVettingRequest,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Vetting API Error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to save record" },
      { status: 500 }
    );
  }
}