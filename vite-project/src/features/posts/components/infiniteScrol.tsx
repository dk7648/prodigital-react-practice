import { useEffect, useRef } from 'react';

export function useInfiniteScroll(onReachEnd: () => void, enabled = true) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!enabled) return;
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) onReachEnd();
      },
      {
        root: null, // viewport
        rootMargin: '200px', // 200px 전에 미리 호출(프리페치 느낌)
        threshold: 0,
      }
    );

    io.observe(el);
    return () => io.disconnect();
  }, [onReachEnd, enabled]);

  return ref;
}
