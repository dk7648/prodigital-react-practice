import { useTheme } from '@/stores/Theme-store';

export default function MainPage() {
  //useTheme에서 theme만 가져오기
  const theme = useTheme(s => s.theme);
  return (
    <div>
      <a href="/posts">게시글 페이지로 이동</a>
      <h1>This is my MainPage</h1>
      <p>MainPage입니다</p>
    </div>
  );
}
