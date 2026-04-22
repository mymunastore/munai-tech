import { Check, Mail } from "lucide-react";

const CTA = () => {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-background via-secondary/50 to-background relative overflow-hidden border-y border-accent/20">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,hsl(var(--accent)/0.15),transparent_50%)]" />
      </div>

      <div className="container relative z-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-block px-4 py-2 rounded-full bg-accent/20 border border-accent/40 backdrop-blur-sm mb-6">
            <span className="text-sm font-semibold text-accent">
              Ready to Build Secure, Intelligent Systems?
            </span>
          </div>

          {/* Heading */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
            Work with MunAiTech to
            <br />
            <span className="bg-gradient-to-r from-accent via-primary to-accent bg-clip-text text-transparent animate-gradient-shift bg-[length:200%_auto]">
              Design & Deploy
            </span>
          </h2>

          {/* Description */}
          <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
            Work with MunAiTech to design and deploy secure, intelligent systems 
            that drive operational excellence and lasting competitive advantage.
          </p>

          {/* Contact Button */}
          <div className="mb-10">
            <a 
              href="mailto:info@mymuna.store?subject=Project%20Inquiry%20-%20MunAiTech" 
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-accent hover:bg-accent/90 text-accent-foreground font-semibold text-lg transition-all shadow-lg shadow-accent/30 hover:shadow-accent/50"
            >
              <Mail className="h-5 w-5" />
              Reach Out Now
            </a>
          </div>

          {/* Trust Badges */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-6 text-muted-foreground">
            {["Production-Grade Systems", "24-48h Response Time", "Enterprise Security Standards"].map((badge, index) => (
              <div key={index} className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-accent/20 flex items-center justify-center border border-accent/30">
                  <Check className="w-3 h-3 text-accent" />
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
