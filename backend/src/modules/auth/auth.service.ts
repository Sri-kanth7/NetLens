import bcrypt from 'bcrypt';
import crypto from 'node:crypto';
import { AppError } from '../../shared/errors/app-error.js';
import {
  createPasswordResetToken,
  createUser,
  findPasswordResetTokenByHash,
  findUserByEmail,
  findUserById,
  findUserByRefreshToken,
  markPasswordResetTokenUsed,
  updateUserPassword,
  updateUserRefreshToken
} from './auth.repository.js';
import { signAccessToken, signRefreshToken, signResetToken, verifyRefreshToken, verifyResetToken } from './auth.tokens.js';
import type {
  AuthSession,
  AuthenticatedUser,
  ForgotPasswordPayload,
  LoginPayload,
  RefreshPayload,
  RegisterPayload,
  ResetPasswordPayload,
  Tokens
} from './auth.types.js';

function sanitizeUser(user: {
  _id: { toString(): string };
  fullName: string;
  email: string;
  role: AuthenticatedUser['role'];
  avatar: string;
  emailVerified: boolean;
}) {
  return {
    id: user._id.toString(),
    fullName: user.fullName,
    email: user.email,
    role: user.role,
    avatar: user.avatar,
    emailVerified: user.emailVerified
  } satisfies AuthenticatedUser;
}

function buildTokens(user: AuthenticatedUser): Tokens {
  return {
    accessToken: signAccessToken(user),
    refreshToken: signRefreshToken(user)
  };
}

async function persistSession(user: AuthenticatedUser) {
  const tokens = buildTokens(user);
  await updateUserRefreshToken(user.id, tokens.refreshToken);
  return tokens;
}

export async function register(input: RegisterPayload): Promise<AuthSession> {
  const existingUser = await findUserByEmail(input.email);

  if (existingUser) {
    throw new AppError(409, 'A user with that email already exists.');
  }

  const password = await bcrypt.hash(input.password, 12);
  const userDocument = await createUser({
    fullName: input.fullName,
    email: input.email,
    password,
    role: input.role
  });

  const user = sanitizeUser(userDocument);
  const tokens = await persistSession(user);

  return { user, tokens };
}

export async function login(input: LoginPayload): Promise<AuthSession> {
  const userDocument = await findUserByEmail(input.email);

  if (!userDocument) {
    throw new AppError(401, 'Email or password is incorrect.');
  }

  const passwordMatches = await bcrypt.compare(input.password, userDocument.password);

  if (!passwordMatches) {
    throw new AppError(401, 'Email or password is incorrect.');
  }

  const user = sanitizeUser(userDocument);
  const tokens = await persistSession(user);

  return { user, tokens };
}

export async function refresh(input: RefreshPayload): Promise<AuthSession> {
  if (!input.refreshToken) {
    throw new AppError(401, 'Refresh token is required.');
  }

  const payload = verifyRefreshToken(input.refreshToken);
  const userDocument = await findUserByRefreshToken(input.refreshToken);

  if (!userDocument || String(userDocument._id) !== payload.sub) {
    throw new AppError(401, 'Refresh token is invalid or expired.');
  }

  const user = sanitizeUser(userDocument);
  const tokens = buildTokens(user);
  await updateUserRefreshToken(user.id, tokens.refreshToken);

  return { user, tokens };
}

export async function logout(input: RefreshPayload) {
  if (input.refreshToken) {
    try {
      const payload = verifyRefreshToken(input.refreshToken);
      await updateUserRefreshToken(String(payload.sub), null);
    } catch {
      // Ignore invalid refresh tokens during logout to keep the endpoint idempotent.
    }
  }

  return { message: 'Logout successful.' };
}

export async function me(userId: string) {
  const userDocument = await findUserById(userId);

  if (!userDocument) {
    throw new AppError(404, 'User not found.');
  }

  return {
    user: sanitizeUser(userDocument)
  };
}

export async function forgotPassword(input: ForgotPasswordPayload) {
  const userDocument = await findUserByEmail(input.email);

  if (userDocument) {
    const resetToken = signResetToken({
      userId: String(userDocument._id),
      email: userDocument.email
    });

    const tokenHash = crypto.createHash('sha256').update(resetToken).digest('hex');
    await createPasswordResetToken({
      userId: String(userDocument._id),
      tokenHash,
      expiresAt: new Date(Date.now() + 60 * 60 * 1000)
    });
  }

  return {
    message: 'If the account exists, a reset link has been generated.'
  };
}

export async function resetPassword(input: ResetPasswordPayload) {
  const payload = verifyResetToken(input.token);
  const userDocument = await findUserById(payload.userId);
  const tokenHash = crypto.createHash('sha256').update(input.token).digest('hex');
  const storedToken = await findPasswordResetTokenByHash(tokenHash);

  if (!userDocument || !storedToken) {
    throw new AppError(404, 'User not found.');
  }

  const password = await bcrypt.hash(input.password, 12);
  await updateUserPassword(payload.userId, password);
  await markPasswordResetTokenUsed(tokenHash);

  return {
    message: 'Password reset successful.'
  };
}
