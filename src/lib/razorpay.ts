
// Razorpay integration utility
declare global {
  interface Window {
    Razorpay: any;
  }
}

export interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  order_id: string;
  handler: (response: any) => void;
  prefill: {
    name?: string;
    email?: string;
    contact?: string;
  };
  theme: {
    color: string;
  };
}

export const initializeRazorpay = (): Promise<boolean> => {
  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

export const createRazorpayOrder = async (amount: number, currency: string = 'INR') => {
  // This would typically call your backend to create a Razorpay order
  // For now, we'll simulate the order creation
  return {
    id: `order_${Date.now()}`,
    amount: amount * 100, // Razorpay expects amount in paise
    currency,
  };
};

export const processPayment = async (options: RazorpayOptions): Promise<void> => {
  const isRazorpayLoaded = await initializeRazorpay();
  
  if (!isRazorpayLoaded) {
    throw new Error('Razorpay SDK failed to load');
  }

  const razorpay = new window.Razorpay(options);
  razorpay.open();
};
