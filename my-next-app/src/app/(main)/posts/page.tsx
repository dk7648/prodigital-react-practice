import type { Metadata } from 'next';

// "portfolio"
export const metadata: Metadata = {
  title: '포스트 리스트',
  description: '포스트 리스트 페이지입니다.',
};

export default function PostListPage() {
  return (
    <div className="container mx-auto text-center p-8">
      <h1 className="text-3xl font-bold underline">포스트 리스트 페이지</h1>
      <ul className="list-disc list-inside mt-4">
        <li>포스트 1</li>
        <li>포스트 2</li>
        <li>포스트 3</li>
      </ul>
    </div>
  );
}
