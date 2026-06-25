import axiosInstance, { axiosPublic } from "./axiosInstance.js";

// ---------------- LOGIN ----------------
export const login = async (credentials) => {
    const response = await axiosPublic.post(
        "/auth/login",
        credentials
    );

    const data = response.data.data;

    if (data?.accessToken) {
        localStorage.setItem("token", data.accessToken);
    }

    return data;
};

// ---------------- REGISTER ----------------
export const register = async (credentials) => {
    const response = await axiosPublic.post(
        "/auth/register",
        credentials
    );

    return response.data.data;
};

// ---------------- LOGOUT ----------------
export const logout = async () => {
    try {
        await axiosInstance.post("/auth/logout");
    } catch (err) {
        // ignore backend failure
    } finally {
        localStorage.removeItem("token");
    }
};

// (optional helper if you want manual refresh calls anywhere)
export const refreshAccessTokenAPI = async () => {
    const response = await axiosPublic.post(
        "/auth/refreshAccessToken"
    );

    const data = response.data.data;

    if (data?.accessToken) {
        localStorage.setItem("token", data.accessToken);
    }

    return data;
};

export const getCurrentUser =  async()=>{
    const response = await axiosInstance.get(
        "/auth/me"
    )
    return response.data.data
}