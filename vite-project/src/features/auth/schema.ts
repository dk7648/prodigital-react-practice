// src/features/auth/schema.ts

import { z } from 'zod';

export const signupFormSchema = z
  .object({
    email: z.email('올바른 이메일을 입력하세요.'),
    password: z.string().min(8, '비밀번호는 최소 8자 이상이어야 합니다.'),
    nickname: z.string().min(2, '닉네임은 최소 2자 이상이여야 합니다.').max(30),
    confirmPassword: z.string().min(8),
  })
  .refine(v => v.password === v.confirmPassword, {
    // 인자 1번째: 검증로직
    // 인자 2번째: 에러메시지와 에러필드 정의
    // message: ""
    error: '비밀번호 확인이 일치하지 않습니다.',
    path: ['confirmPassword'],
  });

export const loginFormSchema = z.object({
  email: z.email('올바른 이메일을 입력하세요.'),
  password: z.string().min(1, '비밀번호를 입력해주세요.'),
});

export type SignupFormSchema = z.infer<typeof signupFormSchema>;
export type LoginFormSchema = z.infer<typeof loginFormSchema>;

// //
// const result = signupFormSchema.safeParse({
//   email: "string",
//   nickname: "sample",
//   password: "strongest",
//   confirmPassword: "strongest",
// });
// console.log(result);
