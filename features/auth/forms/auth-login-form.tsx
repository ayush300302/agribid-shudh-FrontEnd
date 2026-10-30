
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { mockAdminLogin } from "@/features/auth/auth-service";

import {
  loginSchema,
  type LoginFormValues,
} from "@/schema/auth/auth-schemas";

export default function AuthLoginForm() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    mode: "onTouched",
    reValidateMode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: LoginFormValues) {
    setLoginError("");

    const result = await mockAdminLogin({
      email: data.email.trim(),
      password: data.password,
    });

    if (!result.success) {
      setLoginError(result.message);
      console.log("[Mock Auth] Login failed");
      return;
    }

    console.log("[Mock Auth] Credentials accepted");
    console.log("[Mock Auth] isLoggedIn: false (2FA pending)");

    router.push("/admin/2fa");
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="space-y-5"
    >
      {/* Email field */}
      <div className="space-y-2">
        <label htmlFor="email" className="text-sm font-medium">
          Admin email
        </label>

        <input
          id="email"
          type="email"
          autoComplete="username"
          placeholder="admin@agribid.com"
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? "email-error" : undefined}
          {...register("email")}
          className={`w-full rounded-lg border bg-background px-4 py-3 text-sm outline-none transition focus-visible:ring-2 focus-visible:ring-ring ${
            errors.email ? "border-destructive" : "border-input"
          }`}
        />

        {errors.email && (
          <p id="email-error" role="alert" className="text-sm text-destructive">
            {errors.email.message}
          </p>
        )}
      </div>

      {/* Password field */}
      <div className="space-y-2">
        <label htmlFor="password" className="text-sm font-medium">
          Password
        </label>

        <div
          className={`flex items-center rounded-lg border bg-background pr-3 focus-within:ring-2 focus-within:ring-ring ${
            errors.password ? "border-destructive" : "border-input"
          }`}
        >
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            autoComplete="current-password"
            placeholder="Enter your password"
            aria-invalid={Boolean(errors.password)}
            aria-describedby={
              errors.password ? "password-error" : undefined
            }
            {...register("password")}
            className="w-full bg-transparent px-4 py-3 text-sm outline-none"
          />

          <button
            type="button"
            onClick={() => setShowPassword((current) => !current)}
            aria-label={showPassword ? "Hide password" : "Show password"}
            className="shrink-0 text-sm font-semibold text-primary"
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>

        {errors.password && (
          <p
            id="password-error"
            role="alert"
            className="text-sm text-destructive"
          >
            {errors.password.message}
          </p>
        )}
      </div>

      {/* Login error */}
      {loginError && (
        <p role="alert" className="text-sm text-destructive">
          {loginError}
        </p>
      )}

      {/* Forgot password */}
      <div className="flex justify-end">
        <Link
          href="/forgot-password"
          className="text-sm font-medium text-primary hover:underline"
        >
          Forgot password?
        </Link>
      </div>

      {/* Submit button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-lg bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSubmitting ? "Signing in..." : "Sign in"}
      </button>

      <p className="text-center text-xs text-muted-foreground">
        Admin access is protected by two-factor authentication.
      </p>
    </form>
  );
}
