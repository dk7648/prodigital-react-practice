import type { ApiEnvelope, ApiPaginationEnvelope } from '@/types/api-envelope';
import type {
  CommentItem,
  CreateCommentInput,
  CreatePostInput,
  CreatePostResponse,
  PostItem,
  PostLikeStatusItem,
  PostLikeStatusResponse,
  RefreshResponseData,
  UpdatePostInput,
  UpdatePostResponse,
} from './types';
import {
  clearAccessToken,
  getAccessToken,
  setAccessToken,
} from '@/lib/auth-token-storage';
export async function fetchPostList(page: number, pageSize: number) {
  const postResponse = await fetch(
    `${import.meta.env.VITE_BASE_API_URL}/api/posts?page=${page}&pageSize=${pageSize}`
  );
  const resp = (await postResponse.json()) as ApiPaginationEnvelope<PostItem>;
  if (resp.success) return resp.data;
  else throw new Error(resp.error.message);
}

export async function fetchPostDetail(id: number) {
  const res = await fetch(
    `${import.meta.env.VITE_BASE_API_URL}/api/posts/${id}`
  );

  if (!res.ok) {
    throw new Error(`HTTP ${res.status}`);
  }

  const resp = (await res.json()) as ApiEnvelope<PostItem>;

  if (resp.success) return resp.data;
  else throw new Error(resp.error.message);
}

export async function fetchPostCreate(
  input: CreatePostInput
): Promise<CreatePostResponse> {
  const token = getAccessToken();
  const res = await fetch(`${import.meta.env.VITE_BASE_API_URL}/api/posts`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify(input),
  });

  if (!res.ok) {
    throw new Error(`HTTP ${res.status}`);
  }

  const resp = (await res.json()) as ApiEnvelope<PostItem>;

  if (resp.success) return resp.data;
  else throw new Error(resp.error.message);
}

export async function fetchPostLikeStatus(postId: number) {
  const token = getAccessToken();

  const res = await fetch(
    `${import.meta.env.VITE_BASE_API_URL}/api/posts/${postId}/like`,
    {
      method: 'GET',
      headers: {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    }
  );

  if (!res.ok) throw new Error(`HTTP ${res.status}`);

  const resp = (await res.json()) as PostLikeStatusResponse;
  if (!resp.success) throw new Error(resp.error.message);
  return resp.data ?? null;
}

export async function fetchPostUpdate(
  id: number,
  input: UpdatePostInput
): Promise<UpdatePostResponse> {
  if (!Number.isInteger(id) || id <= 0)
    throw new Error('id must be a positive integer');

  const token = getAccessToken();

  const res = await fetch(
    `${import.meta.env.VITE_BASE_API_URL}/api/posts/${id}`,
    {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify(input),
    }
  );

  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const resp = (await res.json()) as ApiEnvelope<PostItem>;
  if (!resp.success) throw new Error(resp.error.message);
  return resp.data as unknown as UpdatePostResponse;
}

export async function fetchPostComments(
  postId: number
): Promise<{ items: CommentItem[] }> {
  if (!Number.isInteger(postId) || postId <= 0) {
    throw new Error('postId must be a positive integer');
  }

  const token = getAccessToken();

  const res = await fetch(
    `${import.meta.env.VITE_BASE_API_URL}/api/posts/${postId}/comments`,
    {
      method: 'GET',
      headers: {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    }
  );

  if (!res.ok) throw new Error(`HTTP ${res.status}`);

  const resp = (await res.json()) as ApiEnvelope<{ items: CommentItem[] }>;
  if (!resp.success) throw new Error(resp.error.message);

  return resp.data;
}

export async function fetchCreatePostComment(
  postId: number,
  input: CreateCommentInput
): Promise<{ comment: CommentItem }> {
  if (!Number.isInteger(postId) || postId <= 0) {
    throw new Error('postId must be a positive integer');
  }

  const token = getAccessToken();

  const res = await fetch(
    `${import.meta.env.VITE_BASE_API_URL}/api/posts/${postId}/comments`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify(input),
    }
  );

  if (!res.ok) throw new Error(`HTTP ${res.status}`);

  const resp = (await res.json()) as ApiEnvelope<{ comment: CommentItem }>;
  if (!resp.success) throw new Error(resp.error.message);

  return resp.data;
}

export async function refreshServer(): Promise<
  ApiEnvelope<RefreshResponseData>
> {
  const token = getAccessToken();
  const res = await fetch(
    `${import.meta.env.VITE_BASE_API_URL}/api/auth/refresh`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}), // 서버가 쿠키 기반이면 이 줄 빼고 credentials 사용
      },
      // 서버가 바디를 요구하지 않으면 생략 가능
      body: JSON.stringify({}),
    }
  );

  if (!res.ok) {
    // refresh 실패면 보통 로그아웃 처리
    clearAccessToken();
    throw new Error(`HTTP ${res.status}`);
  }

  const resp = (await res.json()) as ApiEnvelope<RefreshResponseData>;

  if (!resp.success) {
    clearAccessToken();
    throw new Error(resp.error.message);
  }

  // ✅ 새 토큰 저장
  setAccessToken(resp.data.token);

  return resp;
}

export async function fetchPostDelete(postId: number) {
  const token = getAccessToken();

  const res = await fetch(
    `${import.meta.env.VITE_BASE_API_URL}/api/posts/${postId}`,
    {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}), // 서버가 쿠키 기반이면 이 줄 빼고 credentials 사용
      },
    }
  );
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const resp = await res.json();
  if (!resp.success) {
    throw new Error(resp.error.message);
  }
}

export async function fetchCreatePostLike(postId: number) {
  if (!Number.isInteger(postId) || postId <= 0) {
    throw new Error('postId must be a positive integer');
  }
  const token = getAccessToken();

  const res = await fetch(
    `${import.meta.env.VITE_BASE_API_URL}/api/posts/${postId}/like`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify({}),
    }
  );

  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const resp = await res.json();
  if (!resp.success) throw new Error(resp.error.message);
  return resp.data;
}

export async function fetchDeletePostLike(postId: number) {
  if (!Number.isInteger(postId) || postId <= 0) {
    throw new Error('postId must be a positive integer');
  }
  const token = getAccessToken();

  const res = await fetch(
    `${import.meta.env.VITE_BASE_API_URL}/api/posts/${postId}/like`,
    {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify({}),
    }
  );

  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const resp = await res.json();
  if (!resp.success) throw new Error(resp.error.message);
  return resp.data;
}

export const fetchProjects = async ({ pageParam = 0 }) => {
  const res = await fetch('/api/projects?cursor=' + pageParam);
  return res.json();
};
