import { useState, useMemo } from 'react';
import { Watch, Footprints, Sparkles as SparklesIcon } from 'lucide-react';
import Navbar from '@/components/Navbar';
import CartDrawer from '@/components/CartDrawer';
import ProductCard from '@/components/ProductCard';
import Footer from '@/components/Footer';
import { useProductsBySubcategory } from '@/hooks/useProducts';
import { SortOption } from '@/types/product';

interface CategoryPageProps {
  subcategory: string;
  title: string;
  description: string;
}

const getCategoryGradient = (sub: string) => {
  switch (sub) {
    case 'watches': return 'from-[hsl(38,50%,15%)] via-[hsl(30,30%,18%)] to-[hsl(20,20%,12%)]';
    case 'shoes': return 'from-[hsl(0,0%,12%)] via-[hsl(20,10%,15%)] to-[hsl(15,15%,10%)]';
    case 'skincare': return 'from-[hsl(340,20%,18%)] via-[hsl(320,15%,15%)] to-[hsl(300,10%,12%)]';
    default: return 'from-[hsl(20,10%,12%)] via-[hsl(30,15%,15%)] to-[hsl(38,20%,18%)]';
  }
};

const getCategoryIcon = (sub: string) => {
  switch (sub) {
    case 'watches': return Watch;
    case 'shoes': return Footprints;
    default: return SparklesIcon;
  }
};

const CategoryPage = ({ subcategory, title, description }: CategoryPageProps) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [sortBy, setSortBy] = useState<SortOption>('featured');
  const [activeGender, setActiveGender] = useState<'all' | 'men' | 'women'>('all');

  const { products, loading } = useProductsBySubcategory(subcategory);
  const Icon = getCategoryIcon(subcategory);

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
        {/* Gradient Banner */}
        <div className={`bg-gradient-to-br ${getCategoryGradient(subcategory)} py-20 md:py-28 relative overflow-hidden banner-glow`}>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,_hsl(38_70%_55%/0.08),transparent_50%)]" />
          <div className="absolute top-0 right-0 w-96 h-96 bg-[radial-gradient(circle,_hsl(38_70%_55%/0.05),transparent_70%)]" />
          <div className="container mx-auto px-6 text-center relative z-10">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/10 mb-6 glow-border">
              <Icon size={28} className="text-accent" />
            </div>
            <h1 className="font-display text-4xl md:text-6xl lg:text-7xl mb-4 text-primary-foreground glow-text animate-fade-in">
              {title}
            </h1>
            <p className="text-primary-foreground/60 max-w-lg mx-auto text-sm md:text-base">{description}</p>
          </div>
        </div>

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
                className="bg-transparent border border-border px-4 py-2 text-sm focus:outline-none focus:border-accent cursor-pointer rounded-sm"
              >
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
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
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
