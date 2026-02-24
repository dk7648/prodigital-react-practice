import { QueryClient } from '@tanstack/react-query';
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // 언제 fetch할지 제어
      staleTime: 1000 * 60 * 5, // 5분동안 fresh 상태 유지, 그 후 stale 상태 (stale상태: 이전 데이터가 캐시되어 있지만 업데이트 되어 있지 않은 상태)
      gcTime: 1000 * 60 * 10, // 10분 (gcTime: 가비지 컬렉션 시간, 즉 캐시에서 데이터를 제거하는 시간)
      // 에러처리
      retry: 3, // (오류시 자동으로 3번 재시도)
      retryDelay: 1000, // 재시도 간격(ms)
      // 자동 refetch 옵션
      refetchOnWindowFocus: false, // (윈도우 포커스시 자동으로 재시도)
      refetchOnMount: true, // (마운트시 자동으로 재시도)
      refetchInterval: 1000 * 60 * 5, // 5분 (주기적으로 재시도)
      refetchIntervalInBackground: true, // (백그라운드에서 주기적으로 재시도)
    },
  },
});
