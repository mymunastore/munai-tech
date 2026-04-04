import { memo } from "react";
import { motion } from "framer-motion";
import { Zap, Shield, Rocket, Target, HeartHandshake, Lightbulb } from "lucide-react";

const values = [
  {
    icon: Zap,
    title: "Rapid Deployment",
    description: "Accelerated development cycles with continuous delivery and production-ready milestones.",
    gradient: "from-yellow-500 to-orange-500"
  },
  {
    icon: Shield,
    title: "Security by Design",
    description: "Enterprise-grade security embedded at every layer — not bolted on as an afterthought.",
    gradient: "from-green-500 to-emerald-500"
  },
  {
    icon: Rocket,
    title: "Scalable Architecture",
    description: "Systems engineered to handle growth — from MVP to millions of users.",
    gradient: "from-blue-500 to-cyan-500"
  },
  {
    icon: Target,
    title: "Mission-Aligned",
    description: "Every technical decision mapped to your strategic business objectives.",
    gradient: "from-purple-500 to-pink-500"
  },
  {
    icon: HeartHandshake,
    title: "Long-term Partnership",
    description: "Ongoing support, maintenance, and advisory beyond initial system delivery.",
    gradient: "from-red-500 to-rose-500"
  },
  {
    icon: Lightbulb,
    title: "Innovation-Driven",
    description: "Leveraging cutting-edge AI, security, and cloud technologies for competitive advantage.",
    gradient: "from-indigo-500 to-violet-500"
  }
];

const ValueProposition = memo(() => {
  return (
    <section className="py-20 md:py-28 bg-muted/30">
      <div className="container px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-semibold mb-4">
            Why MunAiTech
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
            Built on Strong
            <br />
            <span className="bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
              Engineering Principles
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Partner with an engineering company that prioritizes your success through 
            proven methodologies and genuine dedication to excellence.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {values.map((value, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 1, y: 0 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="relative h-full p-8 rounded-2xl bg-card border border-border hover:border-accent/30 transition-all duration-300 hover:shadow-xl overflow-hidden">
                <div className={`absolute inset-0 bg-gradient-to-br ${value.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
                
                <div className="relative">
                  <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br ${value.gradient} mb-6 group-hover:scale-110 transition-transform shadow-lg`}>
                    <value.icon className="w-7 h-7 text-white" />
                  </div>
                  
                  <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-accent transition-colors">
                    {value.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {value.description}
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

ValueProposition.displayName = "ValueProposition";

export default ValueProposition;
