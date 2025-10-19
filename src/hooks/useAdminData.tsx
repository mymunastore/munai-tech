import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const useContactSubmissions = (enabled = true) => {
  return useQuery({
    queryKey: ["contact-submissions"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("contact_submissions")
        .select("*")
        .order("created_at", { ascending: false });
      
      if (error) throw error;
      return data;
    },
    enabled,
    staleTime: 1000 * 60 * 2, // 2 minutes
    gcTime: 1000 * 60 * 10, // 10 minutes
  });
};

export const useNewsletterSubscribers = (enabled = true) => {
  return useQuery({
    queryKey: ["newsletter-subscribers"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("newsletter_subscribers")
        .select("*")
        .order("subscribed_at", { ascending: false });
      
      if (error) throw error;
      return data;
    },
    enabled,
    staleTime: 1000 * 60 * 2, // 2 minutes
    gcTime: 1000 * 60 * 10, // 10 minutes
  });
};

export const usePageViews = (enabled = true) => {
  return useQuery({
    queryKey: ["page-views"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("page_views")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(100);
      
      if (error) throw error;
      return data;
    },
    enabled,
    staleTime: 1000 * 60 * 2, // 2 minutes
    gcTime: 1000 * 60 * 10, // 10 minutes
  });
};

export const useAnalyticsStats = (enabled = true) => {
  return useQuery({
    queryKey: ["analytics-stats"],
    queryFn: async () => {
      const [pageViewsRes, downloadsRes, contactsRes, subscribersRes] = await Promise.all([
        supabase.from("page_views").select("*", { count: "exact", head: true }),
        supabase.from("resume_downloads").select("*", { count: "exact", head: true }),
        supabase.from("contact_submissions").select("*", { count: "exact", head: true }),
        supabase.from("newsletter_subscribers").select("*", { count: "exact", head: true }),
      ]);

      return {
        totalPageViews: pageViewsRes.count || 0,
        totalDownloads: downloadsRes.count || 0,
        totalContacts: contactsRes.count || 0,
        totalSubscribers: subscribersRes.count || 0,
      };
    },
    enabled,
    staleTime: 1000 * 60 * 2, // 2 minutes
    gcTime: 1000 * 60 * 10, // 10 minutes
  });
};
