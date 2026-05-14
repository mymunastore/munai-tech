-- Revoke EXECUTE from public/anon/authenticated on internal SECURITY DEFINER helpers.
-- Keep has_role() and check_resume_download_rate_limit() executable since they're invoked from RLS policies.
REVOKE EXECUTE ON FUNCTION public.cleanup_rate_limits() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.update_updated_at_column() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.trg_page_views_anonymize_ip() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.anonymize_ip(text) FROM PUBLIC, anon, authenticated;