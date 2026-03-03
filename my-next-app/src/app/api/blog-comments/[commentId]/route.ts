import { db } from '@/lib/db/client';
import { postCommentsTable } from '@/lib/db/schema';
import response from '@/lib/http/response';
import { createCommentSchema } from '@/lib/validators/comments/comment';
import { eq } from 'drizzle-orm';
import { NextRequest } from 'next/server';
import z from 'zod';

export async function POST(
  request: NextRequest,
  { params }: { params: { commentId: string } }
) {
  const commentId = Number((await params).commentId);
  const body = await request.json();
  const result = createCommentSchema.safeParse(body);

  if (!result.success) {
    return response.fail(JSON.stringify(z.treeifyError(result.error)), 404);
  }

  const { content } = result.data;

  const comment = await db
    .update(postCommentsTable)
    .set({
      content,
    })
    .where(eq(postCommentsTable.id, commentId))
    .returning();

  return response.ok(comment, { status: 201 });
}

export async function DELETE({ params }: { params: { commentId: string } }) {
  const commentId = Number((await params).commentId);

  const comment = await db
    .update(postCommentsTable)
    .set({
      isDeleted: true,
    })
    .where(eq(postCommentsTable.id, commentId))
    .returning();

  return response.ok(comment, { status: 201 });
}