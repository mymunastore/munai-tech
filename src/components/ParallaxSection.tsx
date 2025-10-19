import { ReactNode, useEffect, useRef } from "react";

interface ParallaxSectionProps {
  children: ReactNode;
  speed?: number;
  className?: string;
}

const ParallaxSection = ({ children, speed = 0.5, className = "" }: ParallaxSectionProps) => {
  const elementRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>();

  useEffect(() => {
    let lastScrollY = window.pageYOffset;
    
    const handleScroll = () => {
      // Cancel any pending animation frame
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }

      // Schedule the update for the next animation frame
      rafRef.current = requestAnimationFrame(() => {
        const currentScrollY = window.pageYOffset;
        
        // Only update if scroll position changed
        if (currentScrollY !== lastScrollY && elementRef.current) {
          lastScrollY = currentScrollY;
          // Use CSS transform directly to avoid state updates and reflows
          elementRef.current.style.transform = `translateY(${currentScrollY * speed}px)`;
        }
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [speed]);

  return (
    <div
      ref={elementRef}
      className={`relative ${className}`}
      style={{
        willChange: "transform",
      }}
    >
      {children}
    </div>
  );
};

export default ParallaxSection;
