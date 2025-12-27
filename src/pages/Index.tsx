import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import CoreSkills from "@/components/CoreSkills";
import Footer from "@/components/Footer";
import { Helmet } from "react-helmet";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>Kingsley Munachi — Web Developer | Full-Stack Web & AI Developer</title>
        <meta name="description" content="Full-Stack Web & AI Developer with 5+ years of experience building scalable, production-ready web applications using React, Next.js, Node.js, and modern cloud technologies. Open to remote-first and Canada-based opportunities." />
        <meta name="keywords" content="Web Developer, Full-Stack Developer, React Developer, Next.js, Node.js, TypeScript, Canada, Remote, Kingsley Munachi" />
        <link rel="canonical" href="https://munai.tech" />
        
        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Kingsley Munachi — Web Developer" />
        <meta property="og:description" content="Full-Stack Web & AI Developer with 5+ years of experience. Open to remote-first and Canada-based opportunities." />
        <meta property="og:url" content="https://munai.tech" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Kingsley Munachi — Web Developer" />
        <meta name="twitter:description" content="Full-Stack Web & AI Developer with 5+ years of experience building scalable web applications." />
        
        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            "name": "Kingsley Munachi",
            "jobTitle": "Full-Stack Web & AI Developer",
            "description": "Full-Stack Web & AI Developer with 5+ years of experience building scalable, production-ready web applications.",
            "url": "https://munai.tech",
            "sameAs": [
              "https://github.com/mymunastore",
              "https://www.linkedin.com/in/kingsley-munachi-843591244"
            ],
            "knowsAbout": ["React", "Next.js", "Node.js", "TypeScript", "PostgreSQL", "AWS"]
          })}
        </script>
      </Helmet>
      
      <main id="main-content" className="min-h-screen bg-background">
        <Navbar />
        <Hero />
        <CoreSkills />
        <Footer />
      </main>
    </>
  );
};

export default Index;
