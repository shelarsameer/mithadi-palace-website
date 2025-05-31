
import React from 'react';
import Header from '@/components/Header';
import HeroCarousel from '@/components/HeroCarousel';
import ProductCarousel from '@/components/ProductCarousel';
import HalfScreenScroll from '@/components/HalfScreenScroll';
import ParallaxSection from '@/components/ParallaxSection';
import InteractiveFeatures from '@/components/InteractiveFeatures';
import AboutSection from '@/components/AboutSection';
import TestimonialCarousel from '@/components/TestimonialCarousel';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroCarousel />
        <ProductCarousel />
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
