
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { MapPin, Phone, Mail, Clock, Facebook, Instagram, Twitter, Youtube } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Youtube, href: '#', label: 'YouTube' }
  ];

  const quickLinks = [
    { name: 'About Us', href: '#about' },
    { name: 'Our Products', href: '#products' },
    { name: 'Order Online', href: '#order' },
    { name: 'Bulk Orders', href: '#bulk' },
    { name: 'Franchise', href: '#franchise' },
    { name: 'Contact', href: '#contact' }
  ];

  const categories = [
    { name: 'Traditional Sweets', href: '#traditional' },
    { name: 'Festive Specials', href: '#festive' },
    { name: 'Dry Fruits', href: '#dryfruits' },
    { name: 'Gift Boxes', href: '#gifts' },
    { name: 'Wedding Collection', href: '#wedding' },
    { name: 'Premium Range', href: '#premium' }
  ];

  return (
    <footer className="bg-royal-brown text-white">
      {/* Newsletter Section */}
      <div className="bg-royal-darkBrown py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="font-serif text-3xl md:text-4xl font-bold mb-4">
              Stay Sweet with Our Updates
            </h3>
            <p className="text-xl text-royal-cream mb-8">
              Subscribe to get the latest news about new products, special offers, and sweet surprises!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Enter your email"
                className="bg-white/10 border-royal-gold/30 text-white placeholder:text-royal-cream focus:border-royal-gold"
              />
              <Button className="bg-royal-gold hover:bg-royal-darkGold text-white px-8 whitespace-nowrap">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8">
            {/* Company Info */}
            <div className="space-y-6">
              <div className="flex items-center space-x-2">
                <div className="w-12 h-12 bg-gradient-to-br from-royal-gold to-royal-darkGold rounded-full flex items-center justify-center">
                  <span className="text-white font-serif font-bold text-xl">M</span>
                </div>
                <div>
                  <h1 className="font-serif font-bold text-2xl text-white">Mithadi</h1>
                  <p className="text-xs text-royal-gold -mt-1">SWEETS</p>
                </div>
              </div>
              <p className="text-royal-cream leading-relaxed">
                Crafting the finest traditional Indian sweets with love, heritage, and premium ingredients for over 50 years. Every sweet tells a story of tradition and excellence.
              </p>
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    aria-label={social.label}
                    className="w-10 h-10 bg-royal-gold/20 hover:bg-royal-gold rounded-full flex items-center justify-center text-royal-gold hover:text-white transition-all duration-300"
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-serif text-xl font-semibold mb-6 text-royal-gold">Quick Links</h4>
              <ul className="space-y-3">
                {quickLinks.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      className="text-royal-cream hover:text-royal-gold transition-colors duration-300 flex items-center group"
                    >
                      <span className="w-1 h-1 bg-royal-gold rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Categories */}
            <div>
              <h4 className="font-serif text-xl font-semibold mb-6 text-royal-gold">Our Products</h4>
              <ul className="space-y-3">
                {categories.map((category, index) => (
                  <li key={index}>
                    <a
                      href={category.href}
                      className="text-royal-cream hover:text-royal-gold transition-colors duration-300 flex items-center group"
                    >
                      <span className="w-1 h-1 bg-royal-gold rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                      {category.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div id="contact">
              <h4 className="font-serif text-xl font-semibold mb-6 text-royal-gold">Get in Touch</h4>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-royal-gold mt-1 flex-shrink-0" />
                  <div className="text-royal-cream">
                    <p>123 Sweet Street, Heritage Lane</p>
                    <p>Mumbai, Maharashtra 400001</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-royal-gold flex-shrink-0" />
                  <div className="text-royal-cream">
                    <p>+91 98765 43210</p>
                    <p>+91 87654 32109</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-royal-gold flex-shrink-0" />
                  <p className="text-royal-cream">info@mithadisweets.com</p>
                </div>
                <div className="flex items-start space-x-3">
                  <Clock className="w-5 h-5 text-royal-gold mt-1 flex-shrink-0" />
                  <div className="text-royal-cream">
                    <p>Mon - Sun: 8:00 AM - 10:00 PM</p>
                    <p className="text-sm text-royal-gold">Always Fresh, Always Open</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-royal-darkBrown">
        <div className="container mx-auto px-4">
          <Separator className="bg-royal-gold/20" />
          <div className="py-6 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-royal-cream text-sm">
              © {currentYear} Mithadi Sweets. All rights reserved. Made with ❤️ for sweet lovers.
            </p>
            <div className="flex space-x-6 text-sm text-royal-cream">
              <a href="#privacy" className="hover:text-royal-gold transition-colors duration-300">
                Privacy Policy
              </a>
              <a href="#terms" className="hover:text-royal-gold transition-colors duration-300">
                Terms of Service
              </a>
              <a href="#cookies" className="hover:text-royal-gold transition-colors duration-300">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
