import { apiFetch } from "./api";

export const cartApi = {
  get: () => apiFetch("/api/cart/"),

  add: (product_id: number, quantity: number) =>
    apiFetch("/api/cart/add_item/", {
      method: "POST",
      body: JSON.stringify({ product_id, quantity }),
    }),

  update: (item_id: number, quantity: number) =>
    apiFetch("/api/cart/update_quantity/", {
      method: "PATCH",
      body: JSON.stringify({ item_id, quantity }),
    }),

  remove: (item_id: number) =>
    apiFetch("/api/cart/remove_item/", {
      method: "DELETE",
      body: JSON.stringify({ item_id }),
    }),

  clear: () =>
    apiFetch("/api/cart/clear_cart/", {
      method: "DELETE",
    }),
};