
"use client";

import { useEffect } from "react";
import Link from "next/link";

type ErrorPageProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function ErrorPage({
  error,
  reset,
}: ErrorPageProps) {
  useEffect(() => {
    // Log details for development and debugging.
    // Consider a monitoring service for production.
    console.error("Agribid Shudh application error:", error);
  }, [error]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-6 py-16">
      <div className="w-full max-w-lg text-center">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-primary">
          Agribid Shudh
        </p>

        <div className="mx-auto mt-10 flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10 text-3xl font-bold text-destructive">
          !
        </div>

        <h1 className="mt-6 text-2xl font-bold tracking-tight sm:text-3xl">
          Something went wrong
        </h1>

        <p className="mt-3 leading-7 text-muted-foreground">
          Something unexpected happened while loading this page.
          Please try again.
        </p>

        {error.digest && (
          <p className="mt-3 text-xs text-muted-foreground">
            Reference ID: {error.digest}
          </p>
        )}

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <button
            type="button"
            onClick={() => reset()}
            className="inline-flex items-center justify-center rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
          >
            Try again
          </button>

          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-lg border border-border px-5 py-3 text-sm font-semibold transition-colors hover:bg-muted"
          >
            Go to homepage
          </Link>
        </div>
      </div>
    </main>
  );
}
