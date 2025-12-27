import { Mail, Github, Linkedin } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-muted/30 text-foreground py-12 border-t border-border">
      <div className="container px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            {/* Info */}
            <div>
              <h2 className="text-xl font-bold text-foreground mb-2">Kingsley Munachi</h2>
              <p className="text-muted-foreground mb-4">Web Developer</p>
            </div>

            {/* Contact Links */}
            <div>
              <h3 className="font-semibold text-foreground mb-4">Connect</h3>
              <ul className="space-y-2">
                <li>
                  <a href="mailto:info@mymuna.store" className="text-muted-foreground hover:text-primary flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    info@mymuna.store
                  </a>
                </li>
                <li>
                  <a href="https://github.com/mymunastore" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary flex items-center gap-2">
                    <Github className="h-4 w-4" />
                    GitHub
                  </a>
                </li>
                <li>
                  <a href="https://www.linkedin.com/in/kingsley-munachi-843591244" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary flex items-center gap-2">
                    <Linkedin className="h-4 w-4" />
                    LinkedIn
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Copyright */}
          <div className="pt-8 border-t border-border text-center text-sm text-muted-foreground">
            <p>© {currentYear} Kingsley Munachi. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
