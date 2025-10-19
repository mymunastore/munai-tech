import { useEffect } from 'react';
import { useToast } from './use-toast';

export const useServiceWorker = () => {
  const { toast } = useToast();

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker
          .register('/sw.js')
          .then((registration) => {
            if (import.meta.env.DEV) {
              console.log('SW registered:', registration);
            }

            // Check for updates periodically
            setInterval(() => {
              registration.update();
            }, 1000 * 60 * 60); // Check every hour

            registration.addEventListener('updatefound', () => {
              const newWorker = registration.installing;
              if (newWorker) {
                newWorker.addEventListener('statechange', () => {
                  if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                    toast({
                      title: 'Update Available',
                      description: 'A new version is available. Refresh to update.',
                    });
                  }
                });
              }
            });
          })
          .catch((error) => {
            console.error('SW registration failed:', error);
          });
      });
    }
  }, [toast]);
};
