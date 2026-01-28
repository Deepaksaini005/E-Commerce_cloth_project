import { Truck, RefreshCw, Shield, Headphones } from 'lucide-react';

const features = [
  {
    icon: Truck,
    title: 'Free Shipping',
    description: 'On orders over $150',
  },
  {
    icon: RefreshCw,
    title: 'Easy Returns',
    description: '30-day return policy',
  },
  {
    icon: Shield,
    title: 'Secure Payment',
    description: 'Protected transactions',
  },
  {
    icon: Headphones,
    title: 'Expert Support',
    description: 'Personal styling help',
  },
];

const Features = () => {
  return (
    <section className="py-16 border-y border-border bg-background">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
          {features.map((feature, index) => (
            <div key={index} className="text-center">
              <feature.icon className="w-8 h-8 mx-auto mb-4 text-accent" strokeWidth={1.5} />
              <h3 className="font-medium text-sm md:text-base mb-1">{feature.title}</h3>
              <p className="text-xs md:text-sm text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
