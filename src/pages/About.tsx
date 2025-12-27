import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Helmet } from "react-helmet";

const About = () => {
  return (
    <>
      <Helmet>
        <title>About Me | Kingsley Munachi — Web Developer</title>
        <meta name="description" content="I am a Web Developer and Full-Stack Web & AI Developer with over five years of professional experience building scalable, production-ready web applications." />
        <meta name="keywords" content="About Kingsley Munachi, Web Developer, Full-Stack Developer, React, Next.js, Node.js, Remote Developer" />
        <link rel="canonical" href="https://munai.tech/about" />
        
        <meta property="og:title" content="About Me | Kingsley Munachi" />
        <meta property="og:description" content="Web Developer with 5+ years of experience building scalable web applications." />
        <meta property="og:url" content="https://munai.tech/about" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Navbar />
        
        {/* Content Section */}
        <section className="pt-32 pb-20">
          <div className="container px-4">
            <div className="max-w-3xl mx-auto">
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-8">
                About Me
              </h1>
              
              <div className="prose prose-lg max-w-none">
                <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                  I am a Web Developer and Full-Stack Web & AI Developer with over five years of professional experience building scalable, production-ready web applications.
                </p>
                
                <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                  I specialize in frontend and backend development using React, Next.js, Node.js, REST APIs, and modern databases. I also integrate AI-powered features to automate workflows and improve efficiency.
                </p>
                
                <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                  I have worked with distributed teams globally and delivered solutions from concept through deployment.
                </p>
                
                <p className="text-lg text-primary font-medium">
                  I am currently open to remote-first and Canada-based opportunities.
                </p>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default About;
