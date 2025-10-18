import { format } from "date-fns";
import { FileText, Download } from "lucide-react";
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
import { useReceipts } from "@/hooks/useReceiptsData";

export const ReceiptsTable = () => {
  const { data: receipts, isLoading } = useReceipts();

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
                {format(new Date(receipt.payment_date || receipt.created_at), "MMM dd, yyyy")}
              </TableCell>
              <TableCell className="text-right">
                <Button variant="ghost" size="sm">
                  <Download className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
