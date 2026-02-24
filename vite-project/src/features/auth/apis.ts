// src/features/auth/apis.ts
import type {
  AuthUser,
  LoginPayload,
  LoginResponseData,
  SignupPayload,
  SignupResponseData,
} from './types';
import { apiRequest } from '@/lib/api-client';

// const BASE_URL = "https://shinhan-pda-react-router-full-examp.vercel.app";
const BASE_URL = '';

export async function signupServer(payload: SignupPayload) {
  const data = await apiRequest<SignupResponseData>(
    `${BASE_URL}/api/auth/signup`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    }
  );
  return data;
}

export async function loginServer(payload: LoginPayload) {
  return await apiRequest<LoginResponseData>(`${BASE_URL}/api/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });
}

export async function logoutServer() {
  return await apiRequest<{ message: string }>(`${BASE_URL}/api/auth/logout`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

export async function fetchMe() {
  return await apiRequest<{ user: AuthUser }>(`${BASE_URL}/api/auth/me`);
}
