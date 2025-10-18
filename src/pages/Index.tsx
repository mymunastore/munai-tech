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
import { AIChat } from "@/components/AIChat";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <Services />
      <ProjectsShowcase />
      <TechStack />
      <ClientLogos />
      <Testimonials />
      <Newsletter />
      <FAQ />
      <CTA />
      <Footer />
      <AIChat />
    </div>
  );
};

export default Index;
