import React, { createContext, useContext, useState } from "react";
import { Product } from "../types/Product";

type ProductContextType = {
  products: Product[];
  addProduct: (p: Product) => void;
  updateProduct: (p: Product) => void;
  deleteProduct: (id: string) => void;
  toggleStatus: (id: string) => void;
};

const ProductContext = createContext<ProductContextType | undefined>(undefined);

const initialProducts: Product[] = [
  {
    id: "1",
    name: "Roma Tomatoes",
    type: "Vegetable",
    variety: "Heirloom",
    quantity: "500 kg",
    price: "$2.20/kg",
    marketPrice: "$2.00",
    status: "Active",
    image: "https://images.unsplash.com/photo-1546470427-1f6c8b6c0c1b",
  },
];

export const ProductProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [products, setProducts] = useState<Product[]>(initialProducts);

  const addProduct = (product: Product) => {
    setProducts((prev) => [product, ...prev]);
  };

  const updateProduct = (updated: Product) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === updated.id ? updated : p))
    );
  };

  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const toggleStatus = (id: string) => {
    setProducts((prev) =>
      prev.map((p) =>
        p.id === id
          ? {
              ...p,
              status: p.status === "Active" ? "Draft" : "Active",
            }
          : p
      )
    );
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        toggleStatus,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductContext);

  if (!context) {
    throw new Error("useProducts must be used inside ProductProvider");
  }

  return context;
};