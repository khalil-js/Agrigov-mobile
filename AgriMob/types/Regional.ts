export interface MapRegionDef {
  id: string;
  name: string;
  path: string;
  markerCx?: number;
  markerCy?: number;
}

export interface RegionDetail {
  id: string;
  name: string;
  status: string;
  statusTrend: "up" | "down" | "flat";
  totalVolume: string;
  activeFarmers: string;
  topCrops: { label: string; icon: string; iconColor: string }[];
}

export interface RegionRanking {
  id: string;
  rank: number;
  name: string;
  crops: string;
  contribution: number; // percentage as a number e.g. 22
}

export type AlertSeverity = "danger" | "info" | "warning";

export interface RegionalAlert {
  id: string;
  severity: AlertSeverity;
  icon: string;
  title: string;
  message: string;
}

export type SeasonOption = "Q3 2023" | "Q2 2023" | "Q1 2023";
export type CropTypeOption = "All Crops" | "Wheat & Grains" | "Vegetables" | "Fruits";
export type MetricOption = "Production Vol." | "Revenue" | "Farmer Count";



export const mapRegions: MapRegionDef[] = [
  {
    id: "north-valley",
    name: "North Valley",
    path: "M 250,150 L 350,120 L 450,160 L 420,250 L 300,280 L 220,220 Z",
    markerCx: 350,
    markerCy: 200,
  },
  {
    id: "eastern-highlands",
    name: "Eastern Highlands",
    path: "M 450,160 L 580,140 L 650,220 L 600,320 L 480,300 L 420,250 Z",
  },
  {
    id: "central-plains",
    name: "Central Plains",
    path: "M 300,280 L 420,250 L 480,300 L 450,420 L 320,450 L 250,350 Z",
  },
  {
    id: "southern-coast",
    name: "Southern Coast",
    path: "M 320,450 L 450,420 L 550,480 L 500,550 L 350,580 L 280,500 Z",
  },
  {
    id: "western-arid",
    name: "Western Arid",
    path: "M 150,250 L 220,220 L 300,280 L 250,350 L 180,420 L 100,320 Z",
  },
];

export const regionDetails: Record<string, RegionDetail> = {
  "north-valley": {
    id: "north-valley",
    name: "North Valley",
    status: "Performing Well",
    statusTrend: "up",
    totalVolume: "45.2k",
    activeFarmers: "1,240",
    topCrops: [
      { label: "Wheat", icon: "grass", iconColor: "text-primary-dark" },
      { label: "Corn", icon: "agriculture", iconColor: "text-amber-600" },
      { label: "Cotton", icon: "local_florist", iconColor: "text-red-500" },
    ],
  },
  "eastern-highlands": {
    id: "eastern-highlands",
    name: "Eastern Highlands",
    status: "Stable Growth",
    statusTrend: "up",
    totalVolume: "31.7k",
    activeFarmers: "890",
    topCrops: [
      { label: "Fruits", icon: "local_florist", iconColor: "text-orange-500" },
      { label: "Tea", icon: "grass", iconColor: "text-green-600" },
    ],
  },
  "central-plains": {
    id: "central-plains",
    name: "Central Plains",
    status: "Top Producer",
    statusTrend: "up",
    totalVolume: "62.1k",
    activeFarmers: "2,100",
    topCrops: [
      { label: "Wheat", icon: "grass", iconColor: "text-primary-dark" },
      { label: "Barley", icon: "agriculture", iconColor: "text-amber-600" },
    ],
  },
  "southern-coast": {
    id: "southern-coast",
    name: "Southern Coast",
    status: "Moderate Output",
    statusTrend: "flat",
    totalVolume: "28.4k",
    activeFarmers: "740",
    topCrops: [
      { label: "Rice", icon: "grass", iconColor: "text-primary-dark" },
      { label: "Fish", icon: "water", iconColor: "text-blue-500" },
    ],
  },
  "western-arid": {
    id: "western-arid",
    name: "Western Arid",
    status: "Below Average",
    statusTrend: "down",
    totalVolume: "14.2k",
    activeFarmers: "310",
    topCrops: [
      { label: "Dates", icon: "local_florist", iconColor: "text-amber-700" },
      { label: "Livestock", icon: "agriculture", iconColor: "text-slate-500" },
    ],
  },
};

export const regionRankings: RegionRanking[] = [
  { id: "central-plains", rank: 1, name: "Central Plains", crops: "Wheat, Barley", contribution: 22 },
  { id: "north-valley", rank: 2, name: "North Valley", crops: "Corn, Soy", contribution: 18.5 },
  { id: "eastern-highlands", rank: 3, name: "Eastern Highlands", crops: "Fruits, Tea", contribution: 15 },
  { id: "southern-coast", rank: 4, name: "Southern Coast", crops: "Rice, Fish", contribution: 12.2 },
  { id: "western-arid", rank: 5, name: "Western Arid", crops: "Dates, Livestock", contribution: 8.4 },
  { id: "lakeside", rank: 6, name: "Lakeside District", crops: "Fish, Cassava", contribution: 6.1 },
];

export const regionalAlerts: RegionalAlert[] = [
  {
    id: "1",
    severity: "danger",
    icon: "warning",
    title: "Drought Warning",
    message: "North-East Region reports water levels below 40% critical threshold.",
  },
  {
    id: "2",
    severity: "info",
    icon: "info",
    title: "Subsidy Update",
    message: "New fertilizer subsidies available for Wheat farmers.",
  },
];

// 4×4 heatmap grid opacity values
export const heatmapGrid: number[] = [
  0.2, 0.4, 0.8, 0.6,
  0.9, 0.3, 0.5, 0.9,
  0.4, 1.0, 0.7, 0.2,
  0.6, 0.4, 0.8, 0.3,
];

export const SEASONS: SeasonOption[] = ["Q3 2023", "Q2 2023", "Q1 2023"];
export const CROP_TYPES: CropTypeOption[] = ["All Crops", "Wheat & Grains", "Vegetables", "Fruits"];
export const METRICS: MetricOption[] = ["Production Vol.", "Revenue", "Farmer Count"];

export const heatmapTitles: Record<number, string> = {
  0.2: "Low Yield",
  0.4: "Medium Yield",
  0.8: "High Yield",
  0.6: "Medium-High Yield",
  0.9: "Very High Yield",
  0.3: "Below Average",
  0.5: "Average",
  1.0: "Peak Yield",
  0.7: "Above Average",
};