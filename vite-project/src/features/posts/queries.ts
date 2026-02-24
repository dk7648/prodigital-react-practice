// src/features/posts/queries.ts
import { useInfiniteQuery } from '@tanstack/react-query';
import {
  fetchPostComments,
  fetchPostDetail,
  fetchPostLikeStatus,
  fetchPostList,
  fetchPostUpdate,
} from './apis';

// Query KEY
export const POST_LIST_QUERY_KEY = 'posts' as const;
export const POST_DETAIL_QUERY_KEY = 'post' as const;
export const POST_LIKE_QUERY_KEY = 'postLike' as const;

export function getPostListQueryOptions(page: number = 1, limit: number = 10) {
  return {
    queryKey: [POST_LIST_QUERY_KEY, page, limit],
    queryFn: () => fetchPostList(page, limit),
  };
}

export function getPostDetailQueryOptions(id: number) {
  return {
    queryKey: [POST_DETAIL_QUERY_KEY, id],
    queryFn: () => fetchPostDetail(id),
  };
}

export function getPostLikeStatusQueryOptions(id: number) {
  return {
    queryKey: [POST_LIKE_QUERY_KEY, id],
    queryFn: () => fetchPostLikeStatus(id),
  };
}

export function getPostUpdateMutationOptions() {
  return {
    mutationFn: (vars: {
      id: number;
      input: { title: string; content: string };
    }) => fetchPostUpdate(vars.id, vars.input),
  };
}

export function getPostCommentsQueryOptions(postId: number) {
  return {
    queryKey: ['post', postId, 'comments'] as const,
    queryFn: () => fetchPostComments(postId),
  };
}
