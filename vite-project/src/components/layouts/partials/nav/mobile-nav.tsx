import { Link, NavLink } from 'react-router';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';
import { useAuth } from '@/features/auth/hooks';
import { toast } from 'sonner';
function MobileNavRight() {
  const { user, logout } = useAuth();

  return (
    <div className="mt-6 grid grid-cols-2 gap-2 px-2">
      {user ? (
        <>
          <SheetClose asChild>
            <Button
              variant="ghost"
              asChild
              onClick={async e => {
                const result = await logout();
                if (result.success) {
                  toast('로그아웃하셨습니다.');
                  //navigate
                }
              }}
            >
              <Link to="/">로그아웃</Link>
            </Button>
          </SheetClose>
        </>
      ) : (
        <>
          <SheetClose asChild>
            <Button asChild variant="outline" className="w-full">
              <Link to="/login">로그인</Link>
            </Button>
          </SheetClose>
          <SheetClose asChild>
            <Button asChild className="w-full">
              <Link to="/signup">회원가입</Link>
            </Button>
          </SheetClose>
        </>
      )}
    </div>
  );
}

interface MobileNavProps {
  navItems: { to: string; label: string; end?: boolean }[];
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
                <NavLink
                  to={item.to}
                  end={item.end}
                  className={({ isActive }) =>
                    cn(
                      'rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground',
                      isActive && 'bg-accent text-foreground'
                    )
                  }
                >
                  {item.label}
                </NavLink>
              </SheetClose>
            ))}
          </nav>
          <MobileNavRight />
        </SheetContent>
      </Sheet>
    </div>
  );
}
