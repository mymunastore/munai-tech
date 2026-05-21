-- Revoke column-level SELECT on sensitive email columns from public roles
REVOKE SELECT (author_email) ON public.blog_comments FROM anon, authenticated, PUBLIC;
REVOKE SELECT (client_email) ON public.client_testimonials FROM anon, authenticated, PUBLIC;

-- Ensure other columns remain selectable (re-grant explicitly)
GRANT SELECT (id, post_id, author_name, content, is_approved, created_at)
  ON public.blog_comments TO anon, authenticated;

GRANT SELECT (id, client_name, client_title, client_company, project_name, rating, testimonial_text, would_recommend, status, created_at, approved_at)
  ON public.client_testimonials TO anon, authenticated;