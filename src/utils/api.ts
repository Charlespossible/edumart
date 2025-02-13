import axios from "axios";
import Cookies from "js-cookie";

const baseURL = "http://localhost:5000/api"; // Define baseURL once

const api = axios.create({
  baseURL,
  withCredentials: true, // Enables sending cookies
});

// Attach the access token to each request if available
api.interceptors.request.use((config) => {
  const accessToken = Cookies.get("accessToken"); // Retrieve token from cookies
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

// Refresh token mechanism
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 403) {
      try {
        const res = await axios.post(`${baseURL}/auth/refresh-token`, {}, { withCredentials: true });

        // Store new token in Cookies
        Cookies.set("accessToken", res.data.accessToken, { secure: true, sameSite: "Strict" });

        // Retry the failed request with the new token
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