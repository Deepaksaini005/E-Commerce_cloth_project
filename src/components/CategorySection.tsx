import { Link } from 'react-router-dom';
import menImage from '@/assets/category-men.jpg';
import womenImage from '@/assets/category-women.jpg';

const CategorySection = () => {
  return (
    <section className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <span className="section-subtitle block mb-4">Explore</span>
          <h2 className="section-title">Shop by Category</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          {/* Women */}
          <Link to="/women" className="group relative overflow-hidden">
            <div className="aspect-[3/4] md:aspect-[4/5]">
              <img
                src={womenImage}
                alt="Women's Collection"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300" />
            </div>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-cream">
              <span className="text-sm tracking-[0.3em] uppercase mb-2">Collection</span>
              <h3 className="font-display text-4xl md:text-5xl font-medium">Women</h3>
              <span className="mt-4 text-sm tracking-widest uppercase border-b border-cream pb-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                Shop Now
              </span>
            </div>
          </Link>

          {/* Men */}
          <Link to="/men" className="group relative overflow-hidden">
            <div className="aspect-[3/4] md:aspect-[4/5]">
              <img
                src={menImage}
                alt="Men's Collection"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300" />
            </div>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-cream">
              <span className="text-sm tracking-[0.3em] uppercase mb-2">Collection</span>
              <h3 className="font-display text-4xl md:text-5xl font-medium">Men</h3>
              <span className="mt-4 text-sm tracking-widest uppercase border-b border-cream pb-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                Shop Now
              </span>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
