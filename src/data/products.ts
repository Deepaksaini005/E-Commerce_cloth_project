// Women's products - Clothing
import womenSweater from '@/assets/women-sweater.jpg';
import womenDress from '@/assets/women-dress.jpg';
import womenBlazer from '@/assets/women-blazer.jpg';
import womenTrousers from '@/assets/women-trousers.jpg';
import womenBag from '@/assets/women-bag.jpg';
import womenCoat from '@/assets/women-coat.jpg';

// Women's products - Shoes
import womenHeels from '@/assets/women-heels.jpg';
import womenFlats from '@/assets/women-flats.jpg';

// Women's products - Watches
import womenWatch from '@/assets/women-watch.jpg';
import womenWatch2 from '@/assets/women-watch-2.jpg';

// Women's products - Skincare
import womenSkincare from '@/assets/women-skincare.jpg';
import womenSkincare2 from '@/assets/women-skincare-2.jpg';

// Men's products - Clothing
import menSuit from '@/assets/men-suit.jpg';
import menPolo from '@/assets/men-polo.jpg';
import menJacket from '@/assets/men-jacket.jpg';
import menShirt from '@/assets/men-shirt.jpg';
import menChinos from '@/assets/men-chinos.jpg';
import menSweater from '@/assets/men-sweater.jpg';

// Men's products - Shoes
import menShoes from '@/assets/men-shoes.jpg';
import menSneakers from '@/assets/men-sneakers.jpg';

// Men's products - Watches
import menWatch from '@/assets/men-watch.jpg';
import menWatch2 from '@/assets/men-watch-2.jpg';

// Men's products - Skincare
import menSkincare from '@/assets/men-skincare.jpg';
import menSkincare2 from '@/assets/men-skincare-2.jpg';

import { Product } from '@/types/product';

export const products: Product[] = [
  // ===== WOMEN'S PRODUCTS =====
  
  // Women - Clothing
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

  // Women - Shoes
  {
    id: 'ws1',
    name: 'Patent Leather Stilettos',
    price: 385,
    image: womenHeels,
    category: 'women',
    subcategory: 'shoes',
    sizes: ['36', '37', '38', '39', '40', '41'],
    colors: ['Black', 'Red', 'Nude'],
    description: 'Iconic pointed-toe stiletto pumps in glossy patent leather. A timeless statement piece for evening wear.',
    isNew: true,
    rating: 4.8,
    reviews: 198,
  },
  {
    id: 'ws2',
    name: 'Leather Penny Loafers',
    price: 265,
    originalPrice: 320,
    image: womenFlats,
    category: 'women',
    subcategory: 'shoes',
    sizes: ['36', '37', '38', '39', '40', '41'],
    colors: ['Tan', 'Black', 'Burgundy'],
    description: 'Classic penny loafers crafted from supple Italian leather. Perfect for effortless everyday elegance.',
    isSale: true,
    rating: 4.7,
    reviews: 245,
  },

  // Women - Watches
  {
    id: 'ww1',
    name: 'Diamond Pavé Gold Watch',
    price: 1250,
    image: womenWatch,
    category: 'women',
    subcategory: 'watches',
    sizes: ['One Size'],
    colors: ['Gold', 'Rose Gold'],
    description: 'Exquisite gold timepiece adorned with pavé diamonds. Swiss quartz movement with mother-of-pearl dial.',
    isNew: true,
    rating: 4.9,
    reviews: 87,
  },
  {
    id: 'ww2',
    name: 'Silver Bracelet Watch',
    price: 695,
    originalPrice: 850,
    image: womenWatch2,
    category: 'women',
    subcategory: 'watches',
    sizes: ['One Size'],
    colors: ['Silver', 'Rose Gold'],
    description: 'Minimalist silver bracelet watch with a clean white dial. Japanese movement with sapphire crystal.',
    isSale: true,
    rating: 4.8,
    reviews: 134,
  },

  // Women - Skincare
  {
    id: 'wsc1',
    name: 'Hydrating Serum Collection',
    price: 185,
    image: womenSkincare,
    category: 'women',
    subcategory: 'skincare',
    sizes: ['30ml', '50ml'],
    colors: ['Standard'],
    description: 'Luxurious 3-piece skincare set featuring hyaluronic serum, vitamin C booster, and nourishing moisturizer.',
    isNew: true,
    rating: 4.9,
    reviews: 456,
  },
  {
    id: 'wsc2',
    name: 'Premium Anti-Aging Cream',
    price: 225,
    originalPrice: 280,
    image: womenSkincare2,
    category: 'women',
    subcategory: 'skincare',
    sizes: ['30ml', '50ml', '100ml'],
    colors: ['Standard'],
    description: 'Clinically proven anti-aging cream with retinol and botanical extracts. Reduces fine lines visibly in 4 weeks.',
    isSale: true,
    rating: 4.8,
    reviews: 312,
  },

  // ===== MEN'S PRODUCTS =====
  
  // Men - Clothing
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

  // Men - Shoes
  {
    id: 'ms1',
    name: 'Leather Oxford Shoes',
    price: 345,
    image: menShoes,
    category: 'men',
    subcategory: 'shoes',
    sizes: ['40', '41', '42', '43', '44', '45'],
    colors: ['Brown', 'Black', 'Burgundy'],
    description: 'Hand-crafted leather oxford shoes with Goodyear welt construction. A gentleman\'s essential.',
    isNew: true,
    rating: 4.9,
    reviews: 178,
  },
  {
    id: 'ms2',
    name: 'Premium White Sneakers',
    price: 195,
    image: menSneakers,
    category: 'men',
    subcategory: 'shoes',
    sizes: ['40', '41', '42', '43', '44', '45'],
    colors: ['White', 'Off-White', 'Grey'],
    description: 'Minimalist leather sneakers with cushioned insole and Italian calfskin upper.',
    rating: 4.7,
    reviews: 389,
  },

  // Men - Watches
  {
    id: 'mw1',
    name: 'Classic Steel Chronograph',
    price: 895,
    image: menWatch,
    category: 'men',
    subcategory: 'watches',
    sizes: ['One Size'],
    colors: ['Silver', 'Black'],
    description: 'Precision Swiss chronograph with stainless steel bracelet, sapphire crystal, and 100m water resistance.',
    isNew: true,
    rating: 4.9,
    reviews: 156,
  },
  {
    id: 'mw2',
    name: 'Rose Gold Leather Watch',
    price: 1150,
    originalPrice: 1400,
    image: menWatch2,
    category: 'men',
    subcategory: 'watches',
    sizes: ['One Size'],
    colors: ['Rose Gold', 'Gold'],
    description: 'Elegant rose gold chronograph with genuine alligator leather strap. Swiss automatic movement.',
    isSale: true,
    rating: 4.8,
    reviews: 98,
  },

  // Men - Skincare
  {
    id: 'msc1',
    name: 'Premium Skincare Set',
    price: 165,
    image: menSkincare,
    category: 'men',
    subcategory: 'skincare',
    sizes: ['Standard', 'Travel Size'],
    colors: ['Standard'],
    description: 'Complete 4-piece grooming collection: face cream, serum, eye treatment, and moisturizer.',
    isNew: true,
    rating: 4.7,
    reviews: 234,
  },
  {
    id: 'msc2',
    name: 'Daily Face Wash Kit',
    price: 85,
    originalPrice: 110,
    image: menSkincare2,
    category: 'men',
    subcategory: 'skincare',
    sizes: ['200ml', '500ml'],
    colors: ['Standard'],
    description: 'Professional-grade face wash with activated charcoal and salicylic acid. Deep cleansing formula.',
    isSale: true,
    rating: 4.6,
    reviews: 567,
  },
];

export const getProductsByCategory = (category: 'men' | 'women' | 'all') => {
  if (category === 'all') return products;
  return products.filter(p => p.category === category);
};

export const getProductById = (id: string) => {
  return products.find(p => p.id === id);
};

export const getProductsBySubcategory = (subcategory: string) => {
  return products.filter(p => p.subcategory === subcategory);
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
    p.subcategory.toLowerCase().includes(lowerQuery) ||
    p.category.toLowerCase().includes(lowerQuery)
  );
};
