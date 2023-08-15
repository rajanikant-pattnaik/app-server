import { user } from "../models/user.js";
import bcrypt from "bcrypt";
import { sendCookie } from "../utils/features.js";

export const register = async (req, res) => {
  try {
    const { name, email, mobile_no, profile_picture, password } = req.body;
    const userWithEmail = await user.findOne({ email });
    const userWithMobile = await user.findOne({ mobile_no });
    if (!userWithEmail && !userWithMobile) {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await user.create({
        name,
        email,
        mobile_no,
        profile_picture,
        password: hashedPassword,
      });
      sendCookie(newUser, res, "User registered successfully", 201);
    } else {
      return res.status(505).json({
        success: false,
        message: "Mobile no or email is already in use.",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "error occurs",
      error,
    });
  }
};
export const login = async (req, res) => {
  try {
    const { cred, password } = req.body;
    const withMail = await user.findOne({ email: cred }).select("+password");
    const withMobile = await user
      .findOne({ mobile_no: cred })
      .select("+password");
    let isMatched = false;
    if (withMail) {
      isMatched = await bcrypt.compare(password, withMail.password);
    }
    if (withMobile) {
      isMatched = await bcrypt.compare(password, withMobile.password);
    }
    if (!withMail && !withMobile) {
      return res.status(500).json({
        success: false,
        message: "Invalid credentials",
      });
    }
    if (!isMatched) {
      return res.status(500).json({
        success: false,
        message: "Password doesnt match",
      });
    }
    if (withMail !== null) {
      sendCookie(withMail, res, "User login successfully with email", 201);
    }
    if (withMobile != null) {
      sendCookie(withMobile, res, "User login successfully with mobile", 201);
    }
  } catch (error) {
    console.log(error);
    res.status(404).json({
      success: false,
      message: "login fails",
      error,
    });
  }
};

export const getAllUsers = async (req, res) => {
  const {arrUser}=req.body;
  const currId=req.currUser._id
  const newArray=[...arrUser,currId];
  const allUser = await user.find({_id:{$nin:newArray}});
  res.status(200).json({
    success: true,
    message: "we have got all users",
    size: allUser.length,
    allUser,
  });
};

export const logout = async (req, res) => {
  res
    .status(201)
    .cookie("token", "", { expires: new Date(Date.now()) })
    .json({
      success: true,
      message: "logout successfully",
    });
};
export const getUserDetails = (req, res) => {
  res.status(200).json({
    success: true,
    user: req.currUser,
  });
};
export const deleteUser = async (req, res) => {
  const { _id } = req.body;
  const getUser = await user.findById(_id);
  await getUser.deleteOne();
  res.status(200).json({
    success: true,
    message: "user deleted successfully",
    getUser,
  });
};
