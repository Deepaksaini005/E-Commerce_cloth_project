import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "@/context/CartContext";
import { WishlistProvider } from "@/context/WishlistContext";
import { AuthProvider } from "@/context/AuthContext";
import Index from "./pages/Index";
import ShopPage from "./pages/ShopPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import WishlistPage from "./pages/WishlistPage";
import SalePage from "./pages/SalePage";
import Checkout from "./pages/Checkout";
import AdminLogin from "./pages/AdminLogin";
import AuthPage from "./pages/AuthPage";
import AccountPage from "./pages/AccountPage";
import CategoryPage from "./pages/CategoryPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <CartProvider>
        <WishlistProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/women" element={<ShopPage category="women" title="Women's Collection" />} />
                <Route path="/men" element={<ShopPage category="men" title="Men's Collection" />} />
                <Route path="/new" element={<ShopPage category="all" title="New Arrivals" />} />
                <Route path="/shop" element={<ShopPage category="all" title="All Products" />} />
                <Route path="/sale" element={<SalePage />} />
                <Route path="/watches" element={<CategoryPage subcategory="watches" title="Luxury Watches" description="Timeless timepieces crafted with precision and elegance for men and women." />} />
                <Route path="/shoes" element={<CategoryPage subcategory="shoes" title="Premium Footwear" description="From elegant stilettos to handcrafted oxfords — step into luxury." />} />
                <Route path="/skincare" element={<CategoryPage subcategory="skincare" title="Skincare Collection" description="Premium skincare products for a radiant, healthy complexion." />} />
                <Route path="/product/:id" element={<ProductDetailPage />} />
                <Route path="/wishlist" element={<WishlistPage />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/auth" element={<AuthPage />} />
                <Route path="/account" element={<AccountPage />} />
                <Route path="/admin" element={<AdminLogin />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </WishlistProvider>
      </CartProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
