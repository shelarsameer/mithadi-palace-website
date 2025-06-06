import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchProducts, formatPrice, PRODUCT_CATEGORIES, ShopifyProduct } from '@/lib/shopify';
import { Button } from '@/components/ui/button';
import { useCart } from '@/lib/cart-context';
import { ShoppingBag } from 'lucide-react';

export function CategoryProducts() {
  const { categoryId } = useParams<{ categoryId: string }>();
  const { addToCart } = useCart();
  
  const { data: products, isLoading, error } = useQuery<ShopifyProduct[]>({
    queryKey: ['products'],
    queryFn: fetchProducts,
  });

  // Find the category by ID
  const category = PRODUCT_CATEGORIES.find(cat => cat.id === categoryId);
  
  // Filter products by category
  const filteredProducts = React.useMemo(() => {
    if (!products || !categoryId) return [];
    
    return products.filter(product => {
      // Check if the product has tags that match the category
      return product.tags?.some(tag => tag.toLowerCase() === categoryId.toLowerCase());
    });
  }, [products, categoryId]);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-24 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-24">
        <div className="text-center">
          <h2 className="text-2xl font-bold">Error loading products</h2>
          <p className="mt-2 text-muted-foreground">
            We couldn't load the products. Please try again later.
          </p>
        </div>
      </div>
    );
  }

  if (!category) {
    return (
      <div className="container mx-auto px-4 py-24">
        <div className="text-center">
          <h2 className="text-2xl font-bold">Category not found</h2>
          <p className="mt-2 text-muted-foreground">
            We couldn't find the category you're looking for.
          </p>
          <Button asChild className="mt-4">
            <Link to="/products">View All Products</Link>
          </Button>
        </div>
      </div>
    );
  }

  if (filteredProducts.length === 0) {
    return (
      <div className="container mx-auto px-4 py-24">
        <h1 className="text-3xl font-bold mb-8">{category.name}</h1>
        <div className="text-center py-12">
          <ShoppingBag className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
          <h2 className="text-xl font-medium">No products found</h2>
          <p className="mt-2 text-muted-foreground">
            We don't have any products in this category yet.
          </p>
          <Button asChild className="mt-4">
            <Link to="/products">View All Products</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-24">
      <h1 className="text-3xl font-bold mb-8">{category.name}</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product) => {
          const firstVariant = product.variants[0];
          
          return (
            <div key={product.id} className="group border rounded-lg overflow-hidden">
              <Link to={`/product/${product.handle}`} className="block aspect-square overflow-hidden bg-muted">
                {product.images.length > 0 ? (
                  <img
                    src={product.images[0].url}
                    alt={product.images[0].altText || product.title}
                    className="h-full w-full object-cover object-center transition-transform group-hover:scale-105"
                  />
                ) : (
                  <div className="h-full w-full flex items-center justify-center bg-muted">
                    <ShoppingBag className="h-12 w-12 text-muted-foreground" />
                  </div>
                )}
              </Link>
              
              <div className="p-4">
                <Link to={`/product/${product.handle}`} className="block">
                  <h3 className="font-medium text-lg group-hover:underline">{product.title}</h3>
                  {firstVariant && (
                    <p className="mt-1 font-medium text-muted-foreground">
                      {formatPrice(firstVariant.price)}
                    </p>
                  )}
                </Link>
                
                <div className="mt-4">
                  <Button 
                    className="w-full"
                    onClick={() => firstVariant && addToCart(product, firstVariant, 1)}
                    disabled={!firstVariant}
                  >
                    Add to Cart
                  </Button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default CategoryProducts;
