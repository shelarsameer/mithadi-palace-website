
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Truck, Shield, Clock, Award, Phone, MapPin, Heart, Gift } from 'lucide-react';

const InteractiveFeatures = () => {
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const features = [
    {
      icon: Truck,
      title: "Free Delivery",
      description: "Complimentary delivery on orders above ₹999",
      detail: "We ensure your sweets reach you fresh and on time, with special packaging to maintain quality.",
      color: "bg-blue-500",
      gradient: "from-blue-500 to-blue-600"
    },
    {
      icon: Shield,
      title: "Quality Assured",
      description: "100% natural ingredients with no preservatives",
      detail: "Every sweet is crafted with premium ingredients and undergoes strict quality checks.",
      color: "bg-green-500",
      gradient: "from-green-500 to-green-600"
    },
    {
      icon: Clock,
      title: "Fresh Daily",
      description: "Made fresh every morning in our kitchen",
      detail: "Our sweets are prepared daily using traditional methods to ensure maximum freshness.",
      color: "bg-orange-500",
      gradient: "from-orange-500 to-orange-600"
    },
    {
      icon: Award,
      title: "Award Winning",
      description: "Recognized for excellence in traditional sweets",
      detail: "Winner of multiple culinary awards for maintaining authentic taste and quality.",
      color: "bg-purple-500",
      gradient: "from-purple-500 to-purple-600"
    }
  ];

  const stats = [
    { number: "50+", label: "Sweet Varieties", icon: Heart },
    { number: "10k+", label: "Happy Customers", icon: Award },
    { number: "25+", label: "Years Experience", icon: Clock },
    { number: "5★", label: "Average Rating", icon: Award }
  ];

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top
        });
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
      return () => container.removeEventListener('mousemove', handleMouseMove);
    }
  }, []);

  return (
    <section className="py-20 bg-gradient-to-br from-royal-brown via-royal-darkBrown to-royal-brown relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-32 h-32 bg-royal-gold/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-20 w-48 h-48 bg-royal-gold/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
      </div>

      <div ref={containerRef} className="container mx-auto px-4 relative">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge className="bg-royal-gold/20 text-royal-gold hover:bg-royal-gold/30 mb-4">
            Why Choose Mithadi
          </Badge>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-white mb-6">
            Excellence in Every Bite
          </h2>
          <p className="text-xl text-royal-cream max-w-3xl mx-auto">
            Experience the difference that quality, tradition, and passion make
          </p>
        </div>

        {/* Interactive Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card
                key={index}
                className="group relative overflow-hidden border-0 bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all duration-500 transform hover:-translate-y-2 cursor-pointer"
                onMouseEnter={() => setHoveredFeature(index)}
                onMouseLeave={() => setHoveredFeature(null)}
              >
                <CardContent className="p-8 text-center relative z-10">
                  <div className={`w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-br ${feature.gradient} flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-serif text-xl font-bold text-white mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-royal-cream mb-4">
                    {feature.description}
                  </p>
                  <div className={`overflow-hidden transition-all duration-500 ${
                    hoveredFeature === index ? 'max-h-32 opacity-100' : 'max-h-0 opacity-0'
                  }`}>
                    <p className="text-sm text-royal-cream/80 pt-4 border-t border-white/20">
                      {feature.detail}
                    </p>
                  </div>
                </CardContent>
                
                {/* Hover Effect Background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
              </Card>
            );
          })}
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="text-center group"
                style={{
                  transform: `translate(${(mousePosition.x - window.innerWidth / 2) * 0.01}px, ${(mousePosition.y - window.innerHeight / 2) * 0.01}px)`,
                  transition: 'transform 0.1s ease-out'
                }}
              >
                <div className="inline-flex items-center justify-center w-12 h-12 mb-4 rounded-full bg-royal-gold/20 group-hover:bg-royal-gold/30 transition-colors duration-300">
                  <Icon className="w-6 h-6 text-royal-gold" />
                </div>
                <div className="font-serif text-3xl md:text-4xl font-bold text-white mb-2 group-hover:text-royal-gold transition-colors duration-300">
                  {stat.number}
                </div>
                <div className="text-royal-cream font-medium">
                  {stat.label}
                </div>
              </div>
            );
          })}
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button size="lg" className="bg-royal-gold hover:bg-royal-darkGold text-white px-8 py-4 text-lg font-semibold transform hover:scale-105 transition-all duration-300">
              <Phone className="w-5 h-5 mr-2" />
              Call Us Now
            </Button>
            <Button variant="outline" size="lg" className="border-2 border-royal-gold text-royal-gold hover:bg-royal-gold hover:text-white px-8 py-4 text-lg font-semibold">
              <MapPin className="w-5 h-5 mr-2" />
              Visit Store
            </Button>
            <Button variant="ghost" size="lg" className="text-royal-gold hover:text-white hover:bg-royal-gold/20 px-8 py-4 text-lg">
              <Gift className="w-5 h-5 mr-2" />
              Gift Cards
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InteractiveFeatures;
