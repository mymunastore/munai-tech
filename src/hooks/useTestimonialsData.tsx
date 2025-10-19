import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export const useTestimonials = () => {
  return useQuery({
    queryKey: ["client-testimonials"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("client_testimonials")
        .select("*")
        .order("created_at", { ascending: false });
      
      if (error) throw error;
      return data;
    },
    staleTime: 1000 * 60 * 2, // 2 minutes
    gcTime: 1000 * 60 * 10, // 10 minutes
  });
};

export const useApproveTestimonial = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ id, status }: { id: string; status: 'approved' | 'rejected' }) => {
      const { error } = await supabase
        .from("client_testimonials")
        .update({ 
          status,
          approved_at: status === 'approved' ? new Date().toISOString() : null 
        })
        .eq("id", id);
      
      if (error) throw error;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["client-testimonials"] });
      toast({
        title: "Success",
        description: `Testimonial ${variables.status === 'approved' ? 'approved' : 'rejected'} successfully`,
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update testimonial status",
        variant: "destructive",
      });
    },
  });
};
