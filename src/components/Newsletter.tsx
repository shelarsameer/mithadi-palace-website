
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast.error('Please enter your email address');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error('Please enter a valid email address');
      return;
    }

    setIsLoading(true);

    try {
      // Google Apps Script Web App URL - replace with your actual deployed script URL
      const scriptUrl = 'https://script.google.com/macros/s/AKfycbxXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/exec';
      
      const response = await fetch(scriptUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        mode: 'no-cors',
        body: JSON.stringify({
          email: email,
          timestamp: new Date().toISOString(),
          source: 'website_newsletter'
        }),
      });

      // Since we're using no-cors, we can't check the actual response
      // But we can assume success if no error was thrown
      toast.success('Thank you for subscribing! You\'ll receive sweet updates soon.');
      setEmail('');
    } catch (error) {
      console.error('Error subscribing to newsletter:', error);
      toast.error('Failed to subscribe. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="bg-gradient-to-r from-royal-gold to-royal-darkGold py-16 md:py-24">
      <div className="container mx-auto px-4 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-4">
            Stay Sweet with Our Updates
          </h2>
          <p className="text-white/90 text-lg mb-8">
            Be the first to know about new sweet arrivals, special offers, and traditional recipes from our kitchen to yours.
          </p>
          
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 bg-white/10 border-white/30 text-white placeholder:text-white/70 focus:bg-white/20"
              disabled={isLoading}
            />
            <Button 
              type="submit" 
              disabled={isLoading}
              className="bg-white text-royal-gold hover:bg-white/90 font-semibold px-8 py-2"
            >
              {isLoading ? 'Subscribing...' : 'Subscribe'}
            </Button>
          </form>
          
          <p className="text-white/70 text-sm mt-4">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
