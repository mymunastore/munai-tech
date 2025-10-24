import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const useReceipts = () => {
  return useQuery({
    queryKey: ["payment-receipts"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("payment_receipts")
        .select("*")
        .order("created_at", { ascending: false });
      
      if (error) throw error;
      return data;
    },
    staleTime: 1000 * 60 * 2, // 2 minutes
    gcTime: 1000 * 60 * 10, // 10 minutes
  });
};

export const useReceiptsStats = () => {
  return useQuery({
    queryKey: ["receipts-stats"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("payment_receipts")
        .select("payment_amount, status");
      
      if (error) throw error;

      // Optimize with single pass through data
      const stats = data.reduce((acc, receipt) => {
        if (receipt.status === 'paid') {
          acc.totalRevenue += parseFloat(receipt.payment_amount?.toString() || '0');
          acc.paidCount++;
        } else if (receipt.status === 'pending') {
          acc.pendingCount++;
        }
        acc.totalCount++;
        return acc;
      }, { totalRevenue: 0, paidCount: 0, pendingCount: 0, totalCount: 0 });

      return stats;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes - increased for better performance
    gcTime: 1000 * 60 * 30, // 30 minutes
  });
};
