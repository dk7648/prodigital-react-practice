// src/app/(main)/portfolio/[portfolioId]/page.tsx
import type { Metadata } from 'next';
import { ApiResponse, BlogItem } from '../types/blog-type';
import BlogDetailClient from './blog-detail.client';

const url = 'https://shinhan-pda-react-router-full-examp.vercel.app/api/posts';

export default async function BlogDetail({ blogId }: { blogId: number }) {
  const res = await fetch(url, {
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error('데이터를 불러오지 못했습니다.');
  }

  const data: ApiResponse = await res.json();

  const filteredItem =
    data.data.items.find((item: BlogItem) => item.id === blogId) ?? null;

  if (!filteredItem) {
    return <div className="mx-auto max-w-4xl p-8">해당 게시글이 없습니다.</div>;
  }

  return (
    <>
      <BlogDetailClient initialData={filteredItem} />
    </>
  );
}
