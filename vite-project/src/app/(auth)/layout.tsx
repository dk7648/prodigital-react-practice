import { Outlet } from 'react-router';

export default function AuthLayout() {
  return (
    <div>
      <h1 className="text-2xl">인증 레이아웃</h1>
      <Outlet />
    </div>
  );
}
