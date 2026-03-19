import { memo } from "react";
import { motion } from "framer-motion";

const technologies = [
  "React", "TypeScript", "Next.js", "Node.js", "Python",
  "PostgreSQL", "Supabase", "AWS", "Docker", "GraphQL",
  "Tailwind CSS", "OpenAI", "REST APIs", "MongoDB", "Git",
];

const TechMarquee = memo(() => {
  return (
    <section className="py-6 md:py-8 bg-secondary/30 overflow-hidden border-y border-border">
      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-secondary/30 to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-secondary/30 to-transparent z-10" />
        
        <motion.div
          initial={{ x: 0 }}
          animate={{ x: "-50%" }}
          transition={{
            duration: 35,
            repeat: Infinity,
            ease: "linear",
          }}
          className="flex gap-6 md:gap-10"
        >
          {[...technologies, ...technologies].map((tech, index) => (
            <div
              key={index}
              className="flex items-center px-5 py-2.5 rounded-full bg-card border border-border hover:border-accent/50 transition-colors whitespace-nowrap"
            >
              <span className="font-medium text-sm text-foreground hover:text-accent transition-colors">
                {tech}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
});

TechMarquee.displayName = "TechMarquee";

export default TechMarquee;
