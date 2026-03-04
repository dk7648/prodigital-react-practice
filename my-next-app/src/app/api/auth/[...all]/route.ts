// src/app/api/auth/[...all]/route.ts
// [...all]: auth로 시작하는 모든 요청을 받는다. parameter를 가변인수로 받는다

import { auth } from '@/lib/auth'; // path to your auth file
import { toNextJsHandler } from 'better-auth/next-js';
export const { POST, GET } = toNextJsHandler(auth);
