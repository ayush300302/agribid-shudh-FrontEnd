
import AuthLoginForm from "@/features/auth/forms/auth-login-form";
import ThemeToggle from "@/components/custom-ui/theme-toogle";
export default function LoginPage() {
  return (
    <main className="grid min-h-screen lg:grid-cols-2">
      {/* Left side: Branding */}
      <section className="relative hidden flex-col justify-between overflow-hidden bg-primary p-12 text-primary-foreground lg:flex">
        <div>
          <p className="text-2xl font-bold tracking-tight">
            Agribid Shudh
          </p>
          <p className="mt-2 text-sm opacity-80">
            Agriculture. Trust. Growth.
          </p>
        </div>

        <div className="max-w-lg space-y-4">
          <h1 className="text-4xl font-bold leading-tight xl:text-5xl">
            Growing trust. Connecting agriculture.
          </h1>
          <p className="max-w-md text-base leading-7 opacity-85">
            A smarter way to manage agricultural trade, trusted
            partners, and business operations—all in one place.
          </p>
        </div>

        <p className="text-sm opacity-70">
          Agribid Shudh · Agricultural Trade Platform
        </p>
      </section>

      {/* Right side: Login */}
      <section className="flex min-h-screen items-center justify-center bg-background px-6 py-12">
        <div className="w-full max-w-md space-y-8">
            <div className="flex justify-end">
              <ThemeToggle />
            </div>
          <div className="space-y-2">
            <p className="text-sm font-semibold text-primary lg:hidden">
              Agribid Shudh
            </p>

            <h2 className="text-3xl font-bold tracking-tight">
              Welcome back
            </h2>

            <p className="text-sm leading-6 text-muted-foreground">
              Sign in to your account to continue to Agribid Shudh.
            </p>
          </div>

          <AuthLoginForm />
        </div>
      </section>
    </main>
  );
}
