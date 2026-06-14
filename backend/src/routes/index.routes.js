import { Router } from "express";
import { getHealth,getHome } from "../controllers/health.controller.js";
import authRoutes from "./auth.routes.js"
import profileRoutes from "./profile.routes.js"
const router = Router();

router.get("/",getHome);

router.get("/health",getHealth)
router.use("/auth",authRoutes)
router.use("/profile",profileRoutes)

export default router;