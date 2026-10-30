
import { apiRequest } from "@/lib/api-client";

export type AdminLoginRequest = {
  email: string;
  password: string;
};

export type AdminLoginResponse = {
  requires_2fa: boolean;
  message?: string;
};

export type MockAuthResult = {
  success: boolean;
  message: string;
};

// Real backend login — keep for API integration.
export async function adminLogin(
  credentials: AdminLoginRequest,
): Promise<AdminLoginResponse> {
  return apiRequest<AdminLoginResponse>("admin/auth/login", {
    method: "POST",
    body: credentials,
  });
}

// Temporary demo credentials for frontend testing.
const DEMO_EMAIL = "admin@agribid.com";
const DEMO_PASSWORD = "AdminDemo@123";
const DEMO_OTP = "123456";

// Mock login — does not call the backend.
export async function mockAdminLogin(
  credentials: AdminLoginRequest,
): Promise<MockAuthResult> {
  await new Promise((resolve) => setTimeout(resolve, 300));

  if (
    credentials.email.trim().toLowerCase() !== DEMO_EMAIL ||
    credentials.password !== DEMO_PASSWORD
  ) {
    return {
      success: false,
      message: "Invalid email or password.",
    };
  }

  return {
    success: true,
    message: "Credentials accepted. Please verify 2FA.",
  };
}

// Mock 2FA — accepts only the demo OTP.
export async function mockVerifyAdmin2FA(
  code: string,
): Promise<MockAuthResult> {
  await new Promise((resolve) => setTimeout(resolve, 300));

  if (!/^\d{6}$/.test(code)) {
    return {
      success: false,
      message: "Enter a valid six-digit code.",
    };
  }

  if (code !== DEMO_OTP) {
    return {
      success: false,
      message: "Invalid verification code. Please try again.",
    };
  }

  return {
    success: true,
    message: "Two-factor verification successful.",
  };
}
