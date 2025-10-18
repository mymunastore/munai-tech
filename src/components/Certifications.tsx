import { Award, CheckCircle2, ExternalLink } from "lucide-react";
import { Button } from "./ui/button";

const Certifications = () => {
  const certifications = [
    {
      title: "AWS Certified Solutions Architect",
      issuer: "Amazon Web Services",
      year: "2023",
      badge: "https://images.credly.com/size/340x340/images/0e284c3f-5164-4b21-8660-0d84737941bc/image.png",
      link: "#"
    },
    {
      title: "Google Cloud Professional Developer",
      issuer: "Google Cloud",
      year: "2023",
      badge: "https://templates.images.credential.net/16590187933301617801540872729153.png",
      link: "#"
    },
    {
      title: "Meta Front-End Developer Professional",
      issuer: "Meta (Facebook)",
      year: "2022",
      badge: "https://images.credly.com/size/340x340/images/0cc5376d-fa43-4f4d-b4b0-152b6f665518/image.png",
      link: "#"
    },
    {
      title: "OpenAI GPT-4 Specialization",
      issuer: "OpenAI",
      year: "2024",
      badge: "https://images.credly.com/size/340x340/images/44e2c252-5d19-4574-9646-005f7225bf53/image.png",
      link: "#"
    }
  ];

  const achievements = [
    "Top 5% on Stack Overflow (50k+ reputation)",
    "GitHub Arctic Code Vault Contributor",
    "Contributed to 15+ open-source projects",
    "Speaker at 3 international tech conferences",
    "Published 20+ technical articles (100k+ views)"
  ];

  return (
    <section id="certifications" className="py-20 bg-background">
      <div className="container px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Certifications & Achievements</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Professional certifications and notable achievements in the tech industry
          </p>
        </div>

        {/* Certifications Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {certifications.map((cert, idx) => (
            <div
              key={idx}
              className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 transition-all hover:shadow-xl hover:shadow-primary/5"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              
              <div className="relative flex flex-col items-center text-center">
                <div className="mb-4 w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
                  <Award className="w-10 h-10 text-primary" />
                </div>
                
                <h3 className="font-bold mb-2">{cert.title}</h3>
                <p className="text-sm text-muted-foreground mb-1">{cert.issuer}</p>
                <p className="text-xs text-muted-foreground mb-4">{cert.year}</p>
                
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                  asChild
                >
                  <a href={cert.link} target="_blank" rel="noopener noreferrer">
                    Verify <ExternalLink className="w-3 h-3 ml-1" />
                  </a>
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Achievements */}
        <div className="max-w-3xl mx-auto">
          <h3 className="text-2xl font-bold text-center mb-8">Notable Achievements</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            {achievements.map((achievement, idx) => (
              <div
                key={idx}
                className="flex items-start gap-3 p-4 rounded-lg bg-muted/50 border border-border transition-all hover:bg-muted hover:border-primary/20"
              >
                <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <span className="text-sm">{achievement}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Certifications;
