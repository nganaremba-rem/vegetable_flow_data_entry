"use client"; // Error components must be Client Components

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useEffect } from "react";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="grid place-items-center min-h-[100svh]">
      <div className="max-w-[30%] flex flex-col justify-center gap-3">
        <h2 className="text-red-600 font-bold text-xl text-center">
          {error.message || "Something went wrong!"}
        </h2>
        <div className="flex items-center gap-2">
          <Button
            onClick={
              // Attempt to recover by trying to re-render the segment
              () => reset()
            }
          >
            Try again
          </Button>
          <Link href="/">
            <Button className="bg-primary-blue hover:bg-sky-800">
              Return Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
