import { ArrowRight } from "lucide-react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import heroBg from "@/assets/hero-bg.jpg";
import profileImage from "@/assets/profile.png";

import { memo } from "react";

const Hero = memo(() => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroBg}
          alt="AI Technology Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/95 via-blue-800/90 to-cyan-700/85" />
      </div>

      {/* Content */}
      <div className="container relative z-10 px-4 sm:px-6 lg:px-8 py-20 md:py-32">
        <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto items-center">
          {/* Left Column - Text Content */}
          <div className="text-center md:text-left space-y-8">
            {/* Availability Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/20 border border-cyan-400/40 backdrop-blur-sm animate-fade-in">
              <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <span className="text-sm font-medium text-white">
                Available for New Projects
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white animate-fade-in leading-tight">
              Welcome to my digital workspace.
              <br />
              <span className="bg-gradient-to-r from-cyan-300 via-blue-300 to-indigo-300 bg-clip-text text-transparent animate-gradient-shift bg-[length:200%_auto]">
                I&apos;m Kingsley Munachi
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg sm:text-xl text-white/90 animate-fade-in font-light leading-relaxed">
              A senior web designer and AI full-stack app developer. I specialize in crafting intelligent, 
              scalable solutions that blend design precision with cutting-edge technology. 
              Let&apos;s build something extraordinary together.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start items-center animate-slide-in-right">
              <Link to="/contact">
                <Button
                  size="lg"
                  className="bg-cyan-500 hover:bg-cyan-600 text-white shadow-lg hover:shadow-xl transition-all text-base px-8 py-6 group"
                >
                  Start Your Project
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/projects">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-white/30 text-white hover:bg-white/10 backdrop-blur-sm text-base px-8 py-6"
                >
                  View Portfolio
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 sm:gap-6">
            {[
              { number: "30+", label: "AI Projects Delivered" },
              { number: "30+", label: "Enterprise Clients" },
              { number: "5+", label: "Years of Expertise" },
              { number: "99%", label: "Success Rate" },
            ].map((stat, index) => (
                <div
                  key={index}
                  className="group backdrop-blur-sm bg-white/10 rounded-xl p-5 border border-white/20 hover:border-cyan-400/60 hover:bg-white/15 transition-all duration-300 cursor-default"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="text-3xl sm:text-4xl font-bold text-cyan-300 mb-2 group-hover:scale-110 transition-transform">
                    {stat.number}
                  </div>
                  <div className="text-xs sm:text-sm text-white/90 font-medium">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Profile Image */}
          <div className="relative hidden md:block animate-fade-in">
            <div className="relative">
              {/* Animated gradient background */}
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/40 via-blue-500/30 to-indigo-400/20 rounded-3xl transform rotate-6 blur-2xl animate-pulse"></div>
              <div className="absolute inset-0 bg-gradient-to-tl from-cyan-400/20 to-transparent rounded-3xl transform -rotate-3 blur-xl"></div>
              
              <img 
                src={profileImage}
                alt="Kingsley Munachi - Senior Web Designer & AI Full-Stack Developer"
                className="relative rounded-3xl shadow-2xl w-full h-auto object-cover border-4 border-white/30 hover:border-cyan-400/50 transition-all duration-500"
              />
              
              {/* Availability badge */}
              <div className="absolute -bottom-8 -right-8 bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-8 py-4 rounded-2xl shadow-2xl animate-pulse">
                <div className="text-base font-semibold">Open to Opportunities</div>
              </div>
              
              {/* Tech stack floating badges */}
              <div className="absolute -top-4 -left-4 bg-background/90 backdrop-blur-sm border border-cyan-400/40 px-4 py-2 rounded-xl shadow-lg">
                <div className="text-xs font-semibold text-cyan-400">Senior Web Designer</div>
              </div>
              <div className="absolute top-1/4 -right-4 bg-background/90 backdrop-blur-sm border border-cyan-400/40 px-4 py-2 rounded-xl shadow-lg">
                <div className="text-xs font-semibold text-cyan-400">AI Full-Stack Dev</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent z-10" />
    </section>
  );
});

Hero.displayName = "Hero";

export default Hero;
