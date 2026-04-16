// ─── UI types (unchanged) ─────────────────────────────────────────────────────

export type VerificationStepStatus = 'complete' | 'pending';

export interface VerificationStep {
  id:     string;
  label:  string;
  status: VerificationStepStatus;
}

export interface IdentityDetail {
  label: string;
  value: string;
}

export interface FarmDocument {
  id:          string;
  title:       string;
  subtitle:    string;
  icon:        string;
  iconBgClass: string;
  imageUrl?:   string;   // real Cloudinary URL from the API
}

export interface ActivityEvent {
  id:        string;
  title:     string;
  timestamp: string;
  body:      string;
  isActive:  boolean;
}

export interface FarmerSubmission {
  id:           string;
  name:         string;
  legalName:    string;
  idNumber:     string;
  dobExpiry:    string;
  role:         string;
  submittedAt:  string;
  avatarUrl:    string;
  idCardUrl:    string;
  mapImageUrl:  string;
  farmName:     string;
  farmCoords:   string;
  farmHectares: number;
}

export interface NavItem {
  label:   string;
  icon:    string;
  href:    string;
  active?: boolean;
  filled?: boolean;
}

// ─── API types ────────────────────────────────────────────────────────────────

export interface ApiValidation {
  is_validated:     boolean;
  validated_at:     string | null;
  validated_by:     string | null;
  rejection_reason: string;
  rejected_at:      string | null;
}

export interface ApiFarmerProfile {
  type:      'farmer';
  age:       number;
  wilaya:    string;
  baladiya:  string;
  farm_size: number;
  address:   string;
  documents: {
    farmer_card_image: string;
    national_id_image: string;
  };
  validation: ApiValidation;
}

export interface ApiTransporterProfile {
  type:     'transporter';
  age:      number;
  wilaya:   string;
  baladiya: string;
  documents: {
    driver_license_image: string;
    grey_card_image:      string;
  };
  validation: ApiValidation;
}

export interface ApiBuyerProfile {
  type: 'buyer';
  age:  number;
  documents: {
    business_license_image: string;
  };
  validation: ApiValidation;
}

export type ApiProfile = ApiFarmerProfile | ApiTransporterProfile | ApiBuyerProfile;

export interface ApiUserDetail {
  id:          number;
  email:       string;
  username:    string;
  phone:       string;
  role:        'FARMER' | 'BUYER' | 'TRANSPORTER';
  is_verified: boolean;
  is_active:   boolean;
  created_at:  string;
  profile:     ApiProfile;
}

export interface ApiUserDetailResponse {
  status: string;
  code:   number;
  data: {
    user: ApiUserDetail;
  };
}

// ─── Validation endpoints response ───────────────────────────────────────────

export interface ApiValidateResponse {
  status: string;
  code:   number;
  message: string;
  data: {
    user: { id: number; is_verified: boolean };
    profile: { is_validated: boolean; validated_at: string; validated_by: string };
  };
}

export interface ApiRejectResponse {
  status: string;
  code:   number;
  message: string;
  data: {
    user: { id: number; role: string };
    rejection: { reason: string; rejected_at: string; rejected_by: string };
  };
}

// ─── Mappers: API → UI ────────────────────────────────────────────────────────

export function buildIdentityDetails(user: ApiUserDetail): IdentityDetail[] {
  const p = user.profile;
  const details: IdentityDetail[] = [
    { label: 'Email',    value: user.email },
    { label: 'Username', value: user.username },
    { label: 'Phone',    value: user.phone },
    { label: 'Age',      value: `${p.age} years old` },
  ];

  if (p.type === 'farmer') {
    if (p.wilaya)   details.push({ label: 'Wilaya',   value: p.wilaya });
    if (p.baladiya) details.push({ label: 'Baladiya', value: p.baladiya });
    if (p.address)  details.push({ label: 'Address',  value: p.address });
    details.push({ label: 'Farm Size', value: `${p.farm_size} ha` });
  } else if (p.type === 'transporter') {
    if (p.wilaya)   details.push({ label: 'Wilaya',   value: p.wilaya || '—' });
    if (p.baladiya) details.push({ label: 'Baladiya', value: p.baladiya || '—' });
  }

  return details;
}

export function buildDocuments(user: ApiUserDetail): FarmDocument[] {
  const p = user.profile;

  if (p.type === 'farmer') {
    return [
      {
        id:          'farmer-card',
        title:       'Farmer Registration Card',
        subtitle:    'Official Agricultural Registry Document',
        icon:        'badge',
        iconBgClass: 'bg-primary/10 text-primary',
        imageUrl:    p.documents.farmer_card_image,
      },
      {
        id:          'national-id',
        title:       'National Identity Card',
        subtitle:    'Government-issued national ID',
        icon:        'fingerprint',
        iconBgClass: 'bg-blue-100/50 dark:bg-blue-900/20 text-blue-600',
        imageUrl:    p.documents.national_id_image,
      },
    ];
  }

  if (p.type === 'transporter') {
    return [
      {
        id:          'driver-license',
        title:       'Driver Licence',
        subtitle:    'Commercial vehicle operator permit',
        icon:        'directions_car',
        iconBgClass: 'bg-primary/10 text-primary',
        imageUrl:    p.documents.driver_license_image,
      },
      {
        id:          'grey-card',
        title:       'Vehicle Grey Card',
        subtitle:    'Vehicle registration certificate',
        icon:        'article',
        iconBgClass: 'bg-slate-200/50 dark:bg-slate-700 text-slate-600 dark:text-slate-300',
        imageUrl:    p.documents.grey_card_image,
      },
    ];
  }

  if (p.type === 'buyer') {
    return [
      {
        id:          'business-license',
        title:       'Business Licence',
        subtitle:    'Commercial trading authorisation',
        icon:        'store',
        iconBgClass: 'bg-purple-100/50 dark:bg-purple-900/20 text-purple-600',
        imageUrl:    p.documents.business_license_image,
      },
    ];
  }

  return [];
}

/** Primary ID card URL shown large in IdentityVerificationCard */
export function primaryDocUrl(user: ApiUserDetail): string {
  const p = user.profile;
  if (p.type === 'farmer')      return p.documents.national_id_image;
  if (p.type === 'transporter') return p.documents.driver_license_image;
  if (p.type === 'buyer')       return p.documents.business_license_image;
  return '';
}

/** Human-readable role label */
export function roleLabel(role: string): string {
  const map: Record<string, string> = {
    FARMER:      'New Farmer',
    TRANSPORTER: 'New Transporter',
    BUYER:       'New Buyer',
  };
  return map[role] ?? role;
}

// ─── Static sidebar nav ───────────────────────────────────────────────────────

export const TOP_NAV: NavItem[] = [
  { label: 'Dashboard',    icon: '', href: '/admin'                      },
  { label: 'Verification', icon: '', href: '/admin/registrations', active: true },
  { label: 'Reports',      icon: '', href: '/admin/reports'              },
];

export const SIDEBAR_NAV: NavItem[] = [
  { label: 'Dashboard',    icon: 'dashboard',    href: '/admin'                        },
  { label: 'Verification', icon: 'agriculture',  href: '/admin/registrations', active: true, filled: true },
  { label: 'Fields',       icon: 'potted_plant', href: '/regional'                    },
  { label: 'Inventory',    icon: 'inventory_2',  href: '/inventory'                   },
  { label: 'Reports',      icon: 'analytics',    href: '/admin/reports'               },
];

export const BREADCRUMBS = ['Admin', 'Registrations', 'Pending Review'] as const;

export const ADMIN_AVATAR_URL =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuB9eSB4RV_Ahjjq8_rSrfRX0lpajaiPuYzxN7v6Zrt8wRbuo_5qCKu-UWyefWNwhyeB-_qZyi_kQvLpOUw0Ss5ypzNf91IUkLhx11W7N4ZjYeVAXqBoSTeWN-FpYKGnIjnUoWbb6odINc313xo8ag6z3SR7qdW5FyRcm1wfwAMSArWE7WrBo8tgfbY_Qb4UFuJrAL70qQgX9PE6pcICVJuEih7WHEXcw5orLVwVQmfipdpJWEv2Dvk4LvgCHzgV7ZzhZ_fUcOm7Zyw';

// Static map placeholder (no map URL from API)
export const STATIC_MAP_URL =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuA0dhR9sB9P9WNWRn6X0u29OajVblFa7vt4rwa13OFVS9S8WeUtbew-NV4BC2kjCsGv5PPbkIumkK0ufb4sEARRXhXduuZTrEylWIyfRD9lWAzsAbAIMF1e2X7FaIogp8nIR-hpFVaisHTWPENiJecuHCD4KcFoOnNTNqIPdod74oABzv3tK8EOmiLyuIMmX0QB5PmJYH4wOs2EGRK8HwAtPsxjDjSTn8am6s7lTAL4XEeY6inhiCE8OrDuNWfD4Ys175XJPEDenQY';

export const STATIC_VERIFICATION_STEPS: VerificationStep[] = [
  { id: 'phone-email', label: 'Phone & Email Verified',  status: 'complete' },
  { id: 'biometric',   label: 'Biometric Identity Check', status: 'complete' },
  { id: 'ai-registry', label: 'Registry Doc Check (AI)',  status: 'complete' },
  { id: 'human-audit', label: 'Human Document Audit',     status: 'pending'  },
];