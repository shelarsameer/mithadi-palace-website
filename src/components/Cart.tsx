import React from 'react';
import { useCart } from '@/lib/cart-context';
import { formatPrice } from '@/lib/shopify';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetClose } from '@/components/ui/sheet';
import { Separator } from '@/components/ui/separator';
import { Trash2, Plus, Minus, ShoppingBag, X } from 'lucide-react';

export const Cart = () => {
  const { 
    cartItems, 
    checkout, 
    isCartOpen, 
    closeCart, 
    removeFromCart, 
    updateQuantity,
    isLoading,
    cartCount
  } = useCart();

  return (
    <Sheet open={isCartOpen} onOpenChange={closeCart}>
      <SheetContent className="w-full sm:max-w-md flex flex-col h-full">
        <SheetHeader className="space-y-0 pb-4">
          <div className="flex items-center justify-between">
            <SheetTitle className="flex items-center gap-2">
              <ShoppingBag className="h-5 w-5" />
              Your Cart {cartCount > 0 && `(${cartCount})`}
            </SheetTitle>
            <SheetClose asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <X className="h-4 w-4" />
              </Button>
            </SheetClose>
          </div>
        </SheetHeader>
        
        <Separator />
        
        {cartItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center flex-1 py-12">
            <ShoppingBag className="h-16 w-16 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium">Your cart is empty</h3>
            <p className="text-muted-foreground text-center mt-1">
              Looks like you haven't added anything to your cart yet.
            </p>
            <Button onClick={closeCart} className="mt-6">
              Continue Shopping
            </Button>
          </div>
        ) : (
          <div className="flex flex-col flex-1 overflow-hidden">
            <div className="flex-1 overflow-y-auto py-6 px-1">
              {cartItems.map((item) => (
                <div key={item.variantId} className="flex py-6 border-b">
                  {/* Product Image */}
                  <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border">
                    {item.product.images.length > 0 && (
                      <img
                        src={item.product.images[0].url}
                        alt={item.product.images[0].altText || item.product.title}
                        className="h-full w-full object-cover object-center"
                      />
                    )}
                  </div>

                  {/* Product Details */}
                  <div className="ml-4 flex flex-1 flex-col">
                    <div>
                      <div className="flex justify-between text-base font-medium">
                        <h3>
                          <a href={`/product/${item.product.handle}`} className="hover:underline">
                            {item.product.title}
                          </a>
                        </h3>
                        <p className="ml-4">
                          {formatPrice(item.variant.price)}
                        </p>
                      </div>
                      {item.variant.title !== 'Default Title' && (
                        <p className="mt-1 text-sm text-muted-foreground">
                          {item.variant.title}
                        </p>
                      )}
                    </div>
                    
                    <div className="flex flex-1 items-end justify-between text-sm">
                      {/* Quantity Controls */}
                      <div className="flex items-center border rounded-md">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8 rounded-none"
                          onClick={() => updateQuantity(item.variantId, item.quantity - 1)}
                          disabled={isLoading}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="px-3 py-1">{item.quantity}</span>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8 rounded-none"
                          onClick={() => updateQuantity(item.variantId, item.quantity + 1)}
                          disabled={isLoading}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>

                      {/* Remove Button */}
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-red-500 hover:text-red-600 hover:bg-red-50"
                        onClick={() => removeFromCart(item.variantId)}
                        disabled={isLoading}
                      >
                        <Trash2 className="h-4 w-4 mr-1" />
                        Remove
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Cart Footer */}
            <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
              {checkout && (
                <>
                  <div className="flex justify-between text-base font-medium">
                    <p>Subtotal</p>
                    <p>{formatPrice(checkout.subtotalPrice)}</p>
                  </div>
                  <p className="mt-0.5 text-sm text-muted-foreground">
                    Shipping and taxes calculated at checkout.
                  </p>
                </>
              )}
              
              <div className="mt-6">
                <Button 
                  className="w-full"
                  disabled={!checkout || isLoading}
                  onClick={() => {
                    if (checkout?.webUrl) {
                      window.location.href = checkout.webUrl;
                    }
                  }}
                >
                  {isLoading ? 'Processing...' : 'Checkout'}
                </Button>
              </div>
              
              <div className="mt-6 flex justify-center text-center text-sm text-muted-foreground">
                <p>
                  <Button variant="link" onClick={closeCart}>
                    Continue Shopping
                    <span aria-hidden="true"> &rarr;</span>
                  </Button>
                </p>
              </div>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default Cart;
