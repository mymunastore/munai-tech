import { useEffect } from 'react';

interface PerformanceMetric {
  name: string;
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
}

export const usePerformanceMonitoring = () => {
  useEffect(() => {
    // Monitor Core Web Vitals
    if ('web-vital' in window || typeof window !== 'undefined') {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          const metric: PerformanceMetric = {
            name: entry.name,
            value: entry.startTime,
            rating: getRating(entry.name, entry.startTime),
          };

          // Log performance metrics
          console.log('Performance Metric:', metric);
        }
      });

      // Observe various performance entries
      try {
        observer.observe({ entryTypes: ['navigation', 'paint', 'largest-contentful-paint'] });
      } catch (e) {
        console.error('Performance monitoring not supported:', e);
      }

      return () => observer.disconnect();
    }
  }, []);
};

const getRating = (name: string, value: number): 'good' | 'needs-improvement' | 'poor' => {
  const thresholds: Record<string, { good: number; poor: number }> = {
    'largest-contentful-paint': { good: 2500, poor: 4000 },
    'first-contentful-paint': { good: 1800, poor: 3000 },
    'first-input-delay': { good: 100, poor: 300 },
    'cumulative-layout-shift': { good: 0.1, poor: 0.25 },
  };

  const threshold = thresholds[name];
  if (!threshold) return 'good';

  if (value <= threshold.good) return 'good';
  if (value <= threshold.poor) return 'needs-improvement';
  return 'poor';
};
