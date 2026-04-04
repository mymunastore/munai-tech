import { memo } from "react";
import { Brain, Shield, TrendingUp, LayoutGrid, Cloud, Cpu, Rocket } from "lucide-react";
import { Button } from "@/components/ui/button";

const categories = [
  { id: "all", label: "All", icon: LayoutGrid },
  { id: "ai", label: "AI & Machine Learning", icon: Brain },
  { id: "cybersecurity", label: "Cybersecurity", icon: Shield },
  { id: "cloud_computing", label: "Cloud Computing", icon: Cloud },
  { id: "emerging_trends", label: "Future of Work", icon: TrendingUp },
  { id: "tech_leaders", label: "Startup Advice", icon: Rocket },
  { id: "digital_transformation", label: "Digital Transformation", icon: Cpu },
];

interface InsightsFiltersProps {
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
}

const InsightsFilters = memo(
  ({ selectedCategory, setSelectedCategory }: InsightsFiltersProps) => {
    return (
      <section className="py-4 border-b border-border bg-muted/30 sticky top-16 z-30">
        <div className="container px-4">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <Button
                  key={cat.id}
                  variant={isActive ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`whitespace-nowrap rounded-full text-sm px-4 ${
                    isActive
                      ? "bg-primary text-primary-foreground shadow-md"
                      : "bg-background text-foreground border-border hover:bg-accent/10"
                  }`}
                >
                  {cat.label}
                </Button>
              );
            })}
          </div>
        </div>
      </section>
    );
  }
);

InsightsFilters.displayName = "InsightsFilters";
export default InsightsFilters;
