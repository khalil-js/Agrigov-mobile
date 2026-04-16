// ─── API shapes ───────────────────────────────────────────────────────────────

export interface ApiCategory {
  id:   number;
  name: string;
  slug: string;
}

export interface CategoriesApiResponse {
  count:    number;
  next:     string | null;
  previous: string | null;
  results:  ApiCategory[];
}

// ─── Create / Update payload ──────────────────────────────────────────────────

export interface CategoryPayload {
  name:         string;
  slug:         string;
  description?: string;
}

// ─── Nav ──────────────────────────────────────────────────────────────────────

export interface NavItem {
  label:   string;
  icon:    string;
  href:    string;
  active?: boolean;
}

export const NAV_ITEMS: NavItem[] = [
  { label: 'Dashboard',          icon: 'dashboard',  href: '/admin'        },
  { label: 'User Management',    icon: 'group',       href: '/admin/users'  },
  { label: 'Price Regulation',   icon: 'payments',    href: '/prices'       },
  { label: 'Product Categories', icon: 'category',    href: '/admin/categories', active: true },
];

// ─── Static UI-only types (quality standards & certifications panels) ─────────
// These remain local-state only until dedicated API endpoints are added.

export type StandardStatus = 'met' | 'pending';

export interface QualityStandard {
  id:          string;
  name:        string;
  description: string;
  status:      StandardStatus;
}

export interface Certification {
  id:          string;
  name:        string;
  description: string;
  icon:        string;
  appliesTo:   string[];
}

export const INITIAL_QUALITY_STANDARDS: QualityStandard[] = [
  {
    id:          'moisture',
    name:        'Moisture Content',
    description: 'Max threshold: 12.5% for Grains',
    status:      'met',
  },
  {
    id:          'pesticide',
    name:        'Pesticide Residue',
    description: 'Global Standards - Level 0 Compliance',
    status:      'met',
  },
  {
    id:          'uniformity',
    name:        'Size Uniformity',
    description: 'Required for Grade A Export Fruits',
    status:      'pending',
  },
];

export const CERTIFICATIONS: Certification[] = [
  {
    id:          'fssai',
    name:        'FSSAI Registration',
    description: 'Mandatory for all processed vegetable products.',
    icon:        'gavel',
    appliesTo:   ['Grains', 'Fruits'],
  },
  {
    id:          'organic',
    name:        'Organic Certification',
    description: "Optional, enables 'Organic' marketplace tag.",
    icon:        'public',
    appliesTo:   ['All'],
  },
];