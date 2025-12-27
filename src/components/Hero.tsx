import { ArrowRight } from "lucide-react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import heroBg from "@/assets/hero-bg.jpg";
import profileImage from "@/assets/profile-new.jpg";
import GitHubStatsDisplay from "./GitHubStatsDisplay";
import { memo } from "react";

const Hero = memo(() => {

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <picture>
          <source
            type="image/webp"
            srcSet={`${heroBg}?format=webp&w=800 800w, ${heroBg}?format=webp&w=1200 1200w, ${heroBg}?format=webp&w=1920 1920w`}
            sizes="100vw"
          />
          <img
            src={heroBg}
            alt="AI Technology Background showcasing modern development workspace"
            className="w-full h-full object-cover opacity-20"
            loading="eager"
            fetchPriority="high"
            width="1920"
            height="1080"
          />
        </picture>
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black" />
      </div>

      {/* Content */}
      <div className="container relative z-10 px-4 sm:px-6 lg:px-8 py-20 md:py-32">
        <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto items-center">
          {/* Left Column - Text Content */}
          <div className="text-center md:text-left space-y-8">
            {/* Availability Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/20 border border-cyan-400/40 backdrop-blur-sm animate-fade-in">
              <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_10px_rgba(34,211,238,0.8)]" />
              <span className="text-sm font-medium text-cyan-400">
                Available for New Projects
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white animate-fade-in leading-tight">
              Welcome to my digital workspace.
              <br />
              <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-300 bg-clip-text text-transparent animate-gradient-shift bg-[length:200%_auto] drop-shadow-[0_0_30px_rgba(34,211,238,0.5)]">
                I&apos;m Kingsley
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg sm:text-xl text-gray-300 animate-fade-in font-light leading-relaxed mb-8">
              A senior web designer and AI full-stack app developer. I specialize in crafting intelligent, 
              scalable solutions that blend design precision with cutting-edge technology. 
              Let&apos;s build something extraordinary together.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start items-center animate-slide-in-right">
              <Link to="/contact" aria-label="Start your project with Kingsley Munachi">
                <Button
                  size="lg"
                  className="bg-cyan-500 hover:bg-cyan-600 text-black shadow-lg shadow-cyan-500/50 hover:shadow-cyan-500/70 transition-all text-base px-8 py-6 group font-semibold focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2"
                >
                  Start Your Project
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                </Button>
              </Link>
              <Link to="/projects" aria-label="View Portfolio">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/10 hover:border-cyan-400 backdrop-blur-sm text-base px-8 py-6 focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2"
                >
                  View Portfolio
                </Button>
              </Link>
            </div>

            {/* Stats - GitHub Stats */}
            <div className="space-y-6">
              <GitHubStatsDisplay />
            </div>
          </div>

          {/* Right Column - Profile Image */}
          <div className="relative hidden md:block animate-fade-in">
            <div className="relative">
              {/* Animated gradient background */}
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/30 via-blue-500/20 to-cyan-400/10 rounded-3xl transform rotate-6 blur-2xl animate-pulse"></div>
              <div className="absolute inset-0 bg-gradient-to-tl from-cyan-400/15 to-transparent rounded-3xl transform -rotate-3 blur-xl"></div>
              
              <picture>
                <source
                  type="image/webp"
                  srcSet={`${profileImage}?format=webp&w=400 400w, ${profileImage}?format=webp&w=600 600w, ${profileImage}?format=webp&w=896 896w`}
                  sizes="(min-width: 768px) 544px, 0px"
                />
                <img 
                  src={profileImage}
                  alt="Kingsley Munachi - Senior Web Designer & AI Full-Stack Developer specializing in modern web applications"
                  className="relative rounded-3xl shadow-2xl shadow-cyan-500/20 w-full h-auto object-cover border-4 border-cyan-500/30 hover:border-cyan-400/60 transition-all duration-500"
                  loading="eager"
                  fetchPriority="high"
                  width="896"
                  height="1152"
                  decoding="async"
                />
              </picture>
              
              {/* Availability badge */}
              <div className="absolute -bottom-8 -right-8 bg-gradient-to-r from-cyan-500 to-blue-500 text-black px-8 py-4 rounded-2xl shadow-2xl shadow-cyan-500/50 animate-pulse">
                <div className="text-base font-semibold">Open to Opportunities</div>
              </div>
              
              {/* Tech stack floating badges */}
              <div className="absolute -top-4 -left-4 bg-black/90 backdrop-blur-sm border border-cyan-400/50 px-4 py-2 rounded-xl shadow-lg shadow-cyan-500/30">
                <div className="text-xs font-semibold text-cyan-400">Senior Web Designer</div>
              </div>
              <div className="absolute top-1/4 -right-4 bg-black/90 backdrop-blur-sm border border-cyan-400/50 px-4 py-2 rounded-xl shadow-lg shadow-cyan-500/30">
                <div className="text-xs font-semibold text-cyan-400">AI Full-Stack Dev</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black to-transparent z-10" />
    </section>
  );
});

Hero.displayName = "Hero";

export default Hero;
