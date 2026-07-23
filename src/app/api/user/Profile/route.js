import connectDB from "../../lib/db"; // ⚡ Relative Path mapping
import Profile from "../../../model/Profile"; // ⚡ Direct relative resolve
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route"; // ⚡ Direct reference linkage
import { NextResponse } from "next/server";

// 📋 GET: Session Cookie read karke accurate client matching profile fetch karna
export async function GET(req) {
  try {
    await connectDB();
    const session = await getServerSession(authOptions);

    if (!session || !session.user?.email) {
      return NextResponse.json({ error: "Session verification dropped! Login required bc." }, { status: 401 });
    }

    const currentEmail = session.user.email.toLowerCase().trim();

    // Query exclusively maps to the unique isolation profile bucket
    const profile = await Profile.findOne({ email: currentEmail });
    
    return NextResponse.json({ 
      success: true, 
      user: {
        phone: profile?.phone || "",
        panCard: profile?.panCard || "",
        identificationNo: profile?.identificationNo || ""
      }
    });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// 💾 PUT: Atomic update or insert strategy for profile data isolation logs
export async function PUT(req) {
  try {
    await connectDB();
    const session = await getServerSession(authOptions);

    if (!session || !session.user?.email) {
      return NextResponse.json({ error: "Operation blocked. Session token expired bc!" }, { status: 401 });
    }

    const currentEmail = session.user.email.toLowerCase().trim();
    const body = await req.json();
    const { phone, panCard, identificationNo } = body;

    // upsert parameter auto-spawns document block if records don't exist yet
    await Profile.findOneAndUpdate(
      { email: currentEmail },
      { 
        $set: { 
          phone: phone ? phone.trim() : "",
          panCard: panCard ? panCard.trim().toUpperCase() : "",
          identificationNo: identificationNo ? identificationNo.trim() : ""
        } 
      },
      { new: true, upsert: true, runValidators: true }
    );

    console.log(`💾 Cookie identity synchronized and committed successfully for: ${currentEmail}`);
    return NextResponse.json({ success: true, message: "Profile parameters securely synchronized!" });

  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}