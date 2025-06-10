
import React from 'react';
import HeroCarousel from '@/components/HeroCarousel';
import ProductCarousel from '@/components/ProductCarousel';
import HalfScreenScroll from '@/components/HalfScreenScroll';
import ParallaxSection from '@/components/ParallaxSection';
import InteractiveFeatures from '@/components/InteractiveFeatures';
import AboutSection from '@/components/AboutSection';
import TestimonialCarousel from '@/components/TestimonialCarousel';
import Footer from '@/components/Footer';
import SnacksFarsanSection from '@/components/SnacksFarsanSection';

const Index = () => {
  return (
    <div className="min-h-screen">
      <main>
        <HeroCarousel />
        <div id="products-section">
          <ProductCarousel />
        </div>
        <SnacksFarsanSection />
        <HalfScreenScroll />
        <ParallaxSection />
        <InteractiveFeatures />
        <AboutSection />
        <TestimonialCarousel />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
