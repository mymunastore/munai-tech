import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { FileText } from "lucide-react";

const receiptSchema = z.object({
  customer_name: z.string().min(2, "Name must be at least 2 characters").max(100, "Name too long"),
  customer_email: z.string().email("Invalid email address").max(255, "Email too long"),
  customer_address: z.string().max(500, "Address too long").optional(),
  payment_amount: z.string().regex(/^\d+(\.\d{1,2})?$/, "Enter valid amount (e.g., 50000.00)"),
  payment_method: z.string().min(1, "Please select payment method"),
  project_description: z.string().min(10, "Description must be at least 10 characters").max(1000, "Description too long"),
  notes: z.string().max(500, "Notes too long").optional(),
  status: z.enum(["paid", "pending"]).default("paid"),
});

type ReceiptFormData = z.infer<typeof receiptSchema>;

export const ReceiptGenerator = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  const form = useForm<ReceiptFormData>({
    resolver: zodResolver(receiptSchema),
    defaultValues: {
      customer_name: "",
      customer_email: "",
      customer_address: "",
      payment_amount: "",
      payment_method: "bank_transfer",
      project_description: "",
      notes: "",
      status: "paid",
    },
  });

  const onSubmit = async (data: ReceiptFormData) => {
    setIsGenerating(true);
    try {
      // Generate receipt number
      const receiptNumber = `MUN-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

      // Save to database
      const { error: dbError } = await supabase
        .from("payment_receipts")
        .insert([{
          receipt_number: receiptNumber,
          customer_name: data.customer_name,
          customer_email: data.customer_email,
          customer_address: data.customer_address,
          payment_amount: parseFloat(data.payment_amount),
          payment_method: data.payment_method,
          project_description: data.project_description,
          notes: data.notes,
          status: data.status,
        }]);

      if (dbError) throw dbError;

      // Generate and send receipt via email
      const { error: functionError } = await supabase.functions.invoke("generate-receipt", {
        body: {
          receipt_number: receiptNumber,
          customer_name: data.customer_name,
          customer_email: data.customer_email,
          customer_address: data.customer_address,
          payment_amount: parseFloat(data.payment_amount),
          payment_method: data.payment_method,
          project_description: data.project_description,
          notes: data.notes,
          status: data.status,
        },
      });

      if (functionError) throw functionError;

      toast({
        title: "Receipt Generated Successfully!",
        description: `Receipt ${receiptNumber} has been created and emailed to ${data.customer_email}. A copy was sent to your email.`,
      });

      form.reset();
    } catch (error) {
      console.error("Error generating receipt:", error);
      toast({
        title: "Error",
        description: "Failed to generate receipt. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="flex items-center gap-2 mb-4">
          <FileText className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-semibold">Generate Payment Receipt</h3>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="customer_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Customer Name *</FormLabel>
                <FormControl>
                  <Input placeholder="John Doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="customer_email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Customer Email *</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="customer@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="customer_address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Customer Address</FormLabel>
              <FormControl>
                <Input placeholder="123 Main St, City, Country" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid md:grid-cols-3 gap-4">
          <FormField
            control={form.control}
            name="payment_amount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Amount (₦) *</FormLabel>
                <FormControl>
                  <Input 
                    type="text" 
                    placeholder="50000.00" 
                    {...field}
                    onChange={(e) => {
                      // Format number as user types
                      const value = e.target.value.replace(/[^\d.]/g, '');
                      field.onChange(value);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="payment_method"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Payment Method *</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select method" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="bank_transfer">Bank Transfer</SelectItem>
                    <SelectItem value="card">Credit/Debit Card</SelectItem>
                    <SelectItem value="paypal">PayPal</SelectItem>
                    <SelectItem value="stripe">Stripe</SelectItem>
                    <SelectItem value="cash">Cash</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Payment Status *</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="paid">Paid</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="project_description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Project Description *</FormLabel>
              <FormControl>
                <div className="relative">
                  <Textarea
                    placeholder="Describe the services provided (e.g., Full-stack web application development with React and Node.js...)"
                    className="min-h-[100px]"
                    {...field}
                  />
                  <span className="absolute bottom-2 right-2 text-xs text-muted-foreground">
                    {field.value?.length || 0}/1000
                  </span>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Additional Notes (Optional)</FormLabel>
              <FormControl>
                <div className="relative">
                  <Textarea
                    placeholder="Payment terms, warranty info, or any other notes..."
                    className="min-h-[80px]"
                    {...field}
                  />
                  <span className="absolute bottom-2 right-2 text-xs text-muted-foreground">
                    {field.value?.length || 0}/500
                  </span>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isGenerating} className="w-full">
          {isGenerating ? "Generating..." : "Generate & Send Receipt"}
        </Button>
      </form>
    </Form>
  );
};
