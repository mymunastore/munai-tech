-- Add unique constraint on username for github_stats
ALTER TABLE public.github_stats ADD CONSTRAINT github_stats_username_key UNIQUE (username);

-- The other tables already have unique constraints on repo_id and event_id, so they're fine