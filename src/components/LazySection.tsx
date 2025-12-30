import { useEffect, useRef, useState, ReactNode } from "react";

interface LazySectionProps {
  children: ReactNode;
  rootMargin?: string;
  className?: string;
}

/**
 * LazySection component - Renders content immediately for crawler accessibility.
 * Content is always visible to ensure Googlebot, ATS systems, and Job Bank crawlers
 * can index all content without JavaScript execution.
 * 
 * Note: Lazy loading removed for SEO and ATS compliance. All content must be
 * crawlable without JavaScript execution.
 */
const LazySection = ({ 
  children, 
  rootMargin = "100px",
  className = ""
}: LazySectionProps) => {
  // Always render content immediately for crawler accessibility
  // This ensures Googlebot, ATS systems, and Job Bank can index all content
  return (
    <div className={className}>
      {children}
    </div>
  );
};

export default LazySection;
