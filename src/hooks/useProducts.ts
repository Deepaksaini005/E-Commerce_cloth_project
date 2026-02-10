import { useState, useEffect, useMemo, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Product } from '@/types/product';
import { resolveProductImage } from '@/lib/productImages';

interface DBProduct {
  id: string;
  name: string;
  price: number;
  original_price: number | null;
  image: string;
  category: string;
  subcategory: string;
  sizes: string[];
  colors: string[];
  description: string;
  is_new: boolean | null;
  is_sale: boolean | null;
  rating: number | null;
  reviews: number | null;
  in_stock: boolean | null;
}

const mapDBProduct = (p: DBProduct): Product => ({
  id: p.id,
  name: p.name,
  price: Number(p.price),
  originalPrice: p.original_price ? Number(p.original_price) : undefined,
  image: resolveProductImage(p.image),
  category: p.category as 'men' | 'women',
  subcategory: p.subcategory,
  sizes: p.sizes || [],
  colors: p.colors || [],
  description: p.description,
  isNew: p.is_new ?? false,
  isSale: p.is_sale ?? false,
  rating: p.rating ? Number(p.rating) : undefined,
  reviews: p.reviews ?? undefined,
});

export const useProducts = (category?: 'men' | 'women' | 'all') => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    let query = supabase.from('products').select('*').order('created_at', { ascending: false });
    if (category && category !== 'all') {
      query = query.eq('category', category);
    }
    const { data } = await query;
    if (data) {
      setProducts((data as DBProduct[]).map(mapDBProduct));
    }
    setLoading(false);
  }, [category]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return { products, loading, refetch: fetchProducts };
};

export const useProduct = (id: string) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      const { data } = await supabase
        .from('products')
        .select('*')
        .eq('id', id)
        .maybeSingle();
      if (data) setProduct(mapDBProduct(data as DBProduct));
      setLoading(false);
    };
    if (id) fetch();
  }, [id]);

  return { product, loading };
};

export const useProductsBySubcategory = (subcategory: string) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      const { data } = await supabase
        .from('products')
        .select('*')
        .eq('subcategory', subcategory)
        .order('created_at', { ascending: false });
      if (data) setProducts((data as DBProduct[]).map(mapDBProduct));
      setLoading(false);
    };
    fetch();
  }, [subcategory]);

  return { products, loading };
};

export const useSaleProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      const { data } = await supabase
        .from('products')
        .select('*')
        .eq('is_sale', true)
        .order('created_at', { ascending: false });
      if (data) setProducts((data as DBProduct[]).map(mapDBProduct));
      setLoading(false);
    };
    fetch();
  }, []);

  return { products, loading };
};

export const useFeaturedProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      const { data } = await supabase
        .from('products')
        .select('*')
        .limit(5)
        .order('rating', { ascending: false });
      if (data) setProducts((data as DBProduct[]).map(mapDBProduct));
      setLoading(false);
    };
    fetch();
  }, []);

  return { products, loading };
};

export const useSearchProducts = (query: string) => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    if (query.length < 2) {
      setProducts([]);
      return;
    }
    const fetch = async () => {
      const { data } = await supabase
        .from('products')
        .select('*')
        .or(`name.ilike.%${query}%,description.ilike.%${query}%,subcategory.ilike.%${query}%,category.ilike.%${query}%`);
      if (data) setProducts((data as DBProduct[]).map(mapDBProduct));
    };
    fetch();
  }, [query]);

  return products;
};
