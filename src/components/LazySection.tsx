import { useEffect, useRef, useState, ReactNode } from "react";

interface LazySectionProps {
  children: ReactNode;
  rootMargin?: string;
  className?: string;
}

/**
 * LazySection component that uses Intersection Observer to delay rendering
 * of content until it's about to enter the viewport.
 * This helps reduce initial DOM size and improve page load performance.
 */
const LazySection = ({ 
  children, 
  rootMargin = "100px",
  className = ""
}: LazySectionProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Once visible, we can disconnect the observer
          observer.disconnect();
        }
      },
      {
        rootMargin, // Start loading before element is visible
        threshold: 0.01,
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [rootMargin]);

  return (
    <div ref={ref} className={className}>
      {isVisible ? children : <div style={{ minHeight: "100px" }} />}
    </div>
  );
};

export default LazySection;
