import axios from "axios";
import API_CONFIG from "../config";

// Safe storage getter
const safeGetItem = async (key: string): Promise<string | null> => {
  try {
    const AsyncStorage = require("@react-native-async-storage/async-storage").default;
    return await AsyncStorage.getItem(key);
  } catch {
    return null;
  }
};

const safeSetItem = async (key: string, value: string): Promise<void> => {
  try {
    const AsyncStorage = require("@react-native-async-storage/async-storage").default;
    await AsyncStorage.setItem(key, value);
  } catch {
    // Ignore errors
  }
};

const safeRemoveItem = async (key: string): Promise<void> => {
  try {
    const AsyncStorage = require("@react-native-async-storage/async-storage").default;
    await AsyncStorage.removeItem(key);
  } catch {
    // Ignore errors
  }
};

export const api = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: API_CONFIG.TIMEOUT,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add auth token to requests
api.interceptors.request.use(async (config) => {
  const token = await safeGetItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle token refresh on 401
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = await safeGetItem("refreshToken");
        if (refreshToken) {
          const response = await axios.post(`${API_CONFIG.BASE_URL}/users/auth/refresh/`, {
            refresh: refreshToken,
          });
          const { access } = response.data;
          await safeSetItem("accessToken", access);
          originalRequest.headers.Authorization = `Bearer ${access}`;
          return api(originalRequest);
        }
      } catch (refreshError) {
        // Refresh failed, clear tokens
        await safeRemoveItem("accessToken");
        await safeRemoveItem("refreshToken");
        await safeRemoveItem("user");
      }
    }
    return Promise.reject(error);
  }
);