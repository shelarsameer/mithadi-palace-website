
import React, { useEffect, useState } from 'react';
import { fetchProducts, ShopifyProduct, formatPrice } from '@/lib/shopify';
import { Link } from 'react-router-dom';
import { useCart } from '@/lib/cart-context';
import { Loader2, ShoppingBag, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { VariantSelector } from '@/components/VariantSelector';

const Products = () => {
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<ShopifyProduct | null>(null);
  const [isVariantSelectorOpen, setIsVariantSelectorOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('All Products');

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const data = await fetchProducts();
        
        if (!data) {
          setError('No data received from Shopify API.');
        } else if (Array.isArray(data) && data.length === 0) {
          setError('No products found in your Shopify store. Please add some products.');
        } else if (!Array.isArray(data)) {
          setError('Received invalid data format from Shopify API.');
        } else {
          setProducts(data);
          setFilteredProducts(data);
        }
      } catch (err) {
        console.error('Error loading products:', err);
        if (err instanceof Error) {
          setError(`Error loading products: ${err.message}`);
        } else {
          setError('An unexpected error occurred while loading products.');
        }
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  const handleAddToCart = (product: ShopifyProduct) => {
    if (product.variants && product.variants.length > 1) {
      setSelectedProduct(product);
      setIsVariantSelectorOpen(true);
    } else if (product.variants && product.variants.length === 1) {
      // Single variant, add directly
      const variant = product.variants[0];
      // You would call addToCart here for single variants
    }
  };

  // Get unique categories
  const categories = React.useMemo(() => {
    const uniqueCategories = Array.from(new Set(products.map(product => product.productType || 'Other')));
    return ['All Products', ...uniqueCategories];
  }, [products]);

  // Filter products by category
  useEffect(() => {
    if (activeCategory === 'All Products') {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(products.filter(product => product.productType === activeCategory));
    }
  }, [activeCategory, products]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-royal-cream via-white to-royal-cream/50">
        <div className="container mx-auto py-32 px-4">
          <div className="flex justify-center items-center min-h-[300px]">
            <Loader2 className="h-12 w-12 animate-spin text-royal-gold" />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-royal-cream via-white to-royal-cream/50">
        <div className="container mx-auto py-32 px-4">
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded max-w-2xl mx-auto">
            {error}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-royal-cream via-white to-royal-cream/50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-royal-gold/10 to-royal-darkGold/10 pt-24 pb-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-serif font-bold mb-6 text-royal-brown">
            All Products
          </h1>
          <p className="text-xl text-royal-brown/70 max-w-3xl mx-auto leading-relaxed">
            Discover our exquisite collection of authentic Indian sweets and savories, 
            handcrafted with traditional recipes and premium ingredients sourced from across India.
          </p>
        </div>
      </div>

      {/* Category Navigation */}
      <div className="sticky top-20 z-40 bg-white/80 backdrop-blur-md border-b border-royal-gold/20 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center py-6">
            <div className="flex flex-wrap gap-2 justify-center">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-6 py-3 rounded-full font-medium text-sm transition-all duration-300 ${
                    activeCategory === category
                      ? 'bg-royal-gold text-white shadow-lg transform scale-105'
                      : 'bg-white text-royal-brown border border-royal-gold/30 hover:bg-royal-gold/10 hover:border-royal-gold'
                  }`}
                >
                  {category}
                  <span className="ml-2 text-xs opacity-75">
                    ({category === 'All Products' ? products.length : filteredProducts.length})
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Products Section */}
      <div className="container mx-auto py-16 px-4">
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20">
            <ShoppingBag className="h-20 w-20 mx-auto text-royal-gold/50 mb-6" />
            <h3 className="text-2xl font-semibold text-royal-brown mb-2">No products found</h3>
            <p className="text-royal-brown/60">Try selecting a different category</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredProducts.map((product) => {
              const image = product.images && product.images.length > 0 ? product.images[0] : null;
              const variant = product.variants && product.variants.length > 0 ? product.variants[0] : null;
              
              return (
                <div key={product.id} className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
                  <Link to={`/product/${product.handle}`} className="block">
                    {image ? (
                      <div className="aspect-square overflow-hidden bg-gradient-to-br from-royal-cream to-white relative">
                        <img 
                          src={image.url} 
                          alt={image.altText || product.title} 
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                        <div className="absolute top-4 right-4 bg-royal-gold text-white px-3 py-1 rounded-full text-xs font-medium">
                          Premium
                        </div>
                      </div>
                    ) : (
                      <div className="aspect-square bg-gradient-to-br from-royal-cream to-white flex items-center justify-center">
                        <ShoppingBag className="h-16 w-16 text-royal-gold/30" />
                      </div>
                    )}
                  </Link>
                  
                  <div className="p-6">
                    <Link to={`/product/${product.handle}`} className="block">
                      <h3 className="font-serif font-semibold text-xl text-royal-brown mb-3 leading-tight group-hover:text-royal-gold transition-colors line-clamp-2">
                        {product.title}
                      </h3>
                    </Link>
                    
                    {/* Rating Stars */}
                    <div className="flex items-center mb-3">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="h-4 w-4 fill-royal-gold text-royal-gold" />
                      ))}
                      <span className="text-sm text-royal-brown/60 ml-2">(4.8)</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      {variant ? (
                        <div className="flex flex-col">
                          <span className="text-2xl font-bold text-royal-gold">
                            {formatPrice(variant.price)}
                            {product.variants.length > 1 && <span className="text-sm text-royal-brown/60 ml-1">onwards</span>}
                          </span>
                          {product.variants.length > 1 && (
                            <span className="text-xs text-royal-brown/50">Multiple variants available</span>
                          )}
                        </div>
                      ) : (
                        <span className="text-xl font-bold text-royal-brown/40">Price unavailable</span>
                      )}
                      
                      {variant && variant.availableForSale ? (
                        <Button 
                          onClick={() => handleAddToCart(product)}
                          size="sm"
                          className="bg-royal-gold hover:bg-royal-darkGold text-white px-6 py-2 rounded-full font-medium shadow-lg hover:shadow-xl transition-all duration-300"
                        >
                          Add to Cart
                        </Button>
                      ) : (
                        <Button disabled size="sm" className="rounded-full">
                          Out of Stock
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Variant Selector Modal */}
      {selectedProduct && (
        <VariantSelector
          product={selectedProduct}
          isOpen={isVariantSelectorOpen}
          onClose={() => {
            setIsVariantSelectorOpen(false);
            setSelectedProduct(null);
          }}
        />
      )}
    </div>
  );
};

export default Products;
