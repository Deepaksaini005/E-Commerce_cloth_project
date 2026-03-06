import { Link } from 'react-router-dom';
import heroImage from '@/assets/hero-main.jpg';

const Hero = () => {
  return (
    <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background Image with parallax feel */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="ÉLAN Spring Collection"
          className="w-full h-full object-cover scale-105"
          style={{ imageRendering: 'auto' }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/25 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
      </div>

      {/* Animated overlay shimmer */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_50%,_hsl(38_70%_55%/0.06),transparent_60%)]" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center md:text-left">
        <div className="max-w-2xl">
          <div className="flex items-center gap-3 justify-center md:justify-start mb-6 animate-fade-in">
            <span className="w-10 h-px bg-accent/60" />
            <span className="text-accent/90 text-xs tracking-[0.4em] uppercase font-medium">
              Spring/Summer 2026
            </span>
            <span className="w-10 h-px bg-accent/60" />
          </div>
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl text-primary-foreground font-medium leading-[0.9] mb-6 animate-slide-up animate-glow-text">
            Effortless
            <br />
            <span className="text-accent">Elegance</span>
          </h1>
          <p className="text-primary-foreground/75 text-lg md:text-xl max-w-md mb-10 animate-fade-in leading-relaxed" style={{ animationDelay: '0.2s' }}>
            Discover our curated collection of timeless pieces designed for the modern wardrobe.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <Link
              to="/women"
              className="inline-block bg-accent text-accent-foreground px-10 py-4 text-sm tracking-widest uppercase font-medium hover:bg-accent/90 transition-all duration-300 hover:shadow-lg"
            >
              Shop Women
            </Link>
            <Link
              to="/men"
              className="inline-block border-2 border-primary-foreground/80 text-primary-foreground px-10 py-4 text-sm tracking-widest uppercase font-medium hover:bg-primary-foreground hover:text-primary transition-all duration-300"
            >
              Shop Men
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce z-10">
        <div className="w-6 h-10 border-2 border-primary-foreground/40 rounded-full flex justify-center pt-2">
          <div className="w-1 h-2 bg-primary-foreground/40 rounded-full" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
