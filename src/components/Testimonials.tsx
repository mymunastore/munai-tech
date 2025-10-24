import { memo, useMemo } from "react";
import { Card, CardContent } from "./ui/card";
import { Quote, Star } from "lucide-react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface Testimonial {
  id: string;
  client_name: string;
  client_title?: string;
  client_company?: string;
  testimonial_text: string;
  rating?: number;
  created_at: string;
}

const Testimonials = memo(() => {
  // Use React Query for optimized caching
  const { data: testimonials = [], isLoading } = useQuery({
    queryKey: ["approved-testimonials"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("client_testimonials")
        .select("*")
        .eq("status", "approved")
        .order("created_at", { ascending: false })
        .limit(6);
      
      if (error) throw error;
      return data as Testimonial[];
    },
    staleTime: 1000 * 60 * 5, // 5 minutes - testimonials don't change often
    gcTime: 1000 * 60 * 30, // 30 minutes
  });

  // Memoize skeleton array to prevent recreation
  const skeletonArray = useMemo(() => [1, 2, 3], []);

  if (isLoading) {
    return (
      <section id="testimonials" className="py-20 md:py-32 bg-secondary/30">
        <div className="container px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-block mb-4">
              <div className="h-8 w-48 bg-muted rounded-full animate-pulse" />
            </div>
            <div className="h-12 w-3/4 mx-auto bg-muted rounded-lg animate-pulse mb-4" />
            <div className="h-6 w-2/3 mx-auto bg-muted rounded-lg animate-pulse" />
          </div>
          <div className="grid md:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
            {skeletonArray.map((i) => (
              <Card key={i} className="animate-pulse">
                <CardContent className="p-8">
                  <div className="w-10 h-10 rounded-lg bg-muted mb-6" />
                  <div className="flex gap-1 mb-4">
                    {[1, 2, 3, 4, 5].map((j) => (
                      <div key={j} className="w-4 h-4 bg-muted rounded" />
                    ))}
                  </div>
                  <div className="space-y-2 mb-6">
                    <div className="h-4 bg-muted rounded w-full" />
                    <div className="h-4 bg-muted rounded w-full" />
                    <div className="h-4 bg-muted rounded w-3/4" />
                  </div>
                  <div className="pt-4 border-t border-border">
                    <div className="h-5 bg-muted rounded w-32 mb-2" />
                    <div className="h-4 bg-muted rounded w-40" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="testimonials" className="py-20 md:py-32 bg-secondary/30">
      <div className="container px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-semibold mb-4">
            Client Success Stories
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
            What Clients Say About
            <br />
            <span className="bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
              Working With Me
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-6">
            Real feedback from real clients who have transformed their businesses with my solutions
          </p>
          
          {/* Call to Action */}
          <Link to="/leave-review">
            <Button size="lg" className="mt-4">
              <Star className="mr-2 h-5 w-5" />
              Leave Your Review
            </Button>
          </Link>
        </div>

        {/* Testimonials Grid */}
        {testimonials.length > 0 ? (
          <div className="grid md:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <Card
                key={testimonial.id}
                className="group hover:shadow-xl transition-all duration-300 border-border bg-card hover:border-accent/50 relative"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <CardContent className="p-8">
                  {/* Quote Icon */}
                  <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center mb-6">
                    <Quote className="w-5 h-5 text-accent" />
                  </div>

                  {/* Rating */}
                  {testimonial.rating && (
                    <div className="flex gap-1 mb-4">
                      {Array.from({ length: testimonial.rating }).map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                      ))}
                    </div>
                  )}

                  {/* Testimonial Text */}
                  <p className="text-muted-foreground mb-6 leading-relaxed italic line-clamp-6">
                    "{testimonial.testimonial_text}"
                  </p>

                  {/* Author Info */}
                  <div className="pt-4 border-t border-border">
                    <h3 className="font-bold text-foreground">{testimonial.client_name}</h3>
                    {testimonial.client_title && testimonial.client_company && (
                      <p className="text-sm text-muted-foreground">
                        {testimonial.client_title}, {testimonial.client_company}
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-6">No testimonials yet. Be the first to share your experience!</p>
            <Link to="/leave-review">
              <Button size="lg">
                <Star className="mr-2 h-5 w-5" />
                Leave the First Review
              </Button>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
});

Testimonials.displayName = "Testimonials";

export default Testimonials;
