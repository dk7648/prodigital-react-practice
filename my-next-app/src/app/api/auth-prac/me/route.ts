import { verifyAccessToken } from '@/lib/auth/jwt';
import response from '@/lib/http/response';
import { cookies } from 'next/headers';
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const cookieStore = await cookies();
  // 파일로 분리하는 게 깔끔하지만, 학습적인 직관을 위해 해당 파일에 작성
  let accessToken = cookieStore.get('access-token')?.value;
  // 쿠키가 없으면 Authorization 헤더에서 토큰을 가져옴
  if (!accessToken) {
    const authHeader = request.headers.get('Authorization');
    if (authHeader && authHeader.startsWith('Bearer ')) {
      accessToken = authHeader.split(' ')[1];
    }
  }
  if (!accessToken) {
    return response.fail('Unauthorized', 401);
  }
  const payload = await verifyAccessToken(accessToken);
  if (!payload) {
    return response.fail('Unauthorized', 401);
  }
  return response.ok({
    user: {
      id: payload.userId,
      email: payload.email,
      nickname: payload.nickname,
      role: payload.role,
    },
  });
}
