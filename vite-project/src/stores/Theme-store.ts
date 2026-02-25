import { create } from 'zustand';

// 관리할 상태
type State = {
  theme: string;
};

// 상태 업데이트 함수
type Action = {
  toggleTheme: () => void;
};

export const useTheme = create<State & Action>(set => {
  return {
    // 전역적으로 관리할 속성(값)
    theme: 'light',
    toggleTheme: () =>
      set(prev => {
        return {
          theme: prev.theme === 'light' ? 'dark' : 'light',
        };
      }),
  };
});
