import { db } from '@/lib/db/client';
import { postCommentsTable } from '@/lib/db/schema';
import response from '@/lib/http/response';
import { NextRequest } from 'next/server';
import { eq } from 'drizzle-orm';
import z from 'zod';
import { createCommentSchema } from '@/lib/validators/comments/comment';

export async function GET(
  request: NextRequest,
  { params }: { params: { blogId: string } }
) {
  const blogId = Number((await params).blogId);
  const result = await db
    .select()
    .from(postCommentsTable)
    .where(eq(postCommentsTable.postId, blogId));
  return response.ok(result, { status: 200 });
}

export async function POST(
  request: NextRequest,
  { params }: { params: { blogId: string } }
) {
  const blogId = Number((await params).blogId);
  const body = await request.json();
  const result = createCommentSchema.safeParse(body);

  if (!result.success) {
    return response.fail(JSON.stringify(z.treeifyError(result.error)), 404);
  }

  const { parentId, content } = result.data;

  let depth = 0;
  if (parentId !== null && parentId !== undefined) {
    const parentComment = await db
      .select()
      .from(postCommentsTable)
      .where(eq(postCommentsTable.id, parentId));

    if (!parentComment[0]) {
      return response.fail('parent comment not found', 404);
    }

    depth = parentComment[0].depth + 1;
  }

  const comment = await db
    .insert(postCommentsTable)
    .values({
      postId: blogId,
      parentId: parentId ?? null,
      content,
      depth,
    })
    .returning();

  return response.ok(comment, { status: 201 });
}
