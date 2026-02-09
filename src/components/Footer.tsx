import { Link } from 'react-router-dom';
import { Instagram, Facebook, Twitter, Mail, Watch, Footprints, Sparkles } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground py-16 md:py-20">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-5 gap-12 md:gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link to="/" className="font-display text-3xl font-semibold">
              ÉLAN
            </Link>
            <p className="mt-4 text-primary-foreground/70 text-sm leading-relaxed">
              Timeless elegance for the modern wardrobe. Quality craftsmanship meets contemporary design.
            </p>
            <div className="flex gap-4 mt-6">
              <a href="#" className="hover:text-accent transition-colors"><Instagram size={20} /></a>
              <a href="#" className="hover:text-accent transition-colors"><Facebook size={20} /></a>
              <a href="#" className="hover:text-accent transition-colors"><Twitter size={20} /></a>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 className="font-medium text-sm tracking-wider uppercase mb-4">Shop</h4>
            <ul className="space-y-3 text-sm text-primary-foreground/70">
              <li><Link to="/women" className="hover:text-primary-foreground transition-colors">Women</Link></li>
              <li><Link to="/men" className="hover:text-primary-foreground transition-colors">Men</Link></li>
              <li><Link to="/new" className="hover:text-primary-foreground transition-colors">New Arrivals</Link></li>
              <li><Link to="/sale" className="hover:text-primary-foreground transition-colors">Sale</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-medium text-sm tracking-wider uppercase mb-4">Categories</h4>
            <ul className="space-y-3 text-sm text-primary-foreground/70">
              <li><Link to="/watches" className="hover:text-primary-foreground transition-colors flex items-center gap-2"><Watch size={14} /> Watches</Link></li>
              <li><Link to="/shoes" className="hover:text-primary-foreground transition-colors flex items-center gap-2"><Footprints size={14} /> Shoes</Link></li>
              <li><Link to="/skincare" className="hover:text-primary-foreground transition-colors flex items-center gap-2"><Sparkles size={14} /> Skincare</Link></li>
            </ul>
          </div>

          {/* Help */}
          <div>
            <h4 className="font-medium text-sm tracking-wider uppercase mb-4">Help</h4>
            <ul className="space-y-3 text-sm text-primary-foreground/70">
              <li><Link to="/track-order" className="hover:text-primary-foreground transition-colors">Track Order</Link></li>
              <li><Link to="/faq" className="hover:text-primary-foreground transition-colors">FAQ</Link></li>
              <li><Link to="/shipping" className="hover:text-primary-foreground transition-colors">Shipping</Link></li>
              <li><Link to="/returns" className="hover:text-primary-foreground transition-colors">Returns</Link></li>
              <li><Link to="/contact" className="hover:text-primary-foreground transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-medium text-sm tracking-wider uppercase mb-4">Newsletter</h4>
            <p className="text-sm text-primary-foreground/70 mb-4">
              Subscribe for exclusive offers and updates.
            </p>
            <form className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 bg-transparent border border-primary-foreground/30 px-4 py-2 text-sm focus:outline-none focus:border-primary-foreground transition-colors"
              />
              <button type="submit" className="bg-accent text-accent-foreground px-4 py-2 hover:bg-accent/90 transition-colors">
                <Mail size={18} />
              </button>
            </form>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-primary-foreground/20 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-primary-foreground/50">
          <p>© 2025 ÉLAN. All rights reserved.</p>
          <div className="flex gap-6">
            <Link to="/privacy" className="hover:text-primary-foreground transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-primary-foreground transition-colors">Terms of Service</Link>
            <Link to="/admin" className="hover:text-primary-foreground transition-colors">Admin</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
