
import React, { useEffect, useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Award, Users, Clock, Heart } from 'lucide-react';

const AboutSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    const element = document.getElementById('about');
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);

  const stats = [
    { icon: Award, number: '50+', label: 'Years of Excellence', color: 'text-royal-gold' },
    { icon: Users, number: '10K+', label: 'Happy Customers', color: 'text-green-600' },
    { icon: Clock, number: '24/7', label: 'Fresh Production', color: 'text-blue-600' },
    { icon: Heart, number: '100%', label: 'Pure Ingredients', color: 'text-red-500' }
  ];

  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content Side */}
          <div className={`space-y-8 ${isVisible ? 'animate-slide-in' : 'opacity-0'}`}>
            <div>
              <Badge className="bg-royal-gold/10 text-royal-gold hover:bg-royal-gold/20 mb-4">
                Our Story
              </Badge>
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-royal-brown mb-6 leading-tight">
                Crafting Sweet Memories Since 1970
              </h2>
              <div className="space-y-4 text-lg text-gray-600 leading-relaxed">
                <p>
                  At Mithadi Sweets, we believe that every sweet tells a story. For over five decades, 
                  our family has been dedicated to creating the finest traditional Indian sweets, 
                  preserving age-old recipes while embracing modern quality standards.
                </p>
                <p>
                  From our humble beginnings in a small kitchen to becoming a trusted name in premium 
                  sweets, our journey has been sweetened by the love and trust of thousands of families 
                  who choose us for their special moments.
                </p>
                <p>
                  Every piece we create is handcrafted with pure ingredients, traditional techniques, 
                  and most importantly, with love. Because we believe that the best sweets are made 
                  not just with skill, but with heart.
                </p>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat, index) => (
                <Card key={index} className="border-0 bg-gradient-to-br from-royal-cream to-white royal-shadow hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6 text-center">
                    <stat.icon className={`w-8 h-8 ${stat.color} mx-auto mb-3`} />
                    <div className="font-serif text-3xl font-bold text-royal-brown mb-1">
                      {stat.number}
                    </div>
                    <div className="text-sm text-gray-600 font-medium">
                      {stat.label}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Image Side */}
          <div className={`relative ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
            <div className="relative">
              {/* Main Image */}
              <div className="relative overflow-hidden rounded-2xl royal-shadow">
                <img
                  src="https://images.unsplash.com/photo-1721322800607-8c38375eef04?auto=format&fit=crop&w=800&q=80"
                  alt="Traditional sweet making process"
                  className="w-full h-96 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-royal-brown/20 to-transparent"></div>
              </div>

              {/* Floating Card */}
              <Card className="absolute -bottom-6 -left-6 bg-white border-0 royal-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-royal-gold to-royal-darkGold rounded-full flex items-center justify-center">
                      <Heart className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <div className="font-serif text-2xl font-bold text-royal-brown">
                        Made with Love
                      </div>
                      <div className="text-sm text-gray-600">
                        Traditional recipes, modern quality
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Decorative Elements */}
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-royal-gold/10 rounded-full animate-float"></div>
              <div className="absolute top-1/2 -right-8 w-16 h-16 bg-royal-darkGold/10 rounded-full animate-float" style={{ animationDelay: '1s' }}></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
