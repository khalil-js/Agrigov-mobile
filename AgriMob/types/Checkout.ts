export type PaymentTab = "credit_card" | "mobile_money" | "bank_transfer";

export interface Transporter {
  id: string;
  name: string;
  rating: number;
  deliveryCount: string;
  estimatedDelivery: string;
  price: number;
  badge?: string; // e.g. "Best Value"
}

export interface OrderLineItem {
  id: string;
  name: string;
  grade: string;
  quantity: string;
  price: number;
  imageUrl: string;
  imageAlt: string;
}

export interface CheckoutSummary {
  subtotal: number;
  transportFee: number;
  vat: number;
  ministrySubsidy: number;
}


export const transporters: Transporter[] = [
  {
    id: "swift",
    name: "Swift Agro Logistics",
    rating: 4.8,
    deliveryCount: "1.2k",
    estimatedDelivery: "2 Days",
    price: 120,
    badge: "Best Value",
  },
  {
    id: "national",
    name: "National Cargo Fleet",
    rating: 4.2,
    deliveryCount: "850",
    estimatedDelivery: "4–5 Days",
    price: 95,
  },
  {
    id: "express",
    name: "Express Farm Haul",
    rating: 4.9,
    deliveryCount: "200",
    estimatedDelivery: "Tomorrow",
    price: 180,
  },
];

export const orderLineItems: OrderLineItem[] = [
  {
    id: "maize",
    name: "Premium Yellow Maize",
    grade: "Grade A Quality",
    quantity: "Qty 100 Sacks (50kg)",
    price: 2500,
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuC42FaD8FE2WdI1yDuT0WBI3Qjp_B2d68mw02JVNkRLGR9PINeosceOcc8KZD2vRscoK8NM4ikKogq_XdZEvAsD2tKL-ai0AevEWAb1LzsLoBgNU2a9Mt_EN_oGJ2E9O52jKgckc4ZeAFMeCqTwdJiTMnqDgq564A1FLmiWZgExiuWeYtC9Tb7K9mUFKZdwfWIREFn7T2TjzVVA5K4CZ89JWOMPu39YV-1avps0Mp_-5z5_LoFe-x5FPzKMfnU7Dv4N2bhK68LeIyOF",
    imageAlt: "Closeup texture of yellow corn grains",
  },
  {
    id: "fertilizer",
    name: "Organic Fertilizer",
    grade: "Slow Release",
    quantity: "Qty 15 Bags",
    price: 450,
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDpRqZxlak1j3_637geudBoGsE378uH0WYgua7RfAIEtyBtnK38nV3-gOZZKg-TaXwDWl9yY4h5LdqaN88O79JqgIyvioX_rWu7Q9KLDSfSWXTCUk3MYcRmc88ChPlEp78f8RiPqAXLo-GvrIDaSZUzDeoLXwjHn8oQNnlnnJU-4hPWxUPBlvn4QCBb6xTdue5y-DDrq7uC6ZhB6izktU4RsgB1UEflCU4FH-USxHFpQo3ob-jO7fasaAlrJ6pKI6QAfi0_ZWSHwh-U",
    imageAlt: "Pile of organic fertilizer pellets",
  },
];

export const checkoutSummaryBase: CheckoutSummary = {
  subtotal: 2950,
  transportFee: 120, // driven by selected transporter
  vat: 531,
  ministrySubsidy: 150,
};