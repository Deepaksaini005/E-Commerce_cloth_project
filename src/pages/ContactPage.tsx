import { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react';
import Navbar from '@/components/Navbar';
import CartDrawer from '@/components/CartDrawer';
import Footer from '@/components/Footer';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

const ContactPage = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error('Please fill in all required fields');
      return;
    }

    setLoading(true);
    const { error } = await supabase
      .from('contact_messages' as any)
      .insert(form as any);

    if (error) {
      toast.error('Failed to send message. Please try again.');
    } else {
      setSubmitted(true);
      toast.success('Message sent successfully!');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen">
      <Navbar onCartOpen={() => setIsCartOpen(true)} />
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

      <main className="pt-24 pb-20">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="text-center py-12">
            <h1 className="font-display text-4xl md:text-5xl mb-4">Get in Touch</h1>
            <p className="text-muted-foreground max-w-md mx-auto">
              We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </p>
          </div>

          <div className="grid md:grid-cols-[1fr,1.5fr] gap-12">
            {/* Contact Info */}
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <Mail size={18} className="text-accent" />
                </div>
                <div>
                  <h3 className="font-medium text-sm mb-1">Email</h3>
                  <p className="text-sm text-muted-foreground">support@elan.com</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <Phone size={18} className="text-accent" />
                </div>
                <div>
                  <h3 className="font-medium text-sm mb-1">Phone</h3>
                  <p className="text-sm text-muted-foreground">+91 98765 43210</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <MapPin size={18} className="text-accent" />
                </div>
                <div>
                  <h3 className="font-medium text-sm mb-1">Address</h3>
                  <p className="text-sm text-muted-foreground">42 Fashion Street, Mumbai<br />Maharashtra 400001, India</p>
                </div>
              </div>

              <div className="p-6 bg-secondary/50 rounded-lg">
                <h3 className="font-display text-lg mb-2">Business Hours</h3>
                <div className="space-y-1 text-sm text-muted-foreground">
                  <p>Monday - Friday: 9:00 AM - 8:00 PM</p>
                  <p>Saturday: 10:00 AM - 6:00 PM</p>
                  <p>Sunday: Closed</p>
                </div>
              </div>
            </div>

            {/* Form */}
            {submitted ? (
              <div className="flex items-center justify-center p-12 border border-border rounded-lg animate-fade-in">
                <div className="text-center">
                  <CheckCircle className="w-16 h-16 text-accent mx-auto mb-4" />
                  <h3 className="font-display text-2xl mb-2">Message Sent!</h3>
                  <p className="text-muted-foreground text-sm">We'll get back to you within 24 hours.</p>
                  <Button onClick={() => { setSubmitted(false); setForm({ name: '', email: '', subject: '', message: '' }); }} variant="outline" className="mt-6">
                    Send Another
                  </Button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="p-6 md:p-8 border border-border rounded-lg space-y-5">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Name *</Label>
                    <Input id="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="mt-1.5" required />
                  </div>
                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input id="email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="mt-1.5" required />
                  </div>
                </div>
                <div>
                  <Label htmlFor="subject">Subject</Label>
                  <Input id="subject" value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} className="mt-1.5" />
                </div>
                <div>
                  <Label htmlFor="message">Message *</Label>
                  <textarea
                    id="message"
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    rows={5}
                    className="mt-1.5 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    required
                  />
                </div>
                <Button type="submit" disabled={loading} className="btn-primary w-full h-12">
                  {loading ? 'Sending...' : (
                    <span className="flex items-center gap-2"><Send size={16} /> Send Message</span>
                  )}
                </Button>
              </form>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ContactPage;
