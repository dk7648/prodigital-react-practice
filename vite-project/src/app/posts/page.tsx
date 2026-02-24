import PostList from '@/features/posts/components/post-list';
import { useNavigate } from 'react-router';

export default function PostPage() {
  const navigate = useNavigate();

  return (
    <div>
      <PostList />
    </div>
  );
}
