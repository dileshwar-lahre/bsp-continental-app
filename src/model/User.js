import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true, lowercase: true, trim: true },
    password: { type: String, required: false },
    phone: { type: String, default: "" },
    image: { type: String, default: "" },
    role: { type: String, default: "user" }
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model("User", UserSchema);