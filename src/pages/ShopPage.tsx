import { useState } from 'react';
import Navbar from '@/components/Navbar';
import CartDrawer from '@/components/CartDrawer';
import ProductCard from '@/components/ProductCard';
import Footer from '@/components/Footer';
import { getProductsByCategory } from '@/data/products';

interface ShopPageProps {
  category: 'men' | 'women' | 'all';
  title: string;
}

const ShopPage = ({ category, title }: ShopPageProps) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [sortBy, setSortBy] = useState('featured');
  const products = getProductsByCategory(category);

  const sortedProducts = [...products].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'newest':
        return a.isNew ? -1 : 1;
      default:
        return 0;
    }
  });

  return (
    <div className="min-h-screen">
      <Navbar onCartOpen={() => setIsCartOpen(true)} />
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

      <main className="pt-24 pb-20">
        {/* Header */}
        <div className="container mx-auto px-6 py-12 text-center">
          <h1 className="section-title mb-4">{title}</h1>
          <p className="text-muted-foreground">{products.length} products</p>
        </div>

        {/* Filters */}
        <div className="container mx-auto px-6 mb-8">
          <div className="flex justify-between items-center">
            <div className="flex gap-4">
              <button className="text-sm hover:text-accent transition-colors">All</button>
              <button className="text-sm text-muted-foreground hover:text-foreground transition-colors">Outerwear</button>
              <button className="text-sm text-muted-foreground hover:text-foreground transition-colors">Knitwear</button>
              <button className="text-sm text-muted-foreground hover:text-foreground transition-colors">Tops</button>
            </div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-transparent border border-border px-4 py-2 text-sm focus:outline-none focus:border-primary"
            >
              <option value="featured">Featured</option>
              <option value="newest">Newest</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Products Grid */}
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
            {sortedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ShopPage;
