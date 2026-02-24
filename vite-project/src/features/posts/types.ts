import type { ApiEnvelope } from '@/types/api-envelope';

export interface PostItem {
  post: any;
  id: number;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  authorId: string;
  authorNickname: string;
  likeCount: number;
  commentCount: number;
}

export type CreatePostInput = { title: string; content: string };

export type CreatePostResponse = {
  post: {
    id: number;
    title: string;
    content: string;
    createdAt: string;
    updatedAt: string;
    authorId: string;
    authorNickname: string;
    likeCount: number;
    commentCount: number;
  };
};

export type PostLikeStatusItem = {
  postId: number;
  likeCount: number;
  likedByMe: boolean;
};

export type PostLikeStatusResponse = ApiEnvelope<{
  items: PostLikeStatusItem[];
}>;

export type UpdatePostInput = {
  title: string;
  content: string;
};

export type UpdatePostResponse = {
  post: PostItem;
};

export type CommentItem = {
  id: number;
  postId: number;
  content: string;
  authorId: string;
  authorNickname: string;
  createdAt: string;
  updatedAt: string;
};

export type CreateCommentInput = { content: string };

export type RefreshResponseData = {
  user: {
    id: string;
    email: string;
    nickname: string;
    role: string;
  };
  token: string;
  message: string;
};
