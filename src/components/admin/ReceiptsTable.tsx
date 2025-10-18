import { format } from "date-fns";
import { FileText, Download, Eye, ExternalLink } from "lucide-react";
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
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useReceipts } from "@/hooks/useReceiptsData";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const ReceiptsTable = () => {
  const { data: receipts, isLoading } = useReceipts();
  const [selectedReceipt, setSelectedReceipt] = useState<any>(null);
  const navigate = useNavigate();

  if (isLoading) {
    return <div className="text-center py-8">Loading receipts...</div>;
  }

  if (!receipts || receipts.length === 0) {
    return <div className="text-center py-8 text-muted-foreground">No receipts generated yet</div>;
  }

  const formatCurrency = (amount: number) => {
    return `₦${amount.toLocaleString('en-NG', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, "default" | "secondary" | "destructive"> = {
      paid: "default",
      pending: "secondary",
      refunded: "destructive",
    };
    return <Badge variant={variants[status] || "default"}>{status}</Badge>;
  };

  const handleVerify = (verificationHash: string) => {
    navigate(`/verify-receipt/${verificationHash}`);
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Receipt #</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Method</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Invoice Ref</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {receipts.map((receipt) => (
            <TableRow key={receipt.id}>
              <TableCell>
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-muted-foreground" />
                  <span className="font-mono text-sm">{receipt.receipt_number}</span>
                </div>
                {receipt.verification_hash && (
                  <div className="text-xs text-muted-foreground font-mono mt-1">
                    {receipt.verification_hash}
                  </div>
                )}
              </TableCell>
              <TableCell>
                <div>
                  <div className="font-medium">{receipt.customer_name}</div>
                  <div className="text-sm text-muted-foreground">{receipt.customer_email}</div>
                </div>
              </TableCell>
              <TableCell className="font-semibold">
                {formatCurrency(parseFloat(receipt.payment_amount?.toString() || '0'))}
              </TableCell>
              <TableCell className="capitalize">
                {receipt.payment_method?.replace('_', ' ')}
              </TableCell>
              <TableCell>{getStatusBadge(receipt.status || 'pending')}</TableCell>
              <TableCell>
                {receipt.invoice_reference ? (
                  <span className="text-sm font-mono">{receipt.invoice_reference}</span>
                ) : (
                  <span className="text-muted-foreground text-sm">—</span>
                )}
              </TableCell>
              <TableCell>
                {format(new Date(receipt.payment_date || receipt.created_at), "MMM dd, yyyy")}
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-1">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setSelectedReceipt(receipt)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle>Receipt Details</DialogTitle>
                        <DialogDescription>
                          Full information for receipt {receipt.receipt_number}
                        </DialogDescription>
                      </DialogHeader>
                      
                      {selectedReceipt && (
                        <div className="space-y-4">
                          {/* Basic Info */}
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <h4 className="font-semibold text-sm mb-2">Receipt Information</h4>
                              <dl className="space-y-1 text-sm">
                                <div className="flex justify-between">
                                  <dt className="text-muted-foreground">Receipt #:</dt>
                                  <dd className="font-mono">{selectedReceipt.receipt_number}</dd>
                                </div>
                                <div className="flex justify-between">
                                  <dt className="text-muted-foreground">Status:</dt>
                                  <dd>{getStatusBadge(selectedReceipt.status)}</dd>
                                </div>
                                <div className="flex justify-between">
                                  <dt className="text-muted-foreground">Date:</dt>
                                  <dd>{format(new Date(selectedReceipt.created_at), "PPP")}</dd>
                                </div>
                                {selectedReceipt.verification_hash && (
                                  <div className="flex justify-between">
                                    <dt className="text-muted-foreground">Verification:</dt>
                                    <dd className="font-mono text-xs">{selectedReceipt.verification_hash}</dd>
                                  </div>
                                )}
                                {selectedReceipt.invoice_reference && (
                                  <div className="flex justify-between">
                                    <dt className="text-muted-foreground">Invoice Ref:</dt>
                                    <dd className="font-mono">{selectedReceipt.invoice_reference}</dd>
                                  </div>
                                )}
                                {selectedReceipt.tax_id && (
                                  <div className="flex justify-between">
                                    <dt className="text-muted-foreground">Tax ID:</dt>
                                    <dd>{selectedReceipt.tax_id}</dd>
                                  </div>
                                )}
                              </dl>
                            </div>

                            <div>
                              <h4 className="font-semibold text-sm mb-2">Customer Details</h4>
                              <dl className="space-y-1 text-sm">
                                <div>
                                  <dt className="text-muted-foreground">Name:</dt>
                                  <dd>{selectedReceipt.customer_name}</dd>
                                </div>
                                <div>
                                  <dt className="text-muted-foreground">Email:</dt>
                                  <dd className="break-all">{selectedReceipt.customer_email}</dd>
                                </div>
                                {selectedReceipt.customer_address && (
                                  <div>
                                    <dt className="text-muted-foreground">Address:</dt>
                                    <dd>{selectedReceipt.customer_address}</dd>
                                  </div>
                                )}
                              </dl>
                            </div>
                          </div>

                          {/* Line Items */}
                          {selectedReceipt.line_items && selectedReceipt.line_items.length > 0 && (
                            <div>
                              <h4 className="font-semibold text-sm mb-2">Line Items</h4>
                              <div className="border rounded-lg overflow-hidden">
                                <Table>
                                  <TableHeader>
                                    <TableRow>
                                      <TableHead>Description</TableHead>
                                      <TableHead className="text-center">Qty</TableHead>
                                      <TableHead className="text-right">Price</TableHead>
                                      <TableHead className="text-right">Total</TableHead>
                                    </TableRow>
                                  </TableHeader>
                                  <TableBody>
                                    {selectedReceipt.line_items.map((item: any, idx: number) => (
                                      <TableRow key={idx}>
                                        <TableCell>{item.description}</TableCell>
                                        <TableCell className="text-center">{item.quantity}</TableCell>
                                        <TableCell className="text-right">{formatCurrency(item.unit_price)}</TableCell>
                                        <TableCell className="text-right font-semibold">{formatCurrency(item.total)}</TableCell>
                                      </TableRow>
                                    ))}
                                  </TableBody>
                                </Table>
                              </div>

                              <div className="mt-3 space-y-1 text-sm">
                                {selectedReceipt.subtotal && (
                                  <div className="flex justify-between">
                                    <span className="text-muted-foreground">Subtotal:</span>
                                    <span>{formatCurrency(selectedReceipt.subtotal)}</span>
                                  </div>
                                )}
                                {selectedReceipt.discount_amount > 0 && (
                                  <div className="flex justify-between text-green-600">
                                    <span>Discount:</span>
                                    <span>-{formatCurrency(selectedReceipt.discount_amount)}</span>
                                  </div>
                                )}
                                {selectedReceipt.tax_amount > 0 && (
                                  <div className="flex justify-between">
                                    <span className="text-muted-foreground">Tax:</span>
                                    <span>{formatCurrency(selectedReceipt.tax_amount)}</span>
                                  </div>
                                )}
                              </div>
                            </div>
                          )}

                          {/* Payment Details */}
                          <div className="border-t pt-3">
                            <div className="flex justify-between items-center">
                              <span className="font-semibold">Total Amount:</span>
                              <span className="text-xl font-bold text-primary">
                                {formatCurrency(parseFloat(selectedReceipt.payment_amount))}
                              </span>
                            </div>
                            <div className="text-sm text-muted-foreground mt-1">
                              Payment Method: {selectedReceipt.payment_method?.replace('_', ' ')}
                            </div>
                          </div>

                          {/* Description */}
                          <div>
                            <h4 className="font-semibold text-sm mb-2">Service Description</h4>
                            <p className="text-sm text-muted-foreground">{selectedReceipt.project_description}</p>
                          </div>

                          {/* Notes */}
                          {selectedReceipt.notes && (
                            <div>
                              <h4 className="font-semibold text-sm mb-2">Additional Notes</h4>
                              <p className="text-sm text-muted-foreground">{selectedReceipt.notes}</p>
                            </div>
                          )}

                          {/* Payment Terms */}
                          {selectedReceipt.payment_terms && (
                            <div>
                              <h4 className="font-semibold text-sm mb-2">Payment Terms</h4>
                              <p className="text-sm text-muted-foreground">{selectedReceipt.payment_terms}</p>
                            </div>
                          )}

                          {/* Signature */}
                          {selectedReceipt.authorized_signature && (
                            <div className="border-t pt-3">
                              <div className="text-sm">
                                <span className="text-muted-foreground">Authorized by:</span>{' '}
                                <span className="font-semibold">{selectedReceipt.authorized_signature}</span>
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </DialogContent>
                  </Dialog>

                  {receipt.verification_hash && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleVerify(receipt.verification_hash)}
                    >
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  )}

                  <Button variant="ghost" size="sm">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
