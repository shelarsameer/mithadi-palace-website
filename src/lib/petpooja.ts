
// PetPooja API configuration and service functions

// Access environment variables safely
const getEnvVar = (key: string): string => {
  const value = import.meta.env[key];
  return typeof value === 'string' ? value : '';
};

// Get environment variables
const PETPOOJA_ACCESS_TOKEN = getEnvVar('VITE_PETPOOJA_ACCESS_TOKEN');
const PETPOOJA_APP_SECRET = getEnvVar('VITE_PETPOOJA_APP_SECRET');
const PETPOOJA_APP_KEY = getEnvVar('VITE_PETPOOJA_APP_KEY');

// Export configuration for use throughout the app
export const PETPOOJA_CONFIG = {
  ACCESS_TOKEN: PETPOOJA_ACCESS_TOKEN,
  APP_SECRET: PETPOOJA_APP_SECRET,
  APP_KEY: PETPOOJA_APP_KEY,
  API_BASE_URL: 'https://pos.petpooja.com/api/v2',
};

// Debug environment variables
console.log('PetPooja Environment Variables:', {
  hasAccessToken: !!PETPOOJA_ACCESS_TOKEN,
  hasAppSecret: !!PETPOOJA_APP_SECRET,
  hasAppKey: !!PETPOOJA_APP_KEY,
  tokenPreview: PETPOOJA_ACCESS_TOKEN && PETPOOJA_ACCESS_TOKEN.length >= 4 ? 
    `${PETPOOJA_ACCESS_TOKEN.slice(0, 4)}...` : 'missing'
});

// Types for PetPooja data (normalized to match frontend structure)
export interface PetPoojaPrice {
  amount: string;
  currencyCode: string;
}

export interface PetPoojaImage {
  id: string;
  url: string;
  altText: string | null;
}

export interface PetPoojaVariant {
  id: string;
  title: string;
  price: PetPoojaPrice;
  availableForSale: boolean;
  sku: string;
  quantityAvailable: number;
}

export interface PetPoojaProduct {
  id: string;
  title: string;
  description: string;
  handle: string;
  productType: string;
  tags: string[];
  images: PetPoojaImage[];
  variants: PetPoojaVariant[];
}

// Cart item interface (compatible with existing cart)
export interface CartItem {
  variantId: string;
  quantity: number;
  product: PetPoojaProduct;
  variant: PetPoojaVariant;
}

// Checkout interface (compatible with existing checkout)
export interface Checkout {
  id: string;
  webUrl: string;
  lineItems: CartItem[];
  subtotalPrice: PetPoojaPrice;
  totalPrice: PetPoojaPrice;
  totalTax: PetPoojaPrice;
}

// Helper function to normalize PetPooja menu data to our product structure
const normalizePetPoojaData = (petpoojaData: any): PetPoojaProduct[] => {
  const products: PetPoojaProduct[] = [];
  
  if (!petpoojaData.restaurants || !Array.isArray(petpoojaData.restaurants)) {
    console.warn('Invalid PetPooja data structure');
    return products;
  }

  petpoojaData.restaurants.forEach((restaurant: any) => {
    if (!restaurant.categories || !Array.isArray(restaurant.categories)) {
      return;
    }

    restaurant.categories.forEach((category: any) => {
      if (!category.items || !Array.isArray(category.items)) {
        return;
      }

      category.items.forEach((item: any) => {
        if (!item.active || item.active !== 'true') {
          return; // Skip inactive items
        }

        // Create variations as separate variants
        const variants: PetPoojaVariant[] = [];
        
        // If item has variations, create variants for each
        if (item.variation && Array.isArray(item.variation)) {
          item.variation.forEach((variation: any) => {
            if (variation.status === 'true') {
              variants.push({
                id: `${item.itemid}_${variation.variationid}`,
                title: variation.name || 'Default',
                price: {
                  amount: variation.price || item.price || '0',
                  currencyCode: 'INR'
                },
                availableForSale: variation.status === 'true',
                sku: item.itemid || '',
                quantityAvailable: 999 // Default quantity since PetPooja doesn't provide inventory
              });
            }
          });
        } else {
          // Single variant for items without variations
          variants.push({
            id: item.itemid,
            title: 'Default',
            price: {
              amount: item.price || '0',
              currencyCode: 'INR'
            },
            availableForSale: item.active === 'true',
            sku: item.itemid || '',
            quantityAvailable: 999
          });
        }

        // Create product
        const product: PetPoojaProduct = {
          id: item.itemid,
          title: item.itemname || 'Untitled Item',
          description: item.itemdescription || '',
          handle: (item.itemname || 'item').toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-'),
          productType: category.categoryname || 'Food',
          tags: [
            ...(item.item_tags || []),
            ...(item.cuisine || []),
            category.categoryname || 'Food'
          ].filter(Boolean),
          images: item.item_image_url ? [{
            id: `${item.itemid}_image`,
            url: item.item_image_url,
            altText: item.itemname || null
          }] : [],
          variants
        };

        products.push(product);
      });
    });
  });

  return products;
};

// Function to fetch menu from PetPooja
export const fetchProducts = async (): Promise<PetPoojaProduct[]> => {
  try {
    // Validate that we have the required credentials
    if (!PETPOOJA_CONFIG.ACCESS_TOKEN || !PETPOOJA_CONFIG.APP_SECRET || !PETPOOJA_CONFIG.APP_KEY) {
      console.error('Missing PetPooja credentials:', {
        hasAccessToken: !!PETPOOJA_CONFIG.ACCESS_TOKEN,
        hasAppSecret: !!PETPOOJA_CONFIG.APP_SECRET,
        hasAppKey: !!PETPOOJA_CONFIG.APP_KEY
      });
      throw new Error('Missing PetPooja credentials. Please check your .env file.');
    }

    console.log('Fetching menu from PetPooja API...');

    const response = await fetch(`${PETPOOJA_CONFIG.API_BASE_URL}/menu/fetch_menu`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        access_token: PETPOOJA_CONFIG.ACCESS_TOKEN,
        app_secret: PETPOOJA_CONFIG.APP_SECRET,
        app_key: PETPOOJA_CONFIG.APP_KEY
      }),
    });

    // Log response status for debugging
    console.log('PetPooja API response status:', response.status, response.statusText);

    // Handle non-200 responses
    if (!response.ok) {
      const errorText = await response.text();
      console.error('PetPooja API error response:', errorText);
      throw new Error(`PetPooja API error: ${response.status} ${response.statusText}`);
    }

    // Parse the JSON response
    const result = await response.json();

    // Check for API errors
    if (!result.success) {
      console.error('PetPooja API returned error:', result.message || 'Unknown error');
      throw new Error(`PetPooja API Error: ${result.message || 'Unknown error'}`);
    }

    // Normalize the data
    const products = normalizePetPoojaData(result);

    console.log(`Successfully fetched ${products.length} products from PetPooja`);
    return products;
  } catch (error) {
    console.error('Error fetching products from PetPooja:', error);
    throw error;
  }
};

// Function to fetch a single product by handle
export const fetchProductByHandle = async (handle: string): Promise<PetPoojaProduct | null> => {
  try {
    const products = await fetchProducts();
    const product = products.find(p => p.handle === handle);
    
    if (!product) {
      throw new Error(`Product with handle ${handle} not found`);
    }
    
    return product;
  } catch (error) {
    console.error(`Error fetching product with handle ${handle}:`, error);
    throw error;
  }
};

// Helper function to format price (compatible with existing formatPrice function)
export const formatPrice = (price: PetPoojaPrice): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: price.currencyCode || 'INR',
  }).format(parseFloat(price.amount));
};

// Create a mock checkout for PetPooja (since PetPooja doesn't handle checkout directly)
export const createCheckout = async (items: { variantId: string; quantity: number }[]): Promise<Checkout> => {
  // For now, create a mock checkout since PetPooja doesn't handle checkout
  // You can integrate with your preferred payment gateway here
  const mockCheckout: Checkout = {
    id: `checkout_${Date.now()}`,
    webUrl: '#', // Replace with your checkout URL
    lineItems: [], // Will be populated with actual items
    subtotalPrice: { amount: '0', currencyCode: 'INR' },
    totalPrice: { amount: '0', currencyCode: 'INR' },
    totalTax: { amount: '0', currencyCode: 'INR' }
  };

  console.log('Mock checkout created for PetPooja integration:', mockCheckout);
  return mockCheckout;
};

// Update checkout function (mock implementation)
export const updateCheckout = async (checkoutId: string, items: { variantId: string; quantity: number }[]): Promise<Checkout> => {
  // Mock implementation - replace with actual payment gateway integration
  const mockCheckout: Checkout = {
    id: checkoutId,
    webUrl: '#',
    lineItems: [], // Will be populated with actual items
    subtotalPrice: { amount: '0', currencyCode: 'INR' },
    totalPrice: { amount: '0', currencyCode: 'INR' },
    totalTax: { amount: '0', currencyCode: 'INR' }
  };

  console.log('Mock checkout updated for PetPooja integration:', mockCheckout);
  return mockCheckout;
};

// Export types for compatibility
export type ShopifyProduct = PetPoojaProduct;
export type ShopifyVariant = PetPoojaVariant;
export type ShopifyPrice = PetPoojaPrice;
export type ShopifyImage = PetPoojaImage;

// Export constants for compatibility
export const PRODUCT_CATEGORIES = [
  { id: 'sweets', name: 'Sweets' },
  { id: 'snacks', name: 'Snacks' },
  { id: 'beverages', name: 'Beverages' },
  { id: 'main-course', name: 'Main Course' },
];
