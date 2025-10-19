import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { ExternalLink, Github } from "lucide-react";
import { Link } from "react-router-dom";
import { Skeleton } from "./ui/skeleton";
import { LazyImage } from "./LazyImage";

interface RelatedProjectsProps {
  currentProjectId: string;
  category: string;
  tags: string[];
}

const RelatedProjects = ({ currentProjectId, category, tags }: RelatedProjectsProps) => {
  const { data: relatedProjects, isLoading } = useQuery({
    queryKey: ["related-projects", currentProjectId, category],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .eq("status", "published")
        .neq("id", currentProjectId)
        .or(`category.eq.${category}`)
        .limit(3);

      if (error) throw error;
      return data;
    },
    staleTime: 1000 * 60 * 15, // 15 minutes - related projects
    gcTime: 1000 * 60 * 30, // 30 minutes
  });

  if (isLoading) {
    return (
      <div className="grid md:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="overflow-hidden">
            <Skeleton className="h-48 w-full" />
            <div className="p-6 space-y-3">
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
            </div>
          </Card>
        ))}
      </div>
    );
  }

  if (!relatedProjects || relatedProjects.length === 0) {
    return null;
  }

  return (
    <section className="py-16 border-t border-border">
      <div className="container px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold mb-8">Related Projects</h2>
        
        <div className="grid md:grid-cols-3 gap-6">
          {relatedProjects.map((project) => (
            <Card key={project.id} className="group overflow-hidden transition-all hover:shadow-xl hover:shadow-primary/5">
              {project.featured_image && (
                <div className="relative h-48 overflow-hidden">
                  <LazyImage
                    src={project.featured_image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                </div>
              )}
              
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="px-3 py-1 text-xs rounded-full bg-primary/10 text-primary border border-primary/20">
                    {project.category}
                  </span>
                  {project.year && (
                    <span className="text-sm text-muted-foreground">{project.year}</span>
                  )}
                </div>
                
                <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                  {project.description}
                </p>
                
                <div className="flex gap-2">
                  <Button size="sm" asChild className="flex-1">
                    <Link to={`/projects/${project.slug}`}>
                      View Details
                    </Link>
                  </Button>
                  {project.live_url && (
                    <Button size="sm" variant="outline" asChild>
                      <a href={project.live_url} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </Button>
                  )}
                  {project.github_url && (
                    <Button size="sm" variant="outline" asChild>
                      <a href={project.github_url} target="_blank" rel="noopener noreferrer">
                        <Github className="w-4 h-4" />
                      </a>
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RelatedProjects;
