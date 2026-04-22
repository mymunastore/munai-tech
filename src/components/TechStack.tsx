import { memo } from "react";
import { motion } from "framer-motion";

const technologies = [
  { name: "OpenAI / LLMs", category: "AI Systems" },
  { name: "LangChain", category: "AI Systems" },
  { name: "RAG Pipelines", category: "AI Systems" },
  { name: "Agentic AI", category: "AI Systems" },
  { name: "Computer Vision", category: "AI Systems" },
  { name: "Node.js", category: "Backend Systems" },
  { name: "PostgreSQL", category: "Backend Systems" },
  { name: "REST / GraphQL APIs", category: "Backend Systems" },
  { name: "React / TypeScript", category: "Backend Systems" },
  { name: "Next.js", category: "Backend Systems" },
  { name: "AWS", category: "Cloud Infrastructure" },
  { name: "Docker / K8s", category: "Cloud Infrastructure" },
  { name: "CI/CD Pipelines", category: "Cloud Infrastructure" },
  { name: "Terraform / IaC", category: "Cloud Infrastructure" },
  { name: "Edge Computing", category: "Cloud Infrastructure" },
  { name: "Zero-Trust Architecture", category: "Security Systems" },
  { name: "Threat Modeling", category: "Security Systems" },
  { name: "DevSecOps", category: "Security Systems" },
  { name: "Identity & Access Mgmt", category: "Security Systems" },
  { name: "Post-Quantum Crypto", category: "Security Systems" },
];

const categories = ["AI Systems", "Backend Systems", "Cloud Infrastructure", "Security Systems"];

const categoryColors: Record<string, string> = {
  "AI Systems": "border-l-purple-500",
  "Backend Systems": "border-l-blue-500",
  "Cloud Infrastructure": "border-l-cyan-500",
  "Security Systems": "border-l-green-500",
};

const TechStack = memo(() => {
  return (
    <section id="tech" className="py-16 md:py-24 bg-secondary/30">
      <div className="container px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 1, y: 0 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-semibold mb-4">
            Engineering Stack
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
            Infrastructure &{" "}
            <span className="bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
              Technology Stack
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Production-grade tools and frameworks powering secure, scalable, intelligent systems
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto space-y-10">
          {categories.map((category, catIdx) => (
            <motion.div 
              key={category}
              initial={{ opacity: 1, y: 0 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: catIdx * 0.1 }}
            >
              <h3 className={`text-lg font-bold text-foreground mb-4 pl-4 border-l-4 ${categoryColors[category]}`}>
                {category}
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                {technologies
                  .filter((t) => t.category === category)
                  .map((tech) => (
                    <div
                      key={tech.name}
                      className="bg-card border border-border rounded-xl px-4 py-3 hover:shadow-lg transition-all duration-300 hover:border-accent/50 group text-center"
                    >
                      <span className="font-medium text-foreground text-sm group-hover:text-accent transition-colors">
                        {tech.name}
                      </span>
                    </div>
                  ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
});

TechStack.displayName = "TechStack";

export default TechStack;
