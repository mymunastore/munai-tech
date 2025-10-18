import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ExportButtonProps {
  data: any[];
  filename: string;
  label?: string;
}

export const ExportButton = ({ data, filename, label = "Export CSV" }: ExportButtonProps) => {
  const { toast } = useToast();

  const exportToCSV = () => {
    if (!data || data.length === 0) {
      toast({
        variant: "destructive",
        title: "No data to export",
        description: "There is no data available to export.",
      });
      return;
    }

    try {
      // Get headers from first object
      const headers = Object.keys(data[0]);
      
      // Create CSV content
      const csvContent = [
        headers.join(","), // Header row
        ...data.map(row => 
          headers.map(header => {
            const value = row[header];
            // Escape quotes and wrap in quotes if contains comma or quote
            const stringValue = String(value || "");
            if (stringValue.includes(",") || stringValue.includes('"')) {
              return `"${stringValue.replace(/"/g, '""')}"`;
            }
            return stringValue;
          }).join(",")
        )
      ].join("\n");

      // Create blob and download
      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
      const link = document.createElement("a");
      const url = URL.createObjectURL(blob);
      
      link.setAttribute("href", url);
      link.setAttribute("download", `${filename}-${new Date().toISOString().split('T')[0]}.csv`);
      link.style.visibility = "hidden";
      
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      toast({
        title: "Export successful",
        description: `Downloaded ${data.length} records to ${filename}.csv`,
      });
    } catch (error) {
      console.error("Export error:", error);
      toast({
        variant: "destructive",
        title: "Export failed",
        description: "Failed to export data. Please try again.",
      });
    }
  };

  return (
    <Button onClick={exportToCSV} variant="outline" size="sm">
      <Download className="mr-2 h-4 w-4" />
      {label}
    </Button>
  );
};
