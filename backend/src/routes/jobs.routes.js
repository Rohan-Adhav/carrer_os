import { Router } from "express";
import {
    createJob,
    deleteJob,
    getAllJobs,
    getSingleJob,
    updateJob
} from "../controllers/job.controller.js";

import validateObjectId from "../middlewares/validateObjectId.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const router = Router();

router.use(authMiddleware)

const validateJobId = validateObjectId("jobId");

// GET all jobs
router.get("/",getAllJobs);

// GET single job
router.get("/:jobId", validateJobId, getSingleJob);

// CREATE job
router.post("/",createJob);

// UPDATE job
router.put("/:jobId", validateJobId, updateJob);

// DELETE job
router.delete("/:jobId", validateJobId, deleteJob);

export default router;