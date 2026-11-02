import { createContext, useContext, useState, type ReactNode } from 'react';
import type { RegisterData, User } from '../types';
import * as authService from '../services/auth';

interface AuthState {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
  setUser: (u: User) => void;
}

const AuthContext = createContext<AuthState | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUserState] = useState<User | null>(() => {
    try { return JSON.parse(localStorage.getItem('user') ?? 'null'); } catch { return null; }
  });

  const save = (u: User) => {
    localStorage.setItem('user', JSON.stringify(u));
    setUserState(u);
  };

  const value: AuthState = {
    user,
    login: async (email, password) => {
      save(await authService.login(email, password));
    },
    register: async (data) => {
      save(await authService.register(data));
    },
    logout: () => {
      localStorage.removeItem('user');
      setUserState(null);
    },
    setUser: save,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth precisa estar dentro de <AuthProvider>');
  return ctx;
}
