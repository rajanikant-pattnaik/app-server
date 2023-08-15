import express from "express";
import { isAuthentcated } from "../middlewareAuth.js";
import { addAndEdit, getBio } from "../controllers/bios.js";

const router = express.Router();

router.post("/add&edit", isAuthentcated, addAndEdit);
router.get("/myBio", isAuthentcated, getBio);
export default router;
