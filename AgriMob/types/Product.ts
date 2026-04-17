export type ProductStatus = "Active" | "Out of Stock" | "Draft";

export interface Product {
  id: string;
  name: string;
  type: string;
  variety: string;
  quantity: string;
  price: string;
  marketPrice: string;
  status: ProductStatus;
  image: string;
}