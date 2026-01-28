import { Link } from 'react-router-dom';
import heroImage from '@/assets/hero-main.jpg';

const Hero = () => {
  return (
    <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="ÉLAN Spring Collection"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/20 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center md:text-left">
        <div className="max-w-2xl">
          <span className="inline-block text-cream/90 text-sm tracking-[0.3em] uppercase mb-4 animate-fade-in">
            Spring/Summer 2025
          </span>
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl text-cream font-medium leading-[0.9] mb-6 animate-slide-up">
            Effortless
            <br />
            Elegance
          </h1>
          <p className="text-cream/80 text-lg md:text-xl max-w-md mb-8 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            Discover our curated collection of timeless pieces designed for the modern wardrobe.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <Link
              to="/women"
              className="inline-block bg-cream text-charcoal px-10 py-4 text-sm tracking-widest uppercase font-medium hover:bg-cream/90 transition-all duration-300"
            >
              Shop Women
            </Link>
            <Link
              to="/men"
              className="inline-block border-2 border-cream text-cream px-10 py-4 text-sm tracking-widest uppercase font-medium hover:bg-cream hover:text-charcoal transition-all duration-300"
            >
              Shop Men
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-cream/50 rounded-full flex justify-center pt-2">
          <div className="w-1 h-2 bg-cream/50 rounded-full" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
