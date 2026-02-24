import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getPostDetailQueryOptions } from '../queries';
import { fetchPostUpdate } from '../apis';

export function PostEdit() {
  const { postId } = useParams();
  const id = Number(postId);
  const enabled = Number.isFinite(id) && id > 0;

  const navigate = useNavigate();
  const qc = useQueryClient();

  const {
    data: detailResp,
    isLoading,
    isError,
  } = useQuery({
    ...getPostDetailQueryOptions(id),
    enabled,
  });

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  // ✅ 최초 1회: 상세 데이터로 폼 채우기
  useEffect(() => {
    if (!detailResp) return;
    // 너가 detail에서 data.post.title 쓰고 있어서 그대로 가정
    setTitle(detailResp.post.title ?? '');
    setContent(detailResp.post.content ?? '');
  }, [detailResp]);

  const { mutate, isPending } = useMutation({
    mutationFn: () =>
      fetchPostUpdate(id, { title: title.trim(), content: content.trim() }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['posts'] }); // 목록 갱신(키 맞춰)
      qc.invalidateQueries({ queryKey: ['post', id] }); // 상세 갱신(키 맞춰)
      navigate(`/posts/${id}`);
    },
  });

  if (!enabled) return <div>잘못된 게시글 id</div>;
  if (isLoading) return <div>loading...</div>;
  if (isError) return <div>error</div>;
  if (!detailResp) return <div>게시글이 없습니다.</div>;

  const canSubmit = title.trim().length > 0 && content.trim().length > 0;

  return (
    <div style={{ display: 'grid', gap: 12, maxWidth: 520 }}>
      <input
        value={title}
        onChange={e => setTitle(e.target.value)}
        placeholder="제목"
      />
      <textarea
        value={content}
        onChange={e => setContent(e.target.value)}
        rows={8}
        placeholder="본문"
      />

      <button
        type="button"
        onClick={() => mutate()}
        disabled={!canSubmit || isPending}
      >
        {isPending ? '저장 중...' : '저장'}
      </button>
    </div>
  );
}
