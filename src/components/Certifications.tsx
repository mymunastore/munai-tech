import { Award, CheckCircle2, ExternalLink, Cloud, Shield, Code, GitBranch, Network, Brain, Download } from "lucide-react";
import { Button } from "./ui/button";
import { motion } from "framer-motion";
import { memo } from "react";

const Certifications = memo(() => {
  const certifications = [
    {
      title: "Cloud Computing Foundations",
      issuer: "LinkedIn Learning",
      year: "2025",
      date: "March 31, 2025",
      icon: Cloud,
      category: "Cloud",
      pdfLink: "/certificates/cloud-computing-foundations.pdf"
    },
    {
      title: "Introduction to Cloud Computing",
      issuer: "LinkedIn Learning",
      year: "2025",
      date: "April 1, 2025",
      icon: Cloud,
      category: "Cloud",
      pdfLink: "/certificates/intro-cloud-computing.pdf"
    },
    {
      title: "DevOps Essentials",
      issuer: "LinkedIn Learning",
      year: "2025",
      date: "April 1, 2025",
      icon: Code,
      category: "DevOps",
      pdfLink: "/certificates/devops-essentials.pdf"
    },
    {
      title: "DevSecOps Essentials",
      issuer: "LinkedIn Learning",
      year: "2025",
      date: "March 31, 2025",
      icon: Shield,
      category: "Security",
      pdfLink: "/certificates/devsecops-essentials.pdf"
    },
    {
      title: "Introduction to Python Development",
      issuer: "LinkedIn Learning",
      year: "2025",
      date: "April 1, 2025",
      icon: Code,
      category: "Programming",
      pdfLink: "/certificates/intro-python.pdf"
    },
    {
      title: "Introduction to Microsoft Defender for Cloud",
      issuer: "LinkedIn Learning",
      year: "2025",
      date: "March 31, 2025",
      icon: Shield,
      category: "Security",
      pdfLink: "/certificates/microsoft-defender-cloud.pdf"
    },
    {
      title: "Git Quick Start",
      issuer: "LinkedIn Learning",
      year: "2025",
      date: "April 1, 2025",
      icon: GitBranch,
      category: "Version Control",
      pdfLink: "/certificates/git-quick-start.pdf"
    },
    {
      title: "Networking Foundations",
      issuer: "LinkedIn Learning",
      year: "2025",
      date: "March 31, 2025",
      icon: Network,
      category: "Infrastructure",
      pdfLink: "/certificates/networking-foundations.pdf"
    },
    {
      title: "Effective Strategies for Managing Children with ADHD",
      issuer: "Inspire Care 360",
      year: "2025",
      date: "November 29, 2025",
      icon: Brain,
      category: "Professional Development",
      pdfLink: "/certificates/adhd-strategies.pdf"
    }
  ];

  const achievements = [
    "Certified in Cloud Computing & DevOps",
    "DevSecOps & Security Specialist",
    "Full-Stack Development Expertise",
    "Continuous Learning & Professional Development",
    "Open Source Contributor"
  ];

  const categoryColors: Record<string, string> = {
    "Cloud": "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
    "DevOps": "bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/20",
    "Security": "bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20",
    "Programming": "bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20",
    "Version Control": "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20",
    "Infrastructure": "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/20",
    "Professional Development": "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20"
  };

  return (
    <section id="certifications" className="py-20 md:py-28 bg-background">
      <div className="container px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-semibold mb-4">
            Credentials
          </span>
          <div className="flex items-center justify-center gap-3 mb-4">
            <Award className="w-8 h-8 text-accent" />
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">Certifications</h2>
          </div>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Professional certifications demonstrating expertise in cloud computing, DevOps, security, and software development.
          </p>
        </motion.div>

        {/* Certifications Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {certifications.map((cert, idx) => {
            const IconComponent = cert.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                viewport={{ once: true }}
                className="group relative"
              >
                <div className="h-full p-6 rounded-2xl bg-card border border-border hover:border-accent/30 hover:shadow-xl hover:shadow-accent/5 transition-all duration-300">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <IconComponent className="w-6 h-6 text-accent" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className={`inline-block px-2.5 py-1 text-xs font-medium rounded-full border mb-2 ${categoryColors[cert.category]}`}>
                        {cert.category}
                      </span>
                      <h3 className="font-semibold text-foreground group-hover:text-accent transition-colors line-clamp-2 mb-1">
                        {cert.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">{cert.issuer}</p>
                      <p className="text-xs text-muted-foreground/70 mt-1">{cert.date}</p>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-border">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full justify-center gap-2 text-accent hover:bg-accent/10 group-hover:bg-accent/5"
                      asChild
                    >
                      <a href={cert.pdfLink} target="_blank" rel="noopener noreferrer">
                        <Download className="w-4 h-4" />
                        View Certificate
                      </a>
                    </Button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Achievements */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <h3 className="text-2xl font-bold text-center mb-8">Key Competencies</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {achievements.map((achievement, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="flex items-center gap-3 p-4 rounded-xl bg-muted/50 border border-border transition-all hover:bg-muted hover:border-accent/20 group"
              >
                <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 group-hover:scale-110 transition-transform" />
                <span className="text-sm font-medium">{achievement}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
});

Certifications.displayName = "Certifications";

export default Certifications;
