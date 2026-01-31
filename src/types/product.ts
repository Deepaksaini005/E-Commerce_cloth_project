export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: 'men' | 'women';
  subcategory: string;
  sizes: string[];
  colors: string[];
  description: string;
  isNew?: boolean;
  isSale?: boolean;
  rating?: number;
  reviews?: number;
}

export interface CartItem extends Product {
  quantity: number;
  selectedSize: string;
  selectedColor: string;
}

export interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product, size: string, color: string) => void;
  removeFromCart: (productId: string, size: string, color: string) => void;
  updateQuantity: (productId: string, size: string, color: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}

export interface WishlistContextType {
  items: Product[];
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  totalItems: number;
}

export type SortOption = 'featured' | 'newest' | 'price-low' | 'price-high' | 'rating';

export interface FilterState {
  subcategory: string | null;
  priceRange: [number, number];
  sizes: string[];
  colors: string[];
  inStock: boolean;
}
