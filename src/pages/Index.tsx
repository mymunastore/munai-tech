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
      <SEO 
        title="Kingsley Munachi | Web Developer | Full-Stack & AI Developer"
        description="Kingsley Munachi is a Web Developer with 5+ years of experience building scalable web applications using React, Next.js, Node.js, and TypeScript. Open to remote and Canada-based opportunities."
      />
      <Helmet>
        <link rel="canonical" href="https://munai.tech" />
        
        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Kingsley Munachi | Web Developer | Full-Stack & AI Developer" />
        <meta property="og:description" content="Web Developer with 5+ years experience. Specializing in React, Next.js, Node.js, TypeScript. Open to remote and Canada-based opportunities." />
        <meta property="og:url" content="https://munai.tech" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Kingsley Munachi | Web Developer" />
        <meta name="twitter:description" content="Web Developer with 5+ years experience in React, Next.js, Node.js. Open to remote opportunities." />
        
        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          "name": "Kingsley Munachi",
          "jobTitle": "Web Developer",
          "description": "Full-Stack Web & AI Developer with 5+ years of experience",
          "url": "https://munai.tech",
          "email": "info@mymuna.store",
          "sameAs": [
            "https://github.com/mymunastore",
            "https://www.linkedin.com/in/kingsley-munachi-843591244",
            "https://twitter.com/mymunastore"
          ],
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Lagos",
            "addressCountry": "Nigeria"
          },
          "knowsAbout": [
            "React", "Next.js", "Node.js", "TypeScript", "JavaScript",
            "PostgreSQL", "MongoDB", "AWS", "REST APIs", "AI Integration"
          ]
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