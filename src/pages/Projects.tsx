import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Helmet } from "react-helmet";

const Projects = () => {
  const projects = [
    {
      title: "AI-Powered Job & Resume Platform",
      problem: "Manual resume tailoring and job application workflows were inefficient.",
      solution: "Built a full-stack AI-powered platform that analyzes job descriptions and optimizes resumes automatically.",
      techStack: ["React", "Next.js", "Node.js", "OpenAI API", "Supabase", "PostgreSQL"],
      outcome: [
        "Reduced manual effort",
        "Improved application efficiency",
        "Production-ready deployment"
      ]
    },
    {
      title: "SaaS Business Management System",
      problem: "Businesses relied on spreadsheets and disconnected tools.",
      solution: "Developed a centralized SaaS platform with dashboards, analytics, and secure authentication.",
      techStack: ["Next.js", "Node.js", "REST APIs", "PostgreSQL", "AWS"],
      outcome: [
        "Centralized operations",
        "Improved reporting accuracy",
        "Scalable architecture"
      ]
    },
    {
      title: "AI Content & Workflow Automation Tool",
      problem: "Repetitive content creation reduced productivity.",
      solution: "Built an AI-driven automation tool to generate structured content and manage workflows.",
      techStack: ["React", "Node.js", "OpenAI API", "MongoDB", "Vercel"],
      outcome: [
        "Increased productivity",
        "Reduced manual work",
        "Stable production deployment"
      ]
    }
  ];

  return (
    <>
      <Helmet>
        <title>Selected Projects | Kingsley Munachi — Web Developer</title>
        <meta name="description" content="View selected projects by Kingsley Munachi including AI-Powered Job Platform, SaaS Business Management System, and AI Content Automation Tool." />
        <meta name="keywords" content="Web Development Projects, React Projects, Next.js, Node.js, AI Integration, Full-Stack Development" />
        <link rel="canonical" href="https://munai.tech/projects" />
        
        <meta property="og:title" content="Selected Projects | Kingsley Munachi" />
        <meta property="og:description" content="View selected full-stack web development projects." />
        <meta property="og:url" content="https://munai.tech/projects" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Navbar />
        
        {/* Hero Section */}
        <section className="pt-32 pb-16">
          <div className="container px-4">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                Selected Projects
              </h1>
            </div>
          </div>
        </section>

        {/* Projects List */}
        <section className="py-8 pb-20">
          <div className="container px-4">
            <div className="max-w-4xl mx-auto space-y-16">
              {projects.map((project, index) => (
                <article key={index} className="border-b border-border pb-12 last:border-0">
                  <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
                    {project.title}
                  </h2>
                  
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-2">Problem</h3>
                      <p className="text-muted-foreground">{project.problem}</p>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-2">Solution</h3>
                      <p className="text-muted-foreground">{project.solution}</p>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-2">Tech Stack</h3>
                      <p className="text-muted-foreground">{project.techStack.join(", ")}</p>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-2">Outcome</h3>
                      <ul className="list-disc list-inside text-muted-foreground space-y-1">
                        {project.outcome.map((item, i) => (
                          <li key={i}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default Projects;
