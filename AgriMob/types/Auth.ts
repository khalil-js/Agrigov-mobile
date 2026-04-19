// Matches Django UserSerializer:
// fields = ["id", "email", "username", "phone", "role", "is_verified", "is_active", "created_at"]

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

// Django LoginView response shape:
// { status, code, message, data: { access, refresh, user } }
export interface LoginResponse {
  status: string;
  code: number;
  message: string;
  data: {
    access: string;
    refresh: string;
    user: AuthUser;
  };
}

// Django RegisterView response shape:
// { status, code, message, data: { user, tokens: { access, refresh } } }
export interface RegisterResponse {
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