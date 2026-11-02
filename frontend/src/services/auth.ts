import type { RegisterData, User } from '../types';
import { api, delay, USE_MOCK, ApiError } from './api';

// --- Mock: "banco" de usuários no localStorage ---
type StoredUser = User & { password: string };
const readUsers = (): StoredUser[] => JSON.parse(localStorage.getItem('mock_users') ?? '[]');
const writeUsers = (u: StoredUser[]) => localStorage.setItem('mock_users', JSON.stringify(u));
const strip = ({ password: _p, ...u }: StoredUser): User => u;

export async function login(email: string, password: string): Promise<User> {
  if (USE_MOCK) {
    await delay();
    const u = readUsers().find((x) => x.email === email && x.password === password);
    if (!u) throw new ApiError(401, 'E-mail ou senha incorretos.');
    return strip(u);
  }
  const { user } = await api<{ user: User }>('/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) });
  return user;
}

export async function register(data: RegisterData): Promise<User> {
  if (USE_MOCK) {
    await delay();
    const users = readUsers();
    if (users.some((x) => x.email === data.email)) throw new ApiError(409, 'Este e-mail já está cadastrado.');
    if (users.some((x) => x.cpf === data.cpf)) throw new ApiError(409, 'Este CPF já está cadastrado.');
    const u: StoredUser = { ...data, id: crypto.randomUUID() };
    writeUsers([...users, u]);
    return strip(u);
  }
  const { user } = await api<{ user: User }>('/auth/cadastro', { method: 'POST', body: JSON.stringify(data) });
  return user;
}

export async function updateMe(id: string, data: Partial<Pick<User, 'name' | 'phone'>>): Promise<User> {
  if (USE_MOCK) {
    await delay();
    const users = readUsers().map((x) => (x.id === id ? { ...x, ...data } : x));
    writeUsers(users);
    return strip(users.find((x) => x.id === id)!);
  }
  return api<User>(`/minha-conta/${id}`, { method: 'PATCH', body: JSON.stringify(data) });
}
