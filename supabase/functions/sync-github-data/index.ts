import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.75.0";
import { z } from "https://deno.land/x/zod@v3.22.4/mod.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const githubToken = Deno.env.get('GITHUB_TOKEN');
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

    if (!githubToken) {
      throw new Error('GITHUB_TOKEN not configured');
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    // Verify admin authorization
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      return new Response(
        JSON.stringify({ error: 'Authorization required' }),
        { 
          status: 401, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    // Extract user from JWT token
    const token = authHeader.replace('Bearer ', '');
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);
    
    if (authError || !user) {
      return new Response(
        JSON.stringify({ error: 'Invalid authentication' }),
        { 
          status: 401, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    // Check if user has admin role
    const { data: roleData, error: roleError } = await supabase
      .rpc('has_role', { _user_id: user.id, _role: 'admin' });

    if (roleError || !roleData) {
      console.log(`Unauthorized sync attempt by user ${user.id}`);
      return new Response(
        JSON.stringify({ error: 'Admin access required' }),
        { 
          status: 403, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    // Validate GitHub username parameter
    const syncRequestSchema = z.object({
      username: z.string()
        .trim()
        .min(1, "Username required")
        .max(39, "GitHub usernames max 39 chars")
        .regex(/^[a-z\d](?:[a-z\d]|-(?=[a-z\d])){0,38}$/i, "Invalid GitHub username format")
    });

    // Get GitHub username from request or use default
    const requestData = await req.json().catch(() => ({ username: 'mymunastore' }));
    const { username } = syncRequestSchema.parse(requestData);

    // Fetch user profile
    const userResponse = await fetch(`https://api.github.com/users/${username}`, {
      headers: {
        'Authorization': `Bearer ${githubToken}`,
        'Accept': 'application/vnd.github.v3+json',
      },
    });

    if (!userResponse.ok) {
      throw new Error(`GitHub API error: ${userResponse.statusText}`);
    }

    const userData = await userResponse.json();

    // Fetch user repositories
    const reposResponse = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`, {
      headers: {
        'Authorization': `Bearer ${githubToken}`,
        'Accept': 'application/vnd.github.v3+json',
      },
    });

    const reposData = await reposResponse.json() as Array<{
      stargazers_count: number;
      forks_count: number;
    }>;

    // Calculate total stars and forks
    const totalStars = reposData.reduce((sum: number, repo) => sum + repo.stargazers_count, 0);
    const totalForks = reposData.reduce((sum: number, repo) => sum + repo.forks_count, 0);

    // Fetch contribution stats (commits from events)
    const eventsResponse = await fetch(`https://api.github.com/users/${username}/events?per_page=100`, {
      headers: {
        'Authorization': `Bearer ${githubToken}`,
        'Accept': 'application/vnd.github.v3+json',
      },
    });

    const eventsData = await eventsResponse.json() as Array<{
      type: string;
      payload?: {
        commits?: Array<unknown>;
      };
    }>;

    // Count commits from push events
    const totalCommits = eventsData
      .filter((event) => event.type === 'PushEvent')
      .reduce((sum: number, event) => sum + (event.payload?.commits?.length || 0), 0);

    // Upsert GitHub stats
    const { error: statsError } = await supabase
      .from('github_stats')
      .upsert({
        username: userData.login,
        total_repos: userData.public_repos,
        total_stars: totalStars,
        total_forks: totalForks,
        total_commits: totalCommits,
        followers: userData.followers,
        following: userData.following,
        public_gists: userData.public_gists,
        avatar_url: userData.avatar_url,
        bio: userData.bio,
        location: userData.location,
        company: userData.company,
        blog: userData.blog,
        updated_at: new Date().toISOString(),
      }, {
        onConflict: 'username',
      });

    if (statsError) {
      console.error('Error upserting GitHub stats:', statsError);
      throw statsError;
    }

    // Upsert repositories
    for (const repo of reposData) {
      const { error: repoError } = await supabase
        .from('github_repositories')
        .upsert({
          repo_id: repo.id,
          name: repo.name,
          full_name: repo.full_name,
          description: repo.description,
          html_url: repo.html_url,
          homepage: repo.homepage,
          language: repo.language,
          stargazers_count: repo.stargazers_count,
          forks_count: repo.forks_count,
          watchers_count: repo.watchers_count,
          open_issues_count: repo.open_issues_count,
          size: repo.size,
          topics: repo.topics || [],
          created_at_github: repo.created_at,
          updated_at_github: repo.updated_at,
          pushed_at: repo.pushed_at,
          is_fork: repo.fork,
          is_private: repo.private,
          updated_at: new Date().toISOString(),
        }, {
          onConflict: 'repo_id',
        });

      if (repoError) {
        console.error(`Error upserting repo ${repo.name}:`, repoError);
      }
    }

    // Upsert recent activity/events
    for (const event of eventsData.slice(0, 50)) { // Store last 50 events
      const { error: eventError } = await supabase
        .from('github_activity')
        .upsert({
          event_id: event.id,
          event_type: event.type,
          repo_name: event.repo?.name,
          repo_url: `https://github.com/${event.repo?.name}`,
          action: event.payload?.action,
          created_at_github: event.created_at,
          payload: event.payload,
        }, {
          onConflict: 'event_id',
        });

      if (eventError) {
        console.error(`Error upserting event ${event.id}:`, eventError);
      }
    }

    console.log(`Successfully synced GitHub data for ${username}`);

    return new Response(
      JSON.stringify({
        success: true,
        message: `Successfully synced data for ${username}`,
        stats: {
          repos: userData.public_repos,
          stars: totalStars,
          forks: totalForks,
          commits: totalCommits,
          followers: userData.followers,
        },
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );

  } catch (error) {
    console.error('Error in sync-github-data function:', error);
    
    // Handle Zod validation errors specifically
    if (error instanceof z.ZodError) {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Invalid username format',
          details: error.errors.map(e => e.message).join(', ')
        }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 400,
        }
      );
    }
    
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    return new Response(
      JSON.stringify({
        success: false,
        error: errorMessage,
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    );
  }
});