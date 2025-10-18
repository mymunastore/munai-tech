import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { CheckCircle2, XCircle, Search, FileText, Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const VerifyReceipt = () => {
  const { hash } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [verificationCode, setVerificationCode] = useState(hash || "");
  const [isVerifying, setIsVerifying] = useState(false);
  const [receiptData, setReceiptData] = useState<any>(null);
  const [verificationStatus, setVerificationStatus] = useState<"idle" | "verified" | "invalid">("idle");

  const handleVerify = async () => {
    if (!verificationCode.trim()) {
      toast({
        title: "Error",
        description: "Please enter a verification code",
        variant: "destructive",
      });
      return;
    }

    setIsVerifying(true);
    try {
      const { data, error } = await supabase
        .from("payment_receipts")
        .select("*")
        .eq("verification_hash", verificationCode.toUpperCase())
        .single();

      if (error || !data) {
        setVerificationStatus("invalid");
        setReceiptData(null);
      } else {
        setVerificationStatus("verified");
        setReceiptData(data);
      }
    } catch (error) {
      console.error("Verification error:", error);
      setVerificationStatus("invalid");
      setReceiptData(null);
    } finally {
      setIsVerifying(false);
    }
  };

  const formatCurrency = (amount: number) => {
    return `₦${amount.toLocaleString('en-NG', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-NG', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const handleDownloadPDF = async () => {
    if (!receiptData) return;

    try {
      const { data, error } = await supabase.functions.invoke("generate-receipt", {
        body: {
          ...receiptData,
          download: true,
        },
      });

      if (error) throw error;

      toast({
        title: "PDF Generated",
        description: "Your receipt PDF has been sent to your email",
      });
    } catch (error) {
      console.error("PDF generation error:", error);
      toast({
        title: "Error",
        description: "Failed to generate PDF. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <>
      <SEO
        title="Verify Receipt"
        description="Verify the authenticity of your MunAITech payment receipt"
      />
      <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-secondary/10 py-12 px-4">
        <div className="container max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4">Verify Receipt</h1>
            <p className="text-muted-foreground">
              Enter your verification code or scan the QR code to verify receipt authenticity
            </p>
          </div>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Receipt Verification</CardTitle>
              <CardDescription>
                Enter the verification hash from your receipt to confirm its authenticity
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2">
                <Input
                  placeholder="Enter verification code (e.g., A1B2C3D4E5F6G7H8)"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value.toUpperCase())}
                  className="flex-1"
                />
                <Button onClick={handleVerify} disabled={isVerifying}>
                  {isVerifying ? (
                    "Verifying..."
                  ) : (
                    <>
                      <Search className="mr-2 h-4 w-4" />
                      Verify
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>

          {verificationStatus === "verified" && receiptData && (
            <Card className="border-green-500/50 bg-green-50/50 dark:bg-green-950/20">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-6 w-6 text-green-600" />
                  <CardTitle className="text-green-700 dark:text-green-400">
                    Receipt Verified ✓
                  </CardTitle>
                </div>
                <CardDescription className="text-green-600 dark:text-green-500">
                  This receipt is authentic and was issued by MunAITech
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Receipt Details */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <h3 className="font-semibold text-sm text-muted-foreground">Receipt Information</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">Receipt Number:</span>
                        <span className="text-sm">{receiptData.receipt_number}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">Date Issued:</span>
                        <span className="text-sm">{formatDate(receiptData.created_at)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">Status:</span>
                        <span className="text-sm font-bold text-green-600">{receiptData.status.toUpperCase()}</span>
                      </div>
                      {receiptData.invoice_reference && (
                        <div className="flex justify-between">
                          <span className="text-sm font-medium">Invoice Ref:</span>
                          <span className="text-sm">{receiptData.invoice_reference}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h3 className="font-semibold text-sm text-muted-foreground">Customer Information</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">Name:</span>
                        <span className="text-sm">{receiptData.customer_name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">Email:</span>
                        <span className="text-sm">{receiptData.customer_email}</span>
                      </div>
                      {receiptData.customer_address && (
                        <div className="flex justify-between">
                          <span className="text-sm font-medium">Address:</span>
                          <span className="text-sm text-right">{receiptData.customer_address}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Payment Details */}
                <div className="border-t pt-4">
                  <h3 className="font-semibold text-sm text-muted-foreground mb-3">Payment Details</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Payment Method:</span>
                      <span className="text-sm">{receiptData.payment_method.replace('_', ' ').toUpperCase()}</span>
                    </div>
                    {receiptData.subtotal && (
                      <>
                        <div className="flex justify-between">
                          <span className="text-sm font-medium">Subtotal:</span>
                          <span className="text-sm">{formatCurrency(receiptData.subtotal)}</span>
                        </div>
                        {receiptData.discount_amount > 0 && (
                          <div className="flex justify-between text-green-600">
                            <span className="text-sm font-medium">Discount:</span>
                            <span className="text-sm">-{formatCurrency(receiptData.discount_amount)}</span>
                          </div>
                        )}
                        {receiptData.tax_amount > 0 && (
                          <div className="flex justify-between">
                            <span className="text-sm font-medium">Tax:</span>
                            <span className="text-sm">{formatCurrency(receiptData.tax_amount)}</span>
                          </div>
                        )}
                      </>
                    )}
                    <div className="flex justify-between border-t pt-2 mt-2">
                      <span className="font-bold">Total Amount:</span>
                      <span className="text-lg font-bold text-green-600">
                        {formatCurrency(receiptData.payment_amount)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Project Description */}
                <div className="border-t pt-4">
                  <h3 className="font-semibold text-sm text-muted-foreground mb-2">Service Description</h3>
                  <p className="text-sm text-muted-foreground">{receiptData.project_description}</p>
                </div>

                {/* Actions */}
                <div className="flex gap-2 border-t pt-4">
                  <Button onClick={handleDownloadPDF} variant="outline" className="flex-1">
                    <Download className="mr-2 h-4 w-4" />
                    Download PDF
                  </Button>
                  <Button onClick={() => navigate("/contact")} variant="outline" className="flex-1">
                    <FileText className="mr-2 h-4 w-4" />
                    Contact Support
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {verificationStatus === "invalid" && (
            <Card className="border-red-500/50 bg-red-50/50 dark:bg-red-950/20">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <XCircle className="h-6 w-6 text-red-600" />
                  <CardTitle className="text-red-700 dark:text-red-400">
                    Verification Failed
                  </CardTitle>
                </div>
                <CardDescription className="text-red-600 dark:text-red-500">
                  The verification code you entered is invalid or the receipt could not be found
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Please check the verification code and try again. If you continue to experience issues,
                  please contact our support team.
                </p>
                <Button onClick={() => navigate("/contact")} variant="outline">
                  Contact Support
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </>
  );
};

export default VerifyReceipt;