import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Trash2 } from 'lucide-react';
import Navbar from '@/components/Navbar';
import CartDrawer from '@/components/CartDrawer';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { useWishlist } from '@/context/WishlistContext';

const WishlistPage = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { items, removeFromWishlist } = useWishlist();

  return (
    <div className="min-h-screen">
      <Navbar onCartOpen={() => setIsCartOpen(true)} />
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

      <main className="pt-24 pb-20">
        <div className="container mx-auto px-6">
          {/* Header */}
          <div className="py-12 text-center">
            <Heart className="mx-auto mb-4 text-accent" size={32} />
            <h1 className="font-display text-4xl md:text-5xl mb-4">My Wishlist</h1>
            <p className="text-muted-foreground">{items.length} items saved</p>
          </div>

          {items.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
              {items.map((product) => (
                <div key={product.id} className="relative group">
                  <ProductCard product={product} />
                  <button
                    onClick={() => removeFromWishlist(product.id)}
                    className="absolute top-4 right-4 p-2 bg-destructive text-destructive-foreground rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-10 hover:bg-destructive/90"
                    aria-label="Remove from wishlist"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <Heart className="mx-auto mb-6 text-muted-foreground" size={48} />
              <h2 className="font-display text-2xl mb-4">Your wishlist is empty</h2>
              <p className="text-muted-foreground mb-8">
                Save items you love by clicking the heart icon
              </p>
              <Link to="/shop" className="btn-primary inline-block">
                Start Shopping
              </Link>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default WishlistPage;
