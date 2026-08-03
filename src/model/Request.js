import mongoose from "mongoose";

const RequestSchema = new mongoose.Schema(
  {
    userName: { type: String, required: true },
    userEmail: { type: String, required: true, index: true },
    userPhone: { type: String, default: "" },

    serviceType: {
      type: String,
      required: true,
      enum: ["Property Vetting", "Loan Rejection Solution", "CIBIL Audit", "Custom Legal"],
    },

    // User Form Details
    details: {
      ownerName: { type: String },
      propertyLocation: { type: String },
      bankName: { type: String },
      loanAmount: { type: Number },
      monthlyIncome: { type: Number },
      rejectionReason: { type: String },
      customMessage: { type: String },
      
      // 🌟 CIBIL Audit Specific Fields
      panNumber: { type: String },
      dateOfBirth: { type: String },
    },

    // Client Uploaded Documents (Aadhaar Front/Back, PAN, Property, Loan Papers)
    documentsList: [
      {
        name: { type: String },
        url: { type: String },
        size: { type: String },
        docType: { type: String, default: "General" }, // 'Aadhaar Front', 'Aadhaar Back', 'PAN Card', etc.
      },
    ],

    // Approval Status Engine
    status: {
      type: String,
      enum: ["Pending", "In Review", "Approved", "Rejected"],
      default: "Pending",
    },

    // Admin Reply Message & Attached Verified File
    adminReply: {
      message: { type: String, default: "" },
      document: {
        name: { type: String, default: "" },
        url: { type: String, default: "" },
      },
      updatedAt: { type: Date },
    },
  },
  { timestamps: true }
);

export default mongoose.models.Request || mongoose.model("Request", RequestSchema);