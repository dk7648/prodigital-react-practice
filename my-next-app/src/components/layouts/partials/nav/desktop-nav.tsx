// src/components/layouts/partials/nav/desktop-nav.tsx
import { Button } from '@/components/ui/button';

import Link from 'next/link';

interface DesktopNavProps {
  navItems: { to: string; label: string }[];
}

export default function DesktopNav({ navItems }: DesktopNavProps) {
  return (
    <>
      <nav className="ml-10 hidden items-center gap-6 md:flex">
        {navItems.map(item => (
          <Link
            key={item.to}
            href={item.to}
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            {item.label}
          </Link>
        ))}
      </nav>
      <div className="ml-auto hidden items-center gap-2 md:flex">
        <Button variant="ghost" asChild>
          <Link href="/login">로그인</Link>
        </Button>
        <Button asChild>
          <Link href="/sign-up">회원가입</Link>
        </Button>
      </div>
    </>
  );
}
