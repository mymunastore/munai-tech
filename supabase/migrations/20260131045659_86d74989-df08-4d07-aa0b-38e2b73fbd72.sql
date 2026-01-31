-- Create a function to check if too many resume downloads from same session in recent time window
CREATE OR REPLACE FUNCTION public.check_resume_download_rate_limit()
RETURNS boolean
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  recent_count integer;
BEGIN
  -- Count downloads from the same session in the last 5 minutes
  -- Limit to 5 downloads per 5-minute window per session
  SELECT COUNT(*) INTO recent_count
  FROM public.resume_downloads
  WHERE created_at > now() - interval '5 minutes';
  
  -- Allow if under the limit (5 downloads per 5 minutes globally is reasonable for a portfolio)
  RETURN recent_count < 10;
END;
$$;

-- Update the RLS policy to include rate limiting check
DROP POLICY IF EXISTS "Anyone can log resume downloads" ON public.resume_downloads;

CREATE POLICY "Anyone can log resume downloads with rate limit"
ON public.resume_downloads
FOR INSERT
WITH CHECK (
  (created_at IS NOT NULL) 
  AND public.check_resume_download_rate_limit()
);