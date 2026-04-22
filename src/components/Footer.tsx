import { Mail, Github, Linkedin, Twitter, ShieldCheck, Award, BadgeCheck } from "lucide-react";


const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-br from-black via-gray-900 to-black text-white py-12 pb-24 md:pb-12 border-t border-cyan-500/20">
      <div className="container px-4 sm:px-6 lg:px-8">
        {/* CTA Banner */}
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex flex-col gap-2 mb-4">
              <span className="text-2xl font-bold tracking-tight">
                <span className="text-white">Mun</span>
                <span className="text-cyan-400">Ai</span>
                <span className="text-white">Tech</span>
              </span>
              <span className="text-xs text-gray-300">A 15071995 LLC Company • Ashland, Kentucky, USA • Global</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              AI Infrastructure & Cybersecurity Engineering company specializing in 
              production-grade intelligent systems for enterprise environments.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold mb-4 text-cyan-400">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              {[
                { label: "Home", id: "hero" },
                { label: "Services", id: "services" },
                { label: "Capabilities", id: "capabilities" },
                { label: "Case Studies", id: "projects" },
                { label: "Testimonials", id: "testimonials" },
              ].map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => {
                      const el = document.getElementById(link.id);
                      if (el) {
                        el.scrollIntoView({ behavior: "smooth", block: "start" });
                      } else {
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }
                    }}
                    className="text-gray-400 hover:text-cyan-400 transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold mb-4 text-cyan-400">Connect</h3>
            <div className="flex gap-4">
              {[
                { icon: Mail, href: "mailto:info@mymuna.store", label: "Reach Out" },
                { icon: Github, href: "https://github.com/mymunastore", label: "GitHub" },
                { icon: Linkedin, href: "https://www.linkedin.com/in/munaitech", label: "LinkedIn" },
                { icon: Twitter, href: "https://twitter.com/mymunastore", label: "Twitter" },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-10 h-10 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/20 hover:border-cyan-400/40 flex items-center justify-center transition-colors group"
                >
                  <social.icon className="w-5 h-5 text-gray-400 group-hover:text-cyan-400 transition-colors" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Verification Badges */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
          <a
            href="https://docs.lovable.dev/tips-tricks/linkedin-certification"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 hover:bg-cyan-500/20 hover:border-cyan-400/40 transition-colors cursor-pointer"
          >
            <BadgeCheck className="h-4 w-4 text-cyan-400" />
            <span className="text-xs font-semibold text-cyan-400">Lovable Certified</span>
          </a>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20">
            <ShieldCheck className="h-4 w-4 text-emerald-400" />
            <span className="text-xs font-semibold text-emerald-400">Licensed</span>
          </div>
          <a
            href="https://docs.lovable.dev/tips-tricks/linkedin-certification"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 hover:bg-amber-500/20 hover:border-amber-400/40 transition-colors cursor-pointer"
          >
            <Award className="h-4 w-4 text-amber-400" />
            <span className="text-xs font-semibold text-amber-400">Platinum Verified</span>
          </a>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-cyan-500/10 text-center text-sm text-gray-400">
          <p>© {currentYear} MunAiTech (15071995 LLC). All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
