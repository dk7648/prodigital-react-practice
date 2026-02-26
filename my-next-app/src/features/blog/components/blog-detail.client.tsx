// src/app/(main)/portfolio/[portfolioId]/page.tsx
'use client';
import PortfolioDetail from '@/features/portfolio/components/portfolio-detail';
import { useParams, useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { set } from 'react-hook-form';

type BlogItem = {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  authorId: string;
  authorNickname: string;
  likeCount: number;
  commentCount: number;
};
const url = 'https://shinhan-pda-react-router-full-examp.vercel.app/api/posts';
export default function BlogDetailClient() {
  const params = useParams();
  const [items, setItems] = useState<BlogItem[]>([]);
  useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then(data => setItems(data.data.items));
  }, []);

  const filteredItem = useMemo(() => {
    if (items.length > 0) {
      const foundItem = items.find(
        (item: BlogItem) => item.id === Number(params.blogId)
      );
      return foundItem || null;
    }
    return null;
  }, [items, params.blogId]);

  return (
    <div className="mx-auto max-w-4xl p-8">
      {filteredItem ? (
        <div
          key={filteredItem.id}
          className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:shadow-md"
        >
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
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}
