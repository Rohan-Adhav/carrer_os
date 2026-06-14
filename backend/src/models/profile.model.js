import mongoose from "mongoose";

const profileSchema = new mongoose.Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        unique: true
    },
    bio: {
        type: String,
        default: ""
    },
    skills: {
        type: [String],
        default: []
    },
    experience: {
        type: [
            {
                company: String,
                role: String,
                years: Number
            }
        ],
        default: []
    },
    interests: {
        type: [String],
        default: [],
    },

    targetRole: {
        type: String,
        default: "",
    }


}, { timestamps: true })

const Profile = mongoose.model("Profile",profileSchema)

export default Profile 