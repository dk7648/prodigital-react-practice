// /api/blogs (POST)

import { db } from '@/lib/db/client';
import { blogsTable } from '@/lib/db/schema';
import response from '@/lib/http/response';
import { createBlogSchema } from '@/lib/validators/blogs/blog';
import type { NextRequest } from 'next/server';
import { z } from 'zod';
import { desc } from 'drizzle-orm';

export async function POST(request: NextRequest) {
  // 1. /api/blogs로 오는 HTTP Request Body에서 내용을 꺼내서
  // 2. validation check를 하고
  // 3. 통과시 db에 insert

  const body = await request.json();
  const result = createBlogSchema.safeParse(body);
  if (!result.success) {
    return response.fail(JSON.stringify(z.treeifyError(result.error)));
  }
  const blog = await db.insert(blogsTable).values(result.data).returning();

  return response.ok(blog, { status: 201 });
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const page = searchParams.get('page') ? Number(searchParams.get('page')) : 1;
  const result = await db
    .select()
    .from(blogsTable)
    .limit(10)
    .offset((page - 1) * 10)
    .orderBy(desc(blogsTable.createdAt));
  if (result.length === 0) {
    return response.fail('게시글이 없습니다.', 404);
  }
  return response.ok(result, { status: 201 });
}
