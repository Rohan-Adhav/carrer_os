import axios from "axios";

const baseUrl =
    import.meta.env.VITE_BASE_URL || "http://localhost:5000/api";

export const axiosPublic = axios.create({
    baseURL: baseUrl,
    withCredentials: true,
});

const axiosInstance = axios.create({
    baseURL: baseUrl,
    withCredentials: true,
});

// ---------------- REFRESH (local, no imports = no circular dependency) ----------------
const refreshAccessToken = async () => {
    const response = await axiosPublic.post("/auth/refreshAccessToken");
    return response.data;
};

// ---------------- REQUEST INTERCEPTOR ----------------
axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");

    config.headers = config.headers || {};

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

// ---------------- RESPONSE INTERCEPTOR ----------------
// ---------------- RESPONSE INTERCEPTOR ----------------
axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (!error.response) {
            return Promise.reject(error);
        }

        // Prevent retry loops on the refresh endpoint itself
        if (originalRequest?.url?.includes("/auth/refreshAccessToken")) {
            return Promise.reject(error);
        }

        if (error.response.status === 401 && !originalRequest._retry) {
            const token = localStorage.getItem("token");

            // ✅ No token = user is logged out, don't attempt refresh
            if (!token) {
                return Promise.reject(error);
            }

            // ... rest of your refresh queue logic
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;