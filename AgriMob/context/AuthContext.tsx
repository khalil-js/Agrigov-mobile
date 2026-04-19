import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { storage } from "../apis/storage";
import { authApi, AuthUser, RegisterPayload } from "../apis/auth";

interface AuthContextType {
  user: AuthUser | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login:    (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (payload: RegisterPayload)        => Promise<{ success: boolean; error?: string }>;
  logout:   ()                                => Promise<void>;
  setUser:  (user: AuthUser | null)           => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user,      setUser]      = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Restore session on app start
  useEffect(() => {
    (async () => {
      try {
        const [savedUser, token] = await Promise.all([
          storage.getUser(),
          storage.getToken(),
        ]);
        if (savedUser && token) {
          setUser(savedUser);
        }
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  // ── Login ─────────────────────────────────────────────────────────────────
  // Django: POST /api/users/auth/login/
  // Response: { data: { access, refresh, user } }

  const login = async (email: string, password: string) => {
    try {
      const res = await authApi.login(email, password);
      const { access, refresh, user: userData } = res.data;

      // Save everything so api.ts can read the token on future requests
      await Promise.all([
        storage.setToken(access),
        storage.setRefresh(refresh),
        storage.setUser(userData),
      ]);
      setUser(userData);
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message || "Login failed." };
    }
  };

  // ── Register ──────────────────────────────────────────────────────────────
  // Django: POST /api/users/auth/register/
  // Response: { data: { user, tokens: { access, refresh } } }

  const register = async (payload: RegisterPayload) => {
    try {
      const res = await authApi.register(payload);
      const { user: userData, tokens } = res.data;

      await Promise.all([
        storage.setToken(tokens.access),
        storage.setRefresh(tokens.refresh),
        storage.setUser(userData),
      ]);
      setUser(userData);
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message || "Registration failed." };
    }
  };

  // ── Logout ────────────────────────────────────────────────────────────────

  const logout = async () => {
    setUser(null);
    await storage.clearAll();
  };

  return (
    <AuthContext.Provider value={{
      user,
      isLoading,
      isAuthenticated: !!user,
      login,
      register,
      logout,
      setUser,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
}