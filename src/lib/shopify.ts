// Shopify Storefront API configuration

// Access environment variables safely
const getEnvVar = (key: string): string => {
  const value = import.meta.env[key];
  return typeof value === 'string' ? value : '';
};

// Get environment variables
const SHOPIFY_STORE_DOMAIN = getEnvVar('VITE_SHOPIFY_STORE_DOMAIN');
const SHOPIFY_STOREFRONT_TOKEN = getEnvVar('VITE_SHOPIFY_STOREFRONT_TOKEN');

// Export configuration for use throughout the app
export const SHOPIFY_CONFIG = {
  STORE_DOMAIN: SHOPIFY_STORE_DOMAIN || 'your-store.myshopify.com',
  STOREFRONT_TOKEN: SHOPIFY_STOREFRONT_TOKEN || 'your_storefront_api_token',
  API_VERSION: '2023-01' // Using a known stable API version
};

// Debug environment variables
console.log('Shopify Environment Variables:', {
  domain: SHOPIFY_STORE_DOMAIN ? SHOPIFY_STORE_DOMAIN : 'missing',
  hasToken: !!SHOPIFY_STOREFRONT_TOKEN,
  tokenPreview: SHOPIFY_STOREFRONT_TOKEN && SHOPIFY_STOREFRONT_TOKEN.length >= 4 ? 
    `${SHOPIFY_STOREFRONT_TOKEN.slice(0, 4)}...` : 'missing'
});

/**
 * Constructs the Shopify Storefront API URL
 * @returns The complete Shopify Storefront API endpoint URL
 */
const getStorefrontApiUrl = (): string => {
  // Clean the domain (remove protocol if present)
  let domain = SHOPIFY_CONFIG.STORE_DOMAIN.trim();
  
  // Remove protocol prefix if present (using string methods instead of regex)
  if (domain.startsWith('http://')) {
    domain = domain.substring(7);
  } else if (domain.startsWith('https://')) {
    domain = domain.substring(8);
  }
  
  // Log for debugging
  console.log('Processed Shopify domain:', domain);
  
  // Validate domain format
  if (!domain.includes('myshopify.com')) {
    console.warn('Warning: Shopify domain may be incorrect, should include myshopify.com');
  }
  
  // Return the properly formatted API URL
  return `https://${domain}/api/${SHOPIFY_CONFIG.API_VERSION}/graphql.json`;
};

// Log full configuration for debugging
console.log('Shopify Configuration:', {
  domain: SHOPIFY_CONFIG.STORE_DOMAIN,
  hasToken: !!SHOPIFY_CONFIG.STOREFRONT_TOKEN,
  apiVersion: SHOPIFY_CONFIG.API_VERSION,
  apiUrl: getStorefrontApiUrl()
});

// Product variant IDs
export const PRODUCT_VARIANTS = {
  KAJU_KATLI: 'gid://shopify/ProductVariant/1234567890', // Replace with actual variant ID
  // Add more products as needed
};

// Product categories
export const PRODUCT_CATEGORIES = [
  { id: 'sweets', name: 'Sweets' },
  { id: 'savory', name: 'Savory' },
  { id: 'beverages', name: 'Beverages' },
  { id: 'gift-boxes', name: 'Gift Boxes' },
];

// Types for Shopify data
export interface ShopifyImage {
  id: string;
  url: string;
  altText: string | null;
}

export interface ShopifyPrice {
  amount: string;
  currencyCode: string;
}

export interface ShopifyVariant {
  id: string;
  title: string;
  price: ShopifyPrice;
  availableForSale: boolean;
  sku: string;
  quantityAvailable: number;
}

export interface ShopifyProduct {
  id: string;
  title: string;
  description: string;
  handle: string;
  productType: string;
  tags: string[];
  images: ShopifyImage[];
  variants: ShopifyVariant[];
}

export interface CartItem {
  variantId: string;
  quantity: number;
  product: ShopifyProduct;
  variant: ShopifyVariant;
}

export interface Checkout {
  id: string;
  webUrl: string;
  lineItems: CartItem[];
  subtotalPrice: ShopifyPrice;
  totalPrice: ShopifyPrice;
  totalTax: ShopifyPrice;
}

// Helper function to create a checkout
export const createCheckout = async (items: { variantId: string; quantity: number }[]) => {
  const lineItems = items.map(item => ({
    variantId: item.variantId,
    quantity: item.quantity
  }));

  const query = `
    mutation checkoutCreate($input: CheckoutCreateInput!) {
      checkoutCreate(input: $input) {
        checkout {
          id
          webUrl
          lineItems(first: 100) {
            edges {
              node {
                id
                title
                quantity
                variant {
                  id
                  title
                  price {
                    amount
                    currencyCode
                  }
                  product {
                    id
                    title
                    handle
                  }
                }
              }
            }
          }
          subtotalPrice {
            amount
            currencyCode
          }
          totalPrice {
            amount
            currencyCode
          }
          totalTax {
            amount
            currencyCode
          }
        }
        checkoutUserErrors {
          code
          field
          message
        }
      }
    }
  `;

  try {
    const apiUrl = getStorefrontApiUrl();
    console.log('Creating checkout with Shopify...', apiUrl);
    
    const response = await fetch(
      apiUrl,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Shopify-Storefront-Access-Token': SHOPIFY_CONFIG.STOREFRONT_TOKEN,
        },
        body: JSON.stringify({ 
          query,
          variables: {
            input: {
              lineItems
            }
          }
        }),
      }
    );

    const result = await response.json();
    
    if (result.errors) {
      throw new Error(result.errors[0].message);
    }
    
    if (result.data.checkoutCreate.checkoutUserErrors.length > 0) {
      throw new Error(result.data.checkoutCreate.checkoutUserErrors[0].message);
    }
    
    return result.data.checkoutCreate.checkout;
  } catch (error) {
    console.error('Error creating checkout:', error);
    throw error;
  }
};

// Helper function to update a checkout
export const updateCheckout = async (checkoutId: string, items: { variantId: string; quantity: number }[]) => {
  const lineItems = items.map(item => ({
    variantId: item.variantId,
    quantity: item.quantity
  }));

  const query = `
    mutation checkoutLineItemsReplace($checkoutId: ID!, $lineItems: [CheckoutLineItemInput!]!) {
      checkoutLineItemsReplace(checkoutId: $checkoutId, lineItems: $lineItems) {
        checkout {
          id
          webUrl
          lineItems(first: 100) {
            edges {
              node {
                id
                title
                quantity
                variant {
                  id
                  title
                  price {
                    amount
                    currencyCode
                  }
                  product {
                    id
                    title
                    handle
                  }
                }
              }
            }
          }
          subtotalPrice {
            amount
            currencyCode
          }
          totalPrice {
            amount
            currencyCode
          }
          totalTax {
            amount
            currencyCode
          }
        }
        userErrors {
          field
          message
        }
      }
    }
  `;

  try {
    const apiUrl = getStorefrontApiUrl();
    console.log('Updating checkout with Shopify...', apiUrl);
    
    const response = await fetch(
      apiUrl,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Shopify-Storefront-Access-Token': SHOPIFY_CONFIG.STOREFRONT_TOKEN,
        },
        body: JSON.stringify({ 
          query,
          variables: {
            checkoutId,
            lineItems
          }
        }),
      }
    );

    const result = await response.json();
    
    if (result.errors) {
      throw new Error(result.errors[0].message);
    }
    
    if (result.data.checkoutLineItemsReplace.userErrors.length > 0) {
      throw new Error(result.data.checkoutLineItemsReplace.userErrors[0].message);
    }
    
    return result.data.checkoutLineItemsReplace.checkout;
  } catch (error) {
    console.error('Error updating checkout:', error);
    throw error;
  }
};

// Helper function to fetch products
export const fetchProducts = async () => {
  // GraphQL query to fetch products from Shopify
  const query = `
    query {
      products(first: 20) {
        edges {
          node {
            id
            title
            description
            handle
            productType
            tags
            images(first: 10) {
              edges {
                node {
                  id
                  url
                  altText
                }
              }
            }
            variants(first: 10) {
              edges {
                node {
                  id
                  title
                  sku
                  availableForSale
                  price {
                    amount
                    currencyCode
                  }
                }
              }
            }
          }
        }
      }
    }
  `;

  try {
    // Get the API URL and validate credentials
    const apiUrl = getStorefrontApiUrl();
    
    // Validate that we have the required credentials
    if (!SHOPIFY_CONFIG.STORE_DOMAIN || !SHOPIFY_CONFIG.STOREFRONT_TOKEN) {
      console.error('Missing Shopify credentials:', {
        hasDomain: !!SHOPIFY_CONFIG.STORE_DOMAIN,
        hasToken: !!SHOPIFY_CONFIG.STOREFRONT_TOKEN
      });
      throw new Error('Missing Shopify credentials. Please check your .env file.');
    }
    
    console.log('Fetching products from Shopify...', apiUrl);
    
    // Create the request
    const requestBody = JSON.stringify({ query });
    
    // Make the API call
    const response = await fetch(
      apiUrl,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Shopify-Storefront-Access-Token': SHOPIFY_CONFIG.STOREFRONT_TOKEN,
        },
        body: requestBody,
      }
    );

    // Log response status for debugging
    console.log('Shopify API response status:', response.status, response.statusText);
    
    // Handle non-200 responses
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Shopify API error response:', errorText);
      throw new Error(`Shopify API error: ${response.status} ${response.statusText}`);
    }

    // Parse the JSON response
    const result = await response.json();
    
    // Check for GraphQL errors
    if (result.errors) {
      console.error('GraphQL errors:', result.errors);
      throw new Error(`GraphQL Error: ${result.errors[0].message}`);
    }
    
    // Validate response structure
    if (!result.data || !result.data.products || !result.data.products.edges) {
      console.error('Invalid API response structure:', JSON.stringify(result, null, 2));
      throw new Error('Invalid API response structure from Shopify');
    }
    
    // Transform the GraphQL response into a more usable format
    const products = result.data.products.edges.map((edge: any) => {
      const product = edge.node;
      return {
        id: product.id,
        title: product.title,
        description: product.description,
        handle: product.handle,
        productType: product.productType,
        tags: product.tags || [],
        images: product.images?.edges?.map((imgEdge: any) => ({
          id: imgEdge.node.id,
          url: imgEdge.node.url,
          altText: imgEdge.node.altText
        })) || [],
        variants: product.variants?.edges?.map((variantEdge: any) => ({
          id: variantEdge.node.id,
          title: variantEdge.node.title,
          sku: variantEdge.node.sku || '',
          availableForSale: variantEdge.node.availableForSale || false,
          // Default to 1 since we don't have access to quantityAvailable
          quantityAvailable: 1,
          price: {
            amount: variantEdge.node.price.amount,
            currencyCode: variantEdge.node.price.currencyCode || 'INR'
          }
        })) || [],
      };
    });
    
    // Log success and return the products
    console.log(`Successfully fetched ${products.length} products from Shopify`);
    return products;
  } catch (error) {
    // Provide detailed error information
    console.error('Error fetching products from Shopify:', error);
    throw error;
  }
};

// Helper function to fetch a single product by handle
export const fetchProductByHandle = async (handle: string) => {
  const query = `
    query getProductByHandle($handle: String!) {
      productByHandle(handle: $handle) {
        id
        title
        description
        handle
        productType
        tags
        images(first: 10) {
          edges {
            node {
              id
              url
              altText
            }
          }
        }
        variants(first: 10) {
          edges {
            node {
              id
              title
              sku
              availableForSale
              price {
                amount
                currencyCode
              }
            }
          }
        }
      }
    }
  `;

  try {
    const apiUrl = getStorefrontApiUrl();
    console.log(`Fetching product with handle ${handle} from Shopify...`, apiUrl);
    
    const response = await fetch(
      apiUrl,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Shopify-Storefront-Access-Token': SHOPIFY_CONFIG.STOREFRONT_TOKEN,
        },
        body: JSON.stringify({ 
          query,
          variables: { handle }
        }),
      }
    );

    const result = await response.json();
    
    if (result.errors) {
      throw new Error(result.errors[0].message);
    }
    
    if (!result.data.productByHandle) {
      throw new Error(`Product with handle ${handle} not found`);
    }
    
    const product = result.data.productByHandle;
    
    // Transform the product data to match our ShopifyProduct interface
    return {
      id: product.id,
      title: product.title,
      description: product.description,
      handle: product.handle,
      productType: product.productType,
      tags: product.tags || [],
      images: product.images?.edges?.map((imgEdge: any) => ({
        id: imgEdge.node.id,
        url: imgEdge.node.url,
        altText: imgEdge.node.altText || null
      })) || [],
      variants: product.variants?.edges?.map((variantEdge: any) => ({
        id: variantEdge.node.id,
        title: variantEdge.node.title,
        sku: variantEdge.node.sku || '',
        availableForSale: variantEdge.node.availableForSale || false,
        // Default to 1 since we don't have access to quantityAvailable
        quantityAvailable: 1,
        price: {
          amount: variantEdge.node.price.amount,
          currencyCode: variantEdge.node.price.currencyCode || 'INR'
        }
      })) || [],
    };
  } catch (error) {
    console.error(`Error fetching product with handle ${handle}:`, error);
    throw error;
  }
};

// Helper function to format price
export const formatPrice = (price: ShopifyPrice) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: price.currencyCode || 'INR',
  }).format(parseFloat(price.amount));
};
