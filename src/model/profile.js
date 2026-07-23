import mongoose from "mongoose";

const ProfileSchema = new mongoose.Schema(
  {
    email: { type: String, unique: true, required: true, lowercase: true, trim: true },
    phone: { type: String, default: "" },
    panCard: { type: String, default: "" },
    identificationNo: { type: String, default: "" } // Safely binds official validation identities
  },
  { timestamps: true }
);

export default mongoose.models.Profile || mongoose.model("Profile", ProfileSchema);