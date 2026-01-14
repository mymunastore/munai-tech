import { memo } from "react";
import { motion } from "framer-motion";
import { Zap, Shield, Rocket, Target, HeartHandshake, Lightbulb } from "lucide-react";

const values = [
  {
    icon: Zap,
    title: "Fast Delivery",
    description: "Rapid development cycles with weekly milestones and continuous delivery.",
    gradient: "from-yellow-500 to-orange-500"
  },
  {
    icon: Shield,
    title: "Security First",
    description: "Enterprise-grade security practices and DevSecOps integration.",
    gradient: "from-green-500 to-emerald-500"
  },
  {
    icon: Rocket,
    title: "Scalable Solutions",
    description: "Architecture designed to grow with your business needs.",
    gradient: "from-blue-500 to-cyan-500"
  },
  {
    icon: Target,
    title: "Goal-Oriented",
    description: "Every decision aligned with your business objectives.",
    gradient: "from-purple-500 to-pink-500"
  },
  {
    icon: HeartHandshake,
    title: "Long-term Partnership",
    description: "Ongoing support and maintenance beyond project delivery.",
    gradient: "from-red-500 to-rose-500"
  },
  {
    icon: Lightbulb,
    title: "Innovation Driven",
    description: "Leveraging latest AI and web technologies for competitive advantage.",
    gradient: "from-indigo-500 to-violet-500"
  }
];

const ValueProposition = memo(() => {
  return (
    <section className="py-20 md:py-28 bg-muted/30">
      <div className="container px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-semibold mb-4">
            Why Work With Me
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
            Built on Strong
            <br />
            <span className="bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
              Core Values
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Partner with a developer who prioritizes your success through proven methodologies
            and genuine dedication to excellence.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {values.map((value, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="relative h-full p-8 rounded-2xl bg-card border border-border hover:border-accent/30 transition-all duration-300 hover:shadow-xl overflow-hidden">
                {/* Background gradient on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${value.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
                
                <div className="relative">
                  {/* Icon */}
                  <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br ${value.gradient} mb-6 group-hover:scale-110 transition-transform shadow-lg`}>
                    <value.icon className="w-7 h-7 text-white" />
                  </div>
                  
                  {/* Content */}
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
