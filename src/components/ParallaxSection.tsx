
import React, { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Play, ArrowRight, Star } from 'lucide-react';

const ParallaxSection = () => {
  const [scrollY, setScrollY] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section ref={sectionRef} className="relative h-screen overflow-hidden flex items-center">
      {/* Parallax Background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&w=1920&q=80)',
          transform: `translateY(${scrollY * 0.5}px)`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-black/60"></div>
      </div>

      {/* Floating Elements */}
      <div
        className="absolute top-20 left-20 w-20 h-20 bg-royal-gold/20 rounded-full blur-xl"
        style={{
          transform: `translateY(${scrollY * 0.3}px) translateX(${scrollY * 0.1}px)`,
        }}
      ></div>
      <div
        className="absolute bottom-20 right-20 w-32 h-32 bg-royal-gold/10 rounded-full blur-2xl"
        style={{
          transform: `translateY(${scrollY * -0.2}px) translateX(${scrollY * -0.1}px)`,
        }}
      ></div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4">
        <div className="max-w-4xl">
          <div
            className="transform transition-all duration-1000"
            style={{
              transform: `translateY(${scrollY * 0.1}px)`,
            }}
          >
            <Badge className="bg-royal-gold/20 text-royal-gold hover:bg-royal-gold/30 mb-6 text-lg px-4 py-2">
              Our Story
            </Badge>
            
            <h2 className="font-serif text-5xl md:text-7xl font-bold text-white mb-8 leading-tight">
              Crafting Sweet
              <span className="block text-royal-gold">Memories</span>
              Since 1998
            </h2>
            
            <p className="text-xl md:text-2xl text-royal-cream mb-8 max-w-3xl leading-relaxed">
              From a small family kitchen to becoming the city's most beloved sweet shop, 
              our journey has been sweetened by the love and trust of thousands of families.
            </p>

            <div className="flex items-center gap-6 mb-8">
              <div className="flex items-center gap-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-6 h-6 text-royal-gold fill-current" />
                ))}
                <span className="text-white ml-2 font-semibold">4.9/5</span>
              </div>
              <div className="text-royal-cream">
                Based on 2,500+ reviews
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-6">
              <Button 
                size="lg" 
                className="bg-royal-gold hover:bg-royal-darkGold text-white px-8 py-4 text-lg font-semibold transform hover:scale-105 transition-all duration-300"
              >
                Explore Our Legacy
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              
              <Button 
                variant="outline" 
                size="lg" 
                className="border-2 border-white text-white hover:bg-white hover:text-royal-brown px-8 py-4 text-lg font-semibold group"
              >
                <Play className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform duration-300" />
                Watch Our Story
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-royal-cream to-transparent"></div>
    </section>
  );
};

export default ParallaxSection;
