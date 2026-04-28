import { BASE_URL } from "./config";
import { storage } from "./storage";

export class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = "ApiError";
  }
}

export async function apiFetch<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const token = await storage.getToken();
  const isFormData = options.body instanceof FormData;

  const res = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers: {
      ...(isFormData ? {} : { "Content-Type": "application/json" }),
      // Uses the shared storage key — guaranteed to match what AuthContext saved
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers as Record<string, string>),
    },
  });

  const json = await res.json().catch(() => null);

  if (!res.ok) {
    let message = json?.detail || json?.message || json?.non_field_errors?.[0];
    
    // Fallback: if it's a validation error object (e.g. {"product": ["You can only review..."]}), get the first array item
    if (!message && json && typeof json === 'object') {
      const firstErrorVal = Object.values(json).find(val => Array.isArray(val) && val.length > 0 && typeof val[0] === 'string');
      if (firstErrorVal) {
        message = (firstErrorVal as string[])[0];
      }
    }
    
    if (!message) {
      message = `Request failed with status ${res.status}`;
    }
    
    throw new ApiError(res.status, message);
  }

  return json as T;
}