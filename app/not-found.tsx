
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-6 py-16">
      <div className="w-full max-w-lg text-center">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-primary">
          Agribid Shudh
        </p>

        <p className="mt-10 text-8xl font-bold tracking-tight text-primary sm:text-9xl">
          404
        </p>

        <h1 className="mt-6 text-2xl font-bold tracking-tight sm:text-3xl">
          Page not found
        </h1>

        <p className="mx-auto mt-3 max-w-md leading-7 text-muted-foreground">
          The page you are looking for may have moved, or the link may be
          incorrect. Let&apos;s get you back on track.
        </p>

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
          >
            Go to homepage
          </Link>

          <Link
            href="/login"
            className="inline-flex items-center justify-center rounded-lg border border-border px-5 py-3 text-sm font-semibold transition-colors hover:bg-muted"
          >
            Sign in
          </Link>
        </div>
      </div>
    </main>
  );
}
