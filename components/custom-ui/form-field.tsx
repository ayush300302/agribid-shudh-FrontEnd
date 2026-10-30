
import type { ReactNode } from "react";
import { Label } from "@/components/ui/label";

type FormFieldProps = {
  id: string;
  label: string;
  error?: string;
  hint?: string;
  children: ReactNode;
};

export default function FormField({
  id,
  label,
  error,
  hint,
  children,
}: FormFieldProps) {
  const descriptionId = error ? `${id}-error` : `${id}-hint`;

  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>

      {children}

      {error ? (
        <p
          id={descriptionId}
          role="alert"
          className="text-sm text-destructive"
        >
          {error}
        </p>
      ) : hint ? (
        <p
          id={descriptionId}
          className="text-sm text-muted-foreground"
        >
          {hint}
        </p>
      ) : null}
    </div>
  );
}
