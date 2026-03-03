import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
export async function GET(req: NextRequest) {
  // 쿠키 조회
  const cookieStore = await cookies();
  console.log(cookieStore.getAll());
  console.log(cookieStore.get('cookie-key'));
  // 쿠키 설정
  // CookieStore.set(key, value, options)
  cookieStore.set('cookie-key', 'cookie-value', {
    httpOnly: true, // js 접근 불가
    maxAge: 60 * 60 * 24 * 7, // second단위: 7일
  });
  return NextResponse.json({
    message: 'ok',
  });
}
