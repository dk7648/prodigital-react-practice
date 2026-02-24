import { BookOpenText } from 'lucide-react';
import { Link } from 'react-router';
export default function Logo() {
  return (
    <Link
      to="/"
      className="flex items-center gap-2 text-base font-semibold 
tracking-tight"
    >
      <BookOpenText className="size-5" />
      <span>프디아 Blog</span>
    </Link>
  );
}
