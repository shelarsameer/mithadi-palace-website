
import React from 'react';
import { createCheckout } from '@/lib/petpooja';

interface BuyButtonProps {
  productVariantId?: string;
  productName?: string;
  quantity?: number;
  className?: string;
}

const BuyButton: React.FC<BuyButtonProps> = ({
  productVariantId = 'default-variant',
  productName = 'Product',
  quantity = 1,
  className = '',
}) => {
  const handleBuy = async () => {
    try {
      const checkout = await createCheckout([{ variantId: productVariantId, quantity }]);
      // Since PetPooja doesn't handle checkout directly, we'll redirect to our cart
      console.log('Checkout created:', checkout);
      // You can implement custom checkout flow here
    } catch (error) {
      console.error('Error creating checkout:', error);
    }
  };

  return (
    <button 
      onClick={handleBuy}
      className={`px-4 py-2 bg-primary text-white rounded hover:bg-primary/90 ${className}`}
    >
      Buy {productName}
    </button>
  );
};

export default BuyButton;
