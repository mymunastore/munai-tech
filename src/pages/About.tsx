import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Award, Briefcase, Code2, GraduationCap, Heart, Lightbulb, Rocket, Target, Users, Zap } from "lucide-react";
import profileImage from "@/assets/profile.png";

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
    { icon: <Briefcase />, label: "30+ Projects", value: "Delivered" },
    { icon: <Users />, label: "30+ Clients", value: "Worldwide" },
    { icon: <Code2 />, label: "15+ Technologies", value: "Mastered" }
  ];

  const expertise = [
    "Web Design & UI/UX",
    "AI Integration & Machine Learning",
    "Full-Stack Web Development",
    "React & Next.js Ecosystems",
    "Responsive Design Systems",
    "Cloud Architecture (AWS, Azure, GCP)",
    "Database Design & Optimization",
    "API Development & Integration",
    "Design Prototyping & Wireframing",
    "Mobile-First Development",
    "E-commerce Solutions",
    "SaaS Platform Development",
    "Performance Optimization",
    "Brand Identity Design"
  ];

  return (
    <>
      <SEO 
        title="About Kingsley Munachi | Senior Web Designer & AI Full-Stack Developer"
        description="Learn about Kingsley Munachi, a senior web designer and AI full-stack app developer with 5+ years of experience crafting intelligent, scalable solutions that blend design precision with cutting-edge technology."
        keywords="Kingsley Munachi, web designer, ai developer, full-stack developer, web development expert, software engineer, ai integration specialist"
      />

      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white">
        <Navbar />
        
        {/* Hero Section */}
        <section className="pt-32 pb-16 px-4 bg-gradient-to-br from-black via-gray-900 to-black">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-12">
              <Badge className="mb-4 bg-gradient-to-r from-cyan-400 to-blue-600 text-black">
                <Rocket className="w-4 h-4 mr-2" />
                Meet the Creator
              </Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-cyan-400 to-blue-400 bg-clip-text text-transparent">
                Kingsley Munachi
              </h1>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-2">
                Senior Web Designer & AI Full-Stack App Developer
              </p>
              <p className="text-lg text-gray-400 max-w-3xl mx-auto">
                Crafting intelligent, scalable solutions that blend design precision with cutting-edge technology
              </p>
            </div>
          </div>
        </section>

        {/* Story Section with Profile Image */}
        <section className="py-16 px-4 bg-black/50">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-3xl font-bold mb-12 text-center text-cyan-400">My Journey</h2>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              {/* Profile Image */}
              <div className="relative order-2 md:order-1">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/40 via-blue-500/30 to-cyan-400/20 rounded-3xl transform rotate-6 blur-2xl"></div>
                <img 
                  src={profileImage}
                  alt="Kingsley Munachi - Senior Web Designer & AI Full-Stack Developer"
                  className="relative rounded-3xl shadow-2xl w-full h-auto object-cover border-4 border-cyan-500/30 hover:border-cyan-400/50 transition-all duration-500"
                />
              </div>
              
              {/* Story Content */}
              <div className="prose prose-lg prose-invert max-w-none order-1 md:order-2">
                <p className="text-gray-300 leading-relaxed mb-6">
                  With over 5 years of professional experience in web design and AI full-stack development, I've had the privilege of working with startups, enterprises, and everything in between. My journey began with a fascination for how beautiful design and powerful technology could solve real-world problems together.
                </p>
                <p className="text-gray-300 leading-relaxed mb-6">
                  I specialize in creating intelligent, scalable solutions that combine the elegance of pixel-perfect design with the power of artificial intelligence and robust full-stack development. From AI-powered applications to complex web platforms, I've delivered over 50 successful projects for clients worldwide.
                </p>
                <p className="text-gray-300 leading-relaxed">
                  Based in Lagos, Nigeria, with remote availability globally, I work with clients across different time zones, delivering excellence regardless of location. My approach combines design thinking, technical expertise, and business acumen, ensuring that every solution is not just beautiful and functional, but drives measurable results.
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
              <h2 className="text-3xl font-bold mb-4 text-cyan-400">Technical Expertise</h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                A comprehensive skill set spanning modern web development, AI integration, and cloud technologies.
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
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">Let&apos;s Build Something Amazing Together</h2>
            <p className="text-xl text-gray-400 mb-8">
              Ready to transform your ideas into reality with cutting-edge AI and web solutions?
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/contact" className="inline-flex items-center justify-center px-8 py-3 bg-gradient-to-r from-cyan-400 to-blue-600 text-black font-semibold rounded-lg hover:opacity-90 transition-opacity">
                Get In Touch
              </a>
              <a href="/projects" className="inline-flex items-center justify-center px-8 py-3 border-2 border-cyan-500/30 hover:border-cyan-400 text-white font-semibold rounded-lg transition-colors">
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
