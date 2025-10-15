import { ArrowRight } from "lucide-react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import heroBg from "@/assets/hero-bg.jpg";
import profileImage from "@/assets/profile.png";

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroBg}
          alt="AI Technology Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/90 via-primary/80 to-primary/70" />
      </div>

      {/* Content */}
      <div className="container relative z-10 px-4 sm:px-6 lg:px-8 py-20 md:py-32">
        <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto items-center">
          {/* Left Column - Text Content */}
          <div className="text-center md:text-left space-y-8">
            {/* Availability Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/20 border border-accent/30 backdrop-blur-sm animate-fade-in">
              <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <span className="text-sm font-medium text-primary-foreground">
                Available for New Projects
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-primary-foreground animate-fade-in leading-tight">
              Building Intelligent
              <br />
              <span className="bg-gradient-to-r from-accent via-blue-400 to-accent bg-clip-text text-transparent animate-gradient-shift bg-[length:200%_auto]">
                Digital Experiences
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg sm:text-xl text-primary-foreground/90 animate-fade-in font-light leading-relaxed">
              I craft AI-powered digital solutions that transform businesses, drive growth,
              and create lasting competitive advantages.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start items-center animate-slide-in-right">
              <Link to="/contact">
                <Button
                  size="lg"
                  className="bg-accent hover:bg-accent/90 text-primary shadow-lg hover:shadow-xl transition-all text-base px-8 py-6 group"
                >
                  Start Your Project
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/projects">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 backdrop-blur-sm text-base px-8 py-6"
                >
                  View Portfolio
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { number: "40+", label: "Projects Delivered" },
                { number: "50+", label: "Happy Clients" },
                { number: "8+", label: "Years Experience" },
                { number: "99%", label: "Satisfaction" },
              ].map((stat, index) => (
                <div
                  key={index}
                  className="backdrop-blur-sm bg-primary-foreground/10 rounded-lg p-4 border border-primary-foreground/20 hover:border-accent/50 transition-all"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="text-2xl font-bold text-accent mb-1">
                    {stat.number}
                  </div>
                  <div className="text-xs text-primary-foreground/80">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Profile Image */}
          <div className="relative hidden md:block animate-fade-in">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-accent/30 to-accent/10 rounded-3xl transform rotate-6 blur-xl"></div>
              <img 
                src={profileImage}
                alt="Kingsley - Full Stack Developer"
                className="relative rounded-3xl shadow-2xl w-full h-auto object-cover border-4 border-primary-foreground/20"
              />
              <div className="absolute -bottom-6 -right-6 bg-accent text-primary px-6 py-3 rounded-2xl shadow-xl">
                <div className="text-sm font-medium">Available for hire</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent z-10" />
    </section>
  );
};

export default Hero;
