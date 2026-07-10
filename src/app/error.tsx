"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("App Error:", error);
  }, [error]);

  return (
    <div className="flex min-h-[400px] w-full flex-col items-center justify-center p-4">
      <div className="flex max-w-md flex-col items-center text-center">
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-amber-100 text-amber-600">
          <AlertTriangle size={24} />
        </div>
        <h2 className="mb-2 text-xl font-semibold text-gray-900">Oops, something went wrong</h2>
        <p className="mb-6 text-sm text-gray-500">
          We encountered an unexpected error while loading this page.
        </p>
        <Button onClick={() => reset()} variant="default">
          Try again
        </Button>
      </div>
    </div>
  );
}
