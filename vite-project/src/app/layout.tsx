import AppHeader from '@/components/layouts/app-header';
import { refreshServer } from '@/features/posts/apis';
import { useEffect, useState } from 'react';
import { Outlet } from 'react-router';

export default function MainLayout() {
  useEffect(() => {
    refreshServer();
  }, []);
  return (
    <div>
      <AppHeader />
      메인 레이아웃
      <Outlet />
    </div>
  );
}
