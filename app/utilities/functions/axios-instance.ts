import axios from "axios";
import secureLocalStorage from "react-secure-storage";
import { API_URLS, BASE, VERSION } from "../constants/api-endpoints";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants/global-data";
import { getAccessToken, getRefreshToken } from "./crud-tokens-storage";

const API_BASE_URL = `${BASE}/${VERSION}`;

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});


axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = getAccessToken();
    const refreshToken = getRefreshToken();

    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    if (refreshToken) {
      config.headers["x-refresh-token"] = refreshToken;
    }

    return config;
  },
  (error) => Promise.reject(error)
);


axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      console.warn("Unauthorized - Token might be expired");
      secureLocalStorage.removeItem(ACCESS_TOKEN);
      secureLocalStorage.removeItem(REFRESH_TOKEN);
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
