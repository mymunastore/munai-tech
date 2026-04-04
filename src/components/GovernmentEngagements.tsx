import { memo } from "react";
import { motion } from "framer-motion";
import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { ArrowRight, Shield, Building2, Satellite, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import sovereignAiImg from "@/assets/projects/sovereign-ai-datacentre.jpg";
import leoSatcomImg from "@/assets/projects/leo-satcom-defence.jpg";

const engagements = [
  {
    title: "Sovereign AI Data Centre Infrastructure",
    slug: "sovereign-ai-data-centre-infrastructure",
    institution: "Innovation, Science and Economic Development Canada (ISED)",
    category: "AI & Government",
    description:
      "Submitted a technical capability overview and prototype demonstration for enabling large-scale sovereign AI data centres in Canada. Featured an operational agentic AI document verification platform with structured decision governance and auditability.",
    status: "Acknowledged & Under Review",
    image: sovereignAiImg,
    icon: Building2,
    highlights: [
      "Official acknowledgment received from ISED AI Infrastructure Team",
      "100% processing accuracy with 1.2s average AI speed",
      "Agentic AI platform with full auditability",
    ],
    year: 2026,
    tags: ["Sovereign AI", "Data Centres", "ISED"],
  },
  {
    title: "LEO SATCOM Defence Challenge — ISC Phase 2",
    slug: "leo-satcom-defence-challenge-isc",
    institution: "Department of National Defence (DND)",
    category: "Defence & Innovation",
    description:
      "Engaged with Innovative Solutions Canada on a DND challenge to advance Low Earth Orbit satellite communications in contested environments. Phase 2 prototype development with up to $2M CAD funding.",
    status: "Active Engagement",
    image: leoSatcomImg,
    icon: Satellite,
    highlights: [
      "Up to $2M CAD funding opportunity",
      "Phase 2 Prototype — TRL 5-9",
      "Adaptive beamforming for contested environments",
    ],
    year: 2026,
    tags: ["SATCOM", "Defence", "ISC"],
  },
];

const GovernmentEngagements = memo(() => {
  return (
    <section className="py-20 md:py-32 relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/[0.03] to-background" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl opacity-30" />

      <div className="container px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4">
            <Shield className="h-4 w-4" />
            Government & Institutional Leadership
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
            Strategic{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Engagements
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Active participation in Canada's most critical technology
            initiatives — from sovereign AI infrastructure to national defence
            communications
          </p>
        </div>

        {/* Engagement Cards */}
        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {engagements.map((engagement, index) => (
            <motion.div
              key={engagement.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
            >
              <Card className="group overflow-hidden border-border hover:border-primary/40 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10 h-full flex flex-col">
                {/* Image */}
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={engagement.image}
                    alt={engagement.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />

                  {/* Status badge */}
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-primary/90 text-primary-foreground backdrop-blur-sm border-0 shadow-lg">
                      <CheckCircle2 className="h-3 w-3 mr-1" />
                      {engagement.status}
                    </Badge>
                  </div>

                  {/* Year */}
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 rounded-full bg-background/80 backdrop-blur-sm text-foreground text-xs font-bold">
                      {engagement.year}
                    </span>
                  </div>

                  {/* Institution overlay */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex items-center gap-2 text-foreground">
                      <engagement.icon className="h-4 w-4 text-primary shrink-0" />
                      <span className="text-sm font-medium truncate">
                        {engagement.institution}
                      </span>
                    </div>
                  </div>
                </div>

                <CardContent className="p-6 flex-1 flex flex-col">
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-3">
                    {engagement.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 rounded-md bg-secondary text-secondary-foreground text-xs font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                    {engagement.title}
                  </h3>

                  <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                    {engagement.description}
                  </p>

                  {/* Highlights */}
                  <ul className="space-y-2 mb-6 flex-1">
                    {engagement.highlights.map((highlight) => (
                      <li
                        key={highlight}
                        className="flex items-start gap-2 text-sm"
                      >
                        <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">
                          {highlight}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <Link to={`/projects/${engagement.slug}`}>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full group/btn border-primary/20 hover:bg-primary hover:text-primary-foreground"
                    >
                      View Full Details
                      <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
});

GovernmentEngagements.displayName = "GovernmentEngagements";

export default GovernmentEngagements;
