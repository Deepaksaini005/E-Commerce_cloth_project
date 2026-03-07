
-- Product variant images (color-specific images)
CREATE TABLE public.product_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID REFERENCES public.products(id) ON DELETE CASCADE NOT NULL,
  color TEXT NOT NULL DEFAULT '',
  image_url TEXT NOT NULL,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.product_images ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view product images" ON public.product_images
  FOR SELECT USING (true);

CREATE POLICY "Admins can manage product images" ON public.product_images
  FOR ALL USING (is_admin(auth.uid()));

-- Group deals table
CREATE TABLE public.group_deals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID REFERENCES public.products(id) ON DELETE CASCADE NOT NULL,
  creator_user_id UUID NOT NULL,
  invite_code TEXT NOT NULL UNIQUE,
  min_members INTEGER NOT NULL DEFAULT 4,
  discount_percent NUMERIC NOT NULL DEFAULT 25,
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  status TEXT NOT NULL DEFAULT 'active',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.group_deals ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view active group deals" ON public.group_deals
  FOR SELECT USING (true);

CREATE POLICY "Authenticated users can create group deals" ON public.group_deals
  FOR INSERT WITH CHECK (auth.uid() = creator_user_id);

CREATE POLICY "Creator can update their deals" ON public.group_deals
  FOR UPDATE USING (auth.uid() = creator_user_id);

-- Group deal members
CREATE TABLE public.group_deal_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  group_deal_id UUID REFERENCES public.group_deals(id) ON DELETE CASCADE NOT NULL,
  user_id UUID NOT NULL,
  joined_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(group_deal_id, user_id)
);

ALTER TABLE public.group_deal_members ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view group deal members" ON public.group_deal_members
  FOR SELECT USING (true);

CREATE POLICY "Authenticated users can join group deals" ON public.group_deal_members
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Sustainability metrics
ALTER TABLE public.products 
  ADD COLUMN IF NOT EXISTS eco_score INTEGER DEFAULT NULL,
  ADD COLUMN IF NOT EXISTS material_type TEXT DEFAULT NULL,
  ADD COLUMN IF NOT EXISTS is_eco_friendly BOOLEAN DEFAULT false;
