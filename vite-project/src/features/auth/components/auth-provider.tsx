// src/features/auth/components/auth-provider.tsx

import { createContext, useEffect, useState, type ReactNode } from 'react';
import type {
  AuthUser,
  LoginPayload,
  LoginResponseData,
  SignupPayload,
  SignupResponseData,
} from '../types';
import type { ApiEnvelope, ApiErrorEnvelope } from '@/types/api-envelope';
import { clearAccessToken, setAccessToken } from '@/lib/auth-token-storage';
import { fetchMe, loginServer, logoutServer, signupServer } from '../apis';

export interface AuthContext {
  user: AuthUser | null;
  login: (payload: LoginPayload) => Promise<ApiEnvelope<LoginResponseData>>;
  signup: (payload: SignupPayload) => Promise<ApiEnvelope<SignupResponseData>>;
  logout: () => Promise<ApiEnvelope<{ message: string }>>;
}

export const authContext = createContext<AuthContext>({
  user: null,
  login: async (payload: LoginPayload) => {
    return loginServer(payload);
  },
  signup: async (payload: SignupPayload) => {
    return signupServer(payload);
  },
  logout: async () => {
    return logoutServer();
  },
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    fetchMe().then(result => {
      if (result.success) {
        setUser(result.data.user);
      }
    });
  }, []);

  // login
  const login = async (payload: LoginPayload) => {
    const data = await loginServer(payload);
    if (data.success) {
      setAccessToken(data.data.token);
      setUser(data.data.user);
    }
    return data;
  };

  const signup = async (payload: SignupPayload) => {
    const data = await signupServer(payload);
    if (data.success) {
      setAccessToken(data.data.token);
      setUser(data.data.user);
    }
    return data;
  };

  const logout = async () => {
    clearAccessToken();
    setUser(null);
    return await logoutServer();
  };

  return (
    <authContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </authContext.Provider>
  );
}
