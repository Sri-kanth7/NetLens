import { env } from './env.js';

export const refreshTokenCookieName = 'netlens_refresh_token';

export const refreshTokenCookieOptions = {
  httpOnly: true,
  secure: env.NODE_ENV === 'production',
  sameSite: 'lax' as const,
  signed: true,
  path: '/api/v1/auth',
  maxAge: 7 * 24 * 60 * 60 * 1000
};
