import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Calendar, Mail, Building2, DollarSign, FileText } from "lucide-react";
import { formatDate } from "@/components/admin/DataTable";

interface ContactDetailsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  contact: any | null;
}

export const ContactDetailsModal = ({ open, onOpenChange, contact }: ContactDetailsModalProps) => {
  if (!contact) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Contact Details</DialogTitle>
          <DialogDescription>
            Detailed information about this contact submission
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Contact Info */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-muted-foreground">Name</label>
              <p className="text-lg font-semibold">{contact.name}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Mail className="h-4 w-4" />
                Email
              </label>
              <p className="text-sm">{contact.email}</p>
            </div>
          </div>

          {/* Company & Phone */}
          {(contact.company || contact.phone) && (
            <div className="grid grid-cols-2 gap-4">
              {contact.company && (
                <div>
                  <label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                    <Building2 className="h-4 w-4" />
                    Company
                  </label>
                  <p className="text-sm">{contact.company}</p>
                </div>
              )}
              {contact.phone && (
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Phone</label>
                  <p className="text-sm">{contact.phone}</p>
                </div>
              )}
            </div>
          )}

          {/* Project Details */}
          {(contact.project_type || contact.budget_range) && (
            <div className="grid grid-cols-2 gap-4">
              {contact.project_type && (
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Project Type</label>
                  <Badge variant="outline">{contact.project_type}</Badge>
                </div>
              )}
              {contact.budget_range && (
                <div>
                  <label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                    <DollarSign className="h-4 w-4" />
                    Budget Range
                  </label>
                  <Badge variant="secondary">{contact.budget_range}</Badge>
                </div>
              )}
            </div>
          )}

          {/* Message */}
          <div>
            <label className="text-sm font-medium text-muted-foreground flex items-center gap-2 mb-2">
              <FileText className="h-4 w-4" />
              Message
            </label>
            <div className="bg-muted p-4 rounded-lg">
              <p className="text-sm whitespace-pre-wrap">{contact.message}</p>
            </div>
          </div>

          {/* Metadata */}
          <div className="flex items-center gap-4 text-sm text-muted-foreground pt-4 border-t">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              {formatDate(contact.created_at)}
            </div>
            {contact.ai_priority && (
              <Badge variant={
                contact.ai_priority === "high" ? "destructive" : 
                contact.ai_priority === "medium" ? "default" : "secondary"
              }>
                {contact.ai_priority} priority
              </Badge>
            )}
            {contact.ai_sentiment && (
              <Badge variant="outline">
                {contact.ai_sentiment}
              </Badge>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
