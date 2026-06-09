import { Router } from "express";
import { getHealth,getHome } from "../controllers/health.controller.js";
const router = Router();

router.get("/",getHome);

router.get("/health",getHealth)

export default router;