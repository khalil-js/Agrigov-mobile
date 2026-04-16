export type CommodityCategory = "Grains" | "Vegetables" | "Tubers" | "Fruits";

export interface CommodityPrice {
  id: string;
  name: string;
  subtitle: string;
  category: CommodityCategory;
  unit: string;
  officialPrice: number; // stored as number for editable math
  lastUpdated: string;
  imageUrl: string;
  imageAlt: string;
  highlighted?: boolean; // e.g. recently edited row highlight
}

export type AuditActorType = "human" | "system";

export interface AuditEntry {
  id: string;
  actorType: AuditActorType;
  actorName: string;
  actorBg: string;
  actorTextColor: string;
  actorIcon: string;
  message: string; // rendered as JSX via dangerouslySetInnerHTML — kept as plain string with <span> markers
  highlightedItem?: string; // commodity name to bold in message
  timeAgo: string;
}

export type ChangeReason =
  | "Seasonal Trend Adjustment"
  | "Inflation Correction"
  | "Supply Shortage"
  | "Government Subsidy Change";



export const commodityPrices: CommodityPrice[] = [
  {
    id: "1",
    name: "Maize (Grade 1)",
    subtitle: "Premium quality",
    category: "Grains",
    unit: "50kg Bag",
    officialPrice: 12.5,
    lastUpdated: "Today, 09:00 AM",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDgpK4N6OriiXuxgAmCQGvidjqMSZEXV2L9JoUAdv9HQkGUeWYHVl2NSbSLvjsL5GleFWom93e3MHhUXiJmcbTrZSfSWvRfDknCm9SpffTZ5GOsGdI5Q-oCRRzhhOTc3JgAlu1Y0BcKE4T86GIli5MRVq-zvB31nDzDZshMlga2-Kb0J6qR6TGoIX7O0970Aoq2nM5QRnSVAWoKh7dMzq4l4kXddcO8bwT6aVGHPCylMcODQXnyW_o9ucuz8XYFfw0xEBn_c_m80MIK",
    imageAlt: "Close-up of golden corn cob",
  },
  {
    id: "2",
    name: "Rice (Long Grain)",
    subtitle: "Standard Import",
    category: "Grains",
    unit: "100kg Sack",
    officialPrice: 45.0,
    lastUpdated: "Oct 22, 2023",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuB6FCkZzV1rFEh7JJR3blngbGd7wHgQRJZ8pBofpmKnaR6M8z8HHVCR5ATkKIRLRq_p2ut1wBXgzTAxQU-AltnOzWwxHEh67_72mihsMkRIIE7ug6qcype_TAcKKXnYhdFltHdwnloGgJHutKBUQpMaow7CWEeOnf04OFiLjKwQrehkKMU7J3U7NeDZWZePNr1aUqoE5QUJkrHFJ5X6dQnEWP0hLLfVEKQhrUqvby1wN1xkqStCUzWW3I0--Sh95AXfNtlv8NCNb6KW",
    imageAlt: "Pile of white rice grains",
    highlighted: true,
  },
  {
    id: "3",
    name: "Tomatoes (Roma)",
    subtitle: "Local Harvest",
    category: "Vegetables",
    unit: "1kg",
    officialPrice: 0.8,
    lastUpdated: "Oct 23, 2023",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDmsQhreaNClg0GwRT1BrhmDzBfiB5JjZkKTXV3TtL8AJv-CxQGWF7N-F7AWENGUh_hvy9ehP6NVooo2ICF3lvUPlK-lN7cH2dtSqYCT6548Wj3VADYhvmFL5TPz0eWJSwd3aKOtxrouMh3lSnr1Exar7OAJiYu0TxCS7KynvF4PK_8Snza5hLFoa1FDbmm7RT_I85qKoTR1fogG0cGbxuwQUPAS-KY8cf4Nc4w7RvJKSx0AXAeuZRFL0pYfNFVwHgkAjXYrvS315QJ",
    imageAlt: "Bright red tomatoes on vine",
  },
  {
    id: "4",
    name: "Potatoes (Russet)",
    subtitle: "High Starch",
    category: "Tubers",
    unit: "10kg Bag",
    officialPrice: 5.2,
    lastUpdated: "Oct 20, 2023",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCRVX2Y0A_UJmKJInClrzN2t7SwnpASLeNbXL-FWdhrsJT-WyCk0OMjEXoURY7q84PU8Z17gaS6rGbAbq1vPP9jyufss4aom1jfI-2sSW6HHqAPgdHxSHfJ8xAEzIZlTtqb8jELG5xI5fivtjI1Db38LaqSzaStMeqoCoQAAckpZ_M-G9EmWv_jPMSP8qASUv67DuLUIz8055K1IT_iWBFHPtLQHchBlCIZvlfFL6UvxikZW9mtnWa8-AOJWdyaa8Zmf7edI5V8e2pJ",
    imageAlt: "Heap of fresh brown potatoes",
  },
  {
    id: "5",
    name: "Onions (Red)",
    subtitle: "Local Harvest",
    category: "Vegetables",
    unit: "1kg",
    officialPrice: 0.65,
    lastUpdated: "Oct 18, 2023",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuD2RU0jn2tWgWQjubahu81Kh2E9WlqFHz8epVjsgrjJ5pbMDQvt2-ZBWMYLLrFga37JWAYbSCgP0Jc-K5fZZv1t1xI0uhZPrMFR3oDOOBj7GpKDg1zkT3A49SVo7lVunq_LkjguTy8-mhmKHCBW4LQXgv-0UXJSj49p4v3CiZ_ec0xUZnD4fTqlNkeVh97eJBOF2GAesG191q2u9L0Ku2pRoV_S8jBi5qtg0OcJrA75Sn-syYpNdyg_RC26kQg_DrsswraLEFSjGb0L",
    imageAlt: "Red onions in a basket",
  },
];

export const auditLog: AuditEntry[] = [
  {
    id: "1",
    actorType: "human",
    actorName: "Jane Doe",
    actorBg: "bg-primary/20",
    actorTextColor: "text-primary-dark dark:text-primary",
    actorIcon: "person",
    message: "Updated <b>Maize (Grade 1)</b> price from $12.00 to $12.50.",
    highlightedItem: "Maize (Grade 1)",
    timeAgo: "10m ago",
  },
  {
    id: "2",
    actorType: "system",
    actorName: "System Auto-correction",
    actorBg: "bg-blue-100 dark:bg-blue-900/30",
    actorTextColor: "text-blue-600 dark:text-blue-400",
    actorIcon: "smart_toy",
    message: "Validated prices against regional index.",
    timeAgo: "2h ago",
  },
  {
    id: "3",
    actorType: "human",
    actorName: "Michael Smith",
    actorBg: "bg-slate-200 dark:bg-slate-700",
    actorTextColor: "text-slate-600 dark:text-slate-300",
    actorIcon: "person",
    message: "Updated <b>Potatoes (Russet)</b> due to seasonal surplus.",
    highlightedItem: "Potatoes (Russet)",
    timeAgo: "Yesterday",
  },
];

export const CHANGE_REASONS: ChangeReason[] = [
  "Seasonal Trend Adjustment",
  "Inflation Correction",
  "Supply Shortage",
  "Government Subsidy Change",
];

export const CATEGORIES = ["All Categories", "Grains & Cereals", "Vegetables", "Fruits", "Tubers"];