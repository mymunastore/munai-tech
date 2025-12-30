-- Add explicit restrictive policies for edge_function_rate_limits
-- Only admins can view rate limits (for debugging/monitoring)
CREATE POLICY "Admins can view rate limits"
ON public.edge_function_rate_limits
FOR SELECT
USING (has_role(auth.uid(), 'admin'));

-- No INSERT/UPDATE/DELETE policies for regular users
-- Edge functions use service role which bypasses RLS