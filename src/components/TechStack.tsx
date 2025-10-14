import { Progress } from "./ui/progress";

const technologies = [
  { name: "React", icon: "⚛️", level: 95, color: "from-blue-400 to-cyan-400" },
  { name: "Node.js", icon: "🟢", level: 92, color: "from-green-400 to-emerald-400" },
  { name: "Python", icon: "🐍", level: 90, color: "from-yellow-400 to-orange-400" },
  { name: "AI/ML", icon: "🤖", level: 88, color: "from-purple-400 to-pink-400" },
  { name: "PostgreSQL", icon: "🐘", level: 90, color: "from-blue-500 to-indigo-500" },
  { name: "AWS", icon: "☁️", level: 85, color: "from-orange-400 to-red-400" },
];

const TechStack = () => {
  return (
    <section id="tech" className="py-20 md:py-32 bg-secondary/30">
      <div className="container px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
            Powered by Modern Technology
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Leveraging cutting-edge tools and frameworks to build scalable, performant solutions
          </p>
        </div>

        {/* Tech Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto">
          {technologies.map((tech, index) => (
            <div
              key={index}
              className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-all duration-300 hover:border-accent/50 group"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Icon & Name */}
              <div className="flex items-center gap-3 mb-4">
                <span className="text-4xl">{tech.icon}</span>
                <h3 className="text-xl font-bold text-foreground">{tech.name}</h3>
              </div>

              {/* Progress Bar */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Proficiency</span>
                  <span className="font-semibold text-foreground">{tech.level}%</span>
                </div>
                <div className="relative h-2 bg-secondary rounded-full overflow-hidden">
                  <div
                    className={`absolute inset-y-0 left-0 bg-gradient-to-r ${tech.color} rounded-full transition-all duration-1000 ease-out`}
                    style={{ width: `${tech.level}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechStack;
