import { memo } from "react";
import { motion } from "framer-motion";
import { Award, CheckCircle2, ExternalLink } from "lucide-react";
import { Badge } from "./ui/badge";
import { Link } from "react-router-dom";

const recognitions = [
  {
    title: "ISED Canada — Sovereign AI Infrastructure",
    institution: "Innovation, Science and Economic Development Canada",
    description: "Officially acknowledged for technical innovation in sovereign AI data centre infrastructure. Invited to submit capability demonstrations for Canada's national AI program.",
    type: "Government Recognition",
    country: "🇨🇦 Canada",
    status: "Acknowledged",
  },
  {
    title: "DND Canada — LEO SATCOM Defence Challenge",
    institution: "Department of National Defence, Innovative Solutions Canada",
    description: "Invited to participate in a national defence challenge for satellite communications in contested environments. Engaged in Phase 2 prototype development with up to $2M CAD funding scope.",
    type: "Defence Innovation",
    country: "🇨🇦 Canada",
    status: "Active Engagement",
  },
  {
    title: "Base44 — Official Technology Partner",
    institution: "Base44 Global Partner Program",
    description: "Recognized as an official partner of Base44, one of the world's leading software development platforms, validating MunAiTech's engineering capability and innovation standards.",
    type: "Technology Partnership",
    country: "🌍 Global",
    status: "Verified Partner",
    link: "/partnerships",
  },
  {
    title: "Lovable — Platinum Verified",
    institution: "Lovable Platform",
    description: "Certified and validated by Lovable with Platinum status, recognizing sustained excellence in software development, system architecture, and platform engineering.",
    type: "Platform Certification",
    country: "🌍 Global",
    status: "Platinum",
  },
];

const InternationalRecognition = memo(() => {
  return (
    <section className="py-20 md:py-32 bg-muted/30 relative overflow-hidden">
      <div className="absolute inset-0 opacity-15" style={{ background: 'var(--gradient-mesh)' }} />

      <div className="container px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-semibold mb-4">
            <Award className="h-4 w-4" />
            Global Recognition
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
            International{" "}
            <span className="bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
              Validation
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Recognized by governments, industry leaders, and global technology platforms 
            for innovation, engineering excellence, and real-world impact.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {recognitions.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <div className="relative h-full p-8 rounded-2xl bg-card border border-border hover:border-accent/30 transition-all duration-300 hover:shadow-xl overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-accent to-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                
                <div className="flex items-start justify-between mb-4 flex-wrap gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{item.country}</span>
                    <Badge variant="outline" className="text-xs border-accent/30 text-accent">
                      {item.type}
                    </Badge>
                  </div>
                  <Badge className="bg-green-500/10 text-green-500 border-green-500/20 text-xs gap-1">
                    <CheckCircle2 className="h-3 w-3" />
                    {item.status}
                  </Badge>
                </div>

                <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-accent transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-muted-foreground mb-3 font-medium">
                  {item.institution}
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {item.description}
                </p>

                {item.link && (
                  <Link 
                    to={item.link}
                    className="inline-flex items-center gap-1 mt-4 text-sm text-accent hover:underline font-medium"
                  >
                    View Details <ExternalLink className="h-3 w-3" />
                  </Link>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
});

InternationalRecognition.displayName = "InternationalRecognition";

export default InternationalRecognition;
