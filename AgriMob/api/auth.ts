import { api } from "./client";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthUser } from "../types/Auth";

interface LoginResponse {
  status: string;
  code: number;
  message: string;
  data: {
    access: string;
    refresh: string;
    user: AuthUser;
  };
}

interface RegisterResponse {
  status: string;
  code: number;
  message: string;
  data: {
    user: AuthUser;
    tokens: {
      access: string;
      refresh: string;
    };
  };
}

export interface RegisterPayload {
  email: string;
  username: string;
  phone: string;
  role: "FARMER" | "BUYER" | "TRANSPORTER";
  password: string;
}

export interface FarmerProfilePayload {
  age: number;
  wilaya: string;
  baladiya: string;
  farm_size: number;
  address: string;
  farmer_card_image: File | null;
  national_id_image: File | null;
}

export interface TransporterProfilePayload {
  age: number;
  driver_license_image: File | null;
  grey_card_image: File | null;
  vehicle_type: string;
  vehicle_model: string;
  vehicle_year: number;
  vehicle_capacity: number;
}

export interface BuyerProfilePayload {
  age: number;
  bussiness_license_image: File | null;
}

// Safe storage operations
const safeSetItem = async (key: string, value: string): Promise<void> => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (error) {
    console.warn(`Failed to save ${key}:`, error);
  }
};

const safeGetItem = async (key: string): Promise<string | null> => {
  try {
    return await AsyncStorage.getItem(key);
  } catch {
    return null;
  }
};

const safeRemoveItem = async (key: string): Promise<void> => {
  try {
    await AsyncStorage.removeItem(key);
  } catch {
    // Ignore errors
  }
};

export const authApi = {
  async login(email: string, password: string): Promise<LoginResponse> {
    const response = await api.post<LoginResponse>("/users/auth/login/", {
      email,
      password,
    });

    const { access, refresh, user } = response.data.data;

    // Store tokens and user
    await safeSetItem("accessToken", access);
    await safeSetItem("refreshToken", refresh);
    await safeSetItem("user", JSON.stringify(user));

    return response.data;
  },

  async register(payload: RegisterPayload): Promise<RegisterResponse> {
    const response = await api.post<RegisterResponse>(
      "/users/auth/register/",
      payload
    );

    const { tokens, user } = response.data.data;

    // Store tokens and user
    await safeSetItem("accessToken", tokens.access);
    await safeSetItem("refreshToken", tokens.refresh);
    await safeSetItem("user", JSON.stringify(user));

    return response.data;
  },

  async createFarmerProfile(
    payload: FormData
  ): Promise<{ status: string; data: { profile: object } }> {
    const response = await api.post("/users/auth/farmer-profile/", payload, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },

  async createTransporterProfile(
    payload: FormData
  ): Promise<{ status: string; data: { profile: object } }> {
    const response = await api.post("/users/auth/transporter-profile/", payload, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },

  async createBuyerProfile(
    payload: FormData
  ): Promise<{ status: string; data: { profile: object } }> {
    const response = await api.post("/users/auth/buyer-profile/", payload, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },

  async getMe(): Promise<{ status: string; data: AuthUser }> {
    const response = await api.get("/users/me/");
    return response.data;
  },

  async logout(): Promise<void> {
    await safeRemoveItem("accessToken");
    await safeRemoveItem("refreshToken");
    await safeRemoveItem("user");
  },

  async getStoredUser(): Promise<AuthUser | null> {
    const userStr = await safeGetItem("user");
    return userStr ? JSON.parse(userStr) : null;
  },

  async getStoredToken(): Promise<string | null> {
    return safeGetItem("accessToken");
  },
};