import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const body = await req.json();
    const { pan } = body;

    if (!pan) {
      return NextResponse.json({ error: 'PAN Number required hai' }, { status: 400 });
    }

    const cleanPan = pan.trim().toUpperCase();

    // 1. Authenticate & Get Access Token
    const authRes = await fetch('https://api.sandbox.co.in/authenticate', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'x-api-key': process.env.SANDBOX_API_KEY,
        'x-api-secret': process.env.SANDBOX_API_SECRET,
        'x-api-version': '1.0',
      },
      cache: 'no-store',
    });

    const authData = await authRes.json();
    const token = authData.access_token || authData.data?.access_token;

    if (!token) {
      return NextResponse.json({ error: "Auth failed - Credentials check karo" }, { status: 401 });
    }

    // 2. Teeno Standard Sandbox Formats Array
    const payloadsToTry = [
      // Format A: Standard Sandbox Entity Format
      {
        "@entity": "in.co.sandbox.kyc.pan.verify",
        "pan": cleanPan,
        "consent": "y",
        "reason": "For KYC Verification"
      },
      // Format B: Direct KYC Format (Without @entity)
      {
        "pan": cleanPan,
        "consent": "y",
        "reason": "KYC Verification"
      },
      // Format C: Minimal Required Payload
      {
        "pan": cleanPan,
        "consent": "y"
      }
    ];

    let successResponse = null;
    let lastError = null;

    // Loop through formats until one returns non-400
    for (let i = 0; i < payloadsToTry.length; i++) {
      const currentPayload = payloadsToTry[i];
      console.log(`Trying Payload Variant ${i + 1}:`, JSON.stringify(currentPayload));

      const panRes = await fetch('https://api.sandbox.co.in/kyc/pan/verify', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': token,
          'x-api-key': process.env.SANDBOX_API_KEY,
          'x-api-version': '1.0',
        },
        body: JSON.stringify(currentPayload),
        cache: 'no-store',
      });

      const panData = await panRes.json();
      console.log(`Variant ${i + 1} Sandbox Response:`, panData);

      if (panData.code !== 400 && panRes.status !== 400) {
        console.log(`✅ SUCCESS! Variant ${i + 1} worked!`);
        successResponse = panData;
        break;
      } else {
        lastError = panData;
      }
    }

    if (!successResponse) {
      return NextResponse.json({
        error: "Sandbox API rejected all 3 payload formats",
        details: lastError
      }, { status: 400 });
    }

    return NextResponse.json({ success: true, data: successResponse });

  } catch (error) {
    console.error("Route Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}