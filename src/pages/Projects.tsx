import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, ExternalLink, Github, Filter } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { LazyImage } from "@/components/LazyImage";

const Projects = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const { data: projects, isLoading } = useQuery({
    queryKey: ["projects", selectedCategory],
    queryFn: async () => {
      let query = supabase
        .from("projects")
        .select("*")
        .eq("status", "published")
        .order("display_order");

      if (selectedCategory !== "all") {
        query = query.eq("category", selectedCategory);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data;
    },
    staleTime: 1000 * 60 * 10, // 10 minutes - projects rarely change
    gcTime: 1000 * 60 * 30, // 30 minutes
  });

  const categories = ["all", "web-development", "ai-integration", "ui-ux-design", "other"];

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
      <SEO 
        title="Projects | Kingsley Munachi | Web Developer Portfolio"
        description="Explore web development projects by Kingsley Munachi. AI-powered platforms, SaaS applications, and full-stack solutions built with React, Next.js, Node.js, and TypeScript."
        keywords="web development portfolio, React projects, Next.js applications, full-stack developer, Kingsley Munachi projects"
      />
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-black via-gray-900 to-black">
        <div className="container px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              My Projects
            </h1>
            <p className="text-lg text-gray-400">
              A showcase of innovative solutions that drive real business results
            </p>
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-8 border-b border-cyan-500/20">
        <div className="container px-4">
          <div className="flex items-center gap-4 flex-wrap">
            <Filter className="h-5 w-5 text-gray-400" />
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className={selectedCategory === category ? "bg-gradient-to-r from-cyan-400 to-blue-600 text-black" : "border-cyan-500/30 text-white hover:bg-cyan-500/10"}
              >
                {category.split("-").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ")}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-16">
        <div className="container px-4">
          {isLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Card key={i} className="animate-pulse">
                  <CardContent className="p-6">
                    <div className="h-48 bg-muted rounded-lg mb-4" />
                    <div className="h-6 bg-muted rounded mb-2" />
                    <div className="h-4 bg-muted rounded w-2/3" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : projects && projects.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project, index) => (
                <Card
                  key={project.id}
                  className="group hover:shadow-2xl hover:shadow-cyan-500/20 transition-all duration-300 overflow-hidden border-cyan-500/20 hover:border-cyan-400/50 bg-black/50"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="relative overflow-hidden">
                    <LazyImage
                      src={project.featured_image || "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop"}
                      alt={project.title}
                      className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 text-xs font-semibold">
                        {project.category}
                      </span>
                      {project.year && (
                        <span className="text-xs text-gray-400">{project.year}</span>
                      )}
                    </div>
                    
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                      {project.title}
                    </h3>
                    
                    <p className="text-gray-400 mb-4 line-clamp-2">
                      {project.description}
                    </p>

                    {project.tech_stack && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.tech_stack.slice(0, 3).map((tech, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-1 rounded-md bg-cyan-500/10 text-cyan-400 text-xs border border-cyan-500/20"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}

                    <div className="flex items-center gap-3">
                      <Link to={`/projects/${project.slug}`}>
                        <Button variant="outline" size="sm" className="group/btn border-cyan-500/30 text-white hover:bg-cyan-500/10">
                          View Details
                          <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                        </Button>
                      </Link>
                      {project.live_url && (
                        <a href={project.live_url} target="_blank" rel="noopener noreferrer">
                          <Button variant="ghost" size="icon" className="hover:bg-cyan-500/10 text-cyan-400">
                            <ExternalLink className="h-4 w-4" />
                          </Button>
                        </a>
                      )}
                      {project.github_url && (
                        <a href={project.github_url} target="_blank" rel="noopener noreferrer">
                          <Button variant="ghost" size="icon" className="hover:bg-cyan-500/10 text-cyan-400">
                            <Github className="h-4 w-4" />
                          </Button>
                        </a>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-gray-400 text-lg">No projects found in this category.</p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Projects;
