import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ShoppingBag, Search, Heart, User, ChevronDown, Watch, Footprints, Sparkles } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import SearchModal from '@/components/SearchModal';

interface NavbarProps {
  onCartOpen: () => void;
}

interface MegaMenuContent {
  title: string;
  links: { label: string; to: string }[];
}

const womenMenu: MegaMenuContent[] = [
  {
    title: 'Clothing',
    links: [
      { label: 'All Women', to: '/women' },
      { label: 'Dresses', to: '/women?sub=dresses' },
      { label: 'Blazers', to: '/women?sub=blazers' },
      { label: 'Knitwear', to: '/women?sub=knitwear' },
      { label: 'Trousers', to: '/women?sub=trousers' },
      { label: 'Outerwear', to: '/women?sub=outerwear' },
    ],
  },
  {
    title: 'Shoes',
    links: [
      { label: 'All Shoes', to: '/women?sub=shoes' },
      { label: 'Heels', to: '/women?sub=shoes' },
      { label: 'Flats', to: '/women?sub=shoes' },
    ],
  },
  {
    title: 'Accessories',
    links: [
      { label: 'Watches', to: '/women?sub=watches' },
      { label: 'Bags', to: '/women?sub=accessories' },
      { label: 'Skincare', to: '/women?sub=skincare' },
    ],
  },
];

const menMenu: MegaMenuContent[] = [
  {
    title: 'Clothing',
    links: [
      { label: 'All Men', to: '/men' },
      { label: 'Blazers', to: '/men?sub=blazers' },
      { label: 'Tops', to: '/men?sub=tops' },
      { label: 'Knitwear', to: '/men?sub=knitwear' },
      { label: 'Trousers', to: '/men?sub=trousers' },
      { label: 'Outerwear', to: '/men?sub=outerwear' },
    ],
  },
  {
    title: 'Shoes',
    links: [
      { label: 'All Shoes', to: '/men?sub=shoes' },
      { label: 'Formal', to: '/men?sub=shoes' },
      { label: 'Sneakers', to: '/men?sub=shoes' },
    ],
  },
  {
    title: 'Accessories',
    links: [
      { label: 'Watches', to: '/men?sub=watches' },
      { label: 'Skincare', to: '/men?sub=skincare' },
    ],
  },
];

const Navbar = ({ onCartOpen }: NavbarProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [activeMegaMenu, setActiveMegaMenu] = useState<'women' | 'men' | null>(null);
  const megaMenuRef = useRef<HTMLDivElement>(null);
  const { totalItems } = useCart();
  const { totalItems: wishlistItems } = useWishlist();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (megaMenuRef.current && !megaMenuRef.current.contains(event.target as Node)) {
        setActiveMegaMenu(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const renderMegaMenu = (menu: MegaMenuContent[]) => (
    <div className="absolute top-full left-0 right-0 bg-background border-b border-border shadow-large animate-slide-down z-50">
      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-3 gap-12">
          {menu.map((section) => (
            <div key={section.title}>
              <h3 className="text-sm font-semibold tracking-wider uppercase text-foreground mb-4">
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.to}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                      onClick={() => setActiveMegaMenu(null)}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
        <nav className="container mx-auto px-6 py-4" ref={megaMenuRef}>
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
              <button
                className={`nav-link flex items-center gap-1 ${activeMegaMenu === 'women' ? 'text-foreground' : ''}`}
                onMouseEnter={() => setActiveMegaMenu('women')}
                onClick={() => setActiveMegaMenu(activeMegaMenu === 'women' ? null : 'women')}
              >
                Women <ChevronDown size={14} className={`transition-transform ${activeMegaMenu === 'women' ? 'rotate-180' : ''}`} />
              </button>
              <button
                className={`nav-link flex items-center gap-1 ${activeMegaMenu === 'men' ? 'text-foreground' : ''}`}
                onMouseEnter={() => setActiveMegaMenu('men')}
                onClick={() => setActiveMegaMenu(activeMegaMenu === 'men' ? null : 'men')}
              >
                Men <ChevronDown size={14} className={`transition-transform ${activeMegaMenu === 'men' ? 'rotate-180' : ''}`} />
              </button>
              <Link to="/watches" className="nav-link flex items-center gap-1">
                <Watch size={14} /> Watches
              </Link>
              <Link to="/shoes" className="nav-link flex items-center gap-1">
                <Footprints size={14} /> Shoes
              </Link>
              <Link to="/skincare" className="nav-link flex items-center gap-1">
                <Sparkles size={14} /> Skincare
              </Link>
              <Link to="/new" className="nav-link">New Arrivals</Link>
              <Link to="/sale" className="nav-link text-accent">Sale</Link>
            </div>

            {/* Logo */}
            <Link to="/" className="font-display text-2xl md:text-3xl font-semibold tracking-tight">
              ÉLAN
            </Link>

            {/* Right Navigation */}
            <div className="flex items-center gap-2 md:gap-4">
              <button
                onClick={() => setIsSearchOpen(true)}
                className="p-2 hover:text-accent transition-colors"
                aria-label="Search"
              >
                <Search size={20} />
              </button>
              <Link to="/wishlist" className="p-2 hover:text-accent transition-colors relative hidden md:flex">
                <Heart size={20} />
                {wishlistItems > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-accent text-accent-foreground rounded-full text-xs flex items-center justify-center font-medium">
                    {wishlistItems}
                  </span>
                )}
              </Link>
              <Link to="/admin" className="p-2 hover:text-accent transition-colors hidden md:block">
                <User size={20} />
              </Link>
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

          {/* Mega Menu */}
          {activeMegaMenu === 'women' && renderMegaMenu(womenMenu)}
          {activeMegaMenu === 'men' && renderMegaMenu(menMenu)}

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="lg:hidden absolute top-full left-0 right-0 bg-background border-b border-border animate-slide-down">
              <div className="flex flex-col py-6 px-6 gap-1">
                <p className="text-xs tracking-widest uppercase text-muted-foreground mb-2 mt-2">Women</p>
                <Link to="/women" className="text-base font-medium py-2 pl-3" onClick={() => setIsMobileMenuOpen(false)}>All Women</Link>
                <Link to="/women?sub=shoes" className="text-base font-medium py-2 pl-3" onClick={() => setIsMobileMenuOpen(false)}>Women's Shoes</Link>
                <Link to="/women?sub=watches" className="text-base font-medium py-2 pl-3" onClick={() => setIsMobileMenuOpen(false)}>Women's Watches</Link>
                <Link to="/women?sub=skincare" className="text-base font-medium py-2 pl-3" onClick={() => setIsMobileMenuOpen(false)}>Women's Skincare</Link>

                <div className="h-px bg-border my-2" />

                <p className="text-xs tracking-widest uppercase text-muted-foreground mb-2 mt-2">Men</p>
                <Link to="/men" className="text-base font-medium py-2 pl-3" onClick={() => setIsMobileMenuOpen(false)}>All Men</Link>
                <Link to="/men?sub=shoes" className="text-base font-medium py-2 pl-3" onClick={() => setIsMobileMenuOpen(false)}>Men's Shoes</Link>
                <Link to="/men?sub=watches" className="text-base font-medium py-2 pl-3" onClick={() => setIsMobileMenuOpen(false)}>Men's Watches</Link>
                <Link to="/men?sub=skincare" className="text-base font-medium py-2 pl-3" onClick={() => setIsMobileMenuOpen(false)}>Men's Skincare</Link>

                <div className="h-px bg-border my-2" />

                <Link to="/watches" className="text-base font-medium py-2 flex items-center gap-2" onClick={() => setIsMobileMenuOpen(false)}>
                  <Watch size={16} /> Watches
                </Link>
                <Link to="/shoes" className="text-base font-medium py-2 flex items-center gap-2" onClick={() => setIsMobileMenuOpen(false)}>
                  <Footprints size={16} /> Shoes
                </Link>
                <Link to="/skincare" className="text-base font-medium py-2 flex items-center gap-2" onClick={() => setIsMobileMenuOpen(false)}>
                  <Sparkles size={16} /> Skincare
                </Link>
                <Link to="/new" className="text-base font-medium py-2" onClick={() => setIsMobileMenuOpen(false)}>New Arrivals</Link>
                <Link to="/sale" className="text-base font-medium py-2 text-accent" onClick={() => setIsMobileMenuOpen(false)}>Sale</Link>

                <div className="h-px bg-border my-2" />

                <div className="flex items-center gap-4 pt-2">
                  <Link to="/wishlist" className="flex items-center gap-2 py-2" onClick={() => setIsMobileMenuOpen(false)}>
                    <Heart size={20} />
                    <span>Wishlist ({wishlistItems})</span>
                  </Link>
                  <Link to="/admin" className="flex items-center gap-2 py-2" onClick={() => setIsMobileMenuOpen(false)}>
                    <User size={20} />
                    <span>Admin</span>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </nav>
      </header>

      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
};

export default Navbar;
