import { z } from 'zod';

export const createCommentSchema = z.object({
  parentId: z.number().nullable().optional(),
  content: z.string().min(1, '내용을 입력하여 주세요.'),
});

export type CreateCommentSchema = z.infer<typeof createCommentSchema>;
