
"use client";

import { useEffect, type ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/providers/auth-provider";

type ProtectedRouteProps = {
  children: ReactNode;
};

export default function ProtectedRoute({
  children,
}: ProtectedRouteProps) {
  const { isLoggedIn } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  // Allow login and 2FA pages without full authentication.
  const isPublicPage =
    pathname === "/admin/login" ||
    pathname === "/admin/2fa";

  // Redirect unauthenticated users from protected pages.
  useEffect(() => {
    if (!isLoggedIn && !isPublicPage) {
      router.replace("/admin/login");
    }
  }, [isLoggedIn, isPublicPage, router]);

  // Don't render protected content while logged out.
  if (!isLoggedIn && !isPublicPage) {
    return null;
  }

  return <>{children}</>;
}
