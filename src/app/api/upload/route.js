import { NextResponse } from "next/server";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

export async function POST(req) {
  try {
    // 🔍 Debug Logs to check what Next.js is actually reading
    const bucketName = 
      process.env.AWS_S3_BUCKET_NAME || 
      process.env.AWS_BUCKET_NAME || 
      process.env.S3_BUCKET_NAME || 
      process.env.S3_BUCKET;

    const region = process.env.AWS_REGION || "ap-south-1";

    console.log("-----------------------------------------");
    console.log("👉 AWS BUCKET LOADED:", bucketName);
    console.log("👉 AWS REGION LOADED:", region);
    console.log("-----------------------------------------");

    if (!bucketName) {
      return NextResponse.json(
        { 
          success: false, 
          error: "AWS S3 Bucket Name is UNDEFINED. Please check key name in .env.local" 
        },
        { status: 500 }
      );
    }

    const s3Client = new S3Client({
      region: region,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
      },
    });

    const formData = await req.formData();
    
    let files = formData.getAll("files");
    if (!files || files.length === 0) {
      const singleFile = formData.get("file");
      if (singleFile) files = [singleFile];
    }

    if (!files || files.length === 0) {
      return NextResponse.json(
        { success: false, error: "No file provided in form data." },
        { status: 400 }
      );
    }

    const file = files[0];
    const buffer = Buffer.from(await file.arrayBuffer());
    const fileExtension = file.name.split(".").pop();
    const uniqueFileName = `doc_${Date.now()}_${Math.random().toString(36).substring(2, 7)}.${fileExtension}`;

    const uploadParams = {
      Bucket: bucketName.trim(), // Trim extra spaces if any
      Key: `documents/${uniqueFileName}`,
      Body: buffer,
      ContentType: file.type || "application/octet-stream",
    };

    await s3Client.send(new PutObjectCommand(uploadParams));

    const fileUrl = `https://${bucketName.trim()}.s3.${region}.amazonaws.com/documents/${uniqueFileName}`;

    return NextResponse.json({
      success: true,
      name: file.name,
      fileUrl: fileUrl,
      url: fileUrl,
      size: (file.size / (1024 * 1024)).toFixed(2) + " MB"
    }, { status: 200 });

  } catch (error) {
    console.error("💥 AWS S3 Upload Error:", error);
    return NextResponse.json(
      { success: false, error: `AWS S3 Storage Failed: ${error.message}` },
      { status: 500 }
    );
  }
}