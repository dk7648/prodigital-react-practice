// src/lib/auth-token-storage.ts
// 토큰 키
export const ACCESS_TOKEN_KEY = 'accessToken';

// 엑세스 토큰을 조회
export function getAccessToken() {
  return sessionStorage.getItem(ACCESS_TOKEN_KEY);
}
// 엑세스 토큰을 저장
export function setAccessToken(token: string) {
  return sessionStorage.setItem(ACCESS_TOKEN_KEY, token);
}
// 엑세스 토큰을 삭제
export function clearAccessToken() {
  return sessionStorage.removeItem(ACCESS_TOKEN_KEY);
}
