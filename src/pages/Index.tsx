import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import { SEO } from "@/components/SEO";
import { StructuredData } from "@/components/StructuredData";
import { usePageTracking } from "@/hooks/usePageTracking";
import TechStack from "@/components/TechStack";
import Testimonials from "@/components/Testimonials";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import ProjectsShowcase from "@/components/ProjectsShowcase";
import ClientLogos from "@/components/ClientLogos";
import FAQ from "@/components/FAQ";
import Certifications from "@/components/Certifications";
import { Helmet } from "react-helmet";
import LazySection from "@/components/LazySection";
import StatsCounter from "@/components/StatsCounter";
import TechMarquee from "@/components/TechMarquee";

import CompanyPositioning from "@/components/CompanyPositioning";
import CoreCapabilities from "@/components/CoreCapabilities";
import Differentiation from "@/components/Differentiation";
import ThoughtLeadership from "@/components/ThoughtLeadership";
import GlobalOperations from "@/components/GlobalOperations";
import InnovationResearch from "@/components/InnovationResearch";
import ImpactResults from "@/components/ImpactResults";

import FinalPositioning from "@/components/FinalPositioning";

const Index = () => {
  usePageTracking();
  return <>
      <SEO 
        title="MunAiTech | AI Infrastructure & Cybersecurity"
        description="MunAiTech designs and deploys production-grade AI infrastructure with embedded cybersecurity for enterprise and government environments worldwide."
      />
      <StructuredData 
        breadcrumbs={[
          { name: "Home", url: "/" }
        ]}
      />
      <Helmet>
        <link rel="canonical" href="https://munai.tech" />
        
        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="MunAiTech | AI Infrastructure & Cybersecurity" />
        <meta property="og:description" content="Production-grade AI infrastructure with embedded cybersecurity for enterprise and government environments worldwide." />
        <meta property="og:url" content="https://munai.tech" />
        <meta property="og:image" content="https://munai.tech/og-image.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="MunAiTech | AI Infrastructure & Cybersecurity" />
        <meta name="twitter:description" content="Production-grade AI infrastructure with embedded cybersecurity for enterprise and government." />
        <meta name="twitter:image" content="https://munai.tech/og-image.jpg" />
        
        {/* Organization structured data */}
        <script type="application/ld+json">
          {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "MunAiTech",
          "legalName": "15071995 LLC",
          "description": "Global AI Infrastructure & Cybersecurity Engineering Company",
          "url": "https://munai.tech",
           "email": "info@mymuna.store",  
          "sameAs": [
            "https://github.com/mymunastore",
            "https://www.linkedin.com/in/munaitech",
            "https://twitter.com/mymunastore"
          ],
           "address": {
            "@type": "PostalAddress",
            "addressLocality": "Ashland",
            "addressRegion": "Kentucky",
            "addressCountry": "US"
          },
          "knowsAbout": [
            "AI Infrastructure Engineering", "Cybersecurity Architecture", "Enterprise Systems",
            "Quantum-Ready Systems",
            "Cloud Infrastructure", "Agentic AI", "Zero-Trust Architecture"
          ]
        })}
        </script>
      </Helmet>
      
      <main id="main-content" className="min-h-screen bg-background relative z-0">
        <Navbar />
        <div id="hero">
          <Hero />
        </div>
        
        {/* Company Positioning — AI + Security + Infrastructure */}
        <CompanyPositioning />
        
        {/* Tech Marquee */}
        <TechMarquee />
        
        {/* Stats Counter */}
        <StatsCounter />
        
        {/* Global Operations */}
        <LazySection>
          <GlobalOperations />
        </LazySection>
        
        {/* Core Services / Capabilities */}
        <LazySection>
          <div id="services">
            <CoreCapabilities />
          </div>
        </LazySection>
        
        {/* Differentiation */}
        <LazySection>
          <Differentiation />
        </LazySection>
        
        {/* Innovation & Research */}
        <LazySection>
          <InnovationResearch />
        </LazySection>
        
        {/* Systems & Deployments (Case Studies) */}
        <LazySection>
          <div id="projects">
            <ProjectsShowcase />
          </div>
        </LazySection>
        
        {/* Impact & Results */}
        <LazySection>
          <ImpactResults />
        </LazySection>
        
        {/* Infrastructure & Technology Stack */}
        <LazySection>
          <div id="techstack">
            <TechStack />
          </div>
        </LazySection>
        
        {/* Client Logos */}
        <LazySection>
          <ClientLogos />
        </LazySection>
        
        {/* Testimonials */}
        <LazySection>
          <div id="testimonials">
            <Testimonials />
          </div>
        </LazySection>

        {/* Certifications — replaces removed International Recognition for balance */}
        <LazySection>
          <Certifications />
        </LazySection>
        
        {/* Insights & Research */}
        <LazySection>
          <ThoughtLeadership />
        </LazySection>
        
        {/* Final Positioning Statement */}
        <LazySection>
          <FinalPositioning />
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
