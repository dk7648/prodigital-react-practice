import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router';

import { getPostListQueryOptions } from '../queries';
import { Spinner } from '@/components/ui/spinner';
import { PostCard } from './post-card';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { PostPagination } from './pagination';

export default function PostList() {
  const [isScroll, setIsScroll] = useState(false); // false: 페이지네이션, true: 무한스크롤
  const [page, setPage] = useState(1);
  const size = 10;

  // -----------------------------
  // 페이지네이션 (useQuery)
  // -----------------------------
  const pageQuery = useMemo(() => getPostListQueryOptions(page, size), [page]);
  const {
    data: posts,
    isLoading,
    isError,
  } = useQuery({
    ...pageQuery,
    enabled: !isScroll,
    keepPreviousData: true,
  });

  const empty =
    !isScroll && !isLoading && !isError && (!posts || posts.items.length === 0);

  // -----------------------------
  // 무한스크롤 (useInfiniteQuery)
  // -----------------------------
  const {
    data: inf,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading: isInfLoading,
    isError: isInfError,
  } = useInfiniteQuery({
    queryKey: ['posts', 'infinite', size],
    enabled: isScroll,
    initialPageParam: 1,

    queryFn: ({ pageParam }) => {
      const opts = getPostListQueryOptions(Number(pageParam), size);
      return opts.queryFn(); // 결과: { items: Post[] } 가정
    },

    //다음페이지 판단
    getNextPageParam: (lastPage, allPages) => {
      const lastItems = lastPage?.items ?? [];
      if (lastItems.length < size) return undefined; // 다음 페이지 없음
      return allPages.length + 1; // 다음 page 번호
    },
  });

  // 무한스크롤에서 평탄화된 아이템
  const infiniteItems = useMemo(() => {
    const pages = inf?.pages ?? [];
    return pages.flatMap((p: any) => p.items ?? []);
  }, [inf]);

  const infiniteEmpty =
    isScroll &&
    !isInfLoading &&
    !isInfError &&
    (infiniteItems?.length ?? 0) === 0;

  // -----------------------------
  // IntersectionObserver
  // -----------------------------
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!isScroll) return;
    const el = sentinelRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        if (isFetchingNextPage) return;
        if (!hasNextPage) return;
        fetchNextPage();
      },
      { root: null, rootMargin: '200px', threshold: 0 }
    );

    io.observe(el);
    return () => io.disconnect();
  }, [isScroll, fetchNextPage, hasNextPage, isFetchingNextPage]);

  useEffect(() => {
    setPage(1);
  }, [isScroll]);

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-6">
      {/* Header */}
      <div className="mb-5 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h1 className="text-xl font-semibold tracking-tight">게시글</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            최신 글을 확인하고 의견을 남겨보세요.
          </p>
        </div>

        <div className="flex shrink-0 gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => setIsScroll(prev => !prev)}
          >
            {isScroll ? '무한스크롤' : '페이지네이션'}
          </Button>

          <Button asChild>
            <Link to="/posts/write">작성</Link>
          </Button>
        </div>
      </div>

      {/* Body */}
      <Card className="border bg-card/60 p-4 shadow-sm">
        {isScroll ? (
          <>
            {/* 무한스크롤 UI */}
            {isInfLoading && (
              <div className="flex items-center justify-center py-16">
                <Spinner />
              </div>
            )}

            {isInfError && (
              <div className="rounded-lg border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive">
                에러가 발생하였습니다.
              </div>
            )}

            {infiniteEmpty && (
              <div className="flex flex-col items-center justify-center gap-2 py-16 text-center">
                <div className="text-base font-medium">게시글이 없습니다..</div>
                <div className="text-sm text-muted-foreground">
                  첫 게시글을 작성해보세요.
                </div>
                <Button asChild variant="outline" className="mt-2">
                  <Link to="/posts/write">게시글 작성</Link>
                </Button>
              </div>
            )}

            {!isInfLoading && !isInfError && !infiniteEmpty && (
              <div className="grid gap-3">
                {infiniteItems.map((post: any) => (
                  <PostCard
                    key={post.id}
                    post={post}
                    isLikePending={false}
                    onToggleLike={() => {}}
                    likedByMe={false}
                  />
                ))}
              </div>
            )}

            {/* 하단 로딩 / 센티넬 */}
            <div className="py-4">
              {isFetchingNextPage && (
                <div className="flex items-center justify-center py-6">
                  <Spinner />
                </div>
              )}
              {/* 센티넬은 항상 렌더 */}
              <div ref={sentinelRef} style={{ height: 1 }} />
              {!hasNextPage && (infiniteItems.length ?? 0) > 0 && (
                <div className="text-center text-xs text-muted-foreground pt-3">
                  더 이상 불러올 게시글이 없어요.
                </div>
              )}
            </div>
          </>
        ) : (
          <>
            {/* 페이지네이션 UI */}
            {isLoading && (
              <div className="flex items-center justify-center py-16">
                <Spinner />
              </div>
            )}

            {isError && (
              <div className="rounded-lg border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive">
                에러가 발생하였습니다.
              </div>
            )}

            {empty && (
              <div className="flex flex-col items-center justify-center gap-2 py-16 text-center">
                <div className="text-base font-medium">게시글이 없습니다..</div>
                <div className="text-sm text-muted-foreground">
                  첫 게시글을 작성해보세요.
                </div>
                <Button asChild variant="outline" className="mt-2">
                  <Link to="/posts/write">게시글 작성</Link>
                </Button>
              </div>
            )}

            {!isLoading && !isError && !empty && (
              <div className="grid gap-3">
                {posts!.items.map((post: any) => (
                  <PostCard
                    key={post.id}
                    post={post}
                    isLikePending={false}
                    onToggleLike={() => {}}
                    likedByMe={false}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </Card>

      {/* Pagination footer (페이지네이션 모드만) */}
      {!isScroll && (
        <PostPagination
          page={page}
          totalPages={posts?.items.length ?? 1}
          onChangePage={setPage}
        />
      )}
    </div>
  );
}
