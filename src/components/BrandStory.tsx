import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const BrandStory = () => {
  return (
    <section className="py-20 md:py-28 bg-background overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
          <div>
            <span className="section-subtitle block mb-4">Our Philosophy</span>
            <h2 className="font-display text-3xl md:text-5xl font-medium leading-tight mb-6">
              Crafted with
              <br />
              <span className="text-accent">Intention</span>
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              At ÉLAN, we believe fashion should be timeless, not disposable. Every piece in our collection
              is thoughtfully designed using premium materials sourced from the finest ateliers in Italy, France,
              and Japan.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-8">
              Our commitment to sustainable craftsmanship means each garment is made to last — not just a season,
              but a lifetime. From hand-finished seams to natural dyes, quality runs through every thread.
            </p>
            <div className="flex flex-wrap gap-8 mb-8">
              <div>
                <p className="font-display text-3xl font-semibold text-accent">15K+</p>
                <p className="text-xs text-muted-foreground uppercase tracking-wider mt-1">Happy Customers</p>
              </div>
              <div>
                <p className="font-display text-3xl font-semibold text-accent">200+</p>
                <p className="text-xs text-muted-foreground uppercase tracking-wider mt-1">Curated Pieces</p>
              </div>
              <div>
                <p className="font-display text-3xl font-semibold text-accent">4.9★</p>
                <p className="text-xs text-muted-foreground uppercase tracking-wider mt-1">Average Rating</p>
              </div>
            </div>
            <Link to="/shop" className="inline-flex items-center gap-2 text-sm font-medium tracking-wider uppercase text-accent hover:gap-3 transition-all">
              Explore Collection <ArrowRight size={16} />
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="aspect-[3/4] bg-secondary rounded-sm overflow-hidden">
                <img src="/placeholder.svg" alt="Craftsmanship" className="w-full h-full object-cover" />
              </div>
              <div className="aspect-square bg-accent/10 rounded-sm flex items-center justify-center p-6">
                <p className="font-display text-xl text-center italic text-accent">"Quality is remembered long after the price is forgotten."</p>
              </div>
            </div>
            <div className="space-y-4 mt-8">
              <div className="aspect-square bg-secondary rounded-sm overflow-hidden">
                <img src="/placeholder.svg" alt="Sustainable fashion" className="w-full h-full object-cover" />
              </div>
              <div className="aspect-[3/4] bg-secondary rounded-sm overflow-hidden">
                <img src="/placeholder.svg" alt="Premium materials" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BrandStory;
