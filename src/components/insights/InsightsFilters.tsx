import { memo } from "react";
import { Search, Brain, Shield, Users, TrendingUp, LayoutGrid } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const categories = [
  { id: "all", label: "All", icon: LayoutGrid },
  { id: "ai", label: "AI", icon: Brain },
  { id: "cybersecurity", label: "Cybersecurity", icon: Shield },
  { id: "tech_leaders", label: "Tech Leaders", icon: Users },
  { id: "emerging_trends", label: "Trends", icon: TrendingUp },
];

interface InsightsFiltersProps {
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
}

const InsightsFilters = memo(
  ({
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
  }: InsightsFiltersProps) => {
    return (
      <section className="py-6 border-b border-border bg-background/50 backdrop-blur-sm sticky top-16 z-30">
        <div className="container px-4">
          <div className="flex flex-col md:flex-row items-center gap-4">
            {/* Category pills */}
            <div className="flex items-center gap-2 flex-wrap">
              {categories.map((cat) => {
                const Icon = cat.icon;
                return (
                  <Button
                    key={cat.id}
                    variant={selectedCategory === cat.id ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(cat.id)}
                    className="gap-1.5"
                  >
                    <Icon className="h-3.5 w-3.5" />
                    {cat.label}
                  </Button>
                );
              })}
            </div>

            {/* Search */}
            <div className="relative flex-1 max-w-sm ml-auto">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search insights..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 h-9"
              />
            </div>
          </div>
        </div>
      </section>
    );
  }
);

InsightsFilters.displayName = "InsightsFilters";
export default InsightsFilters;
