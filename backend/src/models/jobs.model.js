import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        index:true
    },
    company: {
        type: String,
        required: true,
        trim: true
    },
    role: {
        type: String,
        required: true,
        trim: true
    },
    status: {
        type: String,
        enum: ["applied", "interview", "rejected", "offer"],
        default: "applied",
        index: true
    },
    location: {
        type: String,
        default: ""
    },

    jobType: {
        type: String,
        enum: ["remote", "onsite", "hybrid"],
        default: "remote"
    },

    salary: {
        type: String,
        default: ""
    },

    notes: {
        type: String,
        default: ""
    }
},
    { timestamps: true })

const Job = mongoose.model("Job", jobSchema)

export default Job