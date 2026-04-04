import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { StructuredData } from "@/components/StructuredData";
import { Card, CardContent } from "@/components/ui/card";
import { Award, Briefcase, Code2, GraduationCap, Heart, Lightbulb, Target, Users, Zap } from "lucide-react";
import { Helmet } from "react-helmet";

const About = () => {
  const values = [
    {
      icon: <Lightbulb className="w-8 h-8" />,
      title: "Innovation First",
      description: "Constantly exploring cutting-edge AI and cybersecurity technologies to deliver future-ready enterprise solutions."
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: "Results Driven",
      description: "Focused on delivering measurable outcomes that exceed expectations and drive enterprise-level business growth."
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Client Success",
      description: "Your mission is our mission. Building long-term partnerships through exceptional engineering and support."
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Agile Excellence",
      description: "Rapid iteration and deployment using modern engineering practices for faster time-to-production."
    }
  ];

  const achievements = [
    { icon: <Award />, label: "5+ Years Engineering", value: "Senior Level" },
    { icon: <Briefcase />, label: "30+ Systems", value: "Delivered" },
    { icon: <Users />, label: "30+ Clients", value: "Worldwide" },
    { icon: <Code2 />, label: "15+ Technologies", value: "Mastered" }
  ];

  const expertise = [
    "AI System Architecture",
    "Cybersecurity Engineering",
    "Enterprise SaaS Development",
    "React & Next.js Ecosystems",
    "Agentic AI & LLM Integration",
    "Cloud Infrastructure (AWS, Azure, GCP)",
    "Database Design & Optimization",
    "API Architecture & Integration",
    "Zero-Trust Security Design",
    "DevSecOps & CI/CD",
    "Identity & Verification Systems",
    "Simulation-Based Threat Modeling",
    "Performance Optimization",
    "Systems Integration"
  ];

  return (
    <>
      <SEO 
        title="About Kingsley Munachi | AI Systems Architect & Cybersecurity Engineer"
        description="Learn about Kingsley Munachi, founder of MunAiTech — an AI infrastructure and cybersecurity engineering company with 5+ years delivering production-grade systems for enterprises and government institutions."
        keywords="Kingsley Munachi, AI Systems Architect, Cybersecurity Engineer, MunAiTech, Enterprise AI, Infrastructure Engineer"
        image="https://munai.tech/og-about.jpg"
      />
      <Helmet>
        <meta property="og:image" content="https://munai.tech/og-about.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:image" content="https://munai.tech/og-about.jpg" />
      </Helmet>
      <StructuredData 
        type="person"
        breadcrumbs={[
          { name: "Home", url: "/" },
          { name: "About", url: "/about" }
        ]}
      />

      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white">
        <Navbar />
        
        {/* Hero Section */}
        <section className="pt-32 pb-16 px-4">
          <div className="container mx-auto max-w-4xl text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              About <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Kingsley Munachi</span>
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto">
              AI Systems Architect & Cybersecurity Engineer with over five years of professional experience 
              engineering scalable, production-grade intelligent systems for enterprises and government institutions.
            </p>
          </div>
        </section>
        
        {/* Story Section */}
        <section className="py-16 px-4 bg-black/50">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-3xl font-bold mb-12 text-center text-cyan-400">The Journey</h2>
            <div className="max-w-4xl mx-auto">
              <div className="prose prose-lg prose-invert max-w-none">
                <p className="text-gray-300 leading-relaxed mb-6">
                  With over 5 years of professional experience in AI systems architecture and full-stack engineering, I've had the privilege of working with startups, enterprises, and government institutions across multiple countries. My journey began with a fascination for how intelligent systems and robust security could solve real-world problems at scale.
                </p>
                <p className="text-gray-300 leading-relaxed mb-6">
                  I specialize in engineering scalable, secure systems that integrate artificial intelligence with embedded cybersecurity. From agentic AI platforms to enterprise SaaS systems, I've delivered 30+ production-grade systems for clients worldwide — spanning fintech, defence, government, and enterprise environments.
                </p>
                <p className="text-gray-300 leading-relaxed mb-6">
                  As founder of MunAiTech (15071995 LLC), I lead a company focused on building production-grade intelligent systems at the intersection of AI, security, and infrastructure. We actively engage with Canada's most critical technology initiatives, including sovereign AI infrastructure and national defence communications.
                </p>
                <p className="text-gray-300 leading-relaxed">
                  I'm also an official <a href="https://base44.com" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:text-cyan-300 underline underline-offset-2">Base44 Partner</a>, connecting with clients through the platform to deliver AI-powered systems and enterprise solutions with a streamlined workflow.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Achievements */}
        <section className="py-16 px-4 bg-gradient-to-br from-black via-gray-900 to-black">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-3xl font-bold mb-12 text-center text-cyan-400">Achievements</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {achievements.map((achievement, index) => (
                <Card key={index} className="border-2 border-cyan-500/20 hover:border-cyan-400/40 transition-all hover:shadow-lg hover:shadow-cyan-500/20 bg-black/50">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 mx-auto mb-4 text-cyan-400">
                      {achievement.icon}
                    </div>
                    <h3 className="font-bold text-2xl mb-2 text-white">{achievement.value}</h3>
                    <p className="text-gray-400">{achievement.label}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Core Values */}
        <section className="py-16 px-4 bg-black/50">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-3xl font-bold mb-12 text-center text-cyan-400">Core Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {values.map((value, index) => (
                <Card key={index} className="border-2 border-cyan-500/20 hover:border-blue-500/40 transition-all bg-black/50">
                  <CardContent className="p-8">
                    <div className="text-cyan-400 mb-4">{value.icon}</div>
                    <h3 className="text-xl font-bold mb-3 text-white">{value.title}</h3>
                    <p className="text-gray-300 leading-relaxed">{value.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Expertise */}
        <section className="py-16 px-4 bg-gradient-to-br from-black via-gray-900 to-black">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 text-cyan-400">Engineering Expertise</h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                A comprehensive skill set spanning AI systems architecture, cybersecurity engineering, and cloud infrastructure.
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {expertise.map((skill, index) => (
                <div 
                  key={index}
                  className="flex items-center gap-2 p-4 bg-black/50 rounded-lg hover:bg-cyan-500/10 transition-colors border border-cyan-500/20"
                >
                  <GraduationCap className="w-5 h-5 text-cyan-400 flex-shrink-0" />
                  <span className="text-sm font-medium text-white">{skill}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Education & Certifications */}
        <section className="py-16 px-4 bg-black/50">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-3xl font-bold mb-12 text-center text-cyan-400">Education & Certifications</h2>
            <div className="space-y-6">
              <Card className="bg-black/50 border-cyan-500/20">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-cyan-500/10 flex items-center justify-center flex-shrink-0">
                      <GraduationCap className="w-6 h-6 text-cyan-400" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-lg mb-1 text-white">Bachelor of Science (BSc)</h3>
                      <p className="text-gray-300 mb-2">University of Calabar</p>
                      <p className="text-sm text-gray-400">Calabar, Cross River State, Nigeria</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-black/50 border-cyan-500/20">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-cyan-500/10 flex items-center justify-center flex-shrink-0">
                      <GraduationCap className="w-6 h-6 text-cyan-400" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-lg mb-1 text-white">Diploma</h3>
                      <p className="text-gray-300 mb-2">Temple Gate Polytechnic</p>
                      <p className="text-sm text-gray-400">Aba, Abia State, Nigeria</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-black/50 border-cyan-500/20">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-cyan-500/10 flex items-center justify-center flex-shrink-0">
                      <Award className="w-6 h-6 text-cyan-400" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-lg mb-2 text-white">Professional Certifications</h3>
                      <ul className="space-y-2 text-gray-300">
                        <li>• AWS Certified Solutions Architect</li>
                        <li>• Google Cloud Professional Developer</li>
                        <li>• Microsoft Azure AI Engineer</li>
                        <li>• Meta React Advanced Certification</li>
                        <li>• Advanced UI/UX Design Specialization</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 px-4 bg-gradient-to-br from-black via-gray-900 to-black">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">Let&apos;s Engineer Something Extraordinary</h2>
            <p className="text-xl text-gray-400 mb-8">
              Work with MunAiTech to design and deploy secure, intelligent systems.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/contact" className="inline-flex items-center justify-center px-8 py-3 bg-gradient-to-r from-cyan-400 to-blue-600 text-black font-semibold rounded-lg hover:opacity-90 transition-opacity">
                Start an Engagement
              </a>
              <a href="/projects" className="inline-flex items-center justify-center px-8 py-3 border-2 border-cyan-500/30 hover:border-cyan-400 text-white font-semibold rounded-lg transition-colors">
                View Case Studies
              </a>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default About;
