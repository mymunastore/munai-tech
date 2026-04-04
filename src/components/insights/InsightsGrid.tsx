import { memo, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import type { TechInsight } from "@/pages/Insights";
import { formatDistanceToNow } from "date-fns";
import InsightCategoryIcon from "./InsightCategoryIcon";
import InsightDetailModal from "./InsightDetailModal";

interface InsightsGridProps {
  insights: TechInsight[];
}

const InsightsGrid = memo(({ insights }: InsightsGridProps) => {
  const [selectedInsight, setSelectedInsight] = useState<TechInsight | null>(null);

  return (
    <>
      <section className="py-12">
        <div className="container px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {insights.map((insight, index) => (
              <Card
                key={insight.id}
                className="group hover:shadow-lg hover:border-accent/30 transition-all duration-300 cursor-pointer"
                style={{ animationDelay: `${index * 50}ms` }}
                onClick={() => setSelectedInsight(insight)}
              >
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <InsightCategoryIcon category={insight.category} size="sm" />
                    <Badge variant="outline" className="text-xs capitalize">
                      {insight.category.replace("_", " ")}
                    </Badge>
                    {insight.relevance_score && insight.relevance_score >= 85 && (
                      <Badge className="bg-green-500/10 text-green-500 text-xs border-green-500/20 ml-auto">
                        High Impact
                      </Badge>
                    )}
                  </div>

                  <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-accent transition-colors line-clamp-2 leading-snug">
                    {insight.title}
                  </h3>

                  <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                    {insight.summary}
                  </p>

                  {insight.tags && insight.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-4">
                      {insight.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 text-xs rounded-full bg-muted text-muted-foreground"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="flex items-center justify-between text-xs text-muted-foreground pt-3 border-t border-border">
                    <div className="flex items-center gap-2">
                      {insight.source_name && (
                        <span className="font-medium">{insight.source_name}</span>
                      )}
                    </div>
                    <span>
                      {formatDistanceToNow(new Date(insight.curated_at), {
                        addSuffix: true,
                      })}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {selectedInsight && (
        <InsightDetailModal
          insight={selectedInsight}
          onClose={() => setSelectedInsight(null)}
        />
      )}
    </>
  );
});

InsightsGrid.displayName = "InsightsGrid";
export default InsightsGrid;
