import { apiFetch } from "./api";

export interface OfficialPrice {
  id: number;
  product_name: string;
  price: number;
  wilaya: string | null;
  region: string | null;
  start_date: string;
  end_date: string | null;
  is_active: boolean;
}

export const officialPriceApi = {
  activePrices: () => apiFetch<OfficialPrice[]>("/api/official-prices/active/"),
  currentPrice: (productId: number, wilaya?: string) => {
    let url = `/api/official-prices/current/?product_id=${productId}`;
    if (wilaya) url += `&wilaya=${wilaya}`;
    return apiFetch<OfficialPrice>(url);
  },
};
