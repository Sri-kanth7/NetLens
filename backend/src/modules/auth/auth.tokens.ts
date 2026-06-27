import jwt from 'jsonwebtoken';
import { env } from '../../config/env.js';
import type { AuthenticatedRequestUser } from './auth.types.js';

type ResetTokenPayload = {
    userId: string;
    email: string;
};

export function signAccessToken(user: AuthenticatedRequestUser) {
    return jwt.sign(user, env.JWT_SECRET, {
        expiresIn: env.JWT_ACCESS_EXPIRES_IN
    });
}

export function signRefreshToken(user: AuthenticatedRequestUser) {
    return jwt.sign(user, env.JWT_SECRET, {
        expiresIn: env.JWT_REFRESH_EXPIRES_IN
    });
}

export function signResetToken(payload: ResetTokenPayload) {
    return jwt.sign(payload, env.JWT_SECRET, {
        expiresIn: env.JWT_RESET_EXPIRES_IN
    });
}

export function verifyAccessToken(token: string) {
    return jwt.verify(token, env.JWT_SECRET) as AuthenticatedRequestUser;
}

export function verifyRefreshToken(token: string) {
    return jwt.verify(token, env.JWT_SECRET) as AuthenticatedRequestUser;
}

export function verifyResetToken(token: string) {
    return jwt.verify(token, env.JWT_SECRET) as ResetTokenPayload;
}