import PostDetail from '@/features/posts/components/post-detail';

export interface PostDetailPageProps {
  params: Promise<{ postId: string }>;
}

// 오직 서버 컴포넌트만 async를 사용할 수 있습니다.
export default async function PostDetailPage({ params }: PostDetailPageProps) {
  const { postId } = await params;
  console.log('postDetailPage', postId);
  return (
    <div>
      <h1>게시글 상세페이지</h1>
      <PostDetail postId={postId} />
    </div>
  );
}
