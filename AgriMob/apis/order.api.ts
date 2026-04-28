import { apiFetch } from "./api";

export interface CheckoutPayload {
  transporter_id: number;
  delivery_address: string;
  wilaya: string;
  baladiya: string;
  phone: string;
  payment_method?: string;
  card_number?: string;
  card_expiry?: string;
  card_cvc?: string;
  card_name?: string;
  notes?: string;
}

export interface CheckoutResponse {
  id: number;
  order_number: string;
  buyer: string;
  farm: string;
  total_price: string;
  status: "pending" | "confirmed" | "in_transit" | "delivered" | "cancelled";
  transporter: number | null;
  transporter_name: string | null;
  mission: number | null;
  mission_id: string | null;
  created_at: string;
  items: Array<{
    id: number;
    product: {
      id: number;
      title: string;
      category_name: string;
    };
    quantity: number;
    total_price: number;
  }>;
}

export const orderApi = {
  checkout: (payload: CheckoutPayload) =>
    apiFetch<CheckoutResponse>("/api/orders/checkout/", {
      method: "POST",
      body: JSON.stringify(payload),
    }),

  detail: (id: number) =>
    apiFetch(`/api/orders/${id}/`),

  // Buyer's orders
  myOrders: () =>
    apiFetch("/api/orders/"),

  // Farmer's orders (orders for farmer's products)
  farmerOrders: (params?: { status?: string }) => {
    const qs = params?.status ? `?status=${encodeURIComponent(params.status)}` : "";
    return apiFetch(`/api/farmer/orders/${qs}`);
  },

  // Update order status (for farmer)
  updateStatus: (id: number, status: "confirmed" | "in_transit" | "delivered" | "cancelled") =>
    apiFetch(`/api/orders/${id}/status/`, {
      method: "PATCH",
      body: JSON.stringify({ status }),
    }),
};