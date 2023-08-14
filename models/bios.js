import mongoose from "mongoose";

const certSchema = new mongoose.Schema({
  topic: String,
  from: String,
});
const expSchema = new mongoose.Schema({
  type: String,
  from: String,
  to: String,
  years: String,
  company: String,
});
const eduSchema = new mongoose.Schema({
  clg_name: String,
  degree: String,
  from: String,
  to: String,
  desc: String,
});

const bioSchema = new mongoose.Schema({
  userId: {
    type: String,
    unique: true,
  },
  about: String,
  skills: [String],
  prof_details: String,
  certifications: [certSchema],
  experience: [expSchema],
  education: eduSchema,
});

export const bio = mongoose.model("bios", bioSchema);
