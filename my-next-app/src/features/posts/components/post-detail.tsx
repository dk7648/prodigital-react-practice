import PostDetailClient from './post-detail.client';

interface PostDetailProps {
  postId: string;
}
export default async function PostDetail({ postId }: PostDetailProps) {
  console.log('PostDetail 서버 컴포넌트!');
  //서버 컴포넌트이므로 DB에 접근 가능!
  return (
    <div>
      <h1>PostDetail 컴포넌트</h1>
      <div>
        postId: <span className="text-red-700">{postId}</span>
      </div>

      <hr />
      <PostDetailClient postId={postId} />
    </div>
  );
}
