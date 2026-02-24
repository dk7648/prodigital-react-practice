import { PostDetail } from '@/features/posts/components/post-detail';
import {
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from 'react-router';

//
export default function PostDetailPage() {
  const navigate = useNavigate();
  //   const location = useLocation();
  //   console.log(location);

  const params = useParams();

  const [searchParams, setSearchParams] = useSearchParams();

  return (
    <div>
      <PostDetail />
      <div onClick={() => navigate(-1)}>뒤로가기</div>
    </div>
  );
}
