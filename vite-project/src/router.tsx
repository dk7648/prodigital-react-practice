import { createBrowserRouter } from 'react-router';
import MainLayout from './app/layout';
import MainPage from './app/page';
import PostLayout from './app/posts/layout';
import PostPage from './app/posts/page';
import ErrorPage from './app/error';
import PostDetailPage from './app/posts/[postId]/page';
import PostEditPage from './app/posts/[postId]/edit/page';
import PostWritePage from './app/posts/write/page';
import AuthLayout from './app/(auth)/layout';
import AuthLoginPage from './app/(auth)/loginPage';
import AuthSignUpPage from './app/(auth)/signUpPage';

// :으로 시작 ==> parameter 입력(변수입력)
// 1. posts/write
// 2. posts/:postId
// 3. posts/

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        // index router: 부모 경로를 요청했을 때 보여줄 element를 정의합니다.
        // 없을 경우 랜더링되지 않음
        index: true,
        element: <MainPage />,
      },
      {
        path: 'posts',
        element: <PostLayout />,
        children: [
          {
            index: true,
            element: <PostPage />,
          },

          {
            path: 'write',
            element: <PostWritePage />,
          },
          {
            path: ':postId',
            element: <PostDetailPage />,
          },
          {
            path: ':postId/edit',
            element: <PostEditPage />,
          },
        ],
      },
      {
        element: <AuthLayout />,
        children: [
          {
            path: 'login',
            element: <AuthLoginPage />,
          },
          {
            path: 'signup',
            element: <AuthSignUpPage />,
          },
        ],
      },

      {
        path: '*',
        element: <ErrorPage code={404} message="페이지를 찾을 수 없습니다." />,
      },
    ],
  },
]);
