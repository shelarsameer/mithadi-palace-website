import React, { useEffect, useState } from 'react';
import { fetchProducts, ShopifyProduct, formatPrice } from '@/lib/shopify';
import BuyButton from '@/components/BuyButton';
import { Link } from 'react-router-dom';
import { useCart } from '@/lib/cart-context';
import { Loader2, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const Products = () => {
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { addToCart } = useCart();

  useEffect(() => {
    const loadProducts = async () => {
      try {
        console.log('Starting to load products...');
        setLoading(true);
        setError(null); // Reset any previous errors
        
        // Check if environment variables are loaded correctly
        const shopifyDomain = import.meta.env.VITE_SHOPIFY_STORE_DOMAIN;
        const shopifyToken = import.meta.env.VITE_SHOPIFY_STOREFRONT_TOKEN;
        
        console.log('Environment variables check:', {
          domain: shopifyDomain ? shopifyDomain : 'missing',
          hasToken: !!shopifyToken,
          tokenPreview: shopifyToken ? `${String(shopifyToken).substring(0, 4)}...` : 'missing'
        });
        
        // Validate environment variables before making API call
        if (!shopifyDomain || !shopifyToken) {
          console.error('Missing Shopify credentials in environment variables');
          setError('Missing Shopify configuration. Please check your .env file.');
          return;
        }
        
        // Fetch products from Shopify
        const data = await fetchProducts();
        console.log('Products data received:', data ? 'success' : 'null/undefined');
        
        // Validate the response data
        if (!data) {
          setError('No data received from Shopify API.');
        } else if (Array.isArray(data) && data.length === 0) {
          console.warn('Products array is empty. Check if products exist in Shopify store.');
          setError('No products found in your Shopify store. Please add some products.');
        } else if (!Array.isArray(data)) {
          console.error('Data is not an array:', data);
          setError('Received invalid data format from Shopify API.');
        } else {
          console.log(`Successfully loaded ${data.length} products`);
          
          // Log first product for debugging
          if (data.length > 0) {
            console.log('Sample product:', {
              id: data[0].id,
              title: data[0].title,
              hasImages: data[0].images?.length > 0,
              hasVariants: data[0].variants?.length > 0
            });
          }
          
          setProducts(data);
        }
      } catch (err) {
        console.error('Error loading products:', err);
        
        // Provide detailed error message based on the error type
        if (err instanceof Error) {
          if (err.message.includes('NetworkError') || err.message.includes('Failed to fetch')) {
            setError('Network error: Unable to connect to Shopify. Please check your internet connection.');
          } else if (err.message.includes('401') || err.message.includes('unauthorized')) {
            setError('Authentication error: Invalid Shopify API credentials. Please check your Storefront API token.');
          } else if (err.message.includes('404')) {
            setError('Not found: The Shopify API endpoint could not be found. Please check your store domain.');
          } else {
            setError(`Error loading products: ${err.message}`);
          }
        } else {
          setError('An unexpected error occurred while loading products. Please try again later.');
        }
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  const handleAddToCart = (product: ShopifyProduct) => {
    if (product.variants && product.variants.length > 0) {
      const variant = product.variants[0];
      addToCart(product, variant, 1);
      toast.success(`${product.title} added to cart!`);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto py-12 px-4">
        <h1 className="text-4xl font-bold mb-8 text-center text-primary">Our Delicious Products</h1>
        <div className="flex justify-center items-center min-h-[300px]">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto py-12 px-4">
        <h1 className="text-4xl font-bold mb-8 text-center text-primary">Our Delicious Products</h1>
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded max-w-2xl mx-auto">
          {error}
        </div>
        <div className="mt-4 max-w-2xl mx-auto">
          <p>Please check your Shopify configuration in the shopify.ts file:</p>
          <ul className="list-disc pl-5 mt-2">
            <li>Verify your Shopify store domain</li>
            <li>Check your Storefront API token</li>
            <li>Ensure you have products in your Shopify store</li>
          </ul>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold mb-2 text-center text-primary">Our Delicious Products</h1>
      <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto">
        Discover our authentic Indian sweets and savories, handcrafted with traditional recipes and premium ingredients.
      </p>
      
      {products.length === 0 ? (
        <div className="text-center py-12">
          <ShoppingBag className="h-16 w-16 mx-auto text-gray-300 mb-4" />
          <p className="text-xl text-gray-500">No products found. Please add some products to your Shopify store.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => {
            const image = product.images && product.images.length > 0 ? product.images[0] : null;
            const variant = product.variants && product.variants.length > 0 ? product.variants[0] : null;
            
            return (
              <div key={product.id} className="border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all bg-white">
                <Link to={`/product/${product.handle}`} className="block">
                  {image ? (
                    <div className="aspect-square overflow-hidden bg-gray-50 relative group">
                      <img 
                        src={image.url} 
                        alt={image.altText || product.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300"></div>
                    </div>
                  ) : (
                    <div className="aspect-square bg-gray-100 flex items-center justify-center">
                      <ShoppingBag className="h-12 w-12 text-gray-300" />
                    </div>
                  )}
                </Link>
                
                <div className="p-5">
                  <Link to={`/product/${product.handle}`} className="block">
                    <h2 className="text-xl font-bold mb-2 hover:text-primary transition-colors">{product.title}</h2>
                  </Link>
                  
                  <p className="text-gray-600 mb-4 line-clamp-2 text-sm">{product.description}</p>
                  
                  <div className="flex justify-between items-center">
                    {variant ? (
                      <span className="text-lg font-bold text-primary">{formatPrice(variant.price)}</span>
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
      )}
    </div>
  );
};

export default Products;
