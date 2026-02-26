// src/app/(main)/portfolio/[portfolioId]/page.tsx

import PortfolioDetail from '@/features/portfolio/components/portfolio-detail';

export default async function PortfolioDetailPage({
  params,
}: {
  params: Promise<{ portfolioId: string }>;
}) {
  const { portfolioId } = await params;
  console.log(portfolioId);

  return (
    <div className="container mx-auto text-center p-8">
      <h1 className="text-3xl font-bold underline">포트폴리오 상세 페이지</h1>
      <p className="mt-4 text-lg">여기는 포트폴리오 상세 페이지입니다.</p>
      <div>id: {portfolioId}</div>
      <PortfolioDetail portfolioId={portfolioId} />
    </div>
  );
}
