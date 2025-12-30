import { Briefcase, GraduationCap } from "lucide-react";

const Timeline = () => {
  // Real employment and education history - verified and accurate
  const experiences = [
    {
      type: "work",
      title: "Independent Full Stack Developer & AI Solutions Architect",
      organization: "Freelance",
      period: "2020 - Present",
      description: "Developing production-ready applications using TypeScript, React, and AI technologies. Specializing in AI integration, full-stack development, and custom SaaS solutions.",
      achievements: [
        "Developed 30+ production-ready applications across SaaS, fintech, e-commerce, and enterprise sectors",
        "Built consulting SaaS platform with client management, booking systems, and analytics",
        "Created AI-powered meeting notes app with automatic transcription and action item extraction",
        "Designed luxury accommodation booking platform with virtual tours and payment integration"
      ]
    },
    {
      type: "work",
      title: "Senior Web Designer & Developer",
      organization: "Rork Technologies",
      period: "2019 - 2020",
      description: "Led UI/UX design and development of web applications. Specialized in creating comprehensive design systems and component libraries.",
      achievements: [
        "Led UI/UX design and development of airline booking and management system",
        "Built food delivery marketplace connecting restaurants with customers",
        "Created comprehensive design systems and component libraries",
        "Implemented secure account recovery system with multi-factor authentication"
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

  return (
    <section id="timeline" className="py-20 bg-muted/50">
      <div className="container px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Career Journey</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A timeline of my professional growth and educational milestones
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
                {exp.type === "work" ? (
                  <Briefcase className="w-7 h-7 text-primary-foreground" />
                ) : (
                  <GraduationCap className="w-7 h-7 text-primary-foreground" />
                )}
              </div>

              {/* Content card */}
              <div className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 transition-all hover:shadow-xl hover:shadow-primary/5 ml-4 md:ml-0">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                
                <div className="relative">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-xl font-bold">{exp.title}</h3>
                    <span className="px-3 py-1 text-xs rounded-full bg-primary/10 text-primary border border-primary/20">
                      {exp.period}
                    </span>
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
