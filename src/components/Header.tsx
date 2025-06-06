
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X, Calendar } from 'lucide-react';
import MainNav from './MainNav';
import { useCart } from '@/lib/cart-context';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const { openCart } = useCart();

  const handleScheduleOrder = () => {
    navigate('/products');
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-royal-cream backdrop-blur-md shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-12 h-12 bg-gradient-to-br from-royal-gold to-royal-darkGold rounded-full flex items-center justify-center">
              <span className="text-white font-serif font-bold text-xl">M</span>
            </div>
            <div>
              <h1 className="font-serif font-bold text-2xl text-royal-brown">Mithadi</h1>
              <p className="text-xs text-royal-darkGold -mt-1">SWEETS</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <MainNav />
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <Button 
              variant="outline" 
              size="sm" 
              className="border-royal-gold text-royal-gold hover:bg-royal-gold hover:text-white"
              onClick={handleScheduleOrder}
            >
              <Calendar className="w-4 h-4 mr-2" />
              Schedule Order
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-royal-brown"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-royal-cream backdrop-blur-md border-t border-royal-gold/20">
            <div className="px-4 py-6 space-y-4">
              <Link 
                to="/" 
                className="block text-royal-brown hover:text-royal-gold transition-colors duration-300 font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/products" 
                className="block text-royal-brown hover:text-royal-gold transition-colors duration-300 font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                All Products
              </Link>
              <Link 
                to="/bulk-order" 
                className="block text-royal-brown hover:text-royal-gold transition-colors duration-300 font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Bulk Order
              </Link>
              <Link 
                to="/blogs" 
                className="block text-royal-brown hover:text-royal-gold transition-colors duration-300 font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Blogs
              </Link>
              <Link 
                to="/about" 
                className="block text-royal-brown hover:text-royal-gold transition-colors duration-300 font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About Us
              </Link>
              <Link 
                to="/contact" 
                className="block text-royal-brown hover:text-royal-gold transition-colors duration-300 font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contact
              </Link>
              <div className="pt-4 space-y-2">
                <Button 
                  variant="outline" 
                  className="w-full border-royal-gold text-royal-gold hover:bg-royal-gold hover:text-white"
                  onClick={handleScheduleOrder}
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  Schedule Order
                </Button>
                <Button 
                  className="w-full bg-royal-gold hover:bg-royal-darkGold text-white"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    openCart();
                  }}
                >
                  Order Now
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
