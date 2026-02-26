// src/features/portfolio/components/portfolio.tsx
// 이건 서버컴포넌트입니다.
import PortfolioClient from './portfolio.client';

// 서버 컴포넌트는 async로 선언할 수 있습니다.
export default async function Portfolio({
  page,
  limit,
}: {
  page: number;
  limit: number;
}) {
  console.log('이건 서버 컴포넌트입니다.', page, limit);
  return (
    <div>
      <h1 className="text-3xl font-bold underline">서버컴포넌트</h1>
      <div>page: {page}</div>
      <div>limit: {limit}</div>
      <hr />
      <PortfolioClient page={page} limit={limit} />
    </div>
  );
}
