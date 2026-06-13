import User from "../models/user.model.js";
import AppError from "../utils/AppError.js";
import asyncHandler from "../utils/asyncHandler.js"
import bcrypt from "bcrypt"
import { generateAccessToken, generateRefreshToken } from "../utils/token.js";

const registerUser = asyncHandler(async (req, res, next) => {
    let { name, email, password } = req.body
    if (!name || !email || !password) {
        return next(new AppError("Name , Email & Password are required", 400))
    }
    const cleanname = name.trim()
    const cleanemail = email.trim().toLowerCase()
    const cleanpassword = password
    let userExists = await User.findOne({ email: cleanemail })
    if (userExists) {
        return next(new AppError("User already exists", 409))
    }
    const hashedpassword = await bcrypt.hash(cleanpassword, 10)
    const user = await User.create({
        name: cleanname,
        email: cleanemail,
        password: hashedpassword
    })
    res.status(201).json({
        success: true,
        message: "user registered successfully",
        user: {
            id: user._id,
            name: user.name,
            email: user.email,
            createdAt: user.createdAt
        }
    });
})

const loginUser = asyncHandler(async (req, res, next) => {
    let { email, password } = req.body

    if (!email || !password) {
        return next(new AppError("All fields are required", 400))
    }

    const cleanemail = email.trim().toLowerCase()
    const cleanpassword = password

    const user = await User.findOne({ email: cleanemail }).select("+password")

    if (!user) {
        return next(new AppError("Invalid Credentials", 401))
    }

    const isCorrectPassword = await bcrypt.compare(cleanpassword, user.password)

    if (!isCorrectPassword) {
        return next(new AppError("Invalid Credentials", 401))
    }

    let accessToken = generateAccessToken(user._id, user.role)
    let refreshToken = generateRefreshToken(user._id)

    user.refreshToken = refreshToken
    await user.save()

    return res.status(200).json({
        success: true,
        message: "Login successful",
        accessToken,
        refreshToken, // later we will move this to HTTP-only cookie
        user: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role
        }
    });

})
export { registerUser, loginUser }