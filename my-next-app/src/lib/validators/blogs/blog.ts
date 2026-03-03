import { z } from 'zod';

export const createBlogSchema = z.object({
  title: z.string().min(1, '제목을 입력하여 주세요'),
  content: z.string().min(1, '내용을 입력하여 주세요.'),
});

export type CreateBlogSchema = z.infer<typeof createBlogSchema>;
