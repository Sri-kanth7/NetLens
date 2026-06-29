import type { Request, Response } from 'express';
import { refreshTokenCookieName, refreshTokenCookieOptions } from '../../config/cookies.js';
import { AppError } from '../../shared/errors/app-error.js';
import { sendSuccess } from '../../shared/responses/api-response.js';
import { forgotPassword, login, logout, me, refresh, register, resetPassword } from './auth.service.js';
import type {
  ForgotPasswordPayload,
  LoginPayload,
  RefreshPayload,
  RegisterPayload,
  ResetPasswordPayload
} from './auth.types.js';

function readRefreshToken(request: Request) {
  const cookieToken = request.signedCookies?.[refreshTokenCookieName];
  const bodyToken = (request.body as Partial<RefreshPayload> | undefined)?.refreshToken;

  return typeof cookieToken === 'string' && cookieToken.length > 0 ? cookieToken : bodyToken;
}

export async function registerController(request: Request, response: Response) {
  const result = await register(request.body as RegisterPayload);
  response.cookie(refreshTokenCookieName, result.tokens.refreshToken, refreshTokenCookieOptions);

  return sendSuccess(response, {
    statusCode: 201,
    message: 'Registration successful.',
    data: result
  });
}

export async function loginController(request: Request, response: Response) {
  const result = await login(request.body as LoginPayload);
  response.cookie(refreshTokenCookieName, result.tokens.refreshToken, refreshTokenCookieOptions);

  return sendSuccess(response, {
    message: 'Login successful.',
    data: result
  });
}

export async function refreshController(request: Request, response: Response) {
  console.log("Cookies:", request.cookies);
  console.log("Signed Cookies:", request.signedCookies);

  const token = readRefreshToken(request);

  console.log("Refresh token:", token);

  const result = await refresh({ refreshToken: token });

  response.cookie(
    refreshTokenCookieName,
    result.tokens.refreshToken,
    refreshTokenCookieOptions
  );

  return sendSuccess(response, {
    message: "Token refreshed.",
    data: result,
  });
}

export async function logoutController(request: Request, response: Response) {
  await logout({ refreshToken: readRefreshToken(request) });
  response.clearCookie(refreshTokenCookieName, refreshTokenCookieOptions);

  return sendSuccess(response, {
    message: 'Logout successful.',
    data: null
  });
}

export async function forgotPasswordController(request: Request, response: Response) {
  const result = await forgotPassword(request.body as ForgotPasswordPayload);

  return sendSuccess(response, {
    message: result.message,
    data: null
  });
}

export async function resetPasswordController(request: Request, response: Response) {
  const result = await resetPassword(request.body as ResetPasswordPayload);

  return sendSuccess(response, {
    message: result.message,
    data: null
  });
}

export async function meController(request: Request, response: Response) {
  if (!request.user?.id) {
    throw new AppError(401, 'Missing authenticated user.');
  }

  const result = await me(request.user.id);
  return sendSuccess(response, {
    message: 'Profile fetched successfully.',
    data: result
  });
}
