import { useState, useMemo } from 'react';
import Navbar from '@/components/Navbar';
import CartDrawer from '@/components/CartDrawer';
import ProductCard from '@/components/ProductCard';
import Footer from '@/components/Footer';
import { products } from '@/data/products';
import { SortOption } from '@/types/product';

interface CategoryPageProps {
  subcategory: string;
  title: string;
  description: string;
}

const CategoryPage = ({ subcategory, title, description }: CategoryPageProps) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [sortBy, setSortBy] = useState<SortOption>('featured');
  const [activeGender, setActiveGender] = useState<'all' | 'men' | 'women'>('all');

  const filteredProducts = useMemo(() => {
    let items = products.filter(p => p.subcategory === subcategory);
    if (activeGender !== 'all') {
      items = items.filter(p => p.category === activeGender);
    }
    return [...items].sort((a, b) => {
      switch (sortBy) {
        case 'price-low': return a.price - b.price;
        case 'price-high': return b.price - a.price;
        case 'newest': return a.isNew ? -1 : b.isNew ? 1 : 0;
        case 'rating': return (b.rating || 0) - (a.rating || 0);
        default: return 0;
      }
    });
  }, [subcategory, sortBy, activeGender]);

  return (
    <div className="min-h-screen">
      <Navbar onCartOpen={() => setIsCartOpen(true)} />
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

      <main className="pt-24 pb-20">
        {/* Hero Banner */}
        <div className="bg-secondary py-16 mb-8">
          <div className="container mx-auto px-6 text-center">
            <h1 className="font-display text-4xl md:text-6xl mb-4">{title}</h1>
            <p className="text-muted-foreground max-w-lg mx-auto">{description}</p>
          </div>
        </div>

        <div className="container mx-auto px-6">
          {/* Toolbar */}
          <div className="flex flex-wrap items-center justify-between gap-4 py-4 mb-8 border-b border-border">
            {/* Gender Tabs */}
            <div className="flex items-center gap-1 bg-secondary rounded-lg p-1">
              {(['all', 'men', 'women'] as const).map((gender) => (
                <button
                  key={gender}
                  onClick={() => setActiveGender(gender)}
                  className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                    activeGender === gender
                      ? 'bg-background text-foreground shadow-sm'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {gender === 'all' ? 'All' : gender === 'men' ? 'Men' : 'Women'}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground">{filteredProducts.length} products</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="bg-transparent border border-border px-4 py-2 text-sm focus:outline-none focus:border-primary cursor-pointer"
              >
                <option value="featured">Featured</option>
                <option value="newest">Newest</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Top Rated</option>
              </select>
            </div>
          </div>

          {/* Products Grid */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-muted-foreground">No products found in this category</p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CategoryPage;
