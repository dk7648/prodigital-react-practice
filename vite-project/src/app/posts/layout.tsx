import { Outlet } from 'react-router';

export default function PostLayout() {
  return (
    <div>
      <h1>게시글</h1>
      <Outlet />
    </div>
  );
}
