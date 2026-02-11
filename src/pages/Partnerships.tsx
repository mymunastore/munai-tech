import { memo } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, ExternalLink, Shield, Handshake } from "lucide-react";
import base44Logo from "@/assets/clients/base44.png";
import base44Approval from "@/assets/partnerships/base44-partner-approval.png";

const Partnerships = memo(() => {
  return (
    <>
      <SEO
        title="Official Partnerships | MunAiTech"
        description="Explore MunAiTech's official technology partnerships and certifications. Trusted partner of Base44 and other leading platforms."
        image="/og-about.jpg"
      />
      <Navbar />
      <main id="main-content" className="min-h-screen bg-background pt-24 pb-16">
        {/* Hero */}
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 mb-6">
              <Handshake className="h-4 w-4 text-accent" />
              <span className="text-sm font-medium text-accent">Official Partnerships</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Trusted Technology <span className="text-accent">Partnerships</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              We collaborate with industry-leading platforms to deliver exceptional solutions. 
              Each partnership reflects our commitment to quality and innovation.
            </p>
          </div>
        </section>

        {/* Base44 Partnership */}
        <section className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="overflow-hidden border border-accent/20 bg-card/50 backdrop-blur-sm shadow-xl max-w-4xl mx-auto">
            {/* Certificate Header */}
            <div className="bg-gradient-to-r from-accent/10 via-primary/5 to-accent/10 border-b border-accent/20 p-6 md:p-8">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-xl bg-background/80 border border-border flex items-center justify-center p-2">
                    <img src={base44Logo} alt="Base44 Logo" className="w-full h-full object-contain" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-foreground">Base44 Partner Program</h2>
                    <p className="text-muted-foreground text-sm">Official Technology Partner</p>
                  </div>
                </div>
                <Badge className="bg-green-500/10 text-green-500 border-green-500/20 gap-1.5 px-3 py-1.5">
                  <CheckCircle className="h-3.5 w-3.5" />
                  Verified Partner
                </Badge>
              </div>
            </div>

            <CardContent className="p-6 md:p-8 space-y-8">
              {/* Partner Details */}
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                    <Shield className="h-5 w-5 text-accent" />
                    Partnership Details
                  </h3>
                  <dl className="space-y-3 text-sm">
                    <div className="flex justify-between border-b border-border/50 pb-2">
                      <dt className="text-muted-foreground">Partner</dt>
                      <dd className="font-medium text-foreground">MunAiTech (munaitech)</dd>
                    </div>
                    <div className="flex justify-between border-b border-border/50 pb-2">
                      <dt className="text-muted-foreground">Program</dt>
                      <dd className="font-medium text-foreground">Base44 Partner Program</dd>
                    </div>
                    <div className="flex justify-between border-b border-border/50 pb-2">
                      <dt className="text-muted-foreground">Status</dt>
                      <dd className="font-medium text-green-500">Active</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-muted-foreground">Platform</dt>
                      <dd>
                        <a
                          href="https://www.base44.com"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-medium text-accent hover:underline inline-flex items-center gap-1"
                        >
                          base44.com <ExternalLink className="h-3 w-3" />
                        </a>
                      </dd>
                    </div>
                  </dl>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-foreground">How It Works</h3>
                  <ul className="space-y-3 text-sm text-muted-foreground">
                    <li className="flex gap-2">
                      <CheckCircle className="h-4 w-4 text-accent mt-0.5 shrink-0" />
                      <span>Receive email notifications with project details when users request quotes</span>
                    </li>
                    <li className="flex gap-2">
                      <CheckCircle className="h-4 w-4 text-accent mt-0.5 shrink-0" />
                      <span>Connect directly with users to learn more about their requirements</span>
                    </li>
                    <li className="flex gap-2">
                      <CheckCircle className="h-4 w-4 text-accent mt-0.5 shrink-0" />
                      <span>Share quotes and collaborate on project details together</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Official Document */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground">Official Approval Document</h3>
                <div className="rounded-xl border border-border/50 overflow-hidden bg-background/50">
                  <img
                    src={base44Approval}
                    alt="Base44 Partner Program Approval Letter"
                    className="w-full h-auto"
                    loading="lazy"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>
      <Footer />
    </>
  );
});

Partnerships.displayName = "Partnerships";

export default Partnerships;
