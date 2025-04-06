import axios from "axios";
import Cookies from "js-cookie"; // Import cookie library
import { refreshAccessToken } from "./api";

const API_URL = import.meta.env.VITE_API_URL; // Default to localhost for development


const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: { "Content-Type": "application/json" },
});

// Request Interceptor: Attach token before every request
axiosInstance.interceptors.request.use(
  async (config) => {
    const accessToken = Cookies.get("access_token"); // Get from cookies (for security)
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor: Handle expired tokens
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const newAccessToken = await refreshAccessToken();
        if (newAccessToken) {
          Cookies.set("access_token", newAccessToken); // Set new access token in cookies
          axiosInstance.defaults.headers["Authorization"] = `Bearer ${newAccessToken}`;
          return axiosInstance(originalRequest); // Retry the failed request
        }
      } catch (refreshError) {
        console.error("Token refresh failed:", refreshError);
        Cookies.remove("access_token"); // Remove token from cookies
        Cookies.remove("refresh_token"); // Remove refresh token as well
        window.location.href = "/login"; // Redirect to login on failure
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
