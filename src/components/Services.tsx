import { memo } from "react";
import { Code2, Palette, Bot, ArrowRight, Sparkles } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const services = [
  {
    icon: Code2,
    title: "Full-Stack Development",
    metric: "18+ Projects",
    description: "End-to-end web applications with modern architecture, TypeScript, React, and cloud deployment. Specialized in rapid MVP development and scalable SaaS solutions.",
    skills: ["React/TypeScript", "Supabase", "Tailwind CSS", "API Development"],
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    icon: Palette,
    title: "AI Web App Design",
    metric: "AI-Powered",
    description: "Designing intelligent web applications that combine beautiful UX with AI capabilities. Creating interfaces that are both user-friendly and cutting-edge.",
    skills: ["UI/UX Design", "Design Systems", "Responsive Design", "User Research"],
    gradient: "from-purple-500 to-pink-500",
  },
  {
    icon: Bot,
    title: "AI Integration",
    metric: "Smart Solutions",
    description: "Custom AI solutions using OpenAI, Google Gemini, and advanced prompt engineering. From chatbots to automated note-taking and content generation.",
    skills: ["OpenAI API", "Prompt Engineering", "AI Automation", "RAG Systems"],
    gradient: "from-orange-500 to-red-500",
  },
];

const Services = memo(() => {
  return (
    <section id="services" className="py-20 md:py-32 bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-30" style={{ background: 'var(--gradient-mesh)' }} />
      
      <div className="container px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-semibold mb-4">
            <Sparkles className="w-4 h-4" />
            Premium Services
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
            Transforming Ideas Into
            <br />
            <span className="bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
              Digital Excellence
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            From concept to deployment, I deliver end-to-end solutions that transform your digital
            presence and drive measurable business growth.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="group hover:shadow-2xl hover:shadow-accent/10 transition-all duration-300 border-border bg-card overflow-hidden hover:border-accent/30 hover:-translate-y-2 h-full">
                <CardContent className="p-8">
                  {/* Icon */}
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${service.gradient} flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all shadow-lg`}>
                    <service.icon className="w-7 h-7 text-white" />
                  </div>

                  {/* Title & Metric */}
                  <div className="mb-4">
                    <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-accent transition-colors">
                      {service.title}
                    </h3>
                    <span className="inline-block px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-semibold">
                      {service.metric}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Skills */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {service.skills.map((skill, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 rounded-lg bg-secondary text-secondary-foreground text-xs font-medium group-hover:bg-accent/10 group-hover:text-accent transition-colors"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  {/* CTA */}
                  <Link to="/contact">
                    <Button
                      variant="ghost"
                      className="w-full group-hover:bg-accent/10 group-hover:text-accent transition-colors"
                    >
                      Get Started
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
});

Services.displayName = "Services";

export default Services;
