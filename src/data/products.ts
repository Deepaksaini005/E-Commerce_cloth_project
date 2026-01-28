import product1 from '@/assets/product-1.jpg';
import product2 from '@/assets/product-2.jpg';
import product3 from '@/assets/product-3.jpg';
import product4 from '@/assets/product-4.jpg';
import product5 from '@/assets/product-5.jpg';
import product6 from '@/assets/product-6.jpg';
import { Product } from '@/types/product';

export const products: Product[] = [
  {
    id: '1',
    name: 'Oversized Wool Coat',
    price: 289,
    image: product1,
    category: 'women',
    subcategory: 'outerwear',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Cream', 'Black', 'Camel'],
    description: 'Luxuriously soft oversized wool coat with dropped shoulders and a timeless silhouette.',
    isNew: true,
  },
  {
    id: '2',
    name: 'Linen Blazer',
    price: 195,
    originalPrice: 245,
    image: product2,
    category: 'men',
    subcategory: 'blazers',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Beige', 'Navy', 'Charcoal'],
    description: 'Relaxed fit linen blazer perfect for warm weather occasions.',
    isSale: true,
  },
  {
    id: '3',
    name: 'Merino Turtleneck',
    price: 129,
    image: product3,
    category: 'unisex',
    subcategory: 'knitwear',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Black', 'Ivory', 'Forest Green'],
    description: 'Fine merino wool turtleneck sweater with ribbed trim.',
  },
  {
    id: '4',
    name: 'Silk Blouse',
    price: 165,
    image: product4,
    category: 'women',
    subcategory: 'tops',
    sizes: ['XS', 'S', 'M', 'L'],
    colors: ['White', 'Blush', 'Black'],
    description: 'Elegant silk blouse with mother-of-pearl buttons.',
    isNew: true,
  },
  {
    id: '5',
    name: 'Tailored Trousers',
    price: 145,
    image: product5,
    category: 'men',
    subcategory: 'trousers',
    sizes: ['28', '30', '32', '34', '36', '38'],
    colors: ['Navy', 'Black', 'Charcoal'],
    description: 'Classic tailored wool trousers with a modern slim fit.',
  },
  {
    id: '6',
    name: 'Cashmere Sweater',
    price: 245,
    originalPrice: 295,
    image: product6,
    category: 'unisex',
    subcategory: 'knitwear',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Camel', 'Grey', 'Black'],
    description: 'Pure cashmere crew neck sweater with rolled edges.',
    isSale: true,
  },
];

export const getProductsByCategory = (category: 'men' | 'women' | 'all') => {
  if (category === 'all') return products;
  return products.filter(p => p.category === category || p.category === 'unisex');
};

export const getProductById = (id: string) => {
  return products.find(p => p.id === id);
};
