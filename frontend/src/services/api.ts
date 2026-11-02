// Cliente HTTP único. Sem VITE_API_URL, os serviços usam os mocks (src/mocks).
export const API_URL: string = import.meta.env.VITE_API_URL ?? '';
export const USE_MOCK = !API_URL;

export class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
  }
}

export async function api<T>(path: string, options: RequestInit = {}): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    // O NestJS devolve uma lista de mensagens quando a validação do DTO falha.
    const message = Array.isArray(body.message) ? body.message.join('; ') : body.message;
    throw new ApiError(res.status, message ?? 'Algo deu errado. Tente novamente.');
  }
  return res.status === 204 ? (undefined as T) : res.json();
}

// Simula latência de rede nos mocks, para ver os estados de carregamento.
export const delay = (ms = 400) => new Promise((r) => setTimeout(r, ms));
