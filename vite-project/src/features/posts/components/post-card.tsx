import { Heart, MessageCircle } from 'lucide-react';
import { Link } from 'react-router';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import type { PostItem } from '../types';
import { cn } from '@/lib/utils';
import { getPostDetailQueryOptions } from '../queries';
import { useQuery } from '@tanstack/react-query';

interface PostCardProps {
  post: PostItem;
  viewerUserId?: string;
  likedByMe: boolean;
  onToggleLike: (postId: number, currentlyLiked: boolean) => void;
  isLikePending: boolean;
}

export function PostCard({
  post,
  viewerUserId,
  likedByMe,
  onToggleLike,
  isLikePending,
}: PostCardProps) {
  // api 요청 -> state 저장

  return (
    <Card className="border-2 border-transparent bg-card/90 transition hover:border-primary/30">
      <CardHeader>
        <div className="flex items-start justify-between gap-3">
          <div>
            <CardTitle className="line-clamp-1 text-xl">
              <Link className="hover:underline" to={`/posts/${post.id}`}>
                {post.title}
              </Link>
            </CardTitle>
            <p className="mt-1 text-sm text-muted-foreground">
              작성자: {post.authorNickname} ·{' '}
              {new Date(post.createdAt).toLocaleString()}
            </p>
          </div>

          {viewerUserId === post.authorId ? (
            <Badge className="bg-green-500">내 글</Badge>
          ) : null}
        </div>
      </CardHeader>

      <CardContent>
        <p className="line-clamp-3 whitespace-pre-wrap text-sm leading-6">
          {post.content}
        </p>
      </CardContent>

      <CardFooter className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span className="inline-flex items-center gap-1">
            <Heart className="h-4 w-4" /> {post.likeCount}
          </span>
          <span className="inline-flex items-center gap-1">
            <MessageCircle className="h-4 w-4" /> {post.commentCount}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Button
            size="icon"
            variant={'ghost'}
            onClick={() => onToggleLike(post.id, likedByMe)}
            disabled={isLikePending}
          >
            <Heart
              className={cn(
                `h-4 w-4`,
                likedByMe ? 'fill-red-500' : 'fill-white'
              )}
            />
          </Button>

          <Button asChild size="sm" variant="secondary">
            <Link to={`/posts/${post.id}`}>상세</Link>
          </Button>

          {viewerUserId === post.authorId ? (
            <Button asChild size="sm" variant="outline">
              <Link to={`/posts/${post.id}/edit`}>수정</Link>
            </Button>
          ) : null}
        </div>
      </CardFooter>
    </Card>
  );
}
