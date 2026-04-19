import { apiFetch } from "./api";

export interface AuthUser {
  id: number;
  email: string;
  username: string;
  phone: string;
  role: "FARMER" | "BUYER" | "TRANSPORTER" | "ADMIN";
  is_verified: boolean;
  is_active: boolean;
  created_at: string;
}

export interface RegisterPayload {
  email: string;
  username: string;
  phone: string;
  role: "FARMER" | "BUYER" | "TRANSPORTER";
  password: string;
}

// Django LoginView response:
// { status, code, message, data: { access, refresh, user } }
export interface LoginApiResponse {
  status: string;
  data: { access: string; refresh: string; user: AuthUser };
}

// Django RegisterView response:
// { status, code, message, data: { user, tokens: { access, refresh } } }
export interface RegisterApiResponse {
  status: string;
  data: { user: AuthUser; tokens: { access: string; refresh: string } };
}

export const authApi = {
  login: (email: string, password: string) =>
    apiFetch<LoginApiResponse>("/api/users/auth/login/", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    }),

  register: (payload: RegisterPayload) =>
    apiFetch<RegisterApiResponse>("/api/users/auth/register/", {
      method: "POST",
      body: JSON.stringify(payload),
    }),
};