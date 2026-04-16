export type OrderStatus =
  | "Pending Pickup"
  | "Loaded"
  | "In Transit"
  | "Delivered"
  | "Issue Reported";

export interface LogisticsOrder {
  id: string;
  orderId: string;
  buyer: string;
  commodity: string;
  weight: string;
  transporter: string;
  status: OrderStatus;
  hasIssue?: boolean;
}

export interface StatCard {
  id: string;
  icon: string;
  iconColor: string;
  label: string;
  value: string;
  footerBg: string;
  footerText: string;
  footerNote: string;
}

export interface PickupEvent {
  id: string;
  dateLabel: string; // e.g. "OCT\n24"
  transporter: string;
  timeWindow: string;
  orderId: string;
  commodity: string;
  isToday?: boolean;
}



export const statCards: StatCard[] = [
  {
    id: "pickup",
    icon: "inventory_2",
    iconColor: "text-orange-500",
    label: "Ready for Pickup",
    value: "12 Orders",
    footerBg: "bg-orange-50 dark:bg-orange-900/20",
    footerText: "text-orange-700 dark:text-orange-300",
    footerNote: "3 trucks arriving today",
  },
  {
    id: "transit",
    icon: "local_shipping",
    iconColor: "text-blue-500",
    label: "In Transit",
    value: "8 Shipments",
    footerBg: "bg-blue-50 dark:bg-blue-900/20",
    footerText: "text-blue-700 dark:text-blue-300",
    footerNote: "All on schedule",
  },
  {
    id: "delivered",
    icon: "task_alt",
    iconColor: "text-primary-dark dark:text-primary",
    label: "Delivered (Week)",
    value: "24 Orders",
    footerBg: "bg-primary/10",
    footerText: "text-green-800 dark:text-green-300",
    footerNote: "+12% vs last week",
  },
  {
    id: "ontime",
    icon: "trending_up",
    iconColor: "text-purple-500",
    label: "On-Time Rate",
    value: "98%",
    footerBg: "bg-purple-50 dark:bg-purple-900/20",
    footerText: "text-purple-700 dark:text-purple-300",
    footerNote: "Exceeding logistics targets",
  },
];

export const logisticsOrders: LogisticsOrder[] = [
  {
    id: "1",
    orderId: "#ORD-4022",
    buyer: "FreshMarket Inc.",
    commodity: "Corn (Maize)",
    weight: "5.0 Tons",
    transporter: "SwiftHaul Logistics",
    status: "Pending Pickup",
  },
  {
    id: "2",
    orderId: "#ORD-4019",
    buyer: "Gov Grain Reserve",
    commodity: "Wheat",
    weight: "12.5 Tons",
    transporter: "AgriTrans Co.",
    status: "Loaded",
  },
  {
    id: "3",
    orderId: "#ORD-3988",
    buyer: "City Supermarkets",
    commodity: "Tomatoes",
    weight: "2.0 Tons",
    transporter: "FastFresh Logistics",
    status: "In Transit",
  },
  {
    id: "4",
    orderId: "#ORD-3850",
    buyer: "Organic Wholesalers",
    commodity: "Soybeans",
    weight: "8.0 Tons",
    transporter: "GreenRoute",
    status: "Delivered",
  },
  {
    id: "5",
    orderId: "#ORD-3721",
    buyer: "Local Cannery",
    commodity: "Peas",
    weight: "1.5 Tons",
    transporter: "LogiLink",
    status: "Issue Reported",
    hasIssue: true,
  },
];

export const pickupEvents: PickupEvent[] = [
  {
    id: "1",
    dateLabel: "OCT 24",
    transporter: "SwiftHaul Logistics",
    timeWindow: "08:00 AM – 10:00 AM",
    orderId: "#4022",
    commodity: "Corn (Maize)",
    isToday: true,
  },
  {
    id: "2",
    dateLabel: "OCT 25",
    transporter: "AgriTrans Co.",
    timeWindow: "01:00 PM – 03:00 PM",
    orderId: "#4025",
    commodity: "Rice",
  },
  {
    id: "3",
    dateLabel: "OCT 27",
    transporter: "Gov Grain Reserve",
    timeWindow: "09:30 AM",
    orderId: "#4030",
    commodity: "Wheat",
  },
];