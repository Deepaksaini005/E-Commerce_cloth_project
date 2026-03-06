import { ReactNode } from 'react';

interface AnimatedBannerProps {
  variant: 'men' | 'women' | 'watches' | 'shoes' | 'skincare' | 'new' | 'sale' | 'default';
  title: string;
  subtitle?: string;
  description?: string;
  icon?: ReactNode;
  count?: number;
  className?: string;
}

const AnimatedBanner = ({ variant, title, subtitle, description, icon, count, className = '' }: AnimatedBannerProps) => {
  const bannerClass = variant === 'default' ? 'animated-banner gradient-banner' : `animated-banner animated-banner-${variant}`;

  return (
    <div className={`${bannerClass} py-24 md:py-32 relative ${className}`}>
      {/* Animated particles */}
      <div className="banner-particles">
        <span /><span /><span /><span /><span />
      </div>

      {/* Radial glow overlays */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_hsl(38_70%_55%/0.06),transparent_60%)] z-[1]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_hsl(38_70%_55%/0.04),transparent_50%)] z-[1]" />

      {/* Bottom glow line */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[60%] h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent z-[2]" />

      <div className="container mx-auto px-6 text-center relative z-10">
        {icon && (
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/10 mb-6 glow-border animate-fade-in">
            {icon}
          </div>
        )}
        {subtitle && (
          <div className="flex items-center justify-center gap-3 mb-4 animate-fade-in">
            <span className="w-8 h-px bg-accent/40" />
            <span className="text-xs tracking-[0.4em] uppercase text-accent/80 font-medium">
              {subtitle}
            </span>
            <span className="w-8 h-px bg-accent/40" />
          </div>
        )}
        <h1 className="font-display text-4xl md:text-6xl lg:text-7xl mb-4 text-primary-foreground animate-glow-text animate-fade-in">
          {title}
        </h1>
        {description && (
          <p className="text-primary-foreground/60 max-w-lg mx-auto text-sm md:text-base mb-2 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            {description}
          </p>
        )}
        {count !== undefined && (
          <p className="text-primary-foreground/40 text-sm animate-fade-in" style={{ animationDelay: '0.3s' }}>
            {count} curated pieces
          </p>
        )}
      </div>
    </div>
  );
};

export default AnimatedBanner;
