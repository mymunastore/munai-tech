-- Restrict realtime broadcast for client_testimonials to non-sensitive columns
ALTER PUBLICATION supabase_realtime DROP TABLE public.client_testimonials;
ALTER PUBLICATION supabase_realtime ADD TABLE public.client_testimonials
  (id, client_name, client_title, client_company, project_name, rating,
   testimonial_text, would_recommend, status, created_at, approved_at);

-- Re-assert that anonymous/authenticated roles cannot read sensitive email columns
REVOKE SELECT (client_email) ON public.client_testimonials FROM anon, authenticated;
REVOKE SELECT (author_email) ON public.blog_comments FROM anon, authenticated;