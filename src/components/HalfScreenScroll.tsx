
import React, { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { fetchProductByHandle, ShopifyProduct, formatPrice } from '@/lib/shopify';
import { Button } from '@/components/ui/button';
import { useCart } from '@/lib/cart-context';

const FEATURED_PRODUCT_HANDLES = [
  'kaju-katli-1-kg',
  'motichur-laddu-1-kg', 
  'rasgulla-1-kg'
];

const HalfScreenScroll = () => {
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  const { ref: section1Ref, inView: section1InView } = useInView({ threshold: 0.3 });
  const { ref: section2Ref, inView: section2InView } = useInView({ threshold: 0.3 });

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const productPromises = FEATURED_PRODUCT_HANDLES.map(handle => 
          fetchProductByHandle(handle).catch(err => {
            console.warn(`Failed to fetch product ${handle}:`, err);
            return null;
          })
        );
        
        const fetchedProducts = await Promise.all(productPromises);
        const validProducts = fetchedProducts.filter(product => product !== null) as ShopifyProduct[];
        setProducts(validProducts);
      } catch (error) {
        console.error('Error loading featured products:', error);
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
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-royal-cream">
        <div className="text-royal-brown">Loading featured products...</div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* First Section */}
      <div 
        ref={section1Ref}
        className="relative min-h-screen flex items-center justify-center"
      >
        {/* Background Image with proper aspect ratio */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ 
            backgroundImage: products[0]?.images[0]?.url 
              ? `url(${products[0].images[0].url})` 
              : 'url("https://cdn.shopify.com/s/files/1/0709/3465/9249/files/Mithadi_TheClickerGuyStudios-001.jpg")',
            backgroundAttachment: 'fixed'
          }}
        />
        <div className="absolute inset-0 bg-black/40"></div>
        
        {/* Content */}
        <div className={`relative z-10 text-center text-white max-w-4xl mx-auto px-4 transition-all duration-1000 ${
          section1InView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <h2 className="text-4xl md:text-6xl font-serif font-bold mb-6">
            Handcrafted with Love
          </h2>
          <p className="text-xl md:text-2xl mb-8 leading-relaxed">
            Every sweet tells a story of tradition, crafted with the finest ingredients 
            and generations of expertise passed down through our family.
          </p>
          {products[0] && (
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 inline-block">
              <h3 className="text-2xl font-semibold mb-2">{products[0].title}</h3>
              <p className="text-royal-gold text-xl font-bold mb-4">
                {products[0].variants[0] && formatPrice(products[0].variants[0].price)}
              </p>
              <Button 
                onClick={() => handleAddToCart(products[0])}
                className="bg-royal-gold hover:bg-royal-darkGold text-white"
              >
                Add to Cart
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Second Section */}
      <div 
        ref={section2Ref}
        className="relative min-h-screen flex items-center justify-center"
      >
        {/* Background Image with proper aspect ratio */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ 
            backgroundImage: products[1]?.images[0]?.url 
              ? `url(${products[1].images[0].url})` 
              : 'url("https://cdn.shopify.com/s/files/1/0709/3465/9249/files/rasgulla.jpg")',
            backgroundAttachment: 'fixed'
          }}
        />
        <div className="absolute inset-0 bg-black/40"></div>
        
        {/* Content */}
        <div className={`relative z-10 text-center text-white max-w-4xl mx-auto px-4 transition-all duration-1000 ${
          section2InView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <h2 className="text-4xl md:text-6xl font-serif font-bold mb-6">
            Fresh Daily Delights
          </h2>
          <p className="text-xl md:text-2xl mb-8 leading-relaxed">
            Made fresh every morning using traditional methods and the purest ingredients, 
            ensuring each bite delivers authentic taste and quality.
          </p>
          {products[1] && (
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 inline-block">
              <h3 className="text-2xl font-semibold mb-2">{products[1].title}</h3>
              <p className="text-royal-gold text-xl font-bold mb-4">
                {products[1].variants[0] && formatPrice(products[1].variants[0].price)}
              </p>
              <Button 
                onClick={() => handleAddToCart(products[1])}
                className="bg-royal-gold hover:bg-royal-darkGold text-white"
              >
                Add to Cart
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HalfScreenScroll;
