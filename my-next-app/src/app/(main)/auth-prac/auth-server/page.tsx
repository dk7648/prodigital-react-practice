// src/app/(main)/auth-prac/auth-server/page.tsx

import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
export default async function AuthServerPractice() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  console.log(session);

  const result = await auth.api.signUpEmail({
    headers: await headers(),
    body: {
      email: 'example@naver.com',
      name: '신윤수',
      password: 'mypassword',
    },
  });
  console.log(result);
  return (
    <div>
      이건 서버컴포넌트
      <div>회원가입 연습</div>
    </div>
  );
}
