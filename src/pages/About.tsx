import { Helmet } from "react-helmet";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Award, Briefcase, Code2, GraduationCap, Heart, Lightbulb, Rocket, Target, Users, Zap } from "lucide-react";

const About = () => {
  const values = [
    {
      icon: <Lightbulb className="w-8 h-8" />,
      title: "Innovation First",
      description: "Constantly exploring cutting-edge AI and web technologies to deliver future-ready solutions."
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: "Results Driven",
      description: "Focused on delivering measurable outcomes that exceed client expectations and drive business growth."
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Client Success",
      description: "Your success is my success. Building long-term partnerships through exceptional service and support."
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Agile Excellence",
      description: "Rapid iteration and deployment using modern development practices for faster time-to-market."
    }
  ];

  const achievements = [
    { icon: <Award />, label: "5+ Years Experience", value: "Senior Level" },
    { icon: <Briefcase />, label: "50+ Projects", value: "Delivered" },
    { icon: <Users />, label: "100+ Clients", value: "Worldwide" },
    { icon: <Code2 />, label: "15+ Technologies", value: "Mastered" }
  ];

  const expertise = [
    "AI Integration & Machine Learning",
    "Full-Stack Web Development",
    "React & Next.js Ecosystems",
    "Cloud Architecture (AWS, Azure, GCP)",
    "Database Design & Optimization",
    "API Development & Integration",
    "DevOps & CI/CD Pipelines",
    "UI/UX Design & Prototyping",
    "Mobile-First Development",
    "E-commerce Solutions",
    "SaaS Platform Development",
    "Performance Optimization"
  ];

  return (
    <>
      <Helmet>
        <title>About MunAiTech | Senior AI Engineer & Full-Stack Developer</title>
        <meta name="description" content="Learn about MunAiTech (A 15071995 LLC Company), a senior AI engineer and full-stack developer with 5+ years of experience delivering innovative web solutions and AI-powered applications." />
        <meta name="keywords" content="about munaitech, ai engineer, full-stack developer, web development expert, software engineer, ai integration specialist" />
        <link rel="canonical" href="https://munaitech.com/about" />
        
        <meta property="og:title" content="About MunAiTech | Senior AI Engineer & Full-Stack Developer" />
        <meta property="og:description" content="Learn about MunAiTech, a senior AI engineer with 5+ years of experience delivering innovative solutions." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://munaitech.com/about" />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="About MunAiTech | Senior AI Engineer & Full-Stack Developer" />
        <meta name="twitter:description" content="Learn about MunAiTech, a senior AI engineer with 5+ years of experience." />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Navbar />
        
        {/* Hero Section */}
        <section className="pt-32 pb-16 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-12">
              <Badge className="mb-4 bg-gradient-to-r from-accent to-primary text-primary-foreground">
                <Rocket className="w-4 h-4 mr-2" />
                About MunAiTech
              </Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
                Building the Future with AI & Code
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                A 15071995 LLC Company dedicated to transforming businesses through innovative AI solutions and world-class web development.
              </p>
            </div>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-16 px-4 bg-muted/30">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-3xl font-bold mb-8 text-center">My Journey</h2>
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p className="text-muted-foreground leading-relaxed mb-6">
                With over 5 years of professional experience in software development and AI engineering, I've had the privilege of working with startups, enterprises, and everything in between. My journey began with a fascination for how technology could solve real-world problems, and that passion has only grown stronger.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-6">
                As the founder of MunAiTech (A 15071995 LLC Company), I specialize in creating intelligent, scalable solutions that combine the power of artificial intelligence with robust full-stack development. From AI-powered chatbots to complex SaaS platforms, I've delivered over 50 successful projects for clients worldwide.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Based in Lagos, Nigeria, with remote availability globally, I work with clients across different time zones, delivering excellence regardless of location. My approach combines technical expertise with business acumen, ensuring that every solution not only works flawlessly but also drives measurable results.
              </p>
            </div>
          </div>
        </section>

        {/* Achievements */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-3xl font-bold mb-12 text-center">Achievements</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {achievements.map((achievement, index) => (
                <Card key={index} className="border-2 hover:border-accent transition-all hover:shadow-lg">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 mx-auto mb-4 text-accent">
                      {achievement.icon}
                    </div>
                    <h3 className="font-bold text-2xl mb-2">{achievement.value}</h3>
                    <p className="text-muted-foreground">{achievement.label}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Core Values */}
        <section className="py-16 px-4 bg-muted/30">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-3xl font-bold mb-12 text-center">Core Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {values.map((value, index) => (
                <Card key={index} className="border-2 hover:border-primary transition-all">
                  <CardContent className="p-8">
                    <div className="text-primary mb-4">{value.icon}</div>
                    <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{value.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Expertise */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Technical Expertise</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                A comprehensive skill set spanning modern web development, AI integration, and cloud technologies.
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {expertise.map((skill, index) => (
                <div 
                  key={index}
                  className="flex items-center gap-2 p-4 bg-muted/50 rounded-lg hover:bg-muted transition-colors border border-border"
                >
                  <GraduationCap className="w-5 h-5 text-accent flex-shrink-0" />
                  <span className="text-sm font-medium">{skill}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Education & Certifications */}
        <section className="py-16 px-4 bg-muted/30">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-3xl font-bold mb-12 text-center">Education & Certifications</h2>
            <div className="space-y-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <GraduationCap className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-lg mb-1">Bachelor of Science in Computer Science</h3>
                      <p className="text-muted-foreground mb-2">University of Nigeria, Nsukka</p>
                      <p className="text-sm text-muted-foreground">Specialized in Artificial Intelligence and Software Engineering</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                      <Award className="w-6 h-6 text-accent" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-lg mb-2">Professional Certifications</h3>
                      <ul className="space-y-2 text-muted-foreground">
                        <li>• AWS Certified Solutions Architect</li>
                        <li>• Google Cloud Professional Developer</li>
                        <li>• Microsoft Azure AI Engineer</li>
                        <li>• Meta React Advanced Certification</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Let's Build Something Amazing Together</h2>
            <p className="text-xl text-muted-foreground mb-8">
              Ready to transform your ideas into reality with cutting-edge AI and web solutions?
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/contact" className="inline-flex items-center justify-center px-8 py-3 bg-gradient-to-r from-accent to-primary text-primary-foreground font-semibold rounded-lg hover:opacity-90 transition-opacity">
                Get In Touch
              </a>
              <a href="/projects" className="inline-flex items-center justify-center px-8 py-3 border-2 border-border hover:border-accent text-foreground font-semibold rounded-lg transition-colors">
                View My Work
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
