import { useGitHubActivity } from "@/hooks/useGitHubData";
import { GitBranch, GitCommit, GitPullRequest, Star, MessageSquare, Code } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { Skeleton } from "./ui/skeleton";

const getEventIcon = (eventType: string) => {
  switch (eventType) {
    case "PushEvent":
      return GitCommit;
    case "CreateEvent":
      return GitBranch;
    case "PullRequestEvent":
      return GitPullRequest;
    case "WatchEvent":
      return Star;
    case "IssueCommentEvent":
      return MessageSquare;
    default:
      return Code;
  }
};

interface GitHubEvent {
  event_type: string;
  repo_name: string;
  payload?: {
    commits?: Array<unknown>;
    ref_type?: string;
  };
}

const getEventDescription = (event: GitHubEvent) => {
  switch (event.event_type) {
    case "PushEvent":
      const commitCount = event.payload?.commits?.length || 0;
      return `Pushed ${commitCount} commit${commitCount !== 1 ? "s" : ""} to ${event.repo_name}`;
    case "CreateEvent":
      return `Created ${event.payload?.ref_type || "repository"} in ${event.repo_name}`;
    case "PullRequestEvent":
      return `${event.action || "opened"} a pull request in ${event.repo_name}`;
    case "WatchEvent":
      return `Starred ${event.repo_name}`;
    case "IssueCommentEvent":
      return `Commented on an issue in ${event.repo_name}`;
    default:
      return `Activity in ${event.repo_name}`;
  }
};

const GitHubActivityFeed = () => {
  const { data: activities, isLoading } = useGitHubActivity(8);

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3, 4].map((i) => (
          <Skeleton key={i} className="h-20 rounded-lg" />
        ))}
      </div>
    );
  }

  if (!activities || activities.length === 0) {
    return (
      <div className="text-center py-8 text-gray-400">
        <Code className="w-12 h-12 mx-auto mb-3 opacity-50" />
        <p>No recent GitHub activity</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {activities.map((activity, index) => {
        const Icon = getEventIcon(activity.event_type);
        const timeAgo = formatDistanceToNow(new Date(activity.created_at_github), {
          addSuffix: true,
        });

        return (
          <a
            key={index}
            href={activity.repo_url || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-start gap-4 p-4 rounded-lg bg-black/40 border border-cyan-500/20 hover:border-cyan-400/40 hover:bg-black/60 transition-all duration-300 group"
          >
            <div className="flex-shrink-0">
              <div className="w-10 h-10 rounded-lg bg-cyan-500/10 flex items-center justify-center border border-cyan-400/30 group-hover:bg-cyan-500/20 transition-colors">
                <Icon className="w-5 h-5 text-cyan-400" />
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-gray-200 font-medium mb-1 group-hover:text-white transition-colors">
                {getEventDescription(activity)}
              </p>
              <p className="text-xs text-gray-400">{timeAgo}</p>
            </div>
          </a>
        );
      })}
    </div>
  );
};

export default GitHubActivityFeed;