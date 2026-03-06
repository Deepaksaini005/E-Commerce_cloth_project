import { useState } from 'react';
import { Percent } from 'lucide-react';
import Navbar from '@/components/Navbar';
import CartDrawer from '@/components/CartDrawer';
import ProductCard from '@/components/ProductCard';
import Footer from '@/components/Footer';
import AnimatedBanner from '@/components/AnimatedBanner';
import { useSaleProducts } from '@/hooks/useProducts';

const SalePage = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { products: saleProducts, loading } = useSaleProducts();

  return (
    <div className="min-h-screen">
      <Navbar onCartOpen={() => setIsCartOpen(true)} />
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

      <main className="pt-20 pb-20">
        <AnimatedBanner
          variant="sale"
          title="Seasonal Sale"
          subtitle="Limited Time Only"
          description="Up to 50% off select styles — don't miss out on premium pieces."
          icon={<Percent size={28} className="text-accent" />}
          count={saleProducts.length}
        />

        <div className="container mx-auto px-6 mt-8">
          {loading ? (
            <div className="text-center py-20">
              <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin mx-auto" />
            </div>
          ) : saleProducts.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {saleProducts.map((product) => <ProductCard key={product.id} product={product} />)}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-muted-foreground">No sale items available at the moment</p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SalePage;
