import { Link } from 'react-router-dom';
import { Watch, Footprints, Sparkles } from 'lucide-react';
import menImage from '@/assets/category-men.jpg';
import womenImage from '@/assets/category-women.jpg';

const categories = [
  { icon: Watch, label: 'Watches', to: '/watches', description: 'Luxury Timepieces', gradient: 'from-amber-900/80 to-yellow-800/40' },
  { icon: Footprints, label: 'Shoes', to: '/shoes', description: 'Premium Footwear', gradient: 'from-stone-900/80 to-stone-700/40' },
  { icon: Sparkles, label: 'Skincare', to: '/skincare', description: 'Beauty Essentials', gradient: 'from-rose-900/80 to-pink-700/40' },
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
          <Link to="/women" className="group relative overflow-hidden rounded-xl">
            <div className="aspect-[3/4] md:aspect-[4/5]">
              <img src={womenImage} alt="Women's Collection"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent group-hover:from-black/70 transition-all duration-500" />
            </div>
            <div className="absolute inset-0 flex flex-col items-center justify-end pb-12 text-primary-foreground">
              <span className="text-xs tracking-[0.4em] uppercase mb-2 opacity-80">Collection</span>
              <h3 className="font-display text-4xl md:text-5xl font-medium glow-text">Women</h3>
              <span className="mt-4 text-sm tracking-widest uppercase border-b border-primary-foreground/50 pb-1 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                Shop Now
              </span>
            </div>
          </Link>

          {/* Men */}
          <Link to="/men" className="group relative overflow-hidden rounded-xl">
            <div className="aspect-[3/4] md:aspect-[4/5]">
              <img src={menImage} alt="Men's Collection"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent group-hover:from-black/70 transition-all duration-500" />
            </div>
            <div className="absolute inset-0 flex flex-col items-center justify-end pb-12 text-primary-foreground">
              <span className="text-xs tracking-[0.4em] uppercase mb-2 opacity-80">Collection</span>
              <h3 className="font-display text-4xl md:text-5xl font-medium glow-text">Men</h3>
              <span className="mt-4 text-sm tracking-widest uppercase border-b border-primary-foreground/50 pb-1 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                Shop Now
              </span>
            </div>
          </Link>
        </div>

        {/* Quick Category Links */}
        <div className="grid grid-cols-3 gap-4 md:gap-6">
          {categories.map(({ icon: Icon, label, to, description, gradient }) => (
            <Link key={label} to={to}
              className={`group relative overflow-hidden bg-gradient-to-br ${gradient} p-8 md:p-12 text-center rounded-xl transition-all duration-500 hover:shadow-lg hover:scale-[1.02]`}>
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,_hsl(38_70%_55%/0.1),transparent_60%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10">
                <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-primary-foreground/10 flex items-center justify-center group-hover:bg-primary-foreground/20 transition-colors">
                  <Icon className="text-primary-foreground/80 group-hover:text-accent transition-colors" size={24} />
                </div>
                <h3 className="font-display text-xl md:text-2xl font-medium mb-1 text-primary-foreground">{label}</h3>
                <p className="text-xs md:text-sm text-primary-foreground/60">{description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
