import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ContactForm } from "@/components/ContactForm";
import { SEO } from "@/components/SEO";
import { Mail, MapPin, Phone, Calculator as CalcIcon, Sparkles } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";

interface ProjectSpecs {
  type: string;
  complexity: string;
  timeline: number;
  features: string[];
  pages: number;
}

const Contact = () => {
  const [specs, setSpecs] = useState<ProjectSpecs>({
    type: "website",
    complexity: "medium",
    timeline: 4,
    features: [],
    pages: 5,
  });

  const [estimate, setEstimate] = useState<number | null>(null);

  const projectTypes = [
    { value: "website", label: "Website", basePrice: 3000 },
    { value: "webapp", label: "Web Application", basePrice: 8000 },
    { value: "ecommerce", label: "E-commerce", basePrice: 10000 },
    { value: "mobile", label: "Mobile App", basePrice: 15000 },
  ];

  const complexityLevels = [
    { value: "simple", label: "Simple", multiplier: 0.7 },
    { value: "medium", label: "Medium", multiplier: 1.0 },
    { value: "complex", label: "Complex", multiplier: 1.5 },
    { value: "enterprise", label: "Enterprise", multiplier: 2.0 },
  ];

  const availableFeatures = [
    { id: "auth", label: "User Authentication", price: 1500 },
    { id: "payment", label: "Payment Integration", price: 2000 },
    { id: "cms", label: "Content Management", price: 2500 },
    { id: "api", label: "API Integration", price: 1800 },
    { id: "ai", label: "AI Features", price: 3500 },
    { id: "analytics", label: "Analytics Dashboard", price: 2000 },
    { id: "chat", label: "Live Chat Support", price: 1200 },
    { id: "search", label: "Advanced Search", price: 1500 },
  ];

  const calculateEstimate = () => {
    const projectType = projectTypes.find((t) => t.value === specs.type);
    const complexity = complexityLevels.find((c) => c.value === specs.complexity);

    if (!projectType || !complexity) return;

    let total = projectType.basePrice * complexity.multiplier;

    // Add feature costs
    specs.features.forEach((featureId) => {
      const feature = availableFeatures.find((f) => f.id === featureId);
      if (feature) total += feature.price;
    });

    // Page count adjustment
    const pageMultiplier = specs.pages / 5;
    total *= pageMultiplier;

    // Timeline adjustment (faster = more expensive)
    const timelineMultiplier = specs.timeline <= 2 ? 1.3 : specs.timeline <= 4 ? 1.0 : 0.9;
    total *= timelineMultiplier;

    setEstimate(Math.round(total));
  };

  const toggleFeature = (featureId: string) => {
    setSpecs((prev) => ({
      ...prev,
      features: prev.features.includes(featureId)
        ? prev.features.filter((f) => f !== featureId)
        : [...prev.features, featureId],
    }));
  };

  return (
    <div className="min-h-screen">
      <SEO 
        title="Get Quote | Project Cost Estimator | MunAiTech"
        description="Get an instant estimate for your web development project and contact us for inquiries. Calculate costs for websites, web apps, e-commerce platforms, and mobile applications."
        keywords="get quote, project calculator, cost estimate, web development pricing, contact, project inquiry, MunAiTech"
      />
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-black via-gray-900 to-black border-b border-cyan-500/20">
        <div className="container px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-cyan-500/10 text-cyan-400 px-4 py-2 rounded-full mb-4 border border-cyan-500/20">
              <CalcIcon className="h-5 w-5" />
              <span className="text-sm font-medium">Get Your Project Quote</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Let&apos;s Work <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Together</span>
            </h1>
            <p className="text-lg text-gray-300">
              Get an instant project estimate and contact us to bring your vision to life.
            </p>
          </div>
        </div>
      </section>

      {/* Cost Estimator Section */}
      <section className="py-16 bg-black">
        <div className="container px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
                Project Cost <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Estimator</span>
              </h2>
              <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                Answer a few questions to receive an instant project estimate
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Form */}
              <div className="md:col-span-2 space-y-6">
                {/* Project Type */}
                <Card className="bg-black/40 border-cyan-500/20">
                  <CardHeader>
                    <CardTitle className="text-white">Project Type</CardTitle>
                    <CardDescription>What type of project are you looking to build?</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <RadioGroup value={specs.type} onValueChange={(value) => setSpecs({ ...specs, type: value })}>
                      {projectTypes.map((type) => (
                        <div key={type.value} className="flex items-center space-x-2 mb-3">
                          <RadioGroupItem value={type.value} id={type.value} />
                          <Label htmlFor={type.value} className="cursor-pointer">
                            {type.label}
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </CardContent>
                </Card>

                {/* Complexity */}
                <Card className="bg-black/40 border-cyan-500/20">
                  <CardHeader>
                    <CardTitle className="text-white">Complexity Level</CardTitle>
                    <CardDescription>How complex is your project?</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <RadioGroup
                      value={specs.complexity}
                      onValueChange={(value) => setSpecs({ ...specs, complexity: value })}
                    >
                      {complexityLevels.map((level) => (
                        <div key={level.value} className="flex items-center space-x-2 mb-3">
                          <RadioGroupItem value={level.value} id={level.value} />
                          <Label htmlFor={level.value} className="cursor-pointer">
                            {level.label}
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </CardContent>
                </Card>

                {/* Timeline */}
                <Card className="bg-black/40 border-cyan-500/20">
                  <CardHeader>
                    <CardTitle className="text-white">Project Timeline</CardTitle>
                    <CardDescription>When do you need it completed? ({specs.timeline} weeks)</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Slider
                      value={[specs.timeline]}
                      onValueChange={(value) => setSpecs({ ...specs, timeline: value[0] })}
                      min={1}
                      max={12}
                      step={1}
                      className="mb-2"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>1 week</span>
                      <span>12 weeks</span>
                    </div>
                  </CardContent>
                </Card>

                {/* Number of Pages */}
                <Card className="bg-black/40 border-cyan-500/20">
                  <CardHeader>
                    <CardTitle className="text-white">Number of Pages/Screens</CardTitle>
                    <CardDescription>Approximately how many pages? ({specs.pages})</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Slider
                      value={[specs.pages]}
                      onValueChange={(value) => setSpecs({ ...specs, pages: value[0] })}
                      min={1}
                      max={50}
                      step={1}
                      className="mb-2"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>1 page</span>
                      <span>50 pages</span>
                    </div>
                  </CardContent>
                </Card>

                {/* Features */}
                <Card className="bg-black/40 border-cyan-500/20">
                  <CardHeader>
                    <CardTitle className="text-white">Additional Features</CardTitle>
                    <CardDescription>Select any additional features you need</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {availableFeatures.map((feature) => (
                        <div key={feature.id} className="flex items-center space-x-2">
                          <Checkbox
                            id={feature.id}
                            checked={specs.features.includes(feature.id)}
                            onCheckedChange={() => toggleFeature(feature.id)}
                          />
                          <Label htmlFor={feature.id} className="cursor-pointer flex-1">
                            {feature.label}
                          </Label>
                          <span className="text-sm text-muted-foreground">${feature.price.toLocaleString()}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Button onClick={calculateEstimate} size="lg" className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white border-0">
                  <Sparkles className="mr-2 h-5 w-5" />
                  Calculate Estimate
                </Button>
              </div>

              {/* Estimate Display */}
              <div className="md:col-span-1">
                <Card className="sticky top-24 bg-black/40 border-cyan-500/20">
                  <CardHeader>
                    <CardTitle className="text-white">Your Estimate</CardTitle>
                    <CardDescription>Based on your selections</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {estimate === null ? (
                      <div className="text-center py-8">
                        <CalcIcon className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                        <p className="text-muted-foreground">Click calculate to see your estimate</p>
                      </div>
                    ) : (
                      <div>
                        <div className="text-center mb-6">
                          <div className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-2">
                            ${estimate.toLocaleString()}
                          </div>
                          <p className="text-sm text-gray-400">Estimated project cost</p>
                        </div>
                        <div className="space-y-2 text-sm mb-6">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Project Type:</span>
                            <span className="font-medium capitalize">{specs.type}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Complexity:</span>
                            <span className="font-medium capitalize">{specs.complexity}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Timeline:</span>
                            <span className="font-medium">{specs.timeline} weeks</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Pages:</span>
                            <span className="font-medium">{specs.pages}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Features:</span>
                            <span className="font-medium">{specs.features.length}</span>
                          </div>
                        </div>
                        <p className="text-xs text-muted-foreground text-center">
                          *This is an estimate. Final pricing may vary based on specific requirements.
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-gradient-to-br from-black via-gray-900 to-black border-t border-cyan-500/20">
        <div className="container px-4">
          <div className="grid lg:grid-cols-3 gap-12 max-w-6xl mx-auto">
            {/* Contact Info */}
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold mb-6 text-white">Get in Touch</h3>
                <p className="text-gray-300 mb-8">
                  I&apos;m always open to discussing new projects, creative ideas, or opportunities to be part of your visions.
                </p>
              </div>

              <Card className="bg-black/40 border-cyan-500/20">
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
                <h4 className="font-semibold mb-4 text-white">Response Time</h4>
                <p className="text-gray-300 text-sm">
                  I typically respond within 24 hours on business days. For urgent matters, please mention it in your message.
                </p>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card className="bg-black/40 border-cyan-500/20">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold mb-6 text-white">Send a Message</h3>
                  <ContactForm />
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
