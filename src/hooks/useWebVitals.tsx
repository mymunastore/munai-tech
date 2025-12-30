import { useEffect } from "react";

interface WebVitalsMetric {
  name: string;
  value: number;
  rating: "good" | "needs-improvement" | "poor";
}

export const useWebVitals = () => {
  useEffect(() => {
    if (import.meta.env.DEV) return;

    const reportWebVitals = (metric: WebVitalsMetric) => {
      // Log to console in development
      if (import.meta.env.DEV) {
        console.log(`${metric.name}:`, metric.value, metric.rating);
      }

      // Send to analytics endpoint in production
      if (navigator.sendBeacon) {
        const body = JSON.stringify({
          metric: metric.name,
          value: metric.value,
          rating: metric.rating,
          url: window.location.href,
          timestamp: Date.now(),
        });

        navigator.sendBeacon("/api/analytics", body);
      }
    };

    // Measure Core Web Vitals
    if ("PerformanceObserver" in window) {
      // Largest Contentful Paint (LCP)
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1] as PerformanceEntry & {
          renderTime?: number;
          loadTime?: number;
        };
        const value = lastEntry.renderTime || lastEntry.loadTime || 0;
        
        reportWebVitals({
          name: "LCP",
          value,
          rating: value <= 2500 ? "good" : value <= 4000 ? "needs-improvement" : "poor",
        });
      });

      try {
        lcpObserver.observe({ type: "largest-contentful-paint", buffered: true });
      } catch (e) {
        // Not supported
      }

      // First Input Delay (FID)
      const fidObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          const perfEntry = entry as PerformanceEventTiming;
          const delay = perfEntry.processingStart - perfEntry.startTime;
          reportWebVitals({
            name: "FID",
            value: delay,
            rating: delay <= 100 ? "good" : delay <= 300 ? "needs-improvement" : "poor",
          });
        });
      });

      try {
        fidObserver.observe({ type: "first-input", buffered: true });
      } catch (e) {
        // Not supported
      }

      // Cumulative Layout Shift (CLS)
      let clsValue = 0;
      const clsObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          const layoutEntry = entry as PerformanceEntry & { hadRecentInput?: boolean; value?: number };
          if (!layoutEntry.hadRecentInput) {
            clsValue += layoutEntry.value || 0;
          }
        });

        reportWebVitals({
          name: "CLS",
          value: clsValue,
          rating: clsValue <= 0.1 ? "good" : clsValue <= 0.25 ? "needs-improvement" : "poor",
        });
      });

      try {
        clsObserver.observe({ type: "layout-shift", buffered: true });
      } catch (e) {
        // Not supported
      }
    }
  }, []);
};
