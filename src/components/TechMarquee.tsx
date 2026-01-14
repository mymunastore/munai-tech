import { memo } from "react";
import { motion } from "framer-motion";

const technologies = [
  { name: "React", icon: "⚛️" },
  { name: "TypeScript", icon: "💙" },
  { name: "Next.js", icon: "▲" },
  { name: "Node.js", icon: "🟢" },
  { name: "Python", icon: "🐍" },
  { name: "PostgreSQL", icon: "🐘" },
  { name: "Supabase", icon: "⚡" },
  { name: "AWS", icon: "☁️" },
  { name: "Docker", icon: "🐳" },
  { name: "GraphQL", icon: "◈" },
  { name: "Tailwind CSS", icon: "🎨" },
  { name: "OpenAI", icon: "🤖" },
];

const TechMarquee = memo(() => {
  return (
    <section className="py-8 md:py-12 bg-secondary/30 overflow-hidden border-y border-border">
      <div className="relative">
        {/* Gradient overlays for fade effect */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-secondary/30 to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-secondary/30 to-transparent z-10" />
        
        <motion.div
          initial={{ x: 0 }}
          animate={{ x: "-50%" }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear",
          }}
          className="flex gap-8 md:gap-12"
        >
          {/* Double the items for seamless loop */}
          {[...technologies, ...technologies].map((tech, index) => (
            <div
              key={index}
              className="flex items-center gap-3 px-6 py-3 rounded-full bg-card border border-border hover:border-accent/50 transition-colors whitespace-nowrap group"
            >
              <span className="text-2xl group-hover:scale-110 transition-transform">
                {tech.icon}
              </span>
              <span className="font-medium text-foreground group-hover:text-accent transition-colors">
                {tech.name}
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
