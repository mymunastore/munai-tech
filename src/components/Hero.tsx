import { ArrowRight, Download } from "lucide-react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import profileImage from "@/assets/profile-new.jpg";

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center bg-background">
      <div className="container relative z-10 px-4 sm:px-6 lg:px-8 py-20 md:py-32">
        <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto items-center">
          {/* Left Column - Text Content */}
          <div className="text-center md:text-left space-y-6">
            {/* Main Heading - H1 for SEO */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-foreground leading-tight">
              Kingsley Munachi — Web Developer
            </h1>

            {/* Subheading */}
            <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed">
              Full-Stack Web & AI Developer with 5+ years of experience building scalable, production-ready web applications using React, Next.js, Node.js, and modern cloud technologies.
            </p>

            {/* Availability Line */}
            <p className="text-base text-primary font-medium">
              Open to remote-first and Canada-based opportunities.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start items-center pt-4">
              <Link to="/projects" aria-label="View Projects">
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg transition-all text-base px-8 py-6 font-semibold"
                >
                  View Projects
                  <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
                </Button>
              </Link>
              <a href="/resume" aria-label="Download Resume">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-primary/50 text-foreground hover:bg-primary/10 text-base px-8 py-6"
                >
                  <Download className="mr-2 h-5 w-5" aria-hidden="true" />
                  Download Resume
                </Button>
              </a>
            </div>
          </div>

          {/* Right Column - Profile Image */}
          <div className="relative hidden md:block">
            <img 
              src={profileImage}
              alt="Kingsley Munachi - Full-Stack Web Developer"
              className="rounded-2xl shadow-xl w-full h-auto object-cover border-2 border-border"
              loading="eager"
              width="500"
              height="600"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
