import { Card, CardContent } from "./ui/card";
import { Award } from "lucide-react";

const awards = [
  {
    year: "2022",
    title: "Merit Award",
    subtitle: "Support to Dominica",
    organization: "Brodas Across Nigeria – Kaduna State Chapter",
    recipient: "Adigwe Kingsley Munachi",
  },
  {
    year: "2022",
    title: "Award of Honour",
    subtitle: "Mentorship & Contribution to BAN",
    organization: "Vanuatu Frigate",
    recipient: "Munachi K Adigwe",
  },
  {
    year: "2021",
    title: "Recognition of Contribution",
    subtitle: "GAMMA 2019–2021",
    organization: "Brodas Across Nigeria (BAN)",
    recipient: "Adigwe K. Munachi",
  },
  {
    year: "2021",
    title: "Award of Recognition",
    subtitle: "Ibom Christmas Celebration",
    organization: "Ministry of Culture & Tourism, Akwa Ibom State",
    recipient: "Adigwe Kingsley Munachi",
  },
];

const Awards = () => {
  return (
    <section id="awards" className="py-20 md:py-32 bg-background">
      <div className="container px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-semibold mb-4">
            Awards & Recognition
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
            Celebrating Milestones
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Highlights of professional recognition and community impact
          </p>
        </div>

        {/* Awards Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {awards.map((award, index) => (
            <Card
              key={index}
              className="group hover:shadow-xl transition-all duration-300 border-border bg-card hover:border-accent/50 relative overflow-hidden"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardContent className="p-6">
                {/* Year Badge */}
                <div className="inline-block px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-semibold mb-4">
                  {award.year}
                </div>

                {/* Icon */}
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-accent/20 to-primary/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Award className="w-6 h-6 text-accent" />
                </div>

                {/* Content */}
                <div className="space-y-2">
                  <p className="text-xs text-muted-foreground uppercase tracking-wide">
                    {award.subtitle}
                  </p>
                  <h3 className="text-lg font-bold text-foreground leading-tight">
                    {award.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {award.organization}
                  </p>
                  <p className="text-xs text-muted-foreground pt-2 border-t border-border">
                    {award.recipient}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Awards;
