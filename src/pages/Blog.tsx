import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, Calendar, Clock, Tag, Search } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { format } from "date-fns";
import { Helmet } from "react-helmet";
import aiInsightsImg from "@/assets/blog/ai-insights.jpg";
import developmentImg from "@/assets/blog/development.jpg";
import designImg from "@/assets/blog/design.jpg";
import insightsImg from "@/assets/blog/insights.jpg";

const Blog = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const getCategoryImage = (category: string) => {
    switch (category.toLowerCase()) {
      case "ai":
        return aiInsightsImg;
      case "development":
        return developmentImg;
      case "design":
        return designImg;
      case "insights":
        return insightsImg;
      default:
        return insightsImg;
    }
  };

  const { data: posts, isLoading } = useQuery({
    queryKey: ["blog-posts", selectedCategory, searchQuery],
    queryFn: async () => {
      let query = supabase
        .from("blog_posts")
        .select("*")
        .eq("is_published", true)
        .order("published_at", { ascending: false });

      if (selectedCategory !== "all") {
        query = query.eq("category", selectedCategory);
      }

      if (searchQuery) {
        query = query.or(`title.ilike.%${searchQuery}%,excerpt.ilike.%${searchQuery}%,content.ilike.%${searchQuery}%`);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data;
    },
  });

  const categories = ["all", "ai", "development", "design", "insights"];

  return (
    <>
      <Helmet>
        <title>Blog & Insights - MunAiTech | AI Development Articles</title>
        <meta name="description" content="Expert insights on AI development, web technologies, and digital innovation. Learn from real-world projects by MunAiTech." />
        <meta name="keywords" content="AI development, web development, TypeScript, React, AI integration, tech insights" />
        <link rel="canonical" href="https://yourdomain.com/blog" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Blog",
            "name": "MunAiTech Blog",
            "description": "Insights on AI development and web technologies",
            "publisher": {
              "@type": "Organization",
              "name": "MunAiTech",
              "legalName": "15071995 LLC"
            }
          })}
        </script>
      </Helmet>
      
      <div className="min-h-screen">
        <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-primary/5 to-accent/5">
        <div className="container px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Blog & Insights
            </h1>
            <p className="text-lg text-muted-foreground">
              Thoughts on AI, development, and digital innovation
            </p>
          </div>
        </div>
      </section>

      {/* Search & Filter Section */}
      <section className="py-8 border-b">
        <div className="container px-4">
          <div className="max-w-xl mx-auto mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search blog posts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          
          <div className="flex items-center gap-4 flex-wrap justify-center">
            <Tag className="h-5 w-5 text-muted-foreground" />
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
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
          ) : posts && posts.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post, index) => (
                <Card
                  key={post.id}
                  className="group hover:shadow-2xl transition-all duration-300 overflow-hidden border-border hover:border-accent/50"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={post.featured_image || getCategoryImage(post.category)}
                      alt={post.title}
                      className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-semibold">
                        {post.category}
                      </span>
                    </div>
                    
                    <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-accent transition-colors">
                      {post.title}
                    </h3>
                    
                    <p className="text-muted-foreground mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>

                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                      {post.published_at && (
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          <span>{format(new Date(post.published_at), "MMM d, yyyy")}</span>
                        </div>
                      )}
                      {post.read_time && (
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          <span>{post.read_time} min read</span>
                        </div>
                      )}
                    </div>

                    <Link to={`/blog/${post.slug}`}>
                      <Button variant="outline" size="sm" className="group/btn w-full">
                        Read More
                        <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-muted-foreground text-lg">No blog posts found in this category.</p>
            </div>
          )}
        </div>
      </section>

      <Footer />
      </div>
    </>
  );
};

export default Blog;
