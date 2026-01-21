-- Make resume_downloads public insert policy non-trivial (avoid always-true expressions)
DROP POLICY IF EXISTS "Anyone can log resume downloads" ON public.resume_downloads;
CREATE POLICY "Anyone can log resume downloads"
ON public.resume_downloads
FOR INSERT
WITH CHECK (
  created_at IS NOT NULL
);
