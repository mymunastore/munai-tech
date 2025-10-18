import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
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
import StatsSection from "@/components/StatsSection";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>Kingsley Munachi - AI Web App Designer & Full-Stack Developer</title>
        <meta name="description" content="Expert full-stack developer specializing in TypeScript, React, and AI-powered solutions. View my portfolio of innovative web applications." />
        <meta name="keywords" content="Full-Stack Developer, TypeScript, React, AI Developer, Web Development, Portfolio" />
        <link rel="canonical" href="https://yourdomain.com" />
        
        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Kingsley Munachi - AI Web App Designer & Full-Stack Developer" />
        <meta property="og:description" content="Expert full-stack developer specializing in TypeScript, React, and AI-powered solutions." />
        <meta property="og:url" content="https://yourdomain.com" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Kingsley Munachi - AI Web App Designer & Full-Stack Developer" />
        <meta name="twitter:description" content="Expert full-stack developer specializing in TypeScript, React, and AI-powered solutions." />
        
        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            "name": "Kingsley Munachi",
            "jobTitle": "AI Web App Designer & Full-Stack Developer",
            "url": "https://yourdomain.com",
            "sameAs": [
              "https://github.com/mymunastore",
              "https://www.linkedin.com/in/kingsley-munachi-843591244",
              "https://twitter.com/mymunastore"
            ]
          })}
        </script>
      </Helmet>
      
      <div className="min-h-screen">
        <Navbar />
        <Hero />
        <StatsSection />
        <Services />
        <ProjectsShowcase />
        <TechStack />
        <Skills />
        <Timeline />
        <Certifications />
        <ClientLogos />
        <Testimonials />
        <Newsletter />
        <FAQ />
        <CTA />
        <Footer />
      </div>
    </>
  );
};

export default Index;
