import { useQuery } from "@tanstack/react-query";
import { useAuth } from "./useAuth";
import { supabase } from "@/integrations/supabase/client";

export const useAdminCheck = () => {
  const { user, isLoading: authLoading } = useAuth();

  // Use React Query for caching admin status
  const { data: isAdmin = false, isLoading: queryLoading } = useQuery({
    queryKey: ["admin-status", user?.id],
    queryFn: async () => {
      if (!user) return false;

      const { data, error } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", user.id)
        .eq("role", "admin")
        .maybeSingle();

      if (error) {
        console.error("Error checking admin status:", error);
        return false;
      }
      return !!data;
    },
    enabled: !!user && !authLoading,
    staleTime: 1000 * 60 * 15, // 15 minutes - roles don't change often
    gcTime: 1000 * 60 * 60, // 1 hour
  });

  return { isAdmin, isLoading: authLoading || queryLoading };
};
