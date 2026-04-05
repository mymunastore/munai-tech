import { memo, useState } from "react";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { TechInsight } from "@/pages/Insights";
import { format } from "date-fns";
import InsightCategoryIcon from "./InsightCategoryIcon";
import InsightDetailModal from "./InsightDetailModal";

interface FeaturedInsightsProps {
  insights: TechInsight[];
}

const FeaturedInsights = memo(({ insights }: FeaturedInsightsProps) => {
  const [selectedInsight, setSelectedInsight] = useState<TechInsight | null>(null);

  if (insights.length === 0) return null;

  const mainFeatured = insights[0];
  const secondaryFeatured = insights.slice(1, 3);

  return (
    <>
      <section className="py-8">
        <div className="container px-4">
          <h2 className="text-2xl font-bold text-foreground mb-6">Featured Articles</h2>

          <div className="grid lg:grid-cols-2 gap-6">
            {/* Main featured article with image overlay */}
            <article
              className="group relative rounded-2xl overflow-hidden cursor-pointer min-h-[320px] lg:min-h-[400px] flex flex-col justify-end border border-border"
              onClick={() => setSelectedInsight(mainFeatured)}
            >
              {/* Background image */}
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                style={{
                  backgroundImage: mainFeatured.image_url
                    ? `url(${mainFeatured.image_url})`
                    : `linear-gradient(135deg, hsl(var(--primary)), hsl(var(--accent)))`,
                }}
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

              <div className="relative z-10 p-6 md:p-8">
                <Badge className="bg-accent/90 text-accent-foreground border-0 mb-3">
                  <InsightCategoryIcon category={mainFeatured.category} size="sm" />
                  <span className="ml-1.5 capitalize">
                    {mainFeatured.category.replace("_", " ")}
                  </span>
                </Badge>

                <h3 className="text-xl md:text-2xl font-bold text-white mb-2 leading-tight group-hover:text-accent transition-colors">
                  {mainFeatured.title}
                </h3>
                <p className="text-white/80 text-sm md:text-base mb-4 line-clamp-2">
                  {mainFeatured.summary}
                </p>

                <div className="flex items-center gap-4 text-white/60 text-sm">
                  {mainFeatured.published_at && (
                    <span className="flex items-center gap-1.5">
                      <Calendar className="h-3.5 w-3.5" />
                      {format(new Date(mainFeatured.published_at), "MMMM d, yyyy")}
                    </span>
                  )}
                  <span className="flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5" />
                    8 min read
                  </span>
                  <ArrowRight className="h-4 w-4 ml-auto group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </article>

            {/* Secondary featured articles */}
            <div className="flex flex-col gap-6">
              {secondaryFeatured.map((insight) => (
                <article
                  key={insight.id}
                  className="group relative rounded-2xl overflow-hidden cursor-pointer min-h-[180px] flex flex-col justify-end border border-border"
                  onClick={() => setSelectedInsight(insight)}
                >
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                    style={{
                      backgroundImage: insight.image_url
                        ? `url(${insight.image_url})`
                        : `linear-gradient(135deg, hsl(var(--primary)), hsl(var(--accent)))`,
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

                  <div className="relative z-10 p-5">
                    <Badge className="bg-accent/90 text-accent-foreground border-0 mb-2 text-xs">
                      <span className="capitalize">
                        {insight.category.replace("_", " ")}
                      </span>
                    </Badge>
                    <h3 className="text-lg font-bold text-white mb-1 leading-tight group-hover:text-accent transition-colors line-clamp-2">
                      {insight.title}
                    </h3>
                    <p className="text-white/70 text-sm line-clamp-1">
                      {insight.summary}
                    </p>
                  </div>
                </article>
              ))}
            </div>
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

FeaturedInsights.displayName = "FeaturedInsights";
export default FeaturedInsights;
