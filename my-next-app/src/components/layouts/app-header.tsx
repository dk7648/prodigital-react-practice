import Logo from '@/components/common/logo';
import DesktopNav from './partials/nav/desktop-nav';
import MobileNav from './partials/nav/mobile-nav';

const navigationItems = [
  { to: '/', label: '홈' },
  { to: '/posts', label: '게시글' },
  { to: '/portfolio', label: '포트폴리오' },
];

export default function AppHeader() {
  return (
    <header className="border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/70">
      <div className="mx-auto flex h-16 w-full container items-center px-4">
        <Logo />
        <DesktopNav navItems={navigationItems} />
        <MobileNav navItems={navigationItems} />
      </div>
    </header>
  );
}
