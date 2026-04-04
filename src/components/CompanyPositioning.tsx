import { memo } from "react";
import { motion } from "framer-motion";
import { Brain, Shield, Server } from "lucide-react";

const pillars = [
  { icon: Brain, label: "Artificial Intelligence", description: "Intelligent systems, agentic workflows, and LLM-powered platforms" },
  { icon: Shield, label: "Cybersecurity", description: "Embedded threat modeling, identity verification, and secure architecture" },
  { icon: Server, label: "Infrastructure", description: "Cloud-native, production-grade systems built for scale and resilience" },
];

const CompanyPositioning = memo(() => {
  return (
    <section className="py-20 md:py-28 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-primary/[0.03] via-transparent to-primary/[0.03]" />
      
      <div className="container px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-6">
            <Shield className="h-4 w-4" />
            Enterprise AI & Cybersecurity
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
            An AI Infrastructure &{" "}
            <span className="bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
              Cybersecurity Engineering
            </span>{" "}
            Company
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
            MunAiTech is focused on building production-grade intelligent systems. 
            We operate at the intersection of AI, Security, and Infrastructure — 
            engineering platforms that are secure by design, intelligent by default, 
            and built for enterprise-scale deployment.
          </p>
        </motion.div>

        {/* Three Pillars */}
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {pillars.map((pillar, index) => (
            <motion.div
              key={pillar.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="group text-center"
            >
              <div className="relative p-8 rounded-2xl bg-card border border-border hover:border-accent/40 transition-all duration-300 hover:shadow-xl hover:shadow-accent/10">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-accent/20 to-primary/20 mb-6 group-hover:scale-110 transition-transform">
                  <pillar.icon className="w-8 h-8 text-accent" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-accent transition-colors">
                  {pillar.label}
                </h3>
                <p className="text-muted-foreground leading-relaxed text-sm">
                  {pillar.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
});

CompanyPositioning.displayName = "CompanyPositioning";

export default CompanyPositioning;
