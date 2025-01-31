import axios from "axios";
import Cookies from "js-cookie";
// import { toast } from "react-toastify";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = Cookies.get("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshResponse = await axios.post(`${import.meta.env.VITE_API_URL}/auth/refreshToken`, {}, {
          withCredentials: true,
        });

        const { token } = refreshResponse.data;
        Cookies.set("token", token);

        originalRequest.headers["Authorization"] = `Bearer ${token}`;
        return axiosInstance(originalRequest);
    } catch (err) {
        console.error("Error refreshing token:", err);
       
        Cookies.remove("token");
        Cookies.remove("refreshToken");
        Cookies.remove("currentUser");
        //  toast.error("Session expired. Please log in again.");
       
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;