import mongoose from "mongoose"
import asyncHandler from "../utils/asyncHandler.js"
import AppError from "../utils/AppError.js"

const validateObjectId = (paramName) =>
    asyncHandler(async (req, res, next) => {
        const id = req.params[paramName]

        if (!id || !mongoose.Types.ObjectId.isValid(id)) {
            return next(new AppError("Invalid ID", 400))
        }

        next()
    })

export default validateObjectId