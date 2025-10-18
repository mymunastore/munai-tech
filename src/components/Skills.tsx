import { Code2, Database, Brain, Smartphone, Wrench } from "lucide-react";

const Skills = () => {
  const skillCategories = [
    {
      icon: Code2,
      title: "Frontend Development",
      skills: ["React", "TypeScript", "Next.js", "Tailwind CSS", "Redux"],
      color: "from-blue-500/20 to-cyan-500/20"
    },
    {
      icon: Database,
      title: "Backend & Database",
      skills: ["Node.js", "PostgreSQL", "Supabase", "REST APIs", "GraphQL"],
      color: "from-purple-500/20 to-pink-500/20"
    },
    {
      icon: Brain,
      title: "AI & Machine Learning",
      skills: ["OpenAI API", "Gemini AI", "LangChain", "AI Integration", "Prompt Engineering"],
      color: "from-green-500/20 to-emerald-500/20"
    },
    {
      icon: Smartphone,
      title: "Mobile Development",
      skills: ["React Native", "PWA", "Responsive Design", "Mobile-First", "Cross-Platform"],
      color: "from-orange-500/20 to-amber-500/20"
    },
    {
      icon: Wrench,
      title: "Tools & DevOps",
      skills: ["Git", "Docker", "CI/CD", "AWS", "Vercel"],
      color: "from-red-500/20 to-rose-500/20"
    }
  ];

  return (
    <section id="skills" className="py-20 bg-background">
      <div className="container px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Technical Expertise</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A comprehensive skillset spanning modern web technologies, AI integration, and full-stack development
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, idx) => (
            <div
              key={idx}
              className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 transition-all hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1 animate-fade-in"
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-100 transition-opacity`} />
              
              <div className="relative">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <category.icon className="h-6 w-6 text-primary" />
                </div>
                
                <h3 className="text-xl font-bold mb-4">{category.title}</h3>
                
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, skillIdx) => (
                    <span
                      key={skillIdx}
                      className="px-3 py-1 text-sm rounded-full bg-primary/10 text-primary border border-primary/20 transition-all group-hover:bg-primary/20"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
