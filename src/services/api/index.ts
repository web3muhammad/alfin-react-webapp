import axios from "axios";

export const api = axios.create({
  baseURL: "https://web3muhammad-alfin-exchange-bot-5d7c.twc1.net/api/v1",
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
