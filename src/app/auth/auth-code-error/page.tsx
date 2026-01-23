"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

// Define the shape of our error state
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
        {/* Header Icon */}
        <div className="flex justify-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
            <svg
              className="h-6 w-6 text-red-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
        </div>

        {/* Title */}
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900">
            Authentication Error
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            We encountered an issue processing your request.
          </p>
        </div>

        {/* Error Details Box */}
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

        {/* Actions */}
        <div className="flex flex-col space-y-3">
          <Link
            href="/login"
            className="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Return to Login
          </Link>
          <Link
            href="/"
            className="flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
}
