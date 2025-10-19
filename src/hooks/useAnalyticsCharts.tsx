import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { startOfWeek, endOfWeek, eachDayOfInterval, format } from "date-fns";

export const useAnalyticsCharts = (enabled = true) => {
  // Page views by day (last 7 days)
  const { data: pageViewsByDay } = useQuery({
    queryKey: ["analytics-page-views-by-day"],
    queryFn: async () => {
      const start = startOfWeek(new Date());
      const end = endOfWeek(new Date());
      
      const { data, error } = await supabase
        .from("page_views")
        .select("created_at")
        .gte("created_at", start.toISOString())
        .lte("created_at", end.toISOString());
      
      if (error) throw error;

      // Group by day
      const days = eachDayOfInterval({ start, end });
      const grouped = days.map(day => {
        const dayStr = format(day, "EEE");
        const count = data.filter(view => 
          format(new Date(view.created_at), "yyyy-MM-dd") === format(day, "yyyy-MM-dd")
        ).length;
        
        return { name: dayStr, value: count };
      });
      
      return grouped;
    },
    enabled,
  });

  // Top pages
  const { data: topPages } = useQuery({
    queryKey: ["analytics-top-pages"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("page_views")
        .select("page_path")
        .limit(1000);
      
      if (error) throw error;

      // Count occurrences
      const counts: Record<string, number> = {};
      data.forEach(view => {
        counts[view.page_path] = (counts[view.page_path] || 0) + 1;
      });

      // Convert to array and sort
      return Object.entries(counts)
        .map(([name, value]) => ({ name: name || "/", value }))
        .sort((a, b) => b.value - a.value)
        .slice(0, 5);
    },
    enabled,
  });

  // Contact submissions by type
  const { data: contactsByType } = useQuery({
    queryKey: ["analytics-contacts-by-type"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("contact_submissions")
        .select("project_type");
      
      if (error) throw error;

      const counts: Record<string, number> = {};
      data.forEach(contact => {
        const type = contact.project_type || "Other";
        counts[type] = (counts[type] || 0) + 1;
      });

      return Object.entries(counts)
        .map(([name, value]) => ({ name, value }));
    },
    enabled,
  });

  return {
    pageViewsByDay,
    topPages,
    contactsByType,
  };
};
