import { Router } from "express";
import { getProfile,updateProfile } from "../controllers/profile.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";
import ensureProfile from "../middlewares/ensureProfile.middleware.js";

const router = Router()

router.get("/me",authMiddleware,ensureProfile,getProfile)

router.patch("/me",authMiddleware,ensureProfile,updateProfile)

export default router