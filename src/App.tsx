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
import AdminOverview from "./pages/admin/AdminOverview";
import AdminOrders from "./pages/admin/AdminOrders";
import AdminProducts from "./pages/admin/AdminProducts";
import AdminCustomers from "./pages/admin/AdminCustomers";
import AdminAnalytics from "./pages/admin/AdminAnalytics";
import AdminCoupons from "./pages/admin/AdminCoupons";
import AdminReviews from "./pages/admin/AdminReviews";
import AdminNotifications from "./pages/admin/AdminNotifications";
import AdminSettings from "./pages/admin/AdminSettings";
import AdminOrderDetail from "./pages/AdminOrderDetail";
import AuthPage from "./pages/AuthPage";
import AccountPage from "./pages/AccountPage";
import CategoryPage from "./pages/CategoryPage";
import OrderTrackingPage from "./pages/OrderTrackingPage";
import ContactPage from "./pages/ContactPage";
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
                <Route path="/admin/dashboard" element={<AdminOverview />} />
                <Route path="/admin/orders" element={<AdminOrders />} />
                <Route path="/admin/products" element={<AdminProducts />} />
                <Route path="/admin/customers" element={<AdminCustomers />} />
                <Route path="/admin/analytics" element={<AdminAnalytics />} />
                <Route path="/admin/coupons" element={<AdminCoupons />} />
                <Route path="/admin/reviews" element={<AdminReviews />} />
                <Route path="/admin/notifications" element={<AdminNotifications />} />
                <Route path="/admin/settings" element={<AdminSettings />} />
                <Route path="/admin/order/:id" element={<AdminOrderDetail />} />
                <Route path="/track-order" element={<OrderTrackingPage />} />
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
