import type { NextFunction, Request, Response } from 'express';
import { verifyAccessToken } from '../modules/auth/auth.tokens.js';
import type { AuthenticatedRequestUser } from '../modules/auth/auth.types.js';

export function requireAuth(request: Request, response: Response, next: NextFunction) {
    const authorizationHeader = request.headers.authorization;

    if (!authorizationHeader?.startsWith('Bearer ')) {
        response.status(401).json({
            message: 'Missing access token.'
        });
        return;
    }

    const token = authorizationHeader.slice('Bearer '.length);

    try {
        const user = verifyAccessToken(token) as AuthenticatedRequestUser;
        (request as Request & { user?: AuthenticatedRequestUser }).user = user;
        next();
    } catch {
        response.status(401).json({
            message: 'Invalid or expired access token.'
        });
    }
}