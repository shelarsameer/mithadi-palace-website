
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useCart } from '@/lib/cart-context';
import { ShoppingBag } from 'lucide-react';

interface MainNavProps {
  className?: string;
}

export function MainNav({ className }: MainNavProps) {
  const location = useLocation();
  const { openCart, cartCount } = useCart();

  return (
    <div className="flex items-center space-x-4 lg:space-x-6">
      <nav className={cn("flex items-center space-x-4 lg:space-x-6", className)}>
        <Link 
          to="/" 
          className={cn(
            "text-sm font-medium transition-colors hover:text-primary",
            location.pathname === "/" ? "text-primary" : "text-muted-foreground"
          )}
        >
          Home
        </Link>
        
        <Link 
          to="/products" 
          className={cn(
            "text-sm font-medium transition-colors hover:text-primary",
            location.pathname === "/products" ? "text-primary" : "text-muted-foreground"
          )}
        >
          All Products
        </Link>
        
        <Link 
          to="/bulk-order" 
          className={cn(
            "text-sm font-medium transition-colors hover:text-primary",
            location.pathname === "/bulk-order" ? "text-primary" : "text-muted-foreground"
          )}
        >
          Bulk Order
        </Link>
        
        <Link 
          to="/blogs" 
          className={cn(
            "text-sm font-medium transition-colors hover:text-primary",
            location.pathname === "/blogs" ? "text-primary" : "text-muted-foreground"
          )}
        >
          Blogs
        </Link>
        
        <Link 
          to="/about" 
          className={cn(
            "text-sm font-medium transition-colors hover:text-primary",
            location.pathname === "/about" ? "text-primary" : "text-muted-foreground"
          )}
        >
          About Us
        </Link>
        
        <Link 
          to="/contact" 
          className={cn(
            "text-sm font-medium transition-colors hover:text-primary",
            location.pathname === "/contact" ? "text-primary" : "text-muted-foreground"
          )}
        >
          Contact
        </Link>
      </nav>
      
      <Button 
        variant="outline" 
        size="icon" 
        className="relative ml-4"
        onClick={openCart}
      >
        <ShoppingBag className="h-5 w-5" />
        {cartCount > 0 && (
          <span className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-primary text-xs text-primary-foreground flex items-center justify-center">
            {cartCount}
          </span>
        )}
      </Button>
    </div>
  );
}

export default MainNav;
