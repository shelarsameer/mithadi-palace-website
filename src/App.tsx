
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { Toaster as Sonner } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import Index from '@/pages/Index';
import NotFound from '@/pages/NotFound';
import Products from '@/pages/Products';
import ProductDetail from '@/pages/ProductDetail';
import CategoryProducts from '@/pages/CategoryProducts';
import About from '@/pages/About';
import Contact from '@/pages/Contact';
import Blogs from '@/pages/Blogs';
import BulkOrder from '@/pages/BulkOrder';
import TestOrder from '@/pages/TestOrder';
import { CartProvider } from '@/lib/cart-context';
import Header from '@/components/Header';
import Cart from '@/components/Cart';

const queryClient = new QueryClient();

const Layout = ({ children }: { children: React.ReactNode }) => (
  <>
    <Header />
    <main>{children}</main>
    <Cart />
  </>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <CartProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={
              <Layout>
                <Index />
              </Layout>
            } />
            <Route path="/products" element={
              <Layout>
                <Products />
              </Layout>
            } />
            <Route path="/product/:handle" element={
              <Layout>
                <ProductDetail />
              </Layout>
            } />
            <Route path="/category/:categoryId" element={
              <Layout>
                <CategoryProducts />
              </Layout>
            } />
            <Route path="/bulk-order" element={
              <Layout>
                <BulkOrder />
              </Layout>
            } />
            <Route path="/test-order" element={
              <Layout>
                <TestOrder />
              </Layout>
            } />
            <Route path="/blogs" element={
              <Layout>
                <Blogs />
              </Layout>
            } />
            <Route path="/about" element={
              <Layout>
                <About />
              </Layout>
            } />
            <Route path="/contact" element={
              <Layout>
                <Contact />
              </Layout>
            } />
            <Route path="*" element={
              <Layout>
                <NotFound />
              </Layout>
            } />
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
