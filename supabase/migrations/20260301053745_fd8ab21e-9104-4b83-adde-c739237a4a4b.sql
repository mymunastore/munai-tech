-- Allow public to view approved testimonials
CREATE POLICY "Approved testimonials are viewable by everyone"
ON public.client_testimonials
FOR SELECT
USING (status = 'approved');