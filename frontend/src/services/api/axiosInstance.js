import axios from "axios";
import { refreshAccessToken } from "./auth.api.js";

const baseUrl =
    import.meta.env.VITE_BASE_URL || "http://localhost:5000/api";

const publicRoutes = ["/auth/login", "/auth/register", "/auth/refreshAccessToken"];

const axiosInstance = axios.create({
    baseURL: baseUrl,
    withCredentials: true,
});

// ---------------- REQUEST INTERCEPTOR ----------------
axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");

    config.headers = config.headers || {};

    const requestPath = config.url?.split("?")[0];

    const isPublicRoute = publicRoutes.some((route) =>
        requestPath?.startsWith(route)
    );

    if (token && !isPublicRoute) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

// ---------------- RESPONSE INTERCEPTOR ----------------
axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        // If no response or not 401 → just reject
        if (!error.response) {
            return Promise.reject(error);
        }

        // Handle 401 only
        if (
            error.response.status === 401 &&
            !originalRequest._retry
        ) {
            originalRequest._retry = true;

            try {
                const data = await refreshAccessToken();

                const newAccessToken = data.accessToken;

                // store new token
                localStorage.setItem("token", newAccessToken);

                // update header for future requests
                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

                // retry original request
                return axiosInstance(originalRequest);
            } catch (refreshError) {
                // refresh failed → force logout
                localStorage.removeItem("token");
                window.location.href = "/login";

                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;