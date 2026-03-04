import { useState } from 'react';
import { Mail, ArrowRight, CheckCircle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

const NewsletterSection = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error('Please enter a valid email address');
      return;
    }

    setLoading(true);
    const { error } = await supabase
      .from('newsletter_subscribers' as any)
      .insert({ email: email.trim() } as any);

    if (error) {
      if (error.code === '23505') {
        toast.info('You\'re already subscribed!');
      } else {
        toast.error('Something went wrong. Please try again.');
      }
    } else {
      setSubscribed(true);
      toast.success('Welcome! You\'re now subscribed.');
    }
    setLoading(false);
  };

  return (
    <section className="py-20 md:py-28 bg-accent/5 border-y border-accent/10">
      <div className="container mx-auto px-6 max-w-2xl text-center">
        {subscribed ? (
          <div className="animate-fade-in">
            <CheckCircle className="w-16 h-16 text-accent mx-auto mb-6" />
            <h2 className="font-display text-3xl md:text-4xl mb-3">You're In!</h2>
            <p className="text-muted-foreground">Get ready for exclusive deals, new arrivals, and styling tips delivered to your inbox.</p>
          </div>
        ) : (
          <>
            <Mail className="w-10 h-10 text-accent mx-auto mb-6" />
            <h2 className="font-display text-3xl md:text-4xl mb-3">Stay in the Loop</h2>
            <p className="text-muted-foreground mb-8 max-w-md mx-auto">
              Get 10% off your first order plus exclusive access to new collections, deals, and styling tips.
            </p>
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 bg-background border border-border px-5 py-3 text-sm focus:outline-none focus:border-accent transition-colors rounded-sm"
                required
              />
              <button
                type="submit"
                disabled={loading}
                className="btn-accent flex items-center justify-center gap-2 px-6 py-3 rounded-sm"
              >
                {loading ? 'Subscribing...' : (
                  <>Subscribe <ArrowRight size={16} /></>
                )}
              </button>
            </form>
            <p className="text-xs text-muted-foreground mt-4">No spam, ever. Unsubscribe anytime.</p>
          </>
        )}
      </div>
    </section>
  );
};

export default NewsletterSection;
