import { PasswordResetTokenModel } from './password-reset-token.model.js';
import { UserModel } from './user.model.js';

export async function createUser(input: {
  fullName: string;
  email: string;
  password: string;
  role?: 'owner' | 'admin' | 'technician' | 'viewer' | 'guest';
  avatar?: string;
}) {
  return UserModel.create({
    fullName: input.fullName,
    email: input.email.toLowerCase(),
    password: input.password,
    role: input.role ?? 'viewer',
    avatar: input.avatar ?? ''
  });
}

export async function findUserByEmail(email: string) {
  return UserModel.findOne({ email: email.toLowerCase() }).select('+password +refreshToken');
}

export async function findUserById(userId: string) {
  return UserModel.findById(userId).select('-password -refreshToken');
}

export async function findUserWithSecretsById(userId: string) {
  return UserModel.findById(userId).select('+password +refreshToken');
}

export async function updateUserRefreshToken(userId: string, refreshToken: string | null) {
  return UserModel.findByIdAndUpdate(
    userId,
    { refreshToken },
    { new: true }
  ).select('-password -refreshToken');
}

export async function updateUserPassword(userId: string, password: string) {
  return UserModel.findByIdAndUpdate(
    userId,
    { password, refreshToken: null },
    { new: true }
  ).select('-password -refreshToken');
}

export async function findUserByRefreshToken(refreshToken: string) {
  return UserModel.findOne({ refreshToken }).select('+password +refreshToken');
}

export async function createPasswordResetToken(input: {
  userId: string;
  tokenHash: string;
  expiresAt: Date;
}) {
  return PasswordResetTokenModel.create(input);
}

export async function findPasswordResetTokenByHash(tokenHash: string) {
  return PasswordResetTokenModel.findOne({ tokenHash, usedAt: null, expiresAt: { $gt: new Date() } });
}

export async function markPasswordResetTokenUsed(tokenHash: string) {
  return PasswordResetTokenModel.findOneAndUpdate(
    { tokenHash },
    { usedAt: new Date() },
    { new: true }
  );
}
