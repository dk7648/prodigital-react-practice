import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { db } from '../db/client';
import { account, user, verification, session } from '../db/schema';
import { openAPI } from 'better-auth/plugins';
import { nextCookies } from 'better-auth/next-js';

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: 'pg',
    schema: {
      user,
      account,
      verification,
      session,
    },
  }),
  emailAndPassword: {
    enabled: true,
  },
  // localhost:3000/api/auth/reference
  plugins: [openAPI(), nextCookies()],
});

// pnpm run db:generate
// pnpm run db:migrate
