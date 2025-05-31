
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';

const TestimonialCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: "Priya Sharma",
      location: "Mumbai",
      rating: 5,
      text: "Mithadi Sweets has been our go-to for all festivals and celebrations. Their kaju katli is absolutely divine, and the quality is consistently excellent. The taste reminds me of my grandmother's homemade sweets.",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?auto=format&fit=crop&w=100&q=80"
    },
    {
      id: 2,
      name: "Rajesh Patel",
      location: "Delhi",
      rating: 5,
      text: "I ordered a mixed box for Diwali and was amazed by the presentation and taste. Every sweet was fresh and perfectly balanced in sweetness. My guests couldn't stop praising the quality.",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=100&q=80"
    },
    {
      id: 3,
      name: "Anjali Gupta",
      location: "Bangalore",
      rating: 5,
      text: "The rasgullas are absolutely perfect - soft, spongy, and just the right amount of sweetness. I've tried many places, but Mithadi Sweets is unmatched in quality and taste. Highly recommended!",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=100&q=80"
    },
    {
      id: 4,
      name: "Vikram Singh",
      location: "Jaipur",
      rating: 5,
      text: "Being away from home, finding authentic taste was challenging until I discovered Mithadi Sweets. Their motichoor laddus taste exactly like my mother used to make. Pure nostalgia in every bite!",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    
    return () => clearInterval(timer);
  }, [testimonials.length]);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-20 bg-gradient-to-br from-royal-brown to-royal-darkBrown text-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge className="bg-royal-gold/20 text-royal-gold hover:bg-royal-gold/30 mb-4 border-royal-gold">
            Customer Stories
          </Badge>
          <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6">
            What Our Customers Say
          </h2>
          <p className="text-xl text-royal-cream max-w-3xl mx-auto leading-relaxed">
            Discover why thousands of families trust us for their sweetest moments. 
            Every review tells a story of quality, tradition, and exceptional taste.
          </p>
        </div>

        {/* Testimonial Carousel */}
        <div className="relative max-w-4xl mx-auto">
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="flex-none w-full px-4">
                  <Card className="bg-white/10 backdrop-blur-sm border-royal-gold/20 hover:bg-white/15 transition-all duration-300">
                    <CardContent className="p-8 text-center">
                      {/* Quote Icon */}
                      <div className="flex justify-center mb-6">
                        <div className="w-16 h-16 bg-royal-gold/20 rounded-full flex items-center justify-center">
                          <Quote className="w-8 h-8 text-royal-gold" />
                        </div>
                      </div>

                      {/* Rating */}
                      <div className="flex justify-center mb-6">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="w-6 h-6 text-royal-gold fill-current" />
                        ))}
                      </div>

                      {/* Testimonial Text */}
                      <blockquote className="text-lg md:text-xl leading-relaxed mb-8 text-royal-cream italic">
                        "{testimonial.text}"
                      </blockquote>

                      {/* Customer Info */}
                      <div className="flex items-center justify-center space-x-4">
                        <img
                          src={testimonial.avatar}
                          alt={testimonial.name}
                          className="w-16 h-16 rounded-full object-cover border-2 border-royal-gold"
                        />
                        <div className="text-left">
                          <div className="font-serif text-xl font-semibold text-white">
                            {testimonial.name}
                          </div>
                          <div className="text-royal-gold font-medium">
                            {testimonial.location}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevTestimonial}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-6 bg-royal-gold hover:bg-royal-darkGold text-white p-3 rounded-full transition-all duration-300 royal-shadow"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={nextTestimonial}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-6 bg-royal-gold hover:bg-royal-darkGold text-white p-3 rounded-full transition-all duration-300 royal-shadow"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center mt-8 space-x-3">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? 'bg-royal-gold scale-125'
                  : 'bg-white/30 hover:bg-white/50'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialCarousel;
