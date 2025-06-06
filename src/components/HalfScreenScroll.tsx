
import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, Heart, ShoppingCart, ArrowRight, ChefHat, Award } from 'lucide-react';

const HalfScreenScroll = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const products = [
    {
      id: 1,
      name: "Premium Kaju Katli",
      description: "Handcrafted cashew diamonds with edible silver leaf, made from the finest cashews sourced directly from Goa. Each piece melts in your mouth with a rich, creamy texture.",
      price: "₹850",
      originalPrice: "₹950",
      image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?auto=format&fit=crop&w=600&q=80",
      rating: 4.9,
      reviews: 234,
      badge: "Best Seller",
      badgeColor: "bg-royal-gold",
      features: ["Pure Cashews", "Silver Leaf", "No Artificial Colors"],
      weight: "500g"
    },
    {
      id: 2,
      name: "Royal Rasgulla",
      description: "Soft, spongy cottage cheese balls soaked in aromatic rose-cardamom syrup. Made fresh daily using traditional Bengali recipes passed down through generations.",
      price: "₹450",
      originalPrice: "₹520",
      image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?auto=format&fit=crop&w=600&q=80",
      rating: 4.8,
      reviews: 187,
      badge: "Fresh Daily",
      badgeColor: "bg-green-500",
      features: ["Fresh Cottage Cheese", "Rose Water", "Zero Trans Fat"],
      weight: "1kg (12 pieces)"
    },
    {
      id: 3,
      name: "Gulab Jamun Royale",
      description: "Golden brown milk dumplings in fragrant rose syrup, enriched with cardamom and saffron. Each piece is perfectly sized and incredibly soft.",
      price: "₹520",
      originalPrice: "₹600",
      image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=600&q=80",
      rating: 4.7,
      reviews: 156,
      badge: "Signature",
      badgeColor: "bg-red-500",
      features: ["Saffron Infused", "Rose Syrup", "Milk Solids"],
      weight: "750g (10 pieces)"
    },
    {
      id: 4,
      name: "Motichoor Laddu Special",
      description: "Delicate gram flour pearls bound with pure ghee and cardamom, garnished with almonds and pistachios. A festival favorite that brings joy to every celebration.",
      price: "₹480",
      originalPrice: "₹560",
      image: "https://images.unsplash.com/photo-1582562124811-c09040d0a901?auto=format&fit=crop&w=600&q=80",
      rating: 4.6,
      reviews: 203,
      badge: "Festival Special",
      badgeColor: "bg-orange-500",
      features: ["Pure Ghee", "Dry Fruits", "Traditional Recipe"],
      weight: "600g (8 pieces)"
    }
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const container = containerRef.current;
        const containerTop = container.offsetTop;
        const containerHeight = container.offsetHeight;
        const scrollY = window.scrollY;
        
        const relativeScroll = scrollY - containerTop + window.innerHeight / 2;
        const sectionHeight = containerHeight / products.length;
        const newActiveIndex = Math.floor(relativeScroll / sectionHeight);
        
        if (newActiveIndex >= 0 && newActiveIndex < products.length && newActiveIndex !== activeIndex) {
          setActiveIndex(newActiveIndex);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeIndex, products.length]);

  const activeProduct = products[activeIndex] || products[0];

  return (
    <section id="handcrafted-section" className="relative bg-gradient-to-br from-royal-cream via-white to-royal-cream/50 py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge className="bg-royal-gold/10 text-royal-gold hover:bg-royal-gold/20 mb-4">
            Signature Collection
          </Badge>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-royal-brown mb-6">
            Handcrafted Excellence
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Discover our premium sweets collection, where tradition meets perfection. Each sweet is carefully crafted using time-honored recipes and the finest ingredients.
          </p>
          
          {/* Statistics Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-royal-gold">25+</div>
              <div className="text-gray-600">Years Experience</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-royal-gold">50+</div>
              <div className="text-gray-600">Sweet Varieties</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-royal-gold">10k+</div>
              <div className="text-gray-600">Happy Customers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-royal-gold">4.8★</div>
              <div className="text-gray-600">Customer Rating</div>
            </div>
          </div>
        </div>

        <div ref={containerRef} className="grid lg:grid-cols-2 gap-12 items-start" style={{ minHeight: `${products.length * 60}vh` }}>
          {/* Fixed Product Details (Left Side) */}
          <div className="lg:sticky lg:top-24 lg:h-fit">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 royal-shadow transition-all duration-500">
              <div className="flex items-center gap-3 mb-6">
                <Badge className={`${activeProduct.badgeColor} text-white border-0`}>
                  {activeProduct.badge}
                </Badge>
                <div className="flex items-center gap-1">
                  <Star className="w-5 h-5 text-royal-gold fill-current" />
                  <span className="font-semibold text-royal-brown">{activeProduct.rating}</span>
                  <span className="text-gray-500">({activeProduct.reviews} reviews)</span>
                </div>
              </div>

              <h3 className="font-serif text-3xl font-bold text-royal-brown mb-4">
                {activeProduct.name}
              </h3>

              <p className="text-gray-700 text-lg leading-relaxed mb-6">
                {activeProduct.description}
              </p>

              <div className="flex items-center gap-4 mb-6">
                <span className="font-serif text-3xl font-bold text-royal-brown">
                  {activeProduct.price}
                </span>
                <span className="text-xl text-gray-400 line-through">
                  {activeProduct.originalPrice}
                </span>
                <Badge className="bg-green-100 text-green-800">
                  Save ₹{parseInt(activeProduct.originalPrice.slice(1)) - parseInt(activeProduct.price.slice(1))}
                </Badge>
              </div>

              <div className="mb-6">
                <h4 className="font-semibold text-royal-brown mb-3 flex items-center gap-2">
                  <ChefHat className="w-5 h-5" />
                  Key Features
                </h4>
                <div className="grid grid-cols-1 gap-2">
                  {activeProduct.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2 text-gray-700">
                      <Award className="w-4 h-4 text-royal-gold" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-3 mb-6 text-gray-600">
                <span className="font-medium">Weight:</span>
                <span>{activeProduct.weight}</span>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button className="flex-1 bg-royal-gold hover:bg-royal-darkGold text-white py-6 text-lg font-semibold">
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Add to Cart
                </Button>
                <Button variant="outline" className="flex-1 border-royal-gold text-royal-gold hover:bg-royal-gold hover:text-white py-6">
                  <Heart className="w-5 h-5 mr-2" />
                  Wishlist
                </Button>
              </div>

              <Button variant="ghost" className="w-full mt-4 text-royal-gold hover:text-royal-darkGold">
                View Product Details
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>

          {/* Fixed Product Image (Right Side) */}
          <div className="lg:sticky lg:top-24 lg:h-fit">
            <div className="relative overflow-hidden rounded-3xl royal-shadow">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-tr from-royal-gold/20 to-transparent rounded-3xl transform rotate-6 group-hover:rotate-3 transition-transform duration-500"></div>
                <img
                  src={activeProduct.image}
                  alt={activeProduct.name}
                  className="relative w-full h-96 object-cover rounded-3xl group-hover:shadow-2xl transition-all duration-500 transform group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Indicator */}
      <div className="fixed right-8 top-1/2 transform -translate-y-1/2 z-30">
        <div className="flex flex-col gap-3">
          {products.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`w-3 h-8 rounded-full transition-all duration-300 ${
                index === activeIndex
                  ? 'bg-royal-gold shadow-lg'
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HalfScreenScroll;
