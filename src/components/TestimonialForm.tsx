import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const testimonialSchema = z.object({
  client_name: z.string().min(2, "Name must be at least 2 characters").max(100, "Name too long"),
  client_email: z.string().email("Invalid email address").max(255, "Email too long"),
  client_company: z.string().max(100, "Company name too long").optional(),
  client_title: z.string().max(100, "Title too long").optional(),
  project_name: z.string().max(200, "Project name too long").optional(),
  rating: z.number().min(1, "Please select a rating").max(5),
  testimonial_text: z.string()
    .min(20, "Please provide at least 20 characters")
    .max(1000, "Testimonial is too long (max 1000 characters)"),
  would_recommend: z.boolean().default(true),
});

type TestimonialFormData = z.infer<typeof testimonialSchema>;

export const TestimonialForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<TestimonialFormData>({
    resolver: zodResolver(testimonialSchema),
    defaultValues: {
      client_name: "",
      client_email: "",
      client_company: "",
      client_title: "",
      project_name: "",
      rating: 5,
      testimonial_text: "",
      would_recommend: true,
    },
  });

  const onSubmit = async (data: TestimonialFormData) => {
    setIsSubmitting(true);
    try {
      const { error } = await supabase
        .from("client_testimonials")
        .insert([{
          client_name: data.client_name,
          client_email: data.client_email,
          client_company: data.client_company || null,
          client_title: data.client_title || null,
          project_name: data.project_name || null,
          rating: data.rating,
          testimonial_text: data.testimonial_text,
          would_recommend: data.would_recommend,
        }]);

      if (error) throw error;

      toast({
        title: "Thank You! 🎉",
        description: "Your testimonial has been submitted successfully. I'll review it soon and may feature it on the website!",
      });

      form.reset();
    } catch (error) {
      console.error("Error submitting testimonial:", error);
      toast({
        title: "Error",
        description: "Failed to submit testimonial. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStars = (rating: number, onClick: (value: number) => void) => {
    const labels = ["Poor", "Fair", "Good", "Very Good", "Excellent"];
    return (
      <div className="space-y-2">
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => onClick(star)}
              className="transition-all hover:scale-110"
              aria-label={`Rate ${star} star${star > 1 ? 's' : ''}`}
            >
              <Star
                className={`h-7 w-7 transition-colors ${
                  star <= rating 
                    ? "fill-accent text-accent" 
                    : "text-muted-foreground hover:text-accent/50"
                }`}
              />
            </button>
          ))}
        </div>
        {rating > 0 && (
          <p className="text-sm text-muted-foreground">
            {labels[rating - 1]}
          </p>
        )}
      </div>
    );
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="client_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Your Name *</FormLabel>
                <FormControl>
                  <Input placeholder="John Doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="client_email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Your Email *</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="john@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="client_company"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Company</FormLabel>
                <FormControl>
                  <Input placeholder="Your Company" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="client_title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Your Title</FormLabel>
                <FormControl>
                  <Input placeholder="CEO, Manager, etc." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="project_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Project Name</FormLabel>
              <FormControl>
                <Input placeholder="Project you worked with me on" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="rating"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Rating *</FormLabel>
              <FormControl>
                {renderStars(field.value, field.onChange)}
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="testimonial_text"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Your Testimonial *</FormLabel>
              <FormControl>
                <div className="relative">
                  <Textarea
                    placeholder="Share your experience working with me... What did you appreciate most? How did the project meet your expectations?"
                    className="min-h-[140px]"
                    {...field}
                  />
                  <div className="absolute bottom-2 right-2 flex items-center gap-2">
                    <span className={`text-xs ${
                      (field.value?.length || 0) < 20 
                        ? "text-destructive" 
                        : "text-muted-foreground"
                    }`}>
                      {field.value?.length || 0}/1000
                    </span>
                  </div>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="would_recommend"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>
                  I would recommend MunAiTech to others
                </FormLabel>
              </div>
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isSubmitting} className="w-full">
          {isSubmitting ? "Submitting..." : "Submit Review"}
        </Button>
      </form>
    </Form>
  );
};
