import { Brain, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

const InsightsEmpty = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const handleCurate = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke(
        "curate-tech-insights",
        { body: {} }
      );
      if (error) throw error;
      toast({
        title: "Insights Generated",
        description: `${data.count} articles curated. The page will update automatically.`,
      });
    } catch {
      toast({
        title: "Error",
        description: "Failed to curate insights. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="py-24">
      <div className="container px-4 text-center">
        <Brain className="h-16 w-16 text-muted-foreground/30 mx-auto mb-6" />
        <h2 className="text-2xl font-bold text-foreground mb-3">
          No Insights Yet
        </h2>
        <p className="text-muted-foreground mb-8 max-w-md mx-auto">
          Click below to auto-curate the latest AI and cybersecurity news using
          our AI-powered intelligence engine.
        </p>
        <Button onClick={handleCurate} disabled={isLoading} size="lg">
          <RefreshCw
            className={`mr-2 h-4 w-4 ${isLoading ? "animate-spin" : ""}`}
          />
          {isLoading ? "Curating Insights..." : "Generate First Insights"}
        </Button>
      </div>
    </section>
  );
};

export default InsightsEmpty;
