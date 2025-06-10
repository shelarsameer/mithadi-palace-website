
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { fetchProducts, ShopifyProduct, formatPrice } from '@/lib/shopify';
import { useCart } from '@/lib/cart-context';

const SnacksFarsanSection = () => {
  const [activeTab, setActiveTab] = useState<'snacks' | 'farsan'>('snacks');
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        const data = await fetchProducts();
        if (data && Array.isArray(data)) {
          const filteredProducts = data.filter(product => {
            const productType = product.productType?.toLowerCase() || '';
            return activeTab === 'snacks' 
              ? productType.includes('snack') || productType.includes('namkeen')
              : productType.includes('farsan') || productType.includes('savory');
          });
          setProducts(filteredProducts);
          setCurrentIndex(0);
        }
      } catch (error) {
        console.error('Error loading products:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, [activeTab]);

  // Auto-slide effect
  useEffect(() => {
    if (products.length > 1) {
      const timer = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % products.length);
      }, 4000);
      return () => clearInterval(timer);
    }
  }, [products.length]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % products.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + products.length) % products.length);
  };

  const handleAddToCart = (product: ShopifyProduct) => {
    if (product.variants && product.variants.length > 0) {
      const variant = product.variants[0];
      addToCart(product, variant, 1);
    }
  };

  const getVisibleProducts = () => {
    if (products.length === 0) return [];
    const visibleCount = 4;
    const result = [];
    for (let i = 0; i < visibleCount; i++) {
      const index = (currentIndex + i) % products.length;
      result.push(products[index]);
    }
    return result;
  };

  if (loading) {
    return (
      <section className="py-20 bg-gradient-to-br from-royal-cream to-white">
        <div className="container mx-auto px-4 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-royal-gold mx-auto"></div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gradient-to-br from-royal-cream to-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-royal-brown mb-4">
            Snacks & Farsan
          </h2>
          <p className="text-xl text-royal-brown/70 max-w-2xl mx-auto">
            Discover our authentic collection of traditional snacks and farsan
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-full p-2 shadow-lg">
            <button
              onClick={() => setActiveTab('snacks')}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                activeTab === 'snacks'
                  ? 'bg-royal-gold text-white shadow-md'
                  : 'text-royal-brown hover:bg-royal-gold/10'
              }`}
            >
              Snacks
            </button>
            <button
              onClick={() => setActiveTab('farsan')}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                activeTab === 'farsan'
                  ? 'bg-royal-gold text-white shadow-md'
                  : 'text-royal-brown hover:bg-royal-gold/10'
              }`}
            >
              Farsan
            </button>
          </div>
        </div>

        {/* Products Carousel */}
        <div className="relative">
          {products.length === 0 ? (
            <div className="text-center py-12">
              <ShoppingBag className="h-16 w-16 mx-auto text-royal-gold/50 mb-4" />
              <p className="text-royal-brown/60">No {activeTab} products available</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {getVisibleProducts().map((product, index) => {
                  const image = product.images?.[0];
                  const variant = product.variants?.[0];
                  
                  return (
                    <div key={`${product.id}-${index}`} className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                      <Link to={`/product/${product.handle}`}>
                        <div className="aspect-square overflow-hidden bg-gradient-to-br from-royal-cream to-white">
                          {image ? (
                            <img 
                              src={image.url} 
                              alt={image.altText || product.title} 
                              className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <ShoppingBag className="h-16 w-16 text-royal-gold/30" />
                            </div>
                          )}
                        </div>
                      </Link>
                      
                      <div className="p-4">
                        <Link to={`/product/${product.handle}`}>
                          <h3 className="font-serif font-semibold text-lg text-royal-brown mb-2 hover:text-royal-gold transition-colors line-clamp-2">
                            {product.title}
                          </h3>
                        </Link>
                        
                        <div className="flex items-center justify-between">
                          {variant && (
                            <span className="text-xl font-bold text-royal-gold">
                              {formatPrice(variant.price)}
                            </span>
                          )}
                          
                          {variant?.availableForSale && (
                            <Button 
                              onClick={() => handleAddToCart(product)}
                              size="sm"
                              className="bg-royal-gold hover:bg-royal-darkGold text-white"
                            >
                              Add to Cart
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Navigation Arrows */}
              <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-royal-gold p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-royal-gold p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              {/* Slide Indicators */}
              <div className="flex justify-center mt-6 space-x-2">
                {products.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentIndex ? 'bg-royal-gold' : 'bg-royal-gold/30'
                    }`}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        {/* View All Link */}
        <div className="text-center mt-8">
          <Button asChild className="bg-royal-gold hover:bg-royal-darkGold text-white px-8 py-3">
            <Link to="/products">View All Products</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default SnacksFarsanSection;
