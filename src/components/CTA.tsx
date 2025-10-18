import { ArrowRight, Check } from "lucide-react";
import { Button } from "./ui/button";

const CTA = () => {
  return (
    <section className="py-20 md:py-32 bg-gradient-to-br from-black via-gray-900 to-black relative overflow-hidden border-y border-cyan-500/20">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(34,211,238,0.1),transparent_50%)]" />
      </div>

      <div className="container relative z-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-block px-4 py-2 rounded-full bg-cyan-500/20 border border-cyan-400/40 backdrop-blur-sm mb-6">
            <span className="text-sm font-semibold text-cyan-400">
              Ready to Transform Your Business?
            </span>
          </div>

          {/* Heading */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Let&apos;s Build Something
            <br />
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-300 bg-clip-text text-transparent animate-gradient-shift bg-[length:200%_auto] drop-shadow-[0_0_20px_rgba(34,211,238,0.5)]">
              Extraordinary
            </span>
          </h2>

          {/* Description */}
          <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed">
            Transform your vision into reality with AI-powered solutions that drive growth,
            increase efficiency, and create lasting competitive advantages.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <a href="/contact">
              <Button
                size="lg"
                className="bg-cyan-500 hover:bg-cyan-600 text-black shadow-lg shadow-cyan-500/50 hover:shadow-cyan-500/70 transition-all text-base sm:text-lg px-8 py-6 group font-semibold"
              >
                Start Your Project Today
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </a>
            <a href="/calculator">
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/10 hover:border-cyan-400 backdrop-blur-sm text-base sm:text-lg px-8 py-6"
              >
                Get Free Estimate
              </Button>
            </a>
          </div>

          {/* Trust Badges */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-6 text-gray-300">
            {[
              "100% Satisfaction Guarantee",
              "24-48h Response Time",
              "Premium Quality Assured",
            ].map((badge, index) => (
              <div key={index} className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-cyan-500/20 flex items-center justify-center border border-cyan-400/30">
                  <Check className="w-3 h-3 text-cyan-400" />
                </div>
                <span className="text-sm font-medium">{badge}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
