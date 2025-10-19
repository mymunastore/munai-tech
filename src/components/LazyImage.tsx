import { useState, useEffect, useRef, ImgHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface LazyImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  placeholderSrc?: string;
  srcSet?: string;
  sizes?: string;
  webpSrc?: string;
  avifSrc?: string;
  aspectRatio?: string;
}

export const LazyImage = ({ 
  src, 
  alt, 
  className,
  placeholderSrc = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300'%3E%3Crect fill='%23e0e0e0' width='400' height='300'/%3E%3C/svg%3E",
  srcSet,
  sizes,
  webpSrc,
  avifSrc,
  aspectRatio,
  ...props 
}: LazyImageProps) => {
  const [imageSrc, setImageSrc] = useState(placeholderSrc);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isIntersecting, setIsIntersecting] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  const pictureRef = useRef<HTMLPictureElement>(null);

  useEffect(() => {
    let observer: IntersectionObserver;
    const target = pictureRef.current || imgRef.current;
    
    if (target) {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && !isIntersecting) {
              setIsIntersecting(true);
              setImageSrc(src);
              observer.unobserve(entry.target);
            }
          });
        },
        { rootMargin: "100px" }
      );

      observer.observe(target);
    }

    return () => {
      if (observer && target) {
        observer.unobserve(target);
      }
    };
  }, [src, isIntersecting]);

  const handleLoad = () => {
    setIsLoaded(true);
  };

  const wrapperStyle = aspectRatio ? {
    aspectRatio,
    position: 'relative' as const,
  } : {};

  const imgElement = (
    <img
      ref={imgRef}
      src={imageSrc}
      srcSet={isIntersecting && srcSet ? srcSet : undefined}
      sizes={sizes}
      alt={alt}
      width={props.width}
      height={props.height}
      className={cn(
        "transition-all duration-500",
        isLoaded ? "opacity-100 blur-0" : "opacity-0 blur-sm",
        aspectRatio && "absolute inset-0 w-full h-full object-cover",
        className
      )}
      onLoad={handleLoad}
      loading="lazy"
      decoding="async"
      {...props}
    />
  );

  // Use <picture> for modern format support
  if (isIntersecting && (webpSrc || avifSrc)) {
    return (
      <picture ref={pictureRef} style={wrapperStyle}>
        {avifSrc && <source srcSet={avifSrc} type="image/avif" />}
        {webpSrc && <source srcSet={webpSrc} type="image/webp" />}
        {imgElement}
      </picture>
    );
  }

  return aspectRatio ? (
    <div style={wrapperStyle}>
      {imgElement}
    </div>
  ) : imgElement;
};
