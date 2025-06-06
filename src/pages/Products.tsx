
import React, { useEffect, useState } from 'react';
import { fetchProducts, ShopifyProduct, formatPrice, PRODUCT_CATEGORIES } from '@/lib/shopify';
import { Link } from 'react-router-dom';
import { useCart } from '@/lib/cart-context';
import { Loader2, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { VariantSelector } from '@/components/VariantSelector';

const Products = () => {
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<ShopifyProduct | null>(null);
  const [isVariantSelectorOpen, setIsVariantSelectorOpen] = useState(false);

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

  // Group products by category (productType)
  const groupedProducts = React.useMemo(() => {
    const groups: { [key: string]: ShopifyProduct[] } = {};
    
    products.forEach(product => {
      const category = product.productType || 'Other';
      if (!groups[category]) {
        groups[category] = [];
      }
      groups[category].push(product);
    });
    
    return groups;
  }, [products]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto py-32 px-4">
          <div className="flex justify-center items-center min-h-[300px]">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto py-32 px-4">
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded max-w-2xl mx-auto">
            {error}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto py-24 px-4 text-center">
          <h1 className="text-4xl font-bold mb-4 text-gray-900">All Products</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover our authentic Indian sweets and savories, handcrafted with traditional recipes and premium ingredients.
          </p>
        </div>
      </div>

      {/* Products Section */}
      <div className="container mx-auto py-12 px-4">
        {Object.keys(groupedProducts).length === 0 ? (
          <div className="text-center py-12">
            <ShoppingBag className="h-16 w-16 mx-auto text-gray-300 mb-4" />
            <p className="text-xl text-gray-500">No products found.</p>
          </div>
        ) : (
          <div className="space-y-12">
            {Object.entries(groupedProducts).map(([category, categoryProducts]) => (
              <div key={category}>
                {/* Category Header */}
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">{category}</h2>
                  <div className="w-20 h-1 bg-primary rounded"></div>
                </div>

                {/* Products Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {categoryProducts.map((product) => {
                    const image = product.images && product.images.length > 0 ? product.images[0] : null;
                    const variant = product.variants && product.variants.length > 0 ? product.variants[0] : null;
                    
                    return (
                      <div key={product.id} className="bg-white border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all group">
                        <Link to={`/product/${product.handle}`} className="block">
                          {image ? (
                            <div className="aspect-square overflow-hidden bg-gray-50 relative">
                              <img 
                                src={image.url} 
                                alt={image.altText || product.title} 
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                              />
                            </div>
                          ) : (
                            <div className="aspect-square bg-gray-100 flex items-center justify-center">
                              <ShoppingBag className="h-12 w-12 text-gray-300" />
                            </div>
                          )}
                        </Link>
                        
                        <div className="p-4">
                          <Link to={`/product/${product.handle}`} className="block">
                            <h3 className="font-medium text-lg mb-1 hover:text-primary transition-colors line-clamp-2">
                              {product.title}
                            </h3>
                          </Link>
                          
                          <div className="flex items-center justify-between mt-3">
                            {variant ? (
                              <span className="text-lg font-bold text-primary">
                                {formatPrice(variant.price)}
                                {product.variants.length > 1 && <span className="text-sm text-gray-500 ml-1">+</span>}
                              </span>
                            ) : (
                              <span className="text-lg font-bold text-gray-400">Price unavailable</span>
                            )}
                            
                            {variant && variant.availableForSale ? (
                              <Button 
                                onClick={() => handleAddToCart(product)}
                                size="sm"
                                className="bg-primary hover:bg-primary/90"
                              >
                                Add to Cart
                              </Button>
                            ) : (
                              <Button disabled size="sm">Out of Stock</Button>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
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
