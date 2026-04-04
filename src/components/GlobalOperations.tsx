import { memo } from "react";
import { motion } from "framer-motion";
import { Globe, Building2, Landmark, Shield } from "lucide-react";

const regions = [
  {
    icon: Building2,
    region: "North America",
    description: "Enterprise and government systems across the United States and Canada.",
  },
  {
    icon: Landmark,
    region: "Africa & Emerging Markets",
    description: "Scalable infrastructure for institutions operating in high-growth regions.",
  },
  {
    icon: Shield,
    region: "Global Remote Delivery",
    description: "Distributed engineering teams delivering secure systems worldwide.",
  },
];

const GlobalOperations = memo(() => {
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
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-semibold mb-6">
            <Globe className="h-4 w-4" />
            Global Presence
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
            Operating{" "}
            <span className="bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
              Internationally
            </span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
            MunAiTech operates internationally, delivering AI and cybersecurity systems 
            across multiple regions. We collaborate with enterprises, institutions, and 
            government bodies to develop scalable infrastructure aligned with global 
            standards and regulatory requirements.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {regions.map((item, index) => (
            <motion.div
              key={item.region}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="group text-center"
            >
              <div className="relative p-8 rounded-2xl bg-card border border-border hover:border-accent/40 transition-all duration-300 hover:shadow-xl hover:shadow-accent/10">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-accent/20 to-primary/20 mb-6 group-hover:scale-110 transition-transform">
                  <item.icon className="w-8 h-8 text-accent" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-accent transition-colors">
                  {item.region}
                </h3>
                <p className="text-muted-foreground leading-relaxed text-sm">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
});

GlobalOperations.displayName = "GlobalOperations";

export default GlobalOperations;
