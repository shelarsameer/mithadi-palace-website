
import React from 'react';
import HeroCarousel from '@/components/HeroCarousel';
import SnacksFarsanSection from '@/components/SnacksFarsanSection';
import HalfScreenScroll from '@/components/HalfScreenScroll';
import AboutSection from '@/components/AboutSection';
import TestimonialCarousel from '@/components/TestimonialCarousel';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen">
      <main>
        <HeroCarousel />
        <SnacksFarsanSection />
        <HalfScreenScroll />
        <AboutSection />
        <TestimonialCarousel />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
