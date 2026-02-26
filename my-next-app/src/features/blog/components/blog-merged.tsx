'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { BlogItem } from '../types/blog-type';

const url = 'https://shinhan-pda-react-router-full-examp.vercel.app/api/posts';
export default function BlogMergedList({
  initialData: serverItems,
}: {
  initialData: BlogItem[];
}) {
  const [items, setItems] = useState<BlogItem[]>(serverItems);

  useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then(data => setItems(data.data.items));
  }, []);

  return (
    <div className="mx-auto max-w-4xl p-8">
      <h1 className="mb-8 text-center text-3xl font-bold tracking-tight text-gray-900">
        포스트 리스트
      </h1>

      <div className="space-y-6">
        {items.map((item: BlogItem) => (
          <Link href={`/blog-ser/${item.id}`} key={item.id}>
            <div
              key={item.id}
              className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:shadow-md"
            >
              <div className="mb-3 flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-800">
                  {item.title}
                </h2>
                <span className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-600">
                  {item.authorNickname}
                </span>
              </div>

              <p className="mb-4 leading-relaxed text-gray-700">
                {item.content}
              </p>

              <div className="text-sm text-gray-400">
                작성일: {item.createdAt}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
