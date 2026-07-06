import { useState } from "react";

interface GroqResponse {
  result?: string;
  usage?: any;
  error?: string;
}

export function useGroqChat() {
  const [response, setResponse] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const sendMessage = async (prompt: string, model?: string) => {
    setIsLoading(true);
    setError(null);
    setResponse(null);

    try {
      const res = await fetch("/api/groq/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, model }),
      });

      const data: GroqResponse = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to fetch response from Groq");
      }

      if (data.result) {
        setResponse(data.result);
      }
      
      return data.result;
    } catch (err: any) {
      setError(err.message);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return { sendMessage, response, isLoading, error };
}
