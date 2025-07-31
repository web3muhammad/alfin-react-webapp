import axios from "axios";

export const api = axios.create({
  baseURL: "https://24alfin.ru/api/v1", // Test API
  // baseURL: "https://alfin-ex.ru/api/v1", // Production API
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");
    if (token) {
      config.headers["access-token"] = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
