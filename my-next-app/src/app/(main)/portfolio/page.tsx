import type { Metadata } from 'next';

// "portfolio"
export const metadata: Metadata = {
  title: '포트폴리오 페이지',
  description: '포트폴리오 페이지입니다.',
};

export default function PortfolioPage() {
  return (
    <div className="container mx-auto text-center p-8">
      <h1 className="text-3xl font-bold underline">포트폴리오 페이지</h1>
      <p className="mt-4 text-lg">여기는 포트폴리오 페이지입니다.</p>
    </div>
  );
}
