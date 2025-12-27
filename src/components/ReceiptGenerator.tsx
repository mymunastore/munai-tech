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

const lineItemSchema = z.object({
  description: z.string().min(1, "Description required"),
  quantity: z.number().min(1, "Quantity must be at least 1"),
  unit_price: z.number().min(0, "Price must be positive"),
  total: z.number().min(0, "Total must be positive"),
});

const receiptSchema = z.object({
  customer_name: z.string().min(2, "Name must be at least 2 characters").max(100, "Name too long"),
  customer_email: z.string().email("Invalid email address").max(255, "Email too long"),
  customer_address: z.string().max(500, "Address too long").optional(),
  payment_amount: z.string().regex(/^\d+(\.\d{1,2})?$/, "Enter valid amount (e.g., 50000.00)"),
  payment_method: z.string().min(1, "Please select payment method"),
  project_description: z.string().min(10, "Description must be at least 10 characters").max(1000, "Description too long"),
  notes: z.string().max(500, "Notes too long").optional(),
  status: z.enum(["paid", "pending"]).default("paid"),
  tax_id: z.string().max(100).optional(),
  invoice_reference: z.string().max(100).optional(),
  authorized_signature: z.string().max(100).optional(),
  payment_terms: z.string().max(500).optional(),
  line_items: z.array(lineItemSchema).optional(),
  subtotal: z.string().optional(),
  tax_amount: z.string().optional(),
  discount_amount: z.string().optional(),
});

type ReceiptFormData = z.infer<typeof receiptSchema>;

export const ReceiptGenerator = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [lineItems, setLineItems] = useState<Array<{description: string; quantity: number; unit_price: number; total: number}>>([]);
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
      tax_id: "",
      invoice_reference: "",
      authorized_signature: "",
      payment_terms: "Payment is non-refundable. For any disputes, please contact us within 30 days.",
      subtotal: "",
      tax_amount: "0",
      discount_amount: "0",
    },
  });

  const addLineItem = () => {
    setLineItems([...lineItems, { description: "", quantity: 1, unit_price: 0, total: 0 }]);
  };

  const updateLineItem = (index: number, field: string, value: string | number) => {
    const updated = [...lineItems];
    updated[index] = { ...updated[index], [field]: value };
    if (field === "quantity" || field === "unit_price") {
      updated[index].total = updated[index].quantity * updated[index].unit_price;
    }
    setLineItems(updated);
    calculateTotals(updated);
  };

  const removeLineItem = (index: number) => {
    const updated = lineItems.filter((_, i) => i !== index);
    setLineItems(updated);
    calculateTotals(updated);
  };

  const calculateTotals = (items: typeof lineItems) => {
    const subtotal = items.reduce((sum, item) => sum + item.total, 0);
    form.setValue("subtotal", subtotal.toString());
    
    const discount = parseFloat(form.getValues("discount_amount") || "0");
    const tax = parseFloat(form.getValues("tax_amount") || "0");
    const total = subtotal - discount + tax;
    form.setValue("payment_amount", total.toFixed(2));
  };

  const onSubmit = async (data: ReceiptFormData) => {
    setIsGenerating(true);
    try {
      // Generate receipt number
      const receiptNumber = `MUN-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

      const receiptData = {
        receipt_number: receiptNumber,
        customer_name: data.customer_name,
        customer_email: data.customer_email,
        customer_address: data.customer_address,
        payment_amount: parseFloat(data.payment_amount),
        payment_method: data.payment_method,
        project_description: data.project_description,
        notes: data.notes,
        status: data.status,
        tax_id: data.tax_id,
        invoice_reference: data.invoice_reference,
        authorized_signature: data.authorized_signature,
        payment_terms: data.payment_terms,
        line_items: lineItems.length > 0 ? lineItems : null,
        subtotal: data.subtotal ? parseFloat(data.subtotal) : null,
        tax_amount: data.tax_amount ? parseFloat(data.tax_amount) : 0,
        discount_amount: data.discount_amount ? parseFloat(data.discount_amount) : 0,
      };

      // Save to database
      const { error: dbError } = await supabase
        .from("payment_receipts")
        .insert([receiptData]);

      if (dbError) throw dbError;

      // Generate and send receipt via email
      const { error: functionError } = await supabase.functions.invoke("generate-receipt", {
        body: receiptData,
      });

      if (functionError) throw functionError;

      toast({
        title: "Receipt Generated Successfully!",
        description: `Receipt ${receiptNumber} has been created and emailed to ${data.customer_email}. A copy was sent to your email.`,
      });

      form.reset();
      setLineItems([]);
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

        {/* Advanced Options Toggle */}
        <div className="border-t pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="w-full"
          >
            {showAdvanced ? "Hide" : "Show"} Advanced Options
          </Button>
        </div>

        {showAdvanced && (
          <div className="space-y-6 border rounded-lg p-4 bg-muted/30">
            <h4 className="font-semibold text-sm">Advanced Receipt Details</h4>

            {/* Line Items Section */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <label className="text-sm font-medium">Line Items (Optional)</label>
                <Button type="button" onClick={addLineItem} size="sm" variant="outline">
                  Add Item
                </Button>
              </div>
              
              {lineItems.map((item, index) => (
                <div key={index} className="grid grid-cols-12 gap-2 items-start p-3 border rounded-lg bg-background">
                  <Input
                    placeholder="Description"
                    value={item.description}
                    onChange={(e) => updateLineItem(index, "description", e.target.value)}
                    className="col-span-5"
                  />
                  <Input
                    type="number"
                    placeholder="Qty"
                    value={item.quantity}
                    onChange={(e) => updateLineItem(index, "quantity", parseInt(e.target.value) || 0)}
                    className="col-span-2"
                  />
                  <Input
                    type="number"
                    placeholder="Price"
                    value={item.unit_price}
                    onChange={(e) => updateLineItem(index, "unit_price", parseFloat(e.target.value) || 0)}
                    className="col-span-2"
                  />
                  <Input
                    placeholder="Total"
                    value={item.total.toFixed(2)}
                    disabled
                    className="col-span-2"
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    onClick={() => removeLineItem(index)}
                    className="col-span-1"
                  >
                    ×
                  </Button>
                </div>
              ))}
            </div>

            {/* Totals Section */}
            {lineItems.length > 0 && (
              <div className="grid md:grid-cols-3 gap-4">
                <FormField
                  control={form.control}
                  name="subtotal"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Subtotal (₦)</FormLabel>
                      <FormControl>
                        <Input {...field} disabled />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="discount_amount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Discount (₦)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="0"
                          {...field}
                          onChange={(e) => {
                            field.onChange(e);
                            calculateTotals(lineItems);
                          }}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="tax_amount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tax (₦)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="0"
                          {...field}
                          onChange={(e) => {
                            field.onChange(e);
                            calculateTotals(lineItems);
                          }}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            )}

            {/* Additional Fields */}
            <div className="grid md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="tax_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tax ID / Business Number</FormLabel>
                    <FormControl>
                      <Input placeholder="LLC-15071995-KY" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="invoice_reference"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Invoice Reference</FormLabel>
                    <FormControl>
                      <Input placeholder="INV-2024-001" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="authorized_signature"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Authorized Signature Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Your Name" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="payment_terms"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Payment Terms</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Payment terms, refund policy, warranty..."
                      className="min-h-[80px]"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        )}

        <Button type="submit" disabled={isGenerating} className="w-full">
          {isGenerating ? "Generating..." : "Generate & Send Receipt"}
        </Button>
      </form>
    </Form>
  );
};
