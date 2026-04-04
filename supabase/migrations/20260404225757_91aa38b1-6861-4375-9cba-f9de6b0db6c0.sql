
-- Create tech_insights table
CREATE TABLE public.tech_insights (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  summary TEXT NOT NULL,
  content TEXT,
  source_url TEXT,
  source_name TEXT,
  category TEXT NOT NULL DEFAULT 'ai',
  image_url TEXT,
  published_at TIMESTAMP WITH TIME ZONE,
  curated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  is_featured BOOLEAN DEFAULT false,
  is_published BOOLEAN DEFAULT true,
  relevance_score INTEGER DEFAULT 0,
  tags TEXT[],
  author_name TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.tech_insights ENABLE ROW LEVEL SECURITY;

-- Public read access for published insights
CREATE POLICY "Anyone can view published insights"
ON public.tech_insights
FOR SELECT
USING (is_published = true);

-- Admin insert
CREATE POLICY "Admins can create insights"
ON public.tech_insights
FOR INSERT
TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Admin update
CREATE POLICY "Admins can update insights"
ON public.tech_insights
FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Admin delete
CREATE POLICY "Admins can delete insights"
ON public.tech_insights
FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Auto-update timestamp
CREATE TRIGGER update_tech_insights_updated_at
BEFORE UPDATE ON public.tech_insights
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Index for category filtering and ordering
CREATE INDEX idx_tech_insights_category ON public.tech_insights (category);
CREATE INDEX idx_tech_insights_curated_at ON public.tech_insights (curated_at DESC);
CREATE INDEX idx_tech_insights_published ON public.tech_insights (is_published);

-- Enable realtime
ALTER PUBLICATION supabase_realtime ADD TABLE public.tech_insights;
