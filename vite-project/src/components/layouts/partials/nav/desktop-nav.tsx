import { Link, NavLink } from 'react-router';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useAuth } from '@/features/auth/hooks';
import { toast } from 'sonner';
import { useTheme } from '@/stores/Theme-store';
interface DesktopNavProps {
  navItems: { to: string; label: string; end?: boolean }[];
}
export default function DesktopNav({ navItems }: DesktopNavProps) {
  const { user, logout } = useAuth();
  const theme = useTheme(s => s.theme);
  const toggleTheme = useTheme(s => s.toggleTheme);
  return (
    <>
      <nav className="ml-10 hidden items-center gap-6 md:flex">
        {navItems.map(item => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className={({ isActive }) =>
              cn(
                'text-sm font-medium text-muted-foreground transition-colors hover:text-foreground',
                isActive && 'text-foreground text-blue-700'
              )
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
      <div className="ml-auto hidden items-center gap-2 md:flex">
        <Button
          onClick={() => {
            toggleTheme();
          }}
        >
          {theme}
        </Button>
        {user ? (
          <>
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
          </>
        ) : (
          <>
            <Button variant="ghost" asChild>
              <Link to="/login">로그인</Link>
            </Button>
            <Button asChild>
              <Link to="/signup">회원가입</Link>
            </Button>
          </>
        )}
      </div>
    </>
  );
}
