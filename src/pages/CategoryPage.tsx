import { useState, useMemo } from 'react';
import { Watch, Footprints, Sparkles as SparklesIcon } from 'lucide-react';
import Navbar from '@/components/Navbar';
import CartDrawer from '@/components/CartDrawer';
import ProductCard from '@/components/ProductCard';
import Footer from '@/components/Footer';
import AnimatedBanner from '@/components/AnimatedBanner';
import { useProductsBySubcategory } from '@/hooks/useProducts';
import { SortOption } from '@/types/product';

interface CategoryPageProps {
  subcategory: string;
  title: string;
  description: string;
}

const getCategoryIcon = (sub: string) => {
  switch (sub) {
    case 'watches': return <Watch size={28} className="text-accent" />;
    case 'shoes': return <Footprints size={28} className="text-accent" />;
    default: return <SparklesIcon size={28} className="text-accent" />;
  }
};

const getBannerVariant = (sub: string): 'watches' | 'shoes' | 'skincare' | 'default' => {
  if (sub === 'watches') return 'watches';
  if (sub === 'shoes') return 'shoes';
  if (sub === 'skincare') return 'skincare';
  return 'default';
};

const CategoryPage = ({ subcategory, title, description }: CategoryPageProps) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [sortBy, setSortBy] = useState<SortOption>('featured');
  const [activeGender, setActiveGender] = useState<'all' | 'men' | 'women'>('all');

  const { products, loading } = useProductsBySubcategory(subcategory);

  const filteredProducts = useMemo(() => {
    let items = activeGender !== 'all' ? products.filter(p => p.category === activeGender) : products;
    return [...items].sort((a, b) => {
      switch (sortBy) {
        case 'price-low': return a.price - b.price;
        case 'price-high': return b.price - a.price;
        case 'newest': return a.isNew ? -1 : b.isNew ? 1 : 0;
        case 'rating': return (b.rating || 0) - (a.rating || 0);
        default: return 0;
      }
    });
  }, [products, sortBy, activeGender]);

  return (
    <div className="min-h-screen">
      <Navbar onCartOpen={() => setIsCartOpen(true)} />
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

      <main className="pt-20 pb-20">
        <AnimatedBanner
          variant={getBannerVariant(subcategory)}
          title={title}
          subtitle={`${subcategory.charAt(0).toUpperCase() + subcategory.slice(1)} Collection`}
          description={description}
          icon={getCategoryIcon(subcategory)}
          count={filteredProducts.length}
        />

        <div className="container mx-auto px-6 mt-8">
          <div className="flex flex-wrap items-center justify-between gap-4 py-4 mb-8 border-b border-border">
            <div className="flex items-center gap-1 bg-secondary rounded-lg p-1">
              {(['all', 'men', 'women'] as const).map((gender) => (
                <button key={gender} onClick={() => setActiveGender(gender)}
                  className={`px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 ${activeGender === gender ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}
                >{gender === 'all' ? 'All' : gender === 'men' ? 'Men' : 'Women'}</button>
              ))}
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground">{filteredProducts.length} products</span>
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="bg-transparent border border-border px-4 py-2 text-sm focus:outline-none focus:border-accent cursor-pointer rounded-sm">
                <option value="featured">Featured</option>
                <option value="newest">Newest</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Top Rated</option>
              </select>
            </div>
          </div>

          {loading ? (
            <div className="text-center py-20">
              <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin mx-auto" />
            </div>
          ) : filteredProducts.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {filteredProducts.map((product) => <ProductCard key={product.id} product={product} />)}
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
