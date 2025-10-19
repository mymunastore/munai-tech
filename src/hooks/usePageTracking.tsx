import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

// Batch analytics events for better performance
let analyticsQueue: Array<{ page_path: string; referrer: string | null; user_agent: string }> = [];
let flushTimeout: NodeJS.Timeout | null = null;

const flushAnalytics = async () => {
  if (analyticsQueue.length === 0) return;
  
  const batch = [...analyticsQueue];
  analyticsQueue = [];
  
  try {
    await supabase.from("page_views").insert(batch);
  } catch {
    // Silently fail - don't interrupt user experience
  }
};

export const usePageTracking = () => {
  const location = useLocation();
  const lastTrackedPath = useRef<string>("");

  useEffect(() => {
    if (import.meta.env.DEV) return;
    if (location.pathname === lastTrackedPath.current) return;
    
    lastTrackedPath.current = location.pathname;

    // Add to queue
    analyticsQueue.push({
      page_path: location.pathname,
      referrer: document.referrer || null,
      user_agent: navigator.userAgent,
    });

    // Debounced batch flush
    if (flushTimeout) clearTimeout(flushTimeout);
    flushTimeout = setTimeout(flushAnalytics, 1000);

    // Flush on page unload
    const handleUnload = () => {
      if (analyticsQueue.length > 0) {
        navigator.sendBeacon(
          `${import.meta.env.VITE_SUPABASE_URL}/rest/v1/page_views`,
          JSON.stringify(analyticsQueue)
        );
      }
    };

    window.addEventListener('beforeunload', handleUnload);
    return () => window.removeEventListener('beforeunload', handleUnload);
  }, [location.pathname]);
};
