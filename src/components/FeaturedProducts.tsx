import { Link } from 'react-router-dom';
import ProductCard from './ProductCard';
import { useFeaturedProducts } from '@/hooks/useProducts';

const FeaturedProducts = () => {
  const { products: featuredProducts, loading } = useFeaturedProducts();

  if (loading) {
    return (
      <section className="py-20 md:py-28 bg-secondary/30">
        <div className="container mx-auto px-6 text-center">
          <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin mx-auto" />
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 md:py-28 bg-secondary/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="w-10 h-px bg-accent/40" />
            <span className="section-subtitle">Curated Selection</span>
            <span className="w-10 h-px bg-accent/40" />
          </div>
          <h2 className="section-title">Featured Pieces</h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 md:gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="text-center mt-12">
          <Link to="/shop" className="btn-accent inline-block px-12">
            View All Products
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
