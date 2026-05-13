import { memo } from "react";
import { motion } from "framer-motion";
import { FlaskConical, Atom, Satellite, BrainCircuit, CheckCircle2 } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";

const initiatives = [
  {
    icon: Atom,
    title: "Quantum-Ready Architecture",
    description: "Developing systems with quantum-resistant cryptography and post-quantum security protocols to future-proof critical infrastructure against emerging computational threats.",
    badge: "R&D",
    status: "In Development"
  },
  {
    icon: BrainCircuit,
    title: "Commercial AI Software Platforms",
    description: "Building and commercializing production-grade AI software products for enterprises — packaged platforms, licensed tools, and SaaS offerings engineered by MunAiTech.",
    badge: "Product",
    status: "Active"
  },
  {
    icon: Satellite,
    title: "Secure Infrastructure Engineering",
    description: "Designing zero-trust, cloud-native infrastructure with auditable governance — ready for regulated industries and high-security environments.",
    badge: "Platform",
    status: "Active"
  },
];

const InnovationResearch = memo(() => {
  return (
    <section className="py-16 md:py-24 bg-muted/30 relative overflow-hidden">
      <div className="absolute inset-0 opacity-20" style={{ background: 'var(--gradient-mesh)' }} />

      <div className="container px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-semibold mb-4">
            <FlaskConical className="h-4 w-4" />
            Innovation & Research
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
            Advancing Global{" "}
            <span className="bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
              Technology Frontiers
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            MunAiTech actively engages in advanced technology initiatives, research programs, 
            and innovation funding opportunities. We develop systems aligned with emerging global 
            priorities such as sovereign AI infrastructure, secure communications, and intelligent automation.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {initiatives.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 1, y: 0 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
            >
              <Card className="group h-full border-border hover:border-accent/30 transition-all duration-300 hover:shadow-xl overflow-hidden">
                <div className="h-1.5 bg-gradient-to-r from-accent via-primary to-accent" />
                <CardContent className="p-8">
                  <div className="flex items-center justify-between mb-6 flex-wrap gap-2">
                    <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-accent/10 group-hover:bg-accent/20 group-hover:scale-110 transition-all">
                      <item.icon className="w-7 h-7 text-accent" />
                    </div>
                    <div className="flex gap-2">
                      <Badge variant="outline" className="text-xs border-accent/30 text-accent">
                        {item.badge}
                      </Badge>
                      <Badge className="bg-green-500/10 text-green-500 border-green-500/20 text-xs">
                        <CheckCircle2 className="h-3 w-3 mr-1" />
                        {item.status}
                      </Badge>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-accent transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
});

InnovationResearch.displayName = "InnovationResearch";

export default InnovationResearch;
