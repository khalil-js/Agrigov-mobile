// ─── API shapes ───────────────────────────────────────────────────────────────

export interface ApiProductDetail {
  id:            number;
  name:          string;
  slug:          string;
  category:      number | null;
  category_name?: string;
  description:   string;
  is_active:     boolean;
}

export interface ApiOfficialPrice {
  id:          number;
  product:     number;
  product_detail: ApiProductDetail;
  wilaya:      string;
  min_price:   string;   // decimal string "85.50"
  max_price:   string;
  unit:        string;
  valid_from:  string;   // ISO datetime
  valid_until: string | null;
  is_active:   boolean;
  region_name: string;
}

export interface OfficialPricesResponse {
  count:    number;
  next:     string | null;
  previous: string | null;
  results:  ApiOfficialPrice[];
}

export interface OfficialPricePayload {
  product:     number;
  wilaya?:     string;
  min_price:   number;
  max_price:   number;
  unit:        string;
  valid_from:  string;
  valid_until?: string | null;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

export function formatPriceRange(item: ApiOfficialPrice): string {
  const min = parseFloat(item.min_price);
  const max = parseFloat(item.max_price);
  const fmt = (n: number) =>
    n.toLocaleString("fr-DZ", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  return `${fmt(min)} – ${fmt(max)} DZD`;
}

export function midPrice(item: ApiOfficialPrice): number {
  return (parseFloat(item.min_price) + parseFloat(item.max_price)) / 2;
}

export function formatOfficialPriceDate(iso: string): string {
  return new Date(iso).toLocaleDateString("fr-DZ", {
    day:   "2-digit",
    month: "short",
    year:  "numeric",
  });
}

// ─── Audit log types (local state — no dedicated endpoint yet) ────────────────

export type AuditActorType = "human" | "system";

export interface AuditEntry {
  id:            string;
  actorType:     AuditActorType;
  actorName:     string;
  actorBg:       string;
  actorTextColor: string;
  actorIcon:     string;
  message:       string;
  timeAgo:       string;
}

export type ChangeReason =
  | "Seasonal Trend Adjustment"
  | "Inflation Correction"
  | "Supply Shortage"
  | "Government Subsidy Change";

export const CHANGE_REASONS: ChangeReason[] = [
  "Seasonal Trend Adjustment",
  "Inflation Correction",
  "Supply Shortage",
  "Government Subsidy Change",
];

export const INITIAL_AUDIT_LOG: AuditEntry[] = [
  {
    id:            "sys-1",
    actorType:     "system",
    actorName:     "System Auto-correction",
    actorBg:       "bg-blue-100 dark:bg-blue-900/30",
    actorTextColor:"text-blue-600 dark:text-blue-400",
    actorIcon:     "smart_toy",
    message:       "Validated prices against regional index.",
    timeAgo:       "2h ago",
  },
];

export const UNIT_OPTIONS = ["kg", "bag", "ton", "quintal", "litre"] as const;
export type PriceUnit = typeof UNIT_OPTIONS[number];

// Category badge colours by region or category name
export const REGION_BADGE: Record<string, string> = {
  national: "bg-blue-100   text-blue-800   dark:bg-blue-900/30   dark:text-blue-300",
  north:    "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300",
  south:    "bg-amber-100  text-amber-800  dark:bg-amber-900/30  dark:text-amber-300",
  east:     "bg-green-100  text-green-800  dark:bg-green-900/30  dark:text-green-300",
  west:     "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300",
};

export function regionBadgeClass(region: string): string {
  return REGION_BADGE[region.toLowerCase()] ?? "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400";
}