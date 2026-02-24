// src/features/auth/hooks.ts

import { useContext, useMemo } from 'react';
import { authContext } from './components/auth-provider';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { loginServer, logoutServer, signupServer } from './apis';
import { clearAccessToken, setAccessToken } from '@/lib/auth-token-storage';
import type { LoginPayload, SignupPayload } from './types';
import { toast } from 'sonner';
import { getMeQueryOptions } from './queries';

// export function useAuth() {
//   return useContext(authContext);
// }

export function useAuth() {
  const {
    data: userResp,
    refetch: refetchUser,
    isLoading,
  } = useQuery(getMeQueryOptions());

  const user = useMemo(() => {
    if (userResp?.success) {
      return userResp.data.user;
    } else {
      return null;
    }
  }, [userResp]);

  const queryClient = useQueryClient();

  const {
    mutateAsync: login,
    isPending: isLoginPending,
    isSuccess: isLoginSuccess,
    isError: isLoginError,
    error: loginError,
  } = useMutation({
    mutationFn: (input: LoginPayload) => loginServer(input),
    onSuccess: data => {
      if (data.success) {
        queryClient.invalidateQueries(getMeQueryOptions());
        setAccessToken(data.data.token);
        return data.data;
      } else {
        throw new Error(data.error.message);
      }
    },
    onError: error => {
      toast.error(`로그인 실패: ${error.message}`);
      throw error;
    },
  });
  const {
    mutateAsync: signup,
    isPending: isSignupPending,
    isSuccess: isSignupSuccess,
    isError: isSignupError,
    error: signupError,
  } = useMutation({
    mutationFn: (input: SignupPayload) => signupServer(input),
    onSuccess: data => {
      if (data.success) {
        queryClient.invalidateQueries(getMeQueryOptions());
        setAccessToken(data.data.token);
        return data.data;
      } else {
        throw new Error(data.error.message);
      }
    },
    onError: error => {
      throw error;
    },
  });

  const {
    mutateAsync: logout,
    isPending: isLogoutPending,
    isSuccess: isLogoutSuccess,
    isError: isLogoutError,
    error: logoutError,
  } = useMutation({
    mutationFn: () => logoutServer(),
    onSuccess: () => {
      clearAccessToken();
      queryClient.invalidateQueries(getMeQueryOptions());
    },
    onError: error => {
      throw error;
    },
  });

  return {
    user,
    refetchUser,
    isLoading,
    // login
    login,
    isLoginPending,
    isLoginSuccess,
    isLoginError,
    loginError,

    // signup
    signup,
    isSignupPending,
    isSignupSuccess,
    isSignupError,
    signupError,

    // logout
    logout,
    isLogoutPending,
    isLogoutSuccess,
    isLogoutError,
    logoutError,
  };
}
