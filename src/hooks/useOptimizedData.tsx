import { useMemo } from "react";

/**
 * Custom hook for memoizing expensive data transformations
 */
export const useOptimizedData = <T, R>(
  data: T[] | undefined,
  transform: (data: T[]) => R,
  dependencies: any[] = []
): R | undefined => {
  return useMemo(() => {
    if (!data) return undefined;
    return transform(data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, ...dependencies]);
};

/**
 * Hook to batch multiple queries and prevent waterfall loading
 */
export const useBatchedQueries = <T extends any[]>(
  queries: T
): { data: any[]; isLoading: boolean; errors: any[] } => {
  const results = queries.map((query) => query);
  
  const data = useMemo(
    () => results.map((result) => result.data),
    [results]
  );
  
  const isLoading = useMemo(
    () => results.some((result) => result.isLoading),
    [results]
  );
  
  const errors = useMemo(
    () => results.map((result) => result.error).filter(Boolean),
    [results]
  );

  return { data, isLoading, errors };
};
