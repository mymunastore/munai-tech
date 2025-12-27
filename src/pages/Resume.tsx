import { Download, Printer } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Helmet } from "react-helmet";

const Resume = () => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <>
      <Helmet>
        <title>Resume | Kingsley Munachi — Web Developer</title>
        <meta name="description" content="Resume of Kingsley Munachi, Full-Stack Web & AI Developer with 5+ years of experience in React, Next.js, Node.js, TypeScript, and cloud technologies." />
        <meta name="keywords" content="Resume, CV, Kingsley Munachi, Web Developer, Full-Stack Developer, React, Node.js, TypeScript" />
        <link rel="canonical" href="https://munai.tech/resume" />
        
        <meta property="og:title" content="Resume | Kingsley Munachi" />
        <meta property="og:description" content="Full-Stack Web & AI Developer Resume" />
        <meta property="og:url" content="https://munai.tech/resume" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Navbar />
        
        <div className="container mx-auto px-4 py-24">
          <div className="max-w-4xl mx-auto">
            {/* Action Buttons - Hidden when printing */}
            <div className="flex gap-4 mb-8 print:hidden">
              <Button onClick={handlePrint} size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                <Download className="mr-2 h-5 w-5" />
                Download Resume (PDF)
              </Button>
              <Button onClick={handlePrint} variant="outline" size="lg">
                <Printer className="mr-2 h-5 w-5" />
                Print
              </Button>
            </div>

            {/* Resume Content */}
            <article className="bg-card border border-border rounded-lg p-8 md:p-12 print:shadow-none print:border-0">
              {/* Header */}
              <header className="mb-8 pb-8 border-b border-border">
                <h1 className="text-4xl font-bold text-foreground mb-2">Kingsley Munachi</h1>
                <p className="text-xl text-primary mb-4">Full-Stack Web & AI Developer</p>
                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                  <span>Email: info@mymuna.store</span>
                  <span>Phone: +234 706 237 2521</span>
                  <span>Portfolio: munai.tech</span>
                  <span>GitHub: github.com/mymunastore</span>
                  <span>LinkedIn: linkedin.com/in/kingsley-munachi-843591244</span>
                </div>
              </header>

              {/* Professional Summary */}
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-foreground mb-4">Professional Summary</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Full-Stack Web & AI Developer with 5+ years of experience building scalable, production-ready web applications. Specialized in frontend and backend development using React, Next.js, Node.js, REST APIs, and modern databases. Experienced in integrating AI-powered features to automate workflows and improve efficiency. Proven track record of delivering solutions from concept through deployment with distributed teams globally.
                </p>
              </section>

              {/* Technical Skills */}
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-foreground mb-4">Technical Skills</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Frontend</h3>
                    <p className="text-sm text-muted-foreground">React, Next.js, TypeScript, HTML5, CSS3, Tailwind CSS</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Backend</h3>
                    <p className="text-sm text-muted-foreground">Node.js, Express.js, REST APIs, Supabase, Firebase</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Databases</h3>
                    <p className="text-sm text-muted-foreground">PostgreSQL, MongoDB</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Cloud & DevOps</h3>
                    <p className="text-sm text-muted-foreground">AWS, Vercel, Docker, Git / GitHub</p>
                  </div>
                </div>
              </section>

              {/* Professional Experience */}
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-foreground mb-4">Professional Experience</h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold text-foreground">Full-Stack Web Developer</h3>
                    <p className="text-muted-foreground mb-2">Freelance | 2020 - Present</p>
                    <ul className="list-disc list-inside text-muted-foreground space-y-1">
                      <li>Built AI-powered job and resume optimization platform using React, Next.js, and OpenAI API</li>
                      <li>Developed SaaS business management system with dashboards, analytics, and authentication</li>
                      <li>Created AI content automation tool reducing manual work for clients</li>
                      <li>Delivered 30+ production-ready applications across various industries</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-foreground">Web Developer</h3>
                    <p className="text-muted-foreground mb-2">Rork Technologies | 2019 - 2020</p>
                    <ul className="list-disc list-inside text-muted-foreground space-y-1">
                      <li>Developed responsive web applications using React and Node.js</li>
                      <li>Integrated payment systems and RESTful APIs</li>
                      <li>Collaborated with design teams to implement user interfaces</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* Education */}
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-foreground mb-4">Education</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">Bachelor of Science (BSc)</h3>
                    <p className="text-muted-foreground">University of Calabar, Nigeria</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">Diploma</h3>
                    <p className="text-muted-foreground">Temple Gate Polytechnic, Nigeria</p>
                  </div>
                </div>
              </section>

              {/* Contact Information */}
              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">Contact Information</h2>
                <ul className="text-muted-foreground space-y-2">
                  <li><strong>Email:</strong> info@mymuna.store</li>
                  <li><strong>Phone:</strong> +234 706 237 2521</li>
                  <li><strong>Portfolio:</strong> munai.tech</li>
                  <li><strong>GitHub:</strong> github.com/mymunastore</li>
                  <li><strong>LinkedIn:</strong> linkedin.com/in/kingsley-munachi-843591244</li>
                  <li><strong>Location:</strong> Nigeria | Open to relocation</li>
                </ul>
              </section>
            </article>
          </div>
        </div>
        
        <Footer />
      </div>
    </>
  );
};

export default Resume;
