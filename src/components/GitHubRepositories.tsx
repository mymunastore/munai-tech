import { useGitHubRepositories } from "@/hooks/useGitHubData";
import { Star, GitFork, Code, ExternalLink } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Skeleton } from "./ui/skeleton";

interface GitHubRepositoriesProps {
  limit?: number;
  showHeader?: boolean;
}

const GitHubRepositories = ({ limit = 6, showHeader = true }: GitHubRepositoriesProps) => {
  const { data: repos, isLoading } = useGitHubRepositories(limit);

  if (isLoading) {
    return (
      <div className="space-y-4">
        {showHeader && <Skeleton className="h-8 w-64 mb-6" />}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Skeleton key={i} className="h-48 rounded-xl" />
          ))}
        </div>
      </div>
    );
  }

  if (!repos || repos.length === 0) {
    return (
      <div className="text-center py-12">
        <Code className="w-16 h-16 mx-auto mb-4 text-gray-500 opacity-50" />
        <p className="text-gray-400">No repositories found</p>
      </div>
    );
  }

  return (
    <div>
      {showHeader && (
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">
            Top <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Repositories</span>
          </h2>
          <p className="text-gray-400">Most starred projects from my GitHub</p>
        </div>
      )}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {repos.map((repo, index) => (
          <Card
            key={repo.html_url}
            className="group bg-black/40 border-cyan-500/30 hover:border-cyan-400/60 hover:bg-black/60 transition-all duration-300 overflow-hidden"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <CardContent className="p-6">
              {/* Repository Name */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-bold text-white mb-1 group-hover:text-cyan-400 transition-colors truncate">
                    {repo.name}
                  </h3>
                  <p className="text-xs text-gray-400 truncate">{repo.full_name}</p>
                </div>
                <div className="flex-shrink-0 ml-2">
                  <div className="w-10 h-10 rounded-lg bg-cyan-500/10 flex items-center justify-center border border-cyan-400/30">
                    <Code className="w-5 h-5 text-cyan-400" />
                  </div>
                </div>
              </div>

              {/* Description */}
              <p className="text-sm text-gray-300 mb-4 line-clamp-2 min-h-[2.5rem]">
                {repo.description || "No description available"}
              </p>

              {/* Language & Topics */}
              <div className="flex flex-wrap gap-2 mb-4">
                {repo.language && (
                  <span className="px-2 py-1 rounded-full bg-cyan-500/20 border border-cyan-400/30 text-xs text-cyan-400 font-medium">
                    {repo.language}
                  </span>
                )}
                {repo.topics.slice(0, 2).map((topic) => (
                  <span
                    key={topic}
                    className="px-2 py-1 rounded-full bg-gray-500/20 border border-gray-400/30 text-xs text-gray-300"
                  >
                    {topic}
                  </span>
                ))}
              </div>

              {/* Stats */}
              <div className="flex items-center gap-4 mb-4 text-sm text-gray-400">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-400" />
                  <span>{repo.stargazers_count}</span>
                </div>
                <div className="flex items-center gap-1">
                  <GitFork className="w-4 h-4 text-cyan-400" />
                  <span>{repo.forks_count}</span>
                </div>
              </div>

              {/* View Button */}
              <a
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/10 hover:border-cyan-400 group/btn"
                >
                  View Repository
                  <ExternalLink className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                </Button>
              </a>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default GitHubRepositories;