import { useState, useEffect, useCallback } from 'react';
import { Product } from '@/types/product';

const STORAGE_KEY = 'elan_recently_viewed';
const MAX_ITEMS = 10;

interface RecentlyViewedItem {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  subcategory: string;
  isSale?: boolean;
  isNew?: boolean;
  rating?: number;
  reviews?: number;
  sizes: string[];
  colors: string[];
  viewedAt: number;
}

export const useRecentlyViewed = () => {
  const [items, setItems] = useState<RecentlyViewedItem[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setItems(JSON.parse(stored));
    } catch {}
  }, []);

  const addProduct = useCallback((product: Product) => {
    setItems(prev => {
      const filtered = prev.filter(i => i.id !== product.id);
      const newItem: RecentlyViewedItem = {
        id: product.id,
        name: product.name,
        price: product.price,
        originalPrice: product.originalPrice,
        image: product.image,
        category: product.category,
        subcategory: product.subcategory,
        isSale: product.isSale,
        isNew: product.isNew,
        rating: product.rating,
        reviews: product.reviews,
        sizes: product.sizes,
        colors: product.colors,
        viewedAt: Date.now(),
      };
      const updated = [newItem, ...filtered].slice(0, MAX_ITEMS);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  const clearAll = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setItems([]);
  }, []);

  return { items, addProduct, clearAll };
};
