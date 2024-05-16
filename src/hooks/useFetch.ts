import { useState, useEffect, useRef } from "react";

interface UseFetchOptions<T> {
  input: RequestInfo | URL;
  options?: RequestInit;
  onSuccess?: (data: T) => void;
  onError?: (error: Error) => void;
}

interface UseFetchResult<T> {
  data: T | undefined;
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  error: Error | null;
}

function useFetch<T>({
  input,
  options,
  onSuccess,
  onError,
}: UseFetchOptions<T>): UseFetchResult<T> {
  const [data, setData] = useState<T>();
  const [isLoading, setIsLoading] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const onSuccessRef = useRef(onSuccess);
  const onErrorRef = useRef(onError);

  useEffect(() => {
    onSuccessRef.current = onSuccess;
    onErrorRef.current = onError;
  }, [onSuccess, onError]);

  useEffect(() => {
    const abortController = new AbortController();

    const fetchData = async () => {
      try {
        const response = await fetch(input, {
          ...options,
          signal: abortController.signal,
        });

        if (!response.ok) {
          const errorMessage = `HTTP error status: ${response.status}`;
          setError(new Error(errorMessage));
          setIsError(true);
          setIsSuccess(false);
          onErrorRef.current?.(new Error(errorMessage));
          return;
        }

        const responseData = await response.json();
        setData(responseData);
        setError(null);
        setIsError(false);
        setIsSuccess(true);
        onSuccessRef.current?.(responseData);
      } catch (error: unknown) {
        if (error instanceof Error && error.name !== "AbortError") {
          setError(error);
          setIsError(true);
          setIsSuccess(false);
          onErrorRef.current?.(error);
        }
      } finally {
        setIsLoading(false);
      }
    };

    setError(null);
    setIsError(false);
    setIsLoading(true);
    setIsSuccess(false);
    fetchData();

    return () => {
      abortController.abort();
    };
  }, [input, options]);

  return { data, isLoading, isSuccess, isError, error };
}

export default useFetch;
