import { db } from '@/lib/db/client';
import { blogsTable } from '@/lib/db/schema';
import response from '@/lib/http/response';
import { createBlogSchema } from '@/lib/validators/blogs/blog';
import { eq } from 'drizzle-orm';
import { NextRequest } from 'next/server';
import z from 'zod';

export async function GET(
  request: NextRequest,
  { params }: { params: { blogId: string } }
) {
  const blogId = Number((await params).blogId);

  if (!Number.isInteger(blogId)) {
    return Response.json(
      { success: false, message: 'invalid blogId' },
      { status: 400 }
    );
  }

  const result = await db
    .select()
    .from(blogsTable)
    .where(eq(blogsTable.id, blogId));

  if (!result[0]) {
    return Response.json(
      { success: false, message: 'blog not found' },
      { status: 404 }
    );
  }

  return response.ok(result[0], { status: 200 });
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { blogId: string } }
) {
  const blogId = Number((await params).blogId);
  const body = await request.json();
  const result = createBlogSchema.safeParse(body);
  if (!result.success) {
    return response.fail(JSON.stringify(z.treeifyError(result.error)));
  }
  const blog = await db
    .update(blogsTable)
    .set(result.data)
    .where(eq(blogsTable.id, blogId))
    .returning();

  return response.ok(blog, { status: 201 });
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { blogId: string } }
) {
  const blogId = Number((await params).blogId);
  const result = await db
    .delete(blogsTable)
    .where(eq(blogsTable.id, blogId))
    .returning();
  return response.ok(result, { status: 200 });
}
