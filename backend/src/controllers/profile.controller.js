import AppError from "../utils/AppError.js";
import asyncHandler from "../utils/asyncHandler.js";

const getProfile = asyncHandler(async (req, res, next) => {
    let profile = req.profile
    res.status(200).json({
        success: true,
        message: "Profile fetched successfully",
        data: profile
    })
})

const updateProfile = asyncHandler(async (req, res, next) => {

    let profile = req.profile;
    let data = req.body;

    const allowed = ["bio", "skills", "experience", "interests", "targetRole"];

    if (!data || Object.keys(data).length === 0) {
        return next(new AppError("No data Provided", 400));
    }

    
    for (let key in data) {
        if (!allowed.includes(key)) {
            return next(new AppError(`Invalid field: ${key}`, 400));
        }
    }

    
    if (typeof data.bio === "string" && data.bio.trim()) {
        profile.bio = data.bio.trim();
    }


    if (typeof data.targetRole === "string" && data.targetRole.trim()) {
        profile.targetRole = data.targetRole.trim();
    }

    
    if (Array.isArray(data.skills)) {
        profile.skills = [
            ...new Set([...profile.skills, ...data.skills.filter(Boolean)])
        ];
    }

    
    if (Array.isArray(data.interests)) {
        profile.interests = [
            ...new Set([...profile.interests, ...data.interests.filter(Boolean)])
        ];
    }

    if (Array.isArray(data.experience)) {
        profile.experience.push(
            ...data.experience.filter(
                (exp) => exp && typeof exp === "object"
            )
        );
    }

    await profile.save();

    return res.status(200).json({
        success: true,
        message: "Profile updated successfully",
        data: profile
    });
});

export { getProfile, updateProfile }