
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ChevronLeft, ChevronRight, Star, Heart, ShoppingCart } from 'lucide-react';

const ProductCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const products = [
    {
      id: 1,
      name: "Kaju Katli",
      description: "Premium cashew sweets with silver leaf",
      price: "₹850/kg",
      image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?auto=format&fit=crop&w=400&q=80",
      rating: 4.9,
      badge: "Best Seller",
      badgeColor: "bg-royal-gold"
    },
    {
      id: 2,
      name: "Rasgulla",
      description: "Soft & spongy cottage cheese balls in syrup",
      price: "₹450/kg",
      image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?auto=format&fit=crop&w=400&q=80",
      rating: 4.8,
      badge: "Fresh",
      badgeColor: "bg-green-500"
    },
    {
      id: 3,
      name: "Gulab Jamun",
      description: "Golden brown milk dumplings in rose syrup",
      price: "₹520/kg",
      image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=400&q=80",
      rating: 4.7,
      badge: "Popular",
      badgeColor: "bg-red-500"
    },
    {
      id: 4,
      name: "Barfi Special",
      description: "Rich milk cake with dry fruits & nuts",
      price: "₹720/kg",
      image: "https://images.unsplash.com/photo-1493397212122-2b85dda8106b?auto=format&fit=crop&w=400&q=80",
      rating: 4.9,
      badge: "Premium",
      badgeColor: "bg-purple-500"
    },
    {
      id: 5,
      name: "Motichoor Laddu",
      description: "Traditional gram flour pearls laddu",
      price: "₹480/kg",
      image: "https://images.unsplash.com/photo-1582562124811-c09040d0a901?auto=format&fit=crop&w=400&q=80",
      rating: 4.6,
      badge: "Traditional",
      badgeColor: "bg-orange-500"
    },
    {
      id: 6,
      name: "Kalakand",
      description: "Milk cake with cardamom flavor",
      price: "₹650/kg",
      image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?auto=format&fit=crop&w=400&q=80",
      rating: 4.8,
      badge: "Special",
      badgeColor: "bg-blue-500"
    }
  ];

  const itemsPerView = 3;
  const maxIndex = Math.max(0, products.length - itemsPerView);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  return (
    <section id="products" className="py-20 bg-gradient-to-br from-royal-cream to-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge className="bg-royal-gold/10 text-royal-gold hover:bg-royal-gold/20 mb-4">
            Our Specialties
          </Badge>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-royal-brown mb-6">
            Premium Sweet Collection
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Discover our handcrafted sweets made with the finest ingredients and traditional recipes. 
            Each piece is a celebration of taste and heritage.
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)` }}
            >
              {products.map((product) => (
                <div key={product.id} className="flex-none w-full md:w-1/2 lg:w-1/3 px-3">
                  <Card className="group overflow-hidden border-0 royal-shadow hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 bg-white">
                    <div className="relative overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      
                      {/* Badge */}
                      <Badge className={`absolute top-4 left-4 ${product.badgeColor} text-white border-0`}>
                        {product.badge}
                      </Badge>
                      
                      {/* Wishlist */}
                      <button className="absolute top-4 right-4 w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center text-royal-brown hover:bg-white transition-all duration-300 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0">
                        <Heart className="w-5 h-5" />
                      </button>
                      
                      {/* Quick Add Button */}
                      <button className="absolute bottom-4 left-1/2 transform -translate-x-1/2 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                        <Button size="sm" className="bg-royal-gold hover:bg-royal-darkGold text-white">
                          <ShoppingCart className="w-4 h-4 mr-2" />
                          Quick Add
                        </Button>
                      </button>
                    </div>
                    
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-serif text-xl font-semibold text-royal-brown">
                          {product.name}
                        </h3>
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 text-royal-gold fill-current" />
                          <span className="text-sm font-medium text-gray-600">{product.rating}</span>
                        </div>
                      </div>
                      
                      <p className="text-gray-600 mb-4 leading-relaxed">
                        {product.description}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-xl text-royal-brown">
                          {product.price}
                        </span>
                        <Button variant="outline" className="border-royal-gold text-royal-gold hover:bg-royal-gold hover:text-white">
                          Add to Cart
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 bg-white royal-shadow hover:bg-royal-gold hover:text-white text-royal-brown p-3 rounded-full transition-all duration-300 z-10"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 bg-white royal-shadow hover:bg-royal-gold hover:text-white text-royal-brown p-3 rounded-full transition-all duration-300 z-10"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center mt-8 space-x-3">
          {Array.from({ length: maxIndex + 1 }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? 'bg-royal-gold scale-125'
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Button size="lg" className="bg-royal-gold hover:bg-royal-darkGold text-white px-8 py-4 text-lg font-semibold">
            View All Products
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProductCarousel;
