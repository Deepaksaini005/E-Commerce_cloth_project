import { useState, useMemo, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Heart, Star, Truck, RotateCcw, Shield, Minus, Plus } from 'lucide-react';
import Navbar from '@/components/Navbar';
import CartDrawer from '@/components/CartDrawer';
import Footer from '@/components/Footer';
import { useProduct, useProducts } from '@/hooks/useProducts';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { useRecentlyViewed } from '@/hooks/useRecentlyViewed';
import { toast } from 'sonner';
import ProductCard from '@/components/ProductCard';
import RecentlyViewed from '@/components/RecentlyViewed';
import ProductColorImages from '@/components/ProductColorImages';
import GroupDeal from '@/components/GroupDeal';
import EcoScore from '@/components/EcoScore';

const sizeGuide = {
  women: {
    headers: ['Size', 'Bust', 'Waist', 'Hips'],
    rows: [
      ['XS', '32"', '24"', '34"'],
      ['S', '34"', '26"', '36"'],
      ['M', '36"', '28"', '38"'],
      ['L', '38"', '30"', '40"'],
      ['XL', '40"', '32"', '42"'],
    ],
  },
  men: {
    headers: ['Size', 'Chest', 'Waist', 'Length'],
    rows: [
      ['S', '36"', '30"', '28"'],
      ['M', '38"', '32"', '29"'],
      ['L', '40"', '34"', '30"'],
      ['XL', '42"', '36"', '31"'],
      ['XXL', '44"', '38"', '32"'],
    ],
  },
};

const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [quantity, setQuantity] = useState(1);
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  const [activeTab, setActiveTab] = useState<'description' | 'details' | 'shipping'>('description');

  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { addProduct: trackView } = useRecentlyViewed();

  const { product, loading } = useProduct(id || '');
  const { products: allProducts } = useProducts(product?.category);
  const inWishlist = product ? isInWishlist(product.id) : false;

  // Track product view
  useEffect(() => {
    if (product) trackView(product);
  }, [product?.id]);

  const relatedProducts = useMemo(() => {
    if (!product) return [];
    // First try same subcategory, then fall back to same category
    const sameSubcategory = allProducts
      .filter(p => p.subcategory === product.subcategory && p.id !== product.id);
    if (sameSubcategory.length >= 4) return sameSubcategory.slice(0, 4);
    // Fill remaining with same category
    const remaining = allProducts
      .filter(p => p.id !== product.id && !sameSubcategory.find(s => s.id === p.id))
      .slice(0, 4 - sameSubcategory.length);
    return [...sameSubcategory, ...remaining].slice(0, 4);
  }, [product, allProducts]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-display mb-4">Product not found</h1>
          <button onClick={() => navigate('/shop')} className="btn-primary">
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (!selectedSize) { toast.error('Please select a size'); return; }
    if (!selectedColor) { toast.error('Please select a color'); return; }
    for (let i = 0; i < quantity; i++) {
      addToCart(product, selectedSize, selectedColor);
    }
    toast.success(`${product.name} added to bag`, {
      description: `Size: ${selectedSize}, Color: ${selectedColor}, Qty: ${quantity}`,
    });
  };

  const handleWishlistToggle = () => {
    if (inWishlist) {
      removeFromWishlist(product.id);
      toast.info(`${product.name} removed from wishlist`);
    } else {
      addToWishlist(product);
      toast.success(`${product.name} added to wishlist`);
    }
  };

  const currentSizeGuide = sizeGuide[product.category];

  return (
    <div className="min-h-screen">
      <Navbar onCartOpen={() => setIsCartOpen(true)} />
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

      <main className="pt-24 pb-20">
        <div className="container mx-auto px-6">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
            <button onClick={() => navigate('/')} className="hover:text-foreground">Home</button>
            <span>/</span>
            <button onClick={() => navigate(`/${product.category}`)} className="hover:text-foreground capitalize">
              {product.category}
            </button>
            <span>/</span>
            <span className="text-foreground">{product.name}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Product Images with Color Variants */}
            <ProductColorImages
              productId={product.id}
              mainImage={product.image}
              colors={product.colors}
              selectedColor={selectedColor}
              onColorSelect={setSelectedColor}
              productName={product.name}
            />

            <div className="lg:sticky lg:top-32 lg:self-start">
              <div className="mb-4">
                <span className="text-sm text-muted-foreground uppercase tracking-wider">{product.subcategory}</span>
              </div>
              <h1 className="font-display text-3xl md:text-4xl mb-4">{product.name}</h1>

              {/* Eco Score */}
              {(product as any).eco_score && (
                <div className="mb-4">
                  <EcoScore score={(product as any).eco_score} showLabel size="md" />
                </div>
              )}

              {product.rating && (
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={16} className={i < Math.floor(product.rating!) ? 'fill-primary text-primary' : 'text-muted-foreground'} />
                    ))}
                  </div>
                  <span className="text-sm">{product.rating}</span>
                  <span className="text-sm text-muted-foreground">({product.reviews} reviews)</span>
                </div>
              )}

              <div className="flex items-center gap-3 mb-8">
                {product.originalPrice && (
                  <span className="text-xl text-muted-foreground line-through">${product.originalPrice}</span>
                )}
                <span className={`text-2xl font-medium ${product.isSale ? 'text-accent' : ''}`}>${product.price}</span>
                {product.isSale && product.originalPrice && (
                  <span className="bg-accent/10 text-accent px-2 py-1 text-sm">Save ${product.originalPrice - product.price}</span>
                )}
              </div>

              {/* Size Selection */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium">Size: {selectedSize}</span>
                  <button onClick={() => setShowSizeGuide(!showSizeGuide)} className="text-sm text-accent hover:underline">Size Guide</button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button key={size} onClick={() => setSelectedSize(size)}
                      className={`min-w-[48px] px-4 py-2 border text-sm transition-colors rounded-md ${selectedSize === size ? 'border-primary bg-primary text-primary-foreground' : 'border-border hover:border-primary'}`}
                    >{size}</button>
                  ))}
                </div>
              </div>

              {showSizeGuide && (
                <div className="mb-6 p-4 bg-secondary rounded-lg">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-medium">Size Guide</h3>
                    <button onClick={() => setShowSizeGuide(false)} className="text-muted-foreground hover:text-foreground">×</button>
                  </div>
                  <table className="w-full text-sm">
                    <thead><tr className="border-b border-border">{currentSizeGuide.headers.map(h => <th key={h} className="py-2 text-left font-medium">{h}</th>)}</tr></thead>
                    <tbody>{currentSizeGuide.rows.map((row, i) => <tr key={i} className="border-b border-border/50">{row.map((cell, j) => <td key={j} className="py-2">{cell}</td>)}</tr>)}</tbody>
                  </table>
                </div>
              )}

              <div className="mb-8">
                <span className="text-sm font-medium block mb-3">Quantity</span>
                <div className="flex items-center gap-4 w-fit border border-border">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-3 hover:bg-secondary transition-colors" disabled={quantity <= 1}><Minus size={16} /></button>
                  <span className="w-8 text-center">{quantity}</span>
                  <button onClick={() => setQuantity(quantity + 1)} className="p-3 hover:bg-secondary transition-colors"><Plus size={16} /></button>
                </div>
              </div>

              <div className="flex flex-col gap-3 mb-8">
                <div className="flex gap-3">
                  <button onClick={handleAddToCart} className="flex-1 btn-primary py-4">Add to Bag — ${(product.price * quantity).toFixed(0)}</button>
                  <button onClick={handleWishlistToggle}
                    className={`p-4 border transition-colors ${inWishlist ? 'border-accent bg-accent/10 text-accent' : 'border-border hover:border-primary'}`}
                    aria-label={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
                  ><Heart size={20} className={inWishlist ? 'fill-current' : ''} /></button>
                </div>
                <button onClick={() => {
                  if (!selectedSize) { toast.error('Please select a size'); return; }
                  if (!selectedColor) { toast.error('Please select a color'); return; }
                  for (let i = 0; i < quantity; i++) { addToCart(product, selectedSize, selectedColor); }
                  navigate('/checkout');
                }} className="w-full btn-accent py-4">Buy Now</button>
              </div>

              <div className="grid grid-cols-3 gap-4 py-6 border-t border-b border-border">
                <div className="text-center"><Truck size={20} className="mx-auto mb-2 text-muted-foreground" /><span className="text-xs text-muted-foreground">Free Shipping</span></div>
                <div className="text-center"><RotateCcw size={20} className="mx-auto mb-2 text-muted-foreground" /><span className="text-xs text-muted-foreground">Easy Returns</span></div>
                <div className="text-center"><Shield size={20} className="mx-auto mb-2 text-muted-foreground" /><span className="text-xs text-muted-foreground">Secure Checkout</span></div>
              </div>

              {/* Group Deal */}
              <div className="mt-6">
                <GroupDeal productId={product.id} productName={product.name} productPrice={product.price} />
              </div>

              <div className="mt-8">
                <div className="flex gap-6 border-b border-border">
                  {(['description', 'details', 'shipping'] as const).map((tab) => (
                    <button key={tab} onClick={() => setActiveTab(tab)}
                      className={`pb-3 text-sm capitalize transition-colors ${activeTab === tab ? 'border-b-2 border-primary text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
                    >{tab}</button>
                  ))}
                </div>
                <div className="py-6">
                  {activeTab === 'description' && <p className="text-muted-foreground leading-relaxed">{product.description}</p>}
                  {activeTab === 'details' && (
                    <ul className="text-muted-foreground space-y-2 text-sm">
                      <li>• Premium quality materials</li><li>• Made in Italy</li><li>• Dry clean recommended</li><li>• Model wears size M</li>
                    </ul>
                  )}
                  {activeTab === 'shipping' && (
                    <div className="text-muted-foreground text-sm space-y-3">
                      <p>Free standard shipping on orders over $200.</p><p>Express shipping available at checkout.</p><p>International shipping to select countries.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {relatedProducts.length > 0 && (
            <section className="mt-20">
              <div className="flex items-center gap-3 mb-8">
                <span className="w-8 h-px bg-accent/40" />
                <h2 className="font-display text-2xl">Similar Products</h2>
                <span className="w-8 h-px bg-accent/40" />
              </div>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                {relatedProducts.map((p) => <ProductCard key={p.id} product={p} />)}
              </div>
            </section>
          )}

          <RecentlyViewed />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProductDetailPage;
