import AnimatedCounter from "./AnimatedCounter";
import ScrollReveal from "./ScrollReveal";
import { Code2, Users, Rocket, Award } from "lucide-react";

const StatsSection = () => {
  const stats = [
    {
      icon: Code2,
      value: 50,
      suffix: "+",
      label: "Projects Completed",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Users,
      value: 30,
      suffix: "+",
      label: "Happy Clients",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: Rocket,
      value: 5,
      suffix: "+",
      label: "Years Experience",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: Award,
      value: 15,
      suffix: "+",
      label: "Awards & Recognition",
      color: "from-orange-500 to-amber-500"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-primary/5 to-accent/5 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
      </div>

      <div className="container px-4 sm:px-6 lg:px-8 relative z-10">
        <ScrollReveal>
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Portfolio Impact</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Numbers that reflect dedication, quality, and continuous growth
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, idx) => (
            <ScrollReveal key={idx} delay={idx * 100}>
              <div className="group relative overflow-hidden rounded-2xl bg-card border border-border p-6 text-center transition-all hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-2">
                <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-10 transition-opacity`} />
                
                <div className="relative">
                  <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 group-hover:scale-110 transition-transform">
                    <stat.icon className="h-8 w-8 text-primary" />
                  </div>
                  
                  <div className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                    <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                  </div>
                  
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
