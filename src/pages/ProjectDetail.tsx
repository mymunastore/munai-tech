import { useQuery } from "@tanstack/react-query";
import { useParams, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ExternalLink, Github, Calendar, User, Clock } from "lucide-react";
import { lazy, Suspense, useState, useEffect } from "react";
const ReactMarkdown = lazy(() => import("react-markdown"));
import SocialShare from "@/components/SocialShare";
import RelatedProjects from "@/components/RelatedProjects";
import { Helmet } from "react-helmet";
import { LazyImage } from "@/components/LazyImage";

// Lazy load syntax highlighter only when needed
const SyntaxHighlighter = lazy(() =>
  import("react-syntax-highlighter").then((mod) => ({ default: mod.Prism }))
);

const ProjectDetail = () => {
  const { slug } = useParams();

  const [syntaxHighlighterLoaded, setSyntaxHighlighterLoaded] = useState(false);

  const { data: project, isLoading } = useQuery({
    queryKey: ["project", slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .eq("slug", slug)
        .eq("status", "published")
        .single();

      if (error) throw error;
      return data;
    },
    staleTime: 1000 * 60 * 20, // 20 minutes - individual projects
    gcTime: 1000 * 60 * 60, // 1 hour
  });

  // Only load syntax highlighter if code blocks exist
  useEffect(() => {
    if (project?.case_study_content?.includes('```')) {
      setSyntaxHighlighterLoaded(true);
    }
  }, [project]);

  const { data: images } = useQuery({
    queryKey: ["project-images", project?.id],
    queryFn: async () => {
      if (!project?.id) return [];
      const { data, error } = await supabase
        .from("project_images")
        .select("*")
        .eq("project_id", project.id)
        .order("display_order");

      if (error) throw error;
      return data;
    },
    enabled: !!project?.id,
    staleTime: 1000 * 60 * 20, // 20 minutes
    gcTime: 1000 * 60 * 60, // 1 hour
  });

  if (isLoading) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="container px-4 py-32">
          <div className="max-w-4xl mx-auto">
            <div className="animate-pulse space-y-6">
              <div className="h-8 bg-muted rounded w-3/4" />
              <div className="h-96 bg-muted rounded" />
              <div className="space-y-3">
                <div className="h-4 bg-muted rounded" />
                <div className="h-4 bg-muted rounded w-5/6" />
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="container px-4 py-32 text-center">
          <h1 className="text-3xl font-bold mb-4">Project Not Found</h1>
          <Link to="/projects">
            <Button>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Projects
            </Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';

  return (
    <>
      <Helmet>
        <title>{project.title} - Kingsley Munachi Portfolio</title>
        <meta name="description" content={project.description} />
        <meta property="og:title" content={project.title} />
        <meta property="og:description" content={project.description} />
        {project.featured_image && <meta property="og:image" content={project.featured_image} />}
        {/* Preload featured image for faster LCP */}
        {project.featured_image && (
          <link
            rel="preload"
            as="image"
            href={project.featured_image}
            fetchPriority="high"
          />
        )}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CreativeWork",
            "name": project.title,
            "description": project.description,
            "author": {
              "@type": "Person",
              "name": "Kingsley Munachi"
            },
            "datePublished": project.created_at,
            "keywords": project.tech_stack?.join(", ")
          })}
        </script>
      </Helmet>
      
      <div className="min-h-screen">
        <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-primary/5 to-accent/5">
        <div className="container px-4">
          <div className="max-w-4xl mx-auto">
            <Link to="/projects">
              <Button variant="ghost" className="mb-6">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Projects
              </Button>
            </Link>

            <div className="flex items-center gap-2 mb-4">
              <span className="px-3 py-1 rounded-full bg-accent/10 text-accent text-sm font-semibold">
                {project.category}
              </span>
              {project.year && (
                <span className="text-sm text-muted-foreground">{project.year}</span>
              )}
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              {project.title}
            </h1>

            <p className="text-xl text-muted-foreground mb-8">
              {project.description}
            </p>

            <div className="flex flex-wrap gap-4 mb-8 items-center">
              <div className="flex gap-4">
                {project.live_url && (
                  <a href={project.live_url} target="_blank" rel="noopener noreferrer">
                    <Button>
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Visit Live Site
                    </Button>
                  </a>
                )}
                {project.github_url && (
                  <a href={project.github_url} target="_blank" rel="noopener noreferrer">
                    <Button variant="outline">
                      <Github className="mr-2 h-4 w-4" />
                      View Code
                    </Button>
                  </a>
                )}
              </div>
              <div className="ml-auto">
                <SocialShare 
                  url={currentUrl}
                  title={project.title}
                  description={project.description}
                />
              </div>
            </div>

            {/* Project Meta */}
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              {project.client_name && (
                <div className="flex items-center gap-3">
                  <User className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Client</p>
                    <p className="font-semibold">{project.client_name}</p>
                  </div>
                </div>
              )}
              {project.project_duration && (
                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Duration</p>
                    <p className="font-semibold">{project.project_duration}</p>
                  </div>
                </div>
              )}
              {project.year && (
                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Year</p>
                    <p className="font-semibold">{project.year}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Image */}
      {project.featured_image && (
        <section className="py-8">
          <div className="container px-4">
            <div className="max-w-6xl mx-auto">
              <LazyImage
                src={project.featured_image}
                alt={project.title}
                className="w-full rounded-lg shadow-2xl"
                width="1200"
                height="600"
              />
            </div>
          </div>
        </section>
      )}

      {/* Tech Stack */}
      {project.tech_stack && project.tech_stack.length > 0 && (
        <section className="py-8 bg-muted/30">
          <div className="container px-4">
            <div className="max-w-4xl mx-auto">
              <h3 className="text-2xl font-bold mb-4">Technologies Used</h3>
              <div className="flex flex-wrap gap-3">
                {project.tech_stack.map((tech, idx) => (
                  <span
                    key={idx}
                    className="px-4 py-2 rounded-lg bg-background text-foreground border font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Case Study Content */}
      {project.case_study_content && (
        <section className="py-16">
          <div className="container px-4">
            <div className="max-w-4xl mx-auto prose prose-lg dark:prose-invert">
              {syntaxHighlighterLoaded ? (
                <ReactMarkdown
                  components={{
                    code({ node, inline, className, children, ...props }: any) {
                      const match = /language-(\w+)/.exec(className || "");
                      return !inline && match ? (
                        <Suspense fallback={<pre className={className}>{children}</pre>}>
                          <SyntaxHighlighter
                            language={match[1]}
                            PreTag="div"
                            style={{
                              'code[class*="language-"]': { color: '#d4d4d4', background: '#1e1e1e' },
                              'pre[class*="language-"]': { background: '#1e1e1e' },
                            }}
                            {...props}
                          >
                            {String(children).replace(/\n$/, "")}
                          </SyntaxHighlighter>
                        </Suspense>
                      ) : (
                        <code className={className} {...props}>
                          {children}
                        </code>
                      );
                    },
                  }}
                >
                  {project.case_study_content}
                </ReactMarkdown>
              ) : (
                <ReactMarkdown>{project.case_study_content}</ReactMarkdown>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Project Images Gallery */}
      {images && images.length > 0 && (
        <section className="py-16 bg-muted/30">
          <div className="container px-4">
            <div className="max-w-6xl mx-auto">
              <h3 className="text-2xl font-bold mb-8">Gallery</h3>
              <div className="grid md:grid-cols-2 gap-6">
                {images.map((image) => (
                  <div key={image.id} className="space-y-2">
                    <LazyImage
                      src={image.image_url}
                      alt={image.caption || project.title}
                      className="w-full rounded-lg shadow-lg"
                      width="600"
                      height="400"
                    />
                    {image.caption && (
                      <p className="text-sm text-muted-foreground">{image.caption}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Metrics */}
      {project.metrics && Object.keys(project.metrics).length > 0 && (
        <section className="py-16">
          <div className="container px-4">
            <div className="max-w-4xl mx-auto">
              <h3 className="text-2xl font-bold mb-8">Results & Metrics</h3>
              <div className="grid md:grid-cols-3 gap-6">
                {Object.entries(project.metrics).map(([key, value]) => (
                  <div key={key} className="text-center p-6 rounded-lg bg-accent/10">
                    <div className="text-4xl font-bold text-accent mb-2">{String(value)}</div>
                    <div className="text-sm text-muted-foreground capitalize">
                      {key.replace(/_/g, " ")}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Related Projects */}
      <RelatedProjects 
        currentProjectId={project.id}
        category={project.category}
        tags={project.tags || []}
      />

      <Footer />
      </div>
    </>
  );
};

export default ProjectDetail;
