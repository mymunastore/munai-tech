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

      const totalRevenue = data.reduce((sum, receipt) => {
        if (receipt.status === 'paid') {
          return sum + parseFloat(receipt.payment_amount?.toString() || '0');
        }
        return sum;
      }, 0);

      const paidCount = data.filter(r => r.status === 'paid').length;
      const pendingCount = data.filter(r => r.status === 'pending').length;

      return {
        totalRevenue,
        paidCount,
        pendingCount,
        totalCount: data.length,
      };
    },
  });
};
