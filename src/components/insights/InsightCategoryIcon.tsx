import { Brain, Shield, Users, TrendingUp } from "lucide-react";

interface InsightCategoryIconProps {
  category: string;
  size?: "sm" | "md";
}

const categoryConfig: Record<string, { icon: typeof Brain; color: string }> = {
  ai: { icon: Brain, color: "text-blue-500" },
  cybersecurity: { icon: Shield, color: "text-red-500" },
  tech_leaders: { icon: Users, color: "text-purple-500" },
  emerging_trends: { icon: TrendingUp, color: "text-green-500" },
};

const InsightCategoryIcon = ({ category, size = "md" }: InsightCategoryIconProps) => {
  const config = categoryConfig[category] || categoryConfig.ai;
  const Icon = config.icon;
  const sizeClass = size === "sm" ? "h-3.5 w-3.5" : "h-4 w-4";

  return <Icon className={`${sizeClass} ${config.color}`} />;
};

export default InsightCategoryIcon;
