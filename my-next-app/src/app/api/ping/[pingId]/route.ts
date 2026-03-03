import { NextRequest, NextResponse } from 'next/server';

import response from '@/lib/http/response';

interface RouteContext {
  params: Promise<{ pingId: string }>;
}

export async function GET(request: NextRequest, context: RouteContext) {
  const { pingId } = await context.params;

  const response = NextResponse.json({
    ping: `pong ${pingId}`,
  });
  return response;
}
