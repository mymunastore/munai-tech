import Navbar from "@/components/Navbar";
import founderPhoto from "@/assets/founder-photo.jpg";
import Footer from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { StructuredData } from "@/components/StructuredData";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Briefcase, Code2, Heart, Lightbulb, Target, Users, Zap, 
  Building2, Globe, Shield, Brain, Server, ArrowRight, 
  Rocket, Eye, Award, MapPin, CheckCircle2
} from "lucide-react";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const About = () => {
  const values = [
    {
      icon: <Rocket className="w-8 h-8" />,
      title: "Innovation-Driven",
      description: "We push the boundaries of AI and cybersecurity, engineering systems that anticipate tomorrow's challenges and deliver lasting competitive advantage."
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: "Results-Focused",
      description: "Every engagement is measured by outcomes — reduced risk, increased efficiency, and systems that perform at enterprise scale without compromise."
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Global-First",
      description: "We build infrastructure that operates across borders, aligned with international standards, regulatory frameworks, and sovereign technology requirements."
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Security by Design",
      description: "Security is not an afterthought — it's embedded into every layer of our architecture, from identity verification to threat modeling and zero-trust systems."
    }
  ];

  const companyStats = [
    { icon: <Briefcase />, label: "Systems Delivered", value: "30+" },
    { icon: <Users />, label: "Enterprise Clients", value: "25+" },
    { icon: <Globe />, label: "Countries Served", value: "4+" },
    { icon: <Code2 />, label: "Years in Operation", value: "5+" },
    { icon: <Award />, label: "Global Recognitions", value: "4" },
    { icon: <Shield />, label: "Security Certifications", value: "3+" }
  ];

  const services = [
    { icon: Brain, title: "AI Infrastructure Engineering", description: "End-to-end design and deployment of intelligent systems, agentic workflows, LLM-powered platforms, and autonomous decision engines." },
    { icon: Shield, title: "Cybersecurity Architecture", description: "Zero-trust architecture, simulation-based threat modeling, identity verification, and embedded security for critical enterprise systems." },
    { icon: Server, title: "Enterprise Platform Development", description: "Scalable SaaS platforms, cloud-native infrastructure, distributed API architecture, and full-stack engineering for high-performance environments." },
    { icon: Building2, title: "Government & Defence Systems", description: "Production-grade systems for national defence, government technology initiatives, sovereign AI infrastructure, and secure communications." },
  ];

  const milestones = [
    { year: "2020", event: "Company Founded", description: "MunAiTech began operations with a focus on AI systems and cybersecurity engineering, delivering early production-grade platforms." },
    { year: "2022", event: "First Enterprise Deployments", description: "Delivered initial production-grade platforms for fintech and enterprise clients across multiple countries." },
    { year: "2023", event: "Government Engagement", description: "Began engaging with government technology initiatives and institutional infrastructure projects." },
    { year: "2025", event: "Incorporation & Global Expansion", description: "Officially incorporated as 15071995 LLC. Expanded operations internationally with Base44 partnership, Lovable Platinum status, and 30+ systems delivered worldwide." },
    { year: "2026", event: "International Recognition", description: "Received official recognition from Canada (ISED & DND) for sovereign AI and defence technology capabilities. Achieved global platform certifications." },
  ];

  return (
    <>
      <SEO 
        title="Company | MunAiTech — Global AI Infrastructure & Cybersecurity Engineering"
        description="MunAiTech is a global AI infrastructure and cybersecurity engineering company. We design and deploy production-grade intelligent systems for enterprise and government environments worldwide."
        keywords="MunAiTech, AI Infrastructure, Cybersecurity Engineering, Enterprise AI, Government Technology, Global Operations"
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
          { name: "Company", url: "/about" }
        ]}
      />

      <div className="min-h-screen bg-background text-foreground">
        <Navbar />
        
        {/* Hero Section */}
        <section className="pt-32 pb-20 px-4 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-accent/5 rounded-full blur-3xl opacity-30" />
          <div className="container mx-auto max-w-4xl text-center relative z-10">
            <motion.div
              initial={{ opacity: 1, y: 0 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-semibold mb-6">
                <Building2 className="h-4 w-4" />
                Global AI & Cybersecurity Company
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-foreground">
                About <span className="bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">MunAiTech</span>
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
                A global AI infrastructure and cybersecurity engineering company building 
                production-grade intelligent systems for enterprise and government environments worldwide.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="grid md:grid-cols-2 gap-12">
              <motion.div
                initial={{ opacity: 1, x: 0 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <Card className="h-full border border-border bg-card hover:border-accent/30 transition-all">
                  <CardContent className="p-8 md:p-10">
                    <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center mb-6">
                      <Target className="w-7 h-7 text-accent" />
                    </div>
                    <h2 className="text-2xl font-bold mb-4 text-foreground">
                      Our <span className="text-accent">Mission</span>
                    </h2>
                    <p className="text-muted-foreground leading-relaxed">
                      To design, build, and deploy production-grade intelligent systems with 
                      embedded security that enable enterprises and government institutions to 
                      operate, scale, and make critical decisions with confidence. We engineer 
                      platforms that are secure by design, intelligent by default, and built 
                      for enterprise-scale deployment across global environments.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 1, x: 0 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.15 }}
              >
                <Card className="h-full border border-border bg-card hover:border-accent/30 transition-all">
                  <CardContent className="p-8 md:p-10">
                    <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center mb-6">
                      <Eye className="w-7 h-7 text-accent" />
                    </div>
                    <h2 className="text-2xl font-bold mb-4 text-foreground">
                      Our <span className="text-accent">Vision</span>
                    </h2>
                    <p className="text-muted-foreground leading-relaxed">
                      To become a globally recognized leader in AI infrastructure and cybersecurity 
                      engineering — powering the intelligent systems that drive modern organizations, 
                      national institutions, and critical infrastructure. We envision a world where 
                      every enterprise operates on infrastructure that is both intelligent and 
                      inherently secure.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Company Overview */}
        <section className="py-20 px-4 bg-muted/30">
          <div className="container mx-auto max-w-6xl">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 1, y: 0 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <span className="inline-block px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-semibold mb-4">
                  Who We Are
                </span>
                <h2 className="text-3xl font-bold mb-6 text-foreground">
                  Engineering <span className="text-accent">Global</span> Infrastructure
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    MunAiTech (15071995 LLC) is a for-profit technology company specializing in 
                    AI infrastructure and cybersecurity engineering. We operate at the intersection 
                    of artificial intelligence, security, and cloud infrastructure — engineering 
                    platforms that power modern organizations and national systems.
                  </p>
                  <p>
                    From sovereign AI data centre infrastructure to defence communications systems, 
                    MunAiTech has delivered 30+ production-grade platforms for clients across fintech, 
                    defence, government, and enterprise environments spanning multiple countries.
                  </p>
                  <p>
                    Our systems are built to handle the demands of mission-critical environments — 
                    where failure is not an option and security cannot be an afterthought. We leverage 
                    quantum-ready architecture and cutting-edge AI to build systems that operate at scale.
                  </p>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 1, y: 0 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.15 }}
                className="grid grid-cols-2 sm:grid-cols-3 gap-4"
              >
                {companyStats.map((stat, index) => (
                  <Card key={index} className="border border-border hover:border-accent/30 transition-all bg-card">
                    <CardContent className="p-5 text-center">
                      <div className="w-10 h-10 mx-auto mb-3 text-accent">
                        {stat.icon}
                      </div>
                      <h3 className="font-bold text-2xl mb-1 text-foreground">{stat.value}</h3>
                      <p className="text-xs text-muted-foreground">{stat.label}</p>
                    </CardContent>
                  </Card>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* What We Do */}
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-6xl">
            <motion.div
              initial={{ opacity: 1, y: 0 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <span className="inline-block px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-semibold mb-4">
                Capabilities
              </span>
              <h2 className="text-3xl font-bold text-foreground">What We Engineer</h2>
              <p className="text-muted-foreground mt-3 max-w-2xl mx-auto">
                Enterprise-grade capabilities spanning AI, cybersecurity, and infrastructure engineering.
              </p>
            </motion.div>
            <div className="grid md:grid-cols-2 gap-6">
              {services.map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 1, y: 0 }}
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

        {/* Company Timeline */}
        <section className="py-20 px-4 bg-muted/30">
          <div className="container mx-auto max-w-4xl">
            <motion.div
              initial={{ opacity: 1, y: 0 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <span className="inline-block px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-semibold mb-4">
                Our Journey
              </span>
              <h2 className="text-3xl font-bold text-foreground">Company Milestones</h2>
            </motion.div>
            
            <div className="relative">
              <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-px" />
              
              {milestones.map((milestone, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 1, y: 0 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`relative flex items-start gap-6 mb-8 ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  <div className={`flex-1 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'} hidden md:block`}>
                    {index % 2 === 0 && (
                      <Card className="inline-block border border-border bg-card hover:border-accent/30 transition-all">
                        <CardContent className="p-6">
                          <span className="text-accent font-bold text-lg">{milestone.year}</span>
                          <h3 className="text-lg font-bold text-foreground mt-1">{milestone.event}</h3>
                          <p className="text-sm text-muted-foreground mt-2">{milestone.description}</p>
                        </CardContent>
                      </Card>
                    )}
                  </div>
                  
                  <div className="relative z-10 w-8 h-8 rounded-full bg-accent/20 border-2 border-accent flex items-center justify-center shrink-0 mt-1">
                    <div className="w-3 h-3 rounded-full bg-accent" />
                  </div>
                  
                  <div className={`flex-1 ${index % 2 === 1 ? 'md:text-left' : 'md:text-right md:hidden'}`}>
                    <Card className="border border-border bg-card hover:border-accent/30 transition-all">
                      <CardContent className="p-6">
                        <span className="text-accent font-bold text-lg">{milestone.year}</span>
                        <h3 className="text-lg font-bold text-foreground mt-1">{milestone.event}</h3>
                        <p className="text-sm text-muted-foreground mt-2">{milestone.description}</p>
                      </CardContent>
                    </Card>
                  </div>

                  {index % 2 === 1 && (
                    <div className="flex-1 hidden md:block" />
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Founder's Bio — Expanded */}
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-5xl">
            {/* Founder Photo — Above Heading */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex justify-center mb-8"
            >
              <div className="relative group">
                <div className="absolute -inset-2 bg-gradient-to-br from-accent/30 to-primary/30 rounded-full blur-lg opacity-60 group-hover:opacity-100 transition-opacity" />
                <img
                  src={founderPhoto}
                  alt="Founder & CEO of MunAiTech"
                  className="relative w-40 h-40 md:w-48 md:h-48 object-cover object-top rounded-full border-4 border-accent/30 shadow-2xl"
                  loading="lazy"
                />
              </div>
            </motion.div>

            {/* Leadership Heading */}
            <motion.div
              initial={{ opacity: 1, y: 0 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <span className="inline-block px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-semibold mb-4">
                Leadership
              </span>
              <h2 className="text-3xl font-bold text-foreground">Founder & CEO</h2>
              <p className="text-accent font-medium text-sm mt-2">MunAiTech (15071995 LLC)</p>
              <div className="flex items-center justify-center gap-2 mt-1 text-xs text-muted-foreground">
                <MapPin className="h-3 w-3" />
                <span>Kentucky, USA • Global</span>
              </div>
              <p className="text-muted-foreground mt-3 max-w-2xl mx-auto">
                The driving force behind MunAiTech's vision and technical execution.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 1, y: 0 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Card className="border border-border bg-card overflow-hidden">
                <CardContent className="p-8 md:p-12">
                  <div className="grid md:grid-cols-3 gap-8">
                    {/* Bio Content */}
                    <div className="md:col-span-2 space-y-5">
                      <div className="space-y-4 text-muted-foreground leading-relaxed">
                        <p>
                          With over 5 years of professional experience in AI systems architecture, 
                          cybersecurity engineering, and enterprise platform development, the founder 
                          of MunAiTech has built and deployed 30+ production-grade systems for clients 
                          across fintech, defence, government, and enterprise environments spanning 
                          multiple countries.
                        </p>
                        <p>
                          A hands-on technical leader who operates at the intersection of AI, security, 
                          and infrastructure — engineering platforms from concept to production deployment. 
                          The founder actively engages with critical global technology initiatives including 
                          sovereign AI infrastructure programs, defence communications systems, and 
                          quantum-ready architecture development.
                        </p>
                        <p>
                          Under the founder's leadership, MunAiTech has received international recognition 
                          from Canada's Innovation, Science and Economic Development (ISED) department 
                          and the Department of National Defence (DND) for contributions to sovereign AI 
                          data centre infrastructure and LEO SATCOM defence communications — validating 
                          the company's capabilities at the highest levels of government technology.
                        </p>
                        <p>
                          The founder also established MunAiTech as an official{" "}
                          <a href="https://base44.com" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline font-medium">
                            Base44 Partner
                          </a>{" "}
                          and achieved{" "}
                          <span className="text-accent font-medium">Lovable Platinum</span>{" "}
                          certification — further validating the company's engineering excellence and 
                          innovation capabilities on global platforms.
                        </p>
                      </div>
                    </div>

                    {/* Credentials Sidebar */}
                    <div className="space-y-6">
                      <div>
                        <h4 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-3">Core Expertise</h4>
                        <div className="flex flex-wrap gap-2">
                          {["AI Architecture", "Cybersecurity", "Enterprise SaaS", "Cloud Infrastructure", "Agentic AI", "Zero-Trust Design", "Quantum Systems", "Defence Tech"].map((skill) => (
                            <span key={skill} className="px-3 py-1.5 text-xs rounded-lg bg-accent/10 text-accent border border-accent/20">
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-3">Recognitions</h4>
                        <div className="space-y-3">
                          {[
                            { label: "ISED Canada — Sovereign AI", icon: <Award className="h-4 w-4" /> },
                            { label: "DND Canada — LEO SATCOM", icon: <Shield className="h-4 w-4" /> },
                            { label: "Base44 Official Partner", icon: <CheckCircle2 className="h-4 w-4" /> },
                            { label: "Lovable Platinum Certified", icon: <CheckCircle2 className="h-4 w-4" /> },
                          ].map((item) => (
                            <div key={item.label} className="flex items-center gap-2 text-sm text-muted-foreground">
                              <span className="text-accent">{item.icon}</span>
                              {item.label}
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-3">Sectors Served</h4>
                        <div className="space-y-2 text-sm text-muted-foreground">
                          {["Enterprise & SaaS", "Government & Defence", "Fintech & Finance", "Healthcare & Public Sector", "Critical Infrastructure"].map((sector) => (
                            <div key={sector} className="flex items-center gap-2">
                              <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                              {sector}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </section>

        {/* Core Values */}
        <section className="py-20 px-4 bg-muted/30">
          <div className="container mx-auto max-w-6xl">
            <motion.div
              initial={{ opacity: 1, y: 0 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <span className="inline-block px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-semibold mb-4">
                Our Principles
              </span>
              <h2 className="text-3xl font-bold text-foreground">Core Values</h2>
              <p className="text-muted-foreground mt-3 max-w-2xl mx-auto">
                The principles that guide every system we engineer and every engagement we deliver.
              </p>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {values.map((value, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 1, y: 0 }}
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
        <section className="py-24 px-4 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
          <div className="container mx-auto max-w-4xl text-center relative z-10">
            <motion.div
              initial={{ opacity: 1, y: 0 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">
                Ready to Build Secure, Intelligent Infrastructure?
              </h2>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Partner with MunAiTech to design and deploy production-grade systems for your organization.
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