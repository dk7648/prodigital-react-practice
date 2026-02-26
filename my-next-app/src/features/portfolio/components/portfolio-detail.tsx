// src/features/portfolio/components/portfolio-detail.tsx
import PortfolioDetailClient from './portfolio-detail.client';

export default function PortfolioDetail({
  portfolioId,
}: {
  portfolioId: string;
}) {
  return (
    <div>
      포트폴리오 상세 페이지 서버컴포넌트
      <div>portfolioId: {portfolioId}</div>
      <PortfolioDetailClient portfolioId={portfolioId} />
    </div>
  );
}
