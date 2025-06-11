
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ShoppingBag, Star } from 'lucide-react';
import { ShopifyProduct, formatPrice } from '@/lib/shopify';

interface ProductCardProps {
  product: ShopifyProduct;
  showAddToCart?: boolean;
}

const ProductCard = ({ product, showAddToCart = false }: ProductCardProps) => {
  const image = product.images && product.images.length > 0 ? product.images[0] : null;
  const variant = product.variants && product.variants.length > 0 ? product.variants[0] : null;

  return (
    <div className="group bg-white rounded-xl md:rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 flex flex-col h-full">
      <Link to={`/product/${product.handle}`} className="block">
        {image ? (
          <div className="aspect-square overflow-hidden bg-gradient-to-br from-royal-cream to-white relative">
            <img 
              src={image.url} 
              alt={image.altText || product.title} 
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute top-2 md:top-4 right-2 md:right-4 bg-royal-gold text-white px-2 md:px-3 py-1 rounded-full text-xs font-medium">
              Premium
            </div>
          </div>
        ) : (
          <div className="aspect-square bg-gradient-to-br from-royal-cream to-white flex items-center justify-center">
            <ShoppingBag className="h-8 md:h-16 w-8 md:w-16 text-royal-gold/30" />
          </div>
        )}
      </Link>
      
      <div className="p-3 md:p-6 flex flex-col flex-grow">
        <Link to={`/product/${product.handle}`} className="block flex-grow">
          <h3 className="font-serif font-semibold text-sm md:text-xl text-royal-brown mb-2 md:mb-3 leading-tight group-hover:text-royal-gold transition-colors line-clamp-2">
            {product.title}
          </h3>
        </Link>
        
        {/* Rating Stars - Hidden on mobile for space */}
        <div className="hidden md:flex items-center mb-3">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star key={star} className="h-4 w-4 fill-royal-gold text-royal-gold" />
          ))}
          <span className="text-sm text-royal-brown/60 ml-2">(4.8)</span>
        </div>
        
        <div className="mt-auto space-y-3">
          {variant ? (
            <div className="flex flex-col">
              <span className="text-lg md:text-2xl font-bold text-royal-gold">
                {formatPrice(variant.price)}
                {product.variants.length > 1 && <span className="text-xs md:text-sm text-royal-brown/60 ml-1">onwards</span>}
              </span>
              {product.variants.length > 1 && (
                <span className="text-xs text-royal-brown/50 hidden md:block">Multiple variants available</span>
              )}
            </div>
          ) : (
            <span className="text-lg md:text-xl font-bold text-royal-brown/40">Price unavailable</span>
          )}
          
          <Link to={`/product/${product.handle}`}>
            <Button 
              size="sm"
              className="w-full bg-royal-gold hover:bg-royal-darkGold text-white px-3 md:px-6 py-2 rounded-full font-medium shadow-lg hover:shadow-xl transition-all duration-300 text-xs md:text-sm"
            >
              Buy Now
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
