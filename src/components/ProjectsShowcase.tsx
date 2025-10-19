import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { ArrowRight, ExternalLink, Github } from "lucide-react";
import { Link } from "react-router-dom";
import ScrollReveal from "./ScrollReveal";
import { LazyImage } from "./LazyImage";

const ProjectsShowcase = () => {
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
    <section id="projects" className="py-20 md:py-32 bg-muted/30">
      <div className="container px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-semibold mb-4">
            Featured Work
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
            Recent Projects
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Showcasing innovative solutions that drive real business results
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {projects?.map((project, index) => (
            <ScrollReveal key={project.id} delay={index * 100}>
              <Card className="group hover:shadow-2xl transition-all duration-300 overflow-hidden border-border hover:border-accent/50 hover:-translate-y-2 h-full flex flex-col">
                <div className="relative overflow-hidden">
                  <LazyImage
                    src={project.featured_image || "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop"}
                    alt={project.title}
                    className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  
                  {/* Hover Quick Actions */}
                  <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    {project.live_url && (
                      <a href={project.live_url} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>
                        <Button size="icon" variant="secondary" className="h-8 w-8 backdrop-blur-sm bg-background/80 hover:bg-primary hover:text-primary-foreground">
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                      </a>
                    )}
                    {project.github_url && (
                      <a href={project.github_url} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>
                        <Button size="icon" variant="secondary" className="h-8 w-8 backdrop-blur-sm bg-background/80 hover:bg-primary hover:text-primary-foreground">
                          <Github className="h-4 w-4" />
                        </Button>
                      </a>
                    )}
                  </div>
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
                  
                  <p className="text-muted-foreground mb-4 line-clamp-2 flex-1">
                    {project.description}
                  </p>

                  {project.tech_stack && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tech_stack.slice(0, 3).map((tech, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-1 rounded-md bg-secondary text-secondary-foreground text-xs"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}

                  <Link to={`/projects/${project.slug}`}>
                    <Button variant="outline" size="sm" className="w-full group/btn">
                      View Case Study
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
};

export default ProjectsShowcase;
