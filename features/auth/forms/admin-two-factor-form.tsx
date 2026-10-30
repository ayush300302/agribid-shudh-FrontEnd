
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import FormField from "@/components/custom-ui/form-field";
import { useAuth } from "@/providers/auth-provider";

import {
  mfaSchema,
  type MfaFormValues,
} from "@/schema/auth/auth-schemas";

export default function AdminTwoFactorForm() {
  const [statusMessage, setStatusMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const router = useRouter();
  const { login } = useAuth();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<MfaFormValues>({
    resolver: zodResolver(mfaSchema),
    mode: "onTouched",
    reValidateMode: "onChange",
    defaultValues: {
      code: "",
    },
  });

  async function onSubmit(data: MfaFormValues) {
    setStatusMessage("");
    setIsError(false);

    try {
      const response = await fetch("/api/demo-auth/session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          code: data.code,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        setIsError(true);
        setStatusMessage(
          result.message || "Invalid verification code."
        );

        console.log("[Mock Auth] 2FA verification failed");
        return;
      }

      setStatusMessage("Verification successful!");

      console.log("[Mock Auth] JWT cookie created");

      // Update existing client-side authentication state.
      login();

      // Redirect after the server successfully sets the cookie.
      router.replace("/admin/dashboard");
    } catch {
      setIsError(true);
      setStatusMessage(
        "Something went wrong. Please try again."
      );
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="space-y-6"
    >
      <FormField
        id="code"
        label="Authentication code"
        error={errors.code?.message}
        hint="Enter the 6-digit code from your authenticator."
      >
        <Input
          {...register("code")}
          id="code"
          type="text"
          inputMode="numeric"
          autoComplete="one-time-code"
          maxLength={6}
          placeholder="000000"
          aria-invalid={Boolean(errors.code)}
          aria-describedby={
            errors.code ? "code-error" : "code-hint"
          }
          className="h-12 text-center font-mono text-xl tracking-[0.5em]"
          onChange={(event) => {
            const digitsOnly = event.target.value
              .replace(/\D/g, "")
              .slice(0, 6);

            setValue("code", digitsOnly, {
              shouldValidate: true,
              shouldDirty: true,
              shouldTouch: true,
            });

            setStatusMessage("");
            setIsError(false);
          }}
        />
      </FormField>

      {statusMessage && (
        <p
          role={isError ? "alert" : "status"}
          className={`text-sm ${
            isError
              ? "text-destructive"
              : "text-muted-foreground"
          }`}
        >
          {statusMessage}
        </p>
      )}

      <Button
        type="submit"
        disabled={isSubmitting}
        className="h-12 w-full"
      >
        {isSubmitting ? "Verifying..." : "Verify code"}
      </Button>
    </form>
  );
}
