import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    unique: true,
  },
  mobile_no: {
    type: String,
    unique: true,
  },
  profile_picture: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    select: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const user = mongoose.model("users", userSchema);
