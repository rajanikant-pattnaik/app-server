import { bio } from "../models/bios.js";

export const addAndEdit = async (req, res) => {
  const { about, skills, prof_details, certifications, experience, education } =
    req.body;
  const userId = req.currUser._id;
  const data = await bio.findOne({ userId });
  if (!data) {
    const updatedBio = await bio.create({
      userId,
      about,
      skills,
      prof_details,
      certifications,
      experience,
      education,
    });
    return res.status(200).json({
      sucess: true,
      message: "data is added",
      updatedBio,
    });
  }
  data.userId = userId;
  data.about = about;
  data.skills = skills;
  data.prof_details = prof_details;
  data.certifications = certifications;
  data.experience = experience;
  data.education = education;
  await data.save();
  return res.status(200).json({
    sucess: true,
    message: "data is updated",
    data,
  });
};

export const getBio = async (req, res) => {
  const userId = req.currUser._id;
  const data = await bio.findOne({ userId });
  if (!data) {
    return res.status(500).json({
      success: false,
      message: "Bio is not present",
    });
  }
  res.status(200).json({
    success: true,
    message: "Bio is retrieved",
    data,
  });
};
