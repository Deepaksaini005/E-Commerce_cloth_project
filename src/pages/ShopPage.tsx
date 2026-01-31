import { useState, useMemo } from 'react';
import { SlidersHorizontal, Grid, LayoutGrid, X } from 'lucide-react';
import Navbar from '@/components/Navbar';
import CartDrawer from '@/components/CartDrawer';
import ProductCard from '@/components/ProductCard';
import ProductFilters from '@/components/ProductFilters';
import Footer from '@/components/Footer';
import { getProductsByCategory, getSubcategories } from '@/data/products';
import { FilterState, SortOption } from '@/types/product';

interface ShopPageProps {
  category: 'men' | 'women' | 'all';
  title: string;
}

const ShopPage = ({ category, title }: ShopPageProps) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [gridCols, setGridCols] = useState<2 | 3 | 4>(3);
  const [sortBy, setSortBy] = useState<SortOption>('featured');
  const [filters, setFilters] = useState<FilterState>({
    subcategory: null,
    priceRange: [0, 1000],
    sizes: [],
    colors: [],
    inStock: false,
  });

  const allProducts = getProductsByCategory(category);
  const subcategories = getSubcategories(category);

  // Get available sizes and colors from products
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

  // Apply filters
  const filteredProducts = useMemo(() => {
    return allProducts.filter(product => {
      // Subcategory filter
      if (filters.subcategory && product.subcategory !== filters.subcategory) {
        return false;
      }

      // Price filter
      if (product.price < filters.priceRange[0] || product.price > filters.priceRange[1]) {
        return false;
      }

      // Size filter
      if (filters.sizes.length > 0 && !product.sizes.some(s => filters.sizes.includes(s))) {
        return false;
      }

      // Color filter
      if (filters.colors.length > 0 && !product.colors.some(c => filters.colors.includes(c))) {
        return false;
      }

      return true;
    });
  }, [allProducts, filters]);

  // Sort products
  const sortedProducts = useMemo(() => {
    return [...filteredProducts].sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'newest':
          return a.isNew ? -1 : b.isNew ? 1 : 0;
        case 'rating':
          return (b.rating || 0) - (a.rating || 0);
        default:
          return 0;
      }
    });
  }, [filteredProducts, sortBy]);

  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (filters.subcategory) count++;
    if (filters.sizes.length > 0) count++;
    if (filters.colors.length > 0) count++;
    if (filters.priceRange[0] > 0 || filters.priceRange[1] < 1000) count++;
    return count;
  }, [filters]);

  return (
    <div className="min-h-screen">
      <Navbar onCartOpen={() => setIsCartOpen(true)} />
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

      <main className="pt-24 pb-20">
        {/* Header */}
        <div className="container mx-auto px-6 py-12 text-center">
          <h1 className="font-display text-4xl md:text-5xl mb-4">{title}</h1>
          <p className="text-muted-foreground">{sortedProducts.length} products</p>
        </div>

        {/* Toolbar */}
        <div className="container mx-auto px-6 mb-8">
          <div className="flex flex-wrap items-center justify-between gap-4 py-4 border-y border-border">
            {/* Filter Toggle */}
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

            {/* View Options */}
            <div className="flex items-center gap-6">
              <div className="hidden md:flex items-center gap-2">
                <button
                  onClick={() => setGridCols(2)}
                  className={`p-1 ${gridCols === 2 ? 'text-foreground' : 'text-muted-foreground'}`}
                  aria-label="2 columns"
                >
                  <Grid size={18} />
                </button>
                <button
                  onClick={() => setGridCols(3)}
                  className={`p-1 ${gridCols === 3 ? 'text-foreground' : 'text-muted-foreground'}`}
                  aria-label="3 columns"
                >
                  <LayoutGrid size={18} />
                </button>
                <button
                  onClick={() => setGridCols(4)}
                  className={`p-1 ${gridCols === 4 ? 'text-foreground' : 'text-muted-foreground'}`}
                  aria-label="4 columns"
                >
                  <div className="grid grid-cols-2 gap-0.5 w-[18px] h-[18px]">
                    {[...Array(4)].map((_, i) => (
                      <div key={i} className="w-2 h-2 bg-current" />
                    ))}
                  </div>
                </button>
              </div>

              {/* Sort */}
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
        </div>

        {/* Content */}
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar Filters */}
            <aside
              className={`${
                showFilters ? 'block' : 'hidden'
              } lg:block fixed lg:relative inset-0 z-40 lg:z-auto bg-background lg:bg-transparent pt-24 lg:pt-0 px-6 lg:px-0 overflow-y-auto lg:overflow-visible`}
            >
              <div className="lg:hidden flex items-center justify-between mb-6">
                <h2 className="font-medium">Filters</h2>
                <button onClick={() => setShowFilters(false)} className="p-2">
                  <X size={20} />
                </button>
              </div>
              <ProductFilters
                subcategories={subcategories}
                filters={filters}
                onFilterChange={setFilters}
                availableSizes={availableSizes}
                availableColors={availableColors}
              />
            </aside>

            {/* Products Grid */}
            <div className="flex-1">
              {sortedProducts.length > 0 ? (
                <div
                  className={`grid gap-4 md:gap-8 ${
                    gridCols === 2
                      ? 'grid-cols-2'
                      : gridCols === 3
                      ? 'grid-cols-2 md:grid-cols-3'
                      : 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
                  }`}
                >
                  {sortedProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-20">
                  <p className="text-muted-foreground mb-4">No products match your filters</p>
                  <button
                    onClick={() =>
                      setFilters({
                        subcategory: null,
                        priceRange: [0, 1000],
                        sizes: [],
                        colors: [],
                        inStock: false,
                      })
                    }
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
