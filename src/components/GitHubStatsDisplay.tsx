import { useGitHubStats } from "@/hooks/useGitHubData";
import { Star, GitFork, GitCommit, Users } from "lucide-react";
import { Skeleton } from "./ui/skeleton";

const GitHubStatsDisplay = () => {
  const { data: stats, isLoading } = useGitHubStats();

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <Skeleton key={i} className="h-24 rounded-xl" />
        ))}
      </div>
    );
  }

  if (!stats) {
    return null;
  }

  const statItems = [
    {
      icon: Star,
      label: "Total Stars",
      value: stats.total_stars,
      color: "text-yellow-400",
      bgColor: "bg-yellow-500/10",
      borderColor: "border-yellow-400/30",
    },
    {
      icon: GitFork,
      label: "Forks",
      value: stats.total_forks,
      color: "text-cyan-400",
      bgColor: "bg-cyan-500/10",
      borderColor: "border-cyan-400/30",
    },
    {
      icon: GitCommit,
      label: "Recent Commits",
      value: stats.total_commits,
      color: "text-green-400",
      bgColor: "bg-green-500/10",
      borderColor: "border-green-400/30",
    },
    {
      icon: Users,
      label: "Followers",
      value: stats.followers,
      color: "text-purple-400",
      bgColor: "bg-purple-500/10",
      borderColor: "border-purple-400/30",
    },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
      {statItems.map((stat, index) => (
        <div
          key={index}
          className={`group backdrop-blur-sm bg-black/40 rounded-xl p-5 border ${stat.borderColor} hover:${stat.borderColor.replace('/30', '/60')} hover:bg-black/60 transition-all duration-300 cursor-default shadow-[0_0_20px_rgba(34,211,238,0.1)] hover:shadow-[0_0_30px_rgba(34,211,238,0.3)]`}
        >
          <div className="flex items-center gap-3 mb-2">
            <div className={`${stat.bgColor} rounded-lg p-2`}>
              <stat.icon className={`w-4 h-4 ${stat.color}`} />
            </div>
          </div>
          <div className={`text-2xl sm:text-3xl font-bold ${stat.color} mb-1 group-hover:scale-110 transition-transform`}>
            {stat.value.toLocaleString()}
          </div>
          <div className="text-xs text-gray-400 font-medium">{stat.label}</div>
        </div>
      ))}
    </div>
  );
};

export default GitHubStatsDisplay;