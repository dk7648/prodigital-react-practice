import { NextResponse, type NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  console.log(url);
  console.log(request.headers);

  const respHeaders = new Headers();
  respHeaders.set('Ping', 'Pong');

  const response = NextResponse.json(
    { ping: 'pong' },
    { headers: respHeaders, status: 200 }
  );
  response.cookies.set('pingCookie', 'pongValue');
  return response;
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  console.log(body);
  const response = NextResponse.json({
    ping: 'pong',
    body: body,
  });
  return response;
}
