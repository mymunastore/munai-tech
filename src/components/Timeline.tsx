import { Briefcase, GraduationCap, Building2, Shield } from "lucide-react";

const Timeline = () => {
  // Clear distinction: Personal experience vs Company history
  const experiences = [
    {
      type: "company",
      title: "MunAiTech Incorporated",
      organization: "15071995 LLC — Kentucky, USA",
      period: "2025 - Present",
      description: "Official incorporation as a global AI infrastructure and cybersecurity engineering company. Remote-first operations with international client base.",
      achievements: [
        "Incorporated in Kentucky, USA as 15071995 LLC",
        "2 years of formal company operations",
        "Global client base across 4+ countries",
        "Official government and enterprise engagements"
      ]
    },
    {
      type: "security",
      title: "Cybersecurity & Ethical Hacking Specialist",
      organization: "Self-Directed Specialization",
      period: "2022 - Present",
      description: "Dedicated focus on cybersecurity engineering, threat modeling, and ethical hacking. 4 years of specialized security expertise.",
      achievements: [
        "4 years cybersecurity specialization",
        "Security architecture and threat modeling",
        "Zero-trust system design expertise",
        "Enterprise security compliance frameworks"
      ]
    },
    {
      type: "work",
      title: "Independent Full Stack Developer & AI Solutions Architect",
      organization: "Freelance / Remote",
      period: "2020 - Present",
      description: "Personal journey into software development began during COVID-19 pandemic. 5+ years delivering production-grade AI and full-stack systems.",
      achievements: [
        "5+ years personal experience in software development",
        "Started during COVID-19 pandemic (2020)",
        "30+ production applications delivered",
        "AI integration and full-stack architecture expertise"
      ]
    },
    {
      type: "work",
      title: "Senior Web Designer & Developer",
      organization: "Rork Technologies",
      period: "2019 - 2020",
      description: "Early professional experience in UI/UX design and web development before independent practice.",
      achievements: [
        "Led UI/UX design for enterprise airline booking systems",
        "Built food delivery marketplace platforms",
        "Created comprehensive design systems",
        "Foundation for independent consulting career"
      ]
    },
    {
      type: "education",
      title: "Bachelor of Science (BSc)",
      organization: "University of Calabar",
      period: "Completed",
      description: "Comprehensive foundation in Computer Science and Software Engineering",
      achievements: [
        "Computer Science and Software Engineering foundation",
        "Calabar, Cross River State, Nigeria"
      ]
    },
    {
      type: "education",
      title: "Diploma",
      organization: "Temple Gate Polytechnic",
      period: "Completed",
      description: "Technical training in software development and web technologies",
      achievements: [
        "Software development and web technologies",
        "Aba, Abia State, Nigeria"
      ]
    }
  ];

  const getIcon = (type: string) => {
    switch (type) {
      case "company":
        return <Building2 className="w-7 h-7 text-primary-foreground" />;
      case "security":
        return <Shield className="w-7 h-7 text-primary-foreground" />;
      case "work":
        return <Briefcase className="w-7 h-7 text-primary-foreground" />;
      case "education":
        return <GraduationCap className="w-7 h-7 text-primary-foreground" />;
      default:
        return <Briefcase className="w-7 h-7 text-primary-foreground" />;
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "company":
        return "Company";
      case "security":
        return "Security";
      case "work":
        return "Experience";
      case "education":
        return "Education";
      default:
        return "Experience";
    }
  };

  return (
    <section id="timeline" className="py-20 bg-muted/50">
      <div className="container px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Professional Journey</h2>
          <p className="text-muted-foreground max-w-3xl mx-auto">
            A clear timeline distinguishing <span className="text-primary font-medium">5+ years of personal experience</span> (started 2020), 
            <span className="text-primary font-medium"> 4 years cybersecurity specialization</span> (since 2022), and 
            <span className="text-primary font-medium"> 2 years as MunAiTech</span> (incorporated 2025)
          </p>
        </div>

        <div className="max-w-4xl mx-auto relative">
          {/* Timeline line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-border" />

          {experiences.map((exp, idx) => (
            <div
              key={idx}
              className={`relative mb-12 ${
                idx % 2 === 0 ? 'md:pr-[50%] md:pl-0' : 'md:pl-[50%] md:pr-0'
              } pl-20`}
            >
              {/* Icon */}
              <div className="absolute left-4 md:left-1/2 md:-translate-x-1/2 w-16 h-16 rounded-full bg-primary flex items-center justify-center shadow-lg shadow-primary/20 border-4 border-background z-10">
                {getIcon(exp.type)}
              </div>

              {/* Content card */}
              <div className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 transition-all hover:shadow-xl hover:shadow-primary/5 ml-4 md:ml-0">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                
                <div className="relative">
                  <div className="flex items-start justify-between mb-2 flex-wrap gap-2">
                    <h3 className="text-xl font-bold">{exp.title}</h3>
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-1 text-xs rounded bg-muted text-muted-foreground">
                        {getTypeLabel(exp.type)}
                      </span>
                      <span className="px-3 py-1 text-xs rounded-full bg-primary/10 text-primary border border-primary/20">
                        {exp.period}
                      </span>
                    </div>
                  </div>
                  
                  <p className="text-muted-foreground font-medium mb-3">{exp.organization}</p>
                  <p className="text-sm mb-4">{exp.description}</p>
                  
                  <div className="space-y-1">
                    {exp.achievements.map((achievement, achIdx) => (
                      <div key={achIdx} className="flex items-start gap-2 text-sm">
                        <span className="text-primary mt-1">•</span>
                        <span>{achievement}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Timeline;
