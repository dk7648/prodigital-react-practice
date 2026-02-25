import type { ReactNode } from 'react';

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <div>MainLayout</div>

      {children}
    </div>
  );
}
