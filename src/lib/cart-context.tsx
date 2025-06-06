
import React, { createContext, useContext, useEffect, useState } from 'react';
import { CartItem, ShopifyProduct, ShopifyVariant, createCheckout, updateCheckout } from './shopify';
import { processPayment, createRazorpayOrder } from './razorpay';
import { toast } from 'sonner';

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
  processRazorpayPayment: () => Promise<void>;
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

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
    } catch (error) {
      console.error('Error saving cart to localStorage:', error);
    }
  }, [cartItems]);

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
      const existingItemIndex = cartItems.findIndex(item => item.variantId === variant.id);
      
      let newCartItems: CartItem[];
      
      if (existingItemIndex >= 0) {
        newCartItems = [...cartItems];
        newCartItems[existingItemIndex].quantity += quantity;
      } else {
        const newItem: CartItem = {
          variantId: variant.id,
          quantity,
          product,
          variant
        };
        newCartItems = [...cartItems, newItem];
      }
      
      setCartItems(newCartItems);
      
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
      
      setIsCartOpen(true);
    } catch (error) {
      console.error('Error adding item to cart:', error);
      toast.error('Failed to add item to cart');
    } finally {
      setIsLoading(false);
    }
  };

  const removeFromCart = async (variantId: string) => {
    setIsLoading(true);
    
    try {
      const newCartItems = cartItems.filter(item => item.variantId !== variantId);
      setCartItems(newCartItems);
      
      if (checkout?.id && newCartItems.length > 0) {
        const updatedCheckout = await updateCheckout(
          checkout.id,
          newCartItems.map(item => ({ variantId: item.variantId, quantity: item.quantity }))
        );
        setCheckout(updatedCheckout);
      } else if (newCartItems.length === 0) {
        setCheckout(null);
        localStorage.removeItem(CHECKOUT_STORAGE_KEY);
      }
    } catch (error) {
      console.error('Error removing item from cart:', error);
      toast.error('Failed to remove item from cart');
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
      const newCartItems = cartItems.map(item => 
        item.variantId === variantId ? { ...item, quantity } : item
      );
      
      setCartItems(newCartItems);
      
      if (checkout?.id) {
        const updatedCheckout = await updateCheckout(
          checkout.id,
          newCartItems.map(item => ({ variantId: item.variantId, quantity: item.quantity }))
        );
        setCheckout(updatedCheckout);
      }
    } catch (error) {
      console.error('Error updating item quantity:', error);
      toast.error('Failed to update quantity');
    } finally {
      setIsLoading(false);
    }
  };

  const processRazorpayPayment = async () => {
    if (!checkout || cartItems.length === 0) {
      toast.error('Cart is empty');
      return;
    }

    setIsLoading(true);
    
    try {
      const totalAmount = parseFloat(checkout.totalPrice.amount);
      const razorpayOrder = await createRazorpayOrder(totalAmount);

      await processPayment({
        key: 'rzp_test_1234567890', // Replace with your Razorpay key
        amount: razorpayOrder.amount,
        currency: razorpayOrder.currency,
        name: 'Mithadi Palace',
        description: 'Order Payment',
        order_id: razorpayOrder.id,
        handler: async (response: any) => {
          console.log('Payment successful:', response);
          toast.success('Payment successful! Order placed.');
          
          // Here you would create the order in Shopify using Admin API
          // and clear the cart
          clearCart();
          closeCart();
        },
        prefill: {
          name: '',
          email: '',
          contact: ''
        },
        theme: {
          color: '#D4A574'
        }
      });
    } catch (error) {
      console.error('Payment failed:', error);
      toast.error('Payment failed. Please try again.');
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
        isLoading,
        processRazorpayPayment
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
