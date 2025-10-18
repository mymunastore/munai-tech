import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

export const usePageTracking = () => {
  const location = useLocation();

  useEffect(() => {
    const trackPageView = async () => {
      try {
        // Only track in production
        if (import.meta.env.DEV) return;

        await supabase.from("page_views").insert({
          page_path: location.pathname,
          referrer: document.referrer || null,
          user_agent: navigator.userAgent,
        });
      } catch (error) {
        // Silently fail - don't interrupt user experience
        if (import.meta.env.DEV) {
          console.error("Page tracking error:", error);
        }
      }
    };

    trackPageView();
  }, [location.pathname]);
};
