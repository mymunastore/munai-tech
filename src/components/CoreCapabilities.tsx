import { memo } from "react";
import { motion } from "framer-motion";
import { 
  Brain, Bot, Shield, Crosshair, 
  Building2, Fingerprint, Cloud, Cable, Scale
} from "lucide-react";

const capabilities = [
  {
    icon: Brain,
    title: "AI Infrastructure Engineering",
    description: "End-to-end AI pipelines — from data ingestion to model deployment — powering enterprise-scale intelligent operations.",
    gradient: "from-blue-500 to-cyan-500"
  },
  {
    icon: Bot,
    title: "Auto Agent Systems",
    description: "Autonomous agent workflows with structured decision governance, human-in-the-loop orchestration, and enterprise auditability.",
    gradient: "from-purple-500 to-violet-500"
  },
  {
    icon: Shield,
    title: "Cybersecurity Architecture & Defence",
    description: "Zero-trust security embedded at every layer — application, infrastructure, and data — with continuous threat assessment.",
    gradient: "from-green-500 to-emerald-500"
  },
  {
    icon: Crosshair,
    title: "Simulation-Based Threat Modeling",
    description: "Proactive security through simulated attack vectors, adversarial testing, and continuous vulnerability assessment.",
    gradient: "from-red-500 to-orange-500"
  },
  {
    icon: Building2,
    title: "Enterprise SaaS Platforms",
    description: "Full-stack SaaS development with multi-tenancy, role-based access, billing integration, and horizontally scalable architecture.",
    gradient: "from-indigo-500 to-blue-500"
  },
  {
    icon: Fingerprint,
    title: "Identity & Verification Systems",
    description: "AI-powered document verification, KYC/AML compliance, biometric authentication, and digital identity pipelines.",
    gradient: "from-amber-500 to-yellow-500"
  },
  {
    icon: Scale,
    title: "AI Governance & Compliance",
    description: "Frameworks for responsible AI deployment — auditability, bias detection, regulatory compliance, and ethical AI governance.",
    gradient: "from-teal-500 to-cyan-500"
  },
  {
    icon: Cloud,
    title: "Cloud & Distributed Infrastructure",
    description: "AWS, GCP, and Azure deployments with IaC, CI/CD pipelines, container orchestration, and distributed systems engineering.",
    gradient: "from-cyan-500 to-teal-500"
  },
  {
    icon: Cable,
    title: "API & Systems Integration",
    description: "Connecting complex ecosystems through RESTful APIs, webhooks, event-driven architecture, and enterprise middleware.",
    gradient: "from-pink-500 to-rose-500"
  },
];

const CoreCapabilities = memo(() => {
  return (
    <section id="capabilities" className="py-20 md:py-32 bg-muted/30 relative overflow-hidden">
      <div className="absolute inset-0 opacity-20" style={{ background: 'var(--gradient-mesh)' }} />
      
      <div className="container px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-semibold mb-4">
            Core Services
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
            What We{" "}
            <span className="bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
              Engineer
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Enterprise-grade capabilities spanning AI infrastructure, cybersecurity architecture, and cloud systems engineering.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {capabilities.map((cap, index) => (
            <motion.div
              key={cap.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.06 }}
              className="group"
            >
              <div className="relative h-full p-6 rounded-2xl bg-card border border-border hover:border-accent/30 transition-all duration-300 hover:shadow-xl overflow-hidden">
                <div className={`absolute inset-0 bg-gradient-to-br ${cap.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
                
                <div className="relative">
                  <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${cap.gradient} mb-4 group-hover:scale-110 transition-transform shadow-lg`}>
                    <cap.icon className="w-6 h-6 text-white" />
                  </div>
                  
                  <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-accent transition-colors">
                    {cap.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {cap.description}
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

CoreCapabilities.displayName = "CoreCapabilities";

export default CoreCapabilities;
