
-- Create products table
CREATE TABLE public.products (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  price NUMERIC NOT NULL DEFAULT 0,
  original_price NUMERIC,
  image TEXT NOT NULL DEFAULT '',
  category TEXT NOT NULL CHECK (category IN ('men', 'women')),
  subcategory TEXT NOT NULL DEFAULT '',
  sizes TEXT[] NOT NULL DEFAULT '{}',
  colors TEXT[] NOT NULL DEFAULT '{}',
  description TEXT NOT NULL DEFAULT '',
  is_new BOOLEAN DEFAULT false,
  is_sale BOOLEAN DEFAULT false,
  rating NUMERIC DEFAULT 0,
  reviews INTEGER DEFAULT 0,
  in_stock BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

-- Public can read all products
CREATE POLICY "Anyone can view products"
ON public.products FOR SELECT
USING (true);

-- Only admins can insert products
CREATE POLICY "Admins can insert products"
ON public.products FOR INSERT
WITH CHECK (public.is_admin(auth.uid()));

-- Only admins can update products
CREATE POLICY "Admins can update products"
ON public.products FOR UPDATE
USING (public.is_admin(auth.uid()));

-- Only admins can delete products
CREATE POLICY "Admins can delete products"
ON public.products FOR DELETE
USING (public.is_admin(auth.uid()));

-- Add updated_at trigger
CREATE TRIGGER update_products_updated_at
BEFORE UPDATE ON public.products
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();
