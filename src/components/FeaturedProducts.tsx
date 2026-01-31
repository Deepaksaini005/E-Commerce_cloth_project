import { Link } from 'react-router-dom';
import ProductCard from './ProductCard';
import { products } from '@/data/products';

const FeaturedProducts = () => {
  // Get 2 women's and 2 men's products for variety
  const womenProducts = products.filter(p => p.category === 'women').slice(0, 2);
  const menProducts = products.filter(p => p.category === 'men').slice(0, 2);
  const featuredProducts = [...womenProducts, ...menProducts];

  return (
    <section className="py-20 md:py-32 bg-secondary/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <span className="section-subtitle block mb-4">Curated Selection</span>
          <h2 className="section-title">Featured Pieces</h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="text-center mt-12">
          <Link to="/shop" className="btn-secondary inline-block">
            View All Products
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
