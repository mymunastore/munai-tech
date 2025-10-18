import { ArrowRight } from "lucide-react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import heroBg from "@/assets/hero-bg.jpg";
import profileImage from "@/assets/profile.png";
import GitHubStatsDisplay from "./GitHubStatsDisplay";
import { memo, useEffect } from "react";
import { syncGitHubData } from "@/hooks/useGitHubData";
import { useToast } from "./ui/use-toast";

const Hero = memo(() => {
  const { toast } = useToast();

  // Sync GitHub data on mount
  useEffect(() => {
    const syncData = async () => {
      try {
        await syncGitHubData();
        console.log("GitHub data synced successfully");
      } catch (error) {
        console.error("Failed to sync GitHub data:", error);
      }
    };

    syncData();
    
    // Set up periodic sync every 15 minutes
    const interval = setInterval(syncData, 15 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroBg}
          alt="AI Technology Background"
          className="w-full h-full object-cover opacity-20"
        />
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
                I&apos;m Kingsley Munachi
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
              <Link to="/contact">
                <Button
                  size="lg"
                  className="bg-cyan-500 hover:bg-cyan-600 text-black shadow-lg shadow-cyan-500/50 hover:shadow-cyan-500/70 transition-all text-base px-8 py-6 group font-semibold"
                >
                  Start Your Project
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/projects">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/10 hover:border-cyan-400 backdrop-blur-sm text-base px-8 py-6"
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
              
              <img 
                src={profileImage}
                alt="Kingsley Munachi - Senior Web Designer & AI Full-Stack Developer"
                className="relative rounded-3xl shadow-2xl shadow-cyan-500/20 w-full h-auto object-cover border-4 border-cyan-500/30 hover:border-cyan-400/60 transition-all duration-500"
              />
              
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
