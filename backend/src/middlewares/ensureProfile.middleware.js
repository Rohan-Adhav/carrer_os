import Profile from "../models/profile.model.js";
import asyncHandler from "../utils/asyncHandler.js";

const ensureProfile = asyncHandler(async (req, res, next) => {
    const userId = req.user._id;

    const profile = await Profile.findOneAndUpdate(
        { userId },
        {
            $setOnInsert: {
                userId,
                bio: "",
                skills: [],
                experience: [],
                interests: [],
                targetRole: ""
            }
        },
        {
            new: true,
            upsert: true
        }
    );

    req.profile = profile;

    next();
});

export default ensureProfile;