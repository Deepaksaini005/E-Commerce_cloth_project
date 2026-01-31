// Women's products
import womenSweater from '@/assets/women-sweater.jpg';
import womenDress from '@/assets/women-dress.jpg';
import womenBlazer from '@/assets/women-blazer.jpg';
import womenTrousers from '@/assets/women-trousers.jpg';
import womenBag from '@/assets/women-bag.jpg';
import womenCoat from '@/assets/women-coat.jpg';

// Men's products
import menSuit from '@/assets/men-suit.jpg';
import menPolo from '@/assets/men-polo.jpg';
import menJacket from '@/assets/men-jacket.jpg';
import menShirt from '@/assets/men-shirt.jpg';
import menChinos from '@/assets/men-chinos.jpg';
import menSweater from '@/assets/men-sweater.jpg';

import { Product } from '@/types/product';

export const products: Product[] = [
  // Women's Products
  {
    id: 'w1',
    name: 'Cashmere Ribbed Sweater',
    price: 245,
    image: womenSweater,
    category: 'women',
    subcategory: 'knitwear',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Cream', 'Blush', 'Grey'],
    description: 'Luxuriously soft cashmere sweater with elegant ribbed texture. Perfect for layering or wearing alone.',
    isNew: true,
    rating: 4.8,
    reviews: 124,
  },
  {
    id: 'w2',
    name: 'Silk Evening Dress',
    price: 495,
    originalPrice: 650,
    image: womenDress,
    category: 'women',
    subcategory: 'dresses',
    sizes: ['XS', 'S', 'M', 'L'],
    colors: ['Black', 'Burgundy', 'Navy'],
    description: 'Stunning floor-length silk dress with a flattering V-neckline and elegant draping.',
    isSale: true,
    rating: 4.9,
    reviews: 89,
  },
  {
    id: 'w3',
    name: 'Tailored White Blazer',
    price: 295,
    image: womenBlazer,
    category: 'women',
    subcategory: 'blazers',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['White', 'Cream', 'Black'],
    description: 'Impeccably tailored double-breasted blazer in crisp white. A wardrobe essential.',
    isNew: true,
    rating: 4.7,
    reviews: 156,
  },
  {
    id: 'w4',
    name: 'High-Waist Trousers',
    price: 185,
    image: womenTrousers,
    category: 'women',
    subcategory: 'trousers',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Cream', 'Black', 'Navy'],
    description: 'Elegant high-waisted trousers with a wide leg silhouette and bow detail.',
    rating: 4.6,
    reviews: 203,
  },
  {
    id: 'w5',
    name: 'Leather Handbag',
    price: 425,
    originalPrice: 525,
    image: womenBag,
    category: 'women',
    subcategory: 'accessories',
    sizes: ['One Size'],
    colors: ['Navy', 'Black', 'Tan'],
    description: 'Premium Italian leather handbag with gold hardware and removable shoulder strap.',
    isSale: true,
    rating: 4.9,
    reviews: 312,
  },
  {
    id: 'w6',
    name: 'Wool Overcoat',
    price: 445,
    image: womenCoat,
    category: 'women',
    subcategory: 'outerwear',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Camel', 'Black', 'Grey'],
    description: 'Timeless double-breasted wool coat with a relaxed fit and sophisticated silhouette.',
    isNew: true,
    rating: 4.8,
    reviews: 178,
  },
  
  // Men's Products
  {
    id: 'm1',
    name: 'Wool Suit Jacket',
    price: 595,
    image: menSuit,
    category: 'men',
    subcategory: 'blazers',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Charcoal', 'Navy', 'Black'],
    description: 'Expertly crafted wool suit jacket with half-canvas construction and premium finishing.',
    isNew: true,
    rating: 4.9,
    reviews: 267,
  },
  {
    id: 'm2',
    name: 'Premium Polo Shirt',
    price: 95,
    image: menPolo,
    category: 'men',
    subcategory: 'tops',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Navy', 'White', 'Black'],
    description: 'Classic polo shirt in premium piqué cotton with mother-of-pearl buttons.',
    rating: 4.7,
    reviews: 445,
  },
  {
    id: 'm3',
    name: 'Leather Biker Jacket',
    price: 695,
    originalPrice: 850,
    image: menJacket,
    category: 'men',
    subcategory: 'outerwear',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Brown', 'Black'],
    description: 'Iconic leather biker jacket crafted from premium full-grain leather with asymmetric zip.',
    isSale: true,
    rating: 4.8,
    reviews: 189,
  },
  {
    id: 'm4',
    name: 'Oxford Dress Shirt',
    price: 125,
    image: menShirt,
    category: 'men',
    subcategory: 'tops',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['White', 'Light Blue', 'Pink'],
    description: 'Essential oxford shirt in crisp cotton with button-down collar and slim fit.',
    isNew: true,
    rating: 4.6,
    reviews: 534,
  },
  {
    id: 'm5',
    name: 'Slim Fit Chinos',
    price: 145,
    image: menChinos,
    category: 'men',
    subcategory: 'trousers',
    sizes: ['28', '30', '32', '34', '36', '38'],
    colors: ['Black', 'Navy', 'Khaki'],
    description: 'Modern slim-fit chinos in stretch cotton twill for all-day comfort.',
    rating: 4.5,
    reviews: 623,
  },
  {
    id: 'm6',
    name: 'Cashmere Crew Sweater',
    price: 295,
    originalPrice: 375,
    image: menSweater,
    category: 'men',
    subcategory: 'knitwear',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Camel', 'Grey', 'Navy'],
    description: 'Luxuriously soft pure cashmere sweater with ribbed crew neck and cuffs.',
    isSale: true,
    rating: 4.9,
    reviews: 287,
  },
];

export const getProductsByCategory = (category: 'men' | 'women' | 'all') => {
  if (category === 'all') return products;
  return products.filter(p => p.category === category);
};

export const getProductById = (id: string) => {
  return products.find(p => p.id === id);
};

export const getSubcategories = (category: 'men' | 'women' | 'all') => {
  const filteredProducts = category === 'all' ? products : products.filter(p => p.category === category);
  const subcategories = [...new Set(filteredProducts.map(p => p.subcategory))];
  return subcategories;
};

export const searchProducts = (query: string) => {
  const lowerQuery = query.toLowerCase();
  return products.filter(p => 
    p.name.toLowerCase().includes(lowerQuery) ||
    p.description.toLowerCase().includes(lowerQuery) ||
    p.subcategory.toLowerCase().includes(lowerQuery)
  );
};
