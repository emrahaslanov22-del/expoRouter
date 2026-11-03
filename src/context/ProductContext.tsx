import React, { createContext, useContext, useState } from "react";
import type { ImageSourcePropType } from "react-native";


type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: ImageSourcePropType;
};

type ProductContextType = {
  products: Product[];
  addProduct: (name: string, price: number, description: string) => void;
  updateProduct: (id: number, name: string, price: number, description: string) => void;
};

const products: Product[] = [
  {
    id: 1,
    name: "Iphone 18 Pro max",
    description: "Latest iPhone model with advanced features",
    price: 3999.99,
    imageUrl: require("../../assets/productImage/18pro-max.png")
  },
  {
    id: 2,
    name: "Samsung Galaxy S23 Ultra",
    description: "Advanced Android model with improved performance",
    price: 2999.99,
    imageUrl: require("../../assets/productImage/s23-ultra.jpg")
  },
  {
    id: 3,
    name: "Google Pixel 7 Pro",
    description: "Flagship Google phone with excellent camera capabilities",
    price: 2499.99,
    imageUrl: require("../../assets/productImage/pixel-7-pro.jpg")
  },
];

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export default function ProductProvider({ children }: { children: React.ReactNode }) {

  const [product, setProduct] = useState<Product[]>(products);

  const addProduct = (name: string, price: number, description: string) => {
    setProduct((prev) => {

      const nextId = Math.max(0, ...prev.map((item) => item.id)) + 1;

      const newProduct: Product = {
        id: nextId,
        name,
        price,
        description,
        imageUrl: require("../../assets/productImage/18pro-max.png")
      }
      return [...prev, newProduct];
    })
  }

  const updateProduct = (id: number, name: string, price: number, description: string) => {

    setProduct((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, name, price, description }
          : item
      )
    );
  };

  return (
    <ProductContext.Provider value={{ products: product, addProduct, updateProduct }}>
      {children}
    </ProductContext.Provider>
  );
}

export function useProductContext() {

  const context = useContext(ProductContext);

  if (!context) {
    throw new Error("useProductContext must be used within a ProductProvider");
  }
  return context;
}