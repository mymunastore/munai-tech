import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { StructuredData } from "@/components/StructuredData";
import { Card, CardContent } from "@/components/ui/card";
import { Briefcase, Code2, Heart, Lightbulb, Target, Users, Zap, Building2, Globe, Shield, Brain, Server } from "lucide-react";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

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

  const companyStats = [
    { icon: <Briefcase />, label: "Systems Delivered", value: "30+" },
    { icon: <Users />, label: "Enterprise Clients", value: "25+" },
    { icon: <Globe />, label: "Countries Served", value: "4" },
    { icon: <Code2 />, label: "Years in Operation", value: "5+" }
  ];

  const services = [
    { icon: Brain, title: "AI System Architecture", description: "End-to-end design and deployment of intelligent systems, agentic workflows, and LLM-powered platforms." },
    { icon: Shield, title: "Cybersecurity Engineering", description: "Zero-trust architecture, threat modeling, identity verification, and embedded security for enterprise systems." },
    { icon: Server, title: "Enterprise Platform Development", description: "Scalable SaaS platforms, cloud infrastructure, API architecture, and full-stack engineering for high-performance environments." },
    { icon: Building2, title: "Government & Institutional Systems", description: "Production-grade systems for defence, government technology initiatives, and critical infrastructure projects." },
  ];

  return (
    <>
      <SEO 
        title="About MunAiTech | AI Infrastructure & Cybersecurity Engineering Company"
        description="MunAiTech is an AI infrastructure and cybersecurity engineering company delivering production-grade intelligent systems for enterprises and government institutions worldwide."
        keywords="MunAiTech, AI Infrastructure, Cybersecurity Engineering, Enterprise AI, Software Company"
        image="https://munai.tech/og-about.jpg"
      />
      <Helmet>
        <meta property="og:image" content="https://munai.tech/og-about.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:image" content="https://munai.tech/og-about.jpg" />
      </Helmet>
      <StructuredData 
        breadcrumbs={[
          { name: "Home", url: "/" },
          { name: "About", url: "/about" }
        ]}
      />

      <div className="min-h-screen bg-background text-foreground">
        <Navbar />
        
        {/* Hero Section */}
        <section className="pt-32 pb-16 px-4 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
          <div className="container mx-auto max-w-4xl text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-semibold mb-6">
                About the Company
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-foreground">
                About <span className="bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">MunAiTech</span>
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
                An AI infrastructure and cybersecurity engineering company building 
                production-grade intelligent systems for enterprises and government institutions worldwide.
              </p>
            </motion.div>
          </div>
        </section>
        
        {/* Company Story */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-3xl font-bold mb-6 text-foreground">
                  Our <span className="text-accent">Mission</span>
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    MunAiTech (15071995 LLC) is a software development company specializing in 
                    AI infrastructure and cybersecurity engineering. We design, build, and deploy 
                    production-grade intelligent systems with embedded security for organizations 
                    that demand reliability at scale.
                  </p>
                  <p>
                    We operate at the intersection of artificial intelligence, security, and 
                    infrastructure — engineering platforms that are secure by design, intelligent 
                    by default, and built for enterprise-scale deployment.
                  </p>
                  <p>
                    From agentic AI platforms to enterprise SaaS systems, MunAiTech has delivered 
                    30+ production-grade systems for clients across fintech, defence, government, 
                    and enterprise environments spanning multiple countries.
                  </p>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="grid grid-cols-2 gap-4"
              >
                {companyStats.map((stat, index) => (
                  <Card key={index} className="border border-border hover:border-accent/30 transition-all bg-card">
                    <CardContent className="p-6 text-center">
                      <div className="w-10 h-10 mx-auto mb-3 text-accent">
                        {stat.icon}
                      </div>
                      <h3 className="font-bold text-2xl mb-1 text-foreground">{stat.value}</h3>
                      <p className="text-sm text-muted-foreground">{stat.label}</p>
                    </CardContent>
                  </Card>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* What We Do */}
        <section className="py-16 px-4 bg-muted/30">
          <div className="container mx-auto max-w-6xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <span className="inline-block px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-semibold mb-4">
                What We Do
              </span>
              <h2 className="text-3xl font-bold text-foreground">Our Core Services</h2>
            </motion.div>
            <div className="grid md:grid-cols-2 gap-6">
              {services.map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="h-full border border-border hover:border-accent/30 transition-all bg-card group">
                    <CardContent className="p-8">
                      <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                        <service.icon className="w-6 h-6 text-accent" />
                      </div>
                      <h3 className="text-xl font-bold mb-3 text-foreground group-hover:text-accent transition-colors">{service.title}</h3>
                      <p className="text-muted-foreground leading-relaxed">{service.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Founder's Bio */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <span className="inline-block px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-semibold mb-4">
                Leadership
              </span>
              <h2 className="text-3xl font-bold text-foreground">Founder & CEO</h2>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Card className="border border-border bg-card overflow-hidden">
                <CardContent className="p-8 md:p-10">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-2xl font-bold text-foreground mb-1">Founder & Technical Lead</h3>
                      <p className="text-accent font-medium">MunAiTech (15071995 LLC)</p>
                    </div>
                    
                    <div className="space-y-4 text-muted-foreground leading-relaxed">
                      <p>
                        With over 5 years of professional experience in AI systems architecture and 
                        full-stack engineering, the founder of MunAiTech has worked with startups, 
                        enterprises, and government institutions across multiple countries — delivering 
                        30+ production-grade platforms spanning fintech, defence, government, and 
                        enterprise sectors.
                      </p>
                      <p>
                        Specializing in engineering scalable, secure systems that integrate artificial 
                        intelligence with embedded cybersecurity, the company actively engages with 
                        critical technology initiatives including sovereign AI infrastructure and 
                        national defence communications.
                      </p>
                      <p>
                        MunAiTech is also an official{" "}
                        <a href="https://base44.com" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
                          Base44 Partner
                        </a>, delivering AI-powered systems and enterprise solutions through the platform.
                      </p>
                    </div>
                    
                    <div className="flex flex-wrap gap-3 pt-2">
                      {["AI Architecture", "Cybersecurity", "Enterprise SaaS", "Cloud Infrastructure", "Agentic AI", "Zero-Trust Design"].map((skill) => (
                        <span key={skill} className="px-3 py-1.5 text-sm rounded-lg bg-accent/10 text-accent border border-accent/20">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </section>

        {/* Core Values */}
        <section className="py-16 px-4 bg-muted/30">
          <div className="container mx-auto max-w-6xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <span className="inline-block px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-semibold mb-4">
                Our DNA
              </span>
              <h2 className="text-3xl font-bold text-foreground">Core Values</h2>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {values.map((value, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="h-full border border-border hover:border-accent/30 transition-all bg-card group">
                    <CardContent className="p-8">
                      <div className="text-accent mb-4 group-hover:scale-110 transition-transform inline-block">{value.icon}</div>
                      <h3 className="text-xl font-bold mb-3 text-foreground group-hover:text-accent transition-colors">{value.title}</h3>
                      <p className="text-muted-foreground leading-relaxed">{value.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 px-4 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
          <div className="container mx-auto max-w-4xl text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">Ready to Build Something Extraordinary?</h2>
              <p className="text-xl text-muted-foreground mb-8">
                Partner with MunAiTech to design and deploy secure, intelligent systems for your organization.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/contact">
                  <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-6 text-base font-semibold rounded-xl group">
                    Start an Engagement
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link to="/projects">
                  <Button size="lg" variant="outline" className="border-2 border-accent/40 text-accent hover:bg-accent/10 px-8 py-6 text-base rounded-xl">
                    View Case Studies
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default About;
