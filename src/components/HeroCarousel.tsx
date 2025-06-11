
import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Star, ArrowDown } from 'lucide-react';

const HeroCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  const slides = [
    {
      title: "Premium Mithai Selection",
      subtitle: "Taste the Tradition",
      description: "From classic rasgullas to exotic kaju katli, discover our handcrafted sweets that bring joy to every celebration and occasion.",
      media: "https://cdn.shopify.com/s/files/1/0709/3465/9249/files/Mithadi_TheClickerGuy_Studios-086.jpg?v=1749585132",
      type: "image",
      cta: "Order Fresh"
    },
    {
      title: "Royal Sweets Collection",
      subtitle: "Crafted with Heritage & Love",
      description: "Experience the finest traditional Indian sweets made with premium ingredients and time-honored recipes passed down through generations.",
      media: "https://cdn.shopify.com/videos/c/o/v/16552ac62d8d4dbf86a25e9f97c2ae79.mp4",
      type: "video",
      cta: "Explore Collection"
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const handleVideoEnded = () => {
    nextSlide();
  };

  // Auto-advance for image slides only
  useEffect(() => {
    const currentMediaType = slides[currentSlide]?.type;
    if (currentMediaType === 'image') {
      const timer = setInterval(() => {
        nextSlide();
      }, 5000);
      return () => clearInterval(timer);
    }
  }, [currentSlide]);

  return (
    <section id="home" className="relative h-screen overflow-hidden">
      {/* Carousel Container */}
      <div className="relative w-full h-full">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
              index === currentSlide
                ? 'transform translate-x-0 opacity-100'
                : index < currentSlide
                ? 'transform -translate-x-full opacity-0'
                : 'transform translate-x-full opacity-0'
            }`}
          >
            {/* Background Media */}
            <div className="absolute inset-0">
              {slide.type === 'video' ? (
                <video
                  ref={index === currentSlide ? videoRef : null}
                  className="w-full h-full object-cover"
                  autoPlay
                  muted
                  playsInline
                  onEnded={handleVideoEnded}
                >
                  <source src={slide.media} type="video/mp4" />
                </video>
              ) : (
                <div
                  className="w-full h-full bg-cover bg-center bg-no-repeat transform scale-110"
                  style={{ 
                    backgroundImage: `url(${slide.media})`,
                    transform: `scale(1.1) translateY(${index === currentSlide ? 0 : 20}px)`,
                    transition: 'transform 1.5s ease-out'
                  }}
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/30 to-black/50"></div>
            </div>

            {/* Content */}
            <div className="relative z-10 flex items-center justify-center h-full">
              <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto text-center text-white">
                  <div className={`transition-all duration-1000 delay-300 ${
                    index === currentSlide 
                      ? 'opacity-100 translate-y-0' 
                      : 'opacity-0 translate-y-8'
                  }`}>
                    {/* Animated Stars */}
                    <div className="flex justify-center mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className="w-6 h-6 text-royal-gold fill-current animate-pulse"
                          style={{ animationDelay: `${i * 0.1}s` }}
                        />
                      ))}
                    </div>
                    
                    <p className="text-royal-gold font-medium mb-4 tracking-wider uppercase animate-fade-in">
                      {slide.subtitle}
                    </p>
                    
                    <h1 className="font-serif text-5xl md:text-7xl font-bold mb-6 leading-tight">
                      <span className="inline-block animate-slide-in" style={{ animationDelay: '0.2s' }}>
                        {slide.title.split(' ')[0]}
                      </span>{' '}
                      <span className="inline-block animate-slide-in" style={{ animationDelay: '0.4s' }}>
                        {slide.title.split(' ').slice(1).join(' ')}
                      </span>
                    </h1>
                    
                    <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed opacity-90 animate-fade-in">
                      {slide.description}
                    </p>
                    
                    <div className="flex justify-center animate-fade-in">
                      <Button 
                        size="lg" 
                        className="bg-royal-gold hover:bg-royal-darkGold text-white px-8 py-4 text-lg font-semibold transition-all duration-300 transform hover:scale-105 group"
                      >
                        {slide.cta}
                        <ArrowDown className="w-5 h-5 ml-2 group-hover:translate-y-1 transition-transform duration-300" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`relative transition-all duration-300 ${
              index === currentSlide
                ? 'w-12 h-3 bg-royal-gold'
                : 'w-3 h-3 bg-white/50 hover:bg-white/70'
            } rounded-full`}
          >
            {index === currentSlide && (
              <div className="absolute inset-0 bg-royal-gold rounded-full animate-pulse"></div>
            )}
          </button>
        ))}
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 right-8 z-20">
        <div className="text-white text-center group cursor-pointer">
          <p className="text-sm mb-2 group-hover:text-royal-gold transition-colors duration-300">
            Scroll Down
          </p>
          <div className="w-6 h-10 border-2 border-white group-hover:border-royal-gold rounded-full mx-auto relative transition-colors duration-300">
            <div className="w-1 h-3 bg-white group-hover:bg-royal-gold rounded-full absolute top-2 left-1/2 transform -translate-x-1/2 animate-bounce transition-colors duration-300"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroCarousel;
