import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface GitHubStats {
  username: string;
  total_repos: number;
  total_stars: number;
  total_forks: number;
  total_commits: number;
  followers: number;
  following: number;
  public_gists: number;
  avatar_url: string | null;
  bio: string | null;
  location: string | null;
  company: string | null;
  blog: string | null;
  updated_at: string;
}

export interface GitHubRepository {
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  updated_at_github: string;
  topics: string[];
}

export interface GitHubActivity {
  event_type: string;
  repo_name: string | null;
  repo_url: string | null;
  action: string | null;
  created_at_github: string;
  payload: any;
}

export const useGitHubStats = () => {
  return useQuery({
    queryKey: ["github-stats"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("github_stats")
        .select("*")
        .order("updated_at", { ascending: false })
        .limit(1)
        .maybeSingle();

      if (error) throw error;
      return data as GitHubStats | null;
    },
    staleTime: 1000 * 60 * 30, // 30 minutes
    gcTime: 1000 * 60 * 60, // 1 hour
  });
};

export const useGitHubRepositories = (limit = 10) => {
  return useQuery({
    queryKey: ["github-repositories", limit],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("github_repositories")
        .select("*")
        .order("stargazers_count", { ascending: false })
        .limit(limit);

      if (error) throw error;
      return data as GitHubRepository[];
    },
    staleTime: 1000 * 60 * 30, // 30 minutes
    gcTime: 1000 * 60 * 60, // 1 hour
  });
};

export const useGitHubActivity = (limit = 10) => {
  return useQuery({
    queryKey: ["github-activity", limit],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("github_activity")
        .select("*")
        .order("created_at_github", { ascending: false })
        .limit(limit);

      if (error) throw error;
      return data as GitHubActivity[];
    },
    staleTime: 1000 * 60 * 30, // 30 minutes
    gcTime: 1000 * 60 * 60, // 1 hour
  });
};

// Function to sync GitHub data
export const syncGitHubData = async () => {
  try {
    const { data, error } = await supabase.functions.invoke("sync-github-data", {
      body: { username: "mymunastore" },
    });

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error syncing GitHub data:", error);
    throw error;
  }
};