export interface ApiResponse<T> {
  data: T;
  error?: { code: string; message: string };
  meta?: Record<string, unknown>;
}

export async function apiClient<T>(input: string, init?: RequestInit): Promise<T> {
  const res = await fetch(input, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...init?.headers,
    },
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({
      error: { code: 'HTTP_ERROR', message: res.statusText },
    }));
    throw new Error(error.error?.message ?? 'Unknown API error');
  }

  const body = (await res.json()) as ApiResponse<T>;

  if (body.error) {
    throw new Error(body.error.message);
  }

  return body.data;
}
