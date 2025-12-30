-- Drop the overly permissive policy that allows all operations
DROP POLICY IF EXISTS "Service role can manage rate limits" ON public.edge_function_rate_limits;

-- No new policies needed - the service role used by edge functions bypasses RLS,
-- while regular authenticated users will have no access to this table.
-- This prevents manipulation of rate limit records by malicious actors.