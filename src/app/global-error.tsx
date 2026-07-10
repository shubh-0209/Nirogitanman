"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Global Error:", error);
  }, [error]);

  return (
    <html>
      <body>
        <div className="flex h-screen w-full flex-col items-center justify-center bg-gray-50 p-4">
          <div className="flex max-w-md flex-col items-center rounded-xl bg-white p-8 text-center shadow-lg">
            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-red-100 text-red-600">
              <AlertCircle size={32} />
            </div>
            <h1 className="mb-2 text-2xl font-bold text-gray-900">Something went wrong!</h1>
            <p className="mb-6 text-gray-500">
              A critical error occurred. Please try again or contact support if the issue persists.
            </p>
            <div className="flex gap-4">
              <Button onClick={() => reset()} variant="default">
                Try again
              </Button>
              <Button onClick={() => window.location.href = "/"} variant="outline">
                Go to Homepage
              </Button>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
