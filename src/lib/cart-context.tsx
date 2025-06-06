import React, { createContext, useContext, useEffect, useState } from 'react';
import { CartItem, ShopifyProduct, ShopifyVariant, createCheckout, updateCheckout } from './shopify';

interface CartContextType {
  cartItems: CartItem[];
  checkout: {
    id: string;
    webUrl: string;
    subtotalPrice: { amount: string; currencyCode: string };
    totalPrice: { amount: string; currencyCode: string };
  } | null;
  isCartOpen: boolean;
  cartCount: number;
  addToCart: (product: ShopifyProduct, variant: ShopifyVariant, quantity: number) => void;
  removeFromCart: (variantId: string) => void;
  updateQuantity: (variantId: string, quantity: number) => void;
  clearCart: () => void;
  toggleCart: () => void;
  closeCart: () => void;
  openCart: () => void;
  isLoading: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'mithadi_cart';
const CHECKOUT_STORAGE_KEY = 'mithadi_checkout';

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [checkout, setCheckout] = useState<CartContextType['checkout']>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Load cart from localStorage on initial render
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem(CART_STORAGE_KEY);
      const savedCheckout = localStorage.getItem(CHECKOUT_STORAGE_KEY);
      
      if (savedCart) {
        setCartItems(JSON.parse(savedCart));
      }
      
      if (savedCheckout) {
        setCheckout(JSON.parse(savedCheckout));
      }
    } catch (error) {
      console.error('Error loading cart from localStorage:', error);
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
    } catch (error) {
      console.error('Error saving cart to localStorage:', error);
    }
  }, [cartItems]);

  // Save checkout to localStorage whenever it changes
  useEffect(() => {
    if (checkout) {
      try {
        localStorage.setItem(CHECKOUT_STORAGE_KEY, JSON.stringify(checkout));
      } catch (error) {
        console.error('Error saving checkout to localStorage:', error);
      }
    }
  }, [checkout]);

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const addToCart = async (product: ShopifyProduct, variant: ShopifyVariant, quantity: number) => {
    setIsLoading(true);
    
    try {
      // Check if the item is already in the cart
      const existingItemIndex = cartItems.findIndex(item => item.variantId === variant.id);
      
      let newCartItems: CartItem[];
      
      if (existingItemIndex >= 0) {
        // Update quantity if item exists
        newCartItems = [...cartItems];
        newCartItems[existingItemIndex].quantity += quantity;
      } else {
        // Add new item
        const newItem: CartItem = {
          variantId: variant.id,
          quantity,
          product,
          variant
        };
        newCartItems = [...cartItems, newItem];
      }
      
      // Update the cart state
      setCartItems(newCartItems);
      
      // Create or update checkout
      if (checkout?.id) {
        const updatedCheckout = await updateCheckout(
          checkout.id,
          newCartItems.map(item => ({ variantId: item.variantId, quantity: item.quantity }))
        );
        setCheckout(updatedCheckout);
      } else {
        const newCheckout = await createCheckout(
          newCartItems.map(item => ({ variantId: item.variantId, quantity: item.quantity }))
        );
        setCheckout(newCheckout);
      }
      
      // Open the cart drawer
      setIsCartOpen(true);
    } catch (error) {
      console.error('Error adding item to cart:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const removeFromCart = async (variantId: string) => {
    setIsLoading(true);
    
    try {
      // Remove item from cart
      const newCartItems = cartItems.filter(item => item.variantId !== variantId);
      setCartItems(newCartItems);
      
      // Update checkout
      if (checkout?.id && newCartItems.length > 0) {
        const updatedCheckout = await updateCheckout(
          checkout.id,
          newCartItems.map(item => ({ variantId: item.variantId, quantity: item.quantity }))
        );
        setCheckout(updatedCheckout);
      } else if (newCartItems.length === 0) {
        // Clear checkout if cart is empty
        setCheckout(null);
        localStorage.removeItem(CHECKOUT_STORAGE_KEY);
      }
    } catch (error) {
      console.error('Error removing item from cart:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateQuantity = async (variantId: string, quantity: number) => {
    if (quantity < 1) {
      removeFromCart(variantId);
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Update item quantity
      const newCartItems = cartItems.map(item => 
        item.variantId === variantId ? { ...item, quantity } : item
      );
      
      setCartItems(newCartItems);
      
      // Update checkout
      if (checkout?.id) {
        const updatedCheckout = await updateCheckout(
          checkout.id,
          newCartItems.map(item => ({ variantId: item.variantId, quantity: item.quantity }))
        );
        setCheckout(updatedCheckout);
      }
    } catch (error) {
      console.error('Error updating item quantity:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const clearCart = () => {
    setCartItems([]);
    setCheckout(null);
    localStorage.removeItem(CART_STORAGE_KEY);
    localStorage.removeItem(CHECKOUT_STORAGE_KEY);
  };

  const toggleCart = () => setIsCartOpen(!isCartOpen);
  const closeCart = () => setIsCartOpen(false);
  const openCart = () => setIsCartOpen(true);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        checkout,
        isCartOpen,
        cartCount,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        toggleCart,
        closeCart,
        openCart,
        isLoading
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Define the hook as a named function instead of an arrow function
// This helps with Fast Refresh compatibility
export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
