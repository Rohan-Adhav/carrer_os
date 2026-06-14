import Profile from "../models/profile.model.js";
import asyncHandler from "../utils/asyncHandler.js";

const ensureProfile = asyncHandler(async(req,res,next)=>{
    let userId  = req.user._id

    let profile = await Profile.findOne({userId:userId})

    if(!profile){
        profile = await Profile.create({
            userId:userId
        })
    }

    req.profile = profile

    next()

})

export default ensureProfile