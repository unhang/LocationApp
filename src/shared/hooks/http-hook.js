import { useState, useCallback } from "react";

const useHttpClient = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendRequest = useCallback(
    async (url, method = "GET", body = null, headers = {}) => {
      setIsLoading(true);
      try {
        const response = await fetch(url, { method, body, headers });
        const responseData = await response.json();

        if (!response.ok) {
          throw new Error(responseData.message);
        }
        console.log(responseData);
        return responseData;
      } catch (error) {
        setError(error.message);
      }
      setIsLoading(false);
    },
    []
  );

  const clearError = () => {
    setError(null);
  };

  return { sendRequest, error, isLoading, clearError };
};

export { useHttpClient };
