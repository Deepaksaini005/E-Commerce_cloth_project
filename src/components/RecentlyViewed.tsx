import { useRecentlyViewed } from '@/hooks/useRecentlyViewed';
import ProductCard from './ProductCard';
import { Product } from '@/types/product';

const RecentlyViewed = () => {
  const { items } = useRecentlyViewed();

  if (items.length === 0) return null;

  const products: Product[] = items.map(item => ({
    id: item.id,
    name: item.name,
    price: item.price,
    originalPrice: item.originalPrice,
    image: item.image,
    category: item.category as 'men' | 'women',
    subcategory: item.subcategory,
    description: '',
    sizes: item.sizes,
    colors: item.colors,
    isSale: item.isSale,
    isNew: item.isNew,
    inStock: true,
    rating: item.rating,
    reviews: item.reviews,
  }));

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <span className="section-subtitle block mb-3">Your Browsing History</span>
          <h2 className="section-title text-3xl md:text-4xl">Recently Viewed</h2>
        </div>

        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory">
          {products.map(product => (
            <div key={product.id} className="min-w-[220px] md:min-w-[260px] snap-start flex-shrink-0">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RecentlyViewed;
