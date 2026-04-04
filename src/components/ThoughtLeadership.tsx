import { memo } from "react";
import { motion } from "framer-motion";
import { FileText, Lightbulb, FlaskConical, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";

const categories = [
  {
    icon: FileText,
    title: "AI Security",
    description: "Deep analysis of AI threat landscapes, adversarial attack patterns, and strategies for building resilient AI systems in production.",
    cta: "Read Articles",
    href: "/blog",
    gradient: "from-blue-500 to-cyan-500"
  },
  {
    icon: Lightbulb,
    title: "Enterprise Systems",
    description: "Strategic perspectives on designing, deploying, and scaling enterprise infrastructure for high-availability, mission-critical operations.",
    cta: "View Insights",
    href: "/blog",
    gradient: "from-purple-500 to-pink-500"
  },
  {
    icon: FlaskConical,
    title: "Infrastructure Thinking",
    description: "Research into distributed systems, quantum-ready architectures, edge computing, and the future of cloud-native infrastructure engineering.",
    cta: "Explore Research",
    href: "/blog",
    gradient: "from-green-500 to-emerald-500"
  },
];

const ThoughtLeadership = memo(() => {
  return (
    <section className="py-20 md:py-28 bg-background relative overflow-hidden">
      <div className="absolute inset-0 opacity-20" style={{ background: 'var(--gradient-mesh)' }} />
      
      <div className="container px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-semibold mb-4">
            Insights & Research
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
            Knowledge &{" "}
            <span className="bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
              Research
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Advancing the discourse on AI systems architecture, cybersecurity engineering, and enterprise infrastructure
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {categories.map((cat, index) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="group"
            >
              <div className="relative h-full p-8 rounded-2xl bg-card border border-border hover:border-accent/30 transition-all duration-300 hover:shadow-xl flex flex-col">
                <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br ${cat.gradient} mb-6 group-hover:scale-110 transition-transform shadow-lg`}>
                  <cat.icon className="w-7 h-7 text-white" />
                </div>
                
                <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-accent transition-colors">
                  {cat.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-6 flex-1">
                  {cat.description}
                </p>

                <Link to={cat.href}>
                  <Button variant="ghost" className="w-full group-hover:bg-accent/10 group-hover:text-accent">
                    {cat.cta}
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
});

ThoughtLeadership.displayName = "ThoughtLeadership";

export default ThoughtLeadership;
