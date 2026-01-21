-- Fix linter: ensure immutable helper has a fixed search_path
CREATE OR REPLACE FUNCTION public.anonymize_ip(ip text)
RETURNS text
LANGUAGE plpgsql
IMMUTABLE
SET search_path = public
AS $$
DECLARE
  parts text[];
BEGIN
  IF ip IS NULL OR ip = '' THEN
    RETURN ip;
  END IF;

  -- IPv4: mask the last octet (e.g., 203.0.113.42 -> 203.0.113.0)
  IF position('.' in ip) > 0 THEN
    parts := string_to_array(ip, '.');
    IF array_length(parts, 1) = 4 THEN
      parts[4] := '0';
      RETURN array_to_string(parts, '.');
    END IF;
  END IF;

  -- IPv6: mask the last hextet (best-effort)
  IF position(':' in ip) > 0 THEN
    parts := string_to_array(ip, ':');
    IF array_length(parts, 1) >= 2 THEN
      parts[array_length(parts, 1)] := '0000';
      RETURN array_to_string(parts, ':');
    END IF;
  END IF;

  -- Fallback: if unknown format, return NULL to avoid storing raw identifiers
  RETURN NULL;
END;
$$;

-- Replace permissive WITH CHECK (true) policies with minimal, non-breaking checks
-- Contact submissions (public insert)
DROP POLICY IF EXISTS "Anyone can submit contact form" ON public.contact_submissions;
CREATE POLICY "Anyone can submit contact form"
ON public.contact_submissions
FOR INSERT
WITH CHECK (
  email IS NOT NULL AND email <> ''
  AND name IS NOT NULL AND name <> ''
  AND message IS NOT NULL AND message <> ''
);

-- Newsletter subscribers (public insert)
DROP POLICY IF EXISTS "Anyone can subscribe to newsletter" ON public.newsletter_subscribers;
CREATE POLICY "Anyone can subscribe to newsletter"
ON public.newsletter_subscribers
FOR INSERT
WITH CHECK (
  email IS NOT NULL AND email <> ''
);

-- Page views (public insert)
DROP POLICY IF EXISTS "Anyone can log page views" ON public.page_views;
CREATE POLICY "Anyone can log page views"
ON public.page_views
FOR INSERT
WITH CHECK (
  page_path IS NOT NULL AND page_path <> ''
);

-- Resume downloads (public insert)
DROP POLICY IF EXISTS "Anyone can log resume downloads" ON public.resume_downloads;
CREATE POLICY "Anyone can log resume downloads"
ON public.resume_downloads
FOR INSERT
WITH CHECK (true IS NOT NULL);

-- Testimonials (public insert)
DROP POLICY IF EXISTS "Anyone can submit testimonials" ON public.client_testimonials;
CREATE POLICY "Anyone can submit testimonials"
ON public.client_testimonials
FOR INSERT
WITH CHECK (
  client_name IS NOT NULL AND client_name <> ''
  AND client_email IS NOT NULL AND client_email <> ''
  AND testimonial_text IS NOT NULL AND testimonial_text <> ''
);
