
import React, { useState } from 'react';
import { ShopifyProduct, ShopifyVariant, formatPrice } from '@/lib/shopify';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useCart } from '@/lib/cart-context';
import { toast } from 'sonner';

interface VariantSelectorProps {
  product: ShopifyProduct;
  isOpen: boolean;
  onClose: () => void;
}

export const VariantSelector: React.FC<VariantSelectorProps> = ({ product, isOpen, onClose }) => {
  const [selectedVariant, setSelectedVariant] = useState<ShopifyVariant | null>(
    product.variants.length > 0 ? product.variants[0] : null
  );
  const [quantity, setQuantity] = useState(1);
  const { addToCart, isLoading } = useCart();

  const handleAddToCart = async () => {
    if (!selectedVariant) {
      toast.error('Please select a variant');
      return;
    }

    await addToCart(product, selectedVariant, quantity);
    toast.success(`${product.title} added to cart!`);
    onClose();
  };

  if (!product.variants || product.variants.length === 0) {
    return null;
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Select Variant - {product.title}</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* Product Image */}
          {product.images.length > 0 && (
            <div className="w-full h-48 rounded-lg overflow-hidden">
              <img
                src={product.images[0].url}
                alt={product.images[0].altText || product.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Variant Selection */}
          <div>
            <label className="text-sm font-medium mb-2 block">Select Size/Weight:</label>
            <div className="grid grid-cols-2 gap-2">
              {product.variants.map((variant) => (
                <button
                  key={variant.id}
                  onClick={() => setSelectedVariant(variant)}
                  className={`p-3 border rounded-lg text-sm transition-colors ${
                    selectedVariant?.id === variant.id
                      ? 'border-primary bg-primary/10 text-primary'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  disabled={!variant.availableForSale}
                >
                  <div className="font-medium">{variant.title}</div>
                  <div className="text-xs text-gray-600">
                    {formatPrice(variant.price)}
                  </div>
                  {!variant.availableForSale && (
                    <div className="text-xs text-red-500">Out of Stock</div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity Selection */}
          <div>
            <label className="text-sm font-medium mb-2 block">Quantity:</label>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
              >
                -
              </Button>
              <span className="px-4 py-2 border rounded">{quantity}</span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setQuantity(quantity + 1)}
              >
                +
              </Button>
            </div>
          </div>

          {/* Price Display */}
          {selectedVariant && (
            <div className="bg-gray-50 p-3 rounded-lg">
              <div className="flex justify-between items-center">
                <span className="font-medium">Total:</span>
                <span className="text-lg font-bold text-primary">
                  {formatPrice({
                    amount: (parseFloat(selectedVariant.price.amount) * quantity).toString(),
                    currencyCode: selectedVariant.price.currencyCode
                  })}
                </span>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex space-x-2">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button
              onClick={handleAddToCart}
              disabled={!selectedVariant || !selectedVariant.availableForSale || isLoading}
              className="flex-1"
            >
              {isLoading ? 'Adding...' : 'Add to Cart'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
