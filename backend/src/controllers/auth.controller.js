import User from "../models/user.model.js";
import AppError from "../utils/AppError.js";
import asyncHandler from "../utils/asyncHandler.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { generateAccessToken, generateRefreshToken } from "../utils/token.js";
import env from "../config/env.js"

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

    const options = {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000
    }

    res.cookie("refreshToken", refreshToken, options)
    user.refreshToken = refreshToken
    await user.save()

    return res.status(200).json({
        success: true,
        message: "Login successful",
        accessToken,
        user: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role
        }
    });

})


const refreshAccessToken = asyncHandler(async (req, res, next) => {
    let { refreshToken } = req.cookies

    if (!refreshToken) {
        return next(new AppError("Unauthorised", 401))
    }

    let decoded;

    try {

        decoded = jwt.verify(refreshToken, env.JWT_REFRESH_SECRET)

    } catch (error) {

        return next(new AppError("Unauthorised", 401))

    }


    let userId = decoded.userId

    let user = await User.findOne({ _id: userId })

    if (!user) {
        return next(new AppError("User Not Found", 409))
    }

    if (refreshToken !== user.refreshToken) {
        return next(new AppError("Unauthorised", 401))
    }

    let accessToken = generateAccessToken(user._id, user.role)

    res.status(200).json({
        success: true,
        message: "Access Token generated succssfully",
        accessToken: accessToken,
        user: {
            id: user._id,
            name: user.name,
            email: user.email,
            createdAt: user.createdAt
        }

    });
})

const logout = asyncHandler(async (req, res, next) => {
    let userId = req.user._id

    const user = await User.findByIdAndUpdate(
        userId,
        { refreshToken: null },
        { new: true }
    );

    if (!user) {
        return next(new AppError("User Not Found", 404))
    }

    res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: false,
        sameSite: "lax"
    })

    res.status(200).json({
        success: true,
        message: "Logged Out Successfully"
    })

})

export { registerUser, loginUser, refreshAccessToken, logout }