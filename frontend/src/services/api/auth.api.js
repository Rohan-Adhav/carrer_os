import axiosInstance from "./axiosInstance.js";

const login = async (credentials) => {
    const response = await axiosInstance.post(
        "/auth/login", credentials
    )
    return response.data.data
}


const register = async (credentials) => {
    const response = await axiosInstance.post(
        "/auth/register", credentials
    )
    return response.data.data
}

const logout = async () => {

    const response = await axiosInstance.post("/auth/logout")
    localStorage.removeItem("token")
    return response.data.data

}

const refreshAccessToken = async()=>{
    const response = await axiosInstance.post(
        "/auth/refreshAccessToken"
    )
    localStorage.setItem("token",response.data.accessToken)
    return response.data.data
}
export { login, register, logout,refreshAccessToken }