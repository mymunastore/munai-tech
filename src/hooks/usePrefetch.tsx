import { useEffect } from 'react';

// Prefetch routes on hover for instant navigation
export const usePrefetch = () => {
  useEffect(() => {
    const prefetchRoute = (href: string) => {
      // Extract the route path
      const url = new URL(href, window.location.origin);
      const path = url.pathname;

      // Map routes to their lazy-loaded chunks
      const routeMap: Record<string, () => Promise<any>> = {
        '/': () => import('../pages/Index'),
        '/projects': () => import('../pages/Projects'),
        '/blog': () => import('../pages/Blog'),
        '/contact': () => import('../pages/Contact'),
        '/resume': () => import('../pages/Resume'),
        '/about': () => import('../pages/About'),
        '/calculator': () => import('../pages/Calculator'),
      };

      // Prefetch if route exists
      if (routeMap[path]) {
        routeMap[path]();
      }
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest('a[href^="/"]') as HTMLAnchorElement;
      
      if (link && !link.hasAttribute('data-prefetched')) {
        link.setAttribute('data-prefetched', 'true');
        prefetchRoute(link.href);
      }
    };

    // Add event listener with passive flag for better scroll performance
    document.addEventListener('mouseover', handleMouseOver, { passive: true });

    return () => {
      document.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);
};
