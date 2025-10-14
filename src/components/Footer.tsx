import { Mail, Github, Linkedin, Twitter } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-primary-foreground py-12 border-t border-border">
      <div className="container px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent to-primary/80 flex items-center justify-center text-primary-foreground font-bold text-lg">
                K
              </div>
              <span className="font-bold text-xl">Kingsley.</span>
            </div>
            <p className="text-primary-foreground/70 text-sm leading-relaxed">
              Crafting AI-powered digital solutions that transform businesses and drive growth.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              {["Home", "Services", "Tech Stack", "Awards", "Testimonials"].map((link) => (
                <li key={link}>
                  <a
                    href={`#${link.toLowerCase().replace(" ", "")}`}
                    className="text-primary-foreground/70 hover:text-accent transition-colors"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold mb-4">Connect</h3>
            <div className="flex gap-4">
              {[
                { icon: Mail, href: "mailto:contact@kingsley.dev", label: "Email" },
                { icon: Github, href: "https://github.com", label: "GitHub" },
                { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
                { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 rounded-lg bg-primary-foreground/10 hover:bg-accent/20 flex items-center justify-center transition-colors group"
                >
                  <social.icon className="w-5 h-5 text-primary-foreground/70 group-hover:text-accent transition-colors" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-primary-foreground/10 text-center text-sm text-primary-foreground/60">
          <p>© {currentYear} Kingsley Munachi. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
