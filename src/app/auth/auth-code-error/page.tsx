"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { TriangleAlert } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ErrorState {
  error: string;
  errorCode: string;
  errorDescription: string;
}

export default function AuthErrorPage() {
  const [errorDetails, setErrorDetails] = useState<ErrorState | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const parseHash = () => {
      const hash = window.location.hash.substring(1);

      const params = new URLSearchParams(hash);

      setErrorDetails({
        error: params.get("error") || "Unknown Error",
        errorCode: params.get("error_code") || "N/A",
        errorDescription:
          params.get("error_description") || "No description provided.",
      });

      setLoading(false);
    };

    parseHash();

    window.addEventListener("hashchange", parseHash);

    return () => window.removeEventListener("hashchange", parseHash);
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <p className="text-gray-500">Loading error details...</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background/95 px-4 py-12">
      <div className="w-full max-w-md space-y-8 rounded-lg bg-white p-8 shadow-lg">
        <div className="flex justify-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
            <TriangleAlert className="h-6 w-6 text-red-600" />
          </div>
        </div>

        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900">
            Authentication Error
          </h2>

          <p className="mt-2 text-sm text-gray-600">
            We encountered an issue processing your request.
          </p>
        </div>

        <div className="rounded-md bg-red-50 p-4">
          <div className="flex">
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800 uppercase tracking-wide">
                {errorDetails?.error.replace(/_/g, " ")}
              </h3>

              <div className="mt-2 text-sm text-red-700">
                <p>
                  <span className="font-semibold">Code:</span>{" "}
                  {errorDetails?.errorCode}
                </p>

                <p className="mt-1">
                  <span className="font-semibold">Description:</span>{" "}
                  {errorDetails?.errorDescription}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col space-y-3">
          <Button asChild variant="hero">
            <Link href="/login">Return to Login</Link>
          </Button>

          <Button asChild variant="outline">
            <Link href="/">Go Home</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
