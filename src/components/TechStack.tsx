import { memo } from "react";

const technologies = [
  { name: "React", level: 95, category: "Frontend Systems" },
  { name: "TypeScript", level: 93, category: "Frontend Systems" },
  { name: "Next.js", level: 90, category: "Frontend Systems" },
  { name: "Tailwind CSS", level: 92, category: "Frontend Systems" },
  { name: "Node.js", level: 92, category: "Backend Systems" },
  { name: "PostgreSQL", level: 90, category: "Backend Systems" },
  { name: "REST APIs", level: 94, category: "Backend Systems" },
  { name: "GraphQL", level: 85, category: "Backend Systems" },
  { name: "AWS", level: 88, category: "Cloud & Infrastructure" },
  { name: "Docker", level: 87, category: "Cloud & Infrastructure" },
  { name: "CI/CD", level: 88, category: "Cloud & Infrastructure" },
  { name: "Kubernetes", level: 82, category: "Cloud & Infrastructure" },
  { name: "OpenAI / LLMs", level: 90, category: "AI & Intelligence Systems" },
  { name: "LangChain", level: 85, category: "AI & Intelligence Systems" },
  { name: "RAG Pipelines", level: 87, category: "AI & Intelligence Systems" },
  { name: "Agentic AI", level: 88, category: "AI & Intelligence Systems" },
];

const categories = ["Frontend Systems", "Backend Systems", "Cloud & Infrastructure", "AI & Intelligence Systems"];

const TechStack = memo(() => {
  return (
    <section id="tech" className="py-20 md:py-32 bg-secondary/30">
      <div className="container px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
            Technology & Infrastructure Stack
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Production-grade tools and frameworks powering secure, scalable, intelligent systems
          </p>
        </div>

        {/* Grouped Tech Stack */}
        <div className="max-w-5xl mx-auto space-y-10">
          {categories.map((category) => (
            <div key={category}>
              <h3 className="text-lg font-bold text-foreground mb-4 pl-1 border-l-4 border-accent ml-0 pl-4">
                {category}
              </h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {technologies
                  .filter((t) => t.category === category)
                  .map((tech) => (
                    <div
                      key={tech.name}
                      className="bg-card border border-border rounded-xl p-4 hover:shadow-lg transition-all duration-300 hover:border-accent/50 group"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-foreground text-sm">{tech.name}</h4>
                        <span className="text-xs font-bold text-accent">{tech.level}%</span>
                      </div>
                      <div className="relative h-1.5 bg-secondary rounded-full overflow-hidden">
                        <div
                          className="absolute inset-y-0 left-0 bg-gradient-to-r from-accent to-primary rounded-full transition-all duration-1000 ease-out"
                          style={{ width: `${tech.level}%` }}
                        />
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});

TechStack.displayName = "TechStack";

export default TechStack;
