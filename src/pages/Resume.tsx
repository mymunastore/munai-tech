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
                <h1 className="text-4xl font-bold mb-2">Kingsley</h1>
                <p className="text-xl text-muted-foreground mb-4">Full Stack Developer & AI Solutions Architect</p>
                <div className="flex flex-wrap gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    <span>hello@example.com</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    <span>+1 (555) 123-4567</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    <span>San Francisco, CA</span>
                  </div>
                </div>
              </div>

              {/* Summary */}
              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">Professional Summary</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Innovative Full Stack Developer with 8+ years of experience building scalable web applications and AI-powered solutions. 
                  Specialized in React, Node.js, and modern cloud technologies. Proven track record of delivering high-quality projects 
                  that drive business growth and enhance user experiences.
                </p>
              </section>

              {/* Experience */}
              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <Briefcase className="h-6 w-6" />
                  Work Experience
                </h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold">Senior Full Stack Developer</h3>
                    <p className="text-muted-foreground">Tech Innovations Inc. • 2021 - Present</p>
                    <ul className="mt-2 space-y-2 list-disc list-inside text-muted-foreground">
                      <li>Led development of enterprise-scale web applications serving 100K+ users</li>
                      <li>Implemented AI-powered features reducing customer support tickets by 40%</li>
                      <li>Architected microservices infrastructure improving system reliability to 99.9%</li>
                      <li>Mentored team of 5 junior developers, improving code quality and delivery speed</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">Full Stack Developer</h3>
                    <p className="text-muted-foreground">Digital Solutions Co. • 2018 - 2021</p>
                    <ul className="mt-2 space-y-2 list-disc list-inside text-muted-foreground">
                      <li>Built 15+ custom web applications for diverse clients across industries</li>
                      <li>Optimized application performance, achieving 50% faster load times</li>
                      <li>Integrated third-party APIs and payment processing systems</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">Junior Developer</h3>
                    <p className="text-muted-foreground">StartUp Labs • 2016 - 2018</p>
                    <ul className="mt-2 space-y-2 list-disc list-inside text-muted-foreground">
                      <li>Developed responsive front-end interfaces using React and Vue.js</li>
                      <li>Collaborated with designers to implement pixel-perfect UI/UX designs</li>
                      <li>Participated in agile development processes and code reviews</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* Education */}
              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <GraduationCap className="h-6 w-6" />
                  Education
                </h2>
                <div>
                  <h3 className="text-xl font-semibold">Bachelor of Science in Computer Science</h3>
                  <p className="text-muted-foreground">University of Technology • 2012 - 2016</p>
                  <p className="mt-2 text-muted-foreground">GPA: 3.8/4.0 • Dean's List • Honors Graduate</p>
                </div>
              </section>

              {/* Skills */}
              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">Technical Skills</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div>
                    <h4 className="font-semibold mb-2">Frontend</h4>
                    <p className="text-sm text-muted-foreground">React, TypeScript, Next.js, Tailwind CSS, Vue.js</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Backend</h4>
                    <p className="text-sm text-muted-foreground">Node.js, Express, Python, Django, GraphQL</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Database</h4>
                    <p className="text-sm text-muted-foreground">PostgreSQL, MongoDB, Redis, Supabase</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Cloud & DevOps</h4>
                    <p className="text-sm text-muted-foreground">AWS, Docker, Kubernetes, CI/CD</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">AI/ML</h4>
                    <p className="text-sm text-muted-foreground">OpenAI, TensorFlow, LangChain, RAG</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Tools</h4>
                    <p className="text-sm text-muted-foreground">Git, VS Code, Figma, Jira</p>
                  </div>
                </div>
              </section>

              {/* Certifications */}
              <section>
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <Award className="h-6 w-6" />
                  Certifications
                </h2>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• AWS Certified Solutions Architect - Professional</li>
                  <li>• Google Cloud Professional Developer</li>
                  <li>• MongoDB Certified Developer</li>
                  <li>• Certified Scrum Master (CSM)</li>
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
