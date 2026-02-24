// src/features/posts/hooks.ts
import { useQuery } from '@tanstack/react-query';
import { getPostListQueryOptions } from './queries';

export function usePostList({ page, limit }: { page: number; limit: number }) {
  // api 요청 -> state 저장
  return useQuery(getPostListQueryOptions(page, limit));
}
