export type AlertSeverity = "danger" | "warning" | "info";
export type SprayingConditionStatus = "Good" | "Moderate" | "Poor";

export interface WeatherZone {
  id: string;
  label: string;
}

export interface AgMetric {
  id: string;
  label: string;
  value: string;
  unit?: string;
  subLabel?: string;
  barPct?: number;
  barColor?: string; // tailwind bg-* class
  highlight?: boolean; // use primary colour for value
}

export interface ForecastDay {
  id: string;
  label: string;
  isToday?: boolean;
  icon: string;
  iconColor: string;
  highC: number;
  lowC: number;
  precipPct: number;
  precipColor: string; // text-* class
}

export interface SoilMoistureBar {
  heightPct: number;
  opacityClass: string; // e.g. "bg-primary/30"
}

export interface SprayingCondition {
  id: string;
  label: string;
  status: string;
  statusColor: string; // text-* class
  barPct: number;
  barColor: string; // bg-* class
}

export interface SeasonalInsight {
  id: string;
  icon: string;
  iconColor: string;
  title: string;
  body: string;
}

export interface PlatformAction {
  id: string;
  href: string;
  icon: string;
  iconBg: string;
  iconColor: string;
  iconHoverBg: string;
  iconHoverText: string;
  title: string;
  subtitle: string;
}

export interface SmartAlert {
  id: string;
  severity: AlertSeverity;
  title: string;
  message: string;
}



export const ZONES: WeatherZone[] = [
  { id: "4b", label: "Zone 4b: Northern Highlands" },
  { id: "3a", label: "Zone 3a: Central Valley" },
  { id: "1", label: "Zone 1: Coastal Plains" },
];

export const currentConditions = {
  tempC: 14,
  feelsLikeC: 12,
  condition: "Mostly Cloudy",
  icon: "cloud_queue",
};

export const agMetrics: AgMetric[] = [
  { id: "soil", label: "Soil Moisture", value: "42%", subLabel: "Adequate", barPct: 42, barColor: "bg-primary", highlight: true },
  { id: "precip", label: "Precip Prob", value: "15%", subLabel: "Low", barPct: 15, barColor: "bg-blue-400" },
  { id: "wind", label: "Wind Speed", value: "12", unit: "km/h NW", subLabel: "Gusts to 20km/h" },
  { id: "et", label: "Evapotranspiration", value: "3.2", unit: "mm/day" },
  { id: "leaf", label: "Leaf Wetness", value: "Dry", unit: "0h" },
  { id: "uv", label: "UV Index", value: "Low", unit: "(2)", highlight: true },
];

export const forecast: ForecastDay[] = [
  { id: "today", label: "Today", isToday: true, icon: "cloud", iconColor: "text-white", highC: 14, lowC: 6, precipPct: 15, precipColor: "text-blue-300" },
  { id: "wed", label: "Wed", icon: "ac_unit", iconColor: "text-blue-400", highC: 8, lowC: -1, precipPct: 5, precipColor: "text-blue-300" },
  { id: "thu", label: "Thu", icon: "wb_sunny", iconColor: "text-yellow-400", highC: 12, lowC: 2, precipPct: 0, precipColor: "text-gray-500" },
  { id: "fri", label: "Fri", icon: "wb_cloudy", iconColor: "text-white", highC: 15, lowC: 5, precipPct: 10, precipColor: "text-gray-500" },
  { id: "sat", label: "Sat", icon: "grain", iconColor: "text-blue-400", highC: 13, lowC: 8, precipPct: 60, precipColor: "text-blue-400 font-bold" },
  { id: "sun", label: "Sun", icon: "rainy", iconColor: "text-blue-500", highC: 11, lowC: 7, precipPct: 90, precipColor: "text-blue-400 font-bold" },
  { id: "mon", label: "Mon", icon: "cloud", iconColor: "text-white", highC: 13, lowC: 6, precipPct: 30, precipColor: "text-blue-300" },
];

// 12 bars going from 40% → 25% height (drying trend)
export const soilMoistureBars: SoilMoistureBar[] = [
  { heightPct: 40, opacityClass: "bg-primary/30" },
  { heightPct: 45, opacityClass: "bg-primary/30" },
  { heightPct: 42, opacityClass: "bg-primary/40" },
  { heightPct: 40, opacityClass: "bg-primary/40" },
  { heightPct: 38, opacityClass: "bg-primary/50" },
  { heightPct: 35, opacityClass: "bg-primary/50" },
  { heightPct: 32, opacityClass: "bg-primary/60" },
  { heightPct: 30, opacityClass: "bg-primary/60" },
  { heightPct: 30, opacityClass: "bg-primary/70" },
  { heightPct: 28, opacityClass: "bg-primary/80" },
  { heightPct: 26, opacityClass: "bg-primary/90" },
  { heightPct: 25, opacityClass: "bg-primary" },
];

export const sprayingConditions: SprayingCondition[] = [
  { id: "wind", label: "Wind Speed", status: "Good (< 15km/h)", statusColor: "text-primary", barPct: 40, barColor: "bg-primary" },
  { id: "temp", label: "Temperature", status: "Good (14°C)", statusColor: "text-primary", barPct: 60, barColor: "bg-primary" },
  { id: "rain", label: "Rain Risk (Next 4h)", status: "Moderate", statusColor: "text-yellow-500", barPct: 20, barColor: "bg-yellow-500" },
];

export const seasonalInsights: SeasonalInsight[] = [
  {
    id: "q4",
    icon: "calendar_month",
    iconColor: "text-primary",
    title: "Q4 Projection",
    body: "Higher than average rainfall expected (120% of normal). Delay late planting of root crops.",
  },
  {
    id: "pest",
    icon: "bug_report",
    iconColor: "text-yellow-500",
    title: "Pest Alert",
    body: "Conditions favorable for Fall Armyworm. Monitor maize crops closely.",
  },
];

export const platformActions: PlatformAction[] = [
  {
    id: "transport",
    href: "/transporter",
    icon: "local_shipping",
    iconBg: "bg-blue-500/10",
    iconColor: "text-blue-400",
    iconHoverBg: "group-hover:bg-blue-500",
    iconHoverText: "group-hover:text-white",
    title: "Transporters",
    subtitle: "3 trucks available near you",
  },
  {
    id: "market",
    href: "/products",
    icon: "storefront",
    iconBg: "bg-primary/10",
    iconColor: "text-primary",
    iconHoverBg: "group-hover:bg-primary",
    iconHoverText: "group-hover:text-background-dark",
    title: "Market Prices",
    subtitle: "Maize up 2% today",
  },
  {
    id: "chat",
    href: "#",
    icon: "forum",
    iconBg: "bg-purple-500/10",
    iconColor: "text-purple-400",
    iconHoverBg: "group-hover:bg-purple-500",
    iconHoverText: "group-hover:text-white",
    title: "Agronomist Chat",
    subtitle: "Ask about frost protection",
  },
];

export const smartAlerts: SmartAlert[] = [
  {
    id: "frost",
    severity: "danger",
    title: "Frost Warning Alert",
    message:
      "Temperatures are expected to drop to -1°C between 03:00 AM and 06:00 AM tomorrow. Frost accumulation is highly likely on exposed vegetation. Recommended action: Cover sensitive seedlings and activate frost fans in orchards.",
  },
];

export const SEASONAL_MAP_URL =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuA7VyJkEf3rp3IYCrVQr0cHtK4M0pu2Xr3Lm1O1ImJi_4GCiw5tE29YzOZGmrOOJ7sX7M-KTswtO7xWYRZSq2vPO0W1sBCf0mTClXAwk8-2EAr-mjfkbHg4IeJ6OrCA0U1KPglo2jPYMcIwfMzKScaJareoddwKHZ8yIJYW4a-zssbRPqWwVAT9Sh0HYtg2DkQTdJAkFYGz4OpdyxO1JN6pMuQyDNk7dlN_8HhLwKixZBjFHn9AwV1LvAMcVrYtmXiQWm08wU8V6GnW";

export const USER_AVATAR_URL =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuD_yNZ7q4zu0-9XfUky7BYgZcL6JinRL3DcysjHdTeUpQELyow4aULux3GHLue-BgoObPtlT2KOtsPJJtra3lik1t1Baswj8inSCmBJZa8bAVcuuPgihdYBNuncYavjV-5rWY8yAWvueEZ8x6oVfPigALMvO91GXuh2J-YoyzsI9igAEzseivQeels68adAQKclOfijnzAM7GFI3W57rSXUmsVadcS5vAefx3U1Blwy2BYRs2mPUdFPtrpRBhs0i2yLbBD6whW_3qDW";