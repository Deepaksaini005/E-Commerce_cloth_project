import { Link } from 'react-router-dom';
import ProductCard from './ProductCard';
import { products } from '@/data/products';

const FeaturedProducts = () => {
  // Get a mix across categories for variety
  const womenClothing = products.filter(p => p.category === 'women' && !['watches', 'shoes', 'skincare'].includes(p.subcategory)).slice(0, 1);
  const menClothing = products.filter(p => p.category === 'men' && !['watches', 'shoes', 'skincare'].includes(p.subcategory)).slice(0, 1);
  const watches = products.filter(p => p.subcategory === 'watches').slice(0, 1);
  const shoes = products.filter(p => p.subcategory === 'shoes').slice(0, 1);
  const skincare = products.filter(p => p.subcategory === 'skincare').slice(0, 1);
  
  const featuredProducts = [...womenClothing, ...menClothing, ...watches, ...shoes, ...skincare].slice(0, 5);

  return (
    <section className="py-20 md:py-32 bg-secondary/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <span className="section-subtitle block mb-4">Curated Selection</span>
          <h2 className="section-title">Featured Pieces</h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 md:gap-6">
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
