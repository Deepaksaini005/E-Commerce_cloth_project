import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Priya Sharma',
    location: 'Mumbai',
    rating: 5,
    text: 'The quality of ÉLAN products is unmatched. Every piece I\'ve purchased has exceeded expectations. The fabrics, the stitching — pure luxury.',
    product: 'Silk Evening Dress',
  },
  {
    name: 'Arjun Mehta',
    location: 'Delhi',
    text: 'Finally found a brand that delivers true premium menswear. The Italian wool blazer I ordered fits perfectly and the customer service was exceptional.',
    rating: 5,
    product: 'Italian Wool Blazer',
  },
  {
    name: 'Sarah Williams',
    location: 'London',
    text: 'ÉLAN\'s skincare line transformed my routine. The products are gentle yet effective, and the packaging is so elegant. Absolutely love it!',
    rating: 5,
    product: 'Luxury Skincare Set',
  },
];

const Testimonials = () => {
  return (
    <section className="py-20 md:py-28 bg-primary text-primary-foreground">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-sm tracking-[0.3em] uppercase text-primary-foreground/60 block mb-4">
            What Our Customers Say
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-medium">Loved by Thousands</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="relative p-8 border border-primary-foreground/10 rounded-sm bg-primary-foreground/5 hover:bg-primary-foreground/10 transition-colors"
            >
              <Quote size={28} className="text-accent mb-4 opacity-60" />
              <p className="text-primary-foreground/80 leading-relaxed mb-6 text-sm">
                "{t.text}"
              </p>
              <div className="flex items-center gap-1 mb-4">
                {[...Array(t.rating)].map((_, j) => (
                  <Star key={j} size={14} className="fill-accent text-accent" />
                ))}
              </div>
              <div>
                <p className="font-medium text-sm">{t.name}</p>
                <p className="text-xs text-primary-foreground/50">{t.location} · Purchased {t.product}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
