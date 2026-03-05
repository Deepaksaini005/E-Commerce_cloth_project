import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SlidersHorizontal, Grid, LayoutGrid, X, Sparkles } from 'lucide-react';
import Navbar from '@/components/Navbar';
import CartDrawer from '@/components/CartDrawer';
import ProductCard from '@/components/ProductCard';
import ProductFilters from '@/components/ProductFilters';
import Footer from '@/components/Footer';
import { useProducts } from '@/hooks/useProducts';
import { FilterState, SortOption } from '@/types/product';

interface ShopPageProps {
  category: 'men' | 'women' | 'all';
  title: string;
}

const ShopPage = ({ category, title }: ShopPageProps) => {
  const [searchParams] = useSearchParams();
  const subParam = searchParams.get('sub');
  
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [gridCols, setGridCols] = useState<2 | 3 | 4>(3);
  const [sortBy, setSortBy] = useState<SortOption>('featured');
  const [filters, setFilters] = useState<FilterState>({
    subcategory: subParam || null,
    priceRange: [0, 2000],
    sizes: [],
    colors: [],
    inStock: false,
  });

  const { products: allProducts, loading } = useProducts(category);

  useEffect(() => {
    if (subParam) {
      setFilters(prev => ({ ...prev, subcategory: subParam }));
    }
  }, [subParam]);

  const subcategories = useMemo(() => {
    return [...new Set(allProducts.map(p => p.subcategory))];
  }, [allProducts]);

  const availableSizes = useMemo(() => {
    const sizes = new Set<string>();
    allProducts.forEach(p => p.sizes.forEach(s => sizes.add(s)));
    return Array.from(sizes);
  }, [allProducts]);

  const availableColors = useMemo(() => {
    const colors = new Set<string>();
    allProducts.forEach(p => p.colors.forEach(c => colors.add(c)));
    return Array.from(colors);
  }, [allProducts]);

  const filteredProducts = useMemo(() => {
    return allProducts.filter(product => {
      if (filters.subcategory && product.subcategory !== filters.subcategory) return false;
      if (product.price < filters.priceRange[0] || product.price > filters.priceRange[1]) return false;
      if (filters.sizes.length > 0 && !product.sizes.some(s => filters.sizes.includes(s))) return false;
      if (filters.colors.length > 0 && !product.colors.some(c => filters.colors.includes(c))) return false;
      return true;
    });
  }, [allProducts, filters]);

  const sortedProducts = useMemo(() => {
    return [...filteredProducts].sort((a, b) => {
      switch (sortBy) {
        case 'price-low': return a.price - b.price;
        case 'price-high': return b.price - a.price;
        case 'newest': return a.isNew ? -1 : b.isNew ? 1 : 0;
        case 'rating': return (b.rating || 0) - (a.rating || 0);
        default: return 0;
      }
    });
  }, [filteredProducts, sortBy]);

  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (filters.subcategory) count++;
    if (filters.sizes.length > 0) count++;
    if (filters.colors.length > 0) count++;
    if (filters.priceRange[0] > 0 || filters.priceRange[1] < 2000) count++;
    return count;
  }, [filters]);

  const bannerGradient = category === 'men' 
    ? 'gradient-banner gradient-banner-men' 
    : category === 'women' 
    ? 'gradient-banner gradient-banner-women' 
    : 'gradient-banner';

  const bannerDescription = category === 'men'
    ? 'Refined menswear for the modern gentleman. Tailored to perfection.'
    : category === 'women'
    ? 'Elegant womenswear that celebrates your unique style.'
    : 'Explore our curated collection of premium fashion pieces.';

  if (loading) {
    return (
      <div className="min-h-screen">
        <Navbar onCartOpen={() => setIsCartOpen(true)} />
        <div className="flex items-center justify-center pt-40">
          <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar onCartOpen={() => setIsCartOpen(true)} />
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

      <main className="pt-20 pb-20">
        {/* Animated Gradient Banner */}
        <div className={`${bannerGradient} py-20 md:py-28 relative banner-glow`}>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_hsl(38_70%_55%/0.08),transparent_60%)]" />
          <div className="container mx-auto px-6 text-center relative z-10">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Sparkles size={14} className="text-accent opacity-80" />
              <span className="text-xs tracking-[0.4em] uppercase text-accent/80 font-medium">
                {category === 'all' ? 'All Collections' : `${category === 'men' ? "Men's" : "Women's"} Collection`}
              </span>
              <Sparkles size={14} className="text-accent opacity-80" />
            </div>
            <h1 className="font-display text-4xl md:text-6xl lg:text-7xl mb-4 text-primary-foreground glow-text animate-fade-in">
              {title}
            </h1>
            <p className="text-primary-foreground/70 max-w-lg mx-auto text-sm md:text-base mb-2">
              {bannerDescription}
            </p>
            <p className="text-primary-foreground/50 text-sm">{sortedProducts.length} curated pieces</p>
          </div>
        </div>

        <div className="container mx-auto px-6 mt-8 mb-8">
          <div className="flex flex-wrap items-center justify-between gap-4 py-4 border-y border-border">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 text-sm hover:text-accent transition-colors"
            >
              <SlidersHorizontal size={18} />
              <span>Filters</span>
              {activeFilterCount > 0 && (
                <span className="w-5 h-5 bg-accent text-accent-foreground rounded-full text-xs flex items-center justify-center">
                  {activeFilterCount}
                </span>
              )}
            </button>

            <div className="flex items-center gap-6">
              <div className="hidden md:flex items-center gap-2">
                <button onClick={() => setGridCols(2)} className={`p-1 ${gridCols === 2 ? 'text-foreground' : 'text-muted-foreground'}`} aria-label="2 columns">
                  <Grid size={18} />
                </button>
                <button onClick={() => setGridCols(3)} className={`p-1 ${gridCols === 3 ? 'text-foreground' : 'text-muted-foreground'}`} aria-label="3 columns">
                  <LayoutGrid size={18} />
                </button>
                <button onClick={() => setGridCols(4)} className={`p-1 ${gridCols === 4 ? 'text-foreground' : 'text-muted-foreground'}`} aria-label="4 columns">
                  <div className="grid grid-cols-2 gap-0.5 w-[18px] h-[18px]">
                    {[...Array(4)].map((_, i) => (<div key={i} className="w-2 h-2 bg-current" />))}
                  </div>
                </button>
              </div>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
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
        </div>

        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-8">
            <aside className={`${showFilters ? 'block' : 'hidden'} lg:block fixed lg:relative inset-0 z-40 lg:z-auto bg-background lg:bg-transparent pt-24 lg:pt-0 px-6 lg:px-0 overflow-y-auto lg:overflow-visible`}>
              <div className="lg:hidden flex items-center justify-between mb-6">
                <h2 className="font-medium">Filters</h2>
                <button onClick={() => setShowFilters(false)} className="p-2"><X size={20} /></button>
              </div>
              <ProductFilters
                subcategories={subcategories}
                filters={filters}
                onFilterChange={setFilters}
                availableSizes={availableSizes}
                availableColors={availableColors}
              />
            </aside>

            <div className="flex-1">
              {sortedProducts.length > 0 ? (
                <div className={`grid gap-4 md:gap-8 ${
                  gridCols === 2 ? 'grid-cols-2' : gridCols === 3 ? 'grid-cols-2 md:grid-cols-3' : 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
                }`}>
                  {sortedProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-20">
                  <p className="text-muted-foreground mb-4">No products match your filters</p>
                  <button
                    onClick={() => setFilters({ subcategory: null, priceRange: [0, 2000], sizes: [], colors: [], inStock: false })}
                    className="text-accent hover:underline"
                  >
                    Clear all filters
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ShopPage;
