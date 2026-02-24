import { useMemo, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Link, useNavigate } from 'react-router';
import { fetchPostCreate } from '../apis';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

export function PostCreate() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const canSubmit = useMemo(
    () => title.trim().length > 0 && content.trim().length > 0,
    [title, content]
  );

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: () =>
      fetchPostCreate({ title: title.trim(), content: content.trim() }),
    onSuccess: created => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      if (created?.id) navigate(`/posts/${created.id}`);
      else navigate('/posts');
    },
  });

  return (
    <div className="mx-auto w-full max-w-2xl px-4 py-6">
      <Card className="border bg-card/60 shadow-sm">
        <CardHeader className="space-y-1">
          <CardTitle className="text-xl">게시글 작성</CardTitle>
          <p className="text-sm text-muted-foreground">
            제목과 본문을 입력한 뒤 등록하세요.
          </p>
        </CardHeader>

        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <label className="text-sm font-medium">제목</label>
            <Input
              placeholder="제목을 입력하세요"
              value={title}
              onChange={e => setTitle(e.target.value)}
              maxLength={80}
            />
            <div className="text-xs text-muted-foreground text-right">
              {title.length}/80
            </div>
          </div>

          <div className="grid gap-2">
            <label className="text-sm font-medium">본문</label>
            <Textarea
              placeholder="본문을 입력하세요"
              value={content}
              onChange={e => setContent(e.target.value)}
              rows={10}
            />
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex gap-2">
              <Button
                type="button"
                onClick={() => mutate()}
                disabled={isPending || !canSubmit}
              >
                {isPending ? '등록 중...' : '등록'}
              </Button>

              <Button
                asChild
                type="button"
                variant="outline"
                disabled={isPending}
              >
                <Link to="/posts">취소</Link>
              </Button>
            </div>

            {!canSubmit && (
              <div className="text-xs text-muted-foreground">
                제목/본문을 입력하면 등록할 수 있어요.
              </div>
            )}
          </div>

          {isError && (
            <div className="rounded-lg border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive">
              등록 실패:{' '}
              {error instanceof Error ? error.message : 'unknown error'}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
