// ─── API shapes ───────────────────────────────────────────────────────────────

export interface FarmerDashboardOverview {
  total_revenue:  number;
  revenue_growth: number;
  total_products: number;
  avg_rating:     number;
}

export interface RevenueDataPoint {
  day:   string;   // ISO datetime
  total: number;
}

export interface OrdersDataPoint {
  day:   string;
  count: number;
}

export interface CategoryDataPoint {
  product_item__category_name: string;
  total:                       number;
}

export interface FarmerDashboardCharts {
  revenue_over_time:      RevenueDataPoint[];
  orders_over_time:       OrdersDataPoint[];
  category_distribution:  CategoryDataPoint[];
}

export interface TopProduct {
  id:                      number;
  ministry_product__name:  string;
  total_sold:              number | null;
}

export interface FarmerDashboardInsights {
  top_products:      TopProduct[];
  low_stock_products: number;
}

export interface FarmerDashboardResponse {
  overview: FarmerDashboardOverview;
  charts:   FarmerDashboardCharts;
  insights: FarmerDashboardInsights;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

export function formatDZD(value: number): string {
  return value.toLocaleString("fr-DZ", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

/** ISO date → short month label: "26 Mar" */
export function shortMonthDay(iso: string): string {
  return new Date(iso).toLocaleDateString("fr-DZ", {
    day:   "2-digit",
    month: "short",
  });
}