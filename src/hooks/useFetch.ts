import { useState, useEffect } from "react";

interface FetchResponse<T> {
  fetchedData: T | undefined;
  isLoading: boolean;
  error: Error | null;
}

function useFetch<T>(
  input: RequestInfo | URL,
  options?: ResponseInit,
): FetchResponse<T> {
  const [fetchedData, setFetchedData] = useState<T>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const abortController = new AbortController();

    const fetchData = async () => {
      try {
        const response = await fetch(input, {
          ...options,
          signal: abortController.signal,
        });
        const data = await response.json();
        setIsLoading(false);
        setFetchedData(data);
      } catch (error: unknown) {
        if (error instanceof Error && error.name === "AbortError") {
          setError(error);
          setIsLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      abortController.abort();
    };
  }, [input, options]);

  return { fetchedData, isLoading, error };
}

export default useFetch;
