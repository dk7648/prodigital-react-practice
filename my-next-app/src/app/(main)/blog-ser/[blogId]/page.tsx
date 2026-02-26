// src/app/(main)/portfolio/[portfolioId]/page.tsx
import BlogDetail from '@/features/blog/components/blog-detail';
import type { Metadata } from 'next';

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ blogId: string }>;
}) {
  const { blogId } = await params;
  return <BlogDetail blogId={Number(blogId)} />;
}
