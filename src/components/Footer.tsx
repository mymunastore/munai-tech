import { Mail, Github, Linkedin, Twitter, MessageCircle } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-br from-black via-gray-900 to-black text-white py-12 border-t border-cyan-500/20">
      <div className="container px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex flex-col gap-2 mb-4">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center text-black font-bold text-lg shadow-lg shadow-cyan-500/50">
                  M
                </div>
                <span className="font-bold text-xl">MunAiTech</span>
              </div>
              <span className="text-xs text-gray-300">A 15071995 LLC Company • Kentucky, USA</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              AI Web App Designer & Full-Stack Developer specializing in TypeScript, React, and AI-powered solutions.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold mb-4 text-cyan-400">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              {["Home", "Services", "Tech Stack", "Awards", "Testimonials"].map((link) => (
                <li key={link}>
                  <a
                    href={`#${link.toLowerCase().replace(" ", "")}`}
                    className="text-gray-400 hover:text-cyan-400 transition-colors"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold mb-4 text-cyan-400">Connect</h3>
            <div className="flex gap-4">
              {[
                { icon: Mail, href: "mailto:info@mymuna.store", label: "Email" },
                { icon: MessageCircle, href: "https://wa.me/2347062372521", label: "WhatsApp" },
                { icon: Github, href: "https://github.com/mymunastore", label: "GitHub" },
                { icon: Linkedin, href: "https://www.linkedin.com/in/kingsley-munachi-843591244", label: "LinkedIn" },
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

        {/* Bottom */}
        <div className="pt-8 border-t border-cyan-500/10 text-center text-sm text-gray-400">
          <p>© {currentYear} MunAiTech (15071995 LLC). All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
