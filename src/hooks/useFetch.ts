import { useState, useEffect, useRef } from "react";

interface UseFetchOptions<T> {
  input: RequestInfo | URL;
  options?: RequestInit;
  onSuccess?: (data: T) => void;
  onError?: (error: Error) => void;
}

interface UseFetchResult<T> {
  data: T | undefined;
  status: string;
  isIdle: boolean;
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  error: Error | null;
}

export const FETCH_STATUS = {
  IDLE: "idle",
  LOADING: "loading",
  SUCCESS: "success",
  ERROR: "error",
};

function useFetch<T>({
  input,
  options,
  onSuccess,
  onError,
}: UseFetchOptions<T>): UseFetchResult<T> {
  const [data, setData] = useState<T>();
  const [status, setStatus] = useState(FETCH_STATUS.IDLE);
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
          setStatus(FETCH_STATUS.ERROR);
          setError(new Error(errorMessage));
          onErrorRef.current?.(new Error(errorMessage));
          return;
        }

        const responseData = await response.json();
        setData(responseData);
        setError(null);
        setStatus(FETCH_STATUS.SUCCESS);
        onSuccessRef.current?.(responseData);
      } catch (error: unknown) {
        if (error instanceof Error && error.name !== "AbortError") {
          setStatus(FETCH_STATUS.ERROR);
          setError(error);
          onErrorRef.current?.(error);
        }
      }
    };

    setError(null);
    setStatus(FETCH_STATUS.LOADING);
    fetchData();

    return () => {
      abortController.abort();
    };
  }, [input, options]);

  const isIdle = status === FETCH_STATUS.IDLE;
  const isError = status === FETCH_STATUS.ERROR;
  const isLoading = status === FETCH_STATUS.LOADING;
  const isSuccess = status === FETCH_STATUS.SUCCESS;

  return { data, status, isIdle, isLoading, isSuccess, isError, error };
}

export default useFetch;
