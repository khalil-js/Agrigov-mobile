import { apiFetch } from "./api";

export const ministryApi = {
  dashboard: () => apiFetch("/api/dashboard/"),

  pendingUsers: (limit = 10, offset = 0) =>
    apiFetch(`/api/users/pending/?limit=${limit}&offset=${offset}`),

  userDetail: (id: number) =>
    apiFetch(`/api/users/${id}/`),

  validateUser: (id: number) =>
    apiFetch(`/api/users/${id}/validate/`, { method: "PATCH" }),

  rejectUser: (id: number, reason: string) =>
    apiFetch(`/api/users/${id}/reject/`, {
      method: "PATCH",
      body: JSON.stringify({ reason }),
    }),
};