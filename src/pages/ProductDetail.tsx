
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchProductByHandle, formatPrice, PetPoojaProduct as ShopifyProduct, PetPoojaVariant as ShopifyVariant } from '@/lib/petpooja';
import { Button } from '@/components/ui/button';
import { useCart } from '@/lib/cart-context';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, Minus, Plus, ShoppingBag } from 'lucide-react';
import { useState } from 'react';

export function ProductDetail() {
  const { handle } = useParams<{ handle: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [selectedVariant, setSelectedVariant] = useState<ShopifyVariant | null>(null);
  const [quantity, setQuantity] = useState(1);

  const { data: product, isLoading, error } = useQuery<ShopifyProduct>({
    queryKey: ['product', handle],
    queryFn: () => fetchProductByHandle(handle || ''),
    enabled: !!handle,
  });

  // Set the first variant as selected when product data loads
  React.useEffect(() => {
    if (product && product.variants.length > 0) {
      setSelectedVariant(product.variants[0]);
    }
  }, [product]);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-24 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="container mx-auto px-4 py-24">
        <div className="text-center">
          <h2 className="text-2xl font-bold">Product not found</h2>
          <p className="mt-2 text-muted-foreground">
            We couldn't find the product you're looking for.
          </p>
          <Button onClick={() => navigate('/products')} className="mt-4">
            Back to Products
          </Button>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (product && selectedVariant) {
      addToCart(product, selectedVariant, quantity);
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  return (
    <div className="container mx-auto px-4 py-24">
      <Button
        variant="ghost"
        className="mb-8 flex items-center"
        onClick={() => navigate('/products')}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Products
      </Button>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Product Images */}
        <div className="space-y-4">
          {product.images.length > 0 ? (
            <>
              <div className="aspect-square overflow-hidden rounded-lg border bg-muted">
                <img
                  src={product.images[0].url}
                  alt={product.images[0].altText || product.title}
                  className="h-full w-full object-cover object-center"
                />
              </div>
              
              {product.images.length > 1 && (
                <div className="grid grid-cols-4 gap-2">
                  {product.images.slice(0, 4).map((image, i) => (
                    <div
                      key={image.id}
                      className="aspect-square overflow-hidden rounded-md border bg-muted"
                    >
                      <img
                        src={image.url}
                        alt={image.altText || `${product.title} ${i + 1}`}
                        className="h-full w-full object-cover object-center"
                      />
                    </div>
                  ))}
                </div>
              )}
            </>
          ) : (
            <div className="aspect-square overflow-hidden rounded-lg border bg-muted flex items-center justify-center">
              <ShoppingBag className="h-16 w-16 text-muted-foreground" />
            </div>
          )}
        </div>

        {/* Product Details */}
        <div>
          <h1 className="text-3xl font-bold">{product.title}</h1>
          
          {selectedVariant && (
            <div className="mt-4 text-2xl font-semibold">
              {formatPrice(selectedVariant.price)}
            </div>
          )}

          {/* Description */}
          <div className="mt-4 prose prose-sm">
            <p>{product.description}</p>
          </div>

          <Separator className="my-6" />

          {/* Variants */}
          {product.variants.length > 1 && (
            <div className="mt-6">
              <h3 className="text-sm font-medium">Options</h3>
              <div className="mt-2 flex flex-wrap gap-2">
                {product.variants.map((variant) => (
                  <Button
                    key={variant.id}
                    variant={selectedVariant?.id === variant.id ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedVariant(variant)}
                  >
                    {variant.title}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity */}
          <div className="mt-6">
            <h3 className="text-sm font-medium">Quantity</h3>
            <div className="mt-2 flex items-center space-x-3">
              <Button
                variant="outline"
                size="icon"
                onClick={decreaseQuantity}
                disabled={quantity <= 1}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="w-8 text-center">{quantity}</span>
              <Button variant="outline" size="icon" onClick={increaseQuantity}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Add to Cart */}
          <div className="mt-8">
            <Button
              className="w-full"
              size="lg"
              onClick={handleAddToCart}
              disabled={!selectedVariant}
            >
              <ShoppingBag className="mr-2 h-5 w-5" />
              Add to Cart
            </Button>
          </div>

          {/* Additional Info */}
          <div className="mt-8 space-y-4">
            <Separator />
            <div>
              <h3 className="font-medium">Shipping</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Free shipping on orders over $50
              </p>
            </div>
            <Separator />
            <div>
              <h3 className="font-medium">Returns</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Free 30-day returns. See our return policy for more details.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
