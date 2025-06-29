// components/extra/CartContext.tsx
"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

type CartItem = {
  prodID: string;
  name: string;
  prod_name:string;
  price: number;
  quantity: number;
  image?: string;
  availableQuantity: number;
  uid: string;
  category:string;
  description:string;
  confirmId : string;
  isDelivered:boolean;
  hasPayment:boolean;
  hasConformed:boolean;
  hasReject:boolean;
};

type CartContextType = {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, val: number) => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addToCart = (item: CartItem) => {
    setCart((prevCart) => {
      const existing = prevCart.find((i) => i.prodID === item.prodID);
      if (existing) {
        return prevCart.map((i) =>
          i.prodID === item.prodID
            ? { ...i, quantity: i.quantity + (item.quantity || 1) }
            : i
        );
      } else {
        return [...prevCart, { ...item, quantity: item.quantity || 1 }];
      }
    });
  };

  const removeFromCart = (id: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.prodID !== id));
  };

  const updateQuantity = (id: string, newQuantity: number) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.prodID === id
          ? {
              ...item,
              quantity: Math.max(newQuantity, 1), // Ensure minimum quantity is 1
            }
          : item
      )
    );
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        isCartOpen,
        setIsCartOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
