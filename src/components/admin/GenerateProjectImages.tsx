import { useState } from "react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Wand2, Loader2 } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const GenerateProjectImages = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [results, setResults] = useState<any[]>([]);

  const generateImages = async () => {
    setIsGenerating(true);
    setResults([]);

    try {
      toast.info("Starting AI image generation...", {
        description: "This may take a few minutes"
      });

      const { data, error } = await supabase.functions.invoke('generate-project-images');

      if (error) throw error;

      setResults(data.results || []);
      
      const successCount = data.results?.filter((r: any) => r.status === 'success').length || 0;
      const failCount = data.results?.filter((r: any) => r.status === 'failed').length || 0;

      toast.success(`Generation complete!`, {
        description: `Success: ${successCount}, Failed: ${failCount}`
      });

    } catch (error) {
      console.error('Error:', error);
      toast.error("Failed to generate images", {
        description: error instanceof Error ? error.message : "Unknown error"
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Wand2 className="h-5 w-5" />
          AI Project Images
        </CardTitle>
        <CardDescription>
          Generate AI images for all projects based on their descriptions
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button 
          onClick={generateImages} 
          disabled={isGenerating}
          className="w-full"
        >
          {isGenerating ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Generating Images...
            </>
          ) : (
            <>
              <Wand2 className="mr-2 h-4 w-4" />
              Generate All Project Images
            </>
          )}
        </Button>

        {results.length > 0 && (
          <div className="space-y-2">
            <h4 className="font-semibold text-sm">Results:</h4>
            <div className="space-y-1 max-h-64 overflow-y-auto">
              {results.map((result, idx) => (
                <div 
                  key={idx}
                  className={`p-2 rounded text-xs ${
                    result.status === 'success' 
                      ? 'bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-300' 
                      : 'bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-300'
                  }`}
                >
                  <span className="font-medium">{result.project}:</span>{' '}
                  {result.status === 'success' ? '✓ Generated' : `✗ ${result.error}`}
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};