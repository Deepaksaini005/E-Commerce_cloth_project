import { Link } from 'react-router-dom';
import { Watch, Footprints, Sparkles } from 'lucide-react';
import menImage from '@/assets/category-men.jpg';
import womenImage from '@/assets/category-women.jpg';

const quickCategories = [
  { icon: Watch, label: 'Watches', to: '/watches', description: 'Luxury Timepieces', gradient: 'animated-banner animated-banner-watches' },
  { icon: Footprints, label: 'Shoes', to: '/shoes', description: 'Premium Footwear', gradient: 'animated-banner animated-banner-shoes' },
  { icon: Sparkles, label: 'Skincare', to: '/skincare', description: 'Beauty Essentials', gradient: 'animated-banner animated-banner-skincare' },
];

const CategorySection = () => {
  return (
    <section className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="w-10 h-px bg-accent/40" />
            <span className="section-subtitle">Explore</span>
            <span className="w-10 h-px bg-accent/40" />
          </div>
          <h2 className="section-title">Shop by Category</h2>
        </div>

        {/* Main Categories - Men & Women */}
        <div className="grid md:grid-cols-2 gap-6 md:gap-8 mb-10">
          {/* Women */}
          <Link to="/women" className="group relative overflow-hidden rounded-xl">
            <div className="aspect-[3/4] md:aspect-[4/5]">
              <img src={womenImage} alt="Women's Collection"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                style={{ imageRendering: 'auto' }} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent group-hover:from-black/70 transition-all duration-500" />
            </div>
            <div className="absolute inset-0 flex flex-col items-center justify-end pb-12 text-primary-foreground">
              <span className="text-xs tracking-[0.4em] uppercase mb-2 opacity-70">Collection</span>
              <h3 className="font-display text-4xl md:text-5xl font-medium animate-glow-text">Women</h3>
              <span className="mt-4 text-sm tracking-widest uppercase border-b border-accent/60 pb-1 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0 text-accent">
                Shop Now
              </span>
            </div>
          </Link>

          {/* Men */}
          <Link to="/men" className="group relative overflow-hidden rounded-xl">
            <div className="aspect-[3/4] md:aspect-[4/5]">
              <img src={menImage} alt="Men's Collection"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                style={{ imageRendering: 'auto' }} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent group-hover:from-black/70 transition-all duration-500" />
            </div>
            <div className="absolute inset-0 flex flex-col items-center justify-end pb-12 text-primary-foreground">
              <span className="text-xs tracking-[0.4em] uppercase mb-2 opacity-70">Collection</span>
              <h3 className="font-display text-4xl md:text-5xl font-medium animate-glow-text">Men</h3>
              <span className="mt-4 text-sm tracking-widest uppercase border-b border-accent/60 pb-1 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0 text-accent">
                Shop Now
              </span>
            </div>
          </Link>
        </div>

        {/* Quick Category Links with animated backgrounds */}
        <div className="grid grid-cols-3 gap-4 md:gap-6">
          {quickCategories.map(({ icon: Icon, label, to, description, gradient }) => (
            <Link key={label} to={to}
              className={`group relative overflow-hidden ${gradient} p-8 md:p-12 text-center rounded-xl transition-all duration-500 hover:shadow-lg hover:scale-[1.02]`}>
              {/* Particle effects */}
              <div className="banner-particles">
                <span /><span /><span />
              </div>
              <div className="relative z-10">
                <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors duration-300 glow-border">
                  <Icon className="text-accent" size={24} />
                </div>
                <h3 className="font-display text-xl md:text-2xl font-medium mb-1 text-primary-foreground animate-glow-text">{label}</h3>
                <p className="text-xs md:text-sm text-primary-foreground/50">{description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
