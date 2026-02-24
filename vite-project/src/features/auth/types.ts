// src/features/auth/types.ts
export interface SignupPayload {
  email: string;
  password: string;
  nickname: string;
}

export interface SignupFormData extends SignupPayload {
  confirmPassword: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}
export type LoginFormData = LoginPayload;

export interface AuthUser {
  id: string;
  email: string;
  nickname: string;
  role: string;
}

export interface SignupResponseData {
  user: AuthUser;
  token: string;
  message: string;
}

export type LoginResponseData = SignupResponseData;
