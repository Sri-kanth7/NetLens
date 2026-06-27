import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import rateLimit from 'express-rate-limit';
import { env } from './config/env.js';
import { errorHandler, notFoundHandler } from './middleware/error-handler.js';
import { requestId } from './middleware/request-id.js';
import { requestLogger } from './middleware/request-logger.js';
import { authRouter } from './modules/auth/auth.routes.js';
import { healthRouter } from './modules/health/health.routes.js';

export function createApp() {
    const app = express();

    app.disable('x-powered-by');
    app.use(helmet());
    app.use(
        cors({
            origin: env.CLIENT_ORIGIN,
            credentials: true
        })
    );
    app.use(rateLimit({ windowMs: 60 * 1000, limit: 120 }));
    app.use(cookieParser(env.COOKIE_SECRET));
    app.use(express.json({ limit: '1mb' }));
    app.use(requestId);
    app.use(requestLogger);

    app.get('/api/v1', (_request, response) => {
        response.json({
            success: true,
            message: 'NetLens API is running.',
            data: {
                version: 'v1'
            },
            meta: {}
        });
    });

    app.use('/api/v1/health', healthRouter);
    app.use('/api/v1/auth', authRouter);

    app.use(notFoundHandler);
    app.use(errorHandler);

    return app;
}
