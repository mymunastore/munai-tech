import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ContactForm } from "@/components/ContactForm";
import { Helmet } from "react-helmet";
import { Mail, Phone, MapPin, Github, Linkedin, Globe } from "lucide-react";

const Contact = () => {
  return (
    <>
      <Helmet>
        <title>Contact | Kingsley Munachi — Web Developer</title>
        <meta name="description" content="Contact Kingsley Munachi, Full-Stack Web & AI Developer. Open to remote-first and Canada-based opportunities. Let's discuss how I can contribute to your team." />
        <meta name="keywords" content="Contact, Hire Developer, Web Developer, Full-Stack Developer, Remote Developer, Canada" />
        <link rel="canonical" href="https://munai.tech/contact" />
        
        <meta property="og:title" content="Contact | Kingsley Munachi" />
        <meta property="og:description" content="Contact Full-Stack Web & AI Developer" />
        <meta property="og:url" content="https://munai.tech/contact" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Navbar />
        
        {/* Contact Section */}
        <section className="pt-32 pb-20">
          <div className="container px-4">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-8">
                Contact
              </h1>
              
              <p className="text-lg text-muted-foreground mb-12">
                Let's discuss how I can contribute to your team.
              </p>

              {/* Contact Information */}
              <div className="grid md:grid-cols-2 gap-12 mb-16">
                <div className="space-y-6">
                  <h2 className="text-2xl font-semibold text-foreground mb-4">Get in Touch</h2>
                  
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Phone className="h-5 w-5 text-primary" />
                      <div>
                        <p className="font-medium text-foreground">Phone</p>
                        <a href="tel:+2347062372521" className="text-muted-foreground hover:text-primary">
                          +234 706 237 2521
                        </a>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <Mail className="h-5 w-5 text-primary" />
                      <div>
                        <p className="font-medium text-foreground">Email</p>
                        <a href="mailto:info@mymuna.store" className="text-muted-foreground hover:text-primary">
                          info@mymuna.store
                        </a>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <Globe className="h-5 w-5 text-primary" />
                      <div>
                        <p className="font-medium text-foreground">Portfolio</p>
                        <a href="https://munai.tech" className="text-muted-foreground hover:text-primary">
                          munai.tech
                        </a>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <Github className="h-5 w-5 text-primary" />
                      <div>
                        <p className="font-medium text-foreground">GitHub</p>
                        <a href="https://github.com/mymunastore" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary">
                          github.com/mymunastore
                        </a>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <Linkedin className="h-5 w-5 text-primary" />
                      <div>
                        <p className="font-medium text-foreground">LinkedIn</p>
                        <a href="https://www.linkedin.com/in/kingsley-munachi-843591244" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary">
                          LinkedIn Profile
                        </a>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <MapPin className="h-5 w-5 text-primary" />
                      <div>
                        <p className="font-medium text-foreground">Location</p>
                        <p className="text-muted-foreground">Nigeria | Open to relocation</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Contact Form */}
                <div>
                  <h2 className="text-2xl font-semibold text-foreground mb-4">Send a Message</h2>
                  <ContactForm />
                </div>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default Contact;
