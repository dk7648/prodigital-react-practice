import { Link, useParams } from 'react-router';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useMemo, useState } from 'react';

import {
  getPostCommentsQueryOptions,
  getPostDetailQueryOptions,
  getPostLikeStatusQueryOptions,
} from '../queries';
import {
  fetchCreatePostComment,
  fetchCreatePostLike,
  fetchDeletePostLike,
  fetchPostDelete,
} from '../apis';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { useAuth } from '@/features/auth/hooks';

type Comment = {
  id: number;
  content: string;
  createdAt: string;
  author: { nickname: string };
  children?: Comment[];
};

type WriteCommentProps = {
  value: string;
  onChange: (v: string) => void;
  onSubmit: () => void;
  isPending: boolean;
};

function WriteComment({
  value,
  onChange,
  onSubmit,
  isPending,
}: WriteCommentProps) {
  return (
    <div className="grid gap-2">
      <Textarea
        rows={3}
        placeholder="댓글을 입력하세요"
        value={value}
        onChange={e => onChange(e.target.value)}
      />
      <div className="flex justify-end">
        <Button
          type="button"
          onClick={onSubmit}
          disabled={isPending || value.trim().length === 0}
        >
          {isPending ? '등록 중...' : '댓글 등록'}
        </Button>
      </div>
    </div>
  );
}

type SearchCommentsProps = {
  c: Comment;
  depth: number;
  focusCommentId: number | null;
  setFocusCommentId: React.Dispatch<React.SetStateAction<number | null>>;
  replyTextByParentId: Record<number, string>;
  setReplyTextByParentId: React.Dispatch<
    React.SetStateAction<Record<number, string>>
  >;
  onSubmitReply: (parentId: number) => void;
  isCreateCommentPending: boolean;
};

function SearchComments({
  c,
  depth,
  focusCommentId,
  setFocusCommentId,
  replyTextByParentId,
  setReplyTextByParentId,
  onSubmitReply,
  isCreateCommentPending,
}: SearchCommentsProps) {
  const replyText = replyTextByParentId[c.id] ?? '';

  return (
    <div className={depth === 0 ? '' : 'mt-2 pl-4'}>
      <div
        className="rounded-lg border bg-background/50 p-3"
        onClick={() => setFocusCommentId(prev => (prev === c.id ? null : c.id))}
      >
        <div className="flex items-center justify-between gap-2">
          <div className="text-sm font-medium">{c.author.nickname}</div>
          <div className="text-xs text-muted-foreground">{c.createdAt}</div>
        </div>
        <div className="mt-1 whitespace-pre-wrap text-sm">{c.content}</div>
      </div>

      {c.id === focusCommentId && (
        <div className="mt-2 pl-4">
          <WriteComment
            value={replyText}
            onChange={v =>
              setReplyTextByParentId(prev => ({
                ...prev,
                [c.id]: v,
              }))
            }
            onSubmit={() => {
              if (depth === 2) alert('답글은 3단계까지만 가능합니다.');
              else onSubmitReply(c.id);
            }}
            isPending={isCreateCommentPending}
          />
        </div>
      )}

      {(c.children ?? []).length > 0 && (
        <div className="mt-2 space-y-2">
          {c.children!.map(child => (
            <SearchComments
              key={child.id}
              c={child}
              depth={depth + 1}
              focusCommentId={focusCommentId}
              setFocusCommentId={setFocusCommentId}
              replyTextByParentId={replyTextByParentId}
              setReplyTextByParentId={setReplyTextByParentId}
              onSubmitReply={onSubmitReply}
              isCreateCommentPending={isCreateCommentPending}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export function PostDetail() {
  const [focusCommentId, setFocusCommentId] = useState<number | null>(null);
  const [rootCommentText, setRootCommentText] = useState('');
  const [replyTextByParentId, setReplyTextByParentId] = useState<
    Record<number, string>
  >({});

  const { postId } = useParams();
  const id = Number(postId);
  const enabled = Number.isFinite(id) && id > 0;

  const qc = useQueryClient();
  const { user } = useAuth();

  const detailQuery = useMemo(() => getPostDetailQueryOptions(id), [id]);
  const likeQuery = useMemo(() => getPostLikeStatusQueryOptions(id), [id]);
  const commentsQuery = useMemo(() => getPostCommentsQueryOptions(id), [id]);

  const {
    data: detailResp,
    isLoading: isDetailLoading,
    isError: isDetailError,
  } = useQuery({ ...detailQuery, enabled });

  const {
    data: likeResp,
    isLoading: isLikeLoading,
    isError: isLikeError,
  } = useQuery({ ...likeQuery, enabled });

  const {
    data: commentsResp,
    isLoading: isCommentsLoading,
    isError: isCommentsError,
  } = useQuery({ ...commentsQuery, enabled });

  const likeKey = likeQuery.queryKey;
  const detailKey = detailQuery.queryKey;

  const { mutate: createComment, isPending: isCreateCommentPending } =
    useMutation({
      mutationFn: ({
        content,
        parentId,
      }: {
        content: string;
        parentId: number | null;
      }) =>
        fetchCreatePostComment(id, {
          content,
          parentId,
        }),
      onSuccess: (_data, vars) => {
        if (vars.parentId == null) {
          setRootCommentText('');
        } else {
          setReplyTextByParentId(prev => ({
            ...prev,
            [vars.parentId!]: '',
          }));
          setFocusCommentId(null);
        }

        qc.invalidateQueries({ queryKey: commentsQuery.queryKey });
        qc.invalidateQueries({ queryKey: detailKey });
      },
    });

  const { mutate: deletePost, isPending: isDeletePending } = useMutation({
    mutationFn: () => fetchPostDelete(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['posts'] });
      window.location.href = '/posts';
    },
  });

  type ToggleVars = { wasLiked: boolean };

  const { mutate: toggleLike, isPending: isLikeMutating } = useMutation({
    mutationFn: async ({ wasLiked }: ToggleVars) =>
      wasLiked ? fetchDeletePostLike(id) : fetchCreatePostLike(id),

    onMutate: async ({ wasLiked }: ToggleVars) => {
      await qc.cancelQueries({ queryKey: likeKey });
      await qc.cancelQueries({ queryKey: detailKey });

      const prevLike = qc.getQueryData<any>(likeKey);
      const prevDetail = qc.getQueryData<any>(detailKey);

      const currentCount =
        prevLike?.items?.[0]?.likeCount ?? prevDetail?.post?.likeCount ?? 0;

      const nextLiked = !wasLiked;
      const nextCount = Math.max(0, currentCount + (nextLiked ? 1 : -1));

      qc.setQueryData(likeKey, (old: any) => ({
        ...(old ?? {}),
        likedByMe: nextLiked,
        likeCount: nextCount,
      }));

      qc.setQueryData(detailKey, (old: any) => {
        if (!old?.post) return old;
        return { ...old, post: { ...old.post, likeCount: nextCount } };
      });

      return { prevLike, prevDetail };
    },

    onError: (_err, _vars, ctx) => {
      if (!ctx) return;
      qc.setQueryData(likeKey, ctx.prevLike);
      qc.setQueryData(detailKey, ctx.prevDetail);
    },

    onSettled: () => {
      qc.invalidateQueries({ queryKey: likeKey });
      qc.invalidateQueries({ queryKey: detailKey });
    },
  });

  const onClickLike = () => {
    if (!canToggleLike) return alert('로그인이 필요합니다.');
    const cached = qc.getQueryData<any>(likeKey);
    const cachedStatus = cached?.items?.[0];
    const likeRespStatus = (likeResp as any)?.items?.[0];
    const wasLiked =
      cachedStatus?.likedByMe ?? likeRespStatus?.likedByMe ?? false;
    toggleLike({ wasLiked });
  };

  if (!enabled)
    return <div className="mx-auto max-w-3xl px-4 py-6">잘못된 게시글 id</div>;
  if (isDetailLoading)
    return <div className="mx-auto max-w-3xl px-4 py-6">loading...</div>;
  if (isDetailError)
    return <div className="mx-auto max-w-3xl px-4 py-6">error</div>;
  if (!detailResp)
    return (
      <div className="mx-auto max-w-3xl px-4 py-6">게시글이 없습니다..</div>
    );

  const post = detailResp.post;
  const likeStatus = (likeResp as any)?.items?.[0];
  const likeCount = likeStatus?.likeCount ?? post.likeCount ?? 0;
  const likedByMe = likeStatus?.likedByMe ?? false;
  const comments =
    (commentsResp as any)?.comments ?? (commentsResp as any)?.items ?? [];

  const isMine = Boolean(
    user?.id && post.authorId && user.id === post.authorId
  );
  const canToggleLike = Boolean(user);

  const onDelete = () => {
    if (!isMine) return;
    if (!window.confirm('정말 삭제할까요?')) return;
    deletePost();
  };

  const onSubmitRootComment = () => {
    const content = rootCommentText.trim();
    if (!content) return;
    createComment({ content, parentId: null });
  };

  const onSubmitReply = (parentId: number) => {
    const content = (replyTextByParentId[parentId] ?? '').trim();
    if (!content) return;
    createComment({ content, parentId });
  };

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-6">
      <Card className="border bg-card/60 shadow-sm">
        <CardHeader className="space-y-2">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <CardTitle className="text-xl leading-snug">
                {post.title}
              </CardTitle>
              <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                <span>{post.authorNickname ?? '작성자'}</span>
                <span>•</span>
                <span>{post.createdAt}</span>
              </div>
            </div>

            {isMine && (
              <div className="flex shrink-0 items-center gap-2">
                <Button asChild variant="outline" size="sm">
                  <Link to={`/posts/${id}/edit`}>수정</Link>
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={onDelete}
                  disabled={isDeletePending}
                >
                  {isDeletePending ? '삭제 중...' : '삭제'}
                </Button>
              </div>
            )}
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="whitespace-pre-wrap leading-relaxed text-sm">
            {post.content}
          </div>

          <div className="flex items-center justify-between gap-3 pt-2">
            <div className="flex items-center gap-2 text-sm">
              {isLikeLoading && (
                <span className="text-muted-foreground">
                  좋아요 불러오는 중...
                </span>
              )}
              {isLikeError && (
                <span className="text-destructive">좋아요 정보 오류</span>
              )}
              {!isLikeLoading && !isLikeError && (
                <Button
                  size="sm"
                  variant={likedByMe ? 'outline' : 'default'}
                  onClick={onClickLike}
                  disabled={!canToggleLike || isLikeMutating}
                >
                  <span>{likedByMe ? '❤️' : '🤍'}</span>
                  <span className="font-medium">{likeCount}</span>
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="mt-5 border bg-card/60 shadow-sm">
        <CardHeader className="space-y-1">
          <CardTitle className="text-base">댓글</CardTitle>
          <p className="text-sm text-muted-foreground">
            서로 예의 있게 대화해요.
          </p>
        </CardHeader>

        <CardContent className="space-y-4">
          <WriteComment
            value={rootCommentText}
            onChange={setRootCommentText}
            onSubmit={onSubmitRootComment}
            isPending={isCreateCommentPending}
          />

          {isCommentsLoading && (
            <div className="text-sm text-muted-foreground">
              댓글 불러오는 중...
            </div>
          )}
          {isCommentsError && (
            <div className="text-sm text-destructive">댓글 로드 오류</div>
          )}
          {!isCommentsLoading && !isCommentsError && (
            <div className="grid gap-3">
              {comments.length === 0 ? (
                <div className="rounded-lg border bg-background/50 px-4 py-6 text-center text-sm text-muted-foreground">
                  댓글이 없습니다.
                </div>
              ) : (
                comments.map((c: Comment) => (
                  <SearchComments
                    key={c.id}
                    c={c}
                    depth={0}
                    focusCommentId={focusCommentId}
                    setFocusCommentId={setFocusCommentId}
                    replyTextByParentId={replyTextByParentId}
                    setReplyTextByParentId={setReplyTextByParentId}
                    onSubmitReply={onSubmitReply}
                    isCreateCommentPending={isCreateCommentPending}
                  />
                ))
              )}
            </div>
          )}
        </CardContent>
      </Card>

      <div className="mt-5 flex justify-end">
        <Button asChild variant="outline">
          <Link to="/posts">목록</Link>
        </Button>
      </div>
    </div>
  );
}
