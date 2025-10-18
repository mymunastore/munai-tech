import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Clock, XCircle } from "lucide-react";

interface StatusBadgeProps {
  status: string;
}

export const StatusBadge = ({ status }: StatusBadgeProps) => {
  const statusConfig: Record<string, { variant: "default" | "secondary" | "destructive" | "outline", icon: typeof CheckCircle2, label: string }> = {
    active: { variant: "default", icon: CheckCircle2, label: "Active" },
    new: { variant: "secondary", icon: Clock, label: "New" },
    unsubscribed: { variant: "destructive", icon: XCircle, label: "Unsubscribed" },
    pending: { variant: "outline", icon: Clock, label: "Pending" },
  };

  const config = statusConfig[status.toLowerCase()] || statusConfig.new;
  const Icon = config.icon;

  return (
    <Badge variant={config.variant} className="flex items-center gap-1 w-fit">
      <Icon className="h-3 w-3" />
      {config.label}
    </Badge>
  );
};
