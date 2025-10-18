import { Button } from "@/components/ui/button";
import { Printer, Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const PrintResume = () => {
  const { toast } = useToast();

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    // Track download
    toast({
      title: "Resume Download",
      description: "Preparing your resume for download...",
    });
    
    // Simulate download (in real scenario, link to actual PDF)
    setTimeout(() => {
      const link = document.createElement('a');
      link.href = '/path-to-resume.pdf'; // Update with actual resume path
      link.download = 'Kingsley-Munachi-Resume.pdf';
      link.click();
    }, 500);
  };

  return (
    <div className="flex gap-2 print:hidden">
      <Button onClick={handlePrint} variant="outline" size="sm">
        <Printer className="mr-2 h-4 w-4" />
        Print
      </Button>
      <Button onClick={handleDownload} size="sm">
        <Download className="mr-2 h-4 w-4" />
        Download PDF
      </Button>
    </div>
  );
};
