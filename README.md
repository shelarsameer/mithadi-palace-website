# Mithadi Palace Website

## Project info

**URL**: https://lovable.dev/projects/3d6612c1-0c9b-4451-a239-ff9560da85a7

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/3d6612c1-0c9b-4451-a239-ff9560da85a7) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

### Deploying to Vercel

1. **Prepare your project**
   ```sh
   npm run build
   ```

2. **Install Vercel CLI** (if not already installed)
   ```sh
   npm install -g vercel
   ```

3. **Login to Vercel**
   ```sh
   vercel login
   ```

4. **Deploy your project**
   ```sh
   vercel
   ```
   
   During the deployment process, Vercel will ask you a few questions:
   - Set up and deploy: Yes
   - Which scope: Select your account
   - Link to existing project: No (if it's your first time deploying this project)
   - Project name: mithadi-palace-website (or your preferred name)
   - Directory: ./ (root directory)
   - Override settings: No (Vercel will automatically detect it's a Vite project)

5. **For subsequent deployments**
   ```sh
   vercel --prod
   ```

### Setting Up a GoDaddy Domain

1. Purchase a domain from GoDaddy if you don't already have one.

2. In your Vercel dashboard:
   - Go to your project
   - Navigate to "Settings" > "Domains"
   - Add your GoDaddy domain (e.g., mithadipalace.com)
   - Vercel will provide you with nameserver information or DNS records to add

3. In your GoDaddy account:
   - Go to "My Products" > Select your domain
   - Go to "DNS Management"
   
   **Option A: Using Nameservers (Recommended)**
   - In DNS Management, select "Nameservers"
   - Change from "GoDaddy" to "Custom"
   - Enter the Vercel nameservers provided
   
   **Option B: Using DNS Records**
   - Add the A and CNAME records provided by Vercel:
     - A Record: @ pointing to 76.76.21.21
     - CNAME Record: www pointing to cname.vercel-dns.com

4. Wait for DNS propagation (can take up to 48 hours, but usually much faster)

### Shopify Integration

1. **Set up your Shopify store**
   - Create a Shopify account at [Shopify.com](https://www.shopify.com)
   - Add your products with descriptions, prices, and images
   - Configure inventory tracking for each product

2. **Set up Shopify API access**
   - In your Shopify admin, go to "Apps" > "App and sales channel settings"
   - Click "Develop apps" > "Create an app"
   - Name your app (e.g., "Mithadi Palace Website Integration")
   - Set the appropriate permissions (read_products, read_inventory, etc.)
   - Generate API credentials (Storefront API access token)

3. **Configure your environment variables**
   - Copy the `.env.example` file to `.env`
   - Update the Shopify credentials in the `.env` file:
     ```
     VITE_SHOPIFY_STORE_DOMAIN=your-store.myshopify.com
     VITE_SHOPIFY_STOREFRONT_TOKEN=your_storefront_api_token
     ```

4. **Update product variant IDs**
   - In `src/lib/shopify.ts`, update the product variant IDs with your actual Shopify product variant IDs

5. **Test the integration**
   - Run the development server: `npm run dev`
   - Navigate to the Products page to ensure products are loading correctly
   - Test the Buy buttons to ensure checkout works properly.
