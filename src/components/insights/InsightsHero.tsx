import { memo } from "react";
import { Brain, Shield, Zap, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

const InsightsHero = memo(() => {
  const { toast } = useToast();
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      const { data, error } = await supabase.functions.invoke(
        "curate-tech-insights",
        { body: {} }
      );
      if (error) throw error;
      toast({
        title: "Insights Updated",
        description: `${data.count} new articles curated across ${data.categories?.length || 0} categories.`,
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
    <section className="pt-32 pb-16 bg-gradient-to-br from-primary via-primary/90 to-primary border-b border-accent/20 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, hsl(var(--accent)) 1px, transparent 1px), 
                             radial-gradient(circle at 75% 75%, hsl(var(--accent)) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="container px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="flex -space-x-2">
              <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center border border-accent/30">
                <Brain className="w-5 h-5 text-accent" />
              </div>
              <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center border border-accent/30">
                <Shield className="w-5 h-5 text-accent" />
              </div>
              <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center border border-accent/30">
                <Zap className="w-5 h-5 text-accent" />
              </div>
            </div>
            <span className="px-3 py-1 rounded-full bg-accent/10 text-accent text-sm font-semibold border border-accent/20">
              AI-Curated
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6">
            Tech{" "}
            <span className="bg-gradient-to-r from-accent via-accent/80 to-accent bg-clip-text text-transparent">
              Insights
            </span>
          </h1>
          <p className="text-lg md:text-xl text-primary-foreground/70 mb-8 max-w-2xl mx-auto">
            AI-powered intelligence feed covering artificial intelligence,
            cybersecurity, and emerging technology — automatically curated and
            updated.
          </p>

          <Button
            onClick={handleRefresh}
            disabled={isRefreshing}
            variant="outline"
            className="border-accent/30 text-accent hover:bg-accent/10"
          >
            <RefreshCw
              className={`mr-2 h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`}
            />
            {isRefreshing ? "Curating Latest News..." : "Refresh Insights"}
          </Button>
        </div>
      </div>
    </section>
  );
});

InsightsHero.displayName = "InsightsHero";
export default InsightsHero;
