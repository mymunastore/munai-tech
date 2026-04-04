import { memo, useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Briefcase, Users, Clock, Globe, Award, Shield } from "lucide-react";

interface StatItem {
  icon: typeof Briefcase;
  value: number;
  suffix: string;
  label: string;
  description: string;
}

const stats: StatItem[] = [
  {
    icon: Briefcase,
    value: 30,
    suffix: "+",
    label: "Systems Delivered",
    description: "Production-grade platforms"
  },
  {
    icon: Clock,
    value: 5,
    suffix: "+",
    label: "Years in Operation",
    description: "Engineering excellence"
  },
  {
    icon: Globe,
    value: 4,
    suffix: "+",
    label: "Countries Served",
    description: "Global delivery"
  },
  {
    icon: Award,
    value: 4,
    suffix: "",
    label: "Global Recognitions",
    description: "International validation"
  },
];

const CountUp = ({ target, suffix }: { target: number; suffix: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!isInView) return;
    
    const duration = 2000;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [isInView, target]);

  return (
    <span ref={ref} className="tabular-nums">
      {count}{suffix}
    </span>
  );
};

const StatsCounter = memo(() => {
  return (
    <section className="py-16 md:py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
      
      <div className="container px-4 sm:px-6 lg:px-8 relative">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-semibold mb-4">
            Track Record
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
            Proven Global Execution
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative"
            >
              <div className="relative p-6 md:p-8 rounded-2xl bg-card border border-border hover:border-accent/50 transition-all duration-300 hover:shadow-xl hover:shadow-accent/10 text-center">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-accent/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                
                <div className="relative">
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-accent/10 mb-4 group-hover:scale-110 group-hover:bg-accent/20 transition-all">
                    <stat.icon className="w-7 h-7 text-accent" />
                  </div>
                  
                  <div className="text-4xl md:text-5xl font-bold text-foreground mb-2">
                    <CountUp target={stat.value} suffix={stat.suffix} />
                  </div>
                  
                  <h3 className="text-lg font-semibold text-foreground mb-1">
                    {stat.label}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {stat.description}
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

StatsCounter.displayName = "StatsCounter";

export default StatsCounter;
