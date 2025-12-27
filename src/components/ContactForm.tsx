import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { toast } from "sonner";
import { Send, Loader2 } from "lucide-react";
import { useDebounce } from "@/hooks/useDebounce";

const contactSchema = z.object({
  name: z.string()
    .min(2, "Name must be at least 2 characters")
    .max(100)
    .regex(/^[a-zA-Z\s'-]+$/, "Name contains invalid characters")
    .trim(),
  email: z.string()
    .email("Invalid email address")
    .max(255)
    .toLowerCase()
    .trim(),
  company: z.string()
    .max(100)
    .regex(/^[a-zA-Z0-9\s&',.()-]*$/, "Company name contains invalid characters")
    .trim()
    .optional(),
  phone: z.string()
    .max(20)
    .regex(/^[0-9+\s()-]*$/, "Phone number contains invalid characters")
    .trim()
    .optional(),
  project_type: z.string().optional(),
  budget_range: z.string().optional(),
  message: z.string()
    .min(10, "Message must be at least 10 characters")
    .max(1000)
    .trim(),
});

type ContactFormData = z.infer<typeof contactSchema>;

export const ContactForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isValidatingEmail, setIsValidatingEmail] = useState(false);
  
  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      phone: "",
      project_type: "",
      budget_range: "",
      message: "",
    },
  });

  // Watch email field for debounced validation
  const emailValue = form.watch("email");
  const debouncedEmail = useDebounce(emailValue, 500);

  useEffect(() => {
    if (debouncedEmail && debouncedEmail.includes('@')) {
      setIsValidatingEmail(true);
      // Simulate async email validation
      const timer = setTimeout(() => {
        const schema = z.string().email();
        const result = schema.safeParse(debouncedEmail);
        if (!result.success) {
          form.setError("email", { message: "Invalid email format" });
        } else {
          form.clearErrors("email");
        }
        setIsValidatingEmail(false);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [debouncedEmail, form]);

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    try {
      // AI Analysis of the submission
      const { data: analysisData } = await supabase.functions.invoke('ai-contact-analyzer', {
        body: {
          name: data.name,
          email: data.email,
          message: data.message,
          projectType: data.project_type,
          budget: data.budget_range,
        },
      });

      const aiAnalysis = analysisData || {};

      const submissionData = {
        name: data.name,
        email: data.email,
        company: data.company || null,
        phone: data.phone || null,
        project_type: data.project_type || null,
        budget_range: data.budget_range || null,
        message: data.message,
        ai_priority: aiAnalysis.priority || 'medium',
        ai_category: aiAnalysis.category || data.project_type,
        ai_sentiment: aiAnalysis.sentiment || 'neutral',
      };
      
      const { error: dbError } = await supabase
        .from("contact_submissions")
        .insert([submissionData]);

      if (dbError) throw dbError;

      const { error: emailError } = await supabase.functions.invoke("send-contact-email", {
        body: { ...data, aiAnalysis },
      });

      if (emailError && import.meta.env.DEV) {
        console.error("Email send error:", emailError);
      }

      toast.success("Message sent successfully!", {
        description: "I'll get back to you as soon as possible.",
      });
      
      form.reset();
    } catch (error) {
      if (import.meta.env.DEV) {
        console.error("Error:", error);
      }
      toast.error("Failed to send message", {
        description: "Please try again or email me directly.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name *</FormLabel>
                <FormControl>
                  <Input placeholder="John Doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email *</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input 
                      type="email" 
                      placeholder="john@example.com" 
                      {...field}
                      aria-describedby="email-validation"
                    />
                    {isValidatingEmail && (
                      <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 animate-spin text-muted-foreground" />
                    )}
                  </div>
                </FormControl>
                <FormMessage id="email-validation" />
              </FormItem>
            )}
          />
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="company"
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
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone</FormLabel>
                <FormControl>
                  <Input type="tel" placeholder="+1 (555) 000-0000" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="project_type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Project Type</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select project type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="web-development">Web Development</SelectItem>
                    <SelectItem value="ai-integration">AI Integration</SelectItem>
                    <SelectItem value="ui-ux-design">UI/UX Design</SelectItem>
                    <SelectItem value="consulting">Consulting</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="budget_range"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Budget Range</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select budget range" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="5k-10k">$5k - $10k</SelectItem>
                    <SelectItem value="10k-25k">$10k - $25k</SelectItem>
                    <SelectItem value="25k-50k">$25k - $50k</SelectItem>
                    <SelectItem value="50k+">$50k+</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Message *</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell me about your project..."
                  className="min-h-[150px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          size="lg"
          className="w-full md:w-auto focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          disabled={isSubmitting}
          aria-label="Submit contact form"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />
              Sending...
            </>
          ) : (
            <>
              Send Message
              <Send className="ml-2 h-4 w-4" aria-hidden="true" />
            </>
          )}
        </Button>
      </form>
    </Form>
  );
};
