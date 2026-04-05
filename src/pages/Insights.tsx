import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { StructuredData } from "@/components/StructuredData";
import InsightsHero from "@/components/insights/InsightsHero";
import InsightsFilters from "@/components/insights/InsightsFilters";
import FeaturedInsights from "@/components/insights/FeaturedInsights";
import InsightsGrid from "@/components/insights/InsightsGrid";
import InsightsEmpty from "@/components/insights/InsightsEmpty";

export type TechInsight = {
  id: string;
  title: string;
  summary: string;
  content: string | null;
  source_url: string | null;
  source_name: string | null;
  category: string;
  image_url: string | null;
  published_at: string | null;
  curated_at: string;
  is_featured: boolean | null;
  is_published: boolean | null;
  relevance_score: number | null;
  tags: string[] | null;
  author_name: string | null;
  created_at: string;
};

const Insights = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const { data: insights, isLoading, refetch } = useQuery({
    queryKey: ["tech-insights", selectedCategory, searchQuery],
    queryFn: async () => {
      let query = supabase
        .from("tech_insights")
        .select("*")
        .eq("is_published", true)
        .order("curated_at", { ascending: false });

      if (selectedCategory !== "all") {
        query = query.eq("category", selectedCategory);
      }

      if (searchQuery) {
        query = query.or(
          `title.ilike.%${searchQuery}%,summary.ilike.%${searchQuery}%`
        );
      }

      const { data, error } = await query;
      if (error) throw error;
      return data as TechInsight[];
    },
    staleTime: 1000 * 60 * 2,
    refetchInterval: 1000 * 60 * 5, // Auto-refresh every 5 minutes
  });

  // Realtime subscription for instant updates
  useEffect(() => {
    const channel = supabase
      .channel("tech-insights-realtime")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "tech_insights" },
        () => {
          refetch();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [refetch]);

  const featured = insights?.filter((i) => i.is_featured) || [];
  const regular = insights?.filter((i) => !i.is_featured) || [];

  return (
    <>
      <SEO
        title="Tech Insights - MunAiTech | AI & Cybersecurity News"
        description="Stay informed with AI-curated insights on artificial intelligence, cybersecurity, and emerging tech trends from industry leaders."
        keywords="AI news, cybersecurity news, tech insights, artificial intelligence, emerging technology"
        image="https://munai.tech/og-insights.jpg"
      />
      <StructuredData
        breadcrumbs={[
          { name: "Home", url: "/" },
          { name: "Insights", url: "/insights" },
        ]}
      />

      <div className="min-h-screen">
        <Navbar />
        <InsightsHero searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <InsightsFilters
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />

        {isLoading ? (
          <section className="py-16">
            <div className="container px-4">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div
                    key={i}
                    className="animate-pulse rounded-xl border border-border bg-card p-6"
                  >
                    <div className="h-4 w-20 bg-muted rounded mb-4" />
                    <div className="h-6 bg-muted rounded mb-2" />
                    <div className="h-4 bg-muted rounded w-5/6 mb-4" />
                    <div className="h-3 bg-muted rounded w-1/3" />
                  </div>
                ))}
              </div>
            </div>
          </section>
        ) : insights && insights.length > 0 ? (
          <>
            {featured.length > 0 && selectedCategory === "all" && !searchQuery && (
              <FeaturedInsights insights={featured} />
            )}
            <InsightsGrid insights={regular.length > 0 ? regular : insights} />
          </>
        ) : (
          <InsightsEmpty />
        )}

        <Footer />
      </div>
    </>
  );
};

export default Insights;
