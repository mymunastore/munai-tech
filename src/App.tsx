import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";
import { MunaChat } from "@/components/MunaChat";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { GlobalErrorBoundary } from "@/components/GlobalErrorBoundary";
import { SkipToContent } from "@/components/SkipToContent";
import { OfflineIndicator } from "@/components/OfflineIndicator";
import { useWebVitals } from "@/hooks/useWebVitals";
import { useServiceWorker } from "@/hooks/useServiceWorker";
import { usePrefetch } from "@/hooks/usePrefetch";
import { lazy, Suspense } from "react";
import { Loader2 } from "lucide-react";

// Lazy load pages for better performance
const Index = lazy(() => import("./pages/Index"));
const Projects = lazy(() => import("./pages/Projects"));
const ProjectDetail = lazy(() => import("./pages/ProjectDetail"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const Contact = lazy(() => import("./pages/Contact"));
const Resume = lazy(() => import("./pages/Resume"));
const About = lazy(() => import("./pages/About"));
const Admin = lazy(() => import("./pages/Admin"));
const Auth = lazy(() => import("./pages/Auth"));
const ReceiptPreview = lazy(() => import("./pages/ReceiptPreview"));
const LeaveReview = lazy(() => import("./pages/LeaveReview"));
const NotFound = lazy(() => import("./pages/NotFound"));

const LoadingFallback = () => (
  <div className="loading-spinner min-h-screen flex items-center justify-center bg-background">
    <Loader2 className="h-8 w-8 animate-spin text-primary" />
  </div>
);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      gcTime: 1000 * 60 * 10, // 10 minutes
      refetchOnWindowFocus: false,
      retry: 1, // Reduce retries for faster failure
      retryDelay: 1000, // Fixed 1s delay for faster recovery
      networkMode: 'online', // Skip queries when offline
    },
  },
});

const AppContent = () => {
  useWebVitals();
  useServiceWorker();
  usePrefetch();
  
  return (
    <>
      <SkipToContent />
      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:slug" element={<ProjectDetail />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/leave-review" element={<LeaveReview />} />
          <Route path="/resume" element={<Resume />} />
          <Route path="/about" element={<About />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/receipt-preview" element={<ReceiptPreview />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
      <MunaChat />
      <OfflineIndicator />
    </>
  );
};

const App = () => (
  <GlobalErrorBoundary>
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <AppContent />
            </BrowserRouter>
          </TooltipProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  </GlobalErrorBoundary>
);

export default App;
