
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Award, Users, Clock, Heart } from 'lucide-react';

export function About() {
  return (
    <div className="container mx-auto px-4 py-24">
      {/* Header Section */}
      <div className="text-center mb-16">
        <Badge className="bg-royal-gold/10 text-royal-gold hover:bg-royal-gold/20 mb-4">
          Our Story
        </Badge>
        <h1 className="font-serif text-4xl md:text-5xl font-bold text-royal-brown mb-6">
          About Mithadi Palace
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Crafting sweet memories since 1998 with authentic Indian sweets and traditional recipes passed down through generations.
        </p>
      </div>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-2 gap-16 mb-20">
        {/* Left Column - Story */}
        <div className="space-y-8">
          <div>
            <h2 className="text-2xl font-bold text-royal-brown mb-4 flex items-center gap-3">
              <Heart className="w-6 h-6 text-royal-gold" />
              Our Journey
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Mithadi Palace began as a humble family venture in 1998, rooted in the rich culinary traditions of India. What started as a small kitchen operation has blossomed into one of the most trusted names in authentic Indian sweets.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Our founder's vision was simple yet profound: to preserve the authentic taste of traditional Indian sweets while maintaining the highest standards of quality and hygiene. Today, we continue this legacy with the same passion and dedication.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-royal-brown mb-4 flex items-center gap-3">
              <Award className="w-6 h-6 text-royal-gold" />
              Our Mission
            </h2>
            <p className="text-gray-700 leading-relaxed">
              At Mithadi Palace, we believe in using only the finest ingredients sourced from trusted suppliers. Every sweet is handcrafted with care, following traditional methods while incorporating modern food safety standards. We never compromise on quality or authenticity.
            </p>
          </div>
        </div>

        {/* Right Column - Image & Stats */}
        <div className="space-y-8">
          <div className="relative rounded-2xl overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?auto=format&fit=crop&w=600&q=80" 
              alt="Traditional sweet making" 
              className="w-full h-80 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
          </div>

          {/* Statistics */}
          <div className="grid grid-cols-2 gap-6">
            <div className="text-center p-6 bg-white rounded-xl shadow-sm border">
              <div className="text-3xl font-bold text-royal-gold mb-2">25+</div>
              <div className="text-gray-600">Years of Excellence</div>
            </div>
            <div className="text-center p-6 bg-white rounded-xl shadow-sm border">
              <div className="text-3xl font-bold text-royal-gold mb-2">50+</div>
              <div className="text-gray-600">Sweet Varieties</div>
            </div>
            <div className="text-center p-6 bg-white rounded-xl shadow-sm border">
              <div className="text-3xl font-bold text-royal-gold mb-2">10k+</div>
              <div className="text-gray-600">Happy Customers</div>
            </div>
            <div className="text-center p-6 bg-white rounded-xl shadow-sm border">
              <div className="text-3xl font-bold text-royal-gold mb-2">4.8★</div>
              <div className="text-gray-600">Customer Rating</div>
            </div>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="bg-royal-cream/30 rounded-3xl p-12 mb-20">
        <h2 className="text-3xl font-bold text-royal-brown text-center mb-12">Our Values</h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-royal-gold/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Award className="w-8 h-8 text-royal-gold" />
            </div>
            <h3 className="text-xl font-semibold text-royal-brown mb-4">Quality First</h3>
            <p className="text-gray-600">
              We source only the finest ingredients and maintain strict quality control at every step of production.
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-royal-gold/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Users className="w-8 h-8 text-royal-gold" />
            </div>
            <h3 className="text-xl font-semibold text-royal-brown mb-4">Family Tradition</h3>
            <p className="text-gray-600">
              Our recipes are passed down through generations, preserving the authentic taste of traditional sweets.
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-royal-gold/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Clock className="w-8 h-8 text-royal-gold" />
            </div>
            <h3 className="text-xl font-semibold text-royal-brown mb-4">Fresh Daily</h3>
            <p className="text-gray-600">
              All our sweets are made fresh daily to ensure maximum taste and quality for our customers.
            </p>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-royal-brown mb-6">Visit Our Store</h2>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Experience the warmth of our hospitality and the delightful treats that have made Mithadi Palace a household name. Whether you're celebrating a special occasion or simply craving something sweet, we're here to make your day a little more delicious.
        </p>
      </div>
    </div>
  );
}

export default About;
