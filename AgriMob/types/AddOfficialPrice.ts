// ─── Form state ───────────────────────────────────────────────────────────────

/** Maps directly to POST /api/official-prices/create/ body */
export interface OfficialPriceForm {
  product:     string;   // numeric string (ministry product ID)
  wilaya:      string;   // empty = national
  min_price:   string;
  max_price:   string;
  unit:        string;
  valid_from:  string;   // datetime-local or ISO string
  valid_until: string;   // empty = no expiry
}

export const EMPTY_FORM: OfficialPriceForm = {
  product:    "",
  wilaya:     "",
  min_price:  "",
  max_price:  "",
  unit:       "kg",
  valid_from: "",
  valid_until:"",
};

// ─── Region variation (UI-only enrichment, not sent to API) ──────────────────

export interface RegionVariation {
  id:           string;
  regionName:   string;
  priceAdjust:  string;
  yieldPercent: number;
}

export const INITIAL_REGIONS: RegionVariation[] = [
  { id: "northern", regionName: "Northern Highlands", priceAdjust: "+4.2%", yieldPercent: 75 },
  { id: "central",  regionName: "Central River Basin", priceAdjust: "-1.5%", yieldPercent: 45 },
];

// ─── Quality standards (static UI) ───────────────────────────────────────────

export interface QualityStandard {
  label: string;
  value: string;
}

export const QUALITY_STANDARDS: QualityStandard[] = [
  { label: "Moisture Content Max", value: "13.5%" },
  { label: "Protein Minimum",      value: "11.0%" },
  { label: "Foreign Matter Max",   value: "0.5%"  },
];

// ─── Nav ──────────────────────────────────────────────────────────────────────

export interface NavItem {
  label:   string;
  icon:    string;
  href:    string;
  active?: boolean;
}

export const CERTIFYING_OFFICIAL = {
  name: "Hon. Marcus Arredondo",
  key:  "AGRIGOV-PR-2026-X892-001",
};

export const COMMODITY_IMAGE_URL =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuArWclP96woaAqZoFMdFCioNyq9EUl2mpZuqanY1Hkz0dB-_jaxhybgc6TFPIzyRHIkqDeJx_6etXK4f-V9aMGNhfMIImasF1piHJ3DVe2z9dMFT7UPm8JuFNmHij4LnCUBqiAQTQF3UU-vOh9KCwWk6Uyq16PgAObQbJEovstvX8qA0k0GwYkJ7uPzo25WI6mcQ-BqKyI-mD_LbqFLArrA34tmt-4CVUI1gcQU3ZW60Ltk_qpxVN_j4kJC5o4k98Y0_-2yRvbt488";