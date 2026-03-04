'use client';
// src/app/(main)/auth-prac/auth-client/page.tsx

import { useEffect } from 'react';
import { authClient } from '@/lib/auth/auth-client';

export default function AuthClientPrac() {
  useEffect(() => {
    authClient.getSession().then(result => {
      console.log(result);
    });

    authClient.signIn
      .email({
        email: 'example@naver.com',
        password: 'mypassword',
      })
      .then(data => {
        console.log(data);
      });
  }, []);
  return (
    <div>
      <h1>Client Component</h1>
      <div></div>
    </div>
  );
}
