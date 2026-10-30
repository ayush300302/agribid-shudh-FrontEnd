export const instant = false;

import LottieAnimation from "@/components/custom-ui/lottie-animation";

export default function AdminDashboardPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background px-6 py-12">
      <div className="flex w-full max-w-lg flex-col items-center text-center">
        <LottieAnimation className="w-full max-w-sm" />

        <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
          Coming Soon!
        </h1>

        <p className="mt-3 max-w-md text-sm leading-6 text-muted-foreground sm:text-base">
          We are growing something great. Exciting new features
          and improvements are on their way.
        </p>
      </div>
    </main>
  );
}
