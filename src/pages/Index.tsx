import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import { SEO } from "@/components/SEO";
import { usePageTracking } from "@/hooks/usePageTracking";
import Services from "@/components/Services";
import TechStack from "@/components/TechStack";
import Testimonials from "@/components/Testimonials";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import ProjectsShowcase from "@/components/ProjectsShowcase";
import ClientLogos from "@/components/ClientLogos";
import { Newsletter } from "@/components/Newsletter";
import FAQ from "@/components/FAQ";
import { Helmet } from "react-helmet";
import Skills from "@/components/Skills";
import Timeline from "@/components/Timeline";
import Certifications from "@/components/Certifications";
import AIRecommendations from "@/components/AIRecommendations";
import GitHubRepositories from "@/components/GitHubRepositories";
import LazySection from "@/components/LazySection";
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
        
        <Services />
        
        <LazySection>
          <ProjectsShowcase />
        </LazySection>
        
        <LazySection>
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
        </LazySection>
        
        <LazySection>
          <TechStack />
        </LazySection>
        
        <LazySection>
          <Skills />
        </LazySection>
        
        <LazySection>
          <Timeline />
        </LazySection>
        
        <LazySection>
          <Certifications />
        </LazySection>
        
        <LazySection>
          <ClientLogos />
        </LazySection>
        
        <LazySection>
          <Testimonials />
        </LazySection>
        
        <LazySection>
          <AIRecommendations />
        </LazySection>
        
        <LazySection>
          <Newsletter />
        </LazySection>
        
        <LazySection>
          <FAQ />
        </LazySection>
        
        <LazySection>
          <CTA />
        </LazySection>
        
        <Footer />
      </main>
    </>;
};
export default Index;

const baseUrl = import.meta.env.VITE_BASE_URL || "https://kingsleymunachi.lovable.app";