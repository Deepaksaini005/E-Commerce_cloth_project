import { useState, useEffect, useRef } from 'react';
import { Search, X, Watch, Footprints, Sparkles, Shirt } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useSearchProducts } from '@/hooks/useProducts';
import { Product } from '@/types/product';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SearchModal = ({ isOpen, onClose }: SearchModalProps) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const results = useSearchProducts(query);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  if (!isOpen) return null;

  const quickCategories = [
    { icon: Shirt, label: 'Clothing', to: '/shop' },
    { icon: Watch, label: 'Watches', to: '/watches' },
    { icon: Footprints, label: 'Shoes', to: '/shoes' },
    { icon: Sparkles, label: 'Skincare', to: '/skincare' },
  ];

  return (
    <div className="fixed inset-0 z-[60] bg-background/95 backdrop-blur-sm animate-fade-in">
      <div className="container mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex-1 max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search products..."
                className="w-full pl-12 pr-4 py-4 text-lg bg-secondary border-none rounded-none focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>
          <button onClick={onClose} className="ml-4 p-2 hover:text-accent transition-colors" aria-label="Close search">
            <X size={24} />
          </button>
        </div>

        {query.length >= 2 && (
          <div className="max-w-4xl mx-auto">
            {results.length > 0 ? (
              <>
                <p className="text-sm text-muted-foreground mb-6">{results.length} results found</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {results.map((product) => (
                    <Link key={product.id} to={`/product/${product.id}`} onClick={onClose} className="group">
                      <div className="aspect-[3/4] overflow-hidden mb-3">
                        <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
                      </div>
                      <h3 className="text-sm font-medium">{product.name}</h3>
                      <p className="text-sm text-muted-foreground">${product.price}</p>
                    </Link>
                  ))}
                </div>
              </>
            ) : (
              <p className="text-center text-muted-foreground py-12">No products found for "{query}"</p>
            )}
          </div>
        )}

        {query.length < 2 && (
          <div className="max-w-2xl mx-auto text-center py-12">
            <p className="text-muted-foreground">Start typing to search products...</p>
            <div className="mt-8 mb-8">
              <p className="text-sm font-medium mb-4">Browse Categories</p>
              <div className="flex flex-wrap justify-center gap-3">
                {quickCategories.map(({ icon: Icon, label, to }) => (
                  <Link key={label} to={to} onClick={onClose}
                    className="flex items-center gap-2 px-5 py-3 bg-secondary text-sm hover:bg-primary hover:text-primary-foreground transition-colors rounded-sm"
                  ><Icon size={16} />{label}</Link>
                ))}
              </div>
            </div>
            <div>
              <p className="text-sm font-medium mb-4">Popular Searches</p>
              <div className="flex flex-wrap justify-center gap-2">
                {['Watch', 'Shoes', 'Blazer', 'Coat', 'Sweater', 'Skincare', 'Dress', 'Jacket'].map((term) => (
                  <button key={term} onClick={() => setQuery(term)}
                    className="px-4 py-2 bg-secondary text-sm hover:bg-primary hover:text-primary-foreground transition-colors"
                  >{term}</button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchModal;
