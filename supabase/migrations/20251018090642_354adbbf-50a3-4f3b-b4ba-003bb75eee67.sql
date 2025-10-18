-- Fix missing admin DELETE and UPDATE policies for contact_submissions
CREATE POLICY "Admins can update contact submissions"
ON public.contact_submissions
FOR UPDATE
USING (public.has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete contact submissions"
ON public.contact_submissions
FOR DELETE
USING (public.has_role(auth.uid(), 'admin'::app_role));

-- Fix missing admin DELETE and UPDATE policies for newsletter_subscribers
CREATE POLICY "Admins can update newsletter subscribers"
ON public.newsletter_subscribers
FOR UPDATE
USING (public.has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete newsletter subscribers"
ON public.newsletter_subscribers
FOR DELETE
USING (public.has_role(auth.uid(), 'admin'::app_role));

-- Create table for persistent rate limiting
CREATE TABLE public.edge_function_rate_limits (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  ip_address text NOT NULL,
  function_name text NOT NULL,
  request_count integer DEFAULT 1,
  window_start timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now()
);

-- Enable RLS on rate limits table
ALTER TABLE public.edge_function_rate_limits ENABLE ROW LEVEL SECURITY;

-- Create index for efficient rate limit lookups
CREATE INDEX idx_rate_limits_lookup ON public.edge_function_rate_limits(ip_address, function_name, window_start);

-- Policy: Allow edge functions to manage rate limits (they run as service role)
CREATE POLICY "Service role can manage rate limits"
ON public.edge_function_rate_limits
FOR ALL
USING (true)
WITH CHECK (true);

-- Cleanup function for expired rate limit entries
CREATE OR REPLACE FUNCTION public.cleanup_rate_limits()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  DELETE FROM public.edge_function_rate_limits
  WHERE window_start < now() - interval '1 hour';
END;
$$;