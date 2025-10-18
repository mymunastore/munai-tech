import { useState, useEffect } from "react";
import { Card, CardContent } from "./ui/card";
import { Sparkles, TrendingUp, Zap } from "lucide-react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";

interface Recommendation {
  icon: React.ReactNode;
  title: string;
  description: string;
  action: string;
  link: string;
}

const AIRecommendations = () => {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);

  useEffect(() => {
    // Simulate AI-powered personalized recommendations
    const userRecommendations: Recommendation[] = [
      {
        icon: <Sparkles className="h-6 w-6 text-accent" />,
        title: "AI Integration Services",
        description: "Transform your business with cutting-edge AI solutions tailored to your needs",
        action: "Explore AI Services",
        link: "/contact?service=ai-integration"
      },
      {
        icon: <TrendingUp className="h-6 w-6 text-accent" />,
        title: "Latest Blog Post",
        description: "Discover how AI is revolutionizing modern web development",
        action: "Read Article",
        link: "/blog"
      },
      {
        icon: <Zap className="h-6 w-6 text-accent" />,
        title: "Quick Project Estimate",
        description: "Get an instant estimate for your next project in under 2 minutes",
        action: "Calculate Now",
        link: "/calculator"
      }
    ];

    setRecommendations(userRecommendations);
  }, []);

  if (recommendations.length === 0) return null;

  return (
    <section className="py-16 bg-gradient-to-br from-primary/5 to-accent/5">
      <div className="container px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/20 border border-accent/30 backdrop-blur-sm mb-4">
            <Sparkles className="h-4 w-4 text-accent animate-pulse" />
            <span className="text-sm font-medium">AI-Powered Recommendations</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Personalized Just For You
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Based on your interests and browsing patterns
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {recommendations.map((rec, index) => (
            <Card 
              key={index}
              className="group hover:shadow-xl transition-all duration-300 border-border hover:border-accent/50 overflow-hidden"
            >
              <CardContent className="p-6">
                <div className="mb-4 w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                  {rec.icon}
                </div>
                <h3 className="text-xl font-bold mb-2 group-hover:text-accent transition-colors">
                  {rec.title}
                </h3>
                <p className="text-muted-foreground mb-4 line-clamp-2">
                  {rec.description}
                </p>
                <Link to={rec.link}>
                  <Button 
                    variant="outline" 
                    className="w-full group-hover:bg-accent group-hover:text-accent-foreground group-hover:border-accent transition-all"
                  >
                    {rec.action}
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AIRecommendations;
