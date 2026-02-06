import { Link } from 'react-router-dom';
import { Watch, Footprints, Sparkles } from 'lucide-react';
import menImage from '@/assets/category-men.jpg';
import womenImage from '@/assets/category-women.jpg';

const categories = [
  { icon: Watch, label: 'Watches', to: '/watches', description: 'Luxury Timepieces' },
  { icon: Footprints, label: 'Shoes', to: '/shoes', description: 'Premium Footwear' },
  { icon: Sparkles, label: 'Skincare', to: '/skincare', description: 'Beauty Essentials' },
];

const CategorySection = () => {
  return (
    <section className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <span className="section-subtitle block mb-4">Explore</span>
          <h2 className="section-title">Shop by Category</h2>
        </div>

        {/* Main Categories */}
        <div className="grid md:grid-cols-2 gap-6 md:gap-8 mb-12">
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

        {/* Quick Category Links */}
        <div className="grid grid-cols-3 gap-4 md:gap-8">
          {categories.map(({ icon: Icon, label, to, description }) => (
            <Link
              key={label}
              to={to}
              className="group bg-secondary hover:bg-primary hover:text-primary-foreground transition-all duration-300 p-6 md:p-10 text-center rounded-sm"
            >
              <Icon className="mx-auto mb-3 text-muted-foreground group-hover:text-primary-foreground transition-colors" size={28} />
              <h3 className="font-display text-xl md:text-2xl font-medium mb-1">{label}</h3>
              <p className="text-xs md:text-sm text-muted-foreground group-hover:text-primary-foreground/70 transition-colors">{description}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
