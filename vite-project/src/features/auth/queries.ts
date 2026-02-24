import { fetchMe } from './apis';

// Query Key
export const AUTH_ME_QUERY_KEY = 'auth/me';

// QueryOptions
export function getMeQueryOptions() {
  return {
    queryKey: [AUTH_ME_QUERY_KEY],
    queryFn: () => fetchMe(),
    retry: 0,
  };
}
