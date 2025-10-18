import { Award, CheckCircle2, ExternalLink } from "lucide-react";
import { Button } from "./ui/button";
const Certifications = () => {
  const certifications = [{
    title: "AWS Certified Solutions Architect",
    issuer: "Amazon Web Services",
    year: "2023",
    badge: "https://images.credly.com/size/340x340/images/0e284c3f-5164-4b21-8660-0d84737941bc/image.png",
    link: "#"
  }, {
    title: "Google Cloud Professional Developer",
    issuer: "Google Cloud",
    year: "2023",
    badge: "https://templates.images.credential.net/16590187933301617801540872729153.png",
    link: "#"
  }, {
    title: "Meta Front-End Developer Professional",
    issuer: "Meta (Facebook)",
    year: "2022",
    badge: "https://images.credly.com/size/340x340/images/0cc5376d-fa43-4f4d-b4b0-152b6f665518/image.png",
    link: "#"
  }, {
    title: "OpenAI GPT-4 Specialization",
    issuer: "OpenAI",
    year: "2024",
    badge: "https://images.credly.com/size/340x340/images/44e2c252-5d19-4574-9646-005f7225bf53/image.png",
    link: "#"
  }];
  const achievements = ["Top 5% on Stack Overflow (50k+ reputation)", "GitHub Arctic Code Vault Contributor", "Contributed to 15+ open-source projects", "Speaker at 3 international tech conferences", "Published 20+ technical articles (100k+ views)"];
  return <section id="certifications" className="py-20 bg-background">
      <div className="container px-4 sm:px-6 lg:px-8">
        

        {/* Certifications Grid */}
        

        {/* Achievements */}
        <div className="max-w-3xl mx-auto">
          <h3 className="text-2xl font-bold text-center mb-8">Notable Achievements</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            {achievements.map((achievement, idx) => <div key={idx} className="flex items-start gap-3 p-4 rounded-lg bg-muted/50 border border-border transition-all hover:bg-muted hover:border-primary/20">
                <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <span className="text-sm">{achievement}</span>
              </div>)}
          </div>
        </div>
      </div>
    </section>;
};
export default Certifications;