import { useEffect } from 'react';

// Enhanced prefetch routes with multiple strategies
export const usePrefetch = () => {
  useEffect(() => {
    const routeMap: Record<string, () => Promise<any>> = {
      '/': () => import('../pages/Index'),
      '/projects': () => import('../pages/Projects'),
      '/blog': () => import('../pages/Blog'),
      '/contact': () => import('../pages/Contact'),
      '/leave-review': () => import('../pages/LeaveReview'),
      '/resume': () => import('../pages/Resume'),
      '/about': () => import('../pages/About'),
    };

    const prefetchedRoutes = new Set<string>();

    const prefetchRoute = (path: string) => {
      if (prefetchedRoutes.has(path)) return;
      if (routeMap[path]) {
        prefetchedRoutes.add(path);
        routeMap[path]().catch(() => prefetchedRoutes.delete(path));
      }
    };

    // Strategy 1: Hover prefetch (high priority)
    const handleMouseOver = (e: MouseEvent) => {
      const link = (e.target as HTMLElement).closest('a[href^="/"]') as HTMLAnchorElement;
      if (link) {
        const url = new URL(link.href, window.location.origin);
        prefetchRoute(url.pathname);
      }
    };

    // Strategy 2: Viewport prefetch (medium priority)
    const observeLinks = () => {
      const links = document.querySelectorAll('a[href^="/"]');
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const link = entry.target as HTMLAnchorElement;
            const url = new URL(link.href, window.location.origin);
            prefetchRoute(url.pathname);
          }
        });
      }, { rootMargin: '50px' });

      links.forEach(link => observer.observe(link));
      return () => observer.disconnect();
    };

    // Strategy 3: Idle prefetch for critical routes (low priority)
    const idlePrefetch = () => {
      if ('requestIdleCallback' in window) {
        requestIdleCallback(() => {
          ['/projects', '/contact'].forEach(prefetchRoute);
        }, { timeout: 2000 });
      } else {
        setTimeout(() => {
          ['/projects', '/contact'].forEach(prefetchRoute);
        }, 2000);
      }
    };

    document.addEventListener('mouseover', handleMouseOver, { passive: true });
    const cleanupObserver = observeLinks();
    idlePrefetch();

    return () => {
      document.removeEventListener('mouseover', handleMouseOver);
      cleanupObserver();
    };
  }, []);
};
