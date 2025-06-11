
import React, { useEffect, useState } from 'react';
import { fetchProducts, ShopifyProduct } from '@/lib/shopify';
import { Button } from '@/components/ui/button';
import { ArrowRight, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import ProductCard from './ProductCard';

const SnacksFarsanSection = () => {
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProducts();
        if (data && Array.isArray(data)) {
          // Get first 8 products for display
          setProducts(data.slice(0, 8));
        }
      } catch (error) {
        console.error('Error loading products:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  if (loading) {
    return (
      <section className="py-16 md:py-24 bg-gradient-to-br from-royal-cream via-white to-royal-cream/50">
        <div className="container mx-auto px-4">
          <div className="flex justify-center items-center min-h-[200px]">
            <Loader2 className="h-12 w-12 animate-spin text-royal-gold" />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-royal-cream via-white to-royal-cream/50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-royal-brown mb-6">
            Premium Sweet Collections
          </h2>
          <p className="text-lg md:text-xl text-royal-brown/70 max-w-3xl mx-auto leading-relaxed">
            Indulge in our handcrafted selection of traditional Indian sweets and modern delicacies, 
            made with the finest ingredients and passed-down family recipes.
          </p>
        </div>

        {/* Products Grid */}
        {products.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 mb-12">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-lg text-royal-brown/60">No products available at the moment.</p>
          </div>
        )}

        {/* View All Button */}
        <div className="text-center">
          <Link to="/products">
            <Button 
              size="lg" 
              className="bg-royal-gold hover:bg-royal-darkGold text-white px-8 py-4 text-lg font-semibold transition-all duration-300 transform hover:scale-105 group"
            >
              View All Products
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default SnacksFarsanSection;
