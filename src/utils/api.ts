import axios from "axios";
import Cookies from "js-cookie";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true, // Allows sending cookies
});

api.interceptors.request.use((config) => {
  const accessToken = sessionStorage.getItem("accessToken");
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

// Refresh token logic
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response.status === 403) {
      try {
        const res = await axios.post("http://localhost:5000/api/auth/refresh-token", {}, { withCredentials: true });
        sessionStorage.setItem("accessToken", res.data.accessToken);
        error.config.headers.Authorization = `Bearer ${res.data.accessToken}`;
        return api(error.config);
      } catch (err) {
        return Promise.reject(err);
      }
    }
    return Promise.reject(error);
  }
);

export default api;
