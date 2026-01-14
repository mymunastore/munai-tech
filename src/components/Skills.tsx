import { Code2, Database, Brain, Smartphone, Wrench, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";
import { memo } from "react";

const Skills = memo(() => {
  const skillCategories = [
    {
      icon: Code2,
      title: "Frontend Development",
      skills: ["React", "TypeScript", "Next.js", "Tailwind CSS", "Redux"],
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: Database,
      title: "Backend & Database",
      skills: ["Node.js", "PostgreSQL", "Supabase", "REST APIs", "GraphQL"],
      gradient: "from-purple-500 to-pink-500"
    },
    {
      icon: Brain,
      title: "AI & Machine Learning",
      skills: ["OpenAI API", "Gemini AI", "LangChain", "AI Integration", "Prompt Engineering"],
      gradient: "from-green-500 to-emerald-500"
    },
    {
      icon: Smartphone,
      title: "Mobile Development",
      skills: ["React Native", "PWA", "Responsive Design", "Mobile-First", "Cross-Platform"],
      gradient: "from-orange-500 to-amber-500"
    },
    {
      icon: Wrench,
      title: "Tools & DevOps",
      skills: ["Git", "Docker", "CI/CD", "AWS", "Vercel"],
      gradient: "from-red-500 to-rose-500"
    },
    {
      icon: TrendingUp,
      title: "Business & Strategy",
      skills: ["Agile", "Project Management", "Client Communication", "Technical Consulting", "Problem Solving"],
      gradient: "from-indigo-500 to-violet-500"
    }
  ];

  // Plain text skills list for ATS systems and crawlers
  const allSkillsPlainText = skillCategories.flatMap(cat => cat.skills).join(", ");

  return (
    <section id="skills" className="py-20 md:py-28 bg-background">
      <div className="container px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-semibold mb-4">
            Expertise
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">Technical Expertise</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            A comprehensive skillset spanning modern web technologies, AI integration, and full-stack development
          </p>
          {/* Plain text skills for ATS parsing - hidden visually but accessible to crawlers */}
          <p className="sr-only" aria-hidden="false">
            Technical Skills: {allSkillsPlainText}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {skillCategories.map((category, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="relative h-full overflow-hidden rounded-2xl border border-border bg-card p-6 transition-all hover:shadow-xl hover:shadow-accent/5 hover:-translate-y-1 hover:border-accent/30">
                {/* Background gradient on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-0 group-hover:opacity-5 transition-opacity`} />
                
                <div className="relative">
                  <div className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${category.gradient} shadow-lg group-hover:scale-110 transition-transform`}>
                    <category.icon className="h-6 w-6 text-white" />
                  </div>
                  
                  <h3 className="text-xl font-bold mb-4 group-hover:text-accent transition-colors">{category.title}</h3>
                  
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill, skillIdx) => (
                      <span
                        key={skillIdx}
                        className="px-3 py-1.5 text-sm rounded-lg bg-muted text-muted-foreground border border-border transition-all group-hover:bg-accent/10 group-hover:text-accent group-hover:border-accent/20"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
});

Skills.displayName = "Skills";

export default Skills;
