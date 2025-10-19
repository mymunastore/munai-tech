import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

export const usePageTracking = () => {
  const location = useLocation();

  useEffect(() => {
    // Non-blocking page tracking - fire and forget
    if (import.meta.env.DEV) return;

    // Use setTimeout to defer tracking after render
    const timeoutId = setTimeout(async () => {
      try {
        await supabase.from("page_views").insert({
          page_path: location.pathname,
          referrer: document.referrer || null,
          user_agent: navigator.userAgent,
        });
      } catch {
        // Silently fail - don't interrupt user experience
      }
    }, 0);

    return () => clearTimeout(timeoutId);
  }, [location.pathname]);
};
