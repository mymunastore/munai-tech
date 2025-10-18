import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ContactForm } from "@/components/ContactForm";
import { TestimonialForm } from "@/components/TestimonialForm";
import { ReceiptGenerator } from "@/components/ReceiptGenerator";
import { Mail, MapPin, Phone, Star, FileText } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Contact = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-primary/5 to-accent/5">
        <div className="container px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Let&apos;s Work Together
            </h1>
            <p className="text-lg text-muted-foreground">
              Have a project in mind? Let&apos;s discuss how we can create something amazing together.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16">
        <div className="container px-4">
          <div className="grid lg:grid-cols-3 gap-12 max-w-6xl mx-auto">
            {/* Contact Info */}
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold mb-6">Get in Touch</h3>
                <p className="text-muted-foreground mb-8">
                  I&apos;m always open to discussing new projects, creative ideas, or opportunities to be part of your visions.
                </p>
              </div>

              <Card>
                <CardContent className="p-6 space-y-6">
                  <div className="flex items-start gap-4">
                    <Mail className="h-6 w-6 text-accent mt-1" />
                    <div>
                      <h4 className="font-semibold mb-1">Email</h4>
                      <a href="mailto:info@mymuna.store" className="text-muted-foreground hover:text-accent transition-colors">
                        info@mymuna.store
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <Phone className="h-6 w-6 text-accent mt-1" />
                    <div>
                      <h4 className="font-semibold mb-1">WhatsApp</h4>
                      <a href="https://wa.me/2347062372521" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-accent transition-colors">
                        +234 706 237 2521 (WhatsApp only)
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <MapPin className="h-6 w-6 text-accent mt-1" />
                    <div>
                      <h4 className="font-semibold mb-1">Location</h4>
                      <p className="text-muted-foreground">
                        Lagos, Nigeria<br />
                        <span className="text-accent font-medium">Available for Remote Work</span>
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div>
                <h4 className="font-semibold mb-4">Response Time</h4>
                <p className="text-muted-foreground text-sm">
                  I typically respond within 24 hours on business days. For urgent matters, please mention it in your message.
                </p>
              </div>
            </div>

            {/* Contact Form with Tabs */}
            <div className="lg:col-span-2">
              <Card>
                <CardContent className="p-8">
                  <Tabs defaultValue="contact" className="w-full">
                    <TabsList className="grid w-full grid-cols-3 mb-6">
                      <TabsTrigger value="contact" className="flex items-center gap-2">
                        <Mail className="h-4 w-4" />
                        Contact
                      </TabsTrigger>
                      <TabsTrigger value="review" className="flex items-center gap-2">
                        <Star className="h-4 w-4" />
                        Leave Review
                      </TabsTrigger>
                      <TabsTrigger value="receipt" className="flex items-center gap-2">
                        <FileText className="h-4 w-4" />
                        Receipt
                      </TabsTrigger>
                    </TabsList>

                    <TabsContent value="contact">
                      <h3 className="text-2xl font-bold mb-6">Send a Message</h3>
                      <ContactForm />
                    </TabsContent>

                    <TabsContent value="review">
                      <h3 className="text-2xl font-bold mb-2">Share Your Experience</h3>
                      <p className="text-muted-foreground mb-6">
                        Worked with me? I&apos;d love to hear your feedback!
                      </p>
                      <TestimonialForm />
                    </TabsContent>

                    <TabsContent value="receipt">
                      <p className="text-muted-foreground mb-6">
                        Generate a branded payment receipt for your transaction.
                      </p>
                      <ReceiptGenerator />
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
