
-- Allow admins to update orders (for order status tracking)
CREATE POLICY "Admins can update orders"
ON public.orders
FOR UPDATE
USING (public.is_admin(auth.uid()));

-- Allow admins to delete orders
CREATE POLICY "Admins can delete orders"
ON public.orders
FOR DELETE
USING (public.is_admin(auth.uid()));
