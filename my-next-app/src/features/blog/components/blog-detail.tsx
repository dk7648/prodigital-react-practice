// src/app/(main)/portfolio/[portfolioId]/page.tsx
import type { Metadata } from 'next';
import { ApiResponse, BlogItem } from '../types/blog-type';

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
    <div className="mx-auto max-w-4xl p-8">
      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:shadow-md">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-800">
            {filteredItem.title}
          </h2>
          <span className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-600">
            {filteredItem.authorNickname}
          </span>
        </div>

        <p className="mb-4 leading-relaxed text-gray-700">
          {filteredItem.content}
        </p>

        <div className="text-sm text-gray-400">
          작성일: {filteredItem.createdAt}
        </div>
      </div>
    </div>
  );
}
