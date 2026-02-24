// src/lib/api-client.ts

import { getAccessToken } from './auth-token-storage';
import type { ApiEnvelope, ApiPaginationEnvelope } from '../types/api-envelope';

// Parameters : Typescript유틸리티 함수: 특정함수의 파라미터 타입을 반환
export type FetchParameters = Parameters<typeof fetch>;

export async function apiRequest<T>(...args: FetchParameters) {
  const [url, init] = args;

  const headers = new Headers({
    'Content-Type': 'application/json',
  });
  if (getAccessToken()) {
    headers.set('Authorization', `Bearer ${getAccessToken()}`);
  }
  if (init?.headers) {
    Object.entries(init.headers).forEach(([key, value]) => {
      headers.set(key, value);
    });
  }

  const resp = await fetch(url, {
    ...init,
    headers,
    credentials: 'include',
  });
  const data = await resp.json();
  return data as ApiEnvelope<T>;
}

export async function apiPaginationRequest<T>(...args: FetchParameters) {
  return apiRequest(...args) as unknown as ApiPaginationEnvelope<T>;
}
