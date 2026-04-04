import { memo } from "react";
import { Star, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { TechInsight } from "@/pages/Insights";
import { formatDistanceToNow } from "date-fns";
import InsightCategoryIcon from "./InsightCategoryIcon";

interface FeaturedInsightsProps {
  insights: TechInsight[];
}

const FeaturedInsights = memo(({ insights }: FeaturedInsightsProps) => {
  if (insights.length === 0) return null;

  return (
    <section className="py-12 bg-gradient-to-b from-background to-muted/20">
      <div className="container px-4">
        <div className="flex items-center gap-2 mb-8">
          <Star className="h-5 w-5 text-accent fill-accent" />
          <h2 className="text-2xl font-bold text-foreground">Featured Stories</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {insights.slice(0, 2).map((insight) => (
            <article
              key={insight.id}
              className="group relative rounded-2xl border border-accent/20 bg-card p-8 hover:border-accent/40 hover:shadow-xl transition-all duration-300 overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-bl-[100px]" />

              <div className="flex items-center gap-2 mb-4">
                <InsightCategoryIcon category={insight.category} />
                <Badge variant="secondary" className="text-xs">
                  {insight.category.replace("_", " ")}
                </Badge>
                <Badge className="bg-accent/10 text-accent text-xs border-accent/20">
                  Featured
                </Badge>
              </div>

              <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-accent transition-colors leading-tight">
                {insight.title}
              </h3>
              <p className="text-muted-foreground mb-4 line-clamp-3 leading-relaxed">
                {insight.summary}
              </p>

              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <div className="flex items-center gap-3">
                  {insight.source_name && (
                    <span className="font-medium">{insight.source_name}</span>
                  )}
                  {insight.curated_at && (
                    <span>
                      {formatDistanceToNow(new Date(insight.curated_at), {
                        addSuffix: true,
                      })}
                    </span>
                  )}
                </div>
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform text-accent" />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
});

FeaturedInsights.displayName = "FeaturedInsights";
export default FeaturedInsights;
