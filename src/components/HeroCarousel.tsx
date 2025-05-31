
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

const HeroCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: "Royal Sweets Collection",
      subtitle: "Crafted with Heritage & Love",
      description: "Experience the finest traditional Indian sweets made with premium ingredients and time-honored recipes passed down through generations.",
      image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?auto=format&fit=crop&w=1920&q=80",
      cta: "Explore Collection"
    },
    {
      title: "Premium Mithai Selection",
      subtitle: "Taste the Tradition",
      description: "From classic rasgullas to exotic kaju katli, discover our handcrafted sweets that bring joy to every celebration and occasion.",
      image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?auto=format&fit=crop&w=1920&q=80",
      cta: "Order Fresh"
    },
    {
      title: "Festive Special Collection",
      subtitle: "Celebrate with Sweetness",
      description: "Make your festivals extra special with our exclusive range of traditional sweets, perfect for gifting and sharing happiness.",
      image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=1920&q=80",
      cta: "Festival Packs"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    
    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <section id="home" className="relative h-screen overflow-hidden">
      {/* Carousel Container */}
      <div className="relative w-full h-full">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-transform duration-1000 ease-in-out ${
              index === currentSlide
                ? 'transform translate-x-0'
                : index < currentSlide
                ? 'transform -translate-x-full'
                : 'transform translate-x-full'
            }`}
          >
            {/* Background Image */}
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              <div className="absolute inset-0 bg-black/40"></div>
            </div>

            {/* Content */}
            <div className="relative z-10 flex items-center justify-center h-full">
              <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto text-center text-white">
                  <div className="animate-fade-in">
                    <div className="flex justify-center mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-6 h-6 text-royal-gold fill-current" />
                      ))}
                    </div>
                    <p className="text-royal-gold font-medium mb-4 tracking-wider uppercase">
                      {slide.subtitle}
                    </p>
                    <h1 className="font-serif text-5xl md:text-7xl font-bold mb-6 leading-tight">
                      {slide.title}
                    </h1>
                    <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed opacity-90">
                      {slide.description}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <Button 
                        size="lg" 
                        className="bg-royal-gold hover:bg-royal-darkGold text-white px-8 py-4 text-lg font-semibold transition-all duration-300 transform hover:scale-105"
                      >
                        {slide.cta}
                      </Button>
                      <Button 
                        variant="outline" 
                        size="lg" 
                        className="border-2 border-white text-white hover:bg-white hover:text-royal-brown px-8 py-4 text-lg font-semibold transition-all duration-300"
                      >
                        Learn More
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-3 rounded-full transition-all duration-300"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-3 rounded-full transition-all duration-300"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? 'bg-royal-gold scale-125'
                : 'bg-white/50 hover:bg-white/70'
            }`}
          />
        ))}
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 right-8 z-20 animate-float">
        <div className="text-white text-center">
          <p className="text-sm mb-2">Scroll Down</p>
          <div className="w-6 h-10 border-2 border-white rounded-full mx-auto relative">
            <div className="w-1 h-3 bg-white rounded-full absolute top-2 left-1/2 transform -translate-x-1/2 animate-pulse"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroCarousel;
