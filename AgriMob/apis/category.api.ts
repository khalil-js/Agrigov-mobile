import { apiFetch } from "./api";

export const categoryApi = {
  list: () => apiFetch("/api/categories/"),

  detail: (id: number) =>
    apiFetch(`/api/categories/${id}/`),

  create: (data: any) =>
    apiFetch("/api/categories/create/", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  update: (id: number, data: any) =>
    apiFetch(`/api/categories/${id}/update/`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),

  delete: (id: number) =>
    apiFetch(`/api/categories/${id}/delete/`, {
      method: "DELETE",
    }),
};