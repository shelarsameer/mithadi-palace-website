import React from 'react';
import { createCheckout, PRODUCT_VARIANTS } from '@/lib/shopify';

interface BuyButtonProps {
  productVariantId?: string;
  productName?: string;
  quantity?: number;
  className?: string;
}

const BuyButton: React.FC<BuyButtonProps> = ({
  productVariantId = PRODUCT_VARIANTS.KAJU_KATLI,
  productName = 'Kaju Katli',
  quantity = 1,
  className = '',
}) => {
  const handleBuy = async () => {
    try {
      const checkout = await createCheckout([{ variantId: productVariantId, quantity }]);
      // Redirect to Shopify checkout
      if (checkout?.webUrl) {
        window.location.href = checkout.webUrl;
      }
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
