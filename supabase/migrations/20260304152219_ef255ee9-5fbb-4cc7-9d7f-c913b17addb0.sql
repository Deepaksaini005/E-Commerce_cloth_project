
-- Newsletter subscribers table
CREATE TABLE public.newsletter_subscribers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL UNIQUE,
  subscribed_at timestamp with time zone NOT NULL DEFAULT now(),
  is_active boolean NOT NULL DEFAULT true
);

ALTER TABLE public.newsletter_subscribers ENABLE ROW LEVEL SECURITY;

-- Anyone can subscribe
CREATE POLICY "Anyone can subscribe to newsletter"
ON public.newsletter_subscribers FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- Admins can view all subscribers
CREATE POLICY "Admins can view subscribers"
ON public.newsletter_subscribers FOR SELECT
TO authenticated
USING (public.is_admin(auth.uid()));

-- Admins can manage subscribers
CREATE POLICY "Admins can manage subscribers"
ON public.newsletter_subscribers FOR ALL
TO authenticated
USING (public.is_admin(auth.uid()));

-- Product reviews table
CREATE TABLE public.product_reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id uuid NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  reviewer_name text NOT NULL DEFAULT '',
  rating integer NOT NULL CHECK (rating >= 1 AND rating <= 5),
  title text NOT NULL DEFAULT '',
  comment text NOT NULL DEFAULT '',
  is_verified_purchase boolean NOT NULL DEFAULT false,
  is_approved boolean NOT NULL DEFAULT false,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

ALTER TABLE public.product_reviews ENABLE ROW LEVEL SECURITY;

-- Anyone can view approved reviews
CREATE POLICY "Anyone can view approved reviews"
ON public.product_reviews FOR SELECT
TO anon, authenticated
USING (is_approved = true);

-- Authenticated users can create reviews
CREATE POLICY "Authenticated users can create reviews"
ON public.product_reviews FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

-- Admins can manage all reviews
CREATE POLICY "Admins can manage reviews"
ON public.product_reviews FOR ALL
TO authenticated
USING (public.is_admin(auth.uid()));

-- Contact messages table
CREATE TABLE public.contact_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  subject text NOT NULL DEFAULT '',
  message text NOT NULL,
  is_read boolean NOT NULL DEFAULT false,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

-- Anyone can submit contact messages
CREATE POLICY "Anyone can submit contact messages"
ON public.contact_messages FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- Admins can view and manage messages
CREATE POLICY "Admins can manage contact messages"
ON public.contact_messages FOR ALL
TO authenticated
USING (public.is_admin(auth.uid()));
