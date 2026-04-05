import { memo, useState } from "react";
import { Search, RefreshCw } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface InsightsHeroProps {
  searchQuery: string;
  setSearchQuery: (q: string) => void;
}

const InsightsHero = memo(({ searchQuery, setSearchQuery }: InsightsHeroProps) => {
  const { toast } = useToast();
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      const cats = ["ai", "cybersecurity", "tech_leaders", "emerging_trends"];
      let totalCount = 0;
      for (const cat of cats) {
        const { data, error } = await supabase.functions.invoke(
          "curate-tech-insights",
          { body: { category: cat } }
        );
        if (error) throw error;
        totalCount += data.count || 0;
      }
      toast({
        title: "Insights Updated",
        description: `${totalCount} new articles curated across all categories.`,
      });
    } catch (err) {
      console.error("Refresh error:", err);
      toast({
        title: "Refresh Failed",
        description: "Could not fetch new insights. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsRefreshing(false);
    }
  };

  return (
    <section className="pt-24 pb-8 relative overflow-hidden" style={{ background: "var(--gradient-hero)" }}>
      {/* Mesh overlay for depth */}
      <div className="absolute inset-0 opacity-40" style={{ background: "var(--gradient-mesh)" }} />
      
      <div className="container px-4 relative z-10">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">
            Tech Insights & Blog
          </h1>
          <Button
            onClick={handleRefresh}
            disabled={isRefreshing}
            size="sm"
            variant="ghost"
            className="text-muted-foreground hover:text-foreground hover:bg-accent/10"
          >
            <RefreshCw
              className={`mr-2 h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`}
            />
            {isRefreshing ? "Curating..." : "Refresh"}
          </Button>
        </div>

        <div className="relative max-w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search articles, topics, or tags..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-12 h-12 text-base bg-card border-border shadow-lg rounded-lg"
          />
        </div>
      </div>
    </section>
  );
});

InsightsHero.displayName = "InsightsHero";
export default InsightsHero;
