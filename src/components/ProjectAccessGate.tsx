import { useState } from "react";
import { Shield, Lock, Mail } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";

interface ProjectAccessGateProps {
  children: React.ReactNode;
}

export const ProjectAccessGate = ({ children }: ProjectAccessGateProps) => {
  const [hasAccess, setHasAccess] = useState(false);

  if (hasAccess) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <Card className="max-w-lg w-full border-destructive/30 bg-card">
        <CardContent className="p-8 md:p-12 text-center space-y-6">
          <div className="w-16 h-16 mx-auto rounded-full bg-destructive/10 flex items-center justify-center">
            <Lock className="h-8 w-8 text-destructive" />
          </div>
          
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-2">Restricted Access</h2>
            <p className="text-muted-foreground leading-relaxed">
              This project contains proprietary information. Access requires prior authorization 
              from MunAiTech. Please reach out to request permission to view project details.
            </p>
          </div>

          <div className="flex items-center gap-2 justify-center text-sm text-muted-foreground">
            <Shield className="h-4 w-4 text-accent" />
            <span>Protected under MunAiTech security policy</span>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href="mailto:info@mymuna.store?subject=Project%20Access%20Request&body=I%20would%20like%20to%20request%20access%20to%20view%20project%20details%20on%20MunAiTech.">
              <Button className="bg-accent hover:bg-accent/90 text-accent-foreground gap-2">
                <Mail className="h-4 w-4" />
                Request Access
              </Button>
            </a>
            <a href={`https://wa.me/2347062372521?text=${encodeURIComponent("Hello MunAiTech, I'd like to request access to view project details.")}`} target="_blank" rel="noopener noreferrer">
              <Button variant="outline" className="border-accent/40 text-accent hover:bg-accent/10">
                Contact via WhatsApp
              </Button>
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
