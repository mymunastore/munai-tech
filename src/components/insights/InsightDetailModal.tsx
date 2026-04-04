import { memo } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { ExternalLink } from "lucide-react";
import { format } from "date-fns";
import type { TechInsight } from "@/pages/Insights";
import InsightCategoryIcon from "./InsightCategoryIcon";

interface InsightDetailModalProps {
  insight: TechInsight;
  onClose: () => void;
}

const InsightDetailModal = memo(
  ({ insight, onClose }: InsightDetailModalProps) => {
    return (
      <Dialog open onOpenChange={onClose}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <div className="flex items-center gap-2 mb-2">
              <InsightCategoryIcon category={insight.category} />
              <Badge variant="outline" className="text-xs capitalize">
                {insight.category.replace("_", " ")}
              </Badge>
              {insight.is_featured && (
                <Badge className="bg-accent/10 text-accent text-xs">
                  Featured
                </Badge>
              )}
            </div>
            <DialogTitle className="text-xl leading-tight">
              {insight.title}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              {insight.author_name && (
                <span>By {insight.author_name}</span>
              )}
              {insight.source_name && (
                <span className="font-medium">{insight.source_name}</span>
              )}
              {insight.published_at && (
                <span>
                  {format(new Date(insight.published_at), "MMM d, yyyy")}
                </span>
              )}
            </div>

            <p className="text-muted-foreground leading-relaxed font-medium">
              {insight.summary}
            </p>

            {insight.content && (
              <div className="prose prose-sm dark:prose-invert max-w-none">
                {insight.content.split("\n\n").map((paragraph, i) => (
                  <p key={i} className="text-foreground/80 leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
            )}

            {insight.tags && insight.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-4 border-t border-border">
                {insight.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            )}

            {insight.source_url && (
              <a
                href={insight.source_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-sm text-accent hover:underline"
              >
                Read original article
                <ExternalLink className="h-3 w-3" />
              </a>
            )}
          </div>
        </DialogContent>
      </Dialog>
    );
  }
);

InsightDetailModal.displayName = "InsightDetailModal";
export default InsightDetailModal;
