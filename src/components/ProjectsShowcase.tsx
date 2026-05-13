import { memo } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { ArrowRight, Lock } from "lucide-react";
import { Link } from "react-router-dom";
import ScrollReveal from "./ScrollReveal";
import { useAdminCheck } from "@/hooks/useAdminCheck";

const ProjectsShowcase = memo(() => {
  const { isAdmin } = useAdminCheck();
  const { data: projects, isLoading } = useQuery({
    queryKey: ["featured-projects"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .eq("is_featured", true)
        .order("display_order")
        .limit(3);
      
      if (error) throw error;
      return data;
    },
    staleTime: 1000 * 60 * 15, // 15 minutes - featured projects
    gcTime: 1000 * 60 * 30, // 30 minutes
  });

  if (isLoading) {
    return (
      <section className="py-20 bg-muted/30">
        <div className="container px-4">
          <div className="grid md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="animate-pulse">
                <CardContent className="p-6">
                  <div className="h-48 bg-muted rounded-lg mb-4" />
                  <div className="h-6 bg-muted rounded mb-2" />
                  <div className="h-4 bg-muted rounded w-2/3" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="projects" className="py-16 md:py-24 bg-muted/30">
      <div className="container px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-semibold mb-4">
            Selected Systems
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
            Systems & Case Studies
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Showcasing production-grade systems engineered for real business impact
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {projects?.map((project, index) => (
            <ScrollReveal key={project.id} delay={index * 100}>
              <Card className="group hover:shadow-2xl transition-all duration-300 overflow-hidden border-border hover:border-accent/50 hover:-translate-y-2 h-full flex flex-col">
                <div className="relative h-32 overflow-hidden bg-gradient-to-br from-primary/20 via-accent/10 to-primary/5 flex items-center justify-center">
                  <Lock className="h-10 w-10 text-accent/60" />
                </div>

                <CardContent className="p-6 flex-1 flex flex-col">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-semibold">
                      {project.category}
                    </span>
                    {project.year && (
                      <span className="text-xs text-muted-foreground">{project.year}</span>
                    )}
                  </div>

                  <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-accent transition-colors">
                    {project.title}
                  </h3>

                  <p className="text-muted-foreground text-sm mb-4 flex-1 italic">
                    Project details are confidential. Access restricted to authorized parties only.
                  </p>

                  <Link to={`/projects/${project.slug}`}>
                    <Button variant="outline" size="sm" className="w-full group/btn">
                      {isAdmin ? "View Case Study" : "Request Access"}
                      <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </ScrollReveal>
          ))}
        </div>

        <div className="text-center">
          <Link to="/projects">
            <Button size="lg" variant="outline">
              View All Projects
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
});

ProjectsShowcase.displayName = "ProjectsShowcase";

export default ProjectsShowcase;
