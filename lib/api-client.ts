const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

type ApiRequestOptions = Omit<RequestInit, "body"> & {
  body?: unknown;
  token?: string;
};

export class ApiError extends Error {
  constructor(
    message: string,
    public readonly status: number,
    public readonly code?: string,
    public readonly details?: unknown,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

export async function apiRequest<TResponse>(
  path: string,
  options: ApiRequestOptions = {},
): Promise<TResponse> {
  if (!API_BASE_URL) {
    throw new Error(
      "API base URL is not configured. Set it in .env.local.",
    );
  }

  const { body, token, headers: customHeaders, ...requestOptions } = options;

  const headers = new Headers(customHeaders);
  headers.set("Accept", "application/json");

  if (body !== undefined) {
    headers.set("Content-Type", "application/json");
  }

  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  const baseUrl = API_BASE_URL.replace(/\/+$/, "");
  const endpoint = path.replace(/^\/+/, "");

  const response = await fetch(`${baseUrl}/${endpoint}`, {
    ...requestOptions,
    headers,
    body: body === undefined ? undefined : JSON.stringify(body),
    cache: requestOptions.cache ?? "no-store",
  });

  const responseText = await response.text();
  let data: unknown;

  if (responseText) {
    try {
      data = JSON.parse(responseText);
    } catch {
      data = responseText;
    }
  }

  if (!response.ok) {
    const errorData =
      typeof data === "object" && data !== null
        ? (data as {
            message?: string;
            code?: string;
            details?: unknown;
          })
        : undefined;

    throw new ApiError(
      errorData?.message ?? `Request failed (${response.status}).`,
      response.status,
      errorData?.code,
      errorData?.details,
    );
  }

  return data as TResponse;
}