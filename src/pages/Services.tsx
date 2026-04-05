import { memo } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { 
  Shield, Brain, Cloud, Server, Lock, Eye, Bot, Network, Cpu, 
  ArrowRight, CheckCircle2, Zap, Globe, Clock
} from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const services = [
  {
    icon: Shield,
    title: "Managed Cybersecurity Operations",
    description: "24/7 threat monitoring, incident response, and security operations centre (SOC) management. We protect your infrastructure with enterprise-grade defence systems.",
    features: ["Real-time threat detection & response", "Vulnerability management & patching", "Security compliance monitoring", "Incident forensics & reporting"],
  },
  {
    icon: Brain,
    title: "AI Infrastructure Management",
    description: "End-to-end management of your AI/ML pipelines, model deployment, and inference infrastructure — keeping your intelligent systems running at peak performance.",
    features: ["Model lifecycle management", "MLOps pipeline orchestration", "Performance monitoring & optimization", "Automated retraining workflows"],
  },
  {
    icon: Bot,
    title: "Autonomous Agent Operations",
    description: "Deployment and management of AI agent systems that automate complex business workflows, with continuous monitoring and optimization.",
    features: ["Agent deployment & scaling", "Workflow automation management", "Performance analytics & tuning", "Failover & recovery systems"],
  },
  {
    icon: Lock,
    title: "Zero-Trust Security Management",
    description: "Implementation and ongoing management of zero-trust architecture across your entire organization, ensuring every access request is verified.",
    features: ["Identity & access management", "Micro-segmentation maintenance", "Continuous verification monitoring", "Policy enforcement & auditing"],
  },
  {
    icon: Cloud,
    title: "Cloud & Hybrid Infrastructure",
    description: "Managed cloud operations across AWS, Azure, and GCP — including hybrid and multi-cloud environments with cost optimization and reliability engineering.",
    features: ["Multi-cloud orchestration", "Cost optimization & FinOps", "High-availability architecture", "Disaster recovery management"],
  },
  {
    icon: Server,
    title: "Enterprise Platform Operations",
    description: "Full lifecycle management of your SaaS platforms and enterprise applications — from deployment to scaling to ongoing maintenance.",
    features: ["Platform health monitoring", "Automated scaling & load balancing", "Database management & optimization", "Release management & CI/CD"],
  },
  {
    icon: Eye,
    title: "Threat Intelligence & Hunting",
    description: "Proactive threat intelligence gathering and advanced threat hunting to identify and neutralize emerging risks before they impact your operations.",
    features: ["Dark web monitoring", "Threat landscape analysis", "Proactive threat hunting", "Intelligence-driven defence"],
  },
  {
    icon: Network,
    title: "API & Integration Management",
    description: "Managed API gateway operations, third-party integration maintenance, and real-time monitoring of all system interconnections.",
    features: ["API gateway management", "Integration health monitoring", "Rate limiting & throttling", "Version management & deprecation"],
  },
  {
    icon: Cpu,
    title: "Quantum-Ready Architecture",
    description: "Future-proofing your systems with quantum-resistant cryptography and architecture designed to transition seamlessly into the post-quantum era.",
    features: ["Post-quantum cryptography migration", "Quantum risk assessment", "Architecture modernization", "Compliance roadmap planning"],
  },
];

const stats = [
  { value: "99.99%", label: "Uptime SLA", icon: Zap },
  { value: "24/7", label: "Monitoring & Support", icon: Clock },
  { value: "15+", label: "Countries Served", icon: Globe },
  { value: "30+", label: "Systems Managed", icon: Server },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const Services = memo(() => {
  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Managed Services | MunAiTech"
        description="Enterprise-grade managed cybersecurity, AI infrastructure, and cloud operations services. 24/7 monitoring, zero-trust security, and intelligent automation."
      />
      <Navbar />

      {/* Hero */}
      <section className="pt-28 pb-20 md:pt-36 md:pb-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,hsl(var(--primary)/0.08),transparent_60%)]" />
        <div className="container relative z-10 px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/10 backdrop-blur-sm mb-6">
              <Shield className="w-4 h-4 text-primary" />
              <span className="text-sm font-semibold text-primary">Managed Services</span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
              Enterprise-Grade{" "}
              <span className="text-primary">Managed Operations</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
              We manage your critical AI, cybersecurity, and cloud infrastructure — so you can focus on growth while we ensure security, performance, and reliability.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors"
              >
                Request a Consultation
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 border-y border-border/50">
        <div className="container px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <div key={i} className="text-center">
                <stat.icon className="w-6 h-6 text-primary mx-auto mb-3" />
                <div className="text-3xl md:text-4xl font-bold text-foreground mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 md:py-28">
        <div className="container px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              What We <span className="text-primary">Manage</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Comprehensive managed services covering the full spectrum of AI, security, and infrastructure operations.
            </p>
          </div>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            {services.map((service, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                className="group relative rounded-xl border border-border/60 bg-card/50 p-6 hover:border-primary/40 hover:bg-card/80 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <service.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">{service.title}</h3>
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{service.description}</p>
                <ul className="space-y-2">
                  {service.features.map((feature, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 md:py-28 border-t border-border/50">
        <div className="container px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              How We <span className="text-primary">Engage</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              A structured, transparent engagement model designed for enterprise reliability.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {[
              { step: "01", title: "Discovery", desc: "We assess your current infrastructure, identify risks, and map your operational needs." },
              { step: "02", title: "Architecture", desc: "Custom service architecture designed for your security posture and performance requirements." },
              { step: "03", title: "Onboarding", desc: "Seamless transition with zero downtime. Full documentation and knowledge transfer." },
              { step: "04", title: "Operations", desc: "24/7 managed operations with real-time dashboards, reporting, and continuous improvement." },
            ].map((item, i) => (
              <div key={i} className="text-center">
                <div className="text-5xl font-bold text-primary/20 mb-3">{item.step}</div>
                <h3 className="text-lg font-bold text-foreground mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-28 border-t border-border/50 bg-gradient-to-b from-primary/5 to-transparent">
        <div className="container px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Ready to Offload Your Operations?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
              Let MunAiTech manage your critical systems. Contact us for a custom service proposal tailored to your infrastructure.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors"
              >
                Get a Custom Proposal
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="mailto:info@mymuna.store"
                className="text-primary hover:text-primary/80 font-medium transition-colors"
              >
                info@mymuna.store
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
});

Services.displayName = "Services";

export default Services;
