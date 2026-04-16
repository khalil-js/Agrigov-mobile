import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { AuthUser } from "../types/Auth";
import { authApi } from "../api/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

// AsyncStorage might not be available in web or during initial load
const safeGetItem = async (key: string): Promise<string | null> => {
  try {
    return await AsyncStorage.getItem(key);
  } catch {
    return null;
  }
};

interface AuthContextType {
  user: AuthUser | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (
    email: string,
    password: string,
  ) => Promise<{ success: boolean; error?: string }>;
  register: (payload: {
    email: string;
    username: string;
    phone: string;
    role: "FARMER" | "BUYER" | "TRANSPORTER";
    password: string;
  }) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  setUser: (user: AuthUser | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadStoredUser();
  }, []);

  const loadStoredUser = async () => {
    try {
      const userStr = await safeGetItem("user");
      if (userStr) {
        const userData = JSON.parse(userStr);
        setUser(userData);
      }
      // Don't set static user - let user choose role
    } catch (error) {
      // Don't set static user on error
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const response = await authApi.login(email, password);
      setUser(response.data.user);
      return { success: true };
    } catch (error: any) {
      const message =
        error.response?.data?.message ||
        error.response?.data?.error ||
        "Login failed. Please check your credentials.";
      return { success: false, error: message };
    }
  };

  const register = async (payload: {
    email: string;
    username: string;
    phone: string;
    role: "FARMER" | "BUYER" | "TRANSPORTER";
    password: string;
  }) => {
    try {
      const response = await authApi.register(payload);
      setUser(response.data.user);
      return { success: true };
    } catch (error: any) {
      const message =
        error.response?.data?.message ||
        error.response?.data?.error ||
        "Registration failed. Please try again.";
      return { success: false, error: message };
    }
  };

  const logout = async () => {
    await authApi.logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        register,
        logout,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
