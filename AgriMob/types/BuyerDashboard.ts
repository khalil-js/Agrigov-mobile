// ─── Dashboard API ────────────────────────────────────────────────────────────

export interface BuyerOverview {
  total_orders:     number;
  total_spent:      number;
  avg_order_value:  number;
  total_reviews:    number;
}

export interface RecentActivity {
  id:          number;
  status:      string;
  total_price: number;
  created_at:  string;
}

export interface SpendingDataPoint {
  month: string;  // ISO datetime
  total: number;
}

export interface StatusDataPoint {
  status: string;
  count:  number;
}

export interface BuyerDashboardCharts {
  spending_over_time:  SpendingDataPoint[];
  status_distribution: StatusDataPoint[];
}

export interface BuyerDashboardResponse {
  overview:        BuyerOverview;
  recent_activity: RecentActivity[];
  charts:          BuyerDashboardCharts;
}

// ─── Orders API ───────────────────────────────────────────────────────────────

export interface OrderProduct {
  id:            number;
  title:         string;
  description:   string;
  season:        string;
  unit_price:    string;
  category_name: string | null;
}

export interface OrderItem {
  id:          number;
  product:     OrderProduct;
  quantity:    number;
  total_price: number;
}

export interface ApiOrder {
  id:               number;
  buyer:            string;
  farm:             string;
  total_price:      string;
  status:           string;
  created_at:       string;
  items:            OrderItem[];
  allowed_statuses: string[];
}

export interface OrdersResponse {
  count:    number;
  next:     string | null;
  previous: string | null;
  results:  ApiOrder[];
}

// ─── Reviews API ──────────────────────────────────────────────────────────────

export interface ReviewMinistryProduct {
  id:          number;
  name:        string;
  slug:        string;
  category:    number | null;
  description: string;
  is_active:   boolean;
}

export interface ReviewFarm {
  id:         number;
  farmer:     number;
  name:       string;
  wilaya:     string;
  region:     string;
  baladiya:   string;
  farm_size:  number;
  address:    string;
  created_at: string;
}

export interface ReviewProductImage {
  id:    number;
  image: string;
}

export interface ReviewProduct {
  id:               number;
  ministry_product: ReviewMinistryProduct;
  farm:             ReviewFarm;
  farmer_name:      string;
  category_name:    string;
  description:      string;
  season:           string;
  unit_price:       string;
  stock:            number;
  in_stock:         boolean;
  images:           ReviewProductImage[];
  average_rating:   number;
  review_count:     number;
  created_at:       string;
}

export interface BuyerReview {
  id:         number;
  product:    ReviewProduct;
  buyer:      number;
  rating:     number;
  comment:    string;
  created_at: string;
}

export interface ReviewsResponse {
  count:    number;
  next:     string | null;
  previous: string | null;
  results:  BuyerReview[];
}

// ─── Display helpers ──────────────────────────────────────────────────────────

export const ORDER_STATUS_BADGE: Record<string, string> = {
  pending:    "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300",
  confirmed:  "bg-blue-100   text-blue-800   dark:bg-blue-900/30   dark:text-blue-300",
  in_transit: "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300",
  delivered:  "bg-green-100  text-green-800  dark:bg-green-900/30  dark:text-green-300",
  cancelled:  "bg-red-100    text-red-800    dark:bg-red-900/30    dark:text-red-300",
};

export const ORDER_STATUS_LABEL: Record<string, string> = {
  pending:    "Pending",
  confirmed:  "Confirmed",
  in_transit: "In Transit",
  delivered:  "Delivered",
  cancelled:  "Cancelled",
};

export const ORDER_STATUS_ICON: Record<string, string> = {
  pending:    "schedule",
  confirmed:  "check_circle",
  in_transit: "local_shipping",
  delivered:  "task_alt",
  cancelled:  "cancel",
};

export function fmtDZD(n: number): string {
  return n.toLocaleString("fr-DZ", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

export function fmtDate(iso: string): string {
  return new Date(iso).toLocaleDateString("fr-DZ", {
    day: "2-digit", month: "short", year: "numeric",
  });
}

export function fmtDateTime(iso: string): string {
  return new Date(iso).toLocaleString("fr-DZ", {
    day: "2-digit", month: "short", year: "numeric",
    hour: "2-digit", minute: "2-digit",
  });
}

export function parseFarmName(raw: string): string {
  return raw.split(" - ")[0] ?? raw;
}