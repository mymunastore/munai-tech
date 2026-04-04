import { ArrowRight, Shield, Cpu, Lock } from "lucide-react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import heroBg from "@/assets/hero-bg.jpg";
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
            className="w-full h-full object-cover opacity-10"
            loading="eager"
            fetchPriority="high"
            width="1920"
            height="1080"
          />
        </picture>
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background/95 to-background" />
        <div className="absolute inset-0 opacity-30" style={{ background: 'var(--gradient-mesh)' }} />
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
        <div className="max-w-5xl mx-auto text-center space-y-8 lg:space-y-10">
          {/* Company Badge */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-accent/30 backdrop-blur-md"
            style={{ background: 'var(--gradient-glass)' }}
          >
            <div className="relative">
              <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <div className="absolute inset-0 w-2 h-2 rounded-full bg-accent animate-ping" />
            </div>
            <span className="text-sm font-medium text-accent">
              Accepting Enterprise & Government Engagements
            </span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground leading-[1.1] tracking-tight"
          >
            We Build Secure,
            <br />
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-accent via-primary to-accent bg-clip-text text-transparent animate-gradient-shift bg-[length:200%_auto]">
                Intelligent Systems
              </span>
            </span>
            <br />
            <span className="text-muted-foreground text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-semibold">
              for Enterprise & Government
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-base sm:text-lg md:text-xl text-muted-foreground font-light leading-relaxed max-w-3xl mx-auto"
          >
            MunAiTech is an AI infrastructure and cybersecurity engineering company. 
            We design and deploy production-grade intelligent systems with embedded security 
            for startups, enterprises, and government institutions.
          </motion.p>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45 }}
            className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground"
          >
            <div className="flex items-center gap-2">
              <Cpu className="h-4 w-4 text-accent" />
              <span>30+ Systems Delivered</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-accent" />
              <span>Zero-Trust Architecture</span>
            </div>
            <div className="flex items-center gap-2">
              <Lock className="h-4 w-4 text-accent" />
              <span>Enterprise-Grade Security</span>
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
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
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-10" />
    </section>
  );
});

Hero.displayName = "Hero";

export default Hero;
