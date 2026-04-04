import { memo } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Briefcase,
  MessageSquare,
  Layers,
  BarChart3,
  Package,
  Newspaper,
} from "lucide-react";

const quickLinks = [
  {
    icon: Briefcase,
    title: "Case Studies",
    description: "View our portfolio & delivered systems",
    href: "/projects",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    icon: Package,
    title: "Products",
    description: "Explore our SaaS product suite",
    href: "/products",
    gradient: "from-emerald-500 to-teal-500",
  },
  {
    icon: MessageSquare,
    title: "Testimonials",
    description: "See what clients say about us",
    href: "/#testimonials",
    gradient: "from-violet-500 to-purple-500",
  },
  {
    icon: Layers,
    title: "Tech Stack",
    description: "Explore our technical infrastructure",
    href: "/#techstack",
    gradient: "from-amber-500 to-orange-500",
  },
  {
    icon: BarChart3,
    title: "Partnerships",
    description: "Strategic alliances & engagements",
    href: "/partnerships",
    gradient: "from-rose-500 to-pink-500",
  },
  {
    icon: Newspaper,
    title: "Insights",
    description: "Read our technical articles",
    href: "/blog",
    gradient: "from-indigo-500 to-blue-500",
  },
];

const QuickLinks = memo(() => {
  return (
    <section className="py-16 bg-secondary/30">
      <div className="container px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
            Explore <span className="text-accent">MunAiTech</span>
          </h2>
          <p className="text-muted-foreground">Quick access to what matters most</p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 max-w-5xl mx-auto">
          {quickLinks.map((link, index) => {
            const Icon = link.icon;
            return (
              <motion.div
                key={link.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                viewport={{ once: true }}
              >
                <Link
                  to={link.href}
                  className="group flex flex-col items-center text-center p-5 rounded-2xl bg-card border border-border hover:border-accent/30 hover:shadow-lg hover:shadow-accent/5 transition-all duration-300 hover:-translate-y-1 h-full"
                >
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${link.gradient} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-sm font-semibold text-foreground mb-1 group-hover:text-accent transition-colors">
                    {link.title}
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed hidden md:block">
                    {link.description}
                  </p>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
});

QuickLinks.displayName = "QuickLinks";

export default QuickLinks;
