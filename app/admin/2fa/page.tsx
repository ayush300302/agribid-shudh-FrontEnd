
import AdminTwoFactorForm from "@/features/auth/forms/admin-two-factor-form";
import ThemeToggle from "@/components/custom-ui/theme-toogle";

export default function AdminTwoFactorPage() {
  return (
    <main className="relative flex min-h-screen items-center justify-center bg-background px-6 py-12 text-foreground transition-colors duration-300">
      <div className="absolute right-6 top-6">
        <ThemeToggle />
      </div>

      <div className="w-full max-w-md space-y-8">
        <div className="space-y-2">
          <p className="text-sm font-semibold text-primary">
            Agribid Shudh
          </p>

          <h1 className="text-3xl font-bold tracking-tight">
            Verify your identity
          </h1>

          <p className="text-sm leading-6 text-muted-foreground">
            Enter the 6-digit code from your configured authentication method
            to continue.
          </p>
        </div>

        <AdminTwoFactorForm />
      </div>
    </main>
  );
}
