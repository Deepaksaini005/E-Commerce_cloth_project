import { useState } from 'react';
import { Tag, Percent } from 'lucide-react';
import Navbar from '@/components/Navbar';
import CartDrawer from '@/components/CartDrawer';
import ProductCard from '@/components/ProductCard';
import Footer from '@/components/Footer';
import { useSaleProducts } from '@/hooks/useProducts';

const SalePage = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { products: saleProducts, loading } = useSaleProducts();

  return (
    <div className="min-h-screen">
      <Navbar onCartOpen={() => setIsCartOpen(true)} />
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

      <main className="pt-24 pb-20">
        <div className="bg-accent text-accent-foreground py-16 mb-8">
          <div className="container mx-auto px-6 text-center">
            <Percent className="mx-auto mb-4" size={48} />
            <h1 className="font-display text-4xl md:text-5xl mb-4">Seasonal Sale</h1>
            <p className="text-lg opacity-90 mb-6">Up to 50% off select styles</p>
            <div className="flex items-center justify-center gap-2">
              <Tag size={18} />
              <span className="text-sm tracking-wider uppercase">Limited Time Only</span>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-6">
          <p className="text-center text-muted-foreground mb-8">{saleProducts.length} items on sale</p>
          
          {loading ? (
            <div className="text-center py-20">
              <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin mx-auto" />
            </div>
          ) : saleProducts.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
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
