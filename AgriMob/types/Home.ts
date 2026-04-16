export interface TickerItem {
  emoji: string;
  label: string;
  price: string;
  trend: "up" | "down" | "flat";
}

export interface PriceRow {
  id: string;
  emoji: string;
  emojiBg: string;
  commodity: string;
  region: string;
  unit: string;
  price: string;
  change: string;
  changePct: string;
  trend: "up" | "down" | "flat";
}

export interface PersonaCard {
  id: string;
  icon: string;
  title: string;
  description: string;
  cta: string;
  href: string;
  iconBgLight: string;
  iconBgDark: string;
  iconColorLight: string;
  iconColorDark: string;
  ctaColor: string;
  hoverBg: string;
  hoverText: string;
}

export interface NewsArticle {
  id: string;
  featured: boolean;
  category: string;
  date?: string;
  title: string;
  excerpt: string;
  ctaLabel: string;
  href: string;
  imageUrl?: string;
  imageAlt?: string;
}

export interface Stat {
  id: string;
  icon: string;
  value: string;
  label: string;
}

export const tickerItems: TickerItem[] = [
  { emoji: "🌽", label: "Maize (White)", price: "$240/ton", trend: "up" },
  { emoji: "🌾", label: "Rice (Long Grain)", price: "$520/ton", trend: "down" },
  { emoji: "🥔", label: "Potatoes (Irish)", price: "$310/ton", trend: "up" },
  { emoji: "☕", label: "Coffee (Arabica)", price: "$3,400/ton", trend: "up" },
  { emoji: "🧅", label: "Onions (Red)", price: "$180/ton", trend: "down" },
  { emoji: "🌱", label: "Soybeans", price: "$450/ton", trend: "up" },
];

export const priceRows: PriceRow[] = [
  {
    id: "maize",
    emoji: "🌽",
    emojiBg: "bg-yellow-100",
    commodity: "Maize (White)",
    region: "Central Region",
    unit: "Per Ton",
    price: "$240.00",
    change: "▲ 2.4%",
    changePct: "2.4",
    trend: "up",
  },
  {
    id: "carrots",
    emoji: "🥕",
    emojiBg: "bg-orange-100",
    commodity: "Carrots",
    region: "Highlands",
    unit: "Per Sack (90kg)",
    price: "$45.50",
    change: "▼ 1.2%",
    changePct: "1.2",
    trend: "down",
  },
  {
    id: "rice",
    emoji: "🍚",
    emojiBg: "bg-white border border-slate-200",
    commodity: "Rice (Basmati)",
    region: "Coastal Zone",
    unit: "Per Ton",
    price: "$820.00",
    change: "- 0.0%",
    changePct: "0.0",
    trend: "flat",
  },
  {
    id: "tomatoes",
    emoji: "🍅",
    emojiBg: "bg-red-100",
    commodity: "Tomatoes",
    region: "Valley Region",
    unit: "Crate (60kg)",
    price: "$32.00",
    change: "▲ 5.8%",
    changePct: "5.8",
    trend: "up",
  },
];

export const personaCards: PersonaCard[] = [
  {
    id: "farmer",
    icon: "grass",
    title: "For Farmers",
    description:
      "List your produce directly to verified buyers. Access real-time market prices, weather alerts, and government subsidies.",
    cta: "Register as Farmer",
    href: "#",
    iconBgLight: "bg-green-100",
    iconBgDark: "dark:bg-green-900/30",
    iconColorLight: "text-green-700",
    iconColorDark: "dark:text-primary",
    ctaColor: "text-primary hover:text-primary-dark",
    hoverBg: "group-hover:bg-primary",
    hoverText: "group-hover:text-black",
  },
  {
    id: "buyer",
    icon: "storefront",
    title: "For Buyers",
    description:
      "Source quality produce directly from the farm. Secure payments, track shipments, and manage bulk orders efficiently.",
    cta: "Register as Buyer",
    href: "#",
    iconBgLight: "bg-blue-100",
    iconBgDark: "dark:bg-blue-900/30",
    iconColorLight: "text-blue-700",
    iconColorDark: "dark:text-blue-400",
    ctaColor: "text-blue-600 dark:text-blue-400 hover:text-blue-700",
    hoverBg: "group-hover:bg-blue-600",
    hoverText: "group-hover:text-white",
  },
  {
    id: "transporter",
    icon: "local_shipping",
    title: "For Transporters",
    description:
      "Find loads nearby and optimize your routes. Get guaranteed payments and manage your fleet logistics seamlessly.",
    cta: "Register as Transporter",
    href: "#",
    iconBgLight: "bg-orange-100",
    iconBgDark: "dark:bg-orange-900/30",
    iconColorLight: "text-orange-700",
    iconColorDark: "dark:text-orange-400",
    ctaColor: "text-orange-600 dark:text-orange-400 hover:text-orange-700",
    hoverBg: "group-hover:bg-orange-600",
    hoverText: "group-hover:text-white",
  },
];

export const newsArticles: NewsArticle[] = [
  {
    id: "featured",
    featured: true,
    category: "Featured",
    title: "Digital Farming Subsidy Program Launch",
    excerpt:
      "The Ministry announces a new grant for small-scale farmers adopting IoT and digital tracking tools for improved yield.",
    ctaLabel: "Read Full Story",
    href: "#",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDZGRGj13VJa0TUC5DYrpQbMEblf1OOZguNHddCw7R9LaldrCjEinGEjU0vbJU2mmPRDdDWuOq7wxHO-ZuhCScWeQpwdxBPiExOIHSrf38ozVh5cR6FGUCvG_dZfVCOrRIMi8iA2L5H8vFHFojeG_rY1ZBcbjLxXoRCLF-m3Qdr7L6MbP2MZei8GrzM7F4a9mSA2wAm1lkU4MYbyEN-xeQpl9aCm6VXDjLBHae5uGPjvYWRqC2MidDnThg3pD8L02-XLKM90ivJnI-u",
    imageAlt: "Person inspecting plants in a greenhouse with tablet",
  },
  {
    id: "el-nino",
    featured: false,
    date: "Oct 24, 2023",
    category: "Weather Alert",
    title: "El Niño Preparedness Guidelines",
    excerpt:
      "Updated guidelines for water harvesting and crop protection for the upcoming rainy season.",
    ctaLabel: "Download Guide",
    href: "#",
  },
  {
    id: "coffee",
    featured: false,
    date: "Oct 22, 2023",
    category: "Market Trend",
    title: "Coffee Exports Rise by 15%",
    excerpt:
      "Quarterly report shows strong international demand for local Arabica coffee beans.",
    ctaLabel: "View Report",
    href: "#",
  },
];

export const nationalStats: Stat[] = [
  { id: "farmers", icon: "groups", value: "2.5M+", label: "Registered Farmers" },
  { id: "transactions", icon: "shopping_bag", value: "50k+", label: "Daily Transactions" },
  { id: "counties", icon: "warehouse", value: "47", label: "Connected Counties" },
];

export const footerQuickLinks = [
  { label: "Marketplace", href: "#" },
  { label: "Price Analytics", href: "#" },
  { label: "Register as Farmer", href: "#" },
  { label: "Register as Buyer", href: "#" },
];

export const footerSupportLinks = [
  { label: "Help Center", href: "#" },
  { label: "Report a Problem", href: "#" },
  { label: "Contact Ministry", href: "#" },
  { label: "Privacy Policy", href: "#" },
];