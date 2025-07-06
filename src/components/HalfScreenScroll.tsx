
import React, { useEffect, useState, useRef } from 'react';
import { fetchProducts, PetPoojaProduct as ShopifyProduct, formatPrice } from '@/lib/petpooja';
import { Button } from '@/components/ui/button';
import { useCart } from '@/lib/cart-context';
import { Link } from 'react-router-dom';

// Customize these product handles to display specific products
const FEATURED_PRODUCT_HANDLES = [
  'kaju-katli-premium',
  'rasgulla-special',
  'samosa-traditional',
  'gulab-jamun-classic'
];

const HalfScreenScroll = () => {
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProducts();
        if (data && Array.isArray(data)) {
          // First try to get products by specific handles
          const featuredProducts = FEATURED_PRODUCT_HANDLES.map(handle => 
            data.find(product => product.handle === handle)
          ).filter(Boolean) as ShopifyProduct[];

          // If we don't have enough specific products, fill with recommended products
          if (featuredProducts.length < 4) {
            const recommendedProducts = data.filter(product => 
              product.tags?.some(tag => tag.toLowerCase().includes('recommended')) ||
              product.tags?.some(tag => tag.toLowerCase().includes('featured')) ||
              product.productType?.toLowerCase().includes('sweet')
            ).slice(0, 4 - featuredProducts.length);
            
            featuredProducts.push(...recommendedProducts);
          }

          // If still not enough, add any products
          if (featuredProducts.length < 4) {
            const remainingProducts = data.filter(product => 
              !featuredProducts.some(fp => fp.id === product.id)
            ).slice(0, 4 - featuredProducts.length);
            
            featuredProducts.push(...remainingProducts);
          }

          setProducts(featuredProducts.slice(0, 4));
        }
      } catch (error) {
        console.error('Error loading products for half-screen scroll:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current || products.length === 0) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const sectionHeight = rect.height;
      const viewportHeight = window.innerHeight;
      
      // Calculate scroll progress within this section with extended time for first product
      let scrollProgress = Math.max(0, Math.min(1, (viewportHeight - rect.top) / sectionHeight));
      
      // Extend the first product display time significantly
      if (scrollProgress < 0.6) {
        // First 60% of scroll shows first product
        setCurrentIndex(0);
      } else {
        // Remaining 40% of scroll distributes among remaining products
        const adjustedProgress = (scrollProgress - 0.6) / 0.4;
        const newIndex = Math.min(
          products.length - 1,
          Math.floor(adjustedProgress * (products.length - 1)) + 1
        );
        setCurrentIndex(newIndex);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [products.length]);

  const handleAddToCart = (product: ShopifyProduct) => {
    if (product.variants && product.variants.length > 0) {
      const variant = product.variants[0];
      addToCart(product, variant, 1);
    }
  };

  if (loading || products.length === 0) {
    return (
      <section className="h-screen bg-gradient-to-br from-royal-cream to-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-royal-gold mx-auto mb-4"></div>
          <p className="text-royal-brown">Loading featured products...</p>
        </div>
      </section>
    );
  }

  const currentProduct = products[currentIndex];

  return (
    <section ref={sectionRef} className="h-[250vh] relative bg-gradient-to-br from-royal-cream to-white">
      <div className="sticky top-0 h-screen flex items-center">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Product Image */}
            <div className="relative">
              <div className="aspect-square overflow-hidden rounded-3xl shadow-2xl bg-white p-8">
                {currentProduct?.images?.[0] ? (
                  <img
                    src={currentProduct.images[0].url}
                    alt={currentProduct.images[0].altText || currentProduct.title}
                    className="w-full h-full object-cover rounded-2xl transition-all duration-500"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-100 rounded-2xl flex items-center justify-center">
                    <span className="text-gray-400">Product Image</span>
                  </div>
                )}
              </div>
              
              {/* Progress Indicators */}
              <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {products.map((_, index) => (
                  <div
                    key={index}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentIndex ? 'bg-royal-gold' : 'bg-royal-gold/30'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Product Details */}
            <div className="space-y-6">
              <div className="space-y-2">
                <span className="text-royal-gold font-medium text-sm uppercase tracking-wide">
                  Featured Product
                </span>
                <h2 className="text-4xl lg:text-5xl font-bold text-royal-brown leading-tight">
                  {currentProduct?.title || 'Featured Product'}
                </h2>
              </div>

              <p className="text-gray-600 text-lg leading-relaxed max-w-md">
                {currentProduct?.description || 'Discover our authentic handcrafted delicacies made with traditional recipes and premium ingredients.'}
              </p>

              {currentProduct?.variants?.[0] && (
                <div className="space-y-4">
                  <div className="text-3xl font-bold text-royal-gold">
                    {formatPrice(currentProduct.variants[0].price)}
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button
                      onClick={() => handleAddToCart(currentProduct)}
                      className="bg-royal-gold hover:bg-royal-darkGold text-white px-8 py-3 text-lg"
                      disabled={!currentProduct.variants[0].availableForSale}
                    >
                      {currentProduct.variants[0].availableForSale ? 'Add to Cart' : 'Out of Stock'}
                    </Button>
                    
                    <Button
                      asChild
                      variant="outline"
                      className="border-royal-gold text-royal-gold hover:bg-royal-gold hover:text-white px-8 py-3 text-lg"
                    >
                      <Link to={`/product/${currentProduct.handle}`}>
                        View Details
                      </Link>
                    </Button>
                  </div>
                </div>
              )}

              {/* Product Counter */}
              <div className="text-sm text-gray-500">
                {currentIndex + 1} of {products.length}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HalfScreenScroll;
