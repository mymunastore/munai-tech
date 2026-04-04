import { ArrowRight, Shield } from "lucide-react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import heroBg from "@/assets/hero-bg.jpg";
import profileImage from "@/assets/profile-new.jpg";
import GitHubStatsDisplay from "./GitHubStatsDisplay";
import { memo } from "react";
import { motion } from "framer-motion";

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
            alt="AI Infrastructure & Cybersecurity Engineering"
            className="w-full h-full object-cover opacity-15"
            loading="eager"
            fetchPriority="high"
            width="1920"
            height="1080"
          />
        </picture>
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background/95 to-background" />
        <div className="absolute inset-0 opacity-40" style={{ background: 'var(--gradient-mesh)' }} />
      </div>

      {/* Animated background orbs */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ x: [0, 40, 0], y: [0, -30, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-1/4 w-72 h-72 bg-accent/10 rounded-full blur-[100px]"
        />
        <motion.div
          animate={{ x: [0, -30, 0], y: [0, 40, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px]"
        />
      </div>

      {/* Content */}
      <div className="container relative z-10 px-4 sm:px-6 lg:px-8 py-20 md:py-32">
        <div className="grid md:grid-cols-2 gap-8 lg:gap-16 max-w-6xl mx-auto items-center">
          {/* Left Column - Text Content */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center md:text-left space-y-6 lg:space-y-8"
          >
            {/* Availability Badge */}
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-accent/30 backdrop-blur-md"
              style={{ background: 'var(--gradient-glass)' }}
            >
              <div className="relative">
                <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                <div className="absolute inset-0 w-2 h-2 rounded-full bg-accent animate-ping" />
              </div>
              <span className="text-sm font-medium text-accent">
                Accepting Enterprise Engagements
              </span>
            </motion.div>

            {/* Main Heading */}
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground leading-[1.1] tracking-tight"
            >
              AI Systems Architect
              <br />
              Building Secure,
              <br />
              <span className="relative inline-block">
                <span className="bg-gradient-to-r from-accent via-primary to-accent bg-clip-text text-transparent animate-gradient-shift bg-[length:200%_auto]">
                  Scalable Infrastructure
                </span>
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-base sm:text-lg md:text-xl text-muted-foreground font-light leading-relaxed max-w-lg mx-auto md:mx-0"
            >
              Designing and deploying AI-driven systems with embedded cybersecurity 
              for enterprise and high-performance environments. 5+ years engineering 
              production-grade platforms for startups, enterprises, and government institutions.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start items-center"
            >
              <Link to="/contact" aria-label="Start an engagement with MunAiTech">
                <Button
                  size="lg"
                  className="bg-accent hover:bg-accent/90 text-accent-foreground shadow-lg shadow-accent/30 hover:shadow-accent/50 hover:shadow-xl transition-all text-base px-8 py-6 group font-semibold focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 rounded-xl"
                >
                  Start an Engagement
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                </Button>
              </Link>
              <Link to="/projects" aria-label="View Systems & Case Studies">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-accent/40 text-accent hover:bg-accent/10 hover:border-accent backdrop-blur-sm text-base px-8 py-6 focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 rounded-xl"
                >
                  View Case Studies
                </Button>
              </Link>
            </motion.div>

            {/* Stats - GitHub Stats */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="space-y-6"
            >
              <GitHubStatsDisplay />
            </motion.div>
          </motion.div>

          {/* Right Column - Profile Image */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative hidden md:block"
          >
            <div className="relative">
              {/* Animated gradient background */}
              <motion.div 
                animate={{ rotate: [6, 8, 6] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0 bg-gradient-to-br from-accent/30 via-primary/20 to-accent/10 rounded-3xl blur-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-tl from-accent/15 to-transparent rounded-3xl transform -rotate-3 blur-xl" />
              
              <picture>
                <source
                  type="image/webp"
                  srcSet={`${profileImage}?format=webp&w=400 400w, ${profileImage}?format=webp&w=600 600w, ${profileImage}?format=webp&w=896 896w`}
                  sizes="(min-width: 768px) 544px, 0px"
                />
                <img 
                  src={profileImage}
                  alt="MunAiTech — AI Systems Architect & Cybersecurity Engineer"
                  className="relative rounded-3xl shadow-2xl shadow-accent/20 w-full h-auto object-cover border-4 border-accent/20 hover:border-accent/40 transition-all duration-500"
                  loading="eager"
                  fetchPriority="high"
                  width="896"
                  height="1152"
                  decoding="async"
                />
              </picture>
              
              {/* Glassmorphism floating badge - bottom right */}
              <motion.div 
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-6 -right-6 backdrop-blur-xl border border-accent/30 px-6 py-3 rounded-2xl shadow-2xl"
                style={{ background: 'var(--gradient-glass)' }}
              >
                <div className="text-sm font-semibold bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">Open to Opportunities</div>
              </motion.div>
              
              {/* Tech stack floating badges with glassmorphism */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.7 }}
                className="absolute -top-4 -left-4 backdrop-blur-xl border border-accent/30 px-4 py-2 rounded-xl shadow-lg"
                style={{ background: 'var(--gradient-glass)' }}
              >
                <div className="flex items-center gap-1.5 text-xs font-semibold text-accent">
                  <Shield className="h-3 w-3" />
                  AI Systems Architect
                </div>
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.8 }}
                className="absolute top-1/4 -right-4 backdrop-blur-xl border border-accent/30 px-4 py-2 rounded-xl shadow-lg"
                style={{ background: 'var(--gradient-glass)' }}
              >
                <div className="text-xs font-semibold text-accent">Cybersecurity Engineer</div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-10" />
    </section>
  );
});

Hero.displayName = "Hero";

export default Hero;
