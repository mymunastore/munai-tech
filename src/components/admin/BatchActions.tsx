import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Loader2, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface BatchActionsProps {
  selectedIds: string[];
  onClear: () => void;
  table: "contact_submissions" | "newsletter_subscribers";
  onSuccess?: () => void;
}

export const BatchActions = ({ selectedIds, onClear, table, onSuccess }: BatchActionsProps) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [open, setOpen] = useState(false);
  const { toast } = useToast();

  const handleBatchDelete = async () => {
    if (selectedIds.length === 0) return;

    setIsDeleting(true);
    try {
      const { error } = await supabase
        .from(table)
        .delete()
        .in('id', selectedIds);

      if (error) throw error;

      toast({
        title: "Deleted successfully",
        description: `Removed ${selectedIds.length} record(s)`,
      });

      onClear();
      setOpen(false);
      onSuccess?.();
    } catch (error) {
      console.error("Batch delete error:", error);
      toast({
        variant: "destructive",
        title: "Delete failed",
        description: "Failed to delete selected records",
      });
    } finally {
      setIsDeleting(false);
    }
  };

  if (selectedIds.length === 0) return null;

  return (
    <div className="flex items-center gap-2 p-2 bg-muted rounded-lg">
      <span className="text-sm text-muted-foreground">
        {selectedIds.length} selected
      </span>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="destructive" size="sm">
            <Trash2 className="mr-2 h-4 w-4" />
            Delete Selected
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Batch Delete</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete {selectedIds.length} record(s)? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button 
              variant="destructive" 
              onClick={handleBatchDelete}
              disabled={isDeleting}
            >
              {isDeleting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Delete {selectedIds.length} Records
            </Button>
          </div>
        </DialogContent>
      </Dialog>
      <Button variant="ghost" size="sm" onClick={onClear}>
        Clear Selection
      </Button>
    </div>
  );
};
