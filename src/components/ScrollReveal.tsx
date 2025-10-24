import { ReactNode, memo } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

const ScrollReveal = memo(({ children, className = "", delay = 0 }: ScrollRevealProps) => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${
        isVisible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-10"
      } ${className}`}
      style={{ 
        transitionDelay: `${delay}ms`,
        willChange: isVisible ? 'auto' : 'opacity, transform',
        contentVisibility: 'auto'
      }}
    >
      {children}
    </div>
  );
});

ScrollReveal.displayName = "ScrollReveal";

export default ScrollReveal;
