export type UserRole = "Farmer" | "Buyer" | "Logistics" | "Ministry";
export type RegistrationStep = 1 | 2 | 3;
export type FarmSizeUnit = "Hectares" | "Acres";
export type CropType =
  | "Grains (Maize, Wheat, Rice)"
  | "Tubers (Potatoes, Cassava)"
  | "Vegetables"
  | "Fruits"
  | "Cash Crops (Coffee, Tea)";

export interface StepMeta {
  step: RegistrationStep;
  label: string;
}

export interface BenefitItem {
  icon: string;
  title: string;
  description: string;
}

// Shape of the full multi-step form state
export interface RegistrationFormState {
  role: UserRole;
  // Step 2 – Farm Details
  region: string;
  district: string;
  address: string;
  farmSize: string;
  farmSizeUnit: FarmSizeUnit;
  cropType: CropType;
  documentFile: File | null;
}



export const STEPS: StepMeta[] = [
  { step: 1, label: "Role Selection" },
  { step: 2, label: "Farm Details" },
  { step: 3, label: "Verification" },
];

export const REGIONS = [
  "Central Province",
  "Northern Highlands",
  "Eastern Valley",
  "Southern Coast",
  "Western Arid Zone",
];

export const CROP_TYPES: CropType[] = [
  "Grains (Maize, Wheat, Rice)",
  "Tubers (Potatoes, Cassava)",
  "Vegetables",
  "Fruits",
  "Cash Crops (Coffee, Tea)",
];

export const FARM_SIZE_UNITS: FarmSizeUnit[] = ["Hectares", "Acres"];

export const BENEFITS: BenefitItem[] = [
  {
    icon: "storefront",
    title: "Access National Markets",
    description: "Connect directly with certified buyers across the country.",
  },
  {
    icon: "local_shipping",
    title: "Logistics Support",
    description: "Find reliable transport for your produce instantly.",
  },
  {
    icon: "verified_user",
    title: "Government Verified",
    description: "Secure transactions backed by Ministry verification.",
  },
];

export const HERO_IMAGE_URL =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuAiCwNnG__eTFHibJHSNmLCa_7pojUcP6-fmno8kLC5kJ7Q_b8YDM00daccwMSEiSibxjA5tAPtBlAoaHSTtA0TMkdDRqisOZXW0GSnFQOr-I4VoCoFsGzxw6l0bCxcoKaT1YJSObHN_TYhUfDVBleB7NP7lbXNN88LzBI1jdj8qX6kephMuVK8ekCZXe0UIRtuDOpvISEpS_-VEn0loUXfJB1UD6Kr-lpym6MycVuhEpqta__PH8TUmR_dYeSJ6IOvZk0yVnhsTAU_";

export const COAT_OF_ARMS_URL =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBvkmHZBwILm7OktPXk4IK_hyvJ-vK_cEzDoWh1B0GM-3EpdjSdtt6jL-zTgRNttvo6rjC8rceNODUnCJUbdmlEwuKaaKRRBtOwTfqR7KaQDWzMK-QqI8k6AEaycZAyQcLyv305c07KaYHGdiro7lkFrZQSdWaNfSFtmGLHRenrBhBNnpUf6qbaxYHDFLQGJVwcIbAMzUZXFPaBnfr4VJlHGZpVF6yzMJ6WYJDCFM-rP1yyTKT1_Lnk-UBPtSvKm-C0rzQ1nOiYKTJZ";

// Step progress percentage by step number
export const STEP_PROGRESS: Record<number, number> = { 1: 33, 2: 66, 3: 100 };

export const ROLE_ICONS: Record<string, string> = {
  Farmer: "agriculture",
  Buyer: "storefront",
  Logistics: "local_shipping",
  Ministry: "account_balance",
};