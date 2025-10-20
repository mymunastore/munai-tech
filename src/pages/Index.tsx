import { lazy, Suspense } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import { SEO } from "@/components/SEO";
import { usePageTracking } from "@/hooks/usePageTracking";
import Footer from "@/components/Footer";
const Services = lazy(() => import("@/components/Services"));
const TechStack = lazy(() => import("@/components/TechStack"));
const Testimonials = lazy(() => import("@/components/Testimonials"));
const CTA = lazy(() => import("@/components/CTA"));
const ProjectsShowcase = lazy(() => import("@/components/ProjectsShowcase"));
const ClientLogos = lazy(() => import("@/components/ClientLogos"));
const Newsletter = lazy(() => import("@/components/Newsletter").then(m => ({ default: m.Newsletter })));
const FAQ = lazy(() => import("@/components/FAQ"));
import { Helmet } from "react-helmet";
const Skills = lazy(() => import("@/components/Skills"));
const Timeline = lazy(() => import("@/components/Timeline"));
const Certifications = lazy(() => import("@/components/Certifications"));
const AIRecommendations = lazy(() => import("@/components/AIRecommendations"));
const GitHubRepositories = lazy(() => import("@/components/GitHubRepositories"));
import LazySection from "@/components/LazySection";
import { Loader2 } from "lucide-react";

const SectionFallback = () => (
  <div className="py-20 flex justify-center items-center">
    <Loader2 className="h-6 w-6 animate-spin text-primary" />
  </div>
);
const Index = () => {
  usePageTracking();
  return <>
      <SEO />
      <Helmet>
        <title>MunAiTech - AI Web App Designer & Full-Stack Development | 15071995 LLC</title>
        <meta name="description" content="MunAiTech delivers cutting-edge AI-powered web solutions. Expert TypeScript, React & AI development for modern businesses. 30+ projects, 30+ satisfied clients." />
        <meta name="keywords" content="MunAiTech, AI Development, Full-Stack Developer, TypeScript Expert, React Development, AI Integration, Web Applications, 15071995 LLC" />
        <link rel="canonical" href="https://yourdomain.com" />
        
        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="MunAiTech - AI Web App Design & Full-Stack Development" />
        <meta property="og:description" content="Transform your business with AI-powered solutions. 30+ projects delivered with 99% client satisfaction." />
        <meta property="og:url" content="https://yourdomain.com" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="MunAiTech - AI-Powered Web Development Solutions" />
        <meta name="twitter:description" content="Expert AI integration, TypeScript & React development. Transform your business with innovative digital solutions." />
        
        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "MunAiTech",
          "legalName": "15071995 LLC",
          "description": "AI-powered web development and digital solutions",
          "url": "https://yourdomain.com",
          "logo": "https://yourdomain.com/logo.png",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Lagos",
            "addressCountry": "Nigeria"
          },
          "contactPoint": {
            "@type": "ContactPoint",
            "contactType": "Business",
            "availableLanguage": ["English"]
          },
          "sameAs": ["https://github.com/mymunastore", "https://www.linkedin.com/in/kingsley-munachi-843591244", "https://twitter.com/mymunastore"],
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.9",
            "reviewCount": "100",
            "bestRating": "5"
          }
        })}
        </script>
      </Helmet>
      
      <main id="main-content" className="min-h-screen bg-black">
        <Navbar />
        <Hero />
        
        <Suspense fallback={<SectionFallback />}>
          <Services />
        </Suspense>
        
        <LazySection>
          <Suspense fallback={<SectionFallback />}>
            <ProjectsShowcase />
          </Suspense>
        </LazySection>
        
        <LazySection>
          <Suspense fallback={<SectionFallback />}>
            {/* GitHub Repositories Section */}
            <section className="py-20 bg-gradient-to-b from-black via-gray-900 to-black border-y border-cyan-500/20">
              <div className="container px-4">
                <div className="max-w-6xl mx-auto">
                  <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                      Open Source <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Projects</span>
                    </h2>
                    <p className="text-gray-300 max-w-2xl mx-auto">
                      Explore my latest repositories and contributions on GitHub
                    </p>
                  </div>
                  <GitHubRepositories limit={6} showHeader={false} />
                </div>
              </div>
            </section>
          </Suspense>
        </LazySection>
        
        <LazySection>
          <Suspense fallback={<SectionFallback />}>
            <TechStack />
          </Suspense>
        </LazySection>
        
        <LazySection>
          <Suspense fallback={<SectionFallback />}>
            <Skills />
          </Suspense>
        </LazySection>
        
        <LazySection>
          <Suspense fallback={<SectionFallback />}>
            <Timeline />
          </Suspense>
        </LazySection>
        
        <LazySection>
          <Suspense fallback={<SectionFallback />}>
            <Certifications />
          </Suspense>
        </LazySection>
        
        <LazySection>
          <Suspense fallback={<SectionFallback />}>
            <ClientLogos />
          </Suspense>
        </LazySection>
        
        <LazySection>
          <Suspense fallback={<SectionFallback />}>
            <Testimonials />
          </Suspense>
        </LazySection>
        
        <LazySection>
          <Suspense fallback={<SectionFallback />}>
            <AIRecommendations />
          </Suspense>
        </LazySection>
        
        <LazySection>
          <Suspense fallback={<SectionFallback />}>
            <Newsletter />
          </Suspense>
        </LazySection>
        
        <LazySection>
          <Suspense fallback={<SectionFallback />}>
            <FAQ />
          </Suspense>
        </LazySection>
        
        <LazySection>
          <Suspense fallback={<SectionFallback />}>
            <CTA />
          </Suspense>
        </LazySection>
        
        <Footer />
      </main>
    </>;
};
export default Index;