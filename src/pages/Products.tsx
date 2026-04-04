import { memo } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import {
  TrendingUp,
  Users,
  FileText,
  Calendar,
  Shield,
  Check,
  Star,
  ArrowRight,
  Sparkles,
  Zap,
} from "lucide-react";

interface Product {
  id: string;
  name: string;
  tagline: string;
  description: string;
  icon: React.ElementType;
  gradientClass: string;
  features: string[];
  pricing: {
    starter: string;
    professional: string;
    enterprise: string;
  };
  rating: number;
  users: string;
}

const products: Product[] = [
  {
    id: "analytics-pro",
    name: "Analytics Pro",
    tagline: "Business Intelligence Platform",
    description:
      "Real-time analytics and reporting engine for data-driven enterprise decisions. Custom dashboards, predictive modeling, and API-first architecture.",
    icon: TrendingUp,
    gradientClass: "from-blue-500 to-cyan-500",
    features: [
      "Real-time dashboards",
      "Custom reports & exports",
      "Predictive analytics",
      "Data visualization",
      "REST & GraphQL APIs",
      "Role-based access control",
    ],
    pricing: { starter: "$49/mo", professional: "$149/mo", enterprise: "Custom" },
    rating: 4.8,
    users: "10K+",
  },
  {
    id: "team-hub",
    name: "TeamHub",
    tagline: "Collaboration Suite",
    description:
      "All-in-one platform for distributed team collaboration, project management, and real-time communication with enterprise security.",
    icon: Users,
    gradientClass: "from-emerald-500 to-teal-500",
    features: [
      "Task & sprint management",
      "Encrypted team chat",
      "Video conferencing",
      "Secure file sharing",
      "Time tracking & billing",
      "Resource planning",
    ],
    pricing: { starter: "$29/mo", professional: "$99/mo", enterprise: "Custom" },
    rating: 4.9,
    users: "25K+",
  },
  {
    id: "doc-flow",
    name: "DocFlow",
    tagline: "Document Management System",
    description:
      "Secure document management and workflow automation with version control, digital signatures, and full audit trails.",
    icon: FileText,
    gradientClass: "from-violet-500 to-purple-500",
    features: [
      "Encrypted document storage",
      "Version control & history",
      "Digital signatures",
      "Workflow automation",
      "Granular access control",
      "Compliance audit trails",
    ],
    pricing: { starter: "$39/mo", professional: "$119/mo", enterprise: "Custom" },
    rating: 4.7,
    users: "15K+",
  },
  {
    id: "schedule-master",
    name: "ScheduleMaster",
    tagline: "Appointment & Booking Platform",
    description:
      "Smart scheduling and calendar management with automated reminders, payment processing, and multi-location support.",
    icon: Calendar,
    gradientClass: "from-amber-500 to-orange-500",
    features: [
      "Online booking portal",
      "Calendar sync (Google, Outlook)",
      "Automated reminders",
      "Integrated payments",
      "Multi-location support",
      "Client self-service portal",
    ],
    pricing: { starter: "$19/mo", professional: "$59/mo", enterprise: "Custom" },
    rating: 4.6,
    users: "8K+",
  },
];

const Products = memo(() => {
  return (
    <>
      <SEO
        title="Products | MunAiTech — Enterprise SaaS Solutions"
        description="Powerful SaaS products engineered for business growth. Analytics, collaboration, document management, and scheduling — all with enterprise-grade security."
      />
      <main className="min-h-screen bg-background">
        <Navbar />

        {/* Hero Header */}
        <section className="pt-32 pb-16 relative overflow-hidden">
          <div className="absolute inset-0 opacity-20" style={{ background: "var(--gradient-mesh)" }} />
          <div className="container px-4 relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-3xl mx-auto"
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-semibold mb-6">
                <Sparkles className="w-4 h-4" />
                SaaS Product Suite
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
                Enterprise{" "}
                <span className="bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
                  SaaS Solutions
                </span>
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Powerful tools engineered to accelerate your business. Built with security-first architecture, 
                scalable infrastructure, and intuitive interfaces.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Products Grid */}
        <section className="pb-20">
          <div className="container px-4">
            <div className="space-y-10 max-w-5xl mx-auto">
              {products.map((product, index) => {
                const Icon = product.icon;
                return (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <Card className="overflow-hidden border-border hover:border-accent/30 transition-all duration-300 hover:shadow-2xl hover:shadow-accent/5">
                      {/* Product Header with Gradient */}
                      <div className={`bg-gradient-to-r ${product.gradientClass} p-6 md:p-8`}>
                        <div className="flex items-center gap-4 mb-4">
                          <div className="w-14 h-14 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                            <Icon className="w-7 h-7 text-white" />
                          </div>
                          <div>
                            <h2 className="text-2xl font-bold text-white">{product.name}</h2>
                            <p className="text-white/80 text-sm">{product.tagline}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-6">
                          <div className="flex items-center gap-1.5">
                            <Star className="w-4 h-4 text-yellow-300 fill-yellow-300" />
                            <span className="text-white font-semibold text-sm">{product.rating}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Users className="w-4 h-4 text-white/80" />
                            <span className="text-white/90 font-medium text-sm">{product.users} users</span>
                          </div>
                        </div>
                      </div>

                      <CardContent className="p-6 md:p-8">
                        <p className="text-muted-foreground mb-6 leading-relaxed">{product.description}</p>

                        {/* Features */}
                        <div className="mb-8">
                          <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4">
                            Key Features
                          </h3>
                          <div className="grid sm:grid-cols-2 gap-3">
                            {product.features.map((feature, idx) => (
                              <div key={idx} className="flex items-center gap-2.5">
                                <div className="w-5 h-5 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                                  <Check className="w-3 h-3 text-accent" />
                                </div>
                                <span className="text-sm text-muted-foreground">{feature}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Pricing */}
                        <div className="mb-6">
                          <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4">
                            Pricing Plans
                          </h3>
                          <div className="grid grid-cols-3 gap-3">
                            <div className="text-center p-4 rounded-xl bg-secondary">
                              <p className="text-xs text-muted-foreground mb-1">Starter</p>
                              <p className="text-lg font-bold text-foreground">{product.pricing.starter}</p>
                            </div>
                            <div className="text-center p-4 rounded-xl bg-accent/10 border-2 border-accent relative">
                              <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 px-2 py-0.5 bg-accent text-accent-foreground text-[10px] font-bold rounded-full uppercase">
                                Popular
                              </span>
                              <p className="text-xs text-muted-foreground mb-1">Professional</p>
                              <p className="text-lg font-bold text-foreground">{product.pricing.professional}</p>
                            </div>
                            <div className="text-center p-4 rounded-xl bg-secondary">
                              <p className="text-xs text-muted-foreground mb-1">Enterprise</p>
                              <p className="text-lg font-bold text-foreground">{product.pricing.enterprise}</p>
                            </div>
                          </div>
                        </div>

                        {/* CTA */}
                        <Link to="/contact">
                          <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-semibold py-6 rounded-xl group">
                            Start Free Trial
                            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                          </Button>
                        </Link>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Security Banner */}
        <section className="py-16 bg-secondary/50">
          <div className="container px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center max-w-2xl mx-auto"
            >
              <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center mx-auto mb-6">
                <Shield className="w-8 h-8 text-accent" />
              </div>
              <h2 className="text-2xl font-bold text-foreground mb-4">Enterprise-Grade Security</h2>
              <p className="text-muted-foreground leading-relaxed">
                All products feature bank-level encryption, SOC 2 compliance readiness, 
                99.9% uptime SLA, and zero-trust architecture by default.
              </p>
              <div className="flex flex-wrap justify-center gap-3 mt-6">
                {["256-bit Encryption", "SOC 2 Ready", "99.9% Uptime", "GDPR Compliant"].map((badge) => (
                  <span key={badge} className="px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-medium flex items-center gap-2">
                    <Zap className="w-3 h-3" />
                    {badge}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
});

Products.displayName = "Products";

export default Products;
