
/**
 * Shared authentication API types.
 * Source: API_Documentation.pdf
 */

export interface LoginRequest {
  email: string;
  password: string;
}

export interface TokenPair {
  access_token: string;
  refresh_token: string;
  expires_in: number;
}
