import axiosInstance from "./axiosInstance.js";

const getMe = async()=>{
    const response = await axiosInstance.get("/profile/me")
    return response.data.data
}

export {getMe}