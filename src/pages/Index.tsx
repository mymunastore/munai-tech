import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import { SEO } from "@/components/SEO";
import { StructuredData } from "@/components/StructuredData";
import { usePageTracking } from "@/hooks/usePageTracking";
import Services from "@/components/Services";
import TechStack from "@/components/TechStack";
import Testimonials from "@/components/Testimonials";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import ProjectsShowcase from "@/components/ProjectsShowcase";
import ClientLogos from "@/components/ClientLogos";
import FAQ from "@/components/FAQ";
import { Helmet } from "react-helmet";
import Skills from "@/components/Skills";
import Timeline from "@/components/Timeline";
import Certifications from "@/components/Certifications";
import GitHubRepositories from "@/components/GitHubRepositories";
import LazySection from "@/components/LazySection";
import StatsCounter from "@/components/StatsCounter";
import TechMarquee from "@/components/TechMarquee";
import ValueProposition from "@/components/ValueProposition";
import GovernmentEngagements from "@/components/GovernmentEngagements";
import CompanyPositioning from "@/components/CompanyPositioning";
import CoreCapabilities from "@/components/CoreCapabilities";
import Differentiation from "@/components/Differentiation";
import ThoughtLeadership from "@/components/ThoughtLeadership";

const Index = () => {
  usePageTracking();
  return <>
      <SEO 
        title="MunAiTech | AI Systems Architecture & Cybersecurity Engineering"
        description="MunAiTech is an AI infrastructure and cybersecurity engineering company. We design and deploy production-grade intelligent systems with embedded security for enterprise environments."
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
        <meta property="og:title" content="MunAiTech | AI Systems Architecture & Cybersecurity Engineering" />
        <meta property="og:description" content="AI infrastructure and cybersecurity engineering company building production-grade intelligent systems for enterprise environments." />
        <meta property="og:url" content="https://munai.tech" />
        <meta property="og:image" content="https://munai.tech/og-image.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="MunAiTech | AI Systems Architecture & Cybersecurity Engineering" />
        <meta name="twitter:description" content="AI infrastructure and cybersecurity engineering. Production-grade intelligent systems for enterprise." />
        <meta name="twitter:image" content="https://munai.tech/og-image.jpg" />
        
        {/* Organization structured data */}
        <script type="application/ld+json">
          {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "MunAiTech",
          "founder": {
            "@type": "Person",
            "name": "Kingsley Munachi",
            "jobTitle": "AI Systems Architect & Cybersecurity Engineer"
          },
          "description": "AI Infrastructure & Cybersecurity Engineering Company",
          "url": "https://munai.tech",
          "email": "hello@munai.tech",
          "sameAs": [
            "https://github.com/mymunastore",
            "https://www.linkedin.com/in/kingsley-munachi-843591244",
            "https://twitter.com/mymunastore"
          ],
          "address": {
            "@type": "PostalAddress",
            "addressRegion": "Kentucky",
            "addressCountry": "US"
          },
          "knowsAbout": [
            "AI System Architecture", "Cybersecurity Engineering", "Enterprise SaaS",
            "Cloud Infrastructure", "Agentic AI", "React", "Next.js", "Node.js", "TypeScript",
            "PostgreSQL", "AWS", "Threat Modeling", "Zero-Trust Architecture"
          ]
        })}
        </script>
      </Helmet>
      
      <main id="main-content" className="min-h-screen bg-background">
        <Navbar />
        <div id="hero">
          <Hero />
        </div>
        
        {/* Company Positioning */}
        <CompanyPositioning />
        
        {/* Tech Marquee */}
        <TechMarquee />
        
        {/* Stats Counter */}
        <StatsCounter />
        
        {/* Government & Institutional Engagements */}
        <LazySection>
          <GovernmentEngagements />
        </LazySection>
        
        {/* Core Capabilities */}
        <LazySection>
          <CoreCapabilities />
        </LazySection>
        
        <div id="services">
          <Services />
        </div>
        
        {/* Value Proposition */}
        <LazySection>
          <ValueProposition />
        </LazySection>
        
        {/* Differentiation */}
        <LazySection>
          <Differentiation />
        </LazySection>
        
        <LazySection>
          <div id="projects">
            <ProjectsShowcase />
          </div>
        </LazySection>
        
        <LazySection>
          <section className="py-20 bg-gradient-to-b from-background via-muted/30 to-background border-y border-border">
            <div className="container px-4">
              <div className="max-w-6xl mx-auto">
                <div className="text-center mb-12">
                  <span className="inline-block px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-semibold mb-4">
                    Open Source
                  </span>
                  <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                    GitHub <span className="bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">Projects</span>
                  </h2>
                  <p className="text-muted-foreground max-w-2xl mx-auto">
                    Explore our latest repositories and open-source contributions
                  </p>
                </div>
                <GitHubRepositories limit={6} showHeader={false} />
              </div>
            </div>
          </section>
        </LazySection>
        
        <LazySection>
          <div id="techstack">
            <TechStack />
          </div>
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
          <div id="testimonials">
            <Testimonials />
          </div>
        </LazySection>
        
        {/* Thought Leadership */}
        <LazySection>
          <ThoughtLeadership />
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
