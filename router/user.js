import express from "express";
import {
  deleteUser,
  getAllUsers,
  getUserDetails,
  login,
  logout,
  register,
} from "../controllers/users.js";
import { isAuthentcated } from "../middlewareAuth.js";

const router = express.Router();

router.post("/login", login);
router.post("/register", register);
router.get("/getAllUser", isAuthentcated, getAllUsers);
router.get("/userDetails", isAuthentcated, getUserDetails);
router.get("/logout", isAuthentcated, logout);
router.get("/delete", deleteUser);

export default router;
