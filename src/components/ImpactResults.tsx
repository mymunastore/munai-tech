import { memo } from "react";
import { motion } from "framer-motion";
import { TrendingUp, ShieldCheck, BrainCircuit, Gauge, BarChart3, Lock } from "lucide-react";

const impacts = [
  {
    icon: TrendingUp,
    title: "Operational Efficiency",
    description: "AI-driven automation reduces manual processes by up to 80%, enabling teams to focus on strategic initiatives.",
    metric: "80%",
    metricLabel: "Process Automation",
    gradient: "from-blue-500 to-cyan-500"
  },
  {
    icon: ShieldCheck,
    title: "Security Posture",
    description: "Zero-trust architecture and embedded threat modeling strengthen organizational security across every layer.",
    metric: "100%",
    metricLabel: "Compliance Rate",
    gradient: "from-green-500 to-emerald-500"
  },
  {
    icon: BrainCircuit,
    title: "Decision Intelligence",
    description: "Real-time AI analytics enable data-driven decisions at scale, transforming how organizations respond to critical events.",
    metric: "10x",
    metricLabel: "Faster Insights",
    gradient: "from-purple-500 to-violet-500"
  },
  {
    icon: Gauge,
    title: "System Performance",
    description: "Production-grade infrastructure engineered for 99.9% uptime with fault tolerance and horizontal scalability.",
    metric: "99.9%",
    metricLabel: "System Uptime",
    gradient: "from-amber-500 to-orange-500"
  },
  {
    icon: BarChart3,
    title: "Cost Optimization",
    description: "Intelligent resource allocation and cloud-native architecture reduce infrastructure costs without sacrificing performance.",
    metric: "40%",
    metricLabel: "Cost Reduction",
    gradient: "from-rose-500 to-pink-500"
  },
  {
    icon: Lock,
    title: "Data Sovereignty",
    description: "Systems designed to meet international data residency and compliance requirements across regulated industries.",
    metric: "Global",
    metricLabel: "Compliance",
    gradient: "from-indigo-500 to-blue-500"
  },
];

const ImpactResults = memo(() => {
  return (
    <section className="py-20 md:py-28 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.03] via-transparent to-accent/[0.03]" />

      <div className="container px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-semibold mb-4">
            Impact & Results
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
            Measurable{" "}
            <span className="bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
              Outcomes
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Our systems deliver tangible results — improving efficiency, strengthening security, 
            and enabling smarter decision-making at enterprise scale.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {impacts.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="group"
            >
              <div className="relative h-full p-8 rounded-2xl bg-card border border-border hover:border-accent/30 transition-all duration-300 hover:shadow-xl overflow-hidden">
                <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
                
                <div className="relative">
                  <div className="flex items-center justify-between mb-6">
                    <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${item.gradient} shadow-lg group-hover:scale-110 transition-transform`}>
                      <item.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-accent">{item.metric}</div>
                      <div className="text-xs text-muted-foreground">{item.metricLabel}</div>
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-accent transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
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

ImpactResults.displayName = "ImpactResults";

export default ImpactResults;
