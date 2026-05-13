
-- 1. Hide blog_comments author_email from public/anonymous readers
REVOKE SELECT (author_email) ON public.blog_comments FROM anon, authenticated;

-- 2. Drop public listing of project-images storage bucket (public URLs still work)
DROP POLICY IF EXISTS "Public can view project images" ON storage.objects;

-- 3. Harden resume download rate limit: per-IP via request headers, lower cap
CREATE OR REPLACE FUNCTION public.check_resume_download_rate_limit()
RETURNS boolean
LANGUAGE plpgsql
STABLE SECURITY DEFINER
SET search_path TO 'public'
AS $function$
DECLARE
  recent_count integer;
  client_ip text;
BEGIN
  BEGIN
    client_ip := split_part(
      coalesce(
        (current_setting('request.headers', true)::jsonb ->> 'x-forwarded-for'),
        ''
      ),
      ',', 1
    );
  EXCEPTION WHEN others THEN
    client_ip := '';
  END;

  IF client_ip IS NULL OR client_ip = '' THEN
    -- Without an IP we cannot rate-limit safely; deny.
    RETURN false;
  END IF;

  SELECT COUNT(*) INTO recent_count
  FROM public.resume_downloads
  WHERE created_at > now() - interval '5 minutes'
    AND ip_address = client_ip;

  RETURN recent_count < 5;
END;
$function$;
