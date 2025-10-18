import { ReactNode, useEffect, useState } from "react";

interface ParallaxSectionProps {
  children: ReactNode;
  speed?: number;
  className?: string;
}

const ParallaxSection = ({ children, speed = 0.5, className = "" }: ParallaxSectionProps) => {
  const [offsetY, setOffsetY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setOffsetY(window.pageYOffset);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`relative ${className}`}
      style={{
        transform: `translateY(${offsetY * speed}px)`,
        transition: "transform 0.1s ease-out",
      }}
    >
      {children}
    </div>
  );
};

export default ParallaxSection;
