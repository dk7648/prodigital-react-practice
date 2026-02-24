import Logo from '@/components/common/logo';
import DesktopNav from './partials/nav/desktop-nav';
import MobileNav from './partials/nav/mobile-nav';
const navigationItems = [
  { to: '/', label: '홈', end: true },
  { to: '/posts', label: '게시글', end: false },
];
export default function AppHeader() {
  return (
    <header className="border-b bg-background/95 backdrop-blur supports-backdrop-filter:bgbackground/70">
      <div className="mx-auto flex h-16 w-full container items-center px-4">
        <Logo />
        <DesktopNav navItems={navigationItems} />
        <MobileNav navItems={navigationItems} />
      </div>
    </header>
  );
}
