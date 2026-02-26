// src/components/layouts/partials/nav/mobile-nav.tsx
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';
import Link from 'next/link';

function MobileNavRight() {
  return (
    <div className="mt-6 grid grid-cols-2 gap-2 px-2">
      <SheetClose asChild>
        <Button asChild variant="outline" className="w-full">
          <Link href="/login">로그인</Link>
        </Button>
      </SheetClose>
      <SheetClose asChild>
        <Button asChild className="w-full">
          <Link href="/sign-up">회원가입</Link>
        </Button>
      </SheetClose>
    </div>
  );
}

interface MobileNavProps {
  navItems: { to: string; label: string }[];
}

export default function MobileNav({ navItems }: MobileNavProps) {
  return (
    <div className="ml-auto flex items-center gap-2 md:hidden">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" aria-label="메뉴 열기">
            <Menu className="size-4" />
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="w-[280px] sm:w-[320px]">
          <SheetHeader>
            <SheetTitle>메뉴</SheetTitle>
          </SheetHeader>

          <nav className="mt-6 flex flex-col gap-1">
            {navItems.map(item => (
              <SheetClose asChild key={`mobile-${item.to}`}>
                <Link
                  href={item.to}
                  className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                >
                  {item.label}
                </Link>
              </SheetClose>
            ))}
          </nav>

          <MobileNavRight />
        </SheetContent>
      </Sheet>
    </div>
  );
}
