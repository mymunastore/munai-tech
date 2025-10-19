import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form";
import { toast } from "sonner";
import { Mail } from "lucide-react";

const newsletterSchema = z.object({
  email: z.string().email("Invalid email address").max(255),
  name: z.string().min(2).max(100).optional(),
});

type NewsletterData = z.infer<typeof newsletterSchema>;

export const Newsletter = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<NewsletterData>({
    resolver: zodResolver(newsletterSchema),
    defaultValues: {
      email: "",
      name: "",
    },
  });

  const onSubmit = async (data: NewsletterData) => {
    setIsSubmitting(true);
    try {
      const subscriberData = {
        email: data.email,
        name: data.name || null,
      };
      
      const { error } = await supabase
        .from("newsletter_subscribers")
        .insert([subscriberData]);

      if (error) {
        if (error.code === "23505") {
          toast.error("Already subscribed", {
            description: "This email is already on our list!",
          });
        } else {
          throw error;
        }
      } else {
        toast.success("Successfully subscribed!", {
          description: "You'll receive updates about new content.",
        });
        form.reset();
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to subscribe", {
        description: "Please try again later.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-16 bg-gradient-to-br from-accent/10 to-primary/10">
      <div className="container px-4">
        <div className="max-w-2xl mx-auto text-center">
          <Mail className="h-12 w-12 mx-auto mb-4 text-accent" />
          <h3 className="text-3xl font-bold text-foreground mb-4">
            Stay Updated
          </h3>
          <p className="text-lg text-muted-foreground mb-8">
            Get the latest insights on AI, development, and design delivered to your inbox.
          </p>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col md:flex-row gap-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="Enter your email"
                        className="h-12"
                        aria-label="Email address for newsletter"
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
                className="h-12 px-8"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Subscribing..." : "Subscribe"}
              </Button>
            </form>
          </Form>

          <p className="text-xs text-muted-foreground mt-4">
            No spam, unsubscribe anytime.
          </p>
        </div>
      </div>
    </section>
  );
};
