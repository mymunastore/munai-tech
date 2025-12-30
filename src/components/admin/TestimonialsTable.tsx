import { useState } from "react";
import { format } from "date-fns";
import { Star, Check, X, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useTestimonials, useApproveTestimonial } from "@/hooks/useTestimonialsData";

export const TestimonialsTable = () => {
  const { data: testimonials, isLoading } = useTestimonials();
  const approveTestimonial = useApproveTestimonial();
  const [selectedTestimonial, setSelectedTestimonial] = useState<any>(null);

  if (isLoading) {
    return <div className="text-center py-8">Loading testimonials...</div>;
  }

  if (!testimonials || testimonials.length === 0) {
    return <div className="text-center py-8 text-muted-foreground">No testimonials yet</div>;
  }

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-4 w-4 ${
              star <= rating ? "fill-accent text-accent" : "text-muted-foreground"
            }`}
          />
        ))}
      </div>
    );
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, "default" | "secondary" | "destructive"> = {
      pending: "secondary",
      approved: "default",
      rejected: "destructive",
    };
    return <Badge variant={variants[status] || "default"}>{status}</Badge>;
  };

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Client</TableHead>
              <TableHead>Project</TableHead>
              <TableHead>Rating</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {testimonials.map((testimonial) => (
              <TableRow key={testimonial.id}>
                <TableCell>
                  <div>
                    <div className="font-medium">{testimonial.client_name}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.client_email}</div>
                    {testimonial.client_company && (
                      <div className="text-xs text-muted-foreground">{testimonial.client_company}</div>
                    )}
                  </div>
                </TableCell>
                <TableCell>{testimonial.project_name || "-"}</TableCell>
                <TableCell>{renderStars(testimonial.rating || 0)}</TableCell>
                <TableCell>{getStatusBadge(testimonial.status || "pending")}</TableCell>
                <TableCell>
                  {format(new Date(testimonial.created_at), "MMM dd, yyyy")}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSelectedTestimonial(testimonial)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    {testimonial.status === "pending" && (
                      <>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-green-600 hover:text-green-700"
                          onClick={() =>
                            approveTestimonial.mutate({
                              id: testimonial.id,
                              status: "approved",
                            })
                          }
                        >
                          <Check className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-red-600 hover:text-red-700"
                          onClick={() =>
                            approveTestimonial.mutate({
                              id: testimonial.id,
                              status: "rejected",
                            })
                          }
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog open={!!selectedTestimonial} onOpenChange={() => setSelectedTestimonial(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Testimonial Details</DialogTitle>
          </DialogHeader>
          {selectedTestimonial && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Client Name</p>
                  <p className="text-base">{selectedTestimonial.client_name}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Email</p>
                  <p className="text-base">{selectedTestimonial.client_email}</p>
                </div>
                {selectedTestimonial.client_company && (
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Company</p>
                    <p className="text-base">{selectedTestimonial.client_company}</p>
                  </div>
                )}
                {selectedTestimonial.client_title && (
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Title</p>
                    <p className="text-base">{selectedTestimonial.client_title}</p>
                  </div>
                )}
                {selectedTestimonial.project_name && (
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Project</p>
                    <p className="text-base">{selectedTestimonial.project_name}</p>
                  </div>
                )}
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Rating</p>
                  {renderStars(selectedTestimonial.rating)}
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-2">Testimonial</p>
                <p className="text-base bg-muted p-4 rounded-md">
                  {selectedTestimonial.testimonial_text}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Would Recommend</p>
                <p className="text-base">
                  {selectedTestimonial.would_recommend ? "Yes ✓" : "No"}
                </p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};
