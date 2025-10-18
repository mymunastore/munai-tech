import { Download, Printer, Mail, Phone, MapPin, Briefcase, GraduationCap, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";

const Resume = () => {
  const handleDownload = async () => {
    try {
      await supabase.from('resume_downloads').insert({
        user_agent: navigator.userAgent,
        ip_address: 'client'
      });
      window.print();
    } catch (error) {
      console.error('Error logging download:', error);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="container mx-auto px-4 py-24">
        <div className="max-w-4xl mx-auto">
          {/* Action Buttons - Hidden when printing */}
          <div className="flex gap-4 mb-8 print:hidden">
            <Button onClick={handleDownload} size="lg">
              <Download className="mr-2 h-5 w-5" />
              Download PDF
            </Button>
            <Button onClick={handlePrint} variant="outline" size="lg">
              <Printer className="mr-2 h-5 w-5" />
              Print
            </Button>
          </div>

          {/* Resume Content */}
          <Card className="print:shadow-none print:border-0">
            <CardContent className="p-8 md:p-12">
              {/* Header */}
              <div className="mb-8 pb-8 border-b">
                <h1 className="text-4xl font-bold mb-2">MunAiTech</h1>
                <p className="text-xl text-muted-foreground mb-4">AI Web App Designer & Full-Stack Developer | A 15071995 LLC Company</p>
                <div className="flex flex-wrap gap-4 text-sm">
                  <div className="flex items-center gap-2">
                     <Mail className="h-4 w-4" />
                     <span>contact@munaitech.com</span>
                   </div>
                   <div className="flex items-center gap-2">
                     <MapPin className="h-4 w-4" />
                     <span>Lagos, Nigeria (Remote Available)</span>
                   </div>
                  <div className="flex items-center gap-2">
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                    <a href="https://github.com/mymunastore" target="_blank" rel="noopener noreferrer" className="hover:text-primary">github.com/mymunastore</a>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                    </svg>
                    <a href="https://www.linkedin.com/in/kingsley-munachi-843591244" target="_blank" rel="noopener noreferrer" className="hover:text-primary">LinkedIn Profile</a>
                  </div>
                </div>
              </div>

              {/* Summary */}
              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">Professional Summary</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Innovative AI Web App Designer and Full-Stack Developer specializing in building intelligent, scalable web applications 
                  with cutting-edge technologies. Expert in TypeScript, React, and AI integration with proven success in delivering 
                  18+ production-grade applications across SaaS, fintech, e-commerce, and enterprise sectors. Passionate about 
                  leveraging AI to create transformative digital experiences that solve real-world problems.
                </p>
              </section>

              {/* Experience */}
              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <Briefcase className="h-6 w-6" />
                  Work Experience & Projects
                </h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold">Independent Full Stack Developer & AI Solutions Architect</h3>
                    <p className="text-muted-foreground">Freelance • 2023 - Present</p>
                    <ul className="mt-2 space-y-2 list-disc list-inside text-muted-foreground">
                      <li>Developed 18+ production-ready applications using TypeScript, React, and AI technologies</li>
                      <li>Built consulting SaaS platform with client management, booking systems, and analytics</li>
                      <li>Created AI-powered meeting notes app with automatic transcription and action item extraction</li>
                      <li>Designed luxury accommodation booking platform with virtual tours and payment integration</li>
                      <li>Developed financial management suite with expense tracking and budget optimization</li>
                      <li>Architected enterprise audit and compliance management system for regulatory tracking</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">Web Application Developer</h3>
                    <p className="text-muted-foreground">Rork Technologies • 2022 - 2023</p>
                    <ul className="mt-2 space-y-2 list-disc list-inside text-muted-foreground">
                      <li>Led development of airline booking and management system with real-time flight tracking</li>
                      <li>Built food delivery marketplace connecting 50+ restaurants with 500+ customers</li>
                      <li>Implemented secure account recovery system with multi-factor authentication</li>
                      <li>Optimized mobile app performance increasing user retention by 35%</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">Full Stack Developer</h3>
                    <p className="text-muted-foreground">Various Clients • 2020 - 2022</p>
                    <ul className="mt-2 space-y-2 list-disc list-inside text-muted-foreground">
                      <li>Developed responsive web applications using modern JavaScript frameworks</li>
                      <li>Integrated payment systems (Stripe, PayPal) for e-commerce platforms</li>
                      <li>Implemented RESTful APIs and real-time features using WebSockets</li>
                      <li>Collaborated with designers to create stunning user interfaces</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* Education */}
              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <GraduationCap className="h-6 w-6" />
                  Education & Training
                </h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-semibold">Bachelor of Science in Computer Science</h3>
                    <p className="text-muted-foreground">University of Technology • 2016 - 2020</p>
                    <p className="mt-2 text-muted-foreground">Focus: Software Engineering, AI & Machine Learning</p>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">Advanced AI Development Certification</h3>
                    <p className="text-muted-foreground">Online Learning Platform • 2023</p>
                    <p className="mt-2 text-muted-foreground">Specialized in OpenAI API integration and prompt engineering</p>
                  </div>
                </div>
              </section>

              {/* Skills */}
              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">Technical Skills</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div>
                    <h4 className="font-semibold mb-2">Frontend</h4>
                    <p className="text-sm text-muted-foreground">React, TypeScript, Next.js, Tailwind CSS, HTML5/CSS3</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Backend</h4>
                    <p className="text-sm text-muted-foreground">Node.js, Supabase, Firebase, RESTful APIs</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Database</h4>
                    <p className="text-sm text-muted-foreground">PostgreSQL, Supabase, Redis, AsyncStorage</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">AI & Integration</h4>
                    <p className="text-sm text-muted-foreground">OpenAI API, Google Gemini, Prompt Engineering, RAG</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Mobile</h4>
                    <p className="text-sm text-muted-foreground">React Native, Expo, Progressive Web Apps</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Tools & Platforms</h4>
                    <p className="text-sm text-muted-foreground">Git/GitHub, VS Code, Vercel, Stripe Integration</p>
                  </div>
                </div>
              </section>

              {/* Certifications */}
              <section>
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <Award className="h-6 w-6" />
                  Achievements & Highlights
                </h2>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Successfully delivered 18+ production-ready applications across multiple industries</li>
                  <li>• All GitHub repositories have at least 1 star, demonstrating code quality and utility</li>
                  <li>• Specialized in rapid prototyping and MVP development (30-day launch cycles)</li>
                  <li>• Expert in AI integration for real-world business applications</li>
                  <li>• Strong focus on TypeScript and type-safe development practices</li>
                  <li>• Active contributor to open-source projects on GitHub</li>
                </ul>
              </section>
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Resume;
