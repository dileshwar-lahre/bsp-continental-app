import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Request from "@/model/Request";

export async function GET(req) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");

    let filter = {};
    if (email && email !== "null" && email !== "undefined") {
      filter.userEmail = email;
    }

    const requests = await Request.find(filter).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: requests });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();

    const { userName, userEmail, userPhone, serviceType, details, documentsList, status } = body;

    const newRequest = await Request.create({
      userName: userName || "Anonymous User",
      userEmail: userEmail || "user@cginfrax.com",
      userPhone: userPhone || "",
      serviceType: serviceType || "Property Vetting",
      details: details || {},
      documentsList: documentsList || [],
      status: status || "Pending",
    });

    return NextResponse.json(
      { success: true, message: "Request saved in database!", data: newRequest },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

// 🌟 UPDATE: Admin Status, Message & Document Attachment
export async function PATCH(req) {
  try {
    await connectDB();
    const body = await req.json();
    const { requestId, status, adminMessage, adminDocument } = body;

    if (!requestId) {
      return NextResponse.json(
        { success: false, message: "requestId is required for update." },
        { status: 400 }
      );
    }

    const updateFields = { status };

    if (adminMessage !== undefined || adminDocument !== undefined) {
      updateFields.adminReply = {
        message: adminMessage || "",
        document: adminDocument || { name: "", url: "" },
        updatedAt: new Date(),
      };
    }

    const updatedRequest = await Request.findByIdAndUpdate(
      requestId,
      updateFields,
      { new: true }
    );

    return NextResponse.json({
      success: true,
      message: "Client status and reply updated successfully!",
      data: updatedRequest,
    });
  } catch (error) {
    console.error("Central API PATCH Error:", error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}