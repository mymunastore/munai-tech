-- Add coarse device and browser category columns for privacy-first analytics
ALTER TABLE public.page_views 
ADD COLUMN device_category text,
ADD COLUMN browser_category text;

-- Create index for analytics queries
CREATE INDEX idx_page_views_device_category ON public.page_views(device_category);
CREATE INDEX idx_page_views_browser_category ON public.page_views(browser_category);

-- Update RLS policy to allow inserting new columns
DROP POLICY IF EXISTS "Anyone can log page views" ON public.page_views;

CREATE POLICY "Anyone can log page views" 
ON public.page_views 
FOR INSERT 
WITH CHECK (
  (page_path IS NOT NULL) AND 
  (page_path <> ''::text)
);

-- Comment for documentation
COMMENT ON COLUMN public.page_views.device_category IS 'Coarse device type: mobile, tablet, desktop';
COMMENT ON COLUMN public.page_views.browser_category IS 'Coarse browser family: chrome, firefox, safari, edge, other';