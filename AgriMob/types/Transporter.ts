export type CargoTag = "Perishable" | "Fragile" | "Bulk" | "Livestock";
export type MissionStatus = "In Transit" | "Picked Up" | "Delivered" | "Pending";
export type SidebarTab = "Available" | "My Missions";
export type DriverStatus = "Online" | "Offline" | "On Break";
export type MissionStep = "Picked Up" | "Transit" | "Delivered";

export interface TransportRequest {
  id: string;
  cargo: string;
  tag: CargoTag;
  pay: number;
  weightKg: number;
  distanceKm: number;
  pickup: string;
  dropoff: string;
  estimatedMins: number;
}

export interface ActiveMission {
  missionId: string;
  cargo: string;
  status: MissionStatus;
  etaMins: number;
  currentStep: MissionStep;
}

export interface MapPin {
  id: string;
  label: string;
  sublabel: string;
  topPct: number;
  leftPct: number;
  variant: "pickup" | "dropoff" | "available";
}

export interface StatsWidget {
  id: string;
  label: string;
  value: string;
  badge?: string;
  badgeColor?: string;
}


export const availableRequests: TransportRequest[] = [
  {
    id: "req-1",
    cargo: "Fresh Tomatoes",
    tag: "Perishable",
    pay: 240,
    weightKg: 450,
    distanceKm: 32,
    pickup: "Green Valley Farm, Sector 4",
    dropoff: "Central Wholesale Market",
    estimatedMins: 45,
  },
  {
    id: "req-2",
    cargo: "Eggs Crates (x50)",
    tag: "Fragile",
    pay: 185,
    weightKg: 200,
    distanceKm: 18,
    pickup: "Sunny Side Poultry",
    dropoff: "Metro Supermarket Depot",
    estimatedMins: 30,
  },
  {
    id: "req-3",
    cargo: "Wheat Bags (x120)",
    tag: "Bulk",
    pay: 310,
    weightKg: 1200,
    distanceKm: 55,
    pickup: "Northern Grain Silo",
    dropoff: "City Flour Mill",
    estimatedMins: 70,
  },
  {
    id: "req-4",
    cargo: "Goats (x8)",
    tag: "Livestock",
    pay: 195,
    weightKg: 320,
    distanceKm: 22,
    pickup: "Rift Valley Livestock Hub",
    dropoff: "Eastern Auction Yard",
    estimatedMins: 35,
  },
];

export const activeMission: ActiveMission = {
  missionId: "4029",
  cargo: "Wheat Sack Delivery",
  status: "In Transit",
  etaMins: 15,
  currentStep: "Transit",
};

export const mapPins: MapPin[] = [
  {
    id: "pickup-main",
    label: "Green Valley Farm",
    sublabel: "Pickup",
    topPct: 30,
    leftPct: 40,
    variant: "pickup",
  },
  {
    id: "dropoff-main",
    label: "Central Market",
    sublabel: "Dropoff",
    topPct: 55,
    leftPct: 58,
    variant: "dropoff",
  },
  { id: "avail-1", label: "Farm A", sublabel: "Available", topPct: 20, leftPct: 70, variant: "available" },
  { id: "avail-2", label: "Farm B", sublabel: "Available", topPct: 70, leftPct: 25, variant: "available" },
];

export const statsWidgets: StatsWidget[] = [
  { id: "earnings", label: "Earnings Today", value: "$450.00", badge: "+12%", badgeColor: "text-green-600" },
  { id: "distance", label: "Distance Today", value: "128 km", badge: "4 missions", badgeColor: "text-slate-400" },
];

export const cargoTagStyles: Record<CargoTag, string> = {
  Perishable: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
  Fragile: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300",
  Bulk: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
  Livestock: "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300",
};

export const MISSION_STEPS: ActiveMission["currentStep"][] = ["Picked Up", "Transit", "Delivered"];

export const DRIVER_AVATAR_URL =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuAHBRGuQU6_asTioV4m3wqHr5EpFGAe-XbXh0yGlv6GoRoLqZaC82NpMVObBzDFXoN_vaAvprvLHAaJzMouVwWa3n1KNSNH1MO-RB3-Vea7veEtsz1Lt08TGQWqWsWTfQNHyk3wcbFJPC5sf0fFKq_M9qu0SJBSRX5lXC5scTZbBbDqck_QznySRC8mjLWt6B8e1uTMbwBuOfD27SxFuV0Te8xNyVbpcJpc8KtYwq1oqxzn3CHA5hhmkcGQcOJjd86DbNiTMoh7SLfC";