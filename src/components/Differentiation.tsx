import { memo } from "react";
import { motion } from "framer-motion";
import { ShieldAlert, Brain, Server } from "lucide-react";

const differentiators = [
  {
    icon: Brain,
    title: "AI + Cybersecurity Integration",
    description: "Every system we build embeds security into the AI layer — not as an afterthought, but as a core architectural principle.",
  },
  {
    icon: ShieldAlert,
    title: "Simulation-Driven Security",
    description: "We use adversarial simulation and threat modeling to stress-test systems before deployment, identifying vulnerabilities proactively.",
  },
  {
    icon: Server,
    title: "Production-Grade Infrastructure",
    description: "We don't build demos. Every system is designed for production — with observability, fault tolerance, and enterprise SLAs in mind.",
  },
];

const Differentiation = memo(() => {
  return (
    <section className="py-20 md:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.05] via-transparent to-accent/[0.05]" />
      
      <div className="container px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-semibold mb-4">
            Our Edge
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4 leading-tight">
            AI Without Security is{" "}
            <span className="bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">Risk</span>.
            <br />
            Security Without Intelligence is{" "}
            <span className="bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">Limited</span>.
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We engineer at the intersection — where intelligent systems meet hardened security.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {differentiators.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="group"
            >
              <div className="relative h-full p-8 rounded-2xl bg-card border border-border hover:border-accent/40 transition-all duration-300 hover:shadow-2xl hover:shadow-accent/10 overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-accent to-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                
                <div className="relative">
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-accent/10 mb-6 group-hover:bg-accent/20 group-hover:scale-110 transition-all">
                    <item.icon className="w-7 h-7 text-accent" />
                  </div>
                  
                  <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-accent transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
});

Differentiation.displayName = "Differentiation";

export default Differentiation;
