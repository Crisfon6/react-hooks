import { useQuery } from "@tanstack/react-query"

interface QueryConfig {
  url: string;
  queryKey?: unknown[];
  staleTime?: number;
  gcTime?: number;
  retry?: number | boolean;
  retryDelay?: number;
}
interface QueryResponse<T> {
  data: T | null;
  isLoading: boolean;
  haveError: boolean;
  error: Error | null;
}

export const useFetchRickAndMorty = <T>({
  url,
  queryKey,
  staleTime = 1000 * 60 * 5, // 5 minutes
  gcTime = 1000 * 60 * 30, // 30 minutes
  retry = 3,
  retryDelay = 1000
}: QueryConfig): QueryResponse<T> => {
    console.log("useFetchRickAndMorty");
  const query = useQuery<T>({
    queryKey: queryKey ?? [url],
    queryFn: async () => {
      try {
        const resp = await fetch(url, {
          headers: {
            'Content-Type': 'application/json'
          }
        });

        if (!resp.ok) {
          throw new Error(`HTTP error! status: ${resp.status}`);
        }

        return await resp.json();
      } catch (error) {
        throw new Error(error instanceof Error ? error.message : 'Failed to fetch data');
      }
    },
    staleTime,
    gcTime,
    retry,
    retryDelay,
    enabled: !!url,
    refetchOnWindowFocus: false
  });

  return {
    data: query.data ?? null,
    isLoading: query.isLoading,
    haveError: query.isError,
    error: query.error
  };
}
