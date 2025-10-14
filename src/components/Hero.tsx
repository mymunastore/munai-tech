import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "./ui/button";
import heroBg from "@/assets/hero-bg.jpg";

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
        <div className="max-w-4xl mx-auto text-center">
          {/* Availability Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/20 border border-accent/30 backdrop-blur-sm mb-8 animate-fade-in">
            <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span className="text-sm font-medium text-primary-foreground">
              Available for New Projects
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-primary-foreground mb-6 animate-fade-in leading-tight">
            Building Intelligent
            <br />
            <span className="bg-gradient-to-r from-accent via-blue-400 to-accent bg-clip-text text-transparent animate-gradient-shift bg-[length:200%_auto]">
              Digital Experiences
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl md:text-2xl text-primary-foreground/90 mb-10 max-w-3xl mx-auto animate-fade-in font-light leading-relaxed">
            I craft AI-powered digital solutions that transform businesses, drive growth,
            and create lasting competitive advantages.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-slide-in-right">
            <Button
              size="lg"
              className="bg-accent hover:bg-accent/90 text-primary shadow-lg hover:shadow-xl transition-all text-base sm:text-lg px-8 py-6 group"
            >
              Start Your Project
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 backdrop-blur-sm text-base sm:text-lg px-8 py-6"
            >
              View Portfolio
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mt-16 md:mt-20">
            {[
              { number: "40+", label: "Projects Delivered" },
              { number: "50+", label: "Happy Clients" },
              { number: "4+", label: "Years Experience" },
              { number: "99.5%", label: "Satisfaction" },
            ].map((stat, index) => (
              <div
                key={index}
                className="backdrop-blur-sm bg-primary-foreground/10 rounded-lg p-4 border border-primary-foreground/20 hover:border-accent/50 transition-all"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="text-2xl md:text-3xl font-bold text-accent mb-1">
                  {stat.number}
                </div>
                <div className="text-xs md:text-sm text-primary-foreground/80">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent z-10" />
    </section>
  );
};

export default Hero;
