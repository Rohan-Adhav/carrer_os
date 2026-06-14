import Job from "../models/jobs.model.js";
import apiResponse from "../utils/apiResponse.js";
import AppError from "../utils/AppError.js";
import asyncHandler from "../utils/asyncHandler.js";

const createJob = asyncHandler(async (req, res, next) => {
    let { company, role, salary, location, jobType, notes } = req.body

    company = company?.trim()
    role = role?.trim()

    if (!company || !role) {
        return next(new AppError("Company and role are required", 400))
    }

    let userId = req.user._id

    let job = await Job.create({
        userId,
        company,
        role,
        salary,
        location,
        jobType,
        notes
    })

    return apiResponse(
        res,
        201,
        "Job created Successfully",
        job
    )
})

const getAllJobs = asyncHandler(async (req, res, next) => {
    let userId = req.user._id

    let filter = { userId }

    let { page = 1, limit = 10, status, search, jobType } = req.query


    page = Number(page) || 1
    limit = Number(limit) || 10

    if (page < 1) page = 1
    if (limit < 1) limit = 10
    if (limit > 50) limit = 50

    let skip = (page - 1) * limit

    if (status) filter.status = status
    if (jobType) filter.jobType = jobType

    if (search?.trim()) {
        search = search.trim();

        filter.$or = [
            { company: { $regex: search, $options: "i" } },
            { role: { $regex: search, $options: "i" } }
        ];
    }

    let jobs = await Job.find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)

    let totalJobs = await Job.countDocuments(filter)

    let totalPages = Math.ceil(totalJobs / limit)

    return apiResponse(
        res,
        200,
        "Jobs fetched successfully",
        {
            jobs,
            totalJobs,
            totalPages,
            currentPage: page
        }
    )
})


const updateJob = asyncHandler(async (req, res, next) => {
    let { jobId } = req.params

    let job = await Job.findOne({ _id: jobId })

    if (!job) {
        return next(new AppError("Job Not Found", 404))
    }

    if (job.userId.toString() !== req.user._id.toString()) {
        return next(new AppError("Unauthorised", 401))
    }

    const allowed = ["company", "role", "salary", "location", "jobType", "notes", "status"]

    let data = req.body

    if (!data || Object.keys(data).length === 0) {
        return next(new AppError("No data provided", 400))
    }

    let updatedData = {}

    for (let key in data) {
        if (!allowed.includes(key)) {
            return next(new AppError(`Invalid field ${key}`, 400))
        }
        updatedData[key] = data[key]
    }

    if (updatedData.company) {
        updatedData.company = updatedData.company.trim()
    }

    if (updatedData.role) {
        updatedData.role = updatedData.role.trim()
    }

    if ("company" in updatedData && !updatedData.company) {
        return next(new AppError("Company cannot be empty", 400))
    }

    if ("role" in updatedData && !updatedData.role) {
        return next(new AppError("Role cannot be empty", 400))
    }

    job.set(updatedData)
    await job.save()

    return apiResponse(
        res,
        200,
        "Job updated successfully",
        job
    )


})

const deleteJob = asyncHandler(async (req, res, next) => {
    let { jobId } = req.params

    let job = await Job.findOne({ _id: jobId })

    if (!job) {
        return next(new AppError("Job Not Found", 404))
    }

    if (job.userId.toString() !== req.user._id.toString()) {
        return next(new AppError("Unauthorised", 401))
    }

    await job.deleteOne()

    return apiResponse(
        res,
        200,
        "Job deleted successfully",
        { deletedJob: job }
    )

})

const getSingleJob = asyncHandler(async (req, res, next) => {
    let { jobId } = req.params

    let job = await Job.findOne({ _id: jobId })

    if (!job) {
        return next(new AppError("Job Not Found", 404))
    }

    if (job.userId.toString() !== req.user._id.toString()) {
        return next(new AppError("Unauthorised", 401))
    }

    return apiResponse(
        res,
        200,
        "Job fetched successfully",
        job
    )
})


export { createJob, getAllJobs, updateJob, deleteJob, getSingleJob }