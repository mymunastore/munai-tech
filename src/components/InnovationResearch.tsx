import { memo } from "react";
import { motion } from "framer-motion";
import { FlaskConical, Atom, Satellite, BrainCircuit, Award, CheckCircle2 } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";

const initiatives = [
  {
    icon: Satellite,
    title: "Sovereign AI Infrastructure",
    description: "Engaged with Innovation, Science and Economic Development Canada (ISED) on sovereign AI data centre infrastructure — officially acknowledged for technical capability and innovation.",
    badge: "ISED Canada",
    status: "Acknowledged"
  },
  {
    icon: BrainCircuit,
    title: "LEO SATCOM Defence Systems",
    description: "Selected to participate in the Department of National Defence (DND) Innovative Solutions Canada program for Low Earth Orbit satellite communications in contested environments.",
    badge: "DND Canada",
    status: "Active Engagement"
  },
  {
    icon: Atom,
    title: "Quantum-Ready Architecture",
    description: "Developing systems with quantum-resistant cryptography and post-quantum security protocols to future-proof critical infrastructure against emerging computational threats.",
    badge: "R&D",
    status: "In Development"
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

        {/* International Recognition Callout */}
        <div className="mt-16 max-w-4xl mx-auto">
          <div className="p-8 rounded-2xl bg-card border border-accent/20 text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Award className="h-6 w-6 text-accent" />
              <h3 className="text-xl font-bold text-foreground">International Recognition</h3>
            </div>
            <p className="text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              MunAiTech has received <span className="text-accent font-semibold">two official recognitions from Canada</span> — 
              one of the world's leading technology nations — validating our innovation, talent, and capability 
              in sovereign AI infrastructure and defence communications. These invitations to participate in 
              national-level funding programs underscore the global impact of our work.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
});

InnovationResearch.displayName = "InnovationResearch";

export default InnovationResearch;
