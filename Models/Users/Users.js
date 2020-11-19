import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, default: false },
  isCustomer: { type: Boolean, default: true },
});

export const userModel = mongoose.model("userModel", userSchema);
