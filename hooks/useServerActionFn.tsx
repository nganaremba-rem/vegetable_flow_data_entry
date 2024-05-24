import React from "react";

export default function useServerActionFn<T>(cb: () => Promise<T>) {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<any>(null);
  const [message, setMessage] = React.useState("");

  const action = async () => {
    try {
      setLoading(true);
      const response = (await cb()) as Response; // Cast the result of cb() to Response
      if (!response.ok) {
        setError(response?.statusText || "An error occurred");
      } else {
        const responseData = await response.json();
        if (responseData?.status !== "SUCCESS") {
          setError(responseData?.message || "An error occurred");
        } else {
          setMessage(responseData?.message || "Operation Success!");
        }
      }
    } catch (e) {
      setError(e);
    } finally {
      setLoading(false);
    }
  };

  return { action, loading, error, message };
}
