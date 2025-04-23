
import React, { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";

export interface CartItem {
  id: string;
  title: string;
  quantity: number;
  price: number;
  max_quantity: number;
  unit: string;
  image?: string;
  user_id: string; // Added user_id property
}

interface CartContextType {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
  getTotalItems: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);

  // Load cart from localStorage on initial load
  useEffect(() => {
    const savedCart = localStorage.getItem("dealer-cart");
    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart));
      } catch (error) {
        console.error("Failed to parse saved cart:", error);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("dealer-cart", JSON.stringify(items));
  }, [items]);

  const addItem = (item: CartItem) => {
    setItems((prevItems) => {
      const existingItem = prevItems.find((i) => i.id === item.id);
      
      if (existingItem) {
        // If item already exists, update quantity
        const newQuantity = existingItem.quantity + item.quantity;
        
        // Check if new quantity exceeds maximum
        if (newQuantity > item.max_quantity) {
          toast({
            title: "Maximum quantity reached",
            description: `You can only add up to ${item.max_quantity} ${item.unit} of this item.`,
            variant: "destructive",
          });
          return prevItems.map((i) => 
            i.id === item.id ? { ...i, quantity: item.max_quantity } : i
          );
        }
        
        toast({
          title: "Cart updated",
          description: `Updated quantity of ${item.title} in your cart.`,
        });
        
        return prevItems.map((i) => 
          i.id === item.id ? { ...i, quantity: newQuantity } : i
        );
      } else {
        // If item doesn't exist, add it
        toast({
          title: "Item added",
          description: `Added ${item.title} to your cart.`,
        });
        return [...prevItems, item];
      }
    });
  };

  const removeItem = (id: string) => {
    setItems((prevItems) => {
      const removedItem = prevItems.find(item => item.id === id);
      if (removedItem) {
        toast({
          title: "Item removed",
          description: `Removed ${removedItem.title} from your cart.`,
        });
      }
      return prevItems.filter((item) => item.id !== id);
    });
  };

  const updateQuantity = (id: string, quantity: number) => {
    setItems((prevItems) => {
      const item = prevItems.find(i => i.id === id);
      if (!item) return prevItems;
      
      // Ensure quantity doesn't exceed maximum
      const newQuantity = Math.min(quantity, item.max_quantity);
      
      if (newQuantity !== quantity) {
        toast({
          title: "Maximum quantity reached",
          description: `You can only add up to ${item.max_quantity} ${item.unit} of this item.`,
          variant: "destructive",
        });
      }
      
      return prevItems.map((i) => 
        i.id === id ? { ...i, quantity: newQuantity } : i
      );
    });
  };

  const clearCart = () => {
    setItems([]);
    toast({
      title: "Cart cleared",
      description: "All items have been removed from your cart.",
    });
  };

  const getTotalPrice = () => {
    return items.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getTotalItems = () => {
    return items.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <CartContext.Provider value={{ 
      items, 
      addItem, 
      removeItem, 
      updateQuantity,
      clearCart,
      getTotalPrice,
      getTotalItems
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
