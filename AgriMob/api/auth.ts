import axios from "axios";
import { LoginResponse, RegisterPayload, RegisterResponse } from "../types/Auth";

// ─── Base URL ──────────────────────────────────────────────────────────────────
// Change this to match where your Django server is running:
//   • Android emulator  → http://10.0.2.2:8000
//   • iOS simulator     → http://127.0.0.1:8000
//   • Physical device   → http://192.168.1.100:8000  (your machine's LAN IP)

const BASE_URL = "http://10.0.2.2:8000/api"; // ← adjust as needed

export const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

// ─── Auth API calls ────────────────────────────────────────────────────────────

export const authApi = {
  /**
   * POST /api/users/auth/login/
   * Returns: { data: { access, refresh, user } }
   */
  login: (email: string, password: string) =>
    apiClient.post<LoginResponse>("/users/auth/login/", { email, password }),

  /**
   * POST /api/users/auth/register/
   * Returns: { data: { user, tokens: { access, refresh } } }
   */
  register: (payload: RegisterPayload) =>
    apiClient.post<RegisterResponse>("/users/auth/register/", payload),

  /**
   * Logout is client-side only with JWT — just clear the token locally.
   * If you later add a token blacklist on Django, call that endpoint here.
   */
  logout: async () => {
    // no-op for now — token is cleared in AuthContext
  },
};