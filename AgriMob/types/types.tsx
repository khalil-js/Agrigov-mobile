// types.ts
export interface Product {
  id: number;
  name: string;
  farmer_name: string;
  price: number;
  quantity: number;
  unit: string;
  image: string;
}

export interface Transporter {
  id: number;
  name: string;
  rating: number;
  price: number;
  delivery_time: string;
}
// types.ts
export interface Order {
  id: number;
  order_id: string;
  supplier: string;
  product: string;
  quantity: string;
  amount: number;
  status: "Delivered" | "Pending" | "In Transit" | "Cancelled";
  date: string;
}

export interface Invoice {
  id: number;
  order_id: string;
  supplier: string;
  items: {
    label: string;
    price: number;
  }[];
  total: number;
}