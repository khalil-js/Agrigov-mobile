import type { CartItem } from "./Cart";

// ─── Transporter (GET /api/transporters/) ────────────────────────────────────

export interface ApiTransporter {
  id:                 number;
  name:               string;
  vehicle_type:       string;
  vehicle_model:      string;
  vehicle_capacity:   number;
  wilaya:             string;
  rating:             number | null;
  delivery_count:     number;
  estimated_delivery: string;  // e.g. "1–2 business days"
  price_per_km:       number;
  base_fee:           string;  // decimal string
  is_available:       boolean;
}

// ─── Delivery address (from buyer profile) ───────────────────────────────────

export interface DeliveryAddress {
  wilaya:      string;
  baladiya:    string;
  address:     string;
  phone:       string;
}


// ─── POST /api/orders/checkout/ — response ───────────────────────────────────

export interface CheckoutOrderItem {
  product_id:   number;
  product_name: string;
  quantity:     number;
  unit_price:   string;
  total_price:  number;
}

export interface CheckoutResponse {
  id:               number;
  order_number:     string;   // e.g. "ORD-2026-00042"
  status:           OrderStatus;
  items:            CheckoutOrderItem[];
  subtotal:         number;
  platform_levy:    number;
  total:            number;
  delivery_address: string;
  created_at:       string;
}

export type OrderStatus =
  | "pending"
  | "confirmed"
  | "in_transit"
  | "delivered"
  | "cancelled";

// ─── Platform fee constants ───────────────────────────────────────────────────

/** 1% platform levy on the subtotal */
export const PLATFORM_LEVY_RATE = 0.01;