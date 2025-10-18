-- Create table for GitHub profile stats
CREATE TABLE public.github_stats (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  username TEXT NOT NULL,
  total_repos INTEGER DEFAULT 0,
  total_stars INTEGER DEFAULT 0,
  total_forks INTEGER DEFAULT 0,
  total_commits INTEGER DEFAULT 0,
  followers INTEGER DEFAULT 0,
  following INTEGER DEFAULT 0,
  public_gists INTEGER DEFAULT 0,
  avatar_url TEXT,
  bio TEXT,
  location TEXT,
  company TEXT,
  blog TEXT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create table for GitHub repositories
CREATE TABLE public.github_repositories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  repo_id BIGINT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  full_name TEXT NOT NULL,
  description TEXT,
  html_url TEXT NOT NULL,
  homepage TEXT,
  language TEXT,
  stargazers_count INTEGER DEFAULT 0,
  forks_count INTEGER DEFAULT 0,
  watchers_count INTEGER DEFAULT 0,
  open_issues_count INTEGER DEFAULT 0,
  size INTEGER DEFAULT 0,
  topics TEXT[] DEFAULT '{}',
  created_at_github TIMESTAMP WITH TIME ZONE,
  updated_at_github TIMESTAMP WITH TIME ZONE,
  pushed_at TIMESTAMP WITH TIME ZONE,
  is_fork BOOLEAN DEFAULT false,
  is_private BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create table for GitHub activity/events
CREATE TABLE public.github_activity (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id TEXT UNIQUE NOT NULL,
  event_type TEXT NOT NULL,
  repo_name TEXT,
  repo_url TEXT,
  action TEXT,
  created_at_github TIMESTAMP WITH TIME ZONE NOT NULL,
  payload JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.github_stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.github_repositories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.github_activity ENABLE ROW LEVEL SECURITY;

-- Create policies (public read access)
CREATE POLICY "GitHub stats are viewable by everyone"
  ON public.github_stats FOR SELECT
  USING (true);

CREATE POLICY "GitHub repositories are viewable by everyone"
  ON public.github_repositories FOR SELECT
  USING (true);

CREATE POLICY "GitHub activity is viewable by everyone"
  ON public.github_activity FOR SELECT
  USING (true);

-- Create indexes for better performance
CREATE INDEX idx_github_repos_stars ON public.github_repositories(stargazers_count DESC);
CREATE INDEX idx_github_repos_updated ON public.github_repositories(updated_at_github DESC);
CREATE INDEX idx_github_activity_created ON public.github_activity(created_at_github DESC);

-- Create trigger to update updated_at column
CREATE TRIGGER update_github_stats_updated_at
  BEFORE UPDATE ON public.github_stats
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_github_repositories_updated_at
  BEFORE UPDATE ON public.github_repositories
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();