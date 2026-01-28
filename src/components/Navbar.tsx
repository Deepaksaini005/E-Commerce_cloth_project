import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ShoppingBag, Search, User } from 'lucide-react';
import { useCart } from '@/context/CartContext';

interface NavbarProps {
  onCartOpen: () => void;
}

const Navbar = ({ onCartOpen }: NavbarProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { totalItems } = useCart();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 -ml-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Left Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            <Link to="/women" className="nav-link">Women</Link>
            <Link to="/men" className="nav-link">Men</Link>
            <Link to="/new" className="nav-link">New Arrivals</Link>
          </div>

          {/* Logo */}
          <Link to="/" className="font-display text-2xl md:text-3xl font-semibold tracking-tight">
            ÉLAN
          </Link>

          {/* Right Navigation */}
          <div className="flex items-center gap-4">
            <button className="p-2 hover:text-accent transition-colors hidden md:block">
              <Search size={20} />
            </button>
            <button className="p-2 hover:text-accent transition-colors hidden md:block">
              <User size={20} />
            </button>
            <button 
              className="p-2 hover:text-accent transition-colors relative"
              onClick={onCartOpen}
            >
              <ShoppingBag size={20} />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-accent text-accent-foreground rounded-full text-xs flex items-center justify-center font-medium">
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-background border-b border-border animate-slide-down">
            <div className="flex flex-col py-6 px-6 gap-4">
              <Link 
                to="/women" 
                className="text-lg font-medium py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Women
              </Link>
              <Link 
                to="/men" 
                className="text-lg font-medium py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Men
              </Link>
              <Link 
                to="/new" 
                className="text-lg font-medium py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                New Arrivals
              </Link>
              <div className="flex items-center gap-4 pt-4 border-t border-border">
                <button className="flex items-center gap-2 py-2">
                  <Search size={20} />
                  <span>Search</span>
                </button>
                <button className="flex items-center gap-2 py-2">
                  <User size={20} />
                  <span>Account</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
